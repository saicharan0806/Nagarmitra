import React, { useState, useMemo } from 'react';
import { CIVIC_CATEGORIES } from '../../utils/civicHelpers.js';
import {
  calculateSLAMetrics,
  REPORT_PERIODS,
  downloadSLACSV,
} from '../../utils/slaReportGenerator.js';
import SLAReportModal from './SLAReportModal.jsx';

/**
 * AnalyticsDashboard Component (Municipal Administrator & Commissioner)
 * Provides 7 Core Analytics & Telemetry Dimensions + Executive Monthly SLA Reporting:
 * 1. Total Complaints
 * 2. Pending Complaints
 * 3. In Progress Complaints
 * 4. Resolved Complaints
 * 5. Complaints by Category
 * 6. Complaints by Department
 * 7. Resolution Performance & Statutory SLA Metrics
 */
export default function AnalyticsDashboard({
  complaints = [],
  onNotification,
}) {
  const [selectedPeriodKey, setSelectedPeriodKey] = useState('2026-09');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Compute live statutory SLA telemetry based on complaints and selected period
  const slaData = useMemo(() => {
    return calculateSLAMetrics(complaints, selectedPeriodKey);
  }, [complaints, selectedPeriodKey]);

  const total = slaData.executive.totalVolume;
  const pending = slaData.executive.totalPending;
  const inProgress = slaData.executive.totalInProgress;
  const resolved = slaData.executive.totalResolved;
  const resolutionRate = slaData.executive.resolutionRate;

  // Complaints by Category derived from canonical single source of truth
  const categories = CIVIC_CATEGORIES.map((cat) => ({
    key: cat.id,
    label: cat.label,
    icon: cat.icon,
    count: slaData.complaints.filter((c) => c.category === cat.id).length,
  }));

  // Complaints by Department derived from dynamic statutory SLA metrics
  const departments = slaData.departments.map((dept) => ({
    name: dept.name,
    load: dept.totalVolume,
    slaMet: `${dept.complianceRate}%`,
    avgHours: dept.avgTurnaround,
    color: dept.color,
    rating: dept.rating,
  }));

  // Export raw complaint dump
  const handleExportRaw = () => {
    try {
      const headers = ['Tracking ID', 'Title', 'Category', 'Severity', 'Department', 'Assigned Worker', 'Status', 'Address', 'Date Logged'];
      const rows = (complaints || []).map((c) => [
        c.tracking_id || '',
        `"${(c.title || '').replace(/"/g, '""')}"`,
        c.category || '',
        c.severity || '',
        `"${(c.department_name || '').replace(/"/g, '""')}"`,
        `"${(c.assigned_worker_name || 'Unassigned').replace(/"/g, '""')}"`,
        c.status || '',
        `"${(c.address || '').replace(/"/g, '""')}"`,
        c.created_at || '',
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `nagarmitra_raw_complaints_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onNotification) onNotification('📥 Raw complaints CSV log downloaded successfully.');
    } catch {
      if (onNotification) onNotification('⚠️ Error generating CSV log export.');
    }
  };

  // Export official Municipal Commissioner SLA resolution report
  const handleExportSLACSV = () => {
    downloadSLACSV(slaData, onNotification);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Analytics Header Banner */}
      <div className="admin-header-banner">
        <div>
          <div className="field-details-sub-tag">
            <span>📊 EXECUTIVE MUNICIPAL TELEMETRY</span>
            <span className="bullet-sep">•</span>
            <span>PUBLIC SERVICE PERFORMANCE</span>
          </div>
          <h1 className="admin-header-title">Municipal Analytics & Intelligence</h1>
          <p className="admin-header-sub">
            Real-time urban governance metrics tracking grievance volume, department response SLAs, AI classification accuracy, and neighborhood repair turnaround times.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="sla-btn sla-btn-secondary"
            onClick={handleExportRaw}
            title="Download raw complaint data CSV"
          >
            📥 Raw CSV Log
          </button>
          <button
            type="button"
            className="sla-btn sla-btn-secondary"
            onClick={handleExportSLACSV}
            title="Export official Municipal Commissioner Monthly SLA Resolution Report (CSV)"
          >
            📊 Export SLA Report (CSV)
          </button>
          <button
            type="button"
            className="sla-btn sla-btn-primary"
            onClick={() => setIsPrintModalOpen(true)}
            title="Open printable official Municipal Commissioner SLA audit dossier"
          >
            🖨️ Commissioner Report (Printable PDF)
          </button>
        </div>
      </div>

      {/* Municipal Commissioner SLA Resolution Command Bar */}
      <div className="executive-sla-report-card">
        <div className="executive-sla-title-area">
          <span className="executive-sla-icon">🏛️</span>
          <div>
            <h3 className="executive-sla-heading">
              Municipal Commissioner Statutory SLA Audit • {slaData.period.label}
            </h3>
            <p className="executive-sla-desc">
              Mandatory citizen charter compliance: <strong style={{ color: '#16A34A' }}>{slaData.executive.citywideComplianceRate}%</strong> adherence across 5 municipal directorates. Ref: <code>{slaData.memoRefNumber}</code>
            </p>
          </div>
        </div>

        <div className="executive-sla-controls">
          <div className="sla-toolbar-period">
            <label htmlFor="analytics-period-select" className="sla-period-label" style={{ color: '#475569' }}>
              Reporting Cycle:
            </label>
            <select
              id="analytics-period-select"
              className="sla-period-select"
              style={{ background: '#FFFFFF', color: '#0F172A', border: '1px solid #CBD5E1' }}
              value={selectedPeriodKey}
              onChange={(e) => setSelectedPeriodKey(e.target.value)}
            >
              {REPORT_PERIODS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="sla-btn sla-btn-secondary"
            onClick={handleExportSLACSV}
          >
            📊 Export SLA (CSV)
          </button>

          <button
            type="button"
            className="sla-btn sla-btn-primary"
            onClick={() => setIsPrintModalOpen(true)}
          >
            🖨️ Printable PDF Report
          </button>
        </div>
      </div>

      {/* 1, 2, 3, 4: KPI Metrics Tiles */}
      <div className="field-metrics-grid">
        <div className="field-metric-card border-green">
          <div className="field-metric-label">1. Total Complaints</div>
          <div className="field-metric-value">{total}</div>
          <div className="field-metric-sub">Citywide public issues in {slaData.period.month}</div>
        </div>

        <div className="field-metric-card border-amber">
          <div className="field-metric-label">2. Pending Triage</div>
          <div className="field-metric-value">{pending}</div>
          <div className="field-metric-sub">Awaiting department dispatch</div>
        </div>

        <div className="field-metric-card border-blue" style={{ borderLeft: '4px solid #2563EB' }}>
          <div className="field-metric-label">3. In Progress Complaints</div>
          <div className="field-metric-value">{inProgress}</div>
          <div className="field-metric-sub">Field operatives actively deployed</div>
        </div>

        <div className="field-metric-card border-emerald">
          <div className="field-metric-label">4. Resolved Complaints</div>
          <div className="field-metric-value">{resolved}</div>
          <div className="field-metric-sub">Verified photographic proof closures</div>
        </div>
      </div>

      {/* 5 & 6: Two Column Visual Breakdown Grid */}
      <div className="analytics-grid">
        {/* 5. Complaints by Category */}
        <div className="field-card">
          <div className="field-card-header">
            <div>
              <h2 className="field-card-title">🏷️ 5. Complaints by Issue Category</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Incident distribution across public infrastructure domains
              </p>
            </div>
            <span className="field-card-tag">{categories.length} Categories</span>
          </div>

          <div className="analytics-bar-list">
            {categories.map((cat) => {
              const pct = total > 0 ? Math.round((cat.count / total) * 100) : 0;
              return (
                <div key={cat.key} className="analytics-bar-row">
                  <div className="analytics-bar-label">
                    <span>{cat.icon} {cat.label}</span>
                    <strong>{cat.count} ({pct}%)</strong>
                  </div>
                  <div className="analytics-bar-track">
                    <div
                      className="analytics-bar-fill"
                      style={{ width: `${Math.max(pct, 8)}%`, background: '#16A34A' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Complaints by Department */}
        <div className="field-card">
          <div className="field-card-header">
            <div>
              <h2 className="field-card-title">🏛️ 6. Complaints by Department & SLA</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Workload allocation and statutory SLA compliance rates
              </p>
            </div>
            <span className="field-card-tag">5 Directorates</span>
          </div>

          <div className="analytics-dept-list">
            {departments.map((dept) => (
              <div key={dept.name} className="analytics-dept-item">
                <div className="analytics-dept-top">
                  <strong style={{ fontSize: '0.88rem', color: '#111827' }}>{dept.name}</strong>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: dept.color }}>
                    SLA: {dept.slaMet} ({dept.rating})
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                  <span>Active Load: <strong>{dept.load} Tickets</strong></span>
                  <span>Mean Resolution: <strong>{dept.avgHours} hrs</strong></span>
                </div>
                <div className="analytics-bar-track" style={{ marginTop: '0.4rem', height: '6px' }}>
                  <div
                    className="analytics-bar-fill"
                    style={{ width: `${Math.min(dept.load * 20 + 15, 100)}%`, background: dept.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Resolution Performance Telemetry */}
      <div className="field-card">
        <div className="field-card-header">
          <div>
            <h2 className="field-card-title">⚡ 7. Municipal Resolution Performance Standards</h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Statutory charter milestones, time-to-repair telemetry, and citizen quality ratings
            </p>
          </div>
          <span className="field-card-tag">Benchmark Target: 95%</span>
        </div>

        <div className="analytics-performance-grid">
          <div className="performance-card">
            <span className="perf-icon">⏱️</span>
            <div className="perf-num">{slaData.executive.citywideMttr} hrs</div>
            <div className="perf-title">Mean Time to Resolution (MTTR)</div>
            <small className="perf-sub">Statutory standard: &lt;36.0 hrs</small>
          </div>

          <div className="performance-card">
            <span className="perf-icon">🏆</span>
            <div className="perf-num" style={{ color: '#16A34A' }}>{resolutionRate}%</div>
            <div className="perf-title">Current Resolution Rate</div>
            <small className="perf-sub">{resolved} of {total} grievances closed with proof</small>
          </div>

          <div className="performance-card">
            <span className="perf-icon">🤖</span>
            <div className="perf-num" style={{ color: '#2563EB' }}>{slaData.executive.aiTriagePrecision}%</div>
            <div className="perf-title">AI Vision Triage Precision</div>
            <small className="perf-sub">ViT-Civic model verified accuracy</small>
          </div>

          <div className="performance-card">
            <span className="perf-icon">⭐</span>
            <div className="perf-num" style={{ color: '#F4B740' }}>{slaData.executive.citizenSatisfactionScore}</div>
            <div className="perf-title">Citizen Satisfaction Index</div>
            <small className="perf-sub">Based on verified post-repair reviews</small>
          </div>
        </div>
      </div>

      {/* Printable PDF Dossier Modal */}
      <SLAReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        slaData={slaData}
        selectedPeriodKey={selectedPeriodKey}
        onPeriodChange={setSelectedPeriodKey}
        onNotification={onNotification}
      />
    </div>
  );
}
