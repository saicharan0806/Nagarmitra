import React, { useState, useMemo } from 'react';
import { calculateSLAMetrics, downloadSLACSV } from '../utils/slaReportGenerator.js';
import SLAReportModal from './admin/SLAReportModal.jsx';

/**
 * Nagarmitra Municipal Executive & Administrative Dashboard
 * Displays cross-department metrics, SLA compliance, worker dispatch readiness,
 * and quick-access links to citizen and manager triage views.
 */
export default function AdminDashboard({ complaints = [], onSwitchTab, onNotification }) {
  const [selectedPeriodKey, setSelectedPeriodKey] = useState('2026-09');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const slaData = useMemo(() => {
    return calculateSLAMetrics(complaints, selectedPeriodKey);
  }, [complaints, selectedPeriodKey]);

  const totalTickets = slaData.executive.totalVolume;
  const pendingTickets = slaData.executive.totalPending;
  const inProgressTickets = slaData.executive.totalInProgress;
  const resolvedTickets = slaData.executive.totalResolved;
  const resolutionRate = slaData.executive.resolutionRate;

  const departments = slaData.departments.map((dept) => {
    const budgets = {
      roads: '₹4.8 Cr',
      sanitation: '₹6.2 Cr',
      electrical: '₹2.9 Cr',
      water: '₹5.5 Cr',
      parks: '₹1.8 Cr',
    };
    return {
      name: dept.name,
      lead: dept.lead,
      open: dept.totalVolume - dept.resolvedCount,
      slaRate: `${dept.complianceRate}%`,
      budget: budgets[dept.id] || '₹2.5 Cr',
      rating: dept.rating,
    };
  });

  const handleExportCsv = () => {
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
      link.setAttribute('download', `nagarmitra_sla_audit_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onNotification) onNotification('📥 Municipal SLA Audit CSV report downloaded successfully.');
    } catch {
      if (onNotification) onNotification('⚠️ Error generating CSV audit export.');
    }
  };

  const handleExportSLACSV = () => {
    downloadSLACSV(slaData, onNotification);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div
        style={{
          background: '#0B1220',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'rgba(22, 163, 74, 0.15)', border: '1px solid rgba(22, 163, 74, 0.3)', color: '#16A34A', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <span>⚡</span>
            <span>Nagarmitra Municipal Command Center</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
            System Administration & Municipal Oversight
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '0.92rem', marginTop: '0.35rem' }}>
            Monitoring AI issue classification, inter-departmental SLA compliance, and ground worker fulfillment.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSwitchTab('system', 'workers')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>👷</span>
            <span>Manage Field Workforce</span>
          </button>
          <button
            onClick={() => onSwitchTab('analytics')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>📊</span>
            <span>Municipal Analytics</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Total Complaints</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>{totalTickets}</div>
          <div style={{ color: '#16A34A', fontSize: '0.78rem', fontWeight: 600 }}>Citywide civic load in {slaData.period.month}</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Pending Triage</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D97706', margin: '0.25rem 0' }}>{pendingTickets}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Requires department dispatch</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #2563EB' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>In Progress</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB', margin: '0.25rem 0' }}>{inProgressTickets}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Work crew assigned & deployed</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #16A34A' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Citywide SLA Adherence</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#16A34A', margin: '0.25rem 0' }}>{slaData.executive.citywideComplianceRate}%</div>
          <div style={{ color: '#16A34A', fontSize: '0.78rem', fontWeight: 600 }}>{resolutionRate}% resolved rate</div>
        </div>
      </div>

      {/* Department Oversight Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>Municipal Department Health & SLA Status</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
              Real-time response metrics across key urban administration clusters • {slaData.period.label}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className="sla-btn sla-btn-secondary"
              style={{ fontSize: '0.82rem' }}
              onClick={handleExportSLACSV}
              title="Export official Municipal Commissioner Monthly SLA Resolution Report (CSV)"
            >
              📊 Export SLA CSV
            </button>
            <button
              className="sla-btn sla-btn-primary"
              style={{ fontSize: '0.82rem' }}
              onClick={() => setIsPrintModalOpen(true)}
              title="Open printable official Municipal Commissioner SLA audit dossier"
            >
              🖨️ Commissioner Report (PDF)
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Department Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Department Head</th>
                <th style={{ padding: '0.75rem 1rem' }}>Active Load</th>
                <th style={{ padding: '0.75rem 1rem' }}>SLA Target Met</th>
                <th style={{ padding: '0.75rem 1rem' }}>Quarterly Budget</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{dept.lead}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', fontWeight: 700, fontSize: '0.8rem' }}>
                      {dept.open} Open
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#16A34A' }}>{dept.slaRate}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{dept.budget}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}>
                      <span>●</span> {dept.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
