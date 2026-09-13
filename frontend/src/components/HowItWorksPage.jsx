import React, { useState } from 'react';

/**
 * Nagarmitra "How It Works" Official Redressal Mechanism Page
 * Eco-Civic Theme (Emerald, Mint, Sage Institutional Palette)
 * Transparent 4-Stage Redressal Lifecycle with interactive simulator,
 * SLA turnaround commitments, and direct portal navigation.
 */
export default function HowItWorksPage({ onSwitchTab, currentUser }) {
  const [activeStage, setActiveStage] = useState(0);

  const STAGES = [
    {
      step: '01',
      phase: 'Phase 1',
      title: 'Citizen Grievance Submission',
      badge: 'Citizen Access',
      icon: '📷',
      desc: 'Citizens report issues in under 60 seconds with attached photos, landmark details, and GPS coordinates.',
      points: [
        'Upload clear photographic evidence from any mobile or desktop browser',
        'Automatic GPS geo-location captures precise ward coordinates',
        'Instant generation of a permanent municipal tracking ID (e.g., #NM-2026-8841)',
        'Option for anonymous or verified citizen submission',
      ],
      preview: {
        badge: 'TICKET GENERATED',
        badgeColor: '#16A34A',
        title: 'Grievance #NM-2026-8841',
        subtitle: 'Deep Pothole on Ward 12 Main Boulevard',
        metadata: 'Reported by Citizen Shiva • GPS: 12.9716° N, 77.5946° E',
        status: 'Status: Pending AI Triage',
      },
    },
    {
      step: '02',
      phase: 'Phase 2',
      title: 'AI Classification & Departmental Triage',
      badge: 'Automated AI Engine',
      icon: '🤖',
      desc: 'Machine learning algorithms inspect photographs, categorize grievance domains, and assign statutory SLAs.',
      points: [
        'AI classifies issue into Roads, Sanitation, Electrical, or Water departments',
        'Urgency scoring engine evaluates traffic hazard and public health risks',
        'Statutory SLA clock initiates automatically (e.g. 12h for emergency hazards)',
        'Department Manager validates classification and approves dispatch order',
      ],
      preview: {
        badge: 'AI CLASSIFICATION VERIFIED',
        badgeColor: '#92400e',
        title: 'Department: Roads & Infrastructure',
        subtitle: 'Classification Confidence: 96.4% • Severity: High Hazard',
        metadata: 'Assigned SLA: 24 Hours • Routing: Ward 12 Maintenance Division',
        status: 'Status: Assigned to Field Crew B-4',
      },
    },
    {
      step: '03',
      phase: 'Phase 3',
      title: 'Ground Operative Dispatch & Execution',
      badge: 'Field Operations',
      icon: '👷',
      desc: 'Municipal ground crews receive geo-tagged task orders, inspect site telemetry, and complete on-site repairs.',
      points: [
        'Operative receives task on mobile terminal with precise map navigation',
        'Real-time status updates communicated to citizen: Assigned → En Route → On Site',
        'Field team executes physical repair with certified municipal equipment',
        'Safety compliance, equipment checks, and timeline telemetry recorded',
      ],
      preview: {
        badge: 'CREW ACTIVE ON-SITE',
        badgeColor: '#0369a1',
        title: 'Field Crew B-4 Dispatched',
        subtitle: 'Lead Operative: Ramesh Kumar • Truck #KA-01-MG-4102',
        metadata: 'Arrival: 14:15 IST • Asphalt Compactor & Hot-Mix Bitumen Deployed',
        status: 'Status: Repair In Progress (Stage 3 of 4)',
      },
    },
    {
      step: '04',
      phase: 'Phase 4',
      title: 'Proof of Resolution & Citizen Sign-Off',
      badge: 'Audit & Accountability',
      icon: '✅',
      desc: 'Mandatory photographic proof of repair is uploaded, verified by supervisors, and rated by the citizen.',
      points: [
        'Field operative must upload geotagged "After" photograph to close the ticket',
        'Citizen receives instant SMS & notification with photographic verification proof',
        'Citizen submits 1 to 5-star rating and satisfaction feedback',
        'Ticket permanently archived in public municipal transparency records',
      ],
      preview: {
        badge: 'VERIFIED & RESOLVED',
        badgeColor: '#16A34A',
        title: 'Work Order Successfully Completed',
        subtitle: 'Restoration Completed in 18 hrs (6 hrs ahead of statutory SLA)',
        metadata: 'Photographic Proof Geo-Verified • Citizen Rating: ★★★★★ (5/5)',
        status: 'Status: Closed & Sealed in Public Audit Archive',
      },
    },
  ];

  const SLA_MATRIX = [
    { domain: 'Deep Potholes & Road Cavities', dept: 'Roads & Infrastructure', sla: '≤ 24 Hours', priority: 'High' },
    { domain: 'Overflowing Commercial Dumpsters', dept: 'Sanitation Welfare', sla: '≤ 12 Hours', priority: 'Emergency' },
    { domain: 'Streetlight Blackouts & Live Wires', dept: 'Electrical Utility', sla: '≤ 24 Hours', priority: 'High' },
    { domain: 'Burst Water Main & Street Flooding', dept: 'Water & Drainage', sla: '≤ 18 Hours', priority: 'Emergency' },
    { domain: 'Broken Footpath Pavers / Kerbs', dept: 'Roads & Infrastructure', sla: '≤ 72 Hours', priority: 'Medium' },
    { domain: 'Fallen Tree Branches & Green Debris', dept: 'Parks & Horticulture', sla: '≤ 24 Hours', priority: 'Medium' },
  ];

  return (
    <div className="govt-home-container animate-fade-in" style={{ padding: '2rem 0 5rem 0' }}>
      {/* Header Banner */}
      <section style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div className="civic-hero-tag" style={{ justifyContent: 'center' }}>
          MUNICIPAL REDRESSAL MECHANISM & OPERATIONAL PIPELINE
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 800, color: '#111827', letterSpacing: '-0.025em', margin: '0.75rem 0 1rem 0' }}>
          How <span style={{ color: '#16A34A' }}>Nagarmitra</span> Works
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '780px', margin: '0 auto', lineHeight: 1.6 }}>
          A transparent, 4-stage civic grievance redressal framework powered by artificial intelligence and verified by ground teams with geo-tagged photographic evidence.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="civicflow-btn-primary"
            onClick={() => {
              if (currentUser?.role === 'citizen') onSwitchTab('citizen', 'reporting');
              else if (!currentUser) onSwitchTab('citizen');
              else onSwitchTab(currentUser.role === 'manager' ? 'manager' : currentUser.role === 'worker' ? 'worker' : 'system');
            }}
          >
            <span>✍️</span>
            <span>Report a Civic Issue</span>
          </button>

          <button
            type="button"
            className="civicflow-btn-outline"
            onClick={() => {
              if (currentUser?.role === 'citizen') onSwitchTab('citizen', 'tracking');
              else if (!currentUser) onSwitchTab('citizen');
              else onSwitchTab('home');
            }}
          >
            <span>📋</span>
            <span>Track a Complaint</span>
          </button>
        </div>
      </section>

      {/* 4-Stage Lifecycle Stepper Navigator */}
      <section className="govt-home-section" style={{ margin: '2rem 0 4rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {STAGES.map((st, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStage(idx)}
              style={{
                background: activeStage === idx ? '#f0fdf4' : '#ffffff',
                border: activeStage === idx ? '2px solid #16A34A' : '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeStage === idx ? '0 4px 14px rgba(21, 128, 61, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: activeStage === idx ? '#16A34A' : '#64748b' }}>
                  {st.phase}
                </span>
                <span style={{ fontSize: '1.5rem' }}>{st.icon}</span>
              </div>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#111827', marginBottom: '0.35rem' }}>
                {st.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.4 }}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Active Stage Interactive Showcase */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#16A34A', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '1rem', border: '1px solid #86efac' }}>
              <span>{STAGES[activeStage].phase}</span>
              <span>•</span>
              <span>{STAGES[activeStage].badge}</span>
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              {STAGES[activeStage].title}
            </h2>

            <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {STAGES[activeStage].desc}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {STAGES[activeStage].points.map((pt, pIdx) => (
                <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.94rem', color: '#334155' }}>
                  <span style={{ color: '#16A34A', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                disabled={activeStage === 0}
                onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: activeStage === 0 ? '#f1f5f9' : '#ffffff',
                  color: activeStage === 0 ? '#94a3b8' : '#334155',
                  fontWeight: 600,
                  cursor: activeStage === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Previous Phase
              </button>

              <button
                type="button"
                disabled={activeStage === STAGES.length - 1}
                onClick={() => setActiveStage((prev) => Math.min(STAGES.length - 1, prev + 1))}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: activeStage === STAGES.length - 1 ? '#f1f5f9' : '#16A34A',
                  color: activeStage === STAGES.length - 1 ? '#94a3b8' : '#ffffff',
                  fontWeight: 600,
                  cursor: activeStage === STAGES.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Next Phase →
              </button>
            </div>
          </div>

          {/* Live Telemetry Preview Card */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Municipal System Telemetry
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  background: STAGES[activeStage].preview.badgeColor,
                  color: '#ffffff',
                }}
              >
                {STAGES[activeStage].preview.badge}
              </span>
            </div>

            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.45rem' }}>
              {STAGES[activeStage].preview.title}
            </h4>
            <div style={{ fontSize: '0.94rem', color: '#16A34A', fontWeight: 600, marginBottom: '0.75rem' }}>
              {STAGES[activeStage].preview.subtitle}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {STAGES[activeStage].preview.metadata}
            </p>

            <div
              style={{
                padding: '0.75rem 1rem',
                background: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#0B1220',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
              <span>{STAGES[activeStage].preview.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Resolution SLA Matrix */}
      <section className="govt-home-section" style={{ margin: '4rem 0' }}>
        <div className="govt-section-header">
          <h2 className="govt-section-title">
            Statutory Resolution SLA Commitments
          </h2>
          <p className="govt-section-sub">
            Legally mandated resolution turnaround targets governed by the Municipal Citizen Charter.
          </p>
        </div>

        <div style={{ overflowX: 'auto', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Civic Grievance Domain</th>
                <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Responsible Directorate</th>
                <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Statutory SLA Target</th>
                <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Hazard Priority</th>
              </tr>
            </thead>
            <tbody>
              {SLA_MATRIX.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#111827' }}>{item.domain}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#475569' }}>{item.dept}</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#16A34A' }}>{item.sla}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: item.priority === 'Emergency' ? '#fee2e2' : item.priority === 'High' ? '#fef3c7' : '#e0f2fe',
                        color: item.priority === 'Emergency' ? '#991b1b' : item.priority === 'High' ? '#92400e' : '#0369a1',
                      }}
                    >
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3 Core Municipal Pillars of Accountability */}
      <section style={{ background: '#0B1220', color: '#ffffff', borderRadius: '12px', padding: '3.5rem 3rem', margin: '4rem 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', textAlign: 'center' }}>
          Three Pillars of Municipal Accountability
        </h2>
        <p style={{ textAlign: 'center', color: '#bbf7d0', maxWidth: '680px', margin: '0 auto 2.5rem auto', fontSize: '1.02rem' }}>
          How Nagarmitra prevents unresolved tickets and ensures verified civic restoration across all urban wards.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '1.75rem', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📸</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#86efac', marginBottom: '0.5rem' }}>Photographic Proof</h4>
            <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.55 }}>
              No ticket can be marked resolved without photographic evidence of the restored site uploaded directly by the ground operative.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '1.75rem', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⏱️</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#86efac', marginBottom: '0.5rem' }}>Statutory SLA Auto-Escalation</h4>
            <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.55 }}>
              If a ticket reaches 80% of its statutory SLA without dispatch, it automatically escalates to the Joint Municipal Commissioner.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '1.75rem', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⭐</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#86efac', marginBottom: '0.5rem' }}>Citizen Satisfaction Sign-Off</h4>
            <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.55 }}>
              Citizens receive immediate notification upon closure and can reopen any ticket with a single click if the work is unsatisfactory.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Action Strip */}
      <section style={{ textAlign: 'center', margin: '3rem 0 1rem 0' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
          Have a civic grievance in your neighborhood?
        </h3>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Help build a cleaner, safer, and better city today.
        </p>
        <button
          type="button"
          className="civicflow-btn-primary"
          onClick={() => {
            if (currentUser?.role === 'citizen') onSwitchTab('citizen', 'reporting');
            else onSwitchTab('citizen');
          }}
          style={{ height: '52px', padding: '0 2.5rem', fontSize: '1.05rem' }}
        >
          <span>✍️</span>
          <span>Submit a Civic Report Now</span>
        </button>
      </section>
    </div>
  );
}
