import React, { useState } from 'react';

/**
 * UserProfile Component
 * Official Civic Profile & Municipal Account Settings Page
 * Strictly adheres to Eco-Civic Green institutional design system.
 */
export default function UserProfile({
  currentUser,
  onUpdateUser,
  onNotification,
  onSwitchTab,
}) {
  const [fullName, setFullName] = useState(currentUser?.full_name || 'Shiva');
  const [email] = useState(currentUser?.email || 'shiva@citizen.nagarmitra.gov.in');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765-43210');
  const [ward, setWard] = useState(currentUser?.ward || 'Ward 8 - Downtown Central');
  const [address, setAddress] = useState(currentUser?.address || '452 Main Street, Ward 8');
  const [preferredLanguage, setPreferredLanguage] = useState(currentUser?.preferred_language || currentUser?.language || 'English');
  const [notificationPref, setNotificationPref] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      full_name: fullName.trim(),
      phone: phone.trim(),
      ward,
      address: address.trim(),
      preferred_language: preferredLanguage,
      notificationPref,
      smsAlerts,
    };

    if (onUpdateUser) onUpdateUser(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    if (onNotification) {
      onNotification('Profile details successfully updated and saved to municipal registry.');
    }
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const citizenId = currentUser?.id ? `NAGAR-2026-${String(currentUser.id).padStart(4, '0')}` : 'NAGAR-2026-0842';
  const roleName = (currentUser?.role || 'citizen').toUpperCase();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* Top Banner Navigation & Title */}
      <div className="profile-top-banner">
        <div className="profile-banner-left">
          <div className="profile-avatar-circle">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <div className="profile-header-text">
            <div className="profile-id-row">
              <span className="profile-id-badge">{citizenId}</span>
              <span className="profile-role-badge">{roleName}</span>
              <span className="profile-role-badge" style={{ background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}>
                🌐 {preferredLanguage}
              </span>
              <span className="profile-verified-badge">✓ Verified Identity</span>
            </div>
            <h1 className="profile-name">{fullName}</h1>
            <p className="profile-email-text">{email} • Registered Citizen Portal Member</p>
          </div>
        </div>

        <div className="profile-banner-actions">
          <button
            type="button"
            className="govt-btn-secondary"
            onClick={() => onSwitchTab('home')}
          >
            ← Back to Home
          </button>
          {!isEditing ? (
            <button
              type="button"
              className="govt-btn-primary"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <button
              type="button"
              className="govt-btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="profile-alert-success">
          <span>🌱</span>
          <span>Your municipal profile information has been successfully updated and verified.</span>
        </div>
      )}

      {/* Profile Main Grid */}
      <div className="profile-grid">
        {/* Left Column: Personal Information Form */}
        <div className="field-card">
          <div className="field-card-header">
            <h3 className="field-card-title">👤 Citizen Information & Ward Registry</h3>
            <span className="field-card-tag">{isEditing ? 'Editing Mode' : 'Official Record'}</span>
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="govt-form-group">
              <label className="govt-label" htmlFor="profile-fullname">
                <span>Full Name</span>
              </label>
              <input
                id="profile-fullname"
                type="text"
                className="govt-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="govt-form-group">
              <label className="govt-label" htmlFor="profile-email">
                <span>Official Email (Primary Account Identifier)</span>
              </label>
              <input
                id="profile-email"
                type="email"
                className="govt-input"
                value={email}
                disabled
              />
              <small style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem', display: 'block' }}>
                Email identifier is linked to your civic records and cannot be altered without municipal re-verification.
              </small>
            </div>

            <div className="govt-form-group">
              <label className="govt-label" htmlFor="profile-phone">
                <span>Mobile Contact Number (SMS Grievance Alerts)</span>
              </label>
              <input
                id="profile-phone"
                type="tel"
                className="govt-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="govt-form-group">
              <label className="govt-label" htmlFor="profile-ward">
                <span>Primary Residential Ward & Zone</span>
              </label>
              <select
                id="profile-ward"
                className="govt-select"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                disabled={!isEditing}
              >
                <option value="Ward 1 - North Ridge">Ward 1 - North Ridge</option>
                <option value="Ward 2 - Westside">Ward 2 - Westside</option>
                <option value="Ward 3 - Market Zone">Ward 3 - Market Zone</option>
                <option value="Ward 4 - Riverfront">Ward 4 - Riverfront</option>
                <option value="Ward 7 - South Corridor">Ward 7 - South Corridor</option>
                <option value="Ward 8 - Downtown Central">Ward 8 - Downtown Central</option>
                <option value="Ward 12 - Metro Core">Ward 12 - Metro Core</option>
              </select>
            </div>

            <div className="govt-form-group">
              <label className="govt-label" htmlFor="profile-address">
                <span>Residential / Business Street Address</span>
              </label>
              <input
                id="profile-address"
                type="text"
                className="govt-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="govt-form-group">
              <label className="govt-label" htmlFor="profile-language">
                <span>🌐 Preferred Municipal Portal Language</span>
              </label>
              <select
                id="profile-language"
                className="govt-select"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                disabled={!isEditing}
              >
                <option value="English">English (English)</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
              </select>
              <small style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem', display: 'block' }}>
                Preferred language chosen during registration for grievance receipts, notifications, and portal services.
              </small>
            </div>

            {isEditing && (
              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="govt-btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="govt-btn-primary">
                  💾 Save Profile Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Civic Activity & Notification Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Civic Engagement Summary Card */}
          <div className="field-card">
            <div className="field-card-header">
              <h3 className="field-card-title">🌱 Civic Activity Summary</h3>
              <span className="field-card-tag">Nagarmitra Stats</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
              <div className="field-stat-badge">
                <span className="stat-num" style={{ color: '#16A34A' }}>3</span>
                <span className="stat-lbl">Filed Reports</span>
              </div>
              <div className="field-stat-badge">
                <span className="stat-num" style={{ color: '#F4B740' }}>2</span>
                <span className="stat-lbl">In Progress</span>
              </div>
              <div className="field-stat-badge">
                <span className="stat-num" style={{ color: '#16a34a' }}>1</span>
                <span className="stat-lbl">Resolved Proof</span>
              </div>
              <div className="field-stat-badge">
                <span className="stat-num" style={{ color: '#16A34A' }}>100%</span>
                <span className="stat-lbl">Verified Ingest</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                className="govt-btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onSwitchTab('citizen', 'history')}
              >
                📂 View My Complaint History
              </button>
              <button
                type="button"
                className="govt-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onSwitchTab('citizen', 'reporting')}
              >
                ✍️ File a New Civic Issue
              </button>
            </div>
          </div>

          {/* Preferences & Municipal Alerts Card */}
          <div className="field-card">
            <div className="field-card-header">
              <h3 className="field-card-title">🔔 Alert Preferences</h3>
              <span className="field-card-tag">Notifications</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationPref}
                  onChange={(e) => setNotificationPref(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#16A34A' }}
                />
                <div>
                  <strong style={{ fontSize: '0.86rem', color: '#111827', display: 'block' }}>Email Grievance Milestones</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Receive notifications when technicians are dispatched</span>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#16A34A' }}
                />
                <div>
                  <strong style={{ fontSize: '0.86rem', color: '#111827', display: 'block' }}>SMS Emergency Broadcasts</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Receive high-priority public health and road alerts</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
