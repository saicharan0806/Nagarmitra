import React from 'react';

/**
 * Nagarmitra Official Home / Landing Page Component
 * Social Domain & Eco-Civic Theme (Emerald, Mint, and Sage Institutional Palette)
 * Features real municipal stock photography, comprehensive project introduction,
 * and direct navigation cards to all civic portals.
 */
export default function HomePage({ currentUser, onSwitchTab }) {
  // Key municipal infrastructure & public health domains with real stock photography
  const DOMAINS = [
    {
      title: 'Roads & Public Pavements',
      dept: 'Roads & Infrastructure Department',
      desc: 'Repairing potholes, damaged asphalt, sinking manholes, and cracked pedestrian footpaths across urban wards.',
      imgUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800',
      caption: 'Municipal asphalt paving & road restoration crew at work.',
      actionTab: 'citizen',
    },
    {
      title: 'Sanitation & Solid Waste',
      dept: 'Sanitation & Environmental Welfare',
      desc: 'Clearing overflowing public dumpsters, illegal trash heaps, and coordinating daily neighborhood waste removal.',
      imgUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800',
      caption: 'Urban municipal solid waste collection and street cleaning.',
      actionTab: 'citizen',
    },
    {
      title: 'Street Lighting & Energy',
      dept: 'Electrical & Energy Conservation',
      desc: 'Rectifying non-functional streetlights, damaged lamp posts, hanging electrical cables, and dark public corridors.',
      imgUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
      caption: 'Public lighting utility maintenance and grid inspection.',
      actionTab: 'citizen',
    },
    {
      title: 'Water Supply & Green Corridors',
      dept: 'Water Supply & Urban Drainage',
      desc: 'Fixing burst water mainlines, flooded street intersections, clogged storm drains, and broken curb pavers.',
      imgUrl: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=800',
      caption: 'Clean, accessible municipal sidewalks and urban storm drainage.',
      actionTab: 'citizen',
    },
  ];

  // Helper to determine role specific landing portal
  const getRoleDestination = () => {
    switch (currentUser?.role) {
      case 'manager':
        return { tab: 'manager', label: 'Department Manager Triage Board' };
      case 'worker':
        return { tab: 'worker', label: 'Field Worker Task Queue' };
      case 'admin':
        return { tab: 'system', label: 'System Management & Oversight' };
      case 'citizen':
      default:
        return { tab: 'citizen', label: 'Citizen Complaint Portal' };
    }
  };

  const userRoleDest = getRoleDestination();

  return (
    <div className="govt-home-container animate-fade-in">
      {/* Spacious 2-Column Hero Section (Matching Reference Proportions) */}
      <section className="civic-hero-section">
        <div className="civic-hero-grid">
          {/* Left Column (Approx 48%): Typography, CTAs, Active Session */}
          <div className="civic-hero-left">
            <div className="civic-hero-tag">
              SMART CITY CIVIC ISSUE REPORTING & SERVICE MANAGEMENT
            </div>

            <h1 className="civic-hero-title">
              Report. Track. <span>Resolve.</span>
            </h1>

            <p className="civic-hero-desc">
              Together for a cleaner, safer and better city. Report civic issues, track their progress and see real change.
            </p>

            <div className="civic-hero-actions">
              <button
                type="button"
                className="civicflow-btn-primary"
                onClick={() => {
                  if (currentUser?.role === 'manager') onSwitchTab('manager');
                  else if (currentUser?.role === 'worker') onSwitchTab('worker');
                  else if (currentUser?.role === 'admin') onSwitchTab('system');
                  else onSwitchTab('citizen', 'reporting');
                }}
              >
                <span>✍️</span>
                <span>
                  {currentUser?.role === 'admin'
                    ? 'System Management'
                    : currentUser?.role === 'manager'
                    ? 'Open Manager Triage'
                    : currentUser?.role === 'worker'
                    ? 'Open Task Queue'
                    : 'Report an Issue'}
                </span>
              </button>

              <button
                type="button"
                className="civicflow-btn-outline"
                onClick={() => {
                  if (currentUser?.role === 'admin') onSwitchTab('analytics');
                  else if (currentUser?.role === 'manager') onSwitchTab('manager', 'priority');
                  else if (currentUser?.role === 'worker') onSwitchTab('worker', 'assigned');
                  else onSwitchTab('citizen', 'tracking');
                }}
              >
                <span>📋</span>
                <span>
                  {currentUser?.role === 'admin'
                    ? 'View Analytics'
                    : currentUser?.role === 'manager'
                    ? 'Priority Queue'
                    : currentUser?.role === 'worker'
                    ? 'Assigned Complaints'
                    : 'Track Complaint'}
                </span>
              </button>
            </div>

            {/* User Session Quick Launcher */}
            {currentUser && (
              <div className="civic-hero-session">
                <span className="civic-hero-session-dot" />
                <span>Active Session: <strong>{currentUser.full_name}</strong></span>
                <span className="civic-hero-session-role">
                  {currentUser.role}
                </span>
                <button
                  type="button"
                  onClick={() => onSwitchTab(userRoleDest.tab)}
                  className="civic-hero-session-link"
                >
                  Go to {userRoleDest.label} →
                </button>
              </div>
            )}
          </div>

          {/* Right Column (Approx 52%): Large Centered Hero Visual */}
          <div className="civic-hero-right">
            <div className="civic-hero-visual-card">
              <picture>
                <source srcSet="/smart_city_hero.webp" type="image/webp" />
                <img
                  src="/smart_city_hero.jpg"
                  alt="Smart City Civic Issue Reporting & Resolution"
                  className="civic-hero-img"
                  width="650"
                  height="480"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <div className="civic-hero-badge-overlay">
                <span style={{ fontWeight: 700 }}>🌱 Eco-Friendly Community Initiative</span>
                <span style={{ opacity: 0.9 }}>• Environmental Welfare, Urban Greening & Sustainable Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Action / Navigation Cards */}
      <section className="govt-home-section">
        <div className="govt-section-header">
          <h2 className="govt-section-title">
            Municipal Portals & Community Services
          </h2>
          <p className="govt-section-sub">
            Choose an action below to file a grievance, monitor environmental triage, or verify completed field work.
          </p>
        </div>

        <div className="govt-cta-grid">
          {/* Card 1: Report an Issue */}
          <div className="govt-cta-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📷</span>
                <span className="profile-role-badge-small" style={{ background: '#dcfce7', color: '#16A34A' }}>
                  Citizen Access
                </span>
              </div>
              <h3 className="govt-cta-title">Report a Civic Issue</h3>
              <p className="govt-cta-desc">
                Submit a new public grievance with attached photographs and address coordinates. AI will automatically identify the category and environmental urgency.
              </p>
            </div>
            <button
              type="button"
              className={(!currentUser || currentUser.role === 'citizen') ? 'govt-btn-primary' : 'govt-btn-secondary'}
              style={{ width: '100%', height: '48px', justifyContent: 'center', fontSize: '1rem' }}
              onClick={() => onSwitchTab('citizen', 'reporting')}
            >
              {(!currentUser || currentUser.role === 'citizen') ? 'Report an Issue Now' : 'Citizen Portal (Restricted)'}
            </button>
          </div>

          {/* Card 2: Track Complaints */}
          <div className="govt-cta-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📋</span>
                <span className="profile-role-badge-small" style={{ background: '#dcfce7', color: '#16A34A' }}>
                  Citizen Access
                </span>
              </div>
              <h3 className="govt-cta-title">Track Complaint Status</h3>
              <p className="govt-cta-desc">
                Inspect real-time resolution milestones, view assigned technicians, and inspect before/after verification photos for submitted tickets.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSwitchTab('citizen', 'tracking')}
              className="govt-btn-secondary"
              style={{ width: '100%', height: '48px', justifyContent: 'center', fontSize: '1rem' }}
            >
              {(!currentUser || currentUser.role === 'citizen') ? 'View My Reports Timeline' : 'Track Grievances (Restricted)'}
            </button>
          </div>

          {/* Card 3: Department Manager Triage */}
          <div className="govt-cta-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>👔</span>
                <span className="profile-role-badge-small" style={{ background: 'rgba(244, 183, 64, 0.15)', color: '#B45309' }}>
                  Department Manager Access
                </span>
              </div>
              <h3 className="govt-cta-title">Department Manager Triage</h3>
              <p className="govt-cta-desc">
                Inspect AI classification confidence scores, reassign incorrect tags, and dispatch municipal field workers to pending grievances.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSwitchTab('manager')}
              className={currentUser?.role === 'manager' ? 'govt-btn-primary' : 'govt-btn-secondary'}
              style={{ width: '100%', height: '48px', justifyContent: 'center', fontSize: '1rem' }}
            >
              {currentUser?.role === 'manager' ? 'Open Manager Triage →' : 'Manager Triage (Restricted)'}
            </button>
          </div>

          {/* Card 4: Field Operative Dispatch */}
          <div className="govt-cta-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>👷</span>
                <span className="profile-role-badge-small" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
                  Field Operative Access
                </span>
              </div>
              <h3 className="govt-cta-title">Field Worker Dispatch</h3>
              <p className="govt-cta-desc">
                Field operatives access their work orders, review citizen location details, and upload mandatory photographic proof of resolution.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSwitchTab('worker')}
              className={currentUser?.role === 'worker' ? 'govt-btn-primary' : 'govt-btn-secondary'}
              style={{ width: '100%', height: '48px', justifyContent: 'center', fontSize: '1rem' }}
            >
              {currentUser?.role === 'worker' ? 'Open Worker Queue →' : 'Worker Queue (Restricted)'}
            </button>
          </div>

          {/* Card 5: Municipal Administrator Console (Rendered when Admin) */}
          {currentUser?.role === 'admin' && (
            <div className="govt-cta-card" style={{ borderTop: '4px solid #0B1220' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                  <span className="profile-role-badge-small" style={{ background: '#0B1220', color: '#ffffff' }}>
                    Municipal Admin Clearance
                  </span>
                </div>
                <h3 className="govt-cta-title">System Governance Console</h3>
                <p className="govt-cta-desc">
                  Oversee portal user accounts, municipal directorate budgets, field worker rosters, and global complaint lifecycle oversight.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSwitchTab('system')}
                className="govt-btn-primary"
                style={{ width: '100%', height: '48px', justifyContent: 'center', fontSize: '1rem', background: '#0B1220' }}
              >
                Open System Management →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Real Municipal Infrastructure Photography Grid */}
      <section className="govt-home-section">
        <div className="govt-section-header">
          <h2 className="govt-section-title">
            Public Infrastructure & Health Coverage
          </h2>
          <p className="govt-section-sub">
            Official service areas actively monitored and maintained by municipal ground teams.
          </p>
        </div>

        <div className="govt-domains-grid">
          {DOMAINS.map((domain, index) => (
            <div key={index} className="govt-domain-card">
              <img
                src={domain.imgUrl}
                alt={domain.title}
                className="govt-domain-img"
                loading="lazy"
              />
              <div className="govt-domain-body">
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {domain.dept}
                  </div>
                  <h3 className="govt-domain-title">{domain.title}</h3>
                  <p className="govt-domain-desc">{domain.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSwitchTab('citizen')}
                  style={{
                    padding: '0.6rem 1rem',
                    background: '#f0fdf4',
                    color: '#16A34A',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}
                >
                  Report {domain.title} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Verified Resolutions & Transparency Showcase */}
      <section className="govt-home-section govt-verified-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Public Transparency & Accountability
            </div>
            <h2 className="govt-section-title" style={{ margin: '0.35rem 0' }}>
              Recent Verified On-Site Resolutions
            </h2>
            <p className="govt-section-sub" style={{ margin: 0 }}>
              Audit-verified municipal work orders completed by ground teams with geo-tagged photographic proof.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSwitchTab('citizen')}
            style={{
              padding: '0.65rem 1.25rem',
              background: '#f0fdf4',
              color: '#16A34A',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View Public Resolution Feed →
          </button>
        </div>

        <div className="govt-verified-grid">
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600"
                alt="Restored asphalt roadway"
                loading="lazy"
                decoding="async"
                width="600"
                height="180"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#16A34A', color: '#ffffff', fontSize: '0.74rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                ✓ VERIFIED RESOLVED
              </span>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>WO #2026-RD-8841 • Outer Ring Road, Ward 12</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginTop: '0.35rem' }}>Deep Pothole Bitumen Restoration</div>
              <div style={{ fontSize: '0.86rem', color: '#64748B', marginTop: '0.45rem', lineHeight: 1.5 }}>Excavated damaged base, leveled with hot-mix asphalt, and compacted to road grade.</div>
              <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: '#16A34A', fontWeight: 600 }}>Resolved in 18 hrs by Field Crew B-4</div>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600"
                alt="Clean municipal waste zone"
                loading="lazy"
                decoding="async"
                width="600"
                height="180"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#16A34A', color: '#ffffff', fontSize: '0.74rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                ✓ VERIFIED RESOLVED
              </span>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>WO #2026-SN-4109 • Gandhi Market Gate 3</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginTop: '0.35rem' }}>Illegal Commercial Dump Cleared</div>
              <div style={{ fontSize: '0.86rem', color: '#64748B', marginTop: '0.45rem', lineHeight: 1.5 }}>3.2 metric tons of mixed waste cleared, pavement sanitized, and extra bin deployed.</div>
              <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: '#16A34A', fontWeight: 600 }}>Resolved in 6 hrs by Sanitation Rapid Team</div>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600"
                alt="Restored pedestrian street illumination"
                loading="lazy"
                decoding="async"
                width="600"
                height="180"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#16A34A', color: '#ffffff', fontSize: '0.74rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                ✓ VERIFIED RESOLVED
              </span>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>WO #2026-EL-2940 • MG Road Junction, Ward 8</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginTop: '0.35rem' }}>Pedestrian Pathway Luminaire Fixed</div>
              <div style={{ fontSize: '0.86rem', color: '#64748B', marginTop: '0.45rem', lineHeight: 1.5 }}>Replaced water-damaged driver and installed 90W LED fixture with night sensor.</div>
              <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: '#16A34A', fontWeight: 600 }}>Resolved in 14 hrs by Electrical Utility Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Government 3-Pillar Operational Workflow */}
      <section id="how-it-works" className="govt-home-section govt-lifecycle-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Operational Lifecycle
            </div>
            <h2 className="govt-section-title" style={{ margin: '0.35rem 0' }}>
              How the Nagarmitra Redressal Mechanism Operates
            </h2>
            <p className="govt-section-sub" style={{ margin: 0 }}>
              An integrated public service mechanism ensuring sustainability, transparency, and verified field execution.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSwitchTab('how-it-works')}
            style={{
              padding: '0.65rem 1.25rem',
              background: '#f0fdf4',
              color: '#16A34A',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Explore Complete 4-Phase Details →
          </button>
        </div>

        <div className="govt-lifecycle-grid">
          <div style={{ borderLeft: '4px solid #16A34A', paddingLeft: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Phase 1
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0.4rem 0' }}>
              Citizen Grievance Submission
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.55 }}>
              Citizens register issues using their smartphone or computer, attaching photographs, landmark addresses, and GPS data. A unique, permanent tracking ID is generated instantly.
            </p>
          </div>

          <div style={{ borderLeft: '4px solid #16A34A', paddingLeft: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Phase 2
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0.4rem 0' }}>
              AI Triage & Departmental Dispatch
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.55 }}>
              The AI classification module analyzes images to evaluate environmental urgency and routes tickets to departmental supervisors for immediate worker assignment.
            </p>
          </div>

          <div style={{ borderLeft: '4px solid #16A34A', paddingLeft: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Phase 3
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0.4rem 0' }}>
              On-Site Resolution & Audit Verification
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.55 }}>
              Field teams execute repairs on site. To mark any complaint resolved, workers must photograph the restored site for public and administrative verification.
            </p>
          </div>
        </div>
      </section>

      {/* Key Municipal Performance Metrics Strip */}
      <section className="govt-stats-banner">
        <div className="govt-stat-item">
          <div className="govt-stat-value">12,480+</div>
          <div className="govt-stat-label">Complaints Resolved</div>
        </div>

        <div className="govt-stat-item">
          <div className="govt-stat-value">48 Hrs</div>
          <div className="govt-stat-label">Average SLA Turnaround</div>
        </div>

        <div className="govt-stat-item">
          <div className="govt-stat-value">94.8%</div>
          <div className="govt-stat-label">Environmental SLA Compliance</div>
        </div>

        <div className="govt-stat-item">
          <div className="govt-stat-value">142</div>
          <div className="govt-stat-label">Active Field Operatives</div>
        </div>
      </section>
    </div>
  );
}
