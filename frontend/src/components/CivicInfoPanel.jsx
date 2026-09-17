import React from 'react';

/**
 * CivicInfoPanel Component
 * Displays the official Nagarmitra civic services illustration and a 3-step
 * workflow overview so any visitor immediately understands how the system works.
 */
export default function CivicInfoPanel() {
  return (
    <div className="govt-info-panel">
      <div>
        {/* Realistic Smart City Hero Banner */}
        <div className="govt-hero-img-wrap">
          <picture>
            <source srcSet="/smart_city_hero.webp" type="image/webp" />
            <img
              src="/smart_city_hero.jpg"
              alt="Nagarmitra Municipal Civic Complaint Redressal: Citizen reporting defect while worker restores roadway"
              className="govt-hero-img"
              loading="lazy"
              decoding="async"
              width="600"
              height="280"
            />
          </picture>
        </div>

        {/* Section Heading */}
        <div style={{ marginTop: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16A34A', letterSpacing: '-0.01em' }}>
            Clean Environment & Civic Redressal
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.25rem', lineHeight: 1.4 }}>
            A public welfare portal connecting citizens with municipal health and environmental teams for cleaner, sustainable neighborhoods.
          </p>
        </div>

        {/* 3 Step Visual Guide */}
        <div className="govt-info-steps">
          <div className="govt-info-step">
            <div className="govt-step-num">1</div>
            <div>
              <div className="govt-step-title">1. Report Civic & Sanitation Issues</div>
              <div className="govt-step-desc">
                Citizens submit complaints with photographic evidence for road hazards, water contamination, uncollected garbage, or public lighting.
              </div>
            </div>
          </div>

          <div className="govt-info-step">
            <div className="govt-step-num">2</div>
            <div>
              <div className="govt-step-title">2. Automated Triage & Department Routing</div>
              <div className="govt-step-desc">
                AI vision models evaluate environmental and safety urgency, routing tickets to the responsible public health supervisor.
              </div>
            </div>
          </div>

          <div className="govt-info-step">
            <div className="govt-step-num">3</div>
            <div>
              <div className="govt-step-title">3. Ground Resolution & Verification</div>
              <div className="govt-step-desc">
                Municipal teams complete repairs and upload photographic proof-of-work before grievance resolution is confirmed.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Help & Support strip */}
      <div
        style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid #E2E8F0',
          fontSize: '0.78rem',
          color: '#64748B',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <span>🌱 State Municipal Welfare Board</span>
        <span style={{ fontWeight: 600, color: '#16A34A' }}>Toll Free: 1800-11-2026</span>
      </div>
    </div>
  );
}
