import React, { useState } from 'react';
import { SectionHeader } from '../components/ui';
import { ALERTS } from '../data/mockData';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [filter, setFilter] = useState('All');

  const resolve = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  const resolveAll = () => setAlerts(prev => prev.map(a => ({ ...a, resolved: true })));

  const filtered = alerts.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'Unresolved') return !a.resolved;
    return a.type === filter;
  });

  const unresolvedCount = alerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-6 fade-in-up">
      <SectionHeader title="Alerts" subtitle={`${unresolvedCount} unresolved alerts`}>
        {unresolvedCount > 0 && (
          <button onClick={resolveAll} className="btn-secondary text-sm">✅ Resolve All</button>
        )}
        <select
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Alerts</option>
          <option value="Unresolved">Unresolved</option>
          <option value="CRITICAL">Critical</option>
          <option value="WARNING">Warning</option>
          <option value="INFO">Info</option>
        </select>
      </SectionHeader>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Critical',  val: alerts.filter(a=>a.type==='CRITICAL'&&!a.resolved).length, color: 'text-red-600',   bg: 'bg-red-50   border-red-200' },
          { label: 'Warning',   val: alerts.filter(a=>a.type==='WARNING' &&!a.resolved).length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Info',      val: alerts.filter(a=>a.type==='INFO'    &&!a.resolved).length, color: 'text-blue-600',  bg: 'bg-blue-50  border-blue-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-4 text-center ${s.bg}`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.map(a => {
          const bg = a.resolved ? 'bg-slate-50 border-slate-200 opacity-60' :
            a.type === 'CRITICAL' ? 'bg-red-50 border-red-200' :
            a.type === 'WARNING'  ? 'bg-amber-50 border-amber-200' :
                                    'bg-blue-50 border-blue-200';
          return (
            <div key={a.id} className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${bg}`}>
              <span className="text-2xl mt-0.5">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                    ${a.type==='CRITICAL' ? 'bg-red-100 text-red-700' : a.type==='WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {a.type}
                  </span>
                  {a.containerId && (
                    <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">{a.containerId}</span>
                  )}
                  {a.resolved && <span className="text-xs text-emerald-600 font-semibold">✅ Resolved</span>}
                </div>
                <p className="text-sm text-slate-700 font-medium">{a.message}</p>
                <p className="text-xs text-slate-400 mt-1">{a.timestamp}</p>
              </div>
              {!a.resolved && (
                <button
                  onClick={() => resolve(a.id)}
                  className="btn-secondary text-xs px-3 py-1.5 whitespace-nowrap"
                >
                  Resolve
                </button>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-medium">No alerts to show</p>
          </div>
        )}
      </div>
    </div>
  );
}
