import React, { useState } from 'react';
import { SectionHeader, CategoryBadge, Modal } from '../components/ui';
import { WASTE_RECORDS } from '../data/mockData';

const TIMELINE_STEPS = [
  { time: '10:32', label: 'Waste Generated',      icon: '🗑️', desc: 'Item placed in smart container' },
  { time: '10:33', label: 'AI Segregated',         icon: '🤖', desc: 'Classified by Smart Segregation Station' },
  { time: '10:35', label: 'Container Sealed',      icon: '🔒', desc: 'Lid locked & RFID tag activated' },
  { time: '11:05', label: 'Collected',             icon: '🚛', desc: 'Collected by CW-018 / MV-01' },
  { time: '11:12', label: 'Vehicle Departed',      icon: '➡️', desc: 'En-route to treatment facility' },
  { time: '11:48', label: 'Treatment Facility',    icon: '🏭', desc: 'Arrived at Authorized Facility A' },
  { time: '11:52', label: 'Digital Handover',      icon: '✅', desc: 'Waste Passport marked HANDED OVER' },
];

const STATUS_COLOR = {
  HANDED_OVER: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  IN_TRANSIT:  'bg-blue-100 text-blue-700 border-blue-200',
  COLLECTED:   'bg-purple-100 text-purple-700 border-purple-200',
};

function QRPlaceholder({ id }) {
  // SVG QR-like placeholder
  const size = 100;
  const cells = [];
  const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      // Corner markers
      if ((r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2)) {
        cells.push(<rect key={`${r}-${c}`} x={c*14+1} y={r*14+1} width="12" height="12" fill="#1e3a8a" rx="1" />);
      } else if (((seed >> (r*7+c)) & 1) === 1) {
        cells.push(<rect key={`${r}-${c}`} x={c*14+1} y={r*14+1} width="12" height="12" fill="#1e3a8a" rx="1" />);
      }
    }
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 100 100" className="border border-slate-200 rounded-lg p-1 bg-white">
        {cells}
      </svg>
      <p className="text-[10px] text-slate-400 font-mono">{id}</p>
    </div>
  );
}

export default function DigitalWastePassport() {
  const [selected, setSelected] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const rec = selected ? WASTE_RECORDS.find(r => r.id === selected) : null;

  return (
    <div className="space-y-6 fade-in-up">
      <SectionHeader title="Digital Waste Passport" subtitle="End-to-end traceability for every biomedical waste container" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WASTE_RECORDS.map(rec => (
          <div
            key={rec.id}
            className="card cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-blue-200"
            onClick={() => { setSelected(rec.id); setShowTimeline(false); }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-slate-800 font-mono text-sm">{rec.containerId}</p>
                <p className="text-xs text-slate-500">{rec.source}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLOR[rec.status]}`}>
                {rec.status.replace('_', ' ')}
              </span>
            </div>

            <CategoryBadge category={rec.category} />

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div><p className="text-slate-400 font-semibold">Weight</p><p className="font-bold">{rec.weight} KG</p></div>
              <div><p className="text-slate-400 font-semibold">Generated</p><p className="font-bold">{rec.timestamp}</p></div>
              <div><p className="text-slate-400 font-semibold">Collector</p><p className="font-bold">{rec.collector}</p></div>
              <div><p className="text-slate-400 font-semibold">Vehicle</p><p className="font-bold">{rec.vehicle}</p></div>
            </div>

            <div className="mt-3 flex justify-center">
              <QRPlaceholder id={rec.containerId} />
            </div>
          </div>
        ))}
      </div>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Digital Waste Passport" width="max-w-2xl">
        {rec && (
          <div className="space-y-5">
            {/* Passport header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-widest font-semibold text-blue-200 uppercase mb-1">Digital Waste Passport</p>
                  <p className="text-2xl font-bold font-mono">{rec.containerId}</p>
                  <p className="text-blue-200 text-sm mt-0.5">{rec.source}</p>
                </div>
                <QRPlaceholder id={rec.containerId} />
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Category',    rec.category],
                ['Weight',      `${rec.weight} KG`],
                ['Generated',   rec.timestamp],
                ['Collector',   rec.collector],
                ['Vehicle',     rec.vehicle],
                ['Destination', rec.destination],
                ['Status',      rec.status.replace('_', ' ')],
                ['Record ID',   rec.id],
              ].map(([k,v]) => (
                <div key={k} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{k}</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            {/* Timeline toggle */}
            <button
              onClick={() => setShowTimeline(p => !p)}
              className="btn-secondary w-full text-sm"
            >
              {showTimeline ? '▲ Hide' : '▼ Show'} Waste Journey Timeline
            </button>

            {showTimeline && (
              <div className="space-y-0">
                {TIMELINE_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-lg shadow-sm z-10">{step.icon}</div>
                      {idx < TIMELINE_STEPS.length - 1 && <div className="w-0.5 h-8 bg-blue-200" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs text-slate-400 font-semibold">{step.time}</p>
                      <p className="font-bold text-slate-800 text-sm">{step.label}</p>
                      <p className="text-xs text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
