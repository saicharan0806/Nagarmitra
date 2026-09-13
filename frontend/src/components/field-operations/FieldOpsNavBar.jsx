import React from 'react';

/**
 * Field Operations Sub-Navigation Bar
 * Displays the 4 core operational modules for field technicians:
 * 1. Assigned Complaints
 * 2. Task Details
 * 3. Status Updates
 * 4. Proof of Resolution
 */
export default function FieldOpsNavBar({
  activeTab = 'assigned',
  onTabChange,
  assignedCount = 0,
  activeTask = null,
}) {
  return (
    <div className="field-tabs-bar" role="tablist" aria-label="Field Operations Modules">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'assigned'}
        className={`field-tab-btn ${activeTab === 'assigned' ? 'active' : ''}`}
        onClick={() => onTabChange('assigned')}
      >
        <span className="field-tab-icon">📋</span>
        <span className="field-tab-text">Assigned Complaints</span>
        <span className="field-tab-badge">{assignedCount} Active</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'details'}
        className={`field-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
        onClick={() => onTabChange('details')}
      >
        <span className="field-tab-icon">🔍</span>
        <span className="field-tab-text">Task Details</span>
        {activeTask && (
          <span className="field-tab-badge monospace-id">
            {activeTask.tracking_id}
          </span>
        )}
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'status'}
        className={`field-tab-btn ${activeTab === 'status' ? 'active' : ''}`}
        onClick={() => onTabChange('status')}
      >
        <span className="field-tab-icon">🔄</span>
        <span className="field-tab-text">Status Updates</span>
        {activeTask && (
          <span className="field-tab-badge status-tag">
            {activeTask.status.replace('_', ' ')}
          </span>
        )}
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'proof'}
        className={`field-tab-btn ${activeTab === 'proof' ? 'active' : ''}`}
        onClick={() => onTabChange('proof')}
      >
        <span className="field-tab-icon">📸</span>
        <span className="field-tab-text">Proof of Resolution</span>
        {activeTask?.proof_image_url && (
          <span className="field-tab-badge resolved-badge">
            ✓ Verified
          </span>
        )}
      </button>
    </div>
  );
}
