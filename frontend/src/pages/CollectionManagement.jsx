import React, { useState } from 'react';
import { SectionHeader, StatusBadge, CategoryBadge, FillBar, PriorityRing, Modal } from '../components/ui';
import { COLLECTION_REQUESTS, VEHICLES, WORKERS } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

const PRIORITY_COLORS = {
  CRITICAL: 'text-red-700 bg-red-50 border-l-4 border-red-500',
  HIGH:     'text-amber-700 bg-amber-50 border-l-4 border-amber-400',
  NORMAL:   'text-slate-700 bg-white border-l-4 border-slate-200',
};

export default function CollectionManagement() {
  const [requests, setRequests] = useState(COLLECTION_REQUESTS);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const { toasts, toast, remove } = useToast();

  const filtered = requests.filter(r => filterStatus === 'All' || r.status === filterStatus);

  const assignVehicle = (id) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, assignedVehicle: 'MV-01', status: 'SCHEDULED' } : r
    ));
    toast('Vehicle MV-01 assigned successfully', 'success');
    setSelected(null);
  };

  const assignWorker = (id) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, assignedWorker: 'CW-018', status: 'SCHEDULED' } : r
    ));
    toast('Worker CW-018 assigned successfully', 'success');
  };

  const startCollection = (id) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'IN_PROGRESS' } : r
    ));
    toast('Collection started!', 'info');
    setSelected(null);
  };

  const markCollected = (id) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'COLLECTED' } : r
    ));
    toast('Container marked as collected ✅', 'success');
    setSelected(null);
  };

  const req = selected ? requests.find(r => r.id === selected) : null;

  return (
    <div className="space-y-6 fade-in-up">
      <Toast toasts={toasts} remove={remove} />
      <SectionHeader title="Collection Management" subtitle="Manage and track biomedical waste collection requests">
        <select
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {['PENDING','SCHEDULED','IN_PROGRESS','COLLECTED'].map(s => <option key={s}>{s}</option>)}
        </select>
      </SectionHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Pending',     val: requests.filter(r=>r.status==='PENDING').length,     color:'text-amber-600',  bg:'bg-amber-50  border-amber-200' },
          { label: 'Scheduled',   val: requests.filter(r=>r.status==='SCHEDULED').length,   color:'text-blue-600',   bg:'bg-blue-50   border-blue-200' },
          { label: 'In Progress', val: requests.filter(r=>r.status==='IN_PROGRESS').length, color:'text-purple-600', bg:'bg-purple-50 border-purple-200' },
          { label: 'Collected',   val: requests.filter(r=>r.status==='COLLECTED').length,   color:'text-emerald-600',bg:'bg-emerald-50 border-emerald-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-4 text-center ${s.bg}`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Requests table */}
      <div className="card overflow-x-auto">
        <h3 className="font-bold text-slate-700 mb-4">Collection Requests</h3>
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Container</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Fill</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="py-3 px-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(r => (
              <tr key={r.id} className={`transition-colors hover:bg-slate-50 ${PRIORITY_COLORS[r.priority].split(' ').slice(2).join(' ')}`}>
                <td className="py-3 px-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full
                    ${r.priority==='CRITICAL' ? 'bg-red-100 text-red-700' : r.priority==='HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    {r.priority}
                  </span>
                </td>
                <td className="py-3 px-2 font-mono text-xs font-semibold text-slate-700">{r.containerId}</td>
                <td className="py-3 px-2 text-slate-600">{r.location}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2 w-24">
                    <FillBar fill={r.fill} category={r.category} />
                    <span className="text-xs font-bold text-slate-700">{r.fill}%</span>
                  </div>
                </td>
                <td className="py-3 px-2"><CategoryBadge category={r.category} /></td>
                <td className="py-3 px-2">
                  <span className={`text-xs font-bold ${r.priorityScore>=85 ? 'text-red-600' : r.priorityScore>=65 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {r.priorityScore}
                  </span>
                </td>
                <td className="py-3 px-2"><StatusBadge status={r.status} /></td>
                <td className="py-3 px-2">
                  <button onClick={() => setSelected(r.id)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 py-8 text-sm">No requests match the current filter.</p>
        )}
      </div>

      {/* Priority Engine Info */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🧠 Priority Engine</h3>
        <p className="text-xs text-blue-600 mb-3">Prototype decision-support mechanism. Not a legally approved medical-waste risk score.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs text-blue-700">
          {['Fill Percentage (40%)','Waste Category (25%)','Time Since Collection (20%)','Location Risk (10%)','Container Status (5%)'].map((f,i) => (
            <div key={i} className="bg-white rounded-lg p-2 border border-blue-100 text-center font-medium">{f}</div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Request Details — ${selected}`} width="max-w-lg">
        {req && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Container', req.containerId], ['Location', req.location],
                ['Category', req.category], ['Fill Level', `${req.fill}%`],
                ['Priority', req.priority], ['Score', req.priorityScore],
                ['Vehicle', req.assignedVehicle || '—'], ['Worker', req.assignedWorker || '—'],
                ['Requested', req.requestedAt],
              ].map(([k,v]) => (
                <div key={k} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 font-semibold">{k}</p>
                  <p className="font-bold text-slate-800">{v}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {req.status === 'PENDING' && (
                <>
                  <button onClick={() => assignVehicle(req.id)} className="btn-primary text-sm">🚛 Assign Vehicle (MV-01)</button>
                  <button onClick={() => assignWorker(req.id)} className="btn-secondary text-sm">👷 Assign Worker (CW-018)</button>
                </>
              )}
              {req.status === 'SCHEDULED' && (
                <button onClick={() => startCollection(req.id)} className="btn-primary text-sm">▶️ Start Collection</button>
              )}
              {req.status === 'IN_PROGRESS' && (
                <button onClick={() => markCollected(req.id)} className="btn-primary text-sm bg-emerald-600 hover:bg-emerald-700">✅ Mark Collected</button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
