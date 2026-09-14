import React, { useState, useMemo } from 'react';

/**
 * ComplaintTracking Component
 * ----------------------------
 * Live tracking view with quick tracking ID search, quick chip selectors,
 * detailed grievance inspection, and 5-stage milestone resolution timeline.
 */
export default function ComplaintTracking({
  complaints = [],
  selectedComplaintId = null,
  onSelectComplaint,
  onNotification,
  onRateResolution,
  onSwitchTab,
  onTabSwitch,
  recentlyCreatedTicket = null,
  onClearRecentTicket,
}) {
  const [trackingSearch, setTrackingSearch] = useState('');

  const selectedComplaint = useMemo(() => {
    return (
      complaints.find((c) => c.id === selectedComplaintId) ||
      complaints[0] ||
      null
    );
  }, [complaints, selectedComplaintId]);

  const handleSearch = () => {
    if (!trackingSearch.trim()) return;
    const match = complaints.find(
      (c) => c.tracking_id.toLowerCase() === trackingSearch.trim().toLowerCase()
    );
    if (match) {
      if (onSelectComplaint) onSelectComplaint(match.id);
      if (onNotification) onNotification(`Found ticket ${match.tracking_id}!`);
    } else {
      if (onNotification) {
        onNotification(`No complaint found matching ID "${trackingSearch}".`);
      } else {
        alert(`No complaint found matching ID "${trackingSearch}".`);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Breadcrumb & Back Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => {
            if (onSwitchTab) onSwitchTab('home');
            else if (onTabSwitch) onTabSwitch('reporting');
          }}
          className="govt-btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', padding: '0.45rem 0.9rem' }}
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              if (onTabSwitch) onTabSwitch('reporting');
              else if (onSwitchTab) onSwitchTab('citizen', 'reporting');
            }}
            className="govt-btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', padding: '0.45rem 0.95rem' }}
          >
            <span>✍️</span>
            <span>Report Another Grievance</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onTabSwitch) onTabSwitch('history');
              else if (onSwitchTab) onSwitchTab('citizen', 'history');
            }}
            className="govt-btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', padding: '0.45rem 0.95rem' }}
          >
            <span>📂</span>
            <span>All Grievances</span>
          </button>
        </div>
      </div>

      {/* Confirmation Notification Card when a complaint was just filed */}
      {recentlyCreatedTicket && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderLeft: '5px solid #16a34a',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🎉</span>
              <strong style={{ fontSize: '1.05rem', color: '#166534' }}>
                Grievance Registered Successfully!
              </strong>
            </div>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.86rem', color: '#15803d' }}>
              Tracking ID: <strong>{recentlyCreatedTicket.tracking_id}</strong> • Routed to: <strong>{recentlyCreatedTicket.department_name}</strong>. Real-time milestones and status are displayed below.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="govt-btn-secondary"
              onClick={() => {
                if (onSwitchTab) onSwitchTab('home');
                else if (onTabSwitch) onTabSwitch('reporting');
              }}
              style={{ fontSize: '0.82rem' }}
            >
              ← Return Home
            </button>
            <button
              type="button"
              className="govt-btn-primary"
              onClick={() => {
                if (onClearRecentTicket) onClearRecentTicket();
                if (onTabSwitch) onTabSwitch('reporting');
                else if (onSwitchTab) onSwitchTab('citizen', 'reporting');
              }}
              style={{ fontSize: '0.82rem' }}
            >
              ✍️ File Another
            </button>
          </div>
        </div>
      )}

      {/* Tracking Search & Selector Strip */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Live Complaint Tracking
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              Enter a permanent tracking ID or select a ticket below to inspect live field repair milestones.
            </p>
          </div>

          {/* Quick Search */}
          <div style={{ display: 'flex', gap: '0.5rem', minWidth: '320px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Tracking ID (e.g. CIVIC-2026-00101)..."
              value={trackingSearch}
              onChange={(e) => setTrackingSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              style={{ fontSize: '0.85rem' }}
            />
            <button
              type="button"
              className="govt-btn-primary"
              style={{ fontSize: '0.82rem', padding: '0 1rem', whiteSpace: 'nowrap' }}
              onClick={handleSearch}
            >
              Locate
            </button>
          </div>
        </div>

        {/* Quick Ticket Selector Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {complaints.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectComplaint && onSelectComplaint(c.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedComplaint?.id === c.id ? '#16A34A' : '#cbd5e1',
                background: selectedComplaint?.id === c.id ? '#16A34A' : '#F8F9F6',
                color: selectedComplaint?.id === c.id ? '#ffffff' : '#334155',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <span style={{ fontFamily: 'monospace' }}>{c.tracking_id}</span>
              <span
                style={{
                  background: selectedComplaint?.id === c.id ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                }}
              >
                {c.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Complaint Milestone View */}
      {selectedComplaint ? (
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Ticket Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 700, color: '#16A34A', background: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #86efac' }}>
                  {selectedComplaint.tracking_id}
                </span>
                <span className={`badge badge-${selectedComplaint.status}`} style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  {selectedComplaint.status}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Filed on {new Date(selectedComplaint.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                {selectedComplaint.title}
              </h3>
              <div style={{ fontSize: '0.86rem', color: '#64748B', marginTop: '0.35rem' }}>
                📍 <strong>Location:</strong> {selectedComplaint.address}
              </div>
            </div>

            {/* Direct Action */}
            {selectedComplaint.status === 'resolved' && (
              <button
                type="button"
                className="govt-btn-primary"
                style={{ fontSize: '0.88rem', padding: '0.55rem 1.15rem' }}
                onClick={() => onRateResolution && onRateResolution(selectedComplaint.id)}
              >
                ⭐ Rate Resolution
              </button>
            )}
          </div>

          {/* 2 Column Details: Left Info/Photos, Right Milestone Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Left Column: Complaint Details & Photographic Audit */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
                Complaint Details & Assigned Team
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem', background: '#F8F9F6', padding: '0.9rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                {selectedComplaint.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.84rem' }}>
                <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                  <div style={{ color: '#16A34A', fontWeight: 700 }}>Department</div>
                  <div style={{ color: '#111827', fontWeight: 600 }}>{selectedComplaint.department_name}</div>
                </div>
                <div style={{ background: '#F8F9F6', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                  <div style={{ color: '#64748b', fontWeight: 700 }}>Field Worker</div>
                  <div style={{ color: '#111827', fontWeight: 600 }}>
                    {selectedComplaint.assigned_worker_name || 'Awaiting Dispatch'}
                  </div>
                </div>
              </div>

              {/* Citizen Photo Evidence */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', marginBottom: '0.4rem' }}>
                  📷 Citizen Initial Photo Evidence
                </div>
                {selectedComplaint.image_url ? (
                  <img
                    src={selectedComplaint.image_url}
                    alt="Citizen Proof"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  />
                ) : (
                  <div style={{ padding: '1.5rem', background: '#F8F9F6', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                    No initial photo provided
                  </div>
                )}
              </div>

              {/* Worker Resolution Proof if Resolved */}
              {selectedComplaint.proof_image_url && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16A34A', marginBottom: '0.4rem' }}>
                    ✅ Verified Ground Resolution Proof
                  </div>
                  <img
                    src={selectedComplaint.proof_image_url}
                    alt="Ground Resolution"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #16A34A' }}
                  />
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#16A34A' }}>
                    Restoration audit confirmed by Department Lead.
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: 5-Stage Milestone Timeline */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>
                Real-Time Resolution Milestones
              </h4>

              <div className="milestone-track">
                {/* Node 1: Registered */}
                <div className="milestone-node completed">
                  <div className="milestone-dot">✓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>
                      1. Grievance Registered & Geotagged
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      GPS coordinates verified and logged into municipal database.
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 600, marginTop: '0.2rem' }}>
                      Completed • {new Date(selectedComplaint.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Node 2: AI Triage */}
                <div className="milestone-node completed">
                  <div className="milestone-dot">✓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>
                      2. AI Computer Vision Triage
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      Classified as {selectedComplaint.category} with {selectedComplaint.ai_confidence}% confidence score.
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 600, marginTop: '0.2rem' }}>
                      Completed • Routed to {selectedComplaint.department_name}
                    </div>
                  </div>
                </div>

                {/* Node 3: Department Assignment */}
                <div className={`milestone-node ${selectedComplaint.status !== 'pending' ? 'completed' : 'active'}`}>
                  <div className="milestone-dot">
                    {selectedComplaint.status !== 'pending' ? '✓' : '3'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>
                      3. Departmental Assignment & Work Order
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {selectedComplaint.assigned_worker_name
                        ? `Assigned to field technician ${selectedComplaint.assigned_worker_name}.`
                        : 'Awaiting department manager queue review.'}
                    </div>
                  </div>
                </div>

                {/* Node 4: Field Operative Dispatched */}
                <div className={`milestone-node ${selectedComplaint.status === 'in_progress' || selectedComplaint.status === 'resolved' ? 'completed' : ''}`}>
                  <div className="milestone-dot">
                    {selectedComplaint.status === 'in_progress' || selectedComplaint.status === 'resolved' ? '✓' : '4'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>
                      4. Field Operative On-Site Execution
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {selectedComplaint.status === 'in_progress'
                        ? 'Crew is actively executing repairs on site.'
                        : selectedComplaint.status === 'resolved'
                        ? 'On-site repairs completed.'
                        : 'Pending technician arrival on site.'}
                    </div>
                  </div>
                </div>

                {/* Node 5: Verification & Resolution */}
                <div className={`milestone-node ${selectedComplaint.status === 'resolved' ? 'completed' : ''}`}>
                  <div className="milestone-dot">
                    {selectedComplaint.status === 'resolved' ? '✓' : '5'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>
                      5. Proof Photo Uploaded & Verified Closure
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {selectedComplaint.status === 'resolved'
                        ? 'Mandatory resolution proof uploaded and verified by municipal lead.'
                        : 'Awaiting completion verification.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '3rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center', color: '#64748b' }}>
          Select a complaint above to track its live ground progress.
        </div>
      )}
    </div>
  );
}
