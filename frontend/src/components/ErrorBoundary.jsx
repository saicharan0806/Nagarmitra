import React from 'react';

/**
 * Nagarmitra Error Boundary
 * Prevents blank/white screens across the entire application.
 * Catches JavaScript runtime exceptions anywhere in the child component tree,
 * logs them cleanly, and displays a graceful institutional recovery screen with options to reset.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Nagarmitra Caught Error Boundary Exception:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    // Clear potentially corrupted transient state and return to Home
    try {
      window.location.href = '/?tab=home';
    } catch {
      window.location.reload();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F8FAFC',
            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            padding: '2rem',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.25rem',
                border: '1px solid #FEE2E2',
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                fontSize: '0.92rem',
                color: '#64748B',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
              }}
            >
              An unexpected display issue occurred in the portal. Nagarmitra has safely contained the problem to prevent further errors.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.8rem',
                  color: '#334155',
                  fontFamily: 'monospace',
                  textAlign: 'left',
                  marginBottom: '1.75rem',
                  overflowX: 'auto',
                  maxHeight: '120px',
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReset}
                style={{
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 4px rgba(22, 163, 74, 0.2)',
                }}
              >
                🌱 Return to Home
              </button>
              <button
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  cursor: 'pointer',
                }}
              >
                🔄 Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
