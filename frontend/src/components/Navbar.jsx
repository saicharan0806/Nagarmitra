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
}) {
  const [managerMenuOpen, setManagerMenuOpen] = useState(false);
  const [workerMenuOpen, setWorkerMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('.govt-nav-dropdown-wrap') && !e.target.closest('.govt-nav-user-wrap')) {
        setManagerMenuOpen(false);
        setWorkerMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setManagerMenuOpen(false);
        setWorkerMenuOpen(false);
        setUserMenuOpen(false);
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
                  <div className="govt-user-dropdown-menu">
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
      </div>
    </header>
  );
}
