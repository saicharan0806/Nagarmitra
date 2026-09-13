import React, { useState } from 'react';
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
}) {
  const [managerMenuOpen, setManagerMenuOpen] = useState(false);
  const [workerMenuOpen, setWorkerMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = currentUser?.role && NAV_LINKS_BY_ROLE[currentUser.role]
    ? NAV_LINKS_BY_ROLE[currentUser.role]
    : [
        { id: 'home', label: 'Home' },
      ];

  return (
    <header className="govt-navbar">
      {/* Main Clean Navigation Bar: Nagarmitra at Top-Left, Nav Bars at Top-Right */}
      <div className="govt-navbar-inner">
        {/* Brand & Municipal Seal strictly at Top Left */}
        <div className="govt-brand-wrap">
          {/* Official Civic Seal Icon with Building & Leaf */}
          <a
            href={getTabUrl('home')}
            target="_blank"
            rel="noopener noreferrer"
            className="govt-brand-seal"
            title="Nagarmitra Official Portal Home"
          >
            🌱
          </a>
          <div className="govt-brand-text">
            <div className="govt-brand-header-row">
              <a
                href={getTabUrl('home')}
                target="_blank"
                rel="noopener noreferrer"
                className="govt-brand-title"
                title="Nagarmitra Home"
              >
                Nagarmitra
              </a>
              <a
                href={getTabUrl('about')}
                target="_blank"
                rel="noopener noreferrer"
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
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`govt-nav-tab ${currentTab === 'manager' ? 'active' : ''}`}
                          title="Municipal Departmental Manager Triage"
                        >
                          <span>Manager Triage</span>
                          {pendingCount > 0 && (
                            <span className="govt-badge-counter">
                              {pendingCount}
                            </span>
                          )}
                          <span
                            className="govt-nav-chevron"
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
                          <div className="govt-nav-dropdown-menu">
                            <div className="govt-nav-dropdown-header">
                              Manager Triage Modules
                            </div>
                            <a
                              href={getTabUrl('manager', 'complaints')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'complaints' ? 'active' : ''}`}
                              onClick={() => setManagerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">📋</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Complaint Management</span>
                                <span className="govt-nav-dropdown-desc">Lifecycle tracking, filters & audit</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'ai')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'ai' ? 'active' : ''}`}
                              onClick={() => setManagerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">🤖</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">AI Classification</span>
                                <span className="govt-nav-dropdown-desc">Vision ViT confidence & manual override</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'priority')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'priority' ? 'active' : ''}`}
                              onClick={() => setManagerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">⚡</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Priority Management</span>
                                <span className="govt-nav-dropdown-desc">SLA matrices & urgent escalation</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'departments')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'departments' ? 'active' : ''}`}
                              onClick={() => setManagerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">🏛️</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Department Management</span>
                                <span className="govt-nav-dropdown-desc">Directorate loads & ticket routing</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('manager', 'workers')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'manager' && managerModule === 'workers' ? 'active' : ''}`}
                              onClick={() => setManagerMenuOpen(false)}
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
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`govt-nav-tab ${currentTab === 'worker' ? 'active' : ''}`}
                          title="Municipal Field Operatives Console"
                        >
                          <span>Field Operations</span>
                          <span
                            className="govt-nav-chevron"
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
                          <div className="govt-nav-dropdown-menu">
                            <div className="govt-nav-dropdown-header">
                              Field Operations Modules
                            </div>
                            <a
                              href={getTabUrl('worker', 'assigned')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'assigned' ? 'active' : ''}`}
                              onClick={() => setWorkerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">📋</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Assigned Complaints</span>
                                <span className="govt-nav-dropdown-desc">Task queue, priority tags & filters</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('worker', 'details')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'details' ? 'active' : ''}`}
                              onClick={() => setWorkerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">🔍</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Task Details</span>
                                <span className="govt-nav-dropdown-desc">Site telemetry, PPE & citizen photo</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('worker', 'status')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'status' ? 'active' : ''}`}
                              onClick={() => setWorkerMenuOpen(false)}
                            >
                              <span className="govt-nav-dropdown-icon">🔄</span>
                              <div className="govt-nav-dropdown-text">
                                <span className="govt-nav-dropdown-title">Status Updates</span>
                                <span className="govt-nav-dropdown-desc">En route, on-site & progress stages</span>
                              </div>
                            </a>

                            <a
                              href={getTabUrl('worker', 'proof')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`govt-nav-dropdown-item ${currentTab === 'worker' && workerModule === 'proof' ? 'active' : ''}`}
                              onClick={() => setWorkerMenuOpen(false)}
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
                      target="_blank"
                      rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`govt-nav-user-btn ${currentTab === 'profile' ? 'active' : ''}`}
                  title="Click to view and manage your profile in a new tab"
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
                          <span className="profile-ward-small">{currentUser.ward || 'Ward 8 Downtown'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="govt-user-dropdown-divider" />

                    {/* 1. Profile */}
                    <a
                      href={getTabUrl('profile')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`govt-user-dropdown-item ${currentTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setUserMenuOpen(false)}
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="govt-user-dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="govt-user-dropdown-item"
                        onClick={() => setUserMenuOpen(false)}
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="govt-user-dropdown-item"
                        onClick={() => setUserMenuOpen(false)}
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="govt-user-dropdown-item"
                        onClick={() => setUserMenuOpen(false)}
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="govt-user-dropdown-item"
                        onClick={() => setUserMenuOpen(false)}
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
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-nav-guest-link ${currentTab === 'home' ? 'active' : ''}`}
              >
                Home
              </a>
              <a
                href={getTabUrl('citizen', 'reporting')}
                target="_blank"
                rel="noopener noreferrer"
                className="govt-nav-guest-link"
              >
                Report Issue
              </a>
              <a
                href={getTabUrl('citizen', 'tracking')}
                target="_blank"
                rel="noopener noreferrer"
                className="govt-nav-guest-link"
              >
                Track Complaint
              </a>
              <a
                href={getTabUrl('how-it-works')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-nav-guest-link ${currentTab === 'how-it-works' ? 'active' : ''}`}
              >
                How It Works
              </a>
              <a
                href={getTabUrl(null, null, 'signin')}
                target="_blank"
                rel="noopener noreferrer"
                className="govt-nav-guest-login"
              >
                Login
              </a>
            </div>
          )}
        </nav>
      </div>

      {/* Dedicated Manager Triage Sub-Navigation Bar Strip: Visible when Manager Triage is active AND user is Department Manager */}
      {currentUser && currentTab === 'manager' && currentUser.role === 'manager' && (
        <div className="govt-manager-subnav">
          <div className="govt-manager-subnav-inner">
            <div className="govt-manager-subnav-label">
              <span className="govt-manager-subnav-badge">MANAGER TRIAGE</span>
              <span className="govt-manager-subnav-title">Navigation Bar:</span>
            </div>
            <div className="govt-manager-subnav-links">
              <a
                href={getTabUrl('manager', 'complaints')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${managerModule === 'complaints' ? 'active' : ''}`}
              >
                <span>📋</span>
                <span>Complaint Management</span>
              </a>

              <a
                href={getTabUrl('manager', 'ai')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${managerModule === 'ai' ? 'active' : ''}`}
              >
                <span>🤖</span>
                <span>AI Classification</span>
              </a>

              <a
                href={getTabUrl('manager', 'priority')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${managerModule === 'priority' ? 'active' : ''}`}
              >
                <span>⚡</span>
                <span>Priority Management</span>
              </a>

              <a
                href={getTabUrl('manager', 'departments')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${managerModule === 'departments' ? 'active' : ''}`}
              >
                <span>🏛️</span>
                <span>Department Management</span>
              </a>

              <a
                href={getTabUrl('manager', 'workers')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${managerModule === 'workers' ? 'active' : ''}`}
              >
                <span>👷</span>
                <span>Worker Assignment</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Field Operations Sub-Navigation Bar Strip: Visible when Field Operations is active AND user is Field Operative */}
      {currentUser && currentTab === 'worker' && currentUser.role === 'worker' && (
        <div className="govt-manager-subnav" style={{ borderBottomColor: 'var(--color-primary)' }}>
          <div className="govt-manager-subnav-inner">
            <div className="govt-manager-subnav-label">
              <span className="govt-manager-subnav-badge" style={{ background: 'var(--color-primary)' }}>
                FIELD OPERATIONS
              </span>
              <span className="govt-manager-subnav-title">Navigation Bar:</span>
            </div>
            <div className="govt-manager-subnav-links">
              <a
                href={getTabUrl('worker', 'assigned')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${workerModule === 'assigned' ? 'active' : ''}`}
              >
                <span>📋</span>
                <span>Assigned Complaints</span>
              </a>

              <a
                href={getTabUrl('worker', 'details')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${workerModule === 'details' ? 'active' : ''}`}
              >
                <span>🔍</span>
                <span>Task Details</span>
              </a>

              <a
                href={getTabUrl('worker', 'status')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${workerModule === 'status' ? 'active' : ''}`}
              >
                <span>🔄</span>
                <span>Status Updates</span>
              </a>

              <a
                href={getTabUrl('worker', 'proof')}
                target="_blank"
                rel="noopener noreferrer"
                className={`govt-subnav-btn ${workerModule === 'proof' ? 'active' : ''}`}
              >
                <span>📸</span>
                <span>Proof of Resolution</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
