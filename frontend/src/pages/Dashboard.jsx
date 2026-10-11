import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Activity, AlertTriangle, Truck, CheckCircle2, Package2,
  Thermometer, Wifi, WifiOff, RefreshCw,
} from 'lucide-react';
import { KpiCard, FillBar, StatusBadge, CategoryBadge } from '../components/ui';
import {
  CONTAINERS, ALERTS, VEHICLES, COLLECTION_REQUESTS,
  ANALYTICS_WEEKLY, FACILITY_LOCATIONS, CATEGORY_COLORS,
} from '../data/mockData';

const CATEGORY_OVERVIEW = [
  { category: 'Yellow', fill: 82, weight: 19.5, containers: 4, status: 'HIGH',     desc: 'Anatomical / Pharmaceutical' },
  { category: 'Red',    fill: 61, weight: 16.4, containers: 3, status: 'NORMAL',   desc: 'Contaminated Recyclable Plastic' },
  { category: 'White',  fill: 94, weight: 5.0,  containers: 3, status: 'CRITICAL', desc: 'Sharps' },
  { category: 'Blue',   fill: 43, weight: 14.1, containers: 2, status: 'NORMAL',   desc: 'Glassware / Metallic Implants' },
];

function FacilityMap() {
  return (
    <div className="card h-full">
      <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <span className="text-blue-600">🏥</span> Live Facility Map
      </h3>
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 overflow-hidden" style={{ height: 280 }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[0,25,50,75,100].map(p => (
            <React.Fragment key={p}>
              <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#64748b" strokeWidth="1" />
              <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#64748b" strokeWidth="1" />
            </React.Fragment>
          ))}
        </svg>

        {/* Hospital boundary */}
        <div className="absolute inset-4 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
          <span className="text-slate-300 text-xs font-semibold tracking-widest uppercase">Hospital Campus</span>
        </div>

        {/* Location nodes */}
        {FACILITY_LOCATIONS.map(loc => {
          const dotColor = loc.status === 'CRITICAL' ? 'bg-red-500' : loc.status === 'HIGH' ? 'bg-amber-400' : 'bg-emerald-500';
          const labelColor = loc.status === 'CRITICAL' ? 'text-red-700 bg-red-50 border-red-200' : loc.status === 'HIGH' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';
          return (
            <div
              key={loc.id}
              className="absolute flex flex-col items-center gap-1 cursor-pointer group"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)' }}
            >
              <div className="relative">
                <div className={`w-3.5 h-3.5 rounded-full ${dotColor} ring-2 ring-white shadow-md`} />
                {loc.status !== 'NORMAL' && (
                  <div className={`absolute inset-0 rounded-full ${dotColor} animate-ping opacity-60`} />
                )}
              </div>
              <div className={`px-2 py-0.5 rounded-lg border text-xs font-semibold whitespace-nowrap shadow-sm ${labelColor}`}>
                {loc.name} — {loc.fill}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Critical</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> High</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Normal</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [online, setOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate live data ticks
  useEffect(() => {
    const timer = setInterval(() => setLastUpdate(new Date()), 30000);
    const handleOnline  = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { clearInterval(timer); window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  const criticalCount  = CONTAINERS.filter(c => c.status === 'CRITICAL').length;
  const activeVehicles = VEHICLES.filter(v => v.status === 'ACTIVE').length;
  const pendingCount   = COLLECTION_REQUESTS.filter(r => r.status === 'PENDING').length;
  const unresolvedAlerts = ALERTS.filter(a => !a.resolved).length;

  const pieData = CATEGORY_OVERVIEW.map(c => ({ name: c.category, value: c.fill, color: CATEGORY_COLORS[c.category].hex }));

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Real-time Biomedical Waste Management Overview</p>
        </div>
        <div className="flex items-center gap-3">
          {online
            ? <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-medium"><Wifi size={12}/> Live</span>
            : <span className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full font-medium"><WifiOff size={12}/> Offline Mode</span>
          }
          <span className="text-xs text-slate-400 flex items-center gap-1"><RefreshCw size={11}/> {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Waste Today" value="184.6 KG" subtitle="↑ +12 KG vs yesterday" accent="blue"   icon={<Package2 size={20}/>} />
        <KpiCard title="Active Containers"  value="24"       subtitle="of 30 containers"       accent="emerald" icon={<Activity size={20}/>} />
        <KpiCard title="Pending Collection" value={pendingCount} subtitle="awaiting assignment" accent="amber" icon={<Truck size={20}/>} />
        <KpiCard title="Critical"  value={criticalCount}  subtitle="require immediate action" accent="red"    icon={<AlertTriangle size={20}/>} />
        <KpiCard title="Completed Today"    value="18"       subtitle="collections done"        accent="purple" icon={<CheckCircle2 size={20}/>} />
        <KpiCard title="Active Vehicles"    value={activeVehicles} subtitle="on collection route" accent="slate" icon={<Truck size={20}/>} />
      </div>

      {/* Category Overview + Pie */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="font-bold text-slate-700 mb-4">Waste Category Overview</h3>
          <div className="space-y-4">
            {CATEGORY_OVERVIEW.map(cat => {
              const cc = CATEGORY_COLORS[cat.category];
              return (
                <div key={cat.category} className={`rounded-xl border p-4 ${cc.bg} ${cc.border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${cc.fill}`} />
                      <span className={`font-bold ${cc.text}`}>{cat.category.toUpperCase()} BIN</span>
                      <span className={`text-xs ${cc.text} opacity-70`}>{cat.desc}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-600 font-medium">{cat.weight} KG</span>
                      <span className="text-slate-500">{cat.containers} containers</span>
                      <StatusBadge status={cat.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FillBar fill={cat.fill} category={cat.category} />
                    <span className={`text-sm font-bold ${cc.text} w-10 text-right`}>{cat.fill}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie chart */}
        <div className="card flex flex-col items-center justify-center">
          <h3 className="font-bold text-slate-700 mb-2 self-start">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}% full`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {CATEGORY_OVERVIEW.map(c => (
              <span key={c.category} className="flex items-center gap-1 text-xs text-slate-600">
                <span className={`w-2.5 h-2.5 rounded-full ${CATEGORY_COLORS[c.category].fill}`} />
                {c.category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Map + Bar chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <FacilityMap />
        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Weekly Waste Generation (KG)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ANALYTICS_WEEKLY} barSize={10} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="yellow" name="Yellow" fill="#eab308" radius={[4,4,0,0]} />
              <Bar dataKey="red"    name="Red"    fill="#ef4444" radius={[4,4,0,0]} />
              <Bar dataKey="white"  name="White"  fill="#94a3b8" radius={[4,4,0,0]} />
              <Bar dataKey="blue"   name="Blue"   fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts + Active Containers strips */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Recent Alerts</h3>
          <div className="space-y-2">
            {ALERTS.filter(a => !a.resolved).slice(0, 4).map(a => (
              <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl text-sm border
                ${a.type === 'CRITICAL' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                <span className="text-base mt-0.5">{a.icon}</span>
                <div>
                  <p className={`font-semibold ${a.type === 'CRITICAL' ? 'text-red-700' : 'text-amber-700'}`}>{a.type}</p>
                  <p className="text-slate-600">{a.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.timestamp}</p>
                </div>
              </div>
            ))}
            {unresolvedAlerts === 0 && <p className="text-slate-400 text-sm text-center py-4">No unresolved alerts 🎉</p>}
          </div>
        </div>

        {/* Critical containers */}
        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Containers Needing Attention</h3>
          <div className="space-y-2">
            {CONTAINERS.filter(c => c.status !== 'NORMAL').slice(0, 5).map(c => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <CategoryBadge category={c.category} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{c.id}</p>
                  <p className="text-xs text-slate-500">{c.location}</p>
                </div>
                <div className="w-24">
                  <FillBar fill={c.fillLevel} category={c.category} />
                  <p className="text-xs text-right text-slate-500 mt-0.5">{c.fillLevel}%</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
        ⚠️ <strong>Disclaimer:</strong> MEDI-TRACK is a prototype decision-support and monitoring system. Actual deployment must comply with applicable biomedical-waste regulations, validated segregation procedures, authorized treatment requirements, healthcare-facility protocols and safety standards.
      </div>
    </div>
  );
}
