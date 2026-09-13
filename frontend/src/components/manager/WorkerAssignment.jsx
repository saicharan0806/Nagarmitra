import React, { useState } from 'react';

/**
 * WorkerAssignment Component
 * --------------------------
 * Municipal Ground Workforce Directory with live status indicators,
 * task loads, and 1-click work order dispatch modal/form.
 */
export default function WorkerAssignment({
  workers = [],
  setWorkers,
  complaints = [],
  selectedTicket = null,
  onSelectTicket,
  onUpdateComplaint,
  onNotification,
}) {
  const [assignWorkerId, setAssignWorkerId] = useState('');
  const [dispatchNotes, setDispatchNotes] = useState('Urgent field inspection required. Carry appropriate restoration gear.');

  const handleDispatchWorker = (e) => {
    e.preventDefault();
    const worker = workers.find((w) => w.id === parseInt(assignWorkerId, 10));
    if (!worker || !selectedTicket) return;

    const updated = {
      ...selectedTicket,
      assigned_worker_id: worker.id,
      assigned_worker_name: worker.name,
      status: 'in_progress',
    };

    if (onUpdateComplaint) onUpdateComplaint(updated);

    // Update worker status to busy and increment active tickets
    if (setWorkers) {
      setWorkers((prev) =>
        prev.map((w) =>
          w.id === worker.id ? { ...w, status: 'busy', activeTickets: w.activeTickets + 1 } : w
        )
      );
    }

    if (onNotification) {
      onNotification(
        `Field Dispatch: Assigned ${worker.name} (${worker.badge}) to ticket ${selectedTicket.tracking_id} with on-site work orders.`
      );
    }
    setAssignWorkerId('');
  };

  const availableCount = workers.filter((w) => w.status === 'available').length;

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '1.75rem' }}>
      {/* Ground Operatives Directory */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Municipal Ground Workforce Directory
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              Live operative status, active task loads, and field deployment zones.
            </p>
          </div>

          <span
            style={{
              background: '#dcfce7',
              color: '#16A34A',
              border: '1px solid #86efac',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.78rem',
            }}
          >
            {availableCount} Operatives Ready
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {workers.map((worker) => (
            <div
              key={worker.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '1.1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                background: worker.status === 'available' ? '#f0fdf4' : '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: '#111827',
                  }}
                >
                  {worker.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ color: '#111827', fontSize: '0.96rem' }}>{worker.name}</strong>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', background: '#e2e8f0', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>
                      {worker.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {worker.department} • 📍 {worker.ward}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                    <span className={`worker-status-dot ${worker.status}`} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'capitalize', color: worker.status === 'available' ? '#16A34A' : '#F4B740' }}>
                      {worker.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    Active Load: <strong>{worker.activeTickets} Tasks</strong> • ⭐ {worker.rating}
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #16A34A',
                    color: '#16A34A',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setAssignWorkerId(worker.id.toString());
                    if (onNotification) onNotification(`Selected ${worker.name} for assignment.`);
                  }}
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Worker Dispatch Form */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🚀</span>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Work Order Dispatch
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Assign operative & dispatch field orders
            </div>
          </div>
        </div>

        <form onSubmit={handleDispatchWorker}>
          {/* Target Complaint */}
          <div className="govt-form-group">
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
              Select Complaint to Assign <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              className="form-select"
              value={selectedTicket ? selectedTicket.id : ''}
              onChange={(e) => onSelectTicket && onSelectTicket(Number(e.target.value))}
              required
            >
              {complaints.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.tracking_id} - {c.title} ({c.status.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Worker */}
          <div className="govt-form-group">
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
              Select Field Operative <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              className="form-select"
              value={assignWorkerId}
              onChange={(e) => setAssignWorkerId(e.target.value)}
              required
            >
              <option value="">Choose an operative...</option>
              {workers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.badge}) - {w.department} [{w.status.toUpperCase()}]
                </option>
              ))}
            </select>
          </div>

          {/* Work Order Instructions */}
          <div className="govt-form-group">
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
              Field Instructions & Equipment Required
            </label>
            <textarea
              className="form-textarea"
              rows="3"
              value={dispatchNotes}
              onChange={(e) => setDispatchNotes(e.target.value)}
              placeholder="e.g., Deploy asphalt compaction roller and safety cones. Upload resolution photo upon completion."
              required
            />
          </div>

          <button
            type="submit"
            className="govt-btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.96rem' }}
            disabled={!assignWorkerId || !selectedTicket}
          >
            🚀 Dispatch Work Order to Field Worker
          </button>
        </form>
      </div>
    </div>
  );
}
