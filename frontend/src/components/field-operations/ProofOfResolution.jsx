import React, { useState } from 'react';

/**
 * Module 4: Proof of Resolution
 * Mandatory Before & After Photo Verification, Materials Accounting & Verified Job Closure
 */
export default function ProofOfResolution({
  task,
  onUpdateTask,
  onNotification,
  onNavigateTab,
}) {
  const [proofImageFile, setProofImageFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(
    task?.proof_image_url || null
  );
  const [resolutionNotes, setResolutionNotes] = useState(
    task?.resolution_notes || ''
  );
  const [materialsUsed, setMaterialsUsed] = useState(
    'Cold mix asphalt (40kg), sealant primer, surface compactor'
  );
  const [hoursSpent, setHoursSpent] = useState('1.5');
  const [certifiedDeclaration, setCertifiedDeclaration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [isResolvedSuccess, setIsResolvedSuccess] = useState(
    task?.status === 'resolved'
  );

  if (!task) {
    return (
      <div className="field-module-container animate-fade-in">
        <div className="field-empty-state">
          <div className="field-empty-icon">📸</div>
          <h3 className="field-empty-title">No Task Selected</h3>
          <p className="field-empty-desc">
            Please select an assigned complaint from the list to attach resolution proof and close out the work order.
          </p>
          <button
            type="button"
            className="govt-btn-primary"
            onClick={() => onNavigateTab('assigned')}
          >
            Go to Assigned Complaints
          </button>
        </div>
      </div>
    );
  }

  // Handle Photo Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImageFile(file);
      setProofPreview(URL.createObjectURL(file));
      setFormError('');
    }
  };

  // Quick Demo Image Preset
  const handleUseDemoPhoto = () => {
    const demoUrl =
      task.category === 'garbage_dump'
        ? 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600'
        : task.category === 'street_light'
        ? 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600'
        : 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600';
    setProofPreview(demoUrl);
    setFormError('');
  };

  // Submit Final Proof
  const handleSubmitProof = (e) => {
    e.preventDefault();

    if (!proofPreview) {
      const msg = 'Please upload or select a verification photograph showing the completed repair.';
      setFormError(msg);
      if (onNotification) onNotification(`⚠️ ${msg}`);
      return;
    }

    if (!certifiedDeclaration) {
      const msg = 'Please check the municipal compliance certification declaration before submitting.';
      setFormError(msg);
      if (onNotification) onNotification(`⚠️ ${msg}`);
      return;
    }

    setFormError('');
    setIsSubmitting(true);
    try {
      const updated = {
        ...task,
        status: 'resolved',
        proof_image_url: proofPreview,
        resolution_notes:
          resolutionNotes.trim() ||
          `Restoration successfully completed. Materials used: ${materialsUsed}. Labor hours: ${hoursSpent} hrs.`,
        resolved_at: new Date().toISOString(),
      };

      onUpdateTask(updated);
      setIsResolvedSuccess(true);
      onNotification(
        `🎉 Work Order ${task.tracking_id} successfully closed! Photographic verification archived.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="field-module-container animate-fade-in">
      {/* Header Banner */}
      <div className="field-details-header">
        <div>
          <div className="field-details-sub-tag">
            <span>MANDATORY PHOTOGRAPHIC RESOLUTION VERIFICATION</span>
            <span className="bullet-sep">•</span>
            <span>{task.tracking_id}</span>
          </div>
          <h2 className="field-details-title">Resolution Proof: {task.title}</h2>
          <p className="field-task-desc" style={{ marginTop: '0.25rem' }}>
            Municipal protocol requires verifiable before/after photographic records and materials accounting before complaint closure.
          </p>
        </div>

        {isResolvedSuccess && (
          <div className="field-verified-stamp">
            <span>✓</span>
            <span>OFFICIALLY RESOLVED & CLOSED</span>
          </div>
        )}
      </div>

      {/* Before & After Photo Comparison Box */}
      <div className="field-card">
        <div className="field-card-header">
          <h3 className="field-card-title">⚖️ Before & After Visual Verification</h3>
          <span className="field-card-tag">Dual Photographic Record</span>
        </div>

        <div className="field-comparison-grid">
          {/* Before: Citizen Reported Photo */}
          <div className="field-comparison-col">
            <div className="field-comparison-badge before">
              <span>BEFORE: Citizen Incident Photo</span>
            </div>
            <div className="field-comparison-image-box">
              {task.image_url ? (
                <img
                  src={task.image_url}
                  alt="Before Repair"
                  className="field-comparison-img"
                />
              ) : (
                <div className="field-no-image">
                  <span>📷</span>
                  <p>Original citizen photo not provided.</p>
                </div>
              )}
            </div>
            <div className="field-comparison-footer">
              <span>Date: {new Date(task.created_at).toLocaleDateString()}</span>
              <span>Severity: {task.severity?.toUpperCase()}</span>
            </div>
          </div>

          {/* After: Field Operative Resolution Photo */}
          <div className="field-comparison-col">
            <div className="field-comparison-badge after">
              <span>AFTER: Field Operative Resolution Proof</span>
            </div>
            <div className="field-comparison-image-box">
              {proofPreview ? (
                <img
                  src={proofPreview}
                  alt="After Repair Proof"
                  className="field-comparison-img"
                />
              ) : (
                <div className="field-upload-placeholder">
                  <span style={{ fontSize: '2.5rem' }}>📷</span>
                  <p style={{ fontWeight: 600, color: '#111827', margin: '0.5rem 0 0.25rem 0' }}>
                    Attach Completed Work Photograph
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    PNG, JPG, WebP up to 10MB
                  </span>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    <label className="govt-btn-primary" style={{ cursor: 'pointer', fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}>
                      <span>Browse Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </label>
                    <button
                      type="button"
                      className="govt-btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
                      onClick={handleUseDemoPhoto}
                    >
                      Use Demo Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="field-comparison-footer">
              <span>Operative: {task.assigned_worker_name || 'Ramesh Kumar'}</span>
              <span>
                {proofPreview ? (
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#16A34A', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => {
                      setProofPreview(null);
                      setProofImageFile(null);
                    }}
                  >
                    Replace Photo
                  </button>
                ) : (
                  <span style={{ color: '#F4B740' }}>Pending Upload</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Details & Sign-Off Form */}
      <div className="field-card" style={{ marginTop: '1.5rem' }}>
        <div className="field-card-header">
          <h3 className="field-card-title">📝 Work Order Closeout & Materials Report</h3>
          <span className="field-card-tag">Operative Attestation</span>
        </div>

        <form onSubmit={handleSubmitProof}>
          <div className="field-form-grid">
            <div className="govt-form-group">
              <label className="govt-label" htmlFor="materials-input">
                <span>Materials & Equipment Consumed</span>
              </label>
              <input
                id="materials-input"
                type="text"
                className="govt-input"
                placeholder="e.g., Cold patch asphalt (40kg), tack coat primer, roller..."
                value={materialsUsed}
                onChange={(e) => setMaterialsUsed(e.target.value)}
                disabled={isResolvedSuccess}
                required
              />
            </div>

            <div className="govt-form-group">
              <label className="govt-label" htmlFor="hours-input">
                <span>Field On-Site Labor Hours</span>
              </label>
              <input
                id="hours-input"
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                className="govt-input"
                value={hoursSpent}
                onChange={(e) => setHoursSpent(e.target.value)}
                disabled={isResolvedSuccess}
                required
              />
            </div>
          </div>

          <div className="govt-form-group">
            <label className="govt-label" htmlFor="resolution-notes">
              <span>Operative Resolution Notes & Site Observations</span>
            </label>
            <textarea
              id="resolution-notes"
              rows="3"
              className="govt-textarea"
              placeholder="Describe physical remediation performed, curb leveling, and final site clearance..."
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              disabled={isResolvedSuccess}
            />
          </div>

          {/* Mandatory Municipal Attestation Checkbox */}
          <div className="field-attestation-box">
            <label className="field-checkbox-label">
              <input
                type="checkbox"
                checked={certifiedDeclaration}
                onChange={(e) => setCertifiedDeclaration(e.target.checked)}
                disabled={isResolvedSuccess}
                required
              />
              <span className="field-checkbox-text">
                <strong>Official Field Operative Attestation:</strong> I hereby certify under municipal civic code that the reported hazard has been physically remediated to full public safety standards. All construction debris and detour barricades have been cleared, and traffic/pedestrian access is safely restored.
              </span>
            </label>
          </div>

          {formError && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderLeft: '4px solid #dc2626',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                color: '#b91c1c',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>⚠️</span>
              <span>{formError}</span>
            </div>
          )}

          <div className="field-submit-bar">
            <button
              type="button"
              className="govt-btn-secondary"
              onClick={() => onNavigateTab('assigned')}
            >
              Back to Assigned List
            </button>

            {!isResolvedSuccess ? (
              <button
                type="submit"
                className="govt-btn-primary"
                disabled={isSubmitting || !proofPreview || !certifiedDeclaration}
              >
                {isSubmitting ? 'Verifying & Submitting...' : '✓ Submit Proof & Close Work Order'}
              </button>
            ) : (
              <span className="field-success-indicator">
                <span>🎉 Work Order Officially Closed</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
