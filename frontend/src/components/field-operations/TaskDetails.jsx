import React from 'react';

/**
 * Module 2: Task Details
 * Comprehensive In-Depth Work Order Inspection, Site Coordinates, Safety Equipment & Photos
 */
export default function TaskDetails({
  task,
  onNavigateTab,
}) {
  if (!task) {
    return (
      <div className="field-module-container animate-fade-in">
        <div className="field-empty-state">
          <div className="field-empty-icon">🔍</div>
          <h3 className="field-empty-title">No Task Selected</h3>
          <p className="field-empty-desc">
            Select a complaint from the "Assigned Complaints" list to inspect detailed coordinates, citizen photographs, and safety protocols.
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

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    task.address || '40.7128,-74.0060'
  )}`;

  return (
    <div className="field-module-container animate-fade-in">
      {/* Top Banner with Tracking Bar */}
      <div className="field-details-header">
        <div>
          <div className="field-details-sub-tag">
            <span>OFFICIAL MUNICIPAL WORK ORDER</span>
            <span className="bullet-sep">•</span>
            <span>{task.department_name || 'Roads & Public Infrastructure'}</span>
          </div>
          <h2 className="field-details-title">{task.title}</h2>
          <div className="field-details-id-strip">
            <span className="field-details-id-badge">ID: {task.tracking_id}</span>
            <span className="field-details-category-badge">
              Category: {task.category.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`field-details-status-badge status-${task.status}`}>
              Status: {task.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        <div className="field-details-header-actions">
          <button
            type="button"
            className="govt-btn-primary"
            onClick={() => onNavigateTab('status')}
          >
            <span>🔄 Update Status</span>
          </button>
          {task.status !== 'resolved' && (
            <button
              type="button"
              className="govt-btn-secondary"
              onClick={() => onNavigateTab('proof')}
            >
              <span>📸 Submit Proof</span>
            </button>
          )}
        </div>
      </div>

      {/* Two Column In-Depth Grid */}
      <div className="field-details-grid">
        {/* Left Column: Photographic Evidence & Citizen Grievance */}
        <div className="field-card">
          <div className="field-card-header">
            <h3 className="field-card-title">📷 Citizen Photographic Evidence & Report</h3>
            <span className="field-card-tag">Initial Ingest</span>
          </div>

          <div className="field-photo-box">
            {task.image_url ? (
              <img
                src={task.image_url}
                alt={task.title}
                className="field-task-image"
              />
            ) : (
              <div className="field-no-image">
                <span>📷</span>
                <p>No citizen image uploaded with this report.</p>
              </div>
            )}
            <div className="field-photo-caption">
              <span>Timestamp: {new Date(task.created_at).toLocaleString()}</span>
              <span>Geotag: Verified</span>
            </div>
          </div>

          <div className="field-meta-block">
            <h4 className="field-meta-heading">Citizen Problem Description</h4>
            <p className="field-meta-text">{task.description}</p>
          </div>

          <div className="field-meta-block">
            <h4 className="field-meta-heading">Site Address & GPS Telemetry</h4>
            <div className="field-address-box">
              <div className="field-address-text">
                <span className="field-loc-icon">📍</span>
                <span>{task.address || '452 Main Street, Downtown Central Ward 8'}</span>
              </div>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="field-map-btn"
              >
                <span>🗺️ Open In Google Maps ↗</span>
              </a>
            </div>
            <div className="field-coordinates-row">
              <span>Latitude: <strong>40.7128° N</strong></span>
              <span>Longitude: <strong>74.0060° W</strong></span>
              <span>Accuracy: <strong>± 3.2m</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: Work Order Logistics, Safety Equipment & Lifecycle */}
        <div className="field-card">
          <div className="field-card-header">
            <h3 className="field-card-title">🛠️ Field Protocols & Dispatch Orders</h3>
            <span className="field-card-tag">Operative Safety</span>
          </div>

          {/* Safety Gear Requirements */}
          <div className="field-meta-block">
            <h4 className="field-meta-heading">Mandatory Personal Protective Equipment (PPE)</h4>
            <div className="field-ppe-grid">
              <div className="field-ppe-item">
                <span className="field-ppe-icon">🦺</span>
                <div>
                  <strong>High-Visibility Safety Vest</strong>
                  <small>Class 3 Fluorescent Day/Night</small>
                </div>
              </div>
              <div className="field-ppe-item">
                <span className="field-ppe-icon">⛑️</span>
                <div>
                  <strong>Standard Municipal Hard Hat</strong>
                  <small>ANSI/ISEA Z89.1 Certified</small>
                </div>
              </div>
              <div className="field-ppe-item">
                <span className="field-ppe-icon">🥾</span>
                <div>
                  <strong>Steel-Toe Work Boots</strong>
                  <small>Puncture Resistant Sole</small>
                </div>
              </div>
              <div className="field-ppe-item">
                <span className="field-ppe-icon">⚠️</span>
                <div>
                  <strong>Traffic Diversion Cones</strong>
                  <small>Set up 15m perimeter</small>
                </div>
              </div>
            </div>
          </div>

          {/* Department Dispatch Instructions */}
          <div className="field-meta-block">
            <h4 className="field-meta-heading">Supervisor Dispatch Notes</h4>
            <div className="field-supervisor-box">
              <p>
                <strong>Directorate Instruction:</strong> Inspect foundation depth before applying cold-mix asphalt patch. Verify pedestrian safety barrier remains secure until surface sets. Mandatory post-repair photograph required prior to job sign-off.
              </p>
              <div className="field-supervisor-sig">
                <span>Dispatch Supervisor: <strong>Eng. Rajesh Patel (Lead)</strong></span>
                <span>Authorized: <strong>Municipal Operations Center</strong></span>
              </div>
            </div>
          </div>

          {/* Audit Lifecycle Stepper */}
          <div className="field-meta-block">
            <h4 className="field-meta-heading">Work Order Timeline</h4>
            <div className="field-timeline">
              <div className="field-timeline-step completed">
                <div className="field-timeline-marker">✓</div>
                <div className="field-timeline-info">
                  <strong>Citizen Grievance Registered</strong>
                  <small>{new Date(task.created_at).toLocaleDateString()} • Geotagged Ingest</small>
                </div>
              </div>
              <div className="field-timeline-step completed">
                <div className="field-timeline-marker">✓</div>
                <div className="field-timeline-info">
                  <strong>AI Computer Vision Classification</strong>
                  <small>Model confidence {task.ai_confidence || 94.8}% • Auto-routed to {task.department_name}</small>
                </div>
              </div>
              <div className={`field-timeline-step ${task.status !== 'pending' ? 'completed' : 'active'}`}>
                <div className="field-timeline-marker">
                  {task.status !== 'pending' ? '✓' : '•'}
                </div>
                <div className="field-timeline-info">
                  <strong>Field Operative Assigned</strong>
                  <small>Dispatched to {task.assigned_worker_name || 'Marcus Vance (ROADS-W01)'}</small>
                </div>
              </div>
              <div className={`field-timeline-step ${task.status === 'in_progress' ? 'active' : task.status === 'resolved' ? 'completed' : ''}`}>
                <div className="field-timeline-marker">
                  {task.status === 'resolved' ? '✓' : '•'}
                </div>
                <div className="field-timeline-info">
                  <strong>On-Site Field Operations</strong>
                  <small>{task.status === 'in_progress' ? 'Work in progress right now' : task.status === 'resolved' ? 'Repairs completed' : 'Awaiting arrival'}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
