import React, { useState, useEffect } from 'react';
import { NAV_LINKS_BY_ROLE } from '../utils/roleConfig.js';
import { getTabUrl } from '../utils/navigation.js';

/**
 * Official Government / Municipal Navigation Header for Nagarmitra
 * Social Domain & Eco-Civic Theme (Clean Emerald & Sage Institutional Palette)
 * Features standard text links, green civic seal emblem, and clear unauthenticated/authenticated actions.
 */
export default function Navbar({
  currentUser,
  authView,
  onSwitchAuthView,
  onSignOut,
  currentTab,
  onSwitchTab,
  pendingCount = 0,
  managerModule = 'complaints',
  workerModule = 'assigned',
  citizenSubTab = 'reporting',
  backendHealth = 'checking',
}) {
  const [managerMenuOpen, setManagerMenuOpen] = useState(false);
  const [workerMenuOpen, setWorkerMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (
        !e.target.closest('.govt-nav-dropdown-wrap') &&
        !e.target.closest('.govt-nav-user-wrap') &&
        !e.target.closest('.govt-hamburger-btn') &&
        !e.target.closest('.govt-mobile-drawer')
      ) {
        setManagerMenuOpen(false);
        setWorkerMenuOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setManagerMenuOpen(false);
        setWorkerMenuOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = currentUser?.role && NAV_LINKS_BY_ROLE[currentUser.role]
    ? NAV_LINKS_BY_ROLE[currentUser.role]
    : [
        { id: 'home', label: 'Home' },
      ];

  const handleNavClick = (e, tab, sub = null) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && onSwitchTab) {
      e.preventDefault();
      setMobileMenuOpen(false);
      onSwitchTab(tab, sub);
    }
  };

  return (
    <header className="govt-navbar">
      {/* Main Clean Navigation Bar: Nagarmitra at Top-Left, Nav Bars at Top-Right */}
      <div className="govt-navbar-inner">
        {/* Brand & Municipal Seal strictly at Top Left */}
        <div className="govt-brand-wrap">
          {/* Official Civic Seal Icon with Building & Leaf */}
          <a
            href={getTabUrl('home')}
            onClick={(e) => handleNavClick(e, 'home')}
            className="govt-brand-seal"
            title="Nagarmitra Official Portal Home"
          >
            🌱
          </a>
          <div className="govt-brand-text">
            <div className="govt-brand-header-row">
              <a
                href={getTabUrl('home')}
                onClick={(e) => handleNavClick(e, 'home')}
                className="govt-brand-title"
                title="Nagarmitra Home"
              >
                Nagarmitra
              </a>
              <a
                href={getTabUrl('about')}
                onClick={(e) => handleNavClick(e, 'about')}
                className={`govt-brand-about-pill ${currentTab === 'about' ? 'active' : ''}`}
                title="About Nagarmitra & Municipal Citizen Charter"
              >
                About
              </a>
            </div>
            <div className="govt-brand-sub">
              Stronger Cities. Happier Communities.
            </div>
          </div>
        </div>

        {/* Standard Navigation Links & Actions strictly at Top Right */}
        <nav className="govt-nav-wrap">
          {currentUser ? (
            /* Authenticated State */
            <div className="govt-nav-auth-row">
              {/* Role-Based Dashboard Navigation Tabs */}
              <div className="govt-nav-tabs">
                {navLinks.map((link) => {
                  if (link.id === 'manager') {
                    return (
                      <div
                        key={link.id}
                        className="govt-nav-dropdown-wrap"
                        onMouseEnter={() => setManagerMenuOpen(true)}
                        onMouseLeave={() => setManagerMenuOpen(false)}
                      >
                        <a
                          href={getTabUrl('manager')}
                          onClick={(e) => handleNavClick(e, 'manager')}
                          className={`govt-nav-tab ${currentTab === 'manager' ? 'active' : ''}`}
                          title="Municipal Departmental Manager Triage"
                          aria-haspopup="menu"
                          aria-expanded={managerMenuOpen}
                        >
                          <span>Manager Triage</span>
                          {pendingCount > 0 && (
                            <span className="govt-badge-counter">
                              {pendingCount}
                            </span>
                          )}
                          <span
                            className="govt-nav-chevron"
                            aria-label="Toggle Manager Triage dropdown menu"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setManagerMenuOpen((prev) => !prev);
                            }}
                          >
                            ▾
                          </span>
                        </a>

                        {/* Manager Triage Dropdown Menu exposing the 5 modules */}
                        {managerMenuOpen && (
                          <div className="govt-nav-dropdown-menu" role="menu" aria-label="Manager Triage Modules">
                            <div className="govt-nav-dropdown-header">
                              Manager Triage Modules
                            </div>
                            <a
                              href={getTabUrl('manager', 'complaints')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'complaints' ? 'active' : ''}`}
                              onClick={(e) => {
                                setManagerMenuOpen(false);
                                handleNavClick(e, 'manager', 'complaints');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">📋</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Complaint Management</span>
                                <span className="govt-nav-dropdown-desc">Lifecycle tracking, filters & audit</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'ai')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'ai' ? 'active' : ''}`}
                              onClick={(e) => {
                                setManagerMenuOpen(false);
                                handleNavClick(e, 'manager', 'ai');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">🤖</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">AI Classification</span>
                                <span className="govt-nav-dropdown-desc">Vision ViT confidence & manual override</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'priority')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'priority' ? 'active' : ''}`}
                              onClick={(e) => {
                                setManagerMenuOpen(false);
                                handleNavClick(e, 'manager', 'priority');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">⚡</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Priority Management</span>
                                <span className="govt-nav-dropdown-desc">SLA matrices & urgent escalation</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'departments')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'departments' ? 'active' : ''}`}
                              onClick={(e) => {
                                setManagerMenuOpen(false);
                                handleNavClick(e, 'manager', 'departments');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">🏛️</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Department Management</span>
                                <span className="govt-nav-dropdown-desc">Directorate loads & ticket routing</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'workers')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'workers' ? 'active' : ''}`}
                              onClick={(e) => {
                                setManagerMenuOpen(false);
                                handleNavClick(e, 'manager', 'workers');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">👷</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Worker Assignment</span>
                                <span className="govt-nav-dropdown-desc">Field operative roster & dispatch</span>
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link.id === 'worker') {
                    return (
                      <div
                        key={link.id}
                        className="govt-nav-dropdown-wrap"
                        onMouseEnter={() => setWorkerMenuOpen(true)}
                        onMouseLeave={() => setWorkerMenuOpen(false)}
                      >
                        <a
                          href={getTabUrl('worker')}
                          onClick={(e) => handleNavClick(e, 'worker')}
                          className={`govt-nav-tab ${currentTab === 'worker' ? 'active' : ''}`}
                          title="Municipal Field Operatives Console"
                          aria-haspopup="menu"
                          aria-expanded={workerMenuOpen}
                        >
                          <span>Field Operations</span>
                          <span
                            className="govt-nav-chevron"
                            aria-label="Toggle Field Operations dropdown menu"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setWorkerMenuOpen((prev) => !prev);
                            }}
                          >
                            ▾
                          </span>
                        </a>

                        {/* Field Operations Dropdown Menu exposing the 4 modules */}
                        {workerMenuOpen && (
                          <div className="govt-nav-dropdown-menu" role="menu" aria-label="Field Operations Modules">
                            <div className="govt-nav-dropdown-header">
                              Field Operations Modules
                            </div>
                            <a
                              href={getTabUrl('worker', 'assigned')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'assigned' ? 'active' : ''}`}
                              onClick={(e) => {
                                setWorkerMenuOpen(false);
                                handleNavClick(e, 'worker', 'assigned');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">📋</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Assigned Complaints</span>
                                <span className="govt-nav-dropdown-desc">Task queue, priority tags & filters</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('worker', 'details')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'details' ? 'active' : ''}`}
                              onClick={(e) => {
                                setWorkerMenuOpen(false);
                                handleNavClick(e, 'worker', 'details');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">🔍</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Task Details</span>
                                <span className="govt-nav-dropdown-desc">Site telemetry, PPE & citizen photo</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('worker', 'status')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'status' ? 'active' : ''}`}
                              onClick={(e) => {
                                setWorkerMenuOpen(false);
                                handleNavClick(e, 'worker', 'status');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">🔄</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Status Updates</span>
                                <span className="govt-nav-dropdown-desc">En route, on-site & progress stages</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('worker', 'proof')}
                              role="menuitem"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'proof' ? 'active' : ''}`}
                              onClick={(e) => {
                                setWorkerMenuOpen(false);
                                handleNavClick(e, 'worker', 'proof');
                              }}
                            >
                              <span className="govt-nav-dropdown-icon">📸</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Proof of Resolution</span>
                                <span className="govt-nav-dropdown-desc">Before/after photos & closeout form</span>
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.id}
                      href={getTabUrl(link.id)}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`govt-nav-tab ${currentTab === link.id ? 'active' : ''}`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Interactive Clickable User Identity Lockup & Profile Dropdown */}
              <div
                className="govt-nav-user-wrap"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <a
                  href={getTabUrl('profile')}
                  onClick={(e) => handleNavClick(e, 'profile')}
                  className={`govt-nav-user-btn ${currentTab === 'profile' ? 'active' : ''}`}
                  title="Click to view and manage your profile"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <span className="govt-user-avatar-mini">
                    {(currentUser.full_name || 'U').charAt(0).toUpperCase()}
                  </span>
                  <div className="govt-user-text-lockup">
                    <span className="govt-nav-user-label">User:</span>
                    <strong className="govt-nav-user-name">{currentUser.full_name}</strong>
                  </div>
                  <span className="govt-nav-role-badge">
                    {currentUser.role}
                  </span>
                  <span
                    className="govt-nav-chevron"
                    aria-label="Toggle user profile menu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setUserMenuOpen((prev) => !prev);
                    }}
                  >
                    ▾
                  </span>
                </a>

                {/* Profile & User Role Dropdown Menu */}
                {userMenuOpen && (
                  <div className="govt-user-dropdown-menu" role="menu" aria-label="User Account Menu">
                    {/* User Summary Header */}
                    <div className="govt-user-dropdown-profile">
                      <div className="govt-user-dropdown-avatar">
                        {(currentUser.full_name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="govt-user-dropdown-details">
                        <strong className="govt-user-dropdown-name">{currentUser.full_name}</strong>
                        <span className="govt-user-dropdown-email">{currentUser.email || 'citizen@nagarmitra.gov.in'}</span>
                        <div className="govt-user-dropdown-meta">
                          <span className="profile-role-badge-small">{currentUser.role}</span>
                          <span className="profile-ward-small">{currentUser.ward || 'Ward 8 Ashok Nagar'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="govt-user-dropdown-divider" />

                    {/* 1. Profile */}
                    <a
                      href={getTabUrl('profile')}
                      role="menuitem"
                      className={`govt-user-dropdown-item ${currentTab === 'profile' ? 'active' : ''}`}
                      onClick={(e) => {
                        setUserMenuOpen(false);
                        handleNavClick(e, 'profile');
                      }}
                    >
                      <span className="govt-user-dropdown-icon">👤</span>
                      <div className="govt-user-dropdown-item-text">
                        <strong>Profile</strong>
                        <small>Personal civic profile & ward preferences</small>
                      </div>
                    </a>

                    {/* 2. Account Information */}
                    <a
                      href={getTabUrl('profile')}
                      role="menuitem"
                      className="govt-user-dropdown-item"
                      onClick={(e) => {
                        setUserMenuOpen(false);
                        handleNavClick(e, 'profile');
                      }}
                    >
                      <span className="govt-user-dropdown-icon">🛡️</span>
                      <div className="govt-user-dropdown-item-text">
                        <strong>Account Information</strong>
                        <small>Role credentials, contact & account security</small>
                      </div>
                    </a>

                    {/* 3. My Activity (Tailored to Role) */}
                    {currentUser.role === 'citizen' && (
                      <a
                        href={getTabUrl('citizen', 'history')}
                        role="menuitem"
                        className="govt-user-dropdown-item"
                        onClick={(e) => {
                          setUserMenuOpen(false);
                          handleNavClick(e, 'citizen', 'history');
                        }}
                      >
                        <span className="govt-user-dropdown-icon">📂</span>
                        <div className="govt-user-dropdown-item-text">
                          <strong>My Activity (Grievance Records)</strong>
                          <small>Inspect filed complaints & tracking status</small>
                        </div>
                      </a>
                    )}

                    {currentUser.role === 'manager' && (
                      <a
                        href={getTabUrl('manager', 'complaints')}
                        role="menuitem"
                        className="govt-user-dropdown-item"
                        onClick={(e) => {
                          setUserMenuOpen(false);
                          handleNavClick(e, 'manager', 'complaints');
                        }}
                      >
                        <span className="govt-user-dropdown-icon">📋</span>
                        <div className="govt-user-dropdown-item-text">
                          <strong>My Activity (Triage Queue)</strong>
                          <small>Review department grievances & SLAs</small>
                        </div>
                      </a>
                    )}

                    {currentUser.role === 'worker' && (
                      <a
                        href={getTabUrl('worker', 'assigned')}
                        role="menuitem"
                        className="govt-user-dropdown-item"
                        onClick={(e) => {
                          setUserMenuOpen(false);
                          handleNavClick(e, 'worker', 'assigned');
                        }}
                      >
                        <span className="govt-user-dropdown-icon">👷</span>
                        <div className="govt-user-dropdown-item-text">
                          <strong>My Activity (Assigned Work Orders)</strong>
                          <small>Inspect field tasks & upload resolution proof</small>
                        </div>
                      </a>
                    )}

                    {currentUser.role === 'admin' && (
                      <a
                        href={getTabUrl('system')}
                        role="menuitem"
                        className="govt-user-dropdown-item"
                        onClick={(e) => {
                          setUserMenuOpen(false);
                          handleNavClick(e, 'system');
                        }}
                      >
                        <span className="govt-user-dropdown-icon">⚙️</span>
                        <div className="govt-user-dropdown-item-text">
                          <strong>My Activity (System Administration)</strong>
                          <small>Manage users, departments & audit logs</small>
                        </div>
                      </a>
                    )}

                    <div className="govt-user-dropdown-divider" />

                    {/* 4. Sign Out */}
                    <button
                      type="button"
                      role="menuitem"
                      className="govt-user-dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onSignOut();
                      }}
                    >
                      <span className="govt-user-dropdown-icon">🚪</span>
                      <div className="govt-user-dropdown-item-text">
                        <strong style={{ color: '#dc2626' }}>Sign Out</strong>
                        <small>Safely end current portal session</small>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Standard Sign Out Button */}
              <button
                type="button"
                onClick={onSignOut}
                className="govt-nav-signout-btn"
              >
                Sign Out
              </button>
            </div>
          ) : (
            /* Unauthenticated Navigation Matching Reference Design */
            <div className="govt-nav-guest-row">
              <a
                href={getTabUrl('home')}
                onClick={(e) => handleNavClick(e, 'home')}
                className={`govt-nav-guest-link ${currentTab === 'home' ? 'active' : ''}`}
              >
                Home
              </a>
              <a
                href={getTabUrl('citizen', 'reporting')}
                onClick={(e) => handleNavClick(e, 'citizen', 'reporting')}
                className={`govt-nav-guest-link ${currentTab === 'citizen' && citizenSubTab === 'reporting' ? 'active' : ''}`}
              >
                Report Issue
              </a>
              <a
                href={getTabUrl('citizen', 'tracking')}
                onClick={(e) => handleNavClick(e, 'citizen', 'tracking')}
                className={`govt-nav-guest-link ${currentTab === 'citizen' && citizenSubTab === 'tracking' ? 'active' : ''}`}
              >
                Track Complaint
              </a>
              <a
                href={getTabUrl('how-it-works')}
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className={`govt-nav-guest-link ${currentTab === 'how-it-works' ? 'active' : ''}`}
              >
                How It Works
              </a>
              <a
                href={getTabUrl(null, null, 'signin')}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSwitchAuthView) onSwitchAuthView('signin');
                  if (onSwitchTab) onSwitchTab('home');
                }}
                className="govt-nav-guest-login"
              >
                Login
              </a>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle Button (Shown on mobile/tablet viewports) */}
        <button
          type="button"
          className={`govt-hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="govt-hamburger-bar" />
          <span className="govt-hamburger-bar" />
          <span className="govt-hamburger-bar" />
        </button>
      </div>

      {/* Responsive Mobile Navigation Collapsible Drawer */}
      {mobileMenuOpen && (
        <div className="govt-mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
          {currentUser ? (
            <div className="govt-mobile-drawer-content">
              {/* Authenticated User Identity Lockup */}
              <div className="govt-mobile-user-card">
                <div className="govt-mobile-user-avatar">
                  {(currentUser.full_name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="govt-mobile-user-details">
                  <div className="govt-mobile-user-name">{currentUser.full_name}</div>
                  <div className="govt-mobile-user-email">{currentUser.email || 'citizen@nagarmitra.gov.in'}</div>
                  <div className="govt-mobile-user-badges">
                    <span className="profile-role-badge-small">{currentUser.role}</span>
                    <span className="profile-ward-small">{currentUser.ward || 'Ward 8 Ashok Nagar'}</span>
                  </div>
                </div>
              </div>

              {/* Main Navigation Portals */}
              <div className="govt-mobile-section-label">Navigation & Portals</div>
              <div className="govt-mobile-links-list">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={getTabUrl(link.id)}
                    className={`govt-mobile-nav-link ${currentTab === link.id ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, link.id);
                    }}
                  >
                    <span className="govt-mobile-link-icon">
                      {link.id === 'home' ? '🏠' : link.id === 'citizen' ? '👤' : link.id === 'manager' ? '👔' : link.id === 'worker' ? '👷' : '⚙️'}
                    </span>
                    <span className="govt-mobile-link-text">{link.label}</span>
                    {link.id === 'manager' && pendingCount > 0 && (
                      <span className="govt-badge-counter">{pendingCount}</span>
                    )}
                  </a>
                ))}
              </div>

              {/* Manager Triage Sub-Modules */}
              {currentUser.role === 'manager' && (
                <div className="govt-mobile-submodule-group">
                  <div className="govt-mobile-section-label">Manager Triage Modules</div>
                  <a
                    href={getTabUrl('manager', 'complaints')}
                    className={`govt-mobile-sub-link ${currentTab === 'manager' && managerModule === 'complaints' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'manager', 'complaints');
                    }}
                  >
                    <span>📋</span>
                    <span>Complaint Management</span>
                  </a>
                  <a
                    href={getTabUrl('manager', 'ai')}
                    className={`govt-mobile-sub-link ${currentTab === 'manager' && managerModule === 'ai' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'manager', 'ai');
                    }}
                  >
                    <span>🤖</span>
                    <span>AI Classification</span>
                  </a>
                  <a
                    href={getTabUrl('manager', 'priority')}
                    className={`govt-mobile-sub-link ${currentTab === 'manager' && managerModule === 'priority' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'manager', 'priority');
                    }}
                  >
                    <span>⚡</span>
                    <span>Priority Management</span>
                  </a>
                  <a
                    href={getTabUrl('manager', 'departments')}
                    className={`govt-mobile-sub-link ${currentTab === 'manager' && managerModule === 'departments' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'manager', 'departments');
                    }}
                  >
                    <span>🏛️</span>
                    <span>Department Management</span>
                  </a>
                  <a
                    href={getTabUrl('manager', 'workers')}
                    className={`govt-mobile-sub-link ${currentTab === 'manager' && managerModule === 'workers' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'manager', 'workers');
                    }}
                  >
                    <span>👷</span>
                    <span>Worker Assignment</span>
                  </a>
                </div>
              )}

              {/* Field Operations Sub-Modules */}
              {currentUser.role === 'worker' && (
                <div className="govt-mobile-submodule-group">
                  <div className="govt-mobile-section-label">Field Operations Modules</div>
                  <a
                    href={getTabUrl('worker', 'assigned')}
                    className={`govt-mobile-sub-link ${currentTab === 'worker' && workerModule === 'assigned' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'worker', 'assigned');
                    }}
                  >
                    <span>📋</span>
                    <span>Assigned Complaints</span>
                  </a>
                  <a
                    href={getTabUrl('worker', 'details')}
                    className={`govt-mobile-sub-link ${currentTab === 'worker' && workerModule === 'details' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'worker', 'details');
                    }}
                  >
                    <span>🔍</span>
                    <span>Task Details</span>
                  </a>
                  <a
                    href={getTabUrl('worker', 'status')}
                    className={`govt-mobile-sub-link ${currentTab === 'worker' && workerModule === 'status' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'worker', 'status');
                    }}
                  >
                    <span>🔄</span>
                    <span>Status Updates</span>
                  </a>
                  <a
                    href={getTabUrl('worker', 'proof')}
                    className={`govt-mobile-sub-link ${currentTab === 'worker' && workerModule === 'proof' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'worker', 'proof');
                    }}
                  >
                    <span>📸</span>
                    <span>Proof of Resolution</span>
                  </a>
                </div>
              )}

              {/* Citizen Grievance Sub-Modules */}
              {currentUser.role === 'citizen' && (
                <div className="govt-mobile-submodule-group">
                  <div className="govt-mobile-section-label">Citizen Services</div>
                  <a
                    href={getTabUrl('citizen', 'reporting')}
                    className={`govt-mobile-sub-link ${currentTab === 'citizen' && citizenSubTab === 'reporting' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'citizen', 'reporting');
                    }}
                  >
                    <span>✍️</span>
                    <span>Report Issue</span>
                  </a>
                  <a
                    href={getTabUrl('citizen', 'tracking')}
                    className={`govt-mobile-sub-link ${currentTab === 'citizen' && citizenSubTab === 'tracking' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'citizen', 'tracking');
                    }}
                  >
                    <span>🔍</span>
                    <span>Track Complaint</span>
                  </a>
                  <a
                    href={getTabUrl('citizen', 'history')}
                    className={`govt-mobile-sub-link ${currentTab === 'citizen' && citizenSubTab === 'history' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'citizen', 'history');
                    }}
                  >
                    <span>📂</span>
                    <span>Complaint History</span>
                  </a>
                  <a
                    href={getTabUrl('citizen', 'feedback')}
                    className={`govt-mobile-sub-link ${currentTab === 'citizen' && citizenSubTab === 'feedback' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'citizen', 'feedback');
                    }}
                  >
                    <span>⭐</span>
                    <span>Rate Resolution</span>
                  </a>
                  <a
                    href={getTabUrl('citizen', 'notifications')}
                    className={`govt-mobile-sub-link ${currentTab === 'citizen' && citizenSubTab === 'notifications' ? 'active' : ''}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, 'citizen', 'notifications');
                    }}
                  >
                    <span>🔔</span>
                    <span>Notifications</span>
                  </a>
                </div>
              )}

              {/* Profile & Statutory Links */}
              <div className="govt-mobile-section-label">Account & Information</div>
              <div className="govt-mobile-links-list">
                <a
                  href={getTabUrl('profile')}
                  className={`govt-mobile-nav-link ${currentTab === 'profile' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'profile');
                  }}
                >
                  <span className="govt-mobile-link-icon">👤</span>
                  <span className="govt-mobile-link-text">Profile & Ward Settings</span>
                </a>
                <a
                  href={getTabUrl('about')}
                  className={`govt-mobile-nav-link ${currentTab === 'about' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'about');
                  }}
                >
                  <span className="govt-mobile-link-icon">📜</span>
                  <span className="govt-mobile-link-text">Citizen Charter & SLA</span>
                </a>
                <a
                  href={getTabUrl('how-it-works')}
                  className={`govt-mobile-nav-link ${currentTab === 'how-it-works' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'how-it-works');
                  }}
                >
                  <span className="govt-mobile-link-icon">ℹ️</span>
                  <span className="govt-mobile-link-text">How It Works</span>
                </a>
              </div>

              {/* Sign Out Button (Strictly Single Line) */}
              <div className="govt-mobile-signout-wrap">
                <button
                  type="button"
                  className="govt-mobile-signout-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Unauthenticated Guest Mobile Drawer */
            <div className="govt-mobile-drawer-content">
              <div className="govt-mobile-section-label">Municipal Navigation</div>
              <div className="govt-mobile-links-list">
                <a
                  href={getTabUrl('home')}
                  className={`govt-mobile-nav-link ${currentTab === 'home' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'home');
                  }}
                >
                  <span className="govt-mobile-link-icon">🏠</span>
                  <span className="govt-mobile-link-text">Home</span>
                </a>
                <a
                  href={getTabUrl('citizen', 'reporting')}
                  className={`govt-mobile-nav-link ${currentTab === 'citizen' && citizenSubTab === 'reporting' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'citizen', 'reporting');
                  }}
                >
                  <span className="govt-mobile-link-icon">✍️</span>
                  <span className="govt-mobile-link-text">Report Issue</span>
                </a>
                <a
                  href={getTabUrl('citizen', 'tracking')}
                  className={`govt-mobile-nav-link ${currentTab === 'citizen' && citizenSubTab === 'tracking' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'citizen', 'tracking');
                  }}
                >
                  <span className="govt-mobile-link-icon">🔍</span>
                  <span className="govt-mobile-link-text">Track Complaint</span>
                </a>
                <a
                  href={getTabUrl('how-it-works')}
                  className={`govt-mobile-nav-link ${currentTab === 'how-it-works' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'how-it-works');
                  }}
                >
                  <span className="govt-mobile-link-icon">ℹ️</span>
                  <span className="govt-mobile-link-text">How It Works</span>
                </a>
                <a
                  href={getTabUrl('about')}
                  className={`govt-mobile-nav-link ${currentTab === 'about' ? 'active' : ''}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, 'about');
                  }}
                >
                  <span className="govt-mobile-link-icon">📜</span>
                  <span className="govt-mobile-link-text">Citizen Charter</span>
                </a>
              </div>

              <div className="govt-mobile-signout-wrap">
                <button
                  type="button"
                  className="govt-nav-guest-login"
                  style={{ width: '100%', height: '46px', whiteSpace: 'nowrap' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onSwitchAuthView) onSwitchAuthView('signin');
                    if (onSwitchTab) onSwitchTab('home');
                  }}
                >
                  Login / Citizen Access
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
