import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Zap } from 'lucide-react';
import { CategoryBadge, SectionHeader, Modal } from '../components/ui';
import { WASTE_ITEMS, CATEGORY_COLORS } from '../data/mockData';

const STAGES = [
  'Idle',
  'Scanning',
  'Analyzing',
  'Result Ready',
];

export default function SegregationStation() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState(0);  // 0=idle, 1=scanning, 2=analyzing, 3=result
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const classify = () => {
    if (!selectedItem) return;
    setStage(1);
    setTimeout(() => setStage(2), 1000);
    setTimeout(() => {
      const item = WASTE_ITEMS.find(w => w.id === selectedItem);
      setResult(item);
      setStage(3);
    }, 2500);
  };

  const reset = () => { setStage(0); setResult(null); setSelectedItem(null); };

  const cc = result ? CATEGORY_COLORS[result.category] : null;

  return (
    <div className="space-y-6 fade-in-up">
      <SectionHeader
        title="Smart Segregation Station"
        subtitle="AI-assisted biomedical waste classification"
      />

      {/* Prototype disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-700">
        🔬 <strong>Demonstration classification only.</strong> Actual deployment requires validated medical-waste classification procedures and regulatory compliance.
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Left: Input panel */}
        <div className="card space-y-5">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg font-mono">STEP 1</span>
            Select Waste Item
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {WASTE_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setSelectedItem(item.id); setStage(0); setResult(null); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-left
                  ${selectedItem === item.id
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                    : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'}`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{item.label}</span>
                <CategoryBadge category={item.category} />
              </button>
            ))}
          </div>

          <button
            onClick={classify}
            disabled={!selectedItem || stage === 1 || stage === 2}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Zap size={16} />
            {stage === 1 ? 'Scanning...' : stage === 2 ? 'Analyzing...' : 'Classify Waste Item'}
          </button>
        </div>

        {/* Right: Classification machine + result */}
        <div className="space-y-4">
          {/* Machine visual */}
          <div className="card bg-gradient-to-br from-slate-800 to-slate-900 text-white">
            <div className="text-center">
              <p className="text-xs font-mono text-slate-400 tracking-widest uppercase mb-2">SMART SEGREGATION UNIT — SSU-01</p>
              <div className="bg-slate-700 rounded-xl p-4 my-3 border border-slate-600">
                <p className="text-slate-300 text-sm font-mono">
                  {stage === 0 ? '> AWAITING ITEM INPUT...' :
                   stage === 1 ? '> SCANNING RFID / BARCODE...' :
                   stage === 2 ? '> AI CLASSIFICATION IN PROGRESS...' :
                                  `> CLASSIFICATION COMPLETE`}
                </p>
                {(stage === 1 || stage === 2) && (
                  <div className="mt-3 flex justify-center">
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Bin row */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['Yellow','Red','White','Blue'].map(cat => {
                  const active = result && result.category === cat;
                  return (
                    <div key={cat} className={`rounded-lg p-2 text-center transition-all duration-500 border
                      ${active ? `ring-2 ring-white scale-110 bg-opacity-90` : 'opacity-40 bg-slate-700 border-slate-600'}`}
                      style={active ? { backgroundColor: CATEGORY_COLORS[cat].hex + '33', borderColor: CATEGORY_COLORS[cat].hex } : {}}
                    >
                      <div className="text-lg">{cat === 'Yellow' ? '🟡' : cat === 'Red' ? '🔴' : cat === 'White' ? '⚪' : '🔵'}</div>
                      <div className="text-xs font-semibold mt-0.5">{cat}</div>
                      {active && <div className="text-[10px] text-green-400 mt-0.5">▼ ROUTE</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result card */}
          {result && stage === 3 && (
            <div className={`card drop-in border-2 ${cc.border} ${cc.bg}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold text-lg ${cc.text}`}>Classification Result</h3>
                <CheckCircle2 className="text-emerald-500" size={24} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Item</p>
                  <p className="font-bold text-slate-800 mt-0.5 text-base">{result.label}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Category</p>
                  <CategoryBadge category={result.category} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Confidence</p>
                  <p className="font-bold text-emerald-600 mt-0.5 text-xl">{result.confidence}%</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Recommended Container</p>
                  <p className="font-bold text-slate-800 mt-0.5">{result.container}</p>
                </div>
              </div>

              {/* Confidence bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Confidence Level</span><span>{result.confidence}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${cc.fill} transition-all duration-700`} style={{ width: `${result.confidence}%` }} />
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 w-full btn-primary text-sm"
              >
                ✅ Confirm & Update Container
              </button>
              <button onClick={reset} className="mt-2 w-full btn-secondary text-sm">
                🔄 Classify Another Item
              </button>
            </div>
          )}
        </div>
      </div>

      {/* How it works */}
      <div className="card">
        <h3 className="font-bold text-slate-700 mb-4">How Smart Segregation Works</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { step: 1, icon: '📥', title: 'Item Input', desc: 'Healthcare worker places waste item at station' },
            { step: 2, icon: '🤖', title: 'AI Analysis', desc: 'System classifies item via computer vision / RFID' },
            { step: 3, icon: '🗑️', title: 'Routing', desc: 'Correct colour-coded bin door opens automatically' },
            { step: 4, icon: '📊', title: 'Data Update', desc: 'Dashboard and waste passport updated in real-time' },
          ].map(s => (
            <div key={s.step} className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mx-auto mb-2 font-bold">{s.step}</div>
              <p className="font-semibold text-slate-700 text-sm">{s.title}</p>
              <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Confirm Waste Classification">
        {result && (
          <div className="space-y-4">
            <p className="text-slate-600">Please confirm the following classification:</p>
            <div className={`p-4 rounded-xl border-2 ${cc?.border} ${cc?.bg}`}>
              <p className="font-bold text-slate-800">{result.label}</p>
              <p className={`text-sm ${cc?.text} mt-1`}>→ {result.category} Bin — {result.container}</p>
              <p className="text-xs text-slate-500 mt-1">Confidence: {result.confidence}%</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); reset(); }} className="btn-primary flex-1">✅ Confirm</button>
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
