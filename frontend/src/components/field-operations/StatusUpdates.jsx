import React, { useState } from 'react';

/**
 * Module 3: Status Updates
 * Operational Lifecycle Switcher, Field Activity Notes & Live Milestones
 */
export default function StatusUpdates({
  task,
  onUpdateTask,
  onNotification,
  onNavigateTab,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local log of field updates for this session
  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      timestamp: 'Today, 08:30 AM',
      status: 'assigned',
      note: 'Work order dispatched by Roads Directorate Supervisor.',
      author: 'System Dispatch',
    },
  ]);

  if (!task) {
    return (
      <div className="field-module-container animate-fade-in">
        <div className="field-empty-state">
          <div className="field-empty-icon">🔄</div>
          <h3 className="field-empty-title">No Task Selected</h3>
          <p className="field-empty-desc">
            Please select an assigned complaint from the list to update its operational status.
          </p>
          <button
            type="button"
            className="govt-btn-primary"
            onClick={() => onNavigateTab('assigned')}
          >
            Go to Assigned Complaints
          </button>
        </div>
      </div>
    );
  }

  // Handle status update
  const handleSetStatus = (newStatus, defaultNote) => {
    setIsSubmitting(true);
    try {
      const noteToRecord = defaultNote;
      const updated = {
        ...task,
        status: newStatus === 'ready_for_proof' ? 'in_progress' : newStatus,
        sub_status: newStatus,
        last_updated: new Date().toISOString(),
      };

      onUpdateTask(updated);

      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: newStatus,
        note: noteToRecord,
        author: task.assigned_worker_name || 'Field Operative',
      };

      setActivityLog((prev) => [logEntry, ...prev]);

      onNotification(`Status updated: Ticket ${task.tracking_id} is now ${newStatus.replace('_', ' ').toUpperCase()}.`);

      if (newStatus === 'ready_for_proof') {
        onNavigateTab('proof');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStatus = task.sub_status || task.status;

  return (
    <div className="field-module-container animate-fade-in">
      {/* Header Banner */}
      <div className="field-details-header">
        <div>
          <div className="field-details-sub-tag">
            <span>OPERATIONAL STATUS MANAGEMENT</span>
            <span className="bullet-sep">•</span>
            <span>{task.tracking_id}</span>
          </div>
          <h2 className="field-details-title">Update Lifecycle for: {task.title}</h2>
          <p className="field-task-desc" style={{ marginTop: '0.25rem' }}>
            Current Status: <strong>{currentStatus.replace('_', ' ').toUpperCase()}</strong>
          </p>
        </div>
      </div>

      {/* Interactive Status Transition Actions */}
      <div className="field-card">
        <div className="field-card-header">
          <h3 className="field-card-title">⚡ Operational Transition Controls</h3>
          <span className="field-card-tag">One-Click Dispatch</span>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.25rem' }}>
          Select the current stage of your field deployment. Updates are broadcast live to the Department Manager console and Citizen Tracking portal.
        </p>

        <div className="field-status-actions-grid">
          {/* Action 1: En Route */}
          <button
            type="button"
            className={`field-status-action-card ${currentStatus === 'en_route' ? 'active' : ''}`}
            onClick={() => handleSetStatus('en_route', 'Field operative en route with equipment van.')}
            disabled={isSubmitting || task.status === 'resolved'}
          >
            <span className="status-action-icon">🚚</span>
            <div className="status-action-text">
              <strong>1. En Route to Site</strong>
              <small>Departed municipal depot with required tools</small>
            </div>
          </button>

          {/* Action 2: On-Site */}
          <button
            type="button"
            className={`field-status-action-card ${currentStatus === 'on_site' ? 'active' : ''}`}
            onClick={() => handleSetStatus('on_site', 'Arrived at incident location. Safety perimeter deployed.')}
            disabled={isSubmitting || task.status === 'resolved'}
          >
            <span className="status-action-icon">📍</span>
            <div className="status-action-text">
              <strong>2. Arrived On-Site</strong>
              <small>Deploy safety cones and inspect site hazard</small>
            </div>
          </button>

          {/* Action 3: In Progress */}
          <button
            type="button"
            className={`field-status-action-card ${currentStatus === 'in_progress' ? 'active' : ''}`}
            onClick={() => handleSetStatus('in_progress', 'Repairs actively underway on site.')}
            disabled={isSubmitting || task.status === 'resolved'}
          >
            <span className="status-action-icon">🛠️</span>
            <div className="status-action-text">
              <strong>3. Work In Progress</strong>
              <small>Active physical repair, excavation, or clearing</small>
            </div>
          </button>

          {/* Action 4: Delay / Hazard Alert */}
          <button
            type="button"
            className={`field-status-action-card border-amber ${currentStatus === 'delayed' ? 'active' : ''}`}
            onClick={() => handleSetStatus('delayed', 'Temporary delay encountered (weather or traffic obstruction).')}
            disabled={isSubmitting || task.status === 'resolved'}
          >
            <span className="status-action-icon">⚠️</span>
            <div className="status-action-text">
              <strong>4. Flag Temporary Delay</strong>
              <small>Heavy rain, underground utilities, or traffic hazard</small>
            </div>
          </button>

          {/* Action 5: Complete & Go To Proof */}
          <button
            type="button"
            className="field-status-action-card border-green"
            onClick={() => handleSetStatus('ready_for_proof', 'Physical work completed. Proceeding to proof photo capture.')}
            disabled={isSubmitting || task.status === 'resolved'}
          >
            <span className="status-action-icon">📸</span>
            <div className="status-action-text">
              <strong>5. Physical Work Complete</strong>
              <small>Finish job and proceed to mandatory proof upload</small>
            </div>
          </button>
        </div>
      </div>

      {/* Activity Timeline Audit Log */}
      <div className="field-card" style={{ marginTop: '1.5rem' }}>
        <div className="field-card-header">
          <h3 className="field-card-title">📋 Field Activity Log</h3>
          <span className="field-card-tag">Chronological Audit</span>
        </div>

        <div className="field-activity-list">
          {activityLog.map((log) => (
            <div key={log.id} className="field-activity-row">
              <div className="field-activity-dot" />
              <div className="field-activity-content">
                <div className="field-activity-header">
                  <span className="field-activity-time">{log.timestamp}</span>
                  <span className={`field-status-badge status-${log.status}`}>
                    {log.status.replace('_', ' ')}
                  </span>
                  <span className="field-activity-author">By: {log.author}</span>
                </div>
                <p className="field-activity-note">{log.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
