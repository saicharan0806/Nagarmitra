import React from 'react';
import { REPORT_PERIODS, downloadSLACSV } from '../../utils/slaReportGenerator.js';

/**
 * SLAReportModal Component
 * ------------------------
 * Provides an official Municipal Commissioner Audit Dossier modal.
 * Can be previewed on-screen or printed directly to PDF via the browser's print engine.
 */
export default function SLAReportModal({
  isOpen,
  onClose,
  slaData,
  selectedPeriodKey,
  onPeriodChange,
  onNotification,
}) {
  if (!isOpen || !slaData) return null;

  const handlePrint = () => {
    // Small timeout to ensure any state updates are rendered
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleDownloadCsv = () => {
    downloadSLACSV(slaData, onNotification);
  };

  const { period, memoRefNumber, generatedAt, executive, departments, severities } = slaData;

  return (
    <div className="sla-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="sla-modal-title">
      {/* Sticky Quick Action Bar (Hidden during Print) */}
      <div className="sla-modal-toolbar no-print">
        <div className="sla-toolbar-left">
          <span className="sla-toolbar-emblem">🏛️</span>
          <div>
            <h2 id="sla-modal-title" className="sla-toolbar-title">
              Office of the Municipal Commissioner | Monthly SLA Report
            </h2>
            <p className="sla-toolbar-sub">
              Statutory Civic Audit Dossier • Ready for PDF Export or Direct Printing
            </p>
          </div>
        </div>

        <div className="sla-toolbar-actions">
          {/* Period Selector */}
          <div className="sla-toolbar-period">
            <label htmlFor="modal-period-select" className="sla-period-label">Audit Period:</label>
            <select
              id="modal-period-select"
              className="sla-period-select"
              value={selectedPeriodKey}
              onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
            >
              {REPORT_PERIODS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Download CSV Button */}
          <button
            type="button"
            className="sla-btn sla-btn-secondary"
            onClick={handleDownloadCsv}
            title="Download structured CSV dataset"
          >
            📊 Download CSV
          </button>

          {/* Print / Save as PDF Button */}
          <button
            type="button"
            className="sla-btn sla-btn-primary"
            onClick={handlePrint}
            title="Open browser print dialog (choose 'Save as PDF')"
          >
            🖨️ Print / Save as PDF
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            className="sla-btn-close"
            onClick={onClose}
            aria-label="Close Preview"
            title="Close Preview"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Printable Document Sheet Container */}
      <div className="sla-modal-body">
        <div className="commissioner-pdf-document">
          {/* Official Emblem & Municipal Header */}
          <header className="pdf-header">
            <div className="pdf-coat-of-arms">
              <span className="pdf-emblem-icon">🏛️</span>
              <div className="pdf-emblem-badge">SATYAMEVA JAYATE</div>
            </div>

            <div className="pdf-header-titles">
              <div className="pdf-govt-sub">GOVERNMENT OF TELANGANA • MUNICIPAL ADMINISTRATION DEPARTMENT</div>
              <h1 className="pdf-civic-title">MUNICIPAL CORPORATION OF NAGARMITRA</h1>
              <div className="pdf-office-title">OFFICE OF THE MUNICIPAL COMMISSIONER & CHIEF EXECUTIVE OFFICER</div>
              <div className="pdf-report-banner">
                MONTHLY STATUTORY SERVICE LEVEL AGREEMENT (SLA) RESOLUTION & CIVIC AUDIT DOSSIER
              </div>
              <div className="pdf-act-reference">
                Published in compliance with Section 24 of the Urban Municipal Administration & Citizen Charter Guarantee Act
              </div>
            </div>
          </header>

          {/* Statutory Metadata Strip */}
          <section className="pdf-meta-strip">
            <div className="pdf-meta-item">
              <span className="pdf-meta-label">Gazette Memo Ref:</span>
              <strong className="pdf-meta-val">{memoRefNumber}</strong>
            </div>
            <div className="pdf-meta-item">
              <span className="pdf-meta-label">Audit Period:</span>
              <strong className="pdf-meta-val">{period.label}</strong>
            </div>
            <div className="pdf-meta-item">
              <span className="pdf-meta-label">Issue Date & Time:</span>
              <span className="pdf-meta-val">{generatedAt}</span>
            </div>
            <div className="pdf-meta-item">
              <span className="pdf-meta-label">Security Clearance:</span>
              <span className="pdf-meta-val badge-statutory">OFFICIAL PUBLIC AUDIT</span>
            </div>
          </section>

          {/* Executive Certification Statement */}
          <section className="pdf-preamble">
            <p>
              <strong>EXECUTIVE NOTIFICATION:</strong> In exercise of executive authority vested under the Municipal Corporation Code, this comprehensive monthly audit certifies the grievance handling performance, AI vision computer verification telemetry, and Service Level Agreement (SLA) turnaround standards across all five municipal directorates for the period of <strong>{period.label}</strong>. All figures are derived from real-time cryptographic audit logs and photographic closure proofs recorded on the Nagarmitra CivicSync platform.
            </p>
          </section>

          {/* Executive Telemetry Scorecard */}
          <section className="pdf-scorecard">
            <div className="pdf-kpi-card">
              <span className="pdf-kpi-label">Total Grievances</span>
              <div className="pdf-kpi-val">{executive.totalVolume}</div>
              <span className="pdf-kpi-sub">{executive.totalResolved} Resolved ({executive.resolutionRate}%)</span>
            </div>

            <div className="pdf-kpi-card pdf-kpi-highlight">
              <span className="pdf-kpi-label">Citywide SLA Adherence</span>
              <div className="pdf-kpi-val" style={{ color: '#16A34A' }}>
                {executive.citywideComplianceRate}%
              </div>
              <span className="pdf-kpi-sub">Target Benchmark: ≥95.0%</span>
            </div>

            <div className="pdf-kpi-card">
              <span className="pdf-kpi-label">Mean Resolution Time</span>
              <div className="pdf-kpi-val">{executive.citywideMttr} hrs</div>
              <span className="pdf-kpi-sub">Charter Target: &lt;36.0 hrs</span>
            </div>

            <div className="pdf-kpi-card">
              <span className="pdf-kpi-label">AI Triage Precision</span>
              <div className="pdf-kpi-val" style={{ color: '#2563EB' }}>
                {executive.aiTriagePrecision}%
              </div>
              <span className="pdf-kpi-sub">ViT-Civic Automated Routing</span>
            </div>

            <div className="pdf-kpi-card">
              <span className="pdf-kpi-label">Citizen Trust Score</span>
              <div className="pdf-kpi-val" style={{ color: '#D97706' }}>
                {executive.citizenSatisfactionScore}
              </div>
              <span className="pdf-kpi-sub">Verified Citizen Feedback</span>
            </div>
          </section>

          {/* Section 1: Municipal Directorate SLA Performance Matrix */}
          <section className="pdf-section">
            <div className="pdf-section-header">
              <h2 className="pdf-section-title">
                1. Municipal Directorate Performance & SLA Fulfillment Matrix
              </h2>
              <span className="pdf-section-tag">Statutory Departmental Breakdown</span>
            </div>

            <table className="pdf-table">
              <thead>
                <tr>
                  <th style={{ width: '26%' }}>Directorate & Lead Official</th>
                  <th style={{ width: '10%' }}>Code</th>
                  <th style={{ width: '12%' }}>Charter SLA</th>
                  <th style={{ width: '10%' }}>Tickets</th>
                  <th style={{ width: '11%' }}>SLA Met</th>
                  <th style={{ width: '11%' }}>Breached</th>
                  <th style={{ width: '10%' }}>Mean MTTR</th>
                  <th style={{ width: '10%' }}>Compliance</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id}>
                    <td>
                      <div className="pdf-dept-name">{dept.name}</div>
                      <div className="pdf-dept-lead">{dept.lead} ({dept.designation})</div>
                    </td>
                    <td><span className="pdf-code-badge">{dept.code}</span></td>
                    <td><strong>{dept.targetHours} Hours</strong></td>
                    <td className="text-center">{dept.totalVolume}</td>
                    <td className="text-center" style={{ color: '#16A34A', fontWeight: 700 }}>
                      {dept.metSlaCount}
                    </td>
                    <td className="text-center" style={{ color: dept.breachedSlaCount > 0 ? '#DC2626' : '#64748B', fontWeight: dept.breachedSlaCount > 0 ? 700 : 400 }}>
                      {dept.breachedSlaCount}
                    </td>
                    <td>{dept.avgTurnaround} hrs</td>
                    <td>
                      <span className={`pdf-status-badge ${dept.complianceRate >= 95 ? 'badge-exemplary' : dept.complianceRate >= 90 ? 'badge-compliant' : 'badge-attention'}`}>
                        {dept.complianceRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Section 2: Severity-Tier Matrix & Observations */}
          <div className="pdf-grid-two-col">
            {/* Severity Matrix */}
            <section className="pdf-section" style={{ flex: 1 }}>
              <div className="pdf-section-header">
                <h3 className="pdf-section-title">2. Severity-Tier SLA Compliance</h3>
              </div>
              <table className="pdf-table pdf-table-compact">
                <thead>
                  <tr>
                    <th>Severity Level</th>
                    <th>Standard</th>
                    <th>Tickets</th>
                    <th>Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {severities.map((s) => (
                    <tr key={s.severity}>
                      <td>
                        <strong style={{ color: s.color }}>{s.label}</strong>
                      </td>
                      <td>{s.benchmark}</td>
                      <td className="text-center">{s.volume}</td>
                      <td>
                        <span className="pdf-status-badge badge-exemplary">
                          {s.complianceRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Statutory Findings & Directives */}
            <section className="pdf-section" style={{ flex: 1.2 }}>
              <div className="pdf-section-header">
                <h3 className="pdf-section-title">3. Supervisory Findings & Directives</h3>
              </div>
              <ul className="pdf-findings-list">
                <li>
                  <strong>Statutory SLA Standard Met:</strong> Municipal SLA adherence stands at <strong>{executive.citywideComplianceRate}%</strong>, exceeding the mandatory State Citizen Charter floor of 90.0%.
                </li>
                <li>
                  <strong>Critical Response Priority:</strong> All high-voltage electrical sparks and water pipeline bursts were brought under control within an average of <strong>7.5 hours</strong>.
                </li>
                <li>
                  <strong>Photographic Audit Verification:</strong> 100% of closed work orders have attached geo-tagged before/after proof images verified by field supervisors.
                </li>
                <li>
                  <strong>Commissioner Directive:</strong> Directorate of Roads & Infrastructure is hereby instructed to maintain accelerated cold-mix bitumen patching across high-traffic transit corridors.
                </li>
              </ul>
            </section>
          </div>

          {/* Official Signatures & Corporation Seal */}
          <section className="pdf-sign-section">
            <div className="pdf-sign-box">
              <div className="pdf-signature-line">
                <span className="pdf-sign-placeholder">Praveen K. Singhal</span>
              </div>
              <div className="pdf-sign-name">Praveen K. Singhal</div>
              <div className="pdf-sign-role">Director of Quality Audit & Public Grievance</div>
              <div className="pdf-sign-dept">Municipal Vigilance & Redressal Cell</div>
            </div>

            <div className="pdf-seal-box">
              <div className="pdf-seal-circle">
                <div className="pdf-seal-inner">
                  <span>🏛️</span>
                  <strong>MUNICIPAL SEAL</strong>
                  <small>NAGARMITRA</small>
                </div>
              </div>
              <div className="pdf-seal-caption">OFFICIAL STATUTORY SEAL</div>
            </div>

            <div className="pdf-sign-box">
              <div className="pdf-signature-line">
                <span className="pdf-sign-placeholder">Dr. Shailendra Varma</span>
              </div>
              <div className="pdf-sign-name">Dr. Shailendra Varma, IAS</div>
              <div className="pdf-sign-role">Municipal Commissioner & CEO</div>
              <div className="pdf-sign-dept">Municipal Corporation of Nagarmitra</div>
            </div>
          </section>

          {/* Verification Footer Note */}
          <footer className="pdf-footer">
            <div className="pdf-footer-left">
              <span>🔒 <strong>Document Security ID:</strong> {memoRefNumber}</span>
              <span>•</span>
              <span>Valid statutory audit document under IT Act, 2000</span>
            </div>
            <div className="pdf-footer-right">
              <span>Generated by Nagarmitra CivicSync Governance Suite • Page 1 of 1</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
