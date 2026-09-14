import React, { useState, useMemo, useEffect } from 'react';
import ManagerNavBar from './manager/ManagerNavBar.jsx';
import ComplaintManagement from './manager/ComplaintManagement.jsx';
import AIClassification from './manager/AIClassification.jsx';
import PriorityManagement from './manager/PriorityManagement.jsx';
import DepartmentManagement from './manager/DepartmentManagement.jsx';
import WorkerAssignment from './manager/WorkerAssignment.jsx';

/**
 * Nagarmitra Manager Triage Portal
 * --------------------------------
 * Modular Coordinator Component unifying 5 core operational triage modules:
 * 1. Complaint Management (Full triage table, filters, status transitions, detailed ticket inspection)
 * 2. AI Classification (Vision model confidence breakdown, agreement status, manual category override)
 * 3. Priority Management (SLA matrix, severity escalation, active SLA countdowns)
 * 4. Department Management (Departmental workload distribution, inter-department transfers, capacity)
 * 5. Worker Assignment (Field workforce directory, availability tracking, 1-click task dispatch)
 */
export default function ManagerDashboard({
  complaints = [],
  onUpdateComplaint,
  onNotification,
  initialModule = 'complaints',
  onModuleChange,
}) {
  // Active module: 'complaints' | 'ai' | 'priority' | 'departments' | 'workers'
  const [activeTab, setActiveTab] = useState(initialModule);

  useEffect(() => {
    if (initialModule) {
      setActiveTab(initialModule);
    }
  }, [initialModule]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (onModuleChange) onModuleChange(tab);
  };

  // Selected ticket for detailed review
  const [selectedTicketId, setSelectedTicketId] = useState(() => {
    return complaints.length > 0 ? complaints[0].id : null;
  });

  const selectedTicket = useMemo(() => {
    return complaints.find((c) => c.id === selectedTicketId) || complaints[0] || null;
  }, [complaints, selectedTicketId]);

  // Workforce Directory State
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'Ramesh Kumar',
      department: 'Roads & Infrastructure',
      badge: 'ROADS-W01',
      status: 'available',
      phone: '+91 98201-11001',
      ward: 'Ward 8 Ashok Nagar',
      activeTickets: 1,
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Sunita Devi',
      department: 'Sanitation & Waste Management',
      badge: 'SAN-W02',
      status: 'busy',
      phone: '+91 98201-11002',
      ward: 'Ward 3 Gandhi Market',
      activeTickets: 2,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Mohammed Tariq',
      department: 'Electrical & Public Lighting',
      badge: 'ELEC-W03',
      status: 'busy',
      phone: '+91 98201-11003',
      ward: 'Ward 12 Shivaji Nagar',
      activeTickets: 1,
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Pooja Sharma',
      department: 'Water Supply & Urban Drainage',
      badge: 'WATER-W04',
      status: 'available',
      phone: '+91 98201-11004',
      ward: 'Ward 4 Gomti Enclave',
      activeTickets: 0,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Devendra Joshi',
      department: 'Roads & Infrastructure',
      badge: 'ROADS-W05',
      status: 'available',
      phone: '+91 98201-11005',
      ward: 'Ward 7 South Ring Road',
      activeTickets: 0,
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Meera Sen',
      department: 'Sanitation & Waste Management',
      badge: 'SAN-W06',
      status: 'available',
      phone: '+91 98201-11006',
      ward: 'Ward 2 Patel Nagar',
      activeTickets: 1,
      rating: 4.8,
    },
  ]);

  // Departments Registry
  const departmentsList = [
    {
      id: 'roads',
      name: 'Roads & Infrastructure',
      lead: 'Eng. Rajesh Patel',
      phone: 'Ext. 401',
      slaRate: 97.4,
      avgResolutionHours: 28,
      fleetCount: '6 Asphalt Crews, 3 Steamrollers',
    },
    {
      id: 'sanitation',
      name: 'Sanitation & Waste Management',
      lead: 'Dr. Sunita Rao',
      phone: 'Ext. 402',
      slaRate: 95.8,
      avgResolutionHours: 12,
      fleetCount: '12 Compactor Trucks, 8 Sweepers',
    },
    {
      id: 'electrical',
      name: 'Electrical & Public Lighting',
      lead: 'Vikram Seth',
      phone: 'Ext. 403',
      slaRate: 94.2,
      avgResolutionHours: 18,
      fleetCount: '4 Cherry Picker Bucket Units',
    },
    {
      id: 'water',
      name: 'Water Supply & Urban Drainage',
      lead: 'Priya Nair',
      phone: 'Ext. 404',
      slaRate: 96.1,
      avgResolutionHours: 22,
      fleetCount: '5 High-Pressure Jetting Machines',
    },
    {
      id: 'parks',
      name: 'Parks & Environmental Conservation',
      lead: 'Amit Verma',
      phone: 'Ext. 405',
      slaRate: 98.0,
      avgResolutionHours: 36,
      fleetCount: '3 Arborist & Tree Trimming Units',
    },
  ];

  const avgConfidence = complaints.length
    ? Math.round(complaints.reduce((acc, curr) => acc + (curr.ai_confidence || 90), 0) / complaints.length)
    : 94;

  const criticalCount = complaints.filter(
    (c) => (c.severity || '').toLowerCase() === 'critical'
  ).length;

  const availableWorkersCount = workers.filter((w) => w.status === 'available').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub-Navigation & Header Banner */}
      <ManagerNavBar
        activeTab={activeTab}
        onTabSwitch={handleTabSwitch}
        complaintsCount={complaints.length}
        avgConfidence={avgConfidence}
        criticalCount={criticalCount}
        departmentsCount={departmentsList.length}
        availableWorkersCount={availableWorkersCount}
        totalWorkersCount={workers.length}
      />

      {/* Module 1: Complaint Management */}
      {activeTab === 'complaints' && (
        <ComplaintManagement
          complaints={complaints}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicketId}
          onUpdateComplaint={onUpdateComplaint}
          onNotification={onNotification}
          onSwitchTab={handleTabSwitch}
        />
      )}

      {/* Module 2: AI Classification */}
      {activeTab === 'ai' && (
        <AIClassification
          complaints={complaints}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicketId}
          avgConfidence={avgConfidence}
          onUpdateComplaint={onUpdateComplaint}
          onNotification={onNotification}
        />
      )}

      {/* Module 3: Priority Management */}
      {activeTab === 'priority' && (
        <PriorityManagement
          complaints={complaints}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicketId}
          onUpdateComplaint={onUpdateComplaint}
          onNotification={onNotification}
        />
      )}

      {/* Module 4: Department Management */}
      {activeTab === 'departments' && (
        <DepartmentManagement
          complaints={complaints}
          departmentsList={departmentsList}
          selectedTicket={selectedTicket}
          onUpdateComplaint={onUpdateComplaint}
          onNotification={onNotification}
        />
      )}

      {/* Module 5: Worker Assignment */}
      {activeTab === 'workers' && (
        <WorkerAssignment
          workers={workers}
          setWorkers={setWorkers}
          complaints={complaints}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicketId}
          onUpdateComplaint={onUpdateComplaint}
          onNotification={onNotification}
        />
      )}
    </div>
  );
}
