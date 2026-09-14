import React, { useState, useMemo, useEffect } from 'react';

/**
 * ComplaintHistory Component
 * --------------------------
 * Complete historical registry of complaints filed by citizens, with summary
 * metrics, status filter pills, keyword search, client-side pagination, and fast navigation to tracking/feedback.
 */
export default function ComplaintHistory({
  complaints = [],
  onTrackComplaint,
  onRateComplaint,
}) {
  const [historyFilter, setHistoryFilter] = useState('all');
  const [historySearch, setHistorySearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredHistory = useMemo(() => {
    return complaints.filter((c) => {
      const matchesFilter =
        historyFilter === 'all' ||
        (historyFilter === 'pending' && c.status === 'pending') ||
        (historyFilter === 'assigned' && c.status === 'assigned') ||
        (historyFilter === 'in_progress' && c.status === 'in_progress') ||
        (historyFilter === 'resolved' && c.status === 'resolved');

      const matchesSearch =
        !historySearch ||
        c.title.toLowerCase().includes(historySearch.toLowerCase()) ||
        c.tracking_id.toLowerCase().includes(historySearch.toLowerCase()) ||
        c.address.toLowerCase().includes(historySearch.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [complaints, historyFilter, historySearch]);

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [historyFilter, historySearch]);

  const totalPages = Math.ceil(filteredHistory.length / pageSize) || 1;
  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredHistory.slice(start, start + pageSize);
  }, [filteredHistory, currentPage, pageSize]);

  const pendingCount = complaints.filter((c) => c.status === 'pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'assigned' || c.status === 'in_progress').length;
  const assignedCount = complaints.filter((c) => c.status === 'assigned').length;
  const inProgressSpecificCount = complaints.filter((c) => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Summary Stat Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #16A34A', borderRadius: '8px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Total Reported</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginTop: '0.35rem' }}>{complaints.length}</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #F4B740', borderRadius: '8px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Pending Triage</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#F4B740', lineHeight: 1.1, marginTop: '0.35rem' }}>
            {pendingCount}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #2563EB', borderRadius: '8px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>In Progress / Assigned</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#2563EB', lineHeight: 1.1, marginTop: '0.35rem' }}>
            {inProgressCount}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #16A34A', borderRadius: '8px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Resolved & Verified</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#16A34A', lineHeight: 1.1, marginTop: '0.35rem' }}>
            {resolvedCount}
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="civic-filter-toolbar">
        {/* Status Pills */}
        <div className="civic-filter-group" role="tablist" aria-label="Filter Complaints by Status">
          <button
            type="button"
            className={`civic-filter-pill ${historyFilter === 'all' ? 'active' : ''}`}
            onClick={() => setHistoryFilter('all')}
          >
            <span className="civic-filter-dot dot-all" />
            <span className="civic-filter-label">All</span>
            <span className="civic-filter-count">{complaints.length}</span>
          </button>

          <button
            type="button"
            className={`civic-filter-pill pill-pending ${historyFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setHistoryFilter('pending')}
          >
            <span className="civic-filter-dot dot-pending" />
            <span className="civic-filter-label">Pending</span>
            <span className="civic-filter-count">{pendingCount}</span>
          </button>

          <button
            type="button"
            className={`civic-filter-pill pill-assigned ${historyFilter === 'assigned' ? 'active' : ''}`}
            onClick={() => setHistoryFilter('assigned')}
          >
            <span className="civic-filter-dot dot-assigned" />
            <span className="civic-filter-label">Assigned</span>
            <span className="civic-filter-count">{assignedCount}</span>
          </button>

          <button
            type="button"
            className={`civic-filter-pill pill-in_progress ${historyFilter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setHistoryFilter('in_progress')}
          >
            <span className="civic-filter-dot dot-in_progress" />
            <span className="civic-filter-label">In Progress</span>
            <span className="civic-filter-count">{inProgressSpecificCount}</span>
          </button>

          <button
            type="button"
            className={`civic-filter-pill pill-resolved ${historyFilter === 'resolved' ? 'active' : ''}`}
            onClick={() => setHistoryFilter('resolved')}
          >
            <span className="civic-filter-dot dot-resolved" />
            <span className="civic-filter-label">Resolved</span>
            <span className="civic-filter-count">{resolvedCount}</span>
          </button>
        </div>

        {/* Keyword Search */}
        <div className="civic-filter-search-wrap">
          <span className="civic-filter-search-icon">🔍</span>
          <input
            type="text"
            className="civic-filter-search-input"
            placeholder="Search title, tracking ID, or ward..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
          />
          {historySearch && (
            <button
              type="button"
              className="civic-filter-search-clear"
              onClick={() => setHistorySearch('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* History Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div key={item.id} className="history-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700, color: '#16A34A', background: '#dcfce7', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid #86efac' }}>
                    {item.tracking_id}
                  </span>
                  <span className={`badge badge-${item.status}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Submitted {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="govt-btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
                    onClick={() => onTrackComplaint && onTrackComplaint(item.id)}
                  >
                    🔍 Track Live Status
                  </button>

                  {item.status === 'resolved' && (
                    <button
                      type="button"
                      style={{
                        background: '#ffffff',
                        color: '#16A34A',
                        border: '1px solid #16A34A',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onClick={() => onRateComplaint && onRateComplaint(item.id)}
                    >
                      ⭐ Rate
                    </button>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 0.35rem 0' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 0.75rem 0' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid #E2E8F0', paddingTop: '0.65rem' }}>
                <div>📍 {item.address}</div>
                <div>
                  Department: <strong>{item.department_name}</strong>
                  {item.assigned_worker_name && <span> • Worker: <strong>{item.assigned_worker_name}</strong></span>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '3rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center', color: '#64748b' }}>
            No complaints found matching this filter.
          </div>
        )}
      </div>
    </div>
  );
}
