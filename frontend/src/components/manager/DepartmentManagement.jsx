import React, { useState } from 'react';

/**
 * DepartmentManagement Component
 * ------------------------------
 * Municipal Directorate overview with active ticket loads, SLA compliance rates,
 * fleet assets, and inter-departmental grievance cross-routing tool.
 */
export default function DepartmentManagement({
  complaints = [],
  departmentsList = [],
  selectedTicket = null,
  onUpdateComplaint,
  onNotification,
}) {
  const [transferTargetDept, setTransferTargetDept] = useState('Sanitation & Waste Management');
  const [transferNotes, setTransferNotes] = useState('Incident site spans multi-department jurisdiction');

  const handleTransferDepartment = (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const updated = {
      ...selectedTicket,
      department_name: transferTargetDept,
    };

    if (onUpdateComplaint) onUpdateComplaint(updated);
    if (onNotification) {
      onNotification(
        `Department Re-routing: Ticket ${selectedTicket.tracking_id} transferred to "${transferTargetDept}". Supervisor notified.`
      );
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Departmental Directory Grid */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem' }}>
          Municipal Departments & Directorate Overview
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
          Direct oversight of departmental capacity, fleet assets, lead supervisors, and SLA resolution compliance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {departmentsList.map((dept) => {
            const deptComplaints = complaints.filter((c) =>
              c.department_name?.toLowerCase().includes(dept.id)
            );
            const pendingDeptCount = deptComplaints.filter((c) => c.status === 'pending').length;

            return (
              <div
                key={dept.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderTop: '4px solid #16A34A',
                  borderRadius: '6px',
                  padding: '1.35rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Directorate
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>
                  {dept.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '0.85rem' }}>
                  👤 Lead: <strong>{dept.lead}</strong> ({dept.phone})
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: '#F8F9F6', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '0.85rem', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Active Tickets:</span>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#111827' }}>{deptComplaints.length}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>SLA Compliance:</span>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#16A34A' }}>{dept.slaRate}%</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  🚜 <strong>Fleet Assets:</strong> {dept.fleetCount}
                </div>

                {pendingDeptCount > 0 && (
                  <div style={{ marginTop: '0.75rem', background: '#fef3c7', color: '#B45309', fontSize: '0.78rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '3px', display: 'inline-block' }}>
                    ⚠️ {pendingDeptCount} Tickets Awaiting Review
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inter-Departmental Ticket Transfer Tool */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🔄</span>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Inter-Departmental Ticket Cross-Routing
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Re-route grievances to a different municipal department when field jurisdiction overlaps
            </div>
          </div>
        </div>

        {selectedTicket ? (
          <form onSubmit={handleTransferDepartment} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '0.35rem' }}>Active Selected Grievance:</div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>
                {selectedTicket.tracking_id} - {selectedTicket.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#16A34A', marginTop: '0.2rem' }}>
                Current Department: <strong>{selectedTicket.department_name}</strong>
              </div>
            </div>

            <div className="govt-form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                Transfer to Destination Department
              </label>
              <select
                className="form-select"
                value={transferTargetDept}
                onChange={(e) => setTransferTargetDept(e.target.value)}
              >
                {departmentsList.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="govt-form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                Transfer Justification Notes
              </label>
              <input
                type="text"
                className="form-input"
                value={transferNotes}
                onChange={(e) => setTransferNotes(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="govt-btn-primary"
              style={{ height: '42px' }}
            >
              Transfer Ticket
            </button>
          </form>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Select a complaint from Complaint Management to transfer departments.
          </div>
        )}
      </div>
    </div>
  );
}
