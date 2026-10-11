import React, { useState } from 'react';
import { SectionHeader } from '../components/ui';
import { COLLECTION_REQUESTS } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

const INITIAL_ROUTE = [
  { id: 'ICU',        name: 'ICU',          fill: 94, category: 'White',  priority: 'CRITICAL', distance: 0 },
  { id: 'LAB',        name: 'Laboratory',   fill: 78, category: 'Red',    priority: 'HIGH',     distance: 120 },
  { id: 'OT',         name: 'OT',           fill: 83, category: 'Red',    priority: 'HIGH',     distance: 95  },
  { id: 'PHARMACY',   name: 'Pharmacy',     fill: 35, category: 'Yellow', priority: 'NORMAL',   distance: 200 },
];

export default function RouteSimulation() {
  const [route, setRoute] = useState(INITIAL_ROUTE);
  const [optimized, setOptimized] = useState(false);
  const [active, setActive] = useState(-1);       // which stop is being collected
  const { toasts, toast, remove } = useToast();

  const optimizeRoute = () => {
    const sorted = [...route].sort((a, b) => {
      const p = { CRITICAL: 0, HIGH: 1, NORMAL: 2 };
      return p[a.priority] - p[b.priority];
    });
    setRoute(sorted);
    setOptimized(true);
    toast('Route optimized by priority score 🗺️', 'success');
  };

  const startCollection = (idx) => {
    setActive(idx);
    toast(`Collecting at ${route[idx].name}...`, 'info');
    setTimeout(() => {
      setRoute(prev => prev.map((s,i) => i === idx ? { ...s, collected: true } : s));
      setActive(-1);
      toast(`${route[idx].name} — collection complete ✅`, 'success');
    }, 2000);
  };

  const totalDist = route.reduce((a,s) => a + s.distance, 0);
  const estTime   = Math.round((totalDist / 50) * 60); // 50m/min walking speed

  return (
    <div className="space-y-6 fade-in-up">
      <Toast toasts={toasts} remove={remove} />
      <SectionHeader title="Route Simulation" subtitle="Optimized collection route planning">
        <button onClick={optimizeRoute} className="btn-primary text-sm flex items-center gap-2">
          🗺️ Optimize Route
        </button>
      </SectionHeader>

      {/* Vehicle info bar */}
      <div className="card bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🚛</span>
            <div>
              <p className="font-bold text-lg">Vehicle MV-01</p>
              <p className="text-blue-200 text-sm">Operator: CW-018 — Ramesh Kumar</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold">{route.length + 1}</p>
              <p className="text-blue-200 text-xs">Total Stops</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">~{estTime} min</p>
              <p className="text-blue-200 text-xs">Est. Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{route.filter(s=>s.collected).length}</p>
              <p className="text-blue-200 text-xs">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {optimized && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-medium">
          ✅ Route optimized! Sorted by priority: Critical → High → Normal. Estimated savings: ~8 minutes.
        </div>
      )}

      {/* Route timeline */}
      <div className="card">
        <h3 className="font-bold text-slate-700 mb-6">Collection Route</h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

          {/* Start node */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-md">🏁</div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
              <p className="font-bold text-blue-800 text-sm">START — Collection Depot</p>
              <p className="text-xs text-blue-600">Vehicle MV-01 departs</p>
            </div>
          </div>

          {route.map((stop, idx) => {
            const dot = stop.priority === 'CRITICAL' ? 'bg-red-500' : stop.priority === 'HIGH' ? 'bg-amber-500' : 'bg-emerald-500';
            const card = stop.priority === 'CRITICAL' ? 'bg-red-50 border-red-200' : stop.priority === 'HIGH' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200';
            return (
              <div key={stop.id} className="relative flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${dot} rounded-full flex items-center justify-center text-white font-bold z-10 shadow-md text-lg
                  ${active === idx ? 'animate-pulse ring-4 ring-offset-2 ring-blue-400' : ''}
                  ${stop.collected ? 'opacity-50' : ''}`}>
                  {stop.collected ? '✅' : idx + 1}
                </div>
                <div className={`flex-1 border rounded-xl px-4 py-3 ${card} ${stop.collected ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{stop.name}</p>
                      <p className="text-xs text-slate-500">{stop.category} Bin — {stop.fill}% full</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full
                        ${stop.priority==='CRITICAL' ? 'bg-red-100 text-red-700' : stop.priority==='HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                        {stop.priority}
                      </span>
                      {!stop.collected && (
                        <button
                          onClick={() => startCollection(idx)}
                          disabled={active !== -1}
                          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
                        >
                          {active === idx ? 'Collecting...' : '▶ Collect'}
                        </button>
                      )}
                      {stop.collected && <span className="text-xs text-emerald-600 font-bold">✅ Done</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End node */}
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-md">🏥</div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
              <p className="font-bold text-emerald-800 text-sm">Authorized Treatment Facility</p>
              <p className="text-xs text-emerald-600">Digital handover at destination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction card */}
      <div className="card border-dashed border-2 border-blue-200 bg-blue-50">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📈</span>
          <div>
            <h3 className="font-bold text-blue-800 mb-1">Predicted Collection</h3>
            <p className="text-xs text-blue-500 mb-3">Prototype prediction based on historical/simulated data.</p>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              {[
                { id: 'BMW-R-003', fill: 72, rate: '8% / hr', eta: '~2.2 hours', rec: 'Schedule within 2 hours' },
                { id: 'BMW-Y-002', fill: 42, rate: '5% / hr', eta: '~5.8 hours', rec: 'Schedule by evening' },
                { id: 'BMW-B-001', fill: 43, rate: '3% / hr', eta: '~9.5 hours', rec: 'Next morning collection' },
              ].map(p => (
                <div key={p.id} className="bg-white rounded-xl border border-blue-100 p-3">
                  <p className="font-mono text-xs font-bold text-slate-700">{p.id}</p>
                  <p className="text-xs text-slate-500">Current: {p.fill}% • Rate: {p.rate}</p>
                  <p className="font-bold text-blue-700 mt-1">ETA: {p.eta}</p>
                  <p className="text-xs text-slate-500 mt-0.5">💡 {p.rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
