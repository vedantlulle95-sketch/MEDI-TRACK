import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// --- MOCK DATA ---

let containers = [
  { id: 'C001', type: 'Red', location: 'Ward A', status: 'Active', fillLevel: 45, battery: 80, lastUpdated: new Date().toISOString() },
  { id: 'C002', type: 'Yellow', location: 'Ward B', status: 'Full', fillLevel: 95, battery: 60, lastUpdated: new Date().toISOString() },
  { id: 'C003', type: 'Blue', location: 'Lab 1', status: 'Active', fillLevel: 20, battery: 90, lastUpdated: new Date().toISOString() }
];

let collections = [
  { id: 'COL-101', date: '2026-09-30', status: 'Scheduled', vehicleId: 'V01', routes: ['Ward A', 'Ward B'] },
  { id: 'COL-102', date: '2026-09-29', status: 'Completed', vehicleId: 'V02', routes: ['Lab 1'] }
];

let vehicles = [
  { id: 'V01', driver: 'John Doe', status: 'On Route', capacity: 1000, currentLoad: 400, location: { lat: 40.7128, lng: -74.0060 } },
  { id: 'V02', driver: 'Jane Smith', status: 'Available', capacity: 1500, currentLoad: 0, location: { lat: 40.7138, lng: -74.0070 } }
];

let alerts = [
  { id: 'A001', message: 'Container C002 is full', type: 'Warning', timestamp: new Date().toISOString(), read: false },
  { id: 'A002', message: 'Vehicle V01 deviation', type: 'Critical', timestamp: new Date().toISOString(), read: false }
];

let wasteRecords = [
  { id: 'WR001', type: 'Red', weight: 15.5, collectedAt: '2026-09-29T10:00:00Z', facility: 'Incinerator A' },
  { id: 'WR002', type: 'Yellow', weight: 22.0, collectedAt: '2026-09-29T11:30:00Z', facility: 'Autoclave B' }
];

// --- ROUTES ---

// Dashboard stats
app.get('/api/dashboard', (req, res) => {
  res.json({
    totalContainers: containers.length,
    activeAlerts: alerts.filter(a => !a.read).length,
    activeVehicles: vehicles.filter(v => v.status === 'On Route').length,
    totalWasteCollected: wasteRecords.reduce((acc, curr) => acc + curr.weight, 0)
  });
});

// Containers
app.get('/api/containers', (req, res) => res.json(containers));
app.post('/api/containers', (req, res) => {
  const newContainer = { id: `C${String(containers.length + 1).padStart(3, '0')}`, ...req.body, lastUpdated: new Date().toISOString() };
  containers.push(newContainer);
  res.status(201).json(newContainer);
});

// Collections
app.get('/api/collections', (req, res) => res.json(collections));
app.post('/api/collections', (req, res) => {
  const newCollection = { id: `COL-${100 + collections.length + 1}`, ...req.body };
  collections.push(newCollection);
  res.status(201).json(newCollection);
});

// Vehicles
app.get('/api/vehicles', (req, res) => res.json(vehicles));

// Alerts
app.get('/api/alerts', (req, res) => res.json(alerts));
app.put('/api/alerts/:id/read', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  if (alert) {
    alert.read = true;
    res.json(alert);
  } else {
    res.status(404).send('Alert not found');
  }
});

// Waste Records
app.get('/api/waste-records', (req, res) => res.json(wasteRecords));

// IoT Simulation Endpoint
app.post('/api/simulation/iot', (req, res) => {
  const { containerId, fillLevel, battery } = req.body;
  const container = containers.find(c => c.id === containerId);
  
  if (container) {
    container.fillLevel = fillLevel ?? container.fillLevel;
    container.battery = battery ?? container.battery;
    container.lastUpdated = new Date().toISOString();
    
    if (container.fillLevel >= 90) {
      alerts.unshift({
        id: `A${String(alerts.length + 1).padStart(3, '0')}`,
        message: `Container ${container.id} is at ${container.fillLevel}% capacity`,
        type: 'Warning',
        timestamp: new Date().toISOString(),
        read: false
      });
    }
    
    res.json(container);
  } else {
    res.status(404).send('Container not found');
  }
});

app.listen(port, () => {
  console.log(`MEDI-TRACK Backend running on http://localhost:${port}`);
});
