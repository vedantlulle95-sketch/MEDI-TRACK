// Shared UI Components for MEDI-TRACK
import React from 'react';

// ─── Fill Bar ─────────────────────────────────────────────────────────────────
export function FillBar({ fill, category }) {
  const colors = {
    Yellow: 'bg-yellow-400', Red: 'bg-red-500', White: 'bg-slate-400', Blue: 'bg-blue-500',
  };
  const barColor = colors[category] || (fill >= 90 ? 'bg-red-500' : fill >= 75 ? 'bg-amber-400' : 'bg-emerald-500');
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full transition-all duration-700 ${barColor}`}
        style={{ width: `${Math.min(fill, 100)}%` }}
      />
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const cfg = {
    CRITICAL: 'bg-red-100 text-red-700 border border-red-200',
    HIGH:     'bg-amber-100 text-amber-700 border border-amber-200',
    NORMAL:   'bg-emerald-100 text-emerald-700 border border-emerald-200',
    ACTIVE:   'bg-blue-100 text-blue-700 border border-blue-200',
    STANDBY:  'bg-slate-100 text-slate-600 border border-slate-200',
    CHARGING: 'bg-purple-100 text-purple-700 border border-purple-200',
    PENDING:  'bg-amber-100 text-amber-700 border border-amber-200',
    SCHEDULED:'bg-blue-100 text-blue-700 border border-blue-200',
    COLLECTED:'bg-emerald-100 text-emerald-700 border border-emerald-200',
    HANDED_OVER: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    IN_TRANSIT:  'bg-blue-100 text-blue-700 border border-blue-200',
    READY:    'bg-emerald-100 text-emerald-700 border border-emerald-200',
    ON_ROUTE: 'bg-blue-100 text-blue-700 border border-blue-200',
    OFF_DUTY: 'bg-slate-100 text-slate-500 border border-slate-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${cfg[status] || 'bg-slate-100 text-slate-600'}`}>
      {status?.replace('_', ' ')}
    </span>
  );
}

// ─── Category Badge ───────────────────────────────────────────────────────────
export function CategoryBadge({ category }) {
  const cfg = {
    Yellow: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    Red:    'bg-red-100 text-red-700 border border-red-300',
    White:  'bg-slate-100 text-slate-600 border border-slate-300',
    Blue:   'bg-blue-100 text-blue-700 border border-blue-300',
  };
  const dots = { Yellow: '🟡', Red: '🔴', White: '⚪', Blue: '🔵' };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg[category] || ''}`}>
      {dots[category]} {category}
    </span>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
export function KpiCard({ title, value, subtitle, icon, accent = 'blue', trend }) {
  const accents = {
    blue:   'from-blue-50 to-blue-100/60 border-blue-200',
    emerald:'from-emerald-50 to-emerald-100/60 border-emerald-200',
    amber:  'from-amber-50 to-amber-100/60 border-amber-200',
    red:    'from-red-50 to-red-100/60 border-red-200',
    purple: 'from-purple-50 to-purple-100/60 border-purple-200',
    slate:  'from-slate-50 to-slate-100/60 border-slate-200',
  };
  const iconAccents = {
    blue: 'bg-blue-600', emerald: 'bg-emerald-600', amber: 'bg-amber-500',
    red: 'bg-red-500', purple: 'bg-purple-600', slate: 'bg-slate-500',
  };
  return (
    <div className={`bg-gradient-to-br ${accents[accent]} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trend > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
              {trend > 0 ? `↑ +${trend}` : `↓ ${trend}`} vs yesterday
            </p>
          )}
        </div>
        <div className={`${iconAccents[accent]} text-white p-3 rounded-xl shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ─── Toast Notification ───────────────────────────────────────────────────────
export function Toast({ toasts, remove }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`pointer-events-auto slide-in-right flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm border text-sm font-medium
          ${t.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
            t.type === 'error'   ? 'bg-red-50 border-red-200 text-red-800' :
            t.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                                   'bg-blue-50 border-blue-200 text-blue-800'}`}
        >
          <span className="text-base mt-0.5">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="opacity-50 hover:opacity-100 text-lg leading-none ml-1">×</button>
        </div>
      ))}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, width = 'max-w-lg' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${width} max-h-[90vh] overflow-y-auto fade-in-up`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none font-light">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
    </div>
  );
}

// ─── Battery Bar ──────────────────────────────────────────────────────────────
export function BatteryBar({ level }) {
  const color = level >= 60 ? 'bg-emerald-500' : level >= 30 ? 'bg-amber-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${level}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-8">{level}%</span>
    </div>
  );
}

// ─── Priority Score Ring ──────────────────────────────────────────────────────
export function PriorityRing({ score }) {
  const color = score >= 85 ? '#ef4444' : score >= 65 ? '#f59e0b' : '#10b981';
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="70" height="70" className="-rotate-90">
        <circle cx="35" cy="35" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="6" />
        <circle cx="35" cy="35" r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <span className="absolute text-sm font-bold text-slate-700">{score}</span>
    </div>
  );
}
