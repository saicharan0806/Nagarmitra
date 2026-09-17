/**
 * Centralized API Service Client for Nagarmitra Smart City Governance
 * -------------------------------------------------------------------
 * Provides standard, unified HTTP communications with automatic token injection,
 * JSON handling, error normalization, and seamless local fallback during simulated mode.
 */

const API_BASE_URL = '';

/**
 * Retrieve the active user's session token from localStorage
 */
export function getAuthToken() {
  try {
    const raw = localStorage.getItem('nagarmitra_user');
    if (raw) {
      const user = JSON.parse(raw);
      return user?.token || null;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Generic HTTP Request Dispatcher
 */
async function request(endpoint, { method = 'GET', body = null, headers = {}, isMultipart = false } = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const reqHeaders = { ...headers };
  if (!isMultipart && !reqHeaders['Content-Type']) {
    reqHeaders['Content-Type'] = 'application/json';
  }
  if (token) {
    reqHeaders['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers: reqHeaders,
  };

  if (body) {
    options.body = isMultipart ? body : JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: `Request failed with status ${res.status}` };
    }
    const error = new Error(errorData.message || errorData.error || `HTTP ${res.status}`);
    error.status = res.status;
    error.data = errorData;
    throw error;
  }

  // If response is 204 No Content
  if (res.status === 204) {
    return null;
  }

  return await res.json();
}

/**
 * Nagarmitra Centralized API Service Layer
 */
export const api = {
  // System Health
  health: {
    check: () => request('/api/health'),
  },

  // Authentication & Identity
  auth: {
    login: (credentials) =>
      request('/api/auth/login', {
        method: 'POST',
        body: credentials,
      }),
    register: (userData) =>
      request('/api/auth/register', {
        method: 'POST',
        body: userData,
      }),
  },

  // Grievance / Complaint Lifecycle
  complaints: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/api/complaints${query ? `?${query}` : ''}`);
    },
    getById: (id) => request(`/api/complaints/${id}`),
    create: (data, isFormData = false) =>
      request('/api/complaints', {
        method: 'POST',
        body: data,
        isMultipart: isFormData,
      }),
    updateStatus: (id, status) =>
      request(`/api/complaints/${id}/status`, {
        method: 'PUT',
        body: { status },
      }),
    assignWorker: (id, workerId, notes = '') =>
      request(`/api/complaints/${id}/assign`, {
        method: 'PUT',
        body: { worker_id: workerId, notes },
      }),
    resolve: (id, payload, isFormData = false) =>
      request(`/api/complaints/${id}/resolve`, {
        method: 'POST',
        body: payload,
        isMultipart: isFormData,
      }),
  },

  // AI Classification & Triage
  ai: {
    classify: (formData) =>
      request('/api/ai/classify', {
        method: 'POST',
        body: formData,
        isMultipart: true,
      }),
  },

  // Citizen Reviews & Feedback
  feedback: {
    getAll: () => request('/api/feedback'),
    create: (feedbackData) =>
      request('/api/feedback', {
        method: 'POST',
        body: feedbackData,
      }),
  },

  // Municipal Telemetry & Analytics
  analytics: {
    getOverview: () => request('/api/analytics/overview'),
  },
};

export default api;
