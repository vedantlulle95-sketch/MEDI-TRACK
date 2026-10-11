import React, { useState, useRef } from 'react';
import { SectionHeader } from '../components/ui';

const DEMO_STEPS = [
  { id: 1, icon: '🗑️', title: 'Waste Generated',           desc: 'Healthcare worker in ICU generates biomedical waste (used syringe)',    duration: 2000 },
  { id: 2, icon: '🤖', title: 'AI Waste Classification',   desc: 'Smart Segregation Station identifies: WHITE (Sharps) — 99% confidence', duration: 2500 },
  { id: 3, icon: '📦', title: 'Container Updated',          desc: 'BMW-W-001 (ICU) updated: Fill 87% → 94% • Weight +0.1 KG',            duration: 2000 },
  { id: 4, icon: '📈', title: 'Fill Level Critical',        desc: 'Container BMW-W-001 crosses 90% threshold — system triggers alert',    duration: 1500 },
  { id: 5, icon: '🚨', title: 'Critical Alert Generated',   desc: '🚨 CRITICAL: BMW-W-001 (ICU) — Sharps container requires collection', duration: 2000 },
  { id: 6, icon: '📋', title: 'Collection Request Created', desc: 'Priority Score: 96 — Automatic collection request CR-001 created',    duration: 1500 },
  { id: 7, icon: '🚛', title: 'Vehicle Assigned',           desc: 'MV-01 assigned to route — Operator CW-018 (Ramesh Kumar) notified',   duration: 2000 },
  { id: 8, icon: '🗺️', title: 'Route Optimized',           desc: 'Optimal route: ICU → Lab → OT → Pharmacy → Treatment Facility',       duration: 2000 },
  { id: 9, icon: '📡', title: 'RFID Scan',                  desc: 'Worker CW-018 scans container RFID — BMW-W-001 AUTHORIZED',           duration: 2000 },
  { id: 10, icon: '✅', title: 'Container Collected',        desc: 'BMW-W-001 collected at 11:05 AM — Lid sealed & vehicle loaded',       duration: 2000 },
  { id: 11, icon: '🪪', title: 'Waste Passport Updated',    desc: 'Digital Waste Passport WR-001 status: IN_TRANSIT',                   duration: 1500 },
  { id: 12, icon: '🏭', title: 'Treatment Facility',        desc: 'MV-01 arrives at Authorized Treatment Facility A at 11:48 AM',        duration: 2000 },
  { id: 13, icon: '🎉', title: 'Digital Handover Complete', desc: 'Waste Passport status: HANDED OVER • Analytics updated • Cycle complete', duration: 2000 },
];

export default function LiveDemo() {
  const [running, setRunning] = useState(false);
  const [step, setStep]       = useState(-1);
  const [done, setDone]       = useState(false);
  const timerRef              = useRef(null);

  const start = () => {
    setRunning(true);
    setDone(false);
    setStep(0);
    let current = 0;
    const next = () => {
      if (current >= DEMO_STEPS.length) { setRunning(false); setDone(true); return; }
      setStep(current);
      timerRef.current = setTimeout(() => { current++; next(); }, DEMO_STEPS[current].duration);
    };
    next();
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setRunning(false);
    setStep(-1);
    setDone(false);
  };

  const totalTime = Math.round(DEMO_STEPS.reduce((a,s) => a + s.duration, 0) / 1000);

  return (
    <div className="space-y-6 fade-in-up">
      <SectionHeader title="🎬 Live Demo" subtitle="Complete SIH demonstration — full waste lifecycle in one flow">
        <div className="flex gap-2">
          {!running && !done && (
            <button onClick={start} className="btn-primary flex items-center gap-2">
              ▶️ START LIVE DEMO
            </button>
          )}
          {(running || done) && (
            <button onClick={reset} className="btn-secondary">🔄 Reset</button>
          )}
          {!running && !done && (
            <span className="text-xs text-slate-400 self-center">~{totalTime}s duration</span>
          )}
        </div>
      </SectionHeader>

      {/* Scenario summary */}
      {!running && !done && (
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">📋 Demo Scenario</h3>
          <p className="text-sm text-blue-700">
            An ICU healthcare worker generates biomedical waste (used syringe).
            The Smart Segregation Station classifies it as <strong>WHITE (Sharps)</strong>.
            The system updates the container, triggers a critical alert, creates a collection request,
            dispatches Vehicle MV-01, optimizes the route, and records the full Digital Waste Passport
            through to treatment facility handover — all automatically.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-blue-700 font-semibold">
            <div className="bg-white rounded-lg p-2 text-center border border-blue-100">{DEMO_STEPS.length} Steps</div>
            <div className="bg-white rounded-lg p-2 text-center border border-blue-100">~{totalTime}s Total</div>
            <div className="bg-white rounded-lg p-2 text-center border border-blue-100">Full Lifecycle</div>
          </div>
        </div>
      )}

      {/* Steps list */}
      <div className="space-y-0">
        {DEMO_STEPS.map((s, idx) => {
          const isActive    = step === idx;
          const isCompleted = step > idx;
          const isPending   = step < idx || step === -1;

          return (
            <div key={s.id} className="relative flex items-start gap-4">
              {/* Connector line */}
              {idx < DEMO_STEPS.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-8 transition-all duration-500 ${isCompleted ? 'bg-emerald-400' : 'bg-slate-200'}`} />
              )}

              {/* Icon bubble */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 shadow-sm transition-all duration-300 flex-shrink-0
                ${isActive    ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-110 animate-pulse' :
                  isCompleted ? 'bg-emerald-500 text-white' :
                                'bg-slate-100 text-slate-300 border-2 border-slate-200'}`}>
                {isCompleted ? '✅' : s.icon}
              </div>

              {/* Content */}
              <div className={`pb-8 flex-1 transition-all duration-300 ${isPending && step !== -1 ? 'opacity-30' : 'opacity-100'}`}>
                <div className={`rounded-xl p-4 border transition-all duration-300
                  ${isActive    ? 'bg-blue-50 border-blue-300 shadow-md' :
                    isCompleted ? 'bg-emerald-50 border-emerald-200' :
                                  'bg-white border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-bold text-sm ${isActive ? 'text-blue-800' : isCompleted ? 'text-emerald-800' : 'text-slate-400'}`}>
                      Step {s.id}: {s.title}
                    </p>
                    {isActive && (
                      <div className="flex gap-1">
                        {[0,1,2].map(i => (
                          <div key={i} className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className={`text-xs ${isActive ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Done banner */}
      {done && (
        <div className="card bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center drop-in">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold">Demo Complete!</h2>
          <p className="mt-2 text-emerald-100">
            Full biomedical waste lifecycle demonstrated — from generation to digital handover.
          </p>
          <button onClick={reset} className="mt-4 bg-white text-emerald-700 font-bold px-6 py-2 rounded-xl hover:bg-emerald-50 transition-all text-sm">
            🔄 Run Demo Again
          </button>
        </div>
      )}
    </div>
  );
}
