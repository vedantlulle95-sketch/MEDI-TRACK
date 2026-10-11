# MEDI-TRACK — Smart Mobile Medical-Waste Collection & Segregation System

**Segregate Smart. Collect Safe. Track Every Waste.**

MEDI-TRACK is a complete prototype for a Smart Mobile Medical-Waste Collection and Segregation System. It connects waste segregation to smart containers, monitoring, collection requests, mobile collection vehicles, GPS/Routes, and Digital Waste Passports.

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm

### Installation & Setup

1. **Clone the repository / open the folder:**
   ```bash
   cd medi-track
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run start
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Recharts, Lucide React
* **Backend:** Node.js, Express, TypeScript

## 🌟 Key Features

1. **Real-time Dashboard:** Monitor total waste, active containers, and pending collections across the facility.
2. **Smart Segregation Station:** AI-assisted classification of biomedical waste into standard categories (Yellow, Red, White, Blue).
3. **Smart Containers System:** Live monitoring of fill percentage, weight, temperature, and lid status.
4. **Intelligent Alerts:** Real-time notifications for critical capacity, abnormal temperatures, or tampering.
5. **Collection Management:** Dynamic prioritization and routing for mobile collection vehicles.
6. **Digital Waste Passport:** End-to-end tracking of waste from generation to treatment facility handover.
7. **Analytics Engine:** Insights into waste generation trends, department-wise distribution, and operational efficiency.
8. **Live Demo Mode:** A 1-click simulation illustrating the complete waste management lifecycle.

## 📡 IoT Integration

MEDI-TRACK is designed to interface with real hardware (e.g., ESP32-based smart dustbins with ultrasonic and weight sensors). 
In the prototype phase, the system provides a **Simulation Mode** allowing users to manually adjust sensor parameters (fill level, weight, temperature) to demonstrate real-time dashboard updates and automated alert generation.

### Example IoT Payload

```json
{
  "containerId": "BMW-W-007",
  "fillLevel": 94,
  "weight": 7.2,
  "temperature": 28.4,
  "lid": "locked",
  "battery": 87
}
```

## ⚠️ Disclaimer

> “MEDI-TRACK is a prototype decision-support and monitoring system. Actual deployment must comply with applicable biomedical-waste regulations, validated segregation procedures, authorized treatment requirements, healthcare-facility protocols, and safety standards.”
