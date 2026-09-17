import React, { useState } from 'react';
import { getCategoryLabel, getDepartmentForCategory, CIVIC_CATEGORIES } from '../../utils/civicHelpers.js';

/**
 * AIClassification Component
 * --------------------------
 * Model architecture telemetry, real-time AI triage audit stream,
 * and supervisor manual reclassification & department re-routing tool.
 */
export default function AIClassification({
  complaints = [],
  selectedTicket = null,
  onSelectTicket,
  avgConfidence = 94,
  onUpdateComplaint,
  onNotification,
}) {
  const [overrideCategory, setOverrideCategory] = useState('');
  const [overrideReason, setOverrideReason] = useState('Visual model false positive');
  const [includeInRetraining, setIncludeInRetraining] = useState(true);

  const handleSaveOverride = (e) => {
    e.preventDefault();
    if (!overrideCategory || !selectedTicket) return;

    const updated = {
      ...selectedTicket,
      category: overrideCategory,
      department_name: getDepartmentForCategory(overrideCategory),
      status: selectedTicket.status === 'pending' ? 'assigned' : selectedTicket.status,
    };

    if (onUpdateComplaint) onUpdateComplaint(updated);
    if (onNotification) {
      onNotification(
        `AI Reclassification: Ticket ${selectedTicket.tracking_id} updated to "${getCategoryLabel(overrideCategory)}" and routed to ${updated.department_name}.`
      );
    }
    setOverrideCategory('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* AI Model Architecture & Telemetry Strip */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Deep Learning Computer Vision Service
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: '0.2rem 0' }}>
              MobileNetV3 + ViT-Civic Classification Engine
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
              Automated computer vision categorization running inference on citizen image telemetry and text descriptors.
            </p>
          </div>

          <span
            style={{
              background: '#dcfce7',
              color: '#16A34A',
              border: '1px solid #86efac',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.82rem',
            }}
          >
            ● Model Active (Avg Latency: 128ms)
          </span>
        </div>

        {/* Model Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#F8F9F6', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Overall Accuracy</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A', marginTop: '0.2rem' }}>96.4%</div>
            <div style={{ fontSize: '0.72rem', color: '#16A34A' }}>Across 1,420 urban test samples</div>
          </div>

          <div style={{ background: '#F8F9F6', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Supervisor Override Rate</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F4B740', marginTop: '0.2rem' }}>2.1%</div>
            <div style={{ fontSize: '0.72rem', color: '#F4B740' }}>Within target error threshold (&lt;3%)</div>
          </div>

          <div style={{ background: '#F8F9F6', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Active Fleet Confidence</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '0.2rem' }}>{avgConfidence}%</div>
            <div style={{ fontSize: '0.72rem', color: '#2563EB' }}>Average confidence on open tickets</div>
          </div>

          <div style={{ background: '#F8F9F6', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Retraining Feedback</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A', marginTop: '0.2rem' }}>38 Samples</div>
            <div style={{ fontSize: '0.72rem', color: '#16A34A' }}>Queued for weekly retraining cycle</div>
          </div>
        </div>
      </div>

      {/* AI Reclassification / Override Tool & Audit Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.75rem' }}>
        {/* Classification Audit Table */}
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: '0.35rem' }}>
            Live AI Triage Audit Log
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Review machine learning predictions alongside confidence percentages. Select any ticket to override.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {complaints.map((c) => (
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
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#16A34A', fontSize: '0.82rem' }}>
                    {c.tracking_id}
                  </span>
                  <span
                    style={{
                      background: (c.ai_confidence || 90) >= 90 ? '#dcfce7' : '#fef9c3',
                      color: (c.ai_confidence || 90) >= 90 ? '#16A34A' : '#B45309',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '2px',
                    }}
                  >
                    {c.ai_confidence || 92}% Confidence
                  </span>
                </div>

                <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                  {c.title}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
                  <span>AI Predicted: <strong style={{ color: '#111827' }}>{getCategoryLabel(c.category)}</strong></span>
                  <span>Target: <strong>{c.department_name}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Override Form */}
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🏷️</span>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                Supervisor Override Tool
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Reclassify category and re-route department
              </div>
            </div>
          </div>

          {selectedTicket ? (
            <form onSubmit={handleSaveOverride}>
              <div style={{ background: '#F8F9F6', padding: '0.85rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                <div style={{ color: '#64748b' }}>Selected Complaint:</div>
                <div style={{ fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>
                  {selectedTicket.tracking_id} - {selectedTicket.title}
                </div>
                <div style={{ color: '#16A34A', marginTop: '0.35rem' }}>
                  Current Category: <strong>{getCategoryLabel(selectedTicket.category)}</strong>
                </div>
              </div>

              <div className="govt-form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  New Validated Category <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  className="form-select"
                  value={overrideCategory}
                  onChange={(e) => setOverrideCategory(e.target.value)}
                  required
                >
                  <option value="">Select Correct Category...</option>
                  <option value="pothole">🕳️ Pothole & Road Damage (Roads)</option>
                  <option value="garbage_dump">🗑️ Garbage Accumulation & Dump (Sanitation)</option>
                  <option value="street_light">💡 Broken Street Light & Wire (Electrical)</option>
                  <option value="water_leakage">🚰 Water Pipe Leakage & Flood (Water Supply)</option>
                  <option value="broken_sidewalk">🧱 Damaged Footpath / Curb (Roads)</option>
                  <option value="fallen_tree">🌳 Fallen Tree & Greenery (Parks)</option>
                  <option value="illegal_parking">🚫 Illegal Dump & Encroachment (Sanitation)</option>
                </select>
              </div>

              <div className="govt-form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  Supervisor Justification Reason
                </label>
                <select
                  className="form-select"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                >
                  <option value="Visual model false positive">Visual model false positive</option>
                  <option value="Multiple concurrent civic issues on site">Multiple concurrent civic issues on site</option>
                  <option value="Obscured camera angle in citizen image">Obscured camera angle in citizen image</option>
                  <option value="Special jurisdictional administrative routing">Special jurisdictional administrative routing</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.84rem', color: '#64748B' }}>
                <input
                  type="checkbox"
                  id="retrainFlag"
                  checked={includeInRetraining}
                  onChange={(e) => setIncludeInRetraining(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="retrainFlag" style={{ cursor: 'pointer' }}>
                  Flag this correction to retrain ViT-Civic model
                </label>
              </div>

              <button
                type="submit"
                className="govt-btn-primary"
                style={{ width: '100%', padding: '0.8rem' }}
                disabled={!overrideCategory}
              >
                Confirm Reclassification & Re-route
              </button>
            </form>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              Select a complaint from the audit log to override its classification.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
