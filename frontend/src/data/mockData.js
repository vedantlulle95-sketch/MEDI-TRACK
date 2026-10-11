// ─── MEDI-TRACK CENTRAL MOCK DATA STORE ───────────────────────────────────────
// All simulated/demo data for the prototype. No real patient data.

export const CONTAINERS = [
  { id: 'BMW-Y-001', category: 'Yellow', location: 'ICU',          fillLevel: 87, weight: 7.4,  temperature: 28, lid: 'Locked',   status: 'HIGH',     lastCollection: '2026-10-10 08:00', battery: 82, department: 'Critical Care' },
  { id: 'BMW-Y-002', category: 'Yellow', location: 'General Ward', fillLevel: 42, weight: 3.6,  temperature: 27, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 06:00', battery: 91, department: 'General' },
  { id: 'BMW-Y-003', category: 'Yellow', location: 'Pharmacy',     fillLevel: 35, weight: 2.9,  temperature: 26, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 07:00', battery: 77, department: 'Pharmacy' },
  { id: 'BMW-R-001', category: 'Red',    location: 'OT',           fillLevel: 83, weight: 6.1,  temperature: 29, lid: 'Locked',   status: 'HIGH',     lastCollection: '2026-10-10 09:00', battery: 64, department: 'Surgery' },
  { id: 'BMW-R-002', category: 'Red',    location: 'Emergency',    fillLevel: 61, weight: 4.5,  temperature: 27, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 05:00', battery: 88, department: 'Emergency' },
  { id: 'BMW-R-003', category: 'Red',    location: 'Laboratory',   fillLevel: 78, weight: 5.8,  temperature: 28, lid: 'Locked',   status: 'HIGH',     lastCollection: '2026-10-10 10:00', battery: 72, department: 'Pathology' },
  { id: 'BMW-W-001', category: 'White',  location: 'ICU',          fillLevel: 94, weight: 2.1,  temperature: 27, lid: 'Locked',   status: 'CRITICAL', lastCollection: '2026-10-09 08:00', battery: 55, department: 'Critical Care' },
  { id: 'BMW-W-002', category: 'White',  location: 'OT',           fillLevel: 71, weight: 1.6,  temperature: 28, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 06:00', battery: 93, department: 'Surgery' },
  { id: 'BMW-W-003', category: 'White',  location: 'Laboratory',   fillLevel: 58, weight: 1.3,  temperature: 27, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 04:00', battery: 80, department: 'Pathology' },
  { id: 'BMW-B-001', category: 'Blue',   location: 'Laboratory',   fillLevel: 43, weight: 8.2,  temperature: 26, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 07:00', battery: 95, department: 'Pathology' },
  { id: 'BMW-B-002', category: 'Blue',   location: 'Pharmacy',     fillLevel: 31, weight: 5.9,  temperature: 26, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-11 08:00', battery: 89, department: 'Pharmacy' },
  { id: 'BMW-Y-004', category: 'Yellow', location: 'Vaccination',  fillLevel: 66, weight: 5.6,  temperature: 28, lid: 'Locked',   status: 'NORMAL',   lastCollection: '2026-10-10 12:00', battery: 74, department: 'Vaccination' },
];

export const VEHICLES = [
  { id: 'MV-01', operator: 'CW-018 — Ramesh Kumar',   status: 'ACTIVE',   battery: 82, capacity: 68, currentLocation: 'ICU',       route: ['ICU','Laboratory','OT','Pharmacy'], completedStops: 0 },
  { id: 'MV-02', operator: 'CW-022 — Priya Sharma',   status: 'STANDBY',  battery: 94, capacity: 22, currentLocation: 'Base',      route: [], completedStops: 0 },
  { id: 'MV-03', operator: 'CW-031 — Sanjay Patel',   status: 'CHARGING', battery: 47, capacity: 0,  currentLocation: 'Depot',     route: [], completedStops: 0 },
];

export const WORKERS = [
  { id: 'CW-018', name: 'Ramesh Kumar',    assignment: 'ICU → Lab → OT',       ppe: { gloves: true, mask: true, clothing: true, faceProtection: true, footwear: true }, status: 'READY' },
  { id: 'CW-022', name: 'Priya Sharma',    assignment: 'Emergency → Gen Ward',  ppe: { gloves: true, mask: true, clothing: true, faceProtection: true, footwear: true }, status: 'READY' },
  { id: 'CW-031', name: 'Sanjay Patel',    assignment: 'Off Duty',              ppe: { gloves: false, mask: false, clothing: false, faceProtection: false, footwear: false }, status: 'OFF_DUTY' },
  { id: 'CW-009', name: 'Anita Desai',     assignment: 'Pharmacy → Vaccination',ppe: { gloves: true, mask: true, clothing: true, faceProtection: false, footwear: true }, status: 'ON_ROUTE' },
  { id: 'CW-014', name: 'Vijay Singh',     assignment: 'OT Support',            ppe: { gloves: true, mask: true, clothing: true, faceProtection: true, footwear: true }, status: 'READY' },
];

export const COLLECTION_REQUESTS = [
  { id: 'CR-001', priority: 'CRITICAL', location: 'ICU',       containerId: 'BMW-W-001', fill: 94, category: 'White',  status: 'PENDING',    requestedAt: '10:32 AM', assignedVehicle: null,  assignedWorker: null,   priorityScore: 96 },
  { id: 'CR-002', priority: 'HIGH',     location: 'ICU',       containerId: 'BMW-Y-001', fill: 87, category: 'Yellow', status: 'PENDING',    requestedAt: '09:15 AM', assignedVehicle: null,  assignedWorker: null,   priorityScore: 84 },
  { id: 'CR-003', priority: 'HIGH',     location: 'OT',        containerId: 'BMW-R-001', fill: 83, category: 'Red',    status: 'PENDING',    requestedAt: '09:45 AM', assignedVehicle: null,  assignedWorker: null,   priorityScore: 79 },
  { id: 'CR-004', priority: 'HIGH',     location: 'Laboratory',containerId: 'BMW-R-003', fill: 78, category: 'Red',    status: 'SCHEDULED',  requestedAt: '08:50 AM', assignedVehicle: 'MV-01', assignedWorker: 'CW-018', priorityScore: 72 },
  { id: 'CR-005', priority: 'NORMAL',   location: 'Pharmacy',  containerId: 'BMW-Y-003', fill: 35, category: 'Yellow', status: 'SCHEDULED',  requestedAt: '11:00 AM', assignedVehicle: 'MV-01', assignedWorker: 'CW-018', priorityScore: 31 },
];

export const ALERTS = [
  { id: 'ALT-001', type: 'CRITICAL', message: 'BMW-W-001 (ICU) — SHARPS container at 94% — Immediate collection required', containerId: 'BMW-W-001', timestamp: '10:32 AM', resolved: false, icon: '🚨' },
  { id: 'ALT-002', type: 'WARNING',  message: 'BMW-Y-001 (ICU) — Yellow container approaching capacity (87%)', containerId: 'BMW-Y-001', timestamp: '09:15 AM', resolved: false, icon: '⚠️' },
  { id: 'ALT-003', type: 'WARNING',  message: 'BMW-R-001 (OT) — Red container at 83% — Schedule collection soon', containerId: 'BMW-R-001', timestamp: '09:45 AM', resolved: false, icon: '⚠️' },
  { id: 'ALT-004', type: 'INFO',     message: 'MV-01 assigned to collection route: ICU → Lab → OT → Pharmacy', containerId: null, timestamp: '09:50 AM', resolved: true,  icon: 'ℹ️' },
  { id: 'ALT-005', type: 'WARNING',  message: 'MV-03 battery below 50% — Initiating charging cycle', containerId: null, timestamp: '08:30 AM', resolved: true,  icon: '⚡' },
  { id: 'ALT-006', type: 'CRITICAL', message: 'Tamper Alert — BMW-Y-003 (Pharmacy) opened without authorization', containerId: 'BMW-Y-003', timestamp: '07:12 AM', resolved: true,  icon: '🔓' },
  { id: 'ALT-007', type: 'INFO',     message: 'BMW-R-003 (Lab) collected successfully — Waste Passport updated', containerId: 'BMW-R-003', timestamp: '11:05 AM', resolved: true,  icon: '✅' },
  { id: 'ALT-008', type: 'WARNING',  message: 'Abnormal temperature detected — BMW-R-001 reading 34°C', containerId: 'BMW-R-001', timestamp: '08:05 AM', resolved: true,  icon: '🌡️' },
  { id: 'ALT-009', type: 'INFO',     message: 'Daily collection report generated — 18 collections completed', containerId: null, timestamp: '07:00 AM', resolved: true,  icon: '📊' },
  { id: 'ALT-010', type: 'WARNING',  message: 'BMW-R-003 (Lab) average fill rate exceeds 10%/hr — Pre-schedule recommended', containerId: 'BMW-R-003', timestamp: '06:30 AM', resolved: true, icon: '📈' },
];

export const WASTE_RECORDS = [
  { id: 'WR-001', containerId: 'BMW-W-001', category: 'White',  source: 'ICU',          weight: 7.2,  timestamp: '10:32 AM', collector: 'CW-018', vehicle: 'MV-01', status: 'HANDED_OVER',  destination: 'Authorized Treatment Facility A' },
  { id: 'WR-002', containerId: 'BMW-R-003', category: 'Red',    source: 'Laboratory',   weight: 5.8,  timestamp: '09:15 AM', collector: 'CW-018', vehicle: 'MV-01', status: 'IN_TRANSIT',   destination: 'Authorized Treatment Facility A' },
  { id: 'WR-003', containerId: 'BMW-Y-002', category: 'Yellow', source: 'General Ward', weight: 3.6,  timestamp: '08:40 AM', collector: 'CW-022', vehicle: 'MV-02', status: 'COLLECTED',    destination: 'Authorized Treatment Facility B' },
  { id: 'WR-004', containerId: 'BMW-B-001', category: 'Blue',   source: 'Laboratory',   weight: 8.2,  timestamp: '08:00 AM', collector: 'CW-009', vehicle: 'MV-02', status: 'HANDED_OVER',  destination: 'Authorized Treatment Facility B' },
  { id: 'WR-005', containerId: 'BMW-W-002', category: 'White',  source: 'OT',           weight: 1.6,  timestamp: '07:30 AM', collector: 'CW-014', vehicle: 'MV-01', status: 'HANDED_OVER',  destination: 'Authorized Treatment Facility A' },
  { id: 'WR-006', containerId: 'BMW-R-002', category: 'Red',    source: 'Emergency',    weight: 4.5,  timestamp: '07:00 AM', collector: 'CW-022', vehicle: 'MV-02', status: 'HANDED_OVER',  destination: 'Authorized Treatment Facility A' },
  { id: 'WR-007', containerId: 'BMW-Y-003', category: 'Yellow', source: 'Pharmacy',     weight: 2.9,  timestamp: '06:30 AM', collector: 'CW-009', vehicle: 'MV-02', status: 'HANDED_OVER',  destination: 'Authorized Treatment Facility B' },
  { id: 'WR-008', containerId: 'BMW-Y-004', category: 'Yellow', source: 'Vaccination',  weight: 5.6,  timestamp: '06:00 AM', collector: 'CW-018', vehicle: 'MV-01', status: 'HANDED_OVER',  destination: 'Authorized Treatment Facility B' },
];

export const ANALYTICS_WEEKLY = [
  { day: 'Mon', yellow: 42, red: 31, white: 12, blue: 18, total: 103 },
  { day: 'Tue', yellow: 38, red: 27, white: 10, blue: 22, total: 97  },
  { day: 'Wed', yellow: 51, red: 35, white: 14, blue: 20, total: 120 },
  { day: 'Thu', yellow: 44, red: 29, white: 11, blue: 25, total: 109 },
  { day: 'Fri', yellow: 60, red: 40, white: 16, blue: 28, total: 144 },
  { day: 'Sat', yellow: 33, red: 22, white: 9,  blue: 15, total: 79  },
  { day: 'Sun', yellow: 28, red: 19, white: 7,  blue: 12, total: 66  },
];

export const DEPARTMENT_WASTE = [
  { dept: 'ICU',          waste: 45 },
  { dept: 'OT',           waste: 38 },
  { dept: 'Emergency',    waste: 32 },
  { dept: 'Laboratory',   waste: 28 },
  { dept: 'General Ward', waste: 22 },
  { dept: 'Pharmacy',     waste: 12 },
  { dept: 'Vaccination',  waste: 8  },
];

export const FACILITY_LOCATIONS = [
  { id: 'ICU',        name: 'ICU',               fill: 94, status: 'CRITICAL', containers: 2, x: 20,  y: 20  },
  { id: 'OT',         name: 'Operation Theatre', fill: 83, status: 'HIGH',     containers: 2, x: 60,  y: 20  },
  { id: 'LAB',        name: 'Laboratory',        fill: 78, status: 'HIGH',     containers: 3, x: 80,  y: 50  },
  { id: 'EMERGENCY',  name: 'Emergency',         fill: 61, status: 'NORMAL',   containers: 1, x: 20,  y: 65  },
  { id: 'PHARMACY',   name: 'Pharmacy',          fill: 35, status: 'NORMAL',   containers: 2, x: 60,  y: 75  },
  { id: 'WARD',       name: 'General Ward',      fill: 42, status: 'NORMAL',   containers: 1, x: 40,  y: 50  },
  { id: 'VACC',       name: 'Vaccination',       fill: 66, status: 'NORMAL',   containers: 1, x: 40,  y: 80  },
];

export const WASTE_ITEMS = [
  { id: 'used-glove',       label: 'Used Glove',           category: 'Red',    confidence: 96, container: 'BMW-R-002', icon: '🧤' },
  { id: 'syringe',          label: 'Syringe / Sharp',      category: 'White',  confidence: 99, container: 'BMW-W-001', icon: '💉' },
  { id: 'contaminated-bag', label: 'Contaminated Plastic', category: 'Red',    confidence: 94, container: 'BMW-R-001', icon: '🛍️' },
  { id: 'glass-vial',       label: 'Glass Vial',           category: 'Blue',   confidence: 97, container: 'BMW-B-001', icon: '🧪' },
  { id: 'dressing',         label: 'Soiled Dressing',      category: 'Yellow', confidence: 93, container: 'BMW-Y-001', icon: '🩹' },
  { id: 'pharma-waste',     label: 'Pharmaceutical Waste', category: 'Yellow', confidence: 98, container: 'BMW-Y-003', icon: '💊' },
  { id: 'anatomical',       label: 'Anatomical Waste',     category: 'Yellow', confidence: 95, container: 'BMW-Y-002', icon: '🫀' },
  { id: 'metallic-implant', label: 'Metallic Implant',     category: 'Blue',   confidence: 91, container: 'BMW-B-002', icon: '🔩' },
];

export const CATEGORY_COLORS = {
  Yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700', dot: 'bg-yellow-400', hex: '#eab308', fill: 'bg-yellow-400' },
  Red:    { bg: 'bg-red-100',    border: 'border-red-300',    text: 'text-red-700',    dot: 'bg-red-400',    hex: '#ef4444', fill: 'bg-red-400'    },
  White:  { bg: 'bg-slate-100',  border: 'border-slate-300',  text: 'text-slate-700',  dot: 'bg-slate-400',  hex: '#94a3b8', fill: 'bg-slate-400'  },
  Blue:   { bg: 'bg-blue-100',   border: 'border-blue-300',   text: 'text-blue-700',   dot: 'bg-blue-400',   hex: '#3b82f6', fill: 'bg-blue-400'   },
};

export const CATEGORY_DESCRIPTIONS = {
  Yellow: 'Anatomical / soiled / pharmaceutical / chemical waste',
  Red:    'Contaminated recyclable plastic waste',
  White:  'Sharps (syringes, needles, blades)',
  Blue:   'Glassware / metallic implants',
};

export const STATUS_CONFIG = {
  CRITICAL: { label: 'CRITICAL', className: 'bg-red-100 text-red-700 border border-red-200',    dot: 'bg-red-500',    icon: '🚨' },
  HIGH:     { label: 'HIGH',     className: 'bg-amber-100 text-amber-700 border border-amber-200', dot: 'bg-amber-500', icon: '⚠️' },
  NORMAL:   { label: 'NORMAL',   className: 'bg-emerald-100 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500', icon: '✅' },
};
