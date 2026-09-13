/**
 * Nagarmitra Multi-Tab State Synchronization Manager
 * ----------------------------------------------------
 * Uses the native BroadcastChannel API with localStorage event fallback
 * to synchronize complaints, status updates, worker assignments, and auth
 * across all concurrently open browser tabs in real-time without page reloads.
 */

const SYNC_CHANNEL_NAME = 'nagarmitra_live_sync_v1';
export const STORAGE_KEY_COMPLAINTS = 'nagarmitra_complaints';
export const STORAGE_KEY_USER = 'nagarmitra_user';

export const SYNC_EVENTS = {
  COMPLAINT_ADDED: 'COMPLAINT_ADDED',
  COMPLAINT_UPDATED: 'COMPLAINT_UPDATED',
  COMPLAINTS_SYNC: 'COMPLAINTS_SYNC',
  COMPLAINTS_RESET: 'COMPLAINTS_RESET',
  USER_AUTH: 'USER_AUTH',
};

// Singleton channel reference
let syncChannel = null;

function getChannel() {
  if (typeof window === 'undefined') return null;
  if (!syncChannel && typeof window.BroadcastChannel !== 'undefined') {
    try {
      syncChannel = new window.BroadcastChannel(SYNC_CHANNEL_NAME);
    } catch {
      syncChannel = null;
    }
  }
  return syncChannel;
}

/**
 * Retrieve saved complaints from localStorage, falling back to initial data.
 */
export function getStoredComplaints(fallbackComplaints = []) {
  if (typeof window === 'undefined') return fallbackComplaints;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (!raw) return fallbackComplaints;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallbackComplaints;
  } catch (err) {
    console.warn('[Nagarmitra TabSync] Failed to read stored complaints:', err);
    return fallbackComplaints;
  }
}

/**
 * Persist current complaints array to localStorage.
 */
export function persistComplaints(complaints) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
  } catch (err) {
    console.warn('[Nagarmitra TabSync] Failed to save complaints to localStorage:', err);
  }
}

/**
 * Broadcast an event payload to all other active tabs.
 */
export function broadcastTabEvent(eventType, payload, meta = {}) {
  const channel = getChannel();
  const message = {
    type: eventType,
    payload,
    meta: {
      ...meta,
      timestamp: Date.now(),
      senderTabId: getTabId(),
    },
  };

  if (channel) {
    try {
      channel.postMessage(message);
    } catch (err) {
      console.warn('[Nagarmitra TabSync] Broadcast error:', err);
    }
  }
}

/**
 * Unique ID for this browser tab session.
 */
let currentTabId = null;
export function getTabId() {
  if (!currentTabId) {
    currentTabId = `tab_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }
  return currentTabId;
}

/**
 * Initialize cross-tab synchronization listeners.
 * 
 * @param {Object} handlers
 * @param {Function} handlers.onComplaintAdded - Called when another tab submits a complaint
 * @param {Function} handlers.onComplaintUpdated - Called when another tab updates complaint status/assignment
 * @param {Function} handlers.onComplaintsReset - Called when complaints are reset to defaults
 * @param {Function} handlers.onUserAuthChanged - Called when sign-in or sign-out occurs in another tab
 * @returns {Function} Cleanup function to unsubscribe listeners
 */
export function initTabSync(handlers = {}) {
  if (typeof window === 'undefined') return () => {};

  const channel = getChannel();
  const tabId = getTabId();

  // 1. BroadcastChannel Message Handler
  const handleBroadcastMessage = (event) => {
    const data = event.data;
    if (!data || !data.type) return;

    // Ignore messages sent by this same tab
    if (data.meta && data.meta.senderTabId === tabId) return;

    switch (data.type) {
      case SYNC_EVENTS.COMPLAINT_ADDED:
        if (typeof handlers.onComplaintAdded === 'function') {
          handlers.onComplaintAdded(data.payload, data.meta);
        }
        break;

      case SYNC_EVENTS.COMPLAINT_UPDATED:
        if (typeof handlers.onComplaintUpdated === 'function') {
          handlers.onComplaintUpdated(data.payload, data.meta);
        }
        break;

      case SYNC_EVENTS.COMPLAINTS_RESET:
        if (typeof handlers.onComplaintsReset === 'function') {
          handlers.onComplaintsReset(data.payload, data.meta);
        }
        break;

      case SYNC_EVENTS.USER_AUTH:
        if (typeof handlers.onUserAuthChanged === 'function') {
          handlers.onUserAuthChanged(data.payload, data.meta);
        }
        break;

      default:
        break;
    }
  };

  if (channel) {
    channel.addEventListener('message', handleBroadcastMessage);
  }

  // 2. Storage Event Listener (Fallback and Cross-Window Sync)
  const handleStorageEvent = (event) => {
    if (event.key === STORAGE_KEY_COMPLAINTS) {
      try {
        const updatedComplaints = event.newValue ? JSON.parse(event.newValue) : null;
        if (Array.isArray(updatedComplaints) && typeof handlers.onComplaintsSync === 'function') {
          handlers.onComplaintsSync(updatedComplaints);
        }
      } catch {}
    }

    if (event.key === STORAGE_KEY_USER) {
      try {
        const updatedUser = event.newValue ? JSON.parse(event.newValue) : null;
        if (typeof handlers.onUserAuthChanged === 'function') {
          handlers.onUserAuthChanged(updatedUser, { fromStorage: true });
        }
      } catch {}
    }
  };

  window.addEventListener('storage', handleStorageEvent);

  // Return clean teardown function
  return () => {
    if (channel) {
      channel.removeEventListener('message', handleBroadcastMessage);
    }
    window.removeEventListener('storage', handleStorageEvent);
  };
}
