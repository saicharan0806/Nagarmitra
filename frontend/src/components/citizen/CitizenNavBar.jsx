import React from 'react';
import { getTabUrl } from '../../utils/navigation.js';

/**
 * CitizenNavBar Component
 * ------------------------
 * Institutional Eco-Civic Header & 5-Module Navigation Bar with live badge counters.
 */
export default function CitizenNavBar({
  activeTab,
  onTabSwitch,
  complaintsCount = 0,
  feedbacksCount = 0,
  unreadCount = 0,
  selectedComplaint = null,
}) {
  return (
    <>
      {/* Top Portal Banner with Eco-Civic Identity */}
      <div className="portal-banner-header">
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#16A34A',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            <span>🌱</span>
            <span>Municipal Citizen Services & Grievance Redressal</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0B1220', margin: '0.25rem 0 0.2rem 0' }}>
            Report & Track Portal
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
            Unified citizen interface for registering civic issues, tracking real-time ground resolution, inspecting ticket history, sharing feedback, and receiving alerts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(22, 163, 74, 0.1)',
              color: '#16A34A',
              border: '1px solid rgba(22, 163, 74, 0.25)',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            <span>🤖</span>
            <span>AI Triage Active</span>
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(22, 163, 74, 0.08)',
              color: '#16A34A',
              border: '1px solid rgba(22, 163, 74, 0.2)',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            <span>📍</span>
            <span>GPS Geotagging Ready</span>
          </span>
        </div>
      </div>

      {/* 5 Core Civic Navigation Tabs (Issue Reporting, Tracking, History, Feedback, Notifications) */}
      <div className="citizen-tabs-bar">
        <a
          href={getTabUrl('citizen', 'reporting')}
          className={`citizen-tab-btn ${activeTab === 'reporting' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && onTabSwitch) {
              e.preventDefault();
              onTabSwitch('reporting');
            }
          }}
        >
          <span>✍️</span>
          <span>Civic Issue Reporting</span>
        </a>

        <a
          href={getTabUrl('citizen', 'tracking')}
          className={`citizen-tab-btn ${activeTab === 'tracking' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && onTabSwitch) {
              e.preventDefault();
              onTabSwitch('tracking');
            }
          }}
        >
          <span>🔍</span>
          <span>Complaint Tracking</span>
          {selectedComplaint && (
            <span className="citizen-tab-badge" style={{ fontFamily: 'monospace' }}>
              {selectedComplaint.tracking_id}
            </span>
          )}
        </a>

        <a
          href={getTabUrl('citizen', 'history')}
          className={`citizen-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && onTabSwitch) {
              e.preventDefault();
              onTabSwitch('history');
            }
          }}
        >
          <span>📂</span>
          <span>Complaint History</span>
          <span className="citizen-tab-badge">
            {complaintsCount}
          </span>
        </a>

        <a
          href={getTabUrl('citizen', 'feedback')}
          className={`citizen-tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && onTabSwitch) {
              e.preventDefault();
              onTabSwitch('feedback');
            }
          }}
        >
          <span>⭐</span>
          <span>Feedback & Ratings</span>
          <span className="citizen-tab-badge">
            {feedbacksCount}
          </span>
        </a>

        <a
          href={getTabUrl('citizen', 'notifications')}
          className={`citizen-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && onTabSwitch) {
              e.preventDefault();
              onTabSwitch('notifications');
            }
          }}
        >
          <span>🔔</span>
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="citizen-tab-badge-alert">
              {unreadCount}
            </span>
          )}
        </a>
      </div>
    </>
  );
}
