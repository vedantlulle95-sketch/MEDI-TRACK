import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { SectionHeader } from '../components/ui';
import { ANALYTICS_WEEKLY, DEPARTMENT_WASTE, CATEGORY_COLORS } from '../data/mockData';

const COLLECTION_RATE = [
  { day: 'Mon', rate: 94 }, { day: 'Tue', rate: 88 }, { day: 'Wed', rate: 96 },
  { day: 'Thu', rate: 91 }, { day: 'Fri', rate: 98 }, { day: 'Sat', rate: 85 }, { day: 'Sun', rate: 80 },
];

const CONTAINER_UTIL = [
  { name: 'Yellow', utilization: 68 }, { name: 'Red', utilization: 74 },
  { name: 'White',  utilization: 82 }, { name: 'Blue', utilization: 55 },
];

export default function Analytics() {
  const [range, setRange] = useState('7 Days');

  return (
    <div className="space-y-6 fade-in-up">
      <SectionHeader title="Analytics" subtitle="Waste generation trends and operational insights">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {['Today', '7 Days', '30 Days'].map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                ${range === r ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
              {r}
            </button>
          ))}
        </div>
      </SectionHeader>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Waste',         value: '718 KG',  sub: 'this week',  color: 'text-blue-600' },
          { label: 'Avg Daily',           value: '102 KG',  sub: 'per day',    color: 'text-purple-600' },
          { label: 'Collection Rate',     value: '93%',     sub: 'on-time',    color: 'text-emerald-600' },
          { label: 'Avg Collection Time', value: '28 min',  sub: 'per pickup', color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-semibold text-slate-700 mt-1">{s.label}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="card">
        <h3 className="font-bold text-slate-700 mb-4">Waste Generated This Week (KG)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ANALYTICS_WEEKLY} barSize={12} barGap={2}>
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Department bar */}
        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Department-wise Waste (KG)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DEPARTMENT_WASTE} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 12, fill: '#64748b' }} width={90} />
              <Tooltip />
              <Bar dataKey="waste" name="Waste (KG)" fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Collection rate line */}
        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Collection Completion Rate (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={COLLECTION_RATE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" name="Rate %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="card flex flex-col items-center">
          <h3 className="font-bold text-slate-700 mb-4 self-start">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Yellow', value: 38 }, { name: 'Red', value: 29 },
                  { name: 'White',  value: 14 }, { name: 'Blue', value: 19 },
                ]}
                cx="50%" cy="50%" outerRadius={75} paddingAngle={3} dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {['Yellow','Red','White','Blue'].map((cat,i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[cat].hex} />
                ))}
              </Pie>
              <Tooltip formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Container utilization */}
        <div className="card">
          <h3 className="font-bold text-slate-700 mb-4">Container Utilization</h3>
          <div className="space-y-4">
            {CONTAINER_UTIL.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-700">{c.name} Containers</span>
                  <span className="font-bold text-slate-700">{c.utilization}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{ width: `${c.utilization}%`, backgroundColor: CATEGORY_COLORS[c.name].hex }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
