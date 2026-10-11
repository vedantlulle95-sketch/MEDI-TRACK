import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Recycle, Box, Truck, Map, FileText,
  BarChart3, Bell, Settings, ShieldCheck, Play, Menu, X, AlertTriangle
} from 'lucide-react';
import Dashboard          from './pages/Dashboard';
import SegregationStation from './pages/SegregationStation';
import Containers         from './pages/Containers';
import CollectionManagement from './pages/CollectionManagement';
import MobileVehicle      from './pages/MobileVehicle';
import RouteSimulation    from './pages/RouteSimulation';
import DigitalWastePassport from './pages/DigitalWastePassport';
import Analytics          from './pages/Analytics';
import AlertsPage         from './pages/Alerts';
import LiveDemo           from './pages/LiveDemo';
import { ALERTS }         from './data/mockData';

const NAV = [
  { name: 'Dashboard',       path: '/',            icon: <LayoutDashboard size={18} /> },
  { name: 'Live Demo',       path: '/demo',         icon: <Play size={18} />,          highlight: true },
  { name: 'Segregation',     path: '/segregation',  icon: <Recycle size={18} /> },
  { name: 'Containers',      path: '/containers',   icon: <Box size={18} /> },
  { name: 'Collection',      path: '/collection',   icon: <Truck size={18} /> },
  { name: 'Vehicle & Route', path: '/vehicle',      icon: <Map size={18} /> },
  { name: 'Route Planner',   path: '/routes',       icon: <Map size={18} /> },
  { name: 'Waste Passport',  path: '/passport',     icon: <FileText size={18} /> },
  { name: 'Analytics',       path: '/analytics',    icon: <BarChart3 size={18} /> },
  { name: 'Alerts',          path: '/alerts',       icon: <Bell size={18} /> },
];

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const unresolvedAlerts = ALERTS.filter(a => !a.resolved).length;

  return (
    <>
      {/* Overlay on mobile */}
      {open && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 shadow-sm flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Recycle size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">MEDI-TRACK</h1>
              <p className="text-[10px] text-slate-400 leading-tight">Smart BMW Management</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(item => {
            const isActive = location.pathname === item.path;
            const alertBadge = item.path === '/alerts' && unresolvedAlerts > 0;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${item.highlight && !isActive
                    ? 'text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <span className={isActive ? 'text-white' : item.highlight ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {alertBadge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unresolvedAlerts}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-blue-500" />
            <span>Prototype v1.0 — SIH 2026</span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1 leading-tight">Not for clinical deployment</p>
        </div>
      </aside>
    </>
  );
}

function Header({ setOpen }) {
  const location = useLocation();
  const unresolvedAlerts = ALERTS.filter(a => !a.resolved).length;
  const pageName = NAV.find(n => n.path === location.pathname)?.name ?? 'Dashboard';

  return (
    <header className="bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setOpen(p => !p)}>
          <Menu size={22} />
        </button>
        <h2 className="font-semibold text-slate-800 text-base">{pageName}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/demo" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-all">
          <Play size={12} /> START LIVE DEMO
        </Link>
        <Link to="/alerts" className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <Bell size={20} />
          {unresolvedAlerts > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Link>
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">A</div>
      </div>
    </header>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Routes>
              <Route path="/"           element={<Dashboard />} />
              <Route path="/demo"       element={<LiveDemo />} />
              <Route path="/segregation" element={<SegregationStation />} />
              <Route path="/containers" element={<Containers />} />
              <Route path="/collection" element={<CollectionManagement />} />
              <Route path="/vehicle"    element={<MobileVehicle />} />
              <Route path="/routes"     element={<RouteSimulation />} />
              <Route path="/passport"   element={<DigitalWastePassport />} />
              <Route path="/analytics"  element={<Analytics />} />
              <Route path="/alerts"     element={<AlertsPage />} />
              <Route path="*"           element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
