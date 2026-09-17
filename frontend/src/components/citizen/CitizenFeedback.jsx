import React, { useState, useEffect } from 'react';

/**
 * CitizenFeedback Component
 * -------------------------
 * Citizen satisfaction rating submission form (1-5 stars, criteria breakdown, comments)
 * and verified municipal feedback stream with official acknowledgments.
 */
export default function CitizenFeedback({
  complaints = [],
  feedbacks = [],
  onAddFeedback,
  preselectedComplaintId = null,
  onNotification,
  currentUser = null,
}) {
  const [feedbackForm, setFeedbackForm] = useState({
    complaint_id: preselectedComplaintId || complaints.find((c) => c.status === 'resolved')?.id || (complaints[0] ? complaints[0].id : ''),
    rating: 5,
    speed_rating: 5,
    quality_rating: 5,
    worker_rating: 5,
    comments: '',
  });

  useEffect(() => {
    if (preselectedComplaintId) {
      setFeedbackForm((prev) => ({ ...prev, complaint_id: preselectedComplaintId }));
    }
  }, [preselectedComplaintId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const linkedComplaint = complaints.find((c) => c.id === Number(feedbackForm.complaint_id));
    if (!linkedComplaint) {
      if (onNotification) onNotification('Please select a valid complaint to review.');
      return;
    }

    const newFeedback = {
      id: Date.now(),
      complaint_id: linkedComplaint.id,
      tracking_id: linkedComplaint.tracking_id,
      title: linkedComplaint.title,
      rating: feedbackForm.rating,
      speed_rating: feedbackForm.speed_rating,
      quality_rating: feedbackForm.quality_rating,
      worker_rating: feedbackForm.worker_rating,
      comments: feedbackForm.comments || 'Satisfied with municipal resolution.',
      citizen_name: currentUser?.full_name || 'Verified Citizen',
      created_at: new Date().toISOString(),
      municipal_reply: 'Municipal Citizen Care Directorate: Your review has been recorded in the departmental public audit registry.',
    };

    if (onAddFeedback) {
      onAddFeedback(newFeedback);
    }

    if (onNotification) {
      onNotification('Thank you! Your citizen satisfaction review has been logged with the municipal commissioner.');
    }

    setFeedbackForm({
      complaint_id: complaints.find((c) => c.status === 'resolved')?.id || (complaints[0] ? complaints[0].id : ''),
      rating: 5,
      speed_rating: 5,
      quality_rating: 5,
      worker_rating: 5,
      comments: '',
    });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.75rem' }}>
      {/* Feedback Form Card */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⭐</span>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Citizen Satisfaction Feedback
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              Rate the quality, speed, and professionalism of municipal ground repairs.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Select Resolved Complaint */}
          <div className="govt-form-group">
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>
              Select Grievance to Review <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              className="form-select"
              value={feedbackForm.complaint_id}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, complaint_id: e.target.value })}
              required
            >
              {complaints.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.tracking_id} - {c.title} ({c.status.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Overall Star Rating */}
          <div className="govt-form-group">
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>
              Overall Experience Rating (1 to 5 Stars)
            </label>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="star-btn"
                  onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                  title={`${star} Stars`}
                  aria-label={`Rate ${star} out of 5 stars`}
                >
                  {star <= feedbackForm.rating ? '⭐' : '☆'}
                </button>
              ))}
              <span style={{ marginLeft: '0.75rem', fontSize: '0.9rem', fontWeight: 700, color: '#16A34A', alignSelf: 'center' }}>
                {feedbackForm.rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Criteria Ratings Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', background: '#F8F9F6', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>Resolution Speed</div>
              <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.1rem', color: s <= feedbackForm.speed_rating ? '#EAB308' : '#CBD5E1' }}
                    onClick={() => setFeedbackForm({ ...feedbackForm, speed_rating: s })}
                    aria-label={`Rate resolution speed ${s} of 5`}
                  >
                    {s <= feedbackForm.speed_rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>Repair Quality</div>
              <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.1rem', color: s <= feedbackForm.quality_rating ? '#EAB308' : '#CBD5E1' }}
                    onClick={() => setFeedbackForm({ ...feedbackForm, quality_rating: s })}
                    aria-label={`Rate repair quality ${s} of 5`}
                  >
                    {s <= feedbackForm.quality_rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>Staff Behavior</div>
              <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.1rem', color: s <= feedbackForm.worker_rating ? '#EAB308' : '#CBD5E1' }}
                    onClick={() => setFeedbackForm({ ...feedbackForm, worker_rating: s })}
                    aria-label={`Rate staff behavior ${s} of 5`}
                  >
                    {s <= feedbackForm.worker_rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comments Textarea */}
          <div className="govt-form-group">
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>
              Citizen Comments & Suggestions
            </label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Tell us about the completed work: was the site cleaned up? Did the issue resolve properly?"
              value={feedbackForm.comments}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, comments: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="govt-btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.96rem' }}
          >
            Submit Citizen Review
          </button>
        </form>
      </div>

      {/* Existing Verified Reviews Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
          Public Feedback & Municipal Replies
        </div>

        {feedbacks.map((f) => (
          <div
            key={f.id}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>
                {f.citizen_name}
              </div>
              <div style={{ color: '#F4B740', fontSize: '1rem', letterSpacing: '2px' }}>
                {'⭐'.repeat(f.rating)}
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600, fontFamily: 'monospace', marginBottom: '0.35rem' }}>
              {f.tracking_id} • {f.title}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.45, margin: '0 0 0.85rem 0' }}>
              "{f.comments}"
            </p>

            {/* Municipal Reply */}
            {f.municipal_reply && (
              <div
                style={{
                  background: '#f0fdf4',
                  borderLeft: '3px solid #16A34A',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '3px',
                  fontSize: '0.78rem',
                  color: '#16A34A',
                }}
              >
                <strong>🏛️ Municipal Acknowledgment:</strong> {f.municipal_reply}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
