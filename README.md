# Nagarmitra (CivicSync) 🌱🏛️
### AI-Powered Municipal Civic Complaint Redressal & Automated Triage System

CivicSync is a full-stack civic complaint management platform designed to automate urban municipal grievance redressal. It combines **React (Vite)**, **Python (Flask)**, a **YOLO/OpenCV AI Vision Classifier**, and a **MySQL** relational database to streamline problem reporting, automated triage, staff dispatch, and resolution verification.

---

## 🌟 Core Features

- **👤 Citizen Portal (`CitizenDashboard.jsx`)**:
  - Intuitive complaint reporting with photo evidence upload.
  - Interactive **AI Vision Pre-Scan** simulating automated category detection before submission.
  - Interactive **Resolution Milestone Timeline** tracking complaints from submission to resolution.

- **👔 Manager Triage Board (`ManagerDashboard.jsx`)**:
  - Live municipal dashboard tracking open reports, AI classification confidence, and department queues.
  - Supervise and override AI tags with audit trail justification.
  - Dispatch tasks directly to field operatives according to department and availability.

- **👷 Worker Field Operations (`WorkerDashboard.jsx`)**:
  - Real-time task queue showing assigned complaints, location, and citizen photos.
  - Status updates: En Route → In Progress → Resolved.
  - **Proof-of-Work Verification Interface** featuring side-by-side Before/After photo comparison.

- **🤖 AI Classification Module (`ai_service/model.py`)**:
  - Automated detection of civic issues: Potholes, Garbage Dumps, Streetlight Failures, Water Leaks, Broken Sidewalks, and Fallen Trees.
  - Department auto-routing and dynamic severity assessment.
  - Robust fallback heuristic mode ensuring flawless operation out-of-the-box.

---

## 📂 Project Directory Structure

```
civicsync/
├── ai_service/
│   ├── model.py            # AI vision classifier with YOLO/OpenCV logic & fallback
│   └── weights/
│       └── README.md       # Directory for YOLO/ONNX model weight checkpoints
├── backend/
│   ├── app.py              # Flask entrypoint with modular Blueprints
│   ├── config.py           # Configuration with PyMySQL & environment support
│   ├── models.py           # SQLAlchemy ORM models (Users, Complaints, Workers, etc.)
│   └── requirements.txt    # Python backend dependencies
├── database/
│   └── schema.sql          # Complete MySQL schema with constraints & seed data
├── frontend/
│   ├── index.html          # Vite HTML template with Google Fonts & metadata
│   ├── package.json        # Frontend dependencies (React 18, Vite)
│   ├── vite.config.js      # Vite build & proxy configuration
│   └── src/
│       ├── App.jsx         # Main navigation shell & shared state
│       ├── index.css       # Neo-Glassmorphism design tokens & styles
│       ├── main.jsx        # React root entry point
│       └── components/
│           ├── CitizenDashboard.jsx
│           ├── ManagerDashboard.jsx
│           └── WorkerDashboard.jsx
├── .env.example            # Environment variables template
├── implementation_plan.md  # Detailed phase-by-phase development plan
└── README.md               # Project guide and instructions
```

---

## 🚀 Quick Start Guide

### 1. Database Setup (MySQL)
Ensure MySQL service is running locally, then initialize the database and tables:
```bash
mysql -u root -p < database/schema.sql
```
*Creates the database `civisync_db` with all tables and initial seed data.*

### 2. Backend Setup (Flask)
1. Navigate to the backend directory and set up a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy environment configuration:
   ```bash
   cp ../.env.example .env
   ```
4. Start the Flask development server:
   ```bash
   python app.py
   ```
   *The API will be available at `http://127.0.0.1:5000`.*

### 3. Frontend Setup (React / Vite)
1. Open a new terminal in the `frontend/` directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser to explore the CivicSync interface.

---

## 📡 REST API Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & subsystem check |
| `GET` | `/api/complaints` | Fetch list of complaints (with filters) |
| `POST` | `/api/complaints` | Citizen submits new complaint with photo |
| `GET` | `/api/complaints/<id>/timeline` | Fetch audit timeline for a complaint |
| `POST` | `/api/ai/classify` | Perform vision inference on image |
| `GET` | `/api/manager/complaints` | Fetch complaints for manager triage |
| `POST` | `/api/manager/assign` | Assign field operative to a complaint |
| `POST` | `/api/manager/override-category` | Manually override AI category tag |
| `GET` | `/api/worker/tasks` | Get assigned tasks for worker |
| `POST` | `/api/worker/tasks/<id>/resolve` | Worker uploads proof-of-work photo |

---

## 🔐 Roles & Demonstration Credentials

| Role | Name | Email | Default Status |
|---|---|---|---|
| **Citizen** | Aarav Sharma | `aarav@citizen.nagarmitra.gov.in` | Active |
| **Manager** | Eng. Rajesh Patel | `rajesh.patel@roads.nagarmitra.gov.in` | Active |
| **Worker** | Ramesh Kumar | `ramesh.kumar@worker.nagarmitra.gov.in` | Available (`ROADS-W01`) |
| **Admin** | Municipal Administrator | `admin@nagarmitra.gov.in` | Active |

---

## 📄 License
This project is licensed under the MIT License.
