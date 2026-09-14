import React from 'react';

/**
 * AccessDenied Component (403 Forbidden)
 * Official Municipal Role-Based Access Restriction Warning
 * Displayed when an authenticated user attempts to access an unauthorized portal.
 */
export default function AccessDenied({
  currentUser,
  requiredRole = 'Authorized Personnel',
  pageName = 'Restricted Municipal Console',
  onSwitchTab,
}) {
  const currentRole = (currentUser?.role || 'citizen').toUpperCase();

  const getAuthorizedTab = () => {
    switch (currentUser?.role) {
      case 'worker':
        return { tab: 'worker', label: 'Field Operations' };
      case 'admin':
        return { tab: 'system', label: 'System Management' };
      case 'manager':
        return { tab: 'manager', label: 'Manager Triage' };
      case 'citizen':
      default:
        return { tab: 'citizen', label: 'Report & Track' };
    }
  };

  const defaultDest = getAuthorizedTab();

  return (
    <div className="animate-fade-in" style={{ maxWidth: '720px', margin: '3rem auto', width: '100%' }}>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderTop: '5px solid #dc2626',
          borderRadius: '8px',
          padding: '2.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1.25rem auto',
            border: '2px solid #fca5a5',
          }}
        >
          🛡️
        </div>

        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Municipal Security Notice • Code 403 Forbidden
        </div>

        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111827', margin: '0.35rem 0 0.75rem 0' }}>
          Access Restricted: {pageName}
        </h1>

        <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.5, maxWidth: '540px', margin: '0 auto 1.75rem auto' }}>
          Under municipal governance regulations, access to the <strong>{pageName}</strong> is restricted strictly to <strong>{requiredRole}</strong>.
        </p>

        {/* Identity & Permission Comparison Box */}
        <div
          style={{
            background: '#F8F9F6',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            textAlign: 'left',
          }}
        >
          <div>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Your Active Role
            </span>
            <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  background: '#fee2e2',
                  color: '#DC2626',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid #fca5a5',
                }}
              >
                ✕ {currentRole}
              </span>
            </div>
            <small style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
              User: {currentUser?.full_name || 'Anonymous'}
            </small>
          </div>

          <div>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Required Clearance
            </span>
            <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  background: '#dcfce7',
                  color: '#16A34A',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid #86efac',
                }}
              >
                ✓ {requiredRole}
              </span>
            </div>
            <small style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
              Official administrative / field credential
            </small>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="govt-btn-secondary"
            onClick={() => onSwitchTab('home')}
          >
            ← Return to Home Portal
          </button>

          <button
            type="button"
            className="govt-btn-primary"
            onClick={() => onSwitchTab(defaultDest.tab)}
          >
            Go to {defaultDest.label} →
          </button>
        </div>
      </div>
    </div>
  );
}
