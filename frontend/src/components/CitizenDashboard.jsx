import React, { useState, useEffect, useMemo } from 'react';
import CitizenNavBar from './citizen/CitizenNavBar.jsx';
import CivicIssueReporting from './citizen/CivicIssueReporting.jsx';
import ComplaintTracking from './citizen/ComplaintTracking.jsx';
import ComplaintHistory from './citizen/ComplaintHistory.jsx';
import CitizenFeedback from './citizen/CitizenFeedback.jsx';
import CitizenNotifications from './citizen/CitizenNotifications.jsx';

/**
 * Nagarmitra Citizen Service Portal (Report & Track)
 * ---------------------------------------------------
 * Modular Coordinator Component unifying 5 civic modules:
 * 1. Civic Issue Reporting (Form with AI Vision Pre-scan & GPS)
 * 2. Complaint Tracking (Live 5-stage milestone resolution tracker & photo verification)
 * 3. Complaint History (Searchable historical ticket log with status filters)
 * 4. Citizen Feedback (Post-resolution rating system with municipal review acknowledgment)
 * 5. Notifications (Alerts inbox with unread counter and direct ticket navigation)
 */
export default function CitizenDashboard({
  complaints = [],
  onAddComplaint,
  onNotification,
  initialSubTab = 'reporting',
  onSubTabChange,
  onSwitchTab,
}) {
  // Active module tab: 'reporting' | 'tracking' | 'history' | 'feedback' | 'notifications'
  const [activeTab, setActiveTab] = useState(initialSubTab);
  const [recentlyCreatedTicket, setRecentlyCreatedTicket] = useState(null);

  useEffect(() => {
    if (initialSubTab && initialSubTab !== activeTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (onSwitchTab) {
      onSwitchTab('citizen', tab);
    } else if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  // Selected complaint for Live Tracking tab
  const [selectedComplaintId, setSelectedComplaintId] = useState(() => {
    return complaints.length > 0 ? complaints[0].id : null;
  });

  const selectedComplaint = useMemo(() => {
    return complaints.find((c) => c.id === selectedComplaintId) || complaints[0] || null;
  }, [complaints, selectedComplaintId]);

  // Citizen Feedbacks State
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      complaint_id: 1,
      tracking_id: 'CIVIC-2026-00101',
      title: 'Severe Bitumen Pothole on Outer Ring Road',
      rating: 5,
      speed_rating: 5,
      quality_rating: 5,
      worker_rating: 5,
      comments: 'The municipal road crew did an exceptional job leveling the bitumen asphalt. Resolved within 24 hours of filing.',
      citizen_name: 'Aarav Sharma',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      municipal_reply: 'Thank you for keeping our roads safe. The Roads & Infrastructure Department has formally archived this ticket.',
    },
    {
      id: 2,
      complaint_id: 2,
      tracking_id: 'CIVIC-2026-00088',
      title: 'High-Voltage Streetlight Cable Sparking on Utility Pole',
      rating: 4,
      speed_rating: 4,
      quality_rating: 5,
      worker_rating: 4,
      comments: 'Prompt response by the electrical utility team. Pedestrian sidewalk is now brightly lit and secure.',
      citizen_name: 'Ananya Sharma',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      municipal_reply: 'Ward 8 Electrical Directorate acknowledges and appreciates your vigilance.',
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      complaint_id: 1,
      tracking_id: 'CIVIC-2026-00101',
      type: 'assigned',
      title: 'Field Operative Dispatched',
      message: 'Ramesh Kumar from Roads & Infrastructure has been dispatched to repair your reported road defect.',
      time: '1 hour ago',
      read: false,
      icon: '👷',
    },
    {
      id: 2,
      complaint_id: 2,
      tracking_id: 'CIVIC-2026-00102',
      type: 'triage',
      title: 'AI Vision Triage Confirmed',
      message: 'Sanitation & Waste Management confirmed priority triage with 92.1% confidence score.',
      time: '3 hours ago',
      read: false,
      icon: '🤖',
    },
    {
      id: 3,
      complaint_id: 3,
      tracking_id: 'CIVIC-2026-00103',
      type: 'progress',
      title: 'On-Site Work In Progress',
      message: 'Electrical crew is currently on-site at Shivaji Market Road repairing the exposed street pole wiring.',
      time: 'Yesterday',
      read: true,
      icon: '⚡',
    },
    {
      id: 4,
      complaint_id: 1,
      tracking_id: 'CIVIC-2026-00101',
      type: 'resolved',
      title: 'Resolution Proof Uploaded',
      message: 'Field worker Ramesh Kumar uploaded mandatory photographic proof of completed asphalt restoration.',
      time: 'Yesterday',
      read: true,
      icon: '✅',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle complaint creation from CivicIssueReporting
  const handleComplaintCreated = (newTicket) => {
    if (onAddComplaint) onAddComplaint(newTicket);

    const newNotif = {
      id: Date.now(),
      complaint_id: newTicket.id,
      tracking_id: newTicket.tracking_id,
      type: 'submitted',
      title: 'Complaint Registered',
      message: `Your grievance ${newTicket.tracking_id} has been registered and routed to ${newTicket.department_name}.`,
      time: 'Just now',
      read: false,
      icon: '📝',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setRecentlyCreatedTicket(newTicket);
    setSelectedComplaintId(newTicket.id);
    handleTabSwitch('tracking');

    if (onNotification) {
      onNotification(`Grievance ${newTicket.tracking_id} successfully registered and queued for field triage!`);
    }
  };

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const handleNotificationClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setSelectedComplaintId(notif.complaint_id);
    handleTabSwitch('tracking');
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (onNotification) onNotification('All notifications marked as read.');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub-Navigation & Header Banner */}
      <CitizenNavBar
        activeTab={activeTab}
        onTabSwitch={handleTabSwitch}
        complaintsCount={complaints.length}
        feedbacksCount={feedbacks.length}
        unreadCount={unreadCount}
        selectedComplaint={selectedComplaint}
      />

      {/* Module 1: Civic Issue Reporting */}
      {activeTab === 'reporting' && (
        <CivicIssueReporting
          onComplaintCreated={handleComplaintCreated}
          onNotification={onNotification}
          onTabSwitch={handleTabSwitch}
          onSwitchTab={onSwitchTab}
          complaintsCount={complaints.length}
        />
      )}

      {/* Module 2: Complaint Tracking */}
      {activeTab === 'tracking' && (
        <ComplaintTracking
          complaints={complaints}
          selectedComplaintId={selectedComplaintId}
          onSelectComplaint={setSelectedComplaintId}
          onNotification={onNotification}
          onRateResolution={(complaintId) => {
            setSelectedComplaintId(complaintId);
            handleTabSwitch('feedback');
          }}
          onSwitchTab={onSwitchTab}
          onTabSwitch={handleTabSwitch}
          recentlyCreatedTicket={recentlyCreatedTicket}
          onClearRecentTicket={() => setRecentlyCreatedTicket(null)}
        />
      )}

      {/* Module 3: Complaint History */}
      {activeTab === 'history' && (
        <ComplaintHistory
          complaints={complaints}
          onTrackComplaint={(complaintId) => {
            setSelectedComplaintId(complaintId);
            handleTabSwitch('tracking');
          }}
          onRateComplaint={(complaintId) => {
            setSelectedComplaintId(complaintId);
            handleTabSwitch('feedback');
          }}
        />
      )}

      {/* Module 4: Citizen Feedback & Ratings */}
      {activeTab === 'feedback' && (
        <CitizenFeedback
          complaints={complaints}
          feedbacks={feedbacks}
          onAddFeedback={handleAddFeedback}
          preselectedComplaintId={selectedComplaintId}
          onNotification={onNotification}
        />
      )}

      {/* Module 5: Notifications */}
      {activeTab === 'notifications' && (
        <CitizenNotifications
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
    </div>
  );
}
