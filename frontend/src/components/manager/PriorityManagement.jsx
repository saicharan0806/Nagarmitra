import React, { useState } from 'react';
import { getPriorityMeta } from '../../utils/civicHelpers.js';

/**
 * PriorityManagement Component
 * ----------------------------
 * Statutory SLA Turnaround Matrix, urgency monitoring queue with warning timers,
 * and emergency severity escalation tool for critical civic hazards.
 */
export default function PriorityManagement({
  complaints = [],
  selectedTicket = null,
  onSelectTicket,
  onUpdateComplaint,
  onNotification,
}) {
  const [newPriority, setNewPriority] = useState('critical');
  const [escalationReason, setEscalationReason] = useState('Citizen reports traffic artery blockage');

  const handleEscalatePriority = (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const updated = {
      ...selectedTicket,
      severity: newPriority,
    };

    if (onUpdateComplaint) onUpdateComplaint(updated);
    if (onNotification) {
      onNotification(
        `Priority Escalation: Ticket ${selectedTicket.tracking_id} escalated to ${newPriority.toUpperCase()}! Emergency alert broadcasted to ${selectedTicket.department_name}.`
      );
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Municipal Priority SLA Matrix */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem' }}>
          Municipal Priority & SLA Escalation Matrix
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
          Statutory response turnaround windows enforce prompt resolution for environmental risks and hazards.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #dc2626', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#DC2626', fontSize: '1.05rem' }}>🔴 Critical Priority</span>
              <span style={{ fontWeight: 700, fontSize: '0.78rem', background: '#ffffff', color: '#dc2626', padding: '0.15rem 0.5rem', borderRadius: '2px', border: '1px solid #fca5a5' }}>
                SLA: 4-12 Hours
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#DC2626', marginTop: '0.5rem', lineHeight: 1.45 }}>
              Exposed sparking wires, sinkholes, burst water mainlines, or hospital access blockages. Dispatches emergency on-call crew instantly.
            </p>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderLeft: '4px solid #F4B740', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#B45309', fontSize: '1.05rem' }}>🟠 High Priority</span>
              <span style={{ fontWeight: 700, fontSize: '0.78rem', background: '#ffffff', color: '#F4B740', padding: '0.15rem 0.5rem', borderRadius: '2px', border: '1px solid #F4B740' }}>
                SLA: 24 Hours
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.5rem', lineHeight: 1.45 }}>
              Hazardous potholes along high-speed corridors, open manhole covers, or toxic solid waste heaps near residential schools.
            </p>
          </div>

          <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderLeft: '4px solid #F4B740', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#B45309', fontSize: '1.05rem' }}>🟡 Medium Priority</span>
              <span style={{ fontWeight: 700, fontSize: '0.78rem', background: '#ffffff', color: '#F4B740', padding: '0.15rem 0.5rem', borderRadius: '2px', border: '1px solid #F4B740' }}>
                SLA: 48 Hours
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.5rem', lineHeight: 1.45 }}>
              Non-functional pedestrian streetlights, regular overflowing community dumpsters, or clogged storm drainage before rain.
            </p>
          </div>

          <div style={{ background: '#F8F9F6', border: '1px solid #e2e8f0', borderLeft: '4px solid #64748b', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#16A34A', fontSize: '1.05rem' }}>🟢 Low Priority</span>
              <span style={{ fontWeight: 700, fontSize: '0.78rem', background: '#ffffff', color: '#64748B', padding: '0.15rem 0.5rem', borderRadius: '2px', border: '1px solid #cbd5e1' }}>
                SLA: 72 Hours
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.5rem', lineHeight: 1.45 }}>
              Minor footpath paver displacement, faded road lane markings, or unauthorized roadside promotional banners.
            </p>
          </div>
        </div>
      </div>

      {/* Active Priority Escalation Control Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '1.75rem' }}>
        {/* Priority Monitoring Table */}
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: '0.35rem' }}>
            Active Grievance Urgency Queue
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Monitor SLA countdowns. Tickets flagged with a warning must be expedited or escalated.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {complaints.map((c) => {
              const prio = getPriorityMeta(c.severity || 'high');
              return (
                <div
                  key={c.id}
                  onClick={() => onSelectTicket && onSelectTicket(c.id)}
                  style={{
                    border: '1px solid',
                    borderColor: selectedTicket?.id === c.id ? '#16A34A' : '#e2e8f0',
                    background: selectedTicket?.id === c.id ? '#f0fdf4' : '#ffffff',
                    borderRadius: '6px',
                    padding: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#16A34A', fontSize: '0.82rem' }}>
                      {c.tracking_id}
                    </span>
                    <span className={prio.className}>{prio.label}</span>
                  </div>

                  <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                    {c.title}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
                    <span>Status: <strong style={{ textTransform: 'uppercase' }}>{c.status}</strong></span>
                    <span style={{ color: (c.severity || '').toLowerCase() === 'critical' ? '#dc2626' : '#16A34A', fontWeight: 700 }}>
                      {(c.severity || '').toLowerCase() === 'critical' ? '⚠️ SLA Warning: 2h 40m left' : '✓ Within Safe SLA Target'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Severity Escalation Form */}
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚡</span>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                Emergency Priority Escalation
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Accelerate response urgency level
              </div>
            </div>
          </div>

          {selectedTicket ? (
            <form onSubmit={handleEscalatePriority}>
              <div style={{ background: '#F8F9F6', padding: '0.85rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                <div style={{ color: '#64748b' }}>Selected Ticket:</div>
                <div style={{ fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>
                  {selectedTicket.tracking_id} - {selectedTicket.title}
                </div>
                <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: '#64748b' }}>Current Level:</span>
                  {(() => {
                    const prio = getPriorityMeta(selectedTicket.severity || 'high');
                    return <span className={prio.className}>{prio.label}</span>;
                  })()}
                </div>
              </div>

              <div className="govt-form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  New Urgency Level <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  className="form-select"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  required
                >
                  <option value="critical">🔴 Critical Priority (4-12 hrs SLA)</option>
                  <option value="high">🟠 High Priority (24 hrs SLA)</option>
                  <option value="medium">🟡 Medium Priority (48 hrs SLA)</option>
                  <option value="low">🟢 Low Priority (72 hrs SLA)</option>
                </select>
              </div>

              <div className="govt-form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  Escalation Rationale
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Major public danger, high vehicle traffic artery"
                  value={escalationReason}
                  onChange={(e) => setEscalationReason(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="govt-btn-primary"
                style={{ width: '100%', padding: '0.8rem', background: '#DC2626', borderColor: '#DC2626' }}
              >
                ⚡ Broadcast Priority Escalation
              </button>
            </form>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              Select a ticket to adjust or escalate its priority tier.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
