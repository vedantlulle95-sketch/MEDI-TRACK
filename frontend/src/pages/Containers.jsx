import React, { useState } from 'react';
import { Search, Thermometer, Lock, Battery } from 'lucide-react';
import { FillBar, StatusBadge, CategoryBadge, SectionHeader, Modal, BatteryBar } from '../components/ui';
import { CONTAINERS, CATEGORY_COLORS } from '../data/mockData';

export default function Containers() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState(null);
  const [simFill, setSimFill] = useState({});

  const filtered = CONTAINERS.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filterCat === 'All' || c.category === filterCat;
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const getContainer = (id) => {
    const c = CONTAINERS.find(c => c.id === id);
    if (!c) return null;
    return { ...c, fillLevel: simFill[id] ?? c.fillLevel };
  };

  const updateFill = (id, val) => {
    setSimFill(prev => ({ ...prev, [id]: Number(val) }));
  };

  return (
    <div className="space-y-6 fade-in-up">
      <SectionHeader title="Smart Containers" subtitle={`${CONTAINERS.length} containers across facility`}>
        <span className="text-sm text-slate-500">{filtered.length} shown</span>
      </SectionHeader>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
            placeholder="Search containers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="All">All Categories</option>
          {['Yellow','Red','White','Blue'].map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {['NORMAL','HIGH','CRITICAL'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Container cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => {
          const fill = simFill[c.id] ?? c.fillLevel;
          const cc = CATEGORY_COLORS[c.category];
          const status = fill >= 90 ? 'CRITICAL' : fill >= 75 ? 'HIGH' : 'NORMAL';
          return (
            <div
              key={c.id}
              className={`card cursor-pointer hover:shadow-md transition-all border-2 ${fill >= 90 ? 'border-red-200' : fill >= 75 ? 'border-amber-200' : 'border-transparent'}`}
              onClick={() => setSelected(c.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-slate-800 text-sm font-mono">{c.id}</p>
                  <p className="text-xs text-slate-500">{c.location} • {c.department}</p>
                </div>
                <StatusBadge status={status} />
              </div>

              <CategoryBadge category={c.category} />

              {/* Fill */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Fill Level</span><span className="font-bold text-slate-700">{fill}%</span>
                </div>
                <FillBar fill={fill} category={c.category} />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-slate-600">
                <div className="flex items-center gap-1"><span>⚖️</span>{c.weight} KG</div>
                <div className="flex items-center gap-1"><Thermometer size={12} className="text-orange-400"/>{c.temperature}°C</div>
                <div className="flex items-center gap-1"><Lock size={12} className="text-emerald-500"/>{c.lid}</div>
              </div>

              <div className="mt-3">
                <BatteryBar level={c.battery} />
              </div>

              <p className="text-xs text-slate-400 mt-2">Last: {c.lastCollection}</p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Package className="mx-auto mb-3 opacity-30" size={48} />
          <p className="font-medium">No containers match your filters</p>
        </div>
      )}

      {/* Detail / Simulation Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Container Details — ${selected}`} width="max-w-2xl">
        {selected && (() => {
          const c = getContainer(selected);
          if (!c) return null;
          const cc = CATEGORY_COLORS[c.category];
          const fill = simFill[selected] ?? c.fillLevel;
          return (
            <div className="space-y-6">
              <div className={`p-4 rounded-xl border-2 ${cc.bg} ${cc.border}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    ['Container ID', c.id], ['Category', c.category], ['Location', c.location],
                    ['Department', c.department], ['Weight', `${c.weight} KG`],
                    ['Temperature', `${c.temperature}°C`], ['Lid Status', c.lid],
                    ['Last Collection', c.lastCollection],
                  ].map(([k,v]) => (
                    <div key={k}>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{k}</p>
                      <p className="font-semibold text-slate-800">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulation controls */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
                <p className="font-bold text-slate-700 text-sm flex items-center gap-2">
                  🔧 Simulation Mode — Adjust Sensor Values
                </p>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <label>Fill Level</label><span className="font-bold">{fill}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={fill}
                    onChange={e => updateFill(selected, e.target.value)}
                    className="w-full accent-blue-600" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FillBar fill={fill} category={c.category} />
                  <StatusBadge status={fill >= 90 ? 'CRITICAL' : fill >= 75 ? 'HIGH' : 'NORMAL'} />
                </div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
