/**
 * Shared Civic Helpers for Nagarmitra
 * -----------------------------------
 * Standard label formatting, departmental routing,
 * and priority metadata formatting across Citizen and Manager portals.
 */

export function getCategoryLabel(category) {
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
