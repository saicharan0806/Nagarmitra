/**
 * Nagarmitra Role Security & Account Binding Utilities
 * ----------------------------------------------------
 * Enforces strict municipal separation of roles:
 * - Citizen accounts are exclusively for public grievance submission and tracking.
 * - Once an account is registered or used as a Citizen, it cannot sign in as
 *   Field Worker, Department Manager, or Municipal Administrator.
 * - Departmental/Official roles require authorized municipal credentials.
 */

const ROLE_BINDINGS_KEY = 'nagarmitra_role_bindings';

// Official Pre-configured Demo Accounts
export const DEMO_CREDENTIALS = [
  {
    role: 'citizen',
    label: 'Citizen Demo',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.gov.in',
    password: 'password123',
    badge: 'Resident / Citizen',
    desc: 'File & track civic issues with AI vision & GPS',
  },
  {
    role: 'worker',
    label: 'Field Worker Demo',
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@nagarmitra.gov.in',
    password: 'password123',
    badge: 'Roads & Infra Operative',
    desc: 'On-site execution, geo-verification & proof of work',
  },
  {
    role: 'manager',
    label: 'Dept Manager Demo',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@nagarmitra.gov.in',
    password: 'password123',
    badge: 'Sanitation & Health',
    desc: 'AI triage verification & field worker assignment',
  },
  {
    role: 'admin',
    label: 'Municipal Admin Demo',
    name: 'Dr. Suresh Verma',
    email: 'admin@nagarmitra.gov.in',
    password: 'password123',
    badge: 'Municipal Commissionerate',
    desc: 'Wards, SLA rules, telemetry & municipal analytics',
  },
];

// Pre-seeded role bindings for demo accounts
const DEFAULT_ROLE_BINDINGS = {
  'priya.sharma@example.gov.in': 'citizen',
  'citizen@nagarmitra.gov.in': 'citizen',
  'ramesh.kumar@nagarmitra.gov.in': 'worker',
  'worker@nagarmitra.gov.in': 'worker',
  'rajesh.sharma@nagarmitra.gov.in': 'manager',
  'manager@nagarmitra.gov.in': 'manager',
  'admin@nagarmitra.gov.in': 'admin',
};

/**
 * Retrieve all registered email -> role bindings
 */
export function getRegisteredRoleBindings() {
  try {
    const raw = localStorage.getItem(ROLE_BINDINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return { ...DEFAULT_ROLE_BINDINGS, ...parsed };
  } catch {
    return { ...DEFAULT_ROLE_BINDINGS };
  }
}

/**
 * Record an email's role binding permanently into local storage
 */
export function recordUserRole(email, role) {
  if (!email || !role) return;
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const bindings = getRegisteredRoleBindings();
    bindings[normalizedEmail] = role;
    localStorage.setItem(ROLE_BINDINGS_KEY, JSON.stringify(bindings));
  } catch (e) {
    console.error('Failed to save role binding:', e);
  }
}

/**
 * Check whether a requested email is bound to a specific role.
 * Returns { allowed: boolean, reason?: string, message?: string, boundRole?: string }
 */
export function checkRoleAllowedForEmail(email, requestedRole) {
  if (!email || !requestedRole) return { allowed: true };
  const normalizedEmail = email.trim().toLowerCase();
  const bindings = getRegisteredRoleBindings();
  const boundRole = bindings[normalizedEmail];

  if (!boundRole) {
    // New email, no prior role binding
    return { allowed: true };
  }

  if (boundRole === 'citizen' && requestedRole !== 'citizen') {
    return {
      allowed: false,
      reason: 'CITIZEN_LOCKED',
      boundRole,
      message: `Access Denied: The account '${normalizedEmail}' is registered as a Citizen. Under municipal security policy, citizen accounts cannot sign in as ${getRoleDisplayName(requestedRole)}. Please select 'Citizen' role or use an authorized municipal account.`,
    };
  }

  if (boundRole !== requestedRole) {
    return {
      allowed: false,
      reason: 'ROLE_MISMATCH',
      boundRole,
      message: `Role Mismatch: This account is officially registered as a '${getRoleDisplayName(boundRole)}'. Please select the matching role to sign in.`,
    };
  }

  return { allowed: true, boundRole };
}

/**
 * Helper to get user-friendly role display label
 */
export function getRoleDisplayName(role) {
  switch (role) {
    case 'citizen':
      return 'Citizen';
    case 'worker':
      return 'Field Operative / Worker';
    case 'manager':
      return 'Department Manager';
    case 'admin':
      return 'Municipal Administrator';
    default:
      return role || 'User';
  }
}
