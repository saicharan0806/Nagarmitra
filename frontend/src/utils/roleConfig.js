/**
 * Centralized Role Configuration & Route Authorization Matrix
 * Nagarmitra Municipal Smart City Governance Portal
 */

export const ROLES = {
  CITIZEN: 'citizen',
  MANAGER: 'manager',
  WORKER: 'worker',
  ADMIN: 'admin',
};

export const ROLE_LABELS = {
  [ROLES.CITIZEN]: 'Citizen',
  [ROLES.MANAGER]: 'Department Manager',
  [ROLES.WORKER]: 'Field Operative',
  [ROLES.ADMIN]: 'Municipal Administrator',
};

// Default dashboard tab when logging in or upon unauthorized redirection
export const ROLE_DEFAULT_TABS = {
  [ROLES.CITIZEN]: 'citizen',
  [ROLES.MANAGER]: 'manager',
  [ROLES.WORKER]: 'worker',
  [ROLES.ADMIN]: 'system',
};

// Strict route-level permission mapping
export const ROUTE_PERMISSIONS = {
  home: [ROLES.CITIZEN, ROLES.MANAGER, ROLES.WORKER, ROLES.ADMIN],
  about: [ROLES.CITIZEN, ROLES.MANAGER, ROLES.WORKER, ROLES.ADMIN],
  'how-it-works': [ROLES.CITIZEN, ROLES.MANAGER, ROLES.WORKER, ROLES.ADMIN],
  profile: [ROLES.CITIZEN, ROLES.MANAGER, ROLES.WORKER, ROLES.ADMIN],
  citizen: [ROLES.CITIZEN],            // Only Citizen
  manager: [ROLES.MANAGER],            // Only Department Manager
  worker: [ROLES.WORKER],              // Only Field Operative
  system: [ROLES.ADMIN],               // Only Municipal Administrator
  analytics: [ROLES.ADMIN],            // Only Municipal Administrator
};

// Official Role-Based Navigation Bars
export const NAV_LINKS_BY_ROLE = {
  [ROLES.CITIZEN]: [
    { id: 'home', label: 'Home' },
    { id: 'citizen', label: 'Report & Track' },
  ],
  [ROLES.MANAGER]: [
    { id: 'home', label: 'Home' },
    { id: 'manager', label: 'Manager Triage' },
  ],
  [ROLES.WORKER]: [
    { id: 'home', label: 'Home' },
    { id: 'worker', label: 'Field Operations' },
  ],
  [ROLES.ADMIN]: [
    { id: 'home', label: 'Home' },
    { id: 'system', label: 'System Management' },
    { id: 'analytics', label: 'Analytics' },
  ],
};

/**
 * Checks if a specific role is authorized to view a target route
 */
export const isRouteAllowed = (role, routeId) => {
  if (!role) return routeId === 'home' || routeId === 'about' || routeId === 'how-it-works';
  const allowedRoles = ROUTE_PERMISSIONS[routeId];
  return allowedRoles ? allowedRoles.includes(role) : false;
};

/**
 * Returns default landing tab for a given user role
 */
export const getDefaultRedirectForRole = (role) => {
  return ROLE_DEFAULT_TABS[role] || 'home';
};
