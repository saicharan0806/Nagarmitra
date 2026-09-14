import React from 'react';

/**
 * ManagerNavBar Component
 * ------------------------
 * Institutional Triage Header & 5-Module Navigation Bar with live badge metrics.
 */
export default function ManagerNavBar({
  activeTab,
  onTabSwitch,
  complaintsCount = 0,
  avgConfidence = 94,
  criticalCount = 0,
  departmentsCount = 5,
  availableWorkersCount = 0,
  totalWorkersCount = 0,
}) {
  return (
    <>
      {/* Top Banner with Eco-Civic Identity */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderTop: '4px solid #16A34A',
          borderRadius: '6px',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#16A34A',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            <span>🏛️</span>
            <span>Municipal Departmental Operations & Triage Command</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0B1220', margin: '0.25rem 0 0.2rem 0' }}>
            Manager Triage Dashboard
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
            Unified supervisory console for lifecycle complaint management, AI vision verification, priority SLAs, department coordination, and ground workforce dispatch.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#dcfce7',
              color: '#16A34A',
              border: '1px solid #86efac',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            <span>🤖</span>
            <span>Vision Model: ViT-Civic v2.4</span>
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#f0fdf4',
              color: '#16A34A',
              border: '1px solid #bbf7d0',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            <span>👷</span>
            <span>{availableWorkersCount} Workers Available</span>
          </span>
        </div>
      </div>

      {/* 5 Core Manager Triage Modules Navigation Bar */}
      <div className="manager-tabs-bar" role="tablist" aria-label="Manager Triage Modules">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'complaints'}
          className={`manager-tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
          onClick={() => onTabSwitch('complaints')}
        >
          <span className="manager-tab-icon">📋</span>
          <span className="manager-tab-text">Complaint Management</span>
          <span className="manager-tab-badge">
            {complaintsCount}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ai'}
          className={`manager-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => onTabSwitch('ai')}
        >
          <span className="manager-tab-icon">🤖</span>
          <span className="manager-tab-text">AI Classification</span>
          <span className="manager-tab-badge">
            {avgConfidence}% Conf
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'priority'}
          className={`manager-tab-btn ${activeTab === 'priority' ? 'active' : ''}`}
          onClick={() => onTabSwitch('priority')}
        >
          <span className="manager-tab-icon">⚡</span>
          <span className="manager-tab-text">Priority Management</span>
          <span className={`manager-tab-badge ${criticalCount > 0 ? 'manager-badge-critical' : ''}`}>
            {criticalCount} Critical
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'departments'}
          className={`manager-tab-btn ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => onTabSwitch('departments')}
        >
          <span className="manager-tab-icon">🏛️</span>
          <span className="manager-tab-text">Department Management</span>
          <span className="manager-tab-badge">
            {departmentsCount} Depts
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'workers'}
          className={`manager-tab-btn ${activeTab === 'workers' ? 'active' : ''}`}
          onClick={() => onTabSwitch('workers')}
        >
          <span className="manager-tab-icon">👷</span>
          <span className="manager-tab-text">Worker Assignment</span>
          <span className="manager-tab-badge">
            {totalWorkersCount} Operatives
          </span>
        </button>
      </div>
    </>
  );
}
