import React, { useState } from 'react';
import { SectionHeader, StatusBadge, BatteryBar, Modal } from '../components/ui';
import { VEHICLES, WORKERS } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

const ROUTE = ['ICU', 'Laboratory', 'OT', 'Pharmacy', 'Treatment Facility'];

export default function MobileVehicle() {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [selected, setSelected] = useState(null);
  const [scanModal, setScanModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const { toasts, toast, remove } = useToast();

  const dispatch = (id) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: 'ACTIVE' } : v));
    toast(`${id} dispatched on collection route`, 'success');
    setSelected(null);
  };

  const doScan = () => {
    setScanResult(null);
    setTimeout(() => {
      setScanResult({
        container: 'BMW-W-001', category: 'White', location: 'ICU',
        status: 'AUTHORIZED', collection: 'PENDING',
      });
    }, 1500);
  };

  const v = selected ? vehicles.find(v => v.id === selected) : null;

  return (
    <div className="space-y-6 fade-in-up">
      <Toast toasts={toasts} remove={remove} />
      <SectionHeader title="Mobile Collection Vehicles" subtitle="Fleet management & live tracking" />

      {/* Vehicle cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {vehicles.map(vh => (
          <div
            key={vh.id}
            className={`card cursor-pointer hover:shadow-md transition-all border-2
              ${vh.status==='ACTIVE' ? 'border-blue-200' : vh.status==='CHARGING' ? 'border-purple-200' : 'border-slate-200'}`}
            onClick={() => setSelected(vh.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-slate-800 text-lg">{vh.id}</p>
                <p className="text-xs text-slate-500">{vh.operator}</p>
              </div>
              <StatusBadge status={vh.status} />
            </div>

            <div className="text-4xl text-center my-3">🚛</div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-xs font-semibold text-slate-500">Battery</span>
                <span className="text-xs font-semibold text-slate-700">{vh.battery}%</span>
              </div>
              <BatteryBar level={vh.battery} />

              <div className="flex justify-between items-center text-slate-600 mt-2">
                <span className="text-xs font-semibold text-slate-500">Capacity Used</span>
                <span className="text-xs font-semibold text-slate-700">{vh.capacity}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-blue-500 rounded-full transition-all" style={{ width: `${vh.capacity}%` }} />
              </div>

              <div className="flex justify-between text-xs text-slate-500 pt-1">
                <span>📍 {vh.currentLocation}</span>
                {vh.route.length > 0 && <span>{vh.route.length} stops</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RFID Scanner */}
      <div className="card bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">📡 RFID Container Scanner</h3>
            <p className="text-slate-400 text-sm">Simulate container RFID scan before collection</p>
          </div>
          <button onClick={() => { setScanModal(true); setScanResult(null); doScan(); }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap">
            📶 Scan Container
          </button>
        </div>
      </div>

      {/* Worker Safety */}
      <div className="card">
        <h3 className="font-bold text-slate-700 mb-4">🦺 Worker Safety — PPE Checklist</h3>
        <p className="text-xs text-slate-400 mb-4">Digital checklist only. Software does not physically verify PPE compliance.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKERS.filter(w => w.status !== 'OFF_DUTY').map(w => (
            <div key={w.id} className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{w.name}</p>
                  <p className="text-xs text-slate-500">{w.id} — {w.assignment}</p>
                </div>
                <StatusBadge status={w.status} />
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {Object.entries(w.ppe).map(([k, v]) => (
                  <div key={k} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${v ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    <span>{v ? '☑' : '☐'}</span>
                    <span className="capitalize font-medium">{k.replace(/([A-Z])/g,' $1')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Vehicle — ${selected}`}>
        {v && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Status', v.status], ['Operator', v.operator],
                ['Location', v.currentLocation],
                ['Battery', `${v.battery}%`], ['Capacity', `${v.capacity}%`],
                ['Route Stops', v.route.join(' → ') || 'None'],
              ].map(([k,val]) => (
                <div key={k} className="bg-slate-50 rounded-lg p-3 col-span-1">
                  <p className="text-xs text-slate-500 font-semibold">{k}</p>
                  <p className="font-bold text-slate-800 text-sm">{val}</p>
                </div>
              ))}
            </div>
            {v.status !== 'ACTIVE' && (
              <button onClick={() => dispatch(v.id)} className="btn-primary w-full text-sm">
                🚀 Dispatch Vehicle
              </button>
            )}
          </div>
        )}
      </Modal>

      {/* RFID Scan Modal */}
      <Modal open={scanModal} onClose={() => setScanModal(false)} title="RFID Scanner">
        <div className="space-y-4">
          {!scanResult ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4 animate-pulse">📡</div>
              <p className="text-slate-600 font-medium">Scanning...</p>
              <div className="flex justify-center gap-1 mt-3">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-xs text-emerald-600 font-semibold mb-3">✅ RFID DETECTED</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Container', scanResult.container],
                    ['Category', scanResult.category],
                    ['Location', scanResult.location],
                    ['Status', scanResult.status],
                    ['Collection', scanResult.collection],
                  ].map(([k,v]) => (
                    <div key={k}>
                      <p className="text-xs text-slate-500 font-semibold">{k}</p>
                      <p className="font-bold text-slate-800">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => { toast('Collection authorized ✅', 'success'); setScanModal(false); }}
                className="btn-primary w-full text-sm">
                ✅ Authorize Collection
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
