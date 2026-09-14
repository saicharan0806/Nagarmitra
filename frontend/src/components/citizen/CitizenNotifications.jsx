import React, { useState } from 'react';

/**
 * CitizenNotifications Component
 * ------------------------------
 * Alerts & notification cards inbox with unread filters,
 * batch read acknowledgment, and deep links to complaint tracking.
 */
export default function CitizenNotifications({
  notifications = [],
  onNotificationClick,
  onMarkAllRead,
}) {
  const [notifFilter, setNotifFilter] = useState('all');
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Notifications Toolbar */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🔔</span>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Citizen Alerts & Notifications
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              You have {unreadCount} unread municipal updates.
            </div>
          </div>
        </div>

        <div className="civic-filter-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            className={`civic-filter-pill ${notifFilter === 'all' ? 'active' : ''}`}
            onClick={() => setNotifFilter('all')}
          >
            <span className="civic-filter-label">All</span>
            <span className="civic-filter-count">{notifications.length}</span>
          </button>
          <button
            type="button"
            className={`civic-filter-pill pill-unread ${notifFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setNotifFilter('unread')}
          >
            <span className="civic-filter-dot dot-unread" />
            <span className="civic-filter-label">Unread</span>
            <span className="civic-filter-count">{unreadCount}</span>
          </button>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#16A34A',
                padding: '0.35rem 0.85rem',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ✓ Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {notifications
          .filter((n) => (notifFilter === 'unread' ? !n.read : true))
          .map((notif) => (
            <div
              key={notif.id}
              className={`notif-card ${!notif.read ? 'unread' : ''}`}
              onClick={() => onNotificationClick && onNotificationClick(notif)}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: notif.read ? '#EEF1ED' : '#dcfce7',
                  color: '#16A34A',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {notif.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#111827' }}>
                    {notif.title}
                    {!notif.read && (
                      <span
                        style={{
                          marginLeft: '0.5rem',
                          background: '#16A34A',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '0.1rem 0.4rem',
                          borderRadius: '2px',
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {notif.time}
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#64748B', margin: '0.25rem 0 0.45rem 0', lineHeight: 1.45 }}>
                  {notif.message}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.76rem', color: '#16A34A', background: '#dcfce7', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>
                    {notif.tracking_id}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>
                    Click to track live progress →
                  </span>
                </div>
              </div>
            </div>
          ))}

        {notifications.filter((n) => (notifFilter === 'unread' ? !n.read : true)).length === 0 && (
          <div style={{ padding: '3rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center', color: '#64748b' }}>
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
}
