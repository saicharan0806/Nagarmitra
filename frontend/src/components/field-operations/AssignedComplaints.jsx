import React, { useState, useMemo } from 'react';

/**
 * Module 1: Assigned Complaints
 * Field Operative Task Queue, Work Order Filters & Quick Select
 */
export default function AssignedComplaints({
  tasks = [],
  selectedTaskId,
  onSelectTask,
  onNavigateTab,
}) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchPriority =
        priorityFilter === 'all' ||
        (t.severity || 'medium').toLowerCase() === priorityFilter.toLowerCase();
      const matchSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tracking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchPriority && matchSearch;
    });
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  // Operational metrics
  const totalAssigned = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress' || t.status === 'assigned').length;
  const completedCount = tasks.filter((t) => t.status === 'resolved').length;
  const criticalCount = tasks.filter((t) => (t.severity || '').toLowerCase() === 'critical').length;

  return (
    <div className="field-module-container animate-fade-in">
      {/* Operative Metric Summary Ribbon */}
      <div className="field-metrics-grid">
        <div className="field-metric-card border-green">
          <div className="field-metric-label">Assigned Work Orders</div>
          <div className="field-metric-value">{totalAssigned}</div>
          <div className="field-metric-sub">Active shift assignments</div>
        </div>

        <div className="field-metric-card border-amber">
          <div className="field-metric-label">In Field Execution</div>
          <div className="field-metric-value">{inProgressCount}</div>
          <div className="field-metric-sub">Work currently ongoing</div>
        </div>

        <div className="field-metric-card border-red">
          <div className="field-metric-label">Critical Priority</div>
          <div className="field-metric-value">{criticalCount}</div>
          <div className="field-metric-sub">4-12hr emergency SLA</div>
        </div>

        <div className="field-metric-card border-emerald">
          <div className="field-metric-label">Verified Closures</div>
          <div className="field-metric-value">{completedCount}</div>
          <div className="field-metric-sub">Photographic proof verified</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="field-controls-bar">
        <div className="field-search-wrap">
          <span className="field-search-icon">🔍</span>
          <input
            type="text"
            className="field-search-input"
            placeholder="Search assigned tickets by ID, street address, or issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="field-clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="field-filter-group">
          <select
            className="field-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Task Statuses</option>
            <option value="assigned">Assigned / Dispatched</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending Triage</option>
            <option value="resolved">Resolved & Closed</option>
          </select>

          <select
            className="field-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priority Levels</option>
            <option value="critical">🔴 Critical SLA</option>
            <option value="high">🟠 High Priority</option>
            <option value="medium">🟡 Medium Standard</option>
            <option value="low">🟢 Low Routine</option>
          </select>
        </div>
      </div>

      {/* Task List Grid */}
      {filteredTasks.length === 0 ? (
        <div className="field-empty-state">
          <div className="field-empty-icon">📂</div>
          <h3 className="field-empty-title">No Assigned Complaints Found</h3>
          <p className="field-empty-desc">
            No work orders match the current filters. Adjust your search or check back when new tickets are dispatched by your department manager.
          </p>
        </div>
      ) : (
        <div className="field-task-list">
          {filteredTasks.map((task) => {
            const isSelected = selectedTaskId === task.id;
            return (
              <div
                key={task.id}
                className={`field-task-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectTask(task.id)}
              >
                {/* Card Top Row */}
                <div className="field-task-header">
                  <div className="field-task-id-group">
                    <span className="field-task-id">{task.tracking_id}</span>
                    <span className="field-task-category">
                      {getCategoryIcon(task.category)} {task.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="field-task-badges">
                    {renderPriorityBadge(task.severity)}
                    <span className={`field-status-badge status-${task.status}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Card Title & Location */}
                <h3 className="field-task-title">{task.title}</h3>
                <p className="field-task-desc">{task.description}</p>

                <div className="field-task-location">
                  <span className="field-loc-icon">📍</span>
                  <span>{task.address || 'Location coordinates on file'}</span>
                </div>

                {/* Card Bottom Actions */}
                <div className="field-task-footer">
                  <div className="field-task-date">
                    <span>Assigned:</span> {new Date(task.created_at).toLocaleDateString()}
                  </div>
                  <div className="field-task-actions">
                    <button
                      type="button"
                      className="field-action-btn btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTask(task.id);
                        onNavigateTab('details');
                      }}
                    >
                      <span>🔍 Details</span>
                    </button>
                    <button
                      type="button"
                      className="field-action-btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTask(task.id);
                        onNavigateTab('status');
                      }}
                    >
                      <span>🔄 Update Status</span>
                    </button>
                    {task.status !== 'resolved' && (
                      <button
                        type="button"
                        className="field-action-btn btn-emerald"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTask(task.id);
                          onNavigateTab('proof');
                        }}
                      >
                        <span>📸 Upload Proof</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getCategoryIcon(category) {
  switch (category) {
    case 'pothole':
      return '🕳️';
    case 'garbage_dump':
      return '🗑️';
    case 'street_light':
      return '💡';
    case 'water_leakage':
      return '💧';
    case 'broken_sidewalk':
      return '🧱';
    case 'fallen_tree':
      return '🌳';
    default:
      return '⚠️';
  }
}

function renderPriorityBadge(severity = 'medium') {
  const sev = severity.toLowerCase();
  switch (sev) {
    case 'critical':
      return <span className="badge-priority-critical">🔴 Critical SLA</span>;
    case 'high':
      return <span className="badge-priority-high">🟠 High</span>;
    case 'medium':
      return <span className="badge-priority-medium">🟡 Medium</span>;
    case 'low':
      return <span className="badge-priority-low">🟢 Low</span>;
    default:
      return <span className="badge-priority-medium">🟡 Medium</span>;
  }
}
