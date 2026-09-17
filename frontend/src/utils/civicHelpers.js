/**
 * Shared Civic Helpers for Nagarmitra
 * -----------------------------------
 * Standard label formatting, departmental routing,
 * priority metadata formatting, and canonical civic taxonomies across all portals.
 */

// Canonical List of Civic Issue Categories
export const CIVIC_CATEGORIES = [
  {
    id: 'pothole',
    label: 'Pothole & Road Damage',
    dept: 'Roads & Infrastructure',
    severity: 'high',
    icon: '🕳️',
    keywords: ['pothole', 'crater', 'asphalt', 'cracked road', 'tar', 'road damage', 'pit', 'street hole'],
  },
  {
    id: 'garbage_dump',
    label: 'Garbage Dump & Waste Overflow',
    dept: 'Sanitation & Waste Management',
    severity: 'medium',
    icon: '🗑️',
    keywords: ['garbage', 'trash', 'waste', 'dump', 'dustbin', 'bin', 'litter', 'filth', 'rubbish', 'dumpster'],
  },
  {
    id: 'street_light',
    label: 'Broken Street Light',
    dept: 'Electrical & Energy',
    severity: 'medium',
    icon: '💡',
    keywords: ['street light', 'light', 'lamp', 'pole', 'dark', 'bulb', 'wire', 'wiring', 'cable', 'transformer'],
  },
  {
    id: 'water_leakage',
    label: 'Water Pipe Leakage & Flooding',
    dept: 'Water Supply & Sewerage',
    severity: 'high',
    icon: '💧',
    keywords: ['water', 'pipe', 'leak', 'burst', 'flood', 'drain', 'sewage', 'drainage', 'manhole', 'gutter'],
  },
  {
    id: 'fallen_tree',
    label: 'Fallen Tree / Blocked Road',
    dept: 'Parks & Horticulture',
    severity: 'critical',
    icon: '🌳',
    keywords: ['tree', 'branch', 'fallen', 'trunk', 'timber', 'horticulture', 'bush'],
  },
  {
    id: 'broken_sidewalk',
    label: 'Damaged Sidewalk & Pavers',
    dept: 'Roads & Infrastructure',
    severity: 'low',
    icon: '🧱',
    keywords: ['sidewalk', 'paver', 'footpath', 'curb', 'pedestrian walk'],
  },
  {
    id: 'illegal_parking',
    label: 'Illegal Parking & Encroachment',
    dept: 'Traffic & Enforcement',
    severity: 'low',
    icon: '🚗',
    keywords: ['parking', 'vehicle', 'car', 'bike', 'scooter', 'encroachment', 'blocked driveway'],
  },
];

// Canonical List of Municipal Directorates
export const MUNICIPAL_DEPARTMENTS = [
  { id: 'roads', name: 'Roads & Infrastructure', lead: 'Eng. Rajesh Patel', phone: 'Ext. 401', color: '#16A34A' },
  { id: 'sanitation', name: 'Sanitation & Waste Management', lead: 'Dr. Sunita Rao', phone: 'Ext. 402', color: '#2563EB' },
  { id: 'electrical', name: 'Electrical & Public Lighting', lead: 'Vikram Seth', phone: 'Ext. 403', color: '#F4B740' },
  { id: 'water', name: 'Water Supply & Urban Drainage', lead: 'Priya Nair', phone: 'Ext. 404', color: '#16A34A' },
  { id: 'parks', name: 'Parks & Environmental Conservation', lead: 'Amit Verma', phone: 'Ext. 405', color: '#0B1220' },
];

export function getCategoryLabel(category) {
  const found = CIVIC_CATEGORIES.find((c) => c.id === category);
  if (found) return found.label;
  const map = {
    pothole: 'Pothole & Road Damage',
    garbage_dump: 'Garbage Accumulation & Overflow',
    street_light: 'Broken Street Light / Lamp Post',
    water_leakage: 'Water Pipe Leakage & Drainage',
    broken_sidewalk: 'Damaged Footpath / Paver Blocks',
    fallen_tree: 'Fallen Tree / Blocked Roadway',
    illegal_parking: 'Illegal Dump / Public Encroachment',
  };
  return map[category] || 'General Civic Concern';
}

export function getDepartmentForCategory(category) {
  const found = CIVIC_CATEGORIES.find((c) => c.id === category);
  if (found) return found.dept;
  switch (category) {
    case 'pothole':
    case 'broken_sidewalk':
      return 'Roads & Infrastructure';
    case 'garbage_dump':
    case 'illegal_parking':
      return 'Sanitation & Waste Management';
    case 'street_light':
      return 'Electrical & Street Lighting Utility';
    case 'water_leakage':
      return 'Water Supply & Urban Drainage';
    case 'fallen_tree':
      return 'Parks & Environmental Conservation';
    default:
      return 'Municipal Public Health & Safety';
  }
}

export function getPriorityMeta(severity = 'medium') {
  const sev = (severity || 'medium').toLowerCase();
  switch (sev) {
    case 'critical':
      return { label: '🔴 Critical', className: 'badge-priority-critical', text: 'CRITICAL' };
    case 'high':
      return { label: '🟠 High', className: 'badge-priority-high', text: 'HIGH' };
    case 'medium':
      return { label: '🟡 Medium', className: 'badge-priority-medium', text: 'MEDIUM' };
    case 'low':
      return { label: '🟢 Low', className: 'badge-priority-low', text: 'LOW' };
    default:
      return { label: '🟡 Medium', className: 'badge-priority-medium', text: 'MEDIUM' };
  }
}

