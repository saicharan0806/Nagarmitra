import React from 'react';

/**
 * AboutPage Component
 * Official Municipal Public Service Overview & Citizen Charter for Nagarmitra
 * Accessible by all 4 roles and guests.
 */
export default function AboutPage({ onSwitchTab, currentUser }) {
  const steps = [
    {
      num: '01',
      icon: '📱',
      title: 'Geotagged Incident Reporting',
      desc: 'Citizens capture real-time photographic evidence with device GPS coordinates, flagging public infrastructure defects across all municipal wards.',
    },
    {
      num: '02',
      icon: '🤖',
      title: 'AI Computer Vision Triage',
      desc: 'ViT-Civic neural network analyzes images with 96.4% accuracy, categorizing defects (potholes, waste, lighting, drainage) and assessing hazard severity.',
    },
    {
      num: '03',
      icon: '🏛️',
      title: 'Departmental Dispatch',
      desc: 'Municipal department leads review statutory SLAs, allocate specialized fleet equipment, and dispatch trained field operatives within minutes.',
    },
    {
      num: '04',
      icon: '👷',
      title: 'On-Site Field Resolution',
      desc: 'Field operatives deploy safety perimeters, execute repairs, and upload mandatory photographic proof of resolution prior to ticket closure.',
    },
    {
      num: '05',
      icon: '⭐',
      title: 'Citizen Verification & Closure',
      desc: 'Citizens inspect before-and-after proof photos, rate municipal repair quality, and confirm neighborhood restoration.',
    },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Top Hero Banner */}
      <div className="about-hero-banner">
        <div className="about-hero-tag">
          <span>🏛️ MUNICIPAL CITIZEN SERVICES CHARTER</span>
          <span className="bullet-sep">•</span>
          <span>GOVERNMENT OF URBAN LOCAL BODIES</span>
        </div>
        <h1 className="about-hero-title">About Nagarmitra (नगरमित्र)</h1>
        <p className="about-hero-desc">
          Nagarmitra is an integrated Smart City civic issue reporting and service management platform designed to connect residents, administrative departments, and ground field workers for transparent, accountable urban governance.
        </p>

        <div className="about-hero-meta">
          <span className="about-meta-pill">🌱 Clean Green Governance</span>
          <span className="about-meta-pill">⚡ 24/7 Civic Helpline: 1800-11-2026</span>
          <span className="about-meta-pill">🛡️ ISO 27001 Certified Security</span>
        </div>
      </div>

      {/* 5-Step Process Section */}
      <div className="field-card">
        <div className="field-card-header">
          <h2 className="field-card-title">🔄 How Nagarmitra Works: 5-Stage Redressal Lifecycle</h2>
          <span className="field-card-tag">End-to-End Workflow</span>
        </div>

        <div className="about-steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="about-step-card">
              <div className="about-step-header">
                <span className="about-step-num">{step.num}</span>
                <span className="about-step-icon">{step.icon}</span>
              </div>
              <h3 className="about-step-title">{step.title}</h3>
              <p className="about-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Level Agreement (SLA) Matrix */}
      <div className="field-card">
        <div className="field-card-header">
          <h2 className="field-card-title">⏱️ Statutory Resolution Commitments (SLA Standards)</h2>
          <span className="field-card-tag">Citizen Rights</span>
        </div>

        <div className="about-sla-grid">
          <div className="about-sla-card border-red">
            <span className="about-sla-level">🔴 Critical Severity</span>
            <div className="about-sla-hours">4 – 12 Hours</div>
            <p className="about-sla-text">Exposed electrical wires, water mainline bursts, major thoroughfare cave-ins, and fallen trees blocking emergency corridors.</p>
          </div>

          <div className="about-sla-card border-amber">
            <span className="about-sla-level">🟠 High Severity</span>
            <div className="about-sla-hours">24 Hours</div>
            <p className="about-sla-text">Deep road potholes, overflowing market garbage dumpsters, clogged storm drains, and non-functional junction streetlights.</p>
          </div>

          <div className="about-sla-card border-yellow">
            <span className="about-sla-level">🟡 Medium Severity</span>
            <div className="about-sla-hours">48 Hours</div>
            <p className="about-sla-text">Broken sidewalk pavers, localized garbage accumulation, dim corridor lights, and minor municipal park maintenance.</p>
          </div>

          <div className="about-sla-card border-green">
            <span className="about-sla-level">🟢 Low Severity</span>
            <div className="about-sla-hours">72 Hours</div>
            <p className="about-sla-text">Cosmetic curb touchups, municipal signage repainting, tree branch trimming, and scheduled neighborhood sweepings.</p>
          </div>
        </div>
      </div>

      {/* Municipal Directorate Contacts */}
      <div className="field-card">
        <div className="field-card-header">
          <h2 className="field-card-title">📞 Municipal Contact Directory & Emergency Cell</h2>
          <span className="field-card-tag">Official Support</span>
        </div>

        <div className="about-contact-grid">
          <div className="about-contact-item">
            <strong>Citizen Toll-Free Helpline</strong>
            <p>1800-11-2026 (Toll-Free 24/7 Support)</p>
          </div>
          <div className="about-contact-item">
            <strong>Grievance Email Desk</strong>
            <p>grievance@nagarmitra.gov.in</p>
          </div>
          <div className="about-contact-item">
            <strong>Municipal Headquarters</strong>
            <p>Nagarmitra Civic Bhavan, Ward 8 Ashok Nagar, Central Zone</p>
          </div>
          <div className="about-contact-item">
            <strong>Field Dispatch Operations</strong>
            <p>Direct Radio Ext: 401 / 402 / 403</p>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            className="govt-btn-primary"
            onClick={() => {
              if (currentUser?.role === 'citizen') onSwitchTab('citizen', 'reporting');
              else onSwitchTab('home');
            }}
          >
            {currentUser?.role === 'citizen' ? '✍️ Report an Issue Now' : '← Return to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
