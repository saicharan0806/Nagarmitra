import React, { useState, useMemo } from 'react';
import { getCategoryLabel, getPriorityMeta } from '../../utils/civicHelpers.js';

/**
 * ComplaintManagement Component
 * -----------------------------
 * Operational complaint triage console with summary statistics,
 * faceted filtering, full interactive complaint table, and detailed ticket inspection drawer.
 */
export default function ComplaintManagement({
  complaints = [],
  selectedTicket = null,
  onSelectTicket,
  onUpdateComplaint,
  onNotification,
  onSwitchTab,
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDept, setFilterDept] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
      const matchesDept =
        filterDept === 'all' ||
        c.department_name?.toLowerCase().includes(filterDept.toLowerCase());
      const matchesPriority =
        filterPriority === 'all' ||
        (c.severity || 'medium').toLowerCase() === filterPriority.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tracking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesDept && matchesPriority && matchesSearch;
    });
  }, [complaints, filterStatus, filterDept, filterPriority, searchQuery]);

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'in_progress' || c.status === 'assigned').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Metrics Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #16A34A', borderRadius: '6px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Open Reports</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginTop: '0.35rem' }}>{totalCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.3rem' }}>Across all 5 municipal wards</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #F4B740', borderRadius: '6px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Awaiting Triage Review</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#F4B740', lineHeight: 1.1, marginTop: '0.35rem' }}>{pendingCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#F4B740', marginTop: '0.3rem' }}>Requires supervisor sign-off</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #F4B740', borderRadius: '6px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Active On-Site Work</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#F4B740', lineHeight: 1.1, marginTop: '0.35rem' }}>{inProgressCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#F4B740', marginTop: '0.3rem' }}>Dispatched ground crews</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #16A34A', borderRadius: '6px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Verified Resolutions</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#16A34A', lineHeight: 1.1, marginTop: '0.35rem' }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.3rem' }}>Audit verified with photo</div>
        </div>
      </div>

      {/* Filtering & Search Toolbar */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses ({complaints.length})</option>
            <option value="pending">Pending ({complaints.filter((c) => c.status === 'pending').length})</option>
            <option value="assigned">Assigned ({complaints.filter((c) => c.status === 'assigned').length})</option>
            <option value="in_progress">In Progress ({complaints.filter((c) => c.status === 'in_progress').length})</option>
            <option value="resolved">Resolved ({complaints.filter((c) => c.status === 'resolved').length})</option>
          </select>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="roads">Roads & Infrastructure</option>
            <option value="sanitation">Sanitation & Waste</option>
            <option value="electrical">Electrical & Lighting</option>
            <option value="water">Water Supply & Drainage</option>
          </select>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="critical">🔴 Critical</option>
            <option value="high">🟠 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>

        {/* Keyword Search */}
        <input
          type="text"
          className="form-input"
          placeholder="Search by Tracking ID, Title, or Ward..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: '320px', fontSize: '0.85rem' }}
        />
      </div>

      {/* Interactive Complaints Table */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#F8F9F6', borderBottom: '1px solid #cbd5e1', color: '#64748B', fontWeight: 700 }}>
                <th style={{ padding: '0.85rem 1rem' }}>Tracking ID</th>
                <th style={{ padding: '0.85rem 1rem' }}>Issue & Address</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category & Department</th>
                <th style={{ padding: '0.85rem 1rem' }}>Priority</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Assigned Operative</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((item) => {
                  const prioMeta = getPriorityMeta(item.severity || 'high');
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: selectedTicket?.id === item.id ? '#f0fdf4' : 'transparent',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 700, color: '#16A34A' }}>
                        {item.tracking_id}
                      </td>
                      <td style={{ padding: '1rem', maxWidth: '280px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{item.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>📍 {item.address}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: '#111827', textTransform: 'capitalize' }}>
                          {getCategoryLabel(item.category)}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 500 }}>
                          {item.department_name}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={prioMeta.className}>{prioMeta.label}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge badge-${item.status}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748B' }}>
                        {item.assigned_worker_name ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span className="worker-status-dot busy" />
                            <strong>{item.assigned_worker_name}</strong>
                          </div>
                        ) : (
                          <span style={{ color: '#F4B740', fontWeight: 600, fontSize: '0.8rem' }}>⚠️ Unassigned</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          type="button"
                          className="govt-btn-primary"
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                          onClick={() => onSelectTicket && onSelectTicket(item.id)}
                        >
                          ⚙️ Triage & Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    No complaints match this filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Complaint Inspection Drawer */}
      {selectedTicket && (
        <div style={{ background: '#ffffff', border: '1px solid #16A34A', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 4px 12px rgba(21, 128, 61, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', fontWeight: 700, color: '#16A34A', background: '#dcfce7', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid #86efac' }}>
                  {selectedTicket.tracking_id}
                </span>
                <span className={`badge badge-${selectedTicket.status}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  {selectedTicket.status}
                </span>
                {(() => {
                  const prio = getPriorityMeta(selectedTicket.severity || 'high');
                  return <span className={prio.className}>{prio.label}</span>;
                })()}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                {selectedTicket.title}
              </h3>
              <div style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '0.25rem' }}>
                📍 {selectedTicket.address} • Submitted {new Date(selectedTicket.created_at).toLocaleDateString()}
              </div>
            </div>

            <button
              type="button"
              style={{ background: '#F8F9F6', border: '1px solid #cbd5e1', padding: '0.4rem 0.85rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
              onClick={() => onSelectTicket && onSelectTicket(null)}
            >
              ✕ Close Details
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Citizen Photo & Description */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                Citizen Description & Photographic Proof
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', background: '#F8F9F6', padding: '0.85rem', borderRadius: '4px', border: '1px solid #e2e8f0', lineHeight: 1.5, marginBottom: '1rem' }}>
                {selectedTicket.description}
              </p>

              {selectedTicket.image_url ? (
                <img
                  src={selectedTicket.image_url}
                  alt="Citizen Proof"
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              ) : (
                <div style={{ padding: '2rem', background: '#F8F9F6', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                  No photo attached
                </div>
              )}

              {selectedTicket.proof_image_url && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16A34A', marginBottom: '0.35rem' }}>
                    ✅ Verified Ground Resolution Proof
                  </div>
                  <img
                    src={selectedTicket.proof_image_url}
                    alt="Resolution Proof"
                    style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #16A34A' }}
                  />
                </div>
              )}
            </div>

            {/* Supervisor Actions (Status & Quick Dispatch) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#F8F9F6', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
                  ⚡ Lifecycle Status Transition
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['pending', 'assigned', 'in_progress', 'resolved'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        const upd = { ...selectedTicket, status: st };
                        if (onUpdateComplaint) onUpdateComplaint(upd);
                        if (onNotification) onNotification(`Updated ticket ${selectedTicket.tracking_id} to status "${st.toUpperCase()}".`);
                      }}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: selectedTicket.status === st ? '#16A34A' : '#cbd5e1',
                        background: selectedTicket.status === st ? '#16A34A' : '#ffffff',
                        color: selectedTicket.status === st ? '#ffffff' : '#64748B',
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Dispatch Shortcut */}
              <div style={{ background: '#F8F9F6', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                  👷 Assigned Field Operative
                </h4>
                <div style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '0.75rem' }}>
                  Current: <strong>{selectedTicket.assigned_worker_name || 'None (Unassigned)'}</strong>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="govt-btn-primary"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}
                    onClick={() => onSwitchTab && onSwitchTab('workers')}
                  >
                    Open Worker Dispatch Board →
                  </button>
                  <button
                    type="button"
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.45rem 0.95rem', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => onSwitchTab && onSwitchTab('ai')}
                  >
                    Inspect AI Telemetry →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
