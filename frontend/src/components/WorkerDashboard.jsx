import React, { useState, useEffect, useMemo } from 'react';
import FieldOpsNavBar from './field-operations/FieldOpsNavBar.jsx';
import AssignedComplaints from './field-operations/AssignedComplaints.jsx';
import TaskDetails from './field-operations/TaskDetails.jsx';
import StatusUpdates from './field-operations/StatusUpdates.jsx';
import ProofOfResolution from './field-operations/ProofOfResolution.jsx';

/**
 * Field Operations Coordinator
 * Connects the 4 dedicated modular sub-components:
 * 1. Assigned Complaints (Queue & Filters)
 * 2. Task Details (Site Telemetry, Safety PPE & Citizen Evidence)
 * 3. Status Updates (Field Lifecycle Transitions & Activity Log)
 * 4. Proof of Resolution (Before/After Photo Verification & Signoff)
 */
export default function WorkerDashboard({
  complaints = [],
  onUpdateComplaint,
  onNotification,
  initialModule = 'assigned',
  onModuleChange,
}) {
  // Current logged in field operative profile
  const workerProfile = {
    name: 'Marcus Vance',
    badge: 'ROADS-W01',
    department: 'Roads & Infrastructure',
    phone: '+91 98201-11001',
    rating: '4.9 ★',
    activeShift: 'Day Shift (08:00 - 17:00)',
    ward: 'Downtown Ward 8',
  };

  // Active module tab: 'assigned' | 'details' | 'status' | 'proof'
  const [activeTab, setActiveTab] = useState(initialModule);

  useEffect(() => {
    if (initialModule) {
      setActiveTab(initialModule);
    }
  }, [initialModule]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onModuleChange) onModuleChange(tab);
  };

  // Filter tasks assigned to this worker or department
  const myTasks = useMemo(() => {
    return complaints.filter(
      (c) =>
        c.assigned_worker_name === workerProfile.name ||
        (!c.assigned_worker_name && c.category === 'pothole')
    );
  }, [complaints, workerProfile.name]);

  // Selected task state
  const [selectedTaskId, setSelectedTaskId] = useState(() => {
    return myTasks.length > 0 ? myTasks[0].id : complaints.length > 0 ? complaints[0].id : null;
  });

  const selectedTask = useMemo(() => {
    return complaints.find((c) => c.id === selectedTaskId) || myTasks[0] || complaints[0] || null;
  }, [complaints, selectedTaskId, myTasks]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Field Operative Institutional Profile Banner */}
      <div className="field-profile-banner">
        <div className="field-profile-left">
          <div className="field-profile-avatar">👷</div>
          <div className="field-profile-info">
            <div className="field-profile-badge-row">
              <span className="field-badge-id">{workerProfile.badge}</span>
              <span className="field-badge-dept">{workerProfile.department}</span>
              <span className="field-badge-shift">{workerProfile.activeShift}</span>
            </div>
            <h1 className="field-profile-name">{workerProfile.name}</h1>
            <p className="field-profile-sub">
              Field Operative Console • Primary Jurisdiction: {workerProfile.ward} • Emergency Dispatch Direct Line: {workerProfile.phone}
            </p>
          </div>
        </div>

        <div className="field-profile-right">
          <div className="field-stat-badge">
            <span className="stat-num">{workerProfile.rating}</span>
            <span className="stat-lbl">Citizen Quality Score</span>
          </div>
          <div className="field-stat-badge">
            <span className="stat-num">{myTasks.filter((t) => t.status === 'resolved').length}</span>
            <span className="stat-lbl">Resolved This Week</span>
          </div>
        </div>
      </div>

      {/* Field Operations 4-Module Sub-Navigation Bar */}
      <FieldOpsNavBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        assignedCount={myTasks.length}
        activeTask={selectedTask}
      />

      {/* Module 1: Assigned Complaints */}
      {activeTab === 'assigned' && (
        <AssignedComplaints
          tasks={myTasks}
          selectedTaskId={selectedTaskId}
          onSelectTask={setSelectedTaskId}
          onNavigateTab={handleTabChange}
        />
      )}

      {/* Module 2: Task Details */}
      {activeTab === 'details' && (
        <TaskDetails
          task={selectedTask}
          onNavigateTab={handleTabChange}
        />
      )}

      {/* Module 3: Status Updates */}
      {activeTab === 'status' && (
        <StatusUpdates
          task={selectedTask}
          onUpdateTask={onUpdateComplaint}
          onNotification={onNotification}
          onNavigateTab={handleTabChange}
        />
      )}

      {/* Module 4: Proof of Resolution */}
      {activeTab === 'proof' && (
        <ProofOfResolution
          task={selectedTask}
          onUpdateTask={onUpdateComplaint}
          onNotification={onNotification}
          onNavigateTab={handleTabChange}
        />
      )}
    </div>
  );
}
