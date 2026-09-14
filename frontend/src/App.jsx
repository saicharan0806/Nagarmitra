import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import HomePage from './components/HomePage.jsx';
import CitizenDashboard from './components/CitizenDashboard.jsx';
import ManagerDashboard from './components/ManagerDashboard.jsx';
import WorkerDashboard from './components/WorkerDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import SystemManagement from './components/admin/SystemManagement.jsx';
import AnalyticsDashboard from './components/admin/AnalyticsDashboard.jsx';
import AboutPage from './components/AboutPage.jsx';
import HowItWorksPage from './components/HowItWorksPage.jsx';
import UserProfile from './components/UserProfile.jsx';
import AccessDenied from './components/AccessDenied.jsx';
import SplashScreen, { SPLASH_SESSION_KEY } from './components/SplashScreen.jsx';
import { isRouteAllowed, getDefaultRedirectForRole } from './utils/roleConfig.js';
import { parseUrlParams, getTabUrl } from './utils/navigation.js';
import {
  getStoredComplaints,
  persistComplaints,
  broadcastTabEvent,
  initTabSync,
  SYNC_EVENTS,
} from './utils/tabSync.js';

// Initial Mock Complaints for Instant Interactive Demonstration
const INITIAL_COMPLAINTS = [
  {
    id: 1,
    tracking_id: 'CIVIC-2026-00101',
    title: 'Deep Pothole at Main St Intersection',
    description: 'Large hazardous pothole damaging car rims and creating dangerous swerving.',
    category: 'pothole',
    ai_predicted_category: 'pothole',
    ai_confidence: 95.4,
    severity: 'high',
    status: 'assigned',
    department_name: 'Roads & Infrastructure',
    assigned_worker_id: 1,
    assigned_worker_name: 'Marcus Vance',
    address: '452 Main Street, Downtown Ward',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600',
    proof_image_url: null,
    resolution_notes: null,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    tracking_id: 'CIVIC-2026-00102',
    title: 'Overflowing Waste Bins near Lincoln School',
    description: 'Multiple dumpsters overflowing onto public sidewalk creating foul odor and health hazard.',
    category: 'garbage_dump',
    ai_predicted_category: 'garbage_dump',
    ai_confidence: 92.1,
    severity: 'medium',
    status: 'pending',
    department_name: 'Sanitation & Waste Management',
    assigned_worker_id: null,
    assigned_worker_name: null,
    address: '88 Elm Road, Westside Ward',
    image_url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600',
    proof_image_url: null,
    resolution_notes: null,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 3,
    tracking_id: 'CIVIC-2026-00103',
    title: 'High-Voltage Cable Sparking on Street Pole',
    description: 'Exposed street lamp wiring sparking during rain, dangerous for pedestrians.',
    category: 'street_light',
    ai_predicted_category: 'street_light',
    ai_confidence: 88.5,
    severity: 'critical',
    status: 'in_progress',
    department_name: 'Electrical & Public Lighting',
    assigned_worker_id: 3,
    assigned_worker_name: 'Tariq Al-Mansoor',
    address: '104 Pine Avenue, Metro Core',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600',
    proof_image_url: null,
    resolution_notes: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function App() {
  // Current user authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nagarmitra_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Opening splash screen state (runs only once when user opens the website)
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !localStorage.getItem(SPLASH_SESSION_KEY) && !sessionStorage.getItem(SPLASH_SESSION_KEY);
    } catch {
      return false;
    }
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Initial route extracted from URL query params
  const initialRoute = parseUrlParams();

  // Unauthenticated view toggle: 'signin' | 'signup'
  const [authView, setAuthView] = useState(initialRoute.auth || 'signin');

  // Active view tab: 'home' | 'citizen' | 'manager' | 'worker' | 'system' | 'analytics' | 'about' | 'profile' | 'how-it-works'
  const [currentTab, setCurrentTab] = useState(initialRoute.tab || 'home');
  const [citizenSubTab, setCitizenSubTab] = useState(
    initialRoute.tab === 'citizen' && initialRoute.sub ? initialRoute.sub : 'reporting'
  );
  const [managerModule, setManagerModule] = useState(
    initialRoute.tab === 'manager' && initialRoute.sub ? initialRoute.sub : 'complaints'
  );
  const [workerModule, setWorkerModule] = useState(
    initialRoute.tab === 'worker' && initialRoute.sub ? initialRoute.sub : 'assigned'
  );

  const handleSwitchTab = (tab, subTab = null) => {
    setCurrentTab(tab);
    if (tab === 'citizen' && subTab) {
      setCitizenSubTab(subTab);
    }
    if (tab === 'manager' && subTab) {
      setManagerModule(subTab);
    }
    if (tab === 'worker' && subTab) {
      setWorkerModule(subTab);
    }
  };

  // Sync URL in address bar when tab state changes
  useEffect(() => {
    let sub = null;
    if (currentTab === 'citizen') sub = citizenSubTab;
    if (currentTab === 'manager') sub = managerModule;
    if (currentTab === 'worker') sub = workerModule;
    const newUrl = getTabUrl(currentTab, sub);
    window.history.replaceState(null, '', newUrl);
  }, [currentTab, citizenSubTab, managerModule, workerModule]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { tab, sub, auth } = parseUrlParams();
      if (tab) setCurrentTab(tab);
      if (tab === 'citizen' && sub) setCitizenSubTab(sub);
      if (tab === 'manager' && sub) setManagerModule(sub);
      if (tab === 'worker' && sub) setWorkerModule(sub);
      if (auth) setAuthView(auth);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [complaints, setComplaints] = useState(() => getStoredComplaints(INITIAL_COMPLAINTS));
  const [notification, setNotification] = useState(null);
  const [backendHealth, setBackendHealth] = useState('checking');

  // Check Backend Flask API connectivity
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'healthy') {
          setBackendHealth('online');
        } else {
          setBackendHealth('simulated');
        }
      })
      .catch(() => {
        setBackendHealth('simulated');
      });
  }, []);

  // Multi-Tab Live State Synchronization:
  // Listens to BroadcastChannel and localStorage events across concurrently open tabs
  useEffect(() => {
    const cleanup = initTabSync({
      onComplaintAdded: (newTicket) => {
        setComplaints((prev) => {
          if (prev.some((c) => c.id === newTicket.id || c.tracking_id === newTicket.tracking_id)) {
            return prev;
          }
          const next = [newTicket, ...prev];
          persistComplaints(next);
          return next;
        });
        showNotification(`📢 Real-time update: New grievance ${newTicket.tracking_id} received from another tab.`);
      },
      onComplaintUpdated: (updatedTicket) => {
        setComplaints((prev) => {
          const next = prev.map((c) => (c.id === updatedTicket.id ? updatedTicket : c));
          persistComplaints(next);
          return next;
        });
        showNotification(`🔄 Real-time sync: Ticket ${updatedTicket.tracking_id} updated (${(updatedTicket.status || '').toUpperCase()}).`);
      },
      onComplaintsReset: (defaultData) => {
        setComplaints(defaultData);
        persistComplaints(defaultData);
        showNotification('Grievances reset to demo defaults across all tabs.');
      },
      onComplaintsSync: (syncedComplaints) => {
        setComplaints(syncedComplaints);
      },
      onUserAuthChanged: (syncedUser) => {
        setCurrentUser(syncedUser);
        if (syncedUser) {
          showNotification(`User session updated: Logged in as ${syncedUser.full_name}.`);
        } else {
          showNotification('User signed out in another tab.');
        }
      },
    });

    return cleanup;
  }, []);

  // Strict Route Guard & Automatic Redirection:
  // If an authenticated user attempts to access an unauthorized route,
  // automatically redirect them to their role's authorized default portal with a notification.
  useEffect(() => {
    if (currentUser) {
      if (!isRouteAllowed(currentUser.role, currentTab)) {
        const targetTab = getDefaultRedirectForRole(currentUser.role);
        setCurrentTab(targetTab);
        showNotification(`Access Restricted: Automatically redirected to your authorized ${targetTab.toUpperCase()} portal.`);
      }
    }
  }, [currentUser, currentTab]);

  // Display Toast Notification
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Handle successful login or registration: land on home page & broadcast
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('nagarmitra_user', JSON.stringify(user));
    } catch {}
    broadcastTabEvent(SYNC_EVENTS.USER_AUTH, user);
    setCurrentTab('home');
    showNotification(`Welcome to Nagarmitra, ${user.full_name}!`);
  };

  // Handle Sign Out & broadcast
  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('nagarmitra_user');
    } catch {}
    broadcastTabEvent(SYNC_EVENTS.USER_AUTH, null);
    setAuthView('signin');
    setCurrentTab('home');
    showNotification('You have safely signed out of Nagarmitra.');
  };

  // Update Profile Data & broadcast
  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('nagarmitra_user', JSON.stringify(updatedUser));
    } catch {}
    broadcastTabEvent(SYNC_EVENTS.USER_AUTH, updatedUser);
  };

  // Add New Complaint from Citizen Form & broadcast to all open tabs
  const handleAddComplaint = (newTicket) => {
    setComplaints((prev) => {
      const next = [newTicket, ...prev];
      persistComplaints(next);
      return next;
    });
    broadcastTabEvent(SYNC_EVENTS.COMPLAINT_ADDED, newTicket);
  };

  // Update Complaint State & broadcast to all open tabs
  const handleUpdateComplaint = (updatedTicket) => {
    setComplaints((prev) => {
      const next = prev.map((c) => (c.id === updatedTicket.id ? updatedTicket : c));
      persistComplaints(next);
      return next;
    });
    broadcastTabEvent(SYNC_EVENTS.COMPLAINT_UPDATED, updatedTicket);
  };

  // Reset Complaints to Demo Defaults
  const handleResetComplaints = () => {
    setComplaints(INITIAL_COMPLAINTS);
    persistComplaints(INITIAL_COMPLAINTS);
    broadcastTabEvent(SYNC_EVENTS.COMPLAINTS_RESET, INITIAL_COMPLAINTS);
    showNotification('Grievances restored to default demo state across all tabs.');
  };

  const pendingCount = complaints.filter((c) => c.status === 'pending').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Opening Splash Animation (Once per session) */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Toast Notification Banner */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: '#0B1220',
            border: '1px solid #16A34A',
            boxShadow: '0 4px 12px rgba(11, 18, 32, 0.25)',
            color: '#ffffff',
            padding: '0.85rem 1.25rem',
            borderRadius: '4px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <span>🌱</span>
          <div>{notification}</div>
        </div>
      )}

      {/* Global Header / Navigation Bar featuring Nagarmitra prominently */}
      <Navbar
        currentUser={currentUser}
        authView={authView}
        onSwitchAuthView={setAuthView}
        onSignOut={handleSignOut}
        backendHealth={backendHealth}
        currentTab={currentTab}
        onSwitchTab={handleSwitchTab}
        pendingCount={pendingCount}
        managerModule={managerModule}
        workerModule={workerModule}
      />

      {/* Main Viewport Router: Gated by Authentication */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!currentUser ? (
          /* Unauthenticated View: Support About page viewing or SignIn / SignUp */
          currentTab === 'about' ? (
            <div className="container" style={{ flex: 1, paddingTop: '2.5rem', paddingBottom: '4rem' }}>
              <AboutPage
                onSwitchTab={(tab) => {
                  if (tab === 'home' || tab === 'citizen') {
                    setAuthView('signin');
                    setCurrentTab('home');
                  } else {
                    handleSwitchTab(tab);
                  }
                }}
              />
            </div>
          ) : authView === 'signin' ? (
            <SignIn
              onLoginSuccess={handleLoginSuccess}
              onSwitchToSignUp={() => setAuthView('signup')}
            />
          ) : (
            <SignUp
              onRegisterSuccess={handleLoginSuccess}
              onSwitchToSignIn={() => setAuthView('signin')}
            />
          )
        ) : (
          /* Authenticated Dashboard Views */
          <div className="container" style={{ flex: 1, paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* 1. Home Page: Accessible by All Roles */}
            {currentTab === 'home' && (
              <HomePage
                currentUser={currentUser}
                onSwitchTab={handleSwitchTab}
              />
            )}

            {/* 2. About Page: Institutional Citizen Charter Accessible by All Roles */}
            {currentTab === 'about' && (
              <AboutPage
                onSwitchTab={handleSwitchTab}
              />
            )}

            {/* 2b. How It Works: 4-Stage Redressal Mechanism Accessible by All Roles */}
            {currentTab === 'how-it-works' && (
              <HowItWorksPage
                currentUser={currentUser}
                onSwitchTab={handleSwitchTab}
              />
            )}

            {/* 3. Citizen Dashboard: Report & Track (Citizen Only) */}
            {currentTab === 'citizen' && (
              currentUser.role === 'citizen' ? (
                <CitizenDashboard
                  complaints={complaints}
                  onAddComplaint={handleAddComplaint}
                  onNotification={showNotification}
                  initialSubTab={citizenSubTab}
                  onSubTabChange={setCitizenSubTab}
                />
              ) : (
                <AccessDenied
                  currentUser={currentUser}
                  requiredRole="Citizen"
                  pageName="Report & Track Portal"
                  onSwitchTab={handleSwitchTab}
                />
              )
            )}

            {/* 4. Manager Triage: Department Manager Only */}
            {currentTab === 'manager' && (
              currentUser.role === 'manager' ? (
                <ManagerDashboard
                  complaints={complaints}
                  onUpdateComplaint={handleUpdateComplaint}
                  onNotification={showNotification}
                  initialModule={managerModule}
                  onModuleChange={setManagerModule}
                />
              ) : (
                <AccessDenied
                  currentUser={currentUser}
                  requiredRole="Department Manager"
                  pageName="Manager Triage Dashboard"
                  onSwitchTab={handleSwitchTab}
                />
              )
            )}

            {/* 5. Field Operations: Field Operative Only */}
            {currentTab === 'worker' && (
              currentUser.role === 'worker' ? (
                <WorkerDashboard
                  complaints={complaints}
                  onUpdateComplaint={handleUpdateComplaint}
                  onNotification={showNotification}
                  initialModule={workerModule}
                  onModuleChange={setWorkerModule}
                />
              ) : (
                <AccessDenied
                  currentUser={currentUser}
                  requiredRole="Field Operative"
                  pageName="Field Operations Portal"
                  onSwitchTab={handleSwitchTab}
                />
              )
            )}

            {/* 6. System Management: Municipal Administrator Only */}
            {(currentTab === 'system' || currentTab === 'admin') && (
              currentUser.role === 'admin' ? (
                <SystemManagement
                  complaints={complaints}
                  onUpdateComplaint={handleUpdateComplaint}
                  onNotification={showNotification}
                  onSwitchTab={handleSwitchTab}
                  onResetComplaints={handleResetComplaints}
                />
              ) : (
                <AccessDenied
                  currentUser={currentUser}
                  requiredRole="Municipal Administrator"
                  pageName="System Management Portal"
                  onSwitchTab={handleSwitchTab}
                />
              )
            )}

            {/* 7. Analytics Dashboard: Municipal Administrator Only */}
            {currentTab === 'analytics' && (
              currentUser.role === 'admin' ? (
                <AnalyticsDashboard
                  complaints={complaints}
                  onSwitchTab={handleSwitchTab}
                />
              ) : (
                <AccessDenied
                  currentUser={currentUser}
                  requiredRole="Municipal Administrator"
                  pageName="Analytics Dashboard"
                  onSwitchTab={handleSwitchTab}
                />
              )
            )}

            {/* 8. Profile: Accessible by All Roles */}
            {currentTab === 'profile' && (
              <UserProfile
                currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
                onNotification={showNotification}
                onSwitchTab={handleSwitchTab}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Civic Footer with 'For Any Queries' Contact Support */}
      <footer className="govt-footer">
        <div className="container govt-footer-inner">
          {/* Top Tier: Portal Identity & 'For Any Queries' Contact Card */}
          <div className="govt-footer-top">
            <div className="govt-footer-brand">
              <div className="govt-footer-brand-title">
                <span>🏙️🌱</span>
                <span>Nagarmitra (नगरमित्र)</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>• Municipal Citizen Services</span>
              </div>
              <div className="govt-footer-brand-sub">
                Public Health, Environmental Maintenance & Grievance Redressal Network
              </div>
            </div>

            {/* Prominent 'For Any Queries' Contact Section */}
            <div className="govt-footer-queries-card">
              <span className="govt-footer-queries-icon">📞</span>
              <div className="govt-footer-queries-content">
                <div className="govt-footer-queries-label">
                  <span>For Any Queries / Grievance Helpline</span>
                  <span className="govt-footer-support-badge">24×7 Active</span>
                </div>
                <div className="govt-footer-queries-numbers">
                  <a
                    href="tel:1800112026"
                    className="govt-footer-phone-link"
                    title="Call Municipal Toll-Free Helpline: 1800-11-2026"
                  >
                    1800-11-2026
                  </a>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <a
                    href="tel:+911123382026"
                    className="govt-footer-phone-alt"
                    title="Call Direct Control Room: +91 11-2338-2026"
                  >
                    +91 11-2338-2026
                  </a>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <a
                    href="mailto:helpline@nagarmitra.gov.in"
                    className="govt-footer-phone-alt"
                    title="Email Municipal Helpdesk"
                  >
                    helpline@nagarmitra.gov.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tier: Statutory Links & Copyright */}
          <div className="govt-footer-bottom">
            <div>
              © 2026 Municipal Public Welfare Directorate. All official citizen records are protected under civic disclosure standards.
            </div>
            <div className="govt-footer-links">
              <a
                href={getTabUrl('about')}
                target="_blank"
                rel="noopener noreferrer"
                className="govt-footer-link"
              >
                Citizen Charter & SLA
              </a>
              <a
                href={getTabUrl('how-it-works')}
                target="_blank"
                rel="noopener noreferrer"
                className="govt-footer-link"
              >
                How It Works
              </a>
              <span className="govt-footer-link" style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span className="govt-footer-link" style={{ cursor: 'pointer' }}>Terms of Service</span>
              <a
                href="tel:1800112026"
                className="govt-footer-link"
                style={{ color: '#16A34A', fontWeight: 600 }}
              >
                Helpdesk Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
