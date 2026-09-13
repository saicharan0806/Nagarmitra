import React, { useState } from 'react';
import { getTabUrl } from '../../utils/navigation.js';

/**
 * SystemManagement Component (Municipal Administrator)
 * Provides 4 Core System Governance Modules:
 * 1. User Management
 * 2. Department Management
 * 3. Field Worker Management
 * 4. Complaint Management
 */
export default function SystemManagement({
  complaints = [],
  onUpdateComplaint,
  onNotification,
  onResetComplaints,
}) {
  const [activeSection, setActiveSection] = useState('users');

  // Mock System Users Roster
  const [usersList, setUsersList] = useState([
    { id: 101, name: 'Aarav Sharma', email: 'aarav@citizen.nagarmitra.gov.in', role: 'citizen', ward: 'Ward 8 Downtown', status: 'active', joined: '2026-01-12' },
    { id: 102, name: 'Eng. Rajesh Patel', email: 'rajesh.patel@roads.nagarmitra.gov.in', role: 'manager', ward: 'Ward 8 Downtown', status: 'active', joined: '2025-11-04' },
    { id: 103, name: 'Marcus Vance', email: 'marcus.vance@worker.nagarmitra.gov.in', role: 'worker', ward: 'Ward 8 Downtown', status: 'active', joined: '2025-08-19' },
    { id: 104, name: 'Elena Gomez', email: 'elena.gomez@worker.nagarmitra.gov.in', role: 'worker', ward: 'Ward 3 Market Zone', status: 'active', joined: '2025-09-22' },
    { id: 105, name: 'Dr. Sunita Rao', email: 'sunita.rao@sanitation.nagarmitra.gov.in', role: 'manager', ward: 'Ward 3 Market Zone', status: 'active', joined: '2025-10-15' },
    { id: 106, name: 'Municipal Administrator', email: 'admin@nagarmitra.gov.in', role: 'admin', ward: 'Citywide Oversight', status: 'active', joined: '2025-01-01' },
  ]);

  // Departments Roster
  const [deptsList, setDeptsList] = useState([
    { id: 'roads', name: 'Roads & Public Infrastructure', lead: 'Eng. Rajesh Patel', staff: 24, budget: '₹4.8 Cr', fleet: '8 Asphalt Units, 4 Rollers', slaMet: '97.2%' },
    { id: 'sanitation', name: 'Sanitation & Solid Waste Welfare', lead: 'Dr. Sunita Rao', staff: 42, budget: '₹6.2 Cr', fleet: '18 Compactor Trucks', slaMet: '95.8%' },
    { id: 'electrical', name: 'Electrical & Public Lighting', lead: 'Vikram Seth', staff: 16, budget: '₹2.9 Cr', fleet: '6 Cherry Picker Bucket Trucks', slaMet: '94.6%' },
    { id: 'water', name: 'Water Supply & Storm Drainage', lead: 'Priya Nair', staff: 28, budget: '₹5.5 Cr', fleet: '8 Jetting Tanker Machines', slaMet: '96.1%' },
    { id: 'parks', name: 'Parks & Urban Environment', lead: 'Amit Verma', staff: 14, budget: '₹1.8 Cr', fleet: '4 Tree Trimming Units', slaMet: '98.0%' },
  ]);

  // Field Workers Directory
  const [workersList, setWorkersList] = useState([
    { id: 1, name: 'Marcus Vance', badge: 'ROADS-W01', dept: 'Roads & Infrastructure', ward: 'Ward 8 Downtown', phone: '+91 98201-11001', status: 'available', tasksActive: 1, rating: 4.9 },
    { id: 2, name: 'Elena Gomez', badge: 'SAN-W02', dept: 'Sanitation & Waste Management', ward: 'Ward 3 Market Zone', phone: '+91 98201-11002', status: 'busy', tasksActive: 2, rating: 4.8 },
    { id: 3, name: 'Tariq Al-Mansoor', badge: 'ELEC-W03', dept: 'Electrical & Lighting', ward: 'Ward 12 Metro Core', phone: '+91 98201-11003', status: 'busy', tasksActive: 1, rating: 4.7 },
    { id: 4, name: 'Chloe Dubois', badge: 'WATER-W04', dept: 'Water Supply & Drainage', ward: 'Ward 4 Riverfront', phone: '+91 98201-11004', status: 'available', tasksActive: 0, rating: 4.9 },
    { id: 5, name: 'Devendra Joshi', badge: 'ROADS-W05', dept: 'Roads & Infrastructure', ward: 'Ward 7 South Corridor', phone: '+91 98201-11005', status: 'available', tasksActive: 0, rating: 4.6 },
    { id: 6, name: 'Meera Sen', badge: 'SAN-W06', dept: 'Sanitation & Waste Management', ward: 'Ward 2 Westside', phone: '+91 98201-11006', status: 'available', tasksActive: 1, rating: 4.8 },
  ]);

  const [userSearch, setUserSearch] = useState('');

  const toggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
    );
    if (onNotification) onNotification('User account status updated in municipal directory.');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="admin-header-banner">
        <div>
          <div className="field-details-sub-tag">
            <span>🛡️ MUNICIPAL EXECUTIVE CONSOLE</span>
            <span className="bullet-sep">•</span>
            <span>SYSTEM GOVERNANCE</span>
          </div>
          <h1 className="admin-header-title">System Management</h1>
          <p className="admin-header-sub">
            Centralized administrative oversight of portal accounts, municipal directorates, field workforce deployment, and global complaint lifecycle policies.
          </p>
        </div>

        <div className="admin-header-badge">
          <span>Official Municipal Admin Clearance</span>
        </div>
      </div>

      {/* 4 Section Navigation Tabs */}
      <div className="admin-nav-tabs">
        <a
          href={getTabUrl('system', 'users')}
          target="_blank"
          rel="noopener noreferrer"
          className={`admin-nav-btn ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => setActiveSection('users')}
        >
          <span>👥</span>
          <span>User Management</span>
          <span className="admin-tab-badge">{usersList.length}</span>
        </a>

        <a
          href={getTabUrl('system', 'departments')}
          target="_blank"
          rel="noopener noreferrer"
          className={`admin-nav-btn ${activeSection === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveSection('departments')}
        >
          <span>🏛️</span>
          <span>Department Management</span>
          <span className="admin-tab-badge">{deptsList.length}</span>
        </a>

        <a
          href={getTabUrl('system', 'workers')}
          target="_blank"
          rel="noopener noreferrer"
          className={`admin-nav-btn ${activeSection === 'workers' ? 'active' : ''}`}
          onClick={() => setActiveSection('workers')}
        >
          <span>👷</span>
          <span>Field Worker Management</span>
          <span className="admin-tab-badge">{workersList.length}</span>
        </a>

        <a
          href={getTabUrl('system', 'complaints')}
          target="_blank"
          rel="noopener noreferrer"
          className={`admin-nav-btn ${activeSection === 'complaints' ? 'active' : ''}`}
          onClick={() => setActiveSection('complaints')}
        >
          <span>📋</span>
          <span>Complaint Management</span>
          <span className="admin-tab-badge">{complaints.length}</span>
        </a>
      </div>

      {/* SECTION 1: USER MANAGEMENT */}
      {activeSection === 'users' && (
        <div className="field-card">
          <div className="field-card-header">
            <div>
              <h2 className="field-card-title">👥 Municipal User Directory & Role Governance</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Manage citizen accounts, department manager authorizations, and field operative logins.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Search user by name or email..."
                className="field-search-input"
                style={{ width: '260px', padding: '0.4rem 0.75rem' }}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Assigned Role</th>
                  <th>Jurisdiction / Ward</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList
                  .filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                  .map((u) => (
                    <tr key={u.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>#{u.id}</td>
                      <td><strong>{u.name}</strong></td>
                      <td style={{ color: '#64748B' }}>{u.email}</td>
                      <td>
                        <span className={`profile-role-badge-small ${u.role === 'admin' ? 'badge-admin' : ''}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td>{u.ward}</td>
                      <td>
                        <span className={`field-status-badge ${u.status === 'active' ? 'status-resolved' : 'status-delayed'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="field-action-btn btn-secondary"
                          onClick={() => toggleUserStatus(u.id)}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: DEPARTMENT MANAGEMENT */}
      {activeSection === 'departments' && (
        <div className="field-card">
          <div className="field-card-header">
            <div>
              <h2 className="field-card-title">🏛️ Municipal Directorate Portfolio</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Configure department leadership, budget appropriations, and fleet logistics.
              </p>
            </div>
            <span className="field-card-tag">5 Active Directorates</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Directorate Lead</th>
                  <th>Dedicated Personnel</th>
                  <th>Annual Budget</th>
                  <th>Heavy Machinery Fleet</th>
                  <th>SLA Compliance</th>
                </tr>
              </thead>
              <tbody>
                {deptsList.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.name}</strong></td>
                    <td>{d.lead}</td>
                    <td>{d.staff} Staff Operatives</td>
                    <td>{d.budget}</td>
                    <td style={{ color: '#64748B', fontSize: '0.82rem' }}>{d.fleet}</td>
                    <td>
                      <strong style={{ color: '#16A34A' }}>{d.slaMet}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: FIELD WORKER MANAGEMENT */}
      {activeSection === 'workers' && (
        <div className="field-card">
          <div className="field-card-header">
            <div>
              <h2 className="field-card-title">👷 Field Operative Workforce Directory</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Field technician rosters, active work order distribution, and performance ratings.
              </p>
            </div>
            <span className="field-card-tag">{workersList.filter((w) => w.status === 'available').length} Available on Shift</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Badge ID</th>
                  <th>Operative Name</th>
                  <th>Department</th>
                  <th>Assigned Ward</th>
                  <th>Contact Radio</th>
                  <th>Shift Status</th>
                  <th>Active Tasks</th>
                  <th>Quality Rating</th>
                </tr>
              </thead>
              <tbody>
                {workersList.map((w) => (
                  <tr key={w.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{w.badge}</td>
                    <td><strong>{w.name}</strong></td>
                    <td>{w.dept}</td>
                    <td>{w.ward}</td>
                    <td>{w.phone}</td>
                    <td>
                      <span className={`field-status-badge status-${w.status === 'available' ? 'resolved' : 'in_progress'}`}>
                        {w.status}
                      </span>
                    </td>
                    <td><strong>{w.tasksActive}</strong></td>
                    <td><span style={{ color: '#F4B740', fontWeight: 700 }}>{w.rating} ★</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: COMPLAINT MANAGEMENT */}
      {activeSection === 'complaints' && (
        <div className="field-card">
          <div className="field-card-header">
            <div>
              <h2 className="field-card-title">📋 Global Complaint Lifecycle Oversight</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                System-wide audit of citizen reports, severity escalations, and resolution proof status.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="field-card-tag">{complaints.length} Total Registered</span>
              {onResetComplaints && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all demo complaints back to initial defaults across all open tabs?')) {
                      onResetComplaints();
                    }
                  }}
                  className="btn btn-outline"
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.35rem 0.75rem',
                    color: '#DC2626',
                    borderColor: '#fca5a5',
                    background: '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  title="Reset all complaints across all tabs to initial demo data"
                >
                  ↺ Reset Demo Data
                </button>
              )}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Citizen Title</th>
                  <th>Category</th>
                  <th>Assigned Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date Logged</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{c.tracking_id}</td>
                    <td><strong>{c.title}</strong></td>
                    <td style={{ textTransform: 'capitalize' }}>{c.category.replace('_', ' ')}</td>
                    <td>{c.department_name}</td>
                    <td>
                      <span className={`field-status-badge status-${c.severity === 'critical' ? 'delayed' : 'in_progress'}`}>
                        {c.severity?.toUpperCase() || 'MEDIUM'}
                      </span>
                    </td>
                    <td>
                      <span className={`field-status-badge status-${c.status}`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ color: '#64748b', fontSize: '0.82rem' }}>
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
