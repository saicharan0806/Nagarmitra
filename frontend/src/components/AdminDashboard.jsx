import React from 'react';

/**
 * Nagarmitra Municipal Executive & Administrative Dashboard
 * Displays cross-department metrics, SLA compliance, worker dispatch readiness,
 * and quick-access links to citizen and manager triage views.
 */
export default function AdminDashboard({ complaints, onSwitchTab, onNotification }) {
  const totalTickets = complaints.length;
  const pendingTickets = complaints.filter((c) => c.status === 'pending').length;
  const inProgressTickets = complaints.filter((c) => c.status === 'in_progress' || c.status === 'assigned').length;
  const resolvedTickets = complaints.filter((c) => c.status === 'resolved').length;
  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;

  const departments = [
    { name: 'Roads & Infrastructure', lead: 'Deepak Kumar', open: 8, slaRate: '94%', budget: '₹1.8 Cr' },
    { name: 'Sanitation & Waste', lead: 'Ananya Reddy', open: 12, slaRate: '91%', budget: '₹2.4 Cr' },
    { name: 'Electrical & Lighting', lead: 'Rajesh Mishra', open: 4, slaRate: '97%', budget: '₹95 L' },
    { name: 'Water & Sewerage', lead: 'Fatima Zaidi', open: 7, slaRate: '88%', budget: '₹1.5 Cr' },
  ];

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
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#2563EB' }}>
            📋
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Issues Logged</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{totalTickets}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(244, 183, 64, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#F4B740' }}>
            ⏳
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Pending Triage</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F4B740' }}>{pendingTickets}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#2563EB' }}>
            🚀
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>In Progress / Dispatched</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB' }}>{inProgressTickets}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(22, 163, 74, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#16A34A' }}>
            🏆
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Overall SLA Adherence</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16A34A' }}>{resolutionRate}%</div>
          </div>
        </div>
      </div>

      {/* Department Oversight Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>Municipal Department Health & SLA Status</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
              Real-time response metrics across key urban administration clusters
            </p>
          </div>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem' }}
            onClick={() => onNotification('Exporting SLA summary report...')}
          >
            📥 Export Audit Report
          </button>
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
                      <span>●</span> Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
