"""
Chapter 7: System Features and Deep Functional Walkthrough
Comprehensive academic chapter detailing feature matrices, YOLOv8 detection,
Leaflet GIS clustering, SLA countdowns, Proof-of-Resolution, and feedback loops.
"""

from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from .helpers import (
    add_chapter_heading, add_heading2, add_heading3, add_body, add_bullet,
    set_cell_background, set_cell_margins, set_table_borders
)

def build_chapter7(doc):
    add_chapter_heading(doc, 7, "SYSTEM FEATURES AND FUNCTIONAL WALKTHROUGH")

    add_heading2(doc, "7.1 Comprehensive Role-Based Feature Matrix")
    add_body(
        doc,
        "CivicSync incorporates a multifaceted feature suite designed to deliver specialized capabilities to each participant "
        "in the municipal redressal ecosystem. The following matrix outlines these capabilities across the three operational roles:"
    )

    # Table 7.1: Feature Matrix
    t_feat = doc.add_table(rows=8, cols=4)
    t_feat.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_feat)

    feat_headers = ["Feature Name", "Target User Role", "Underlying Technical Subsystem", "Primary Value Delivered"]
    feat_data = [
        ("AI Defect Triage", "Citizen & Admin", "Ultralytics YOLOv8 Tensor Engine", "Sub-500ms automated classification; zero manual clerical sorting."),
        ("GIS Defect Mapping", "Citizen & Admin", "Leaflet JS + OpenStreetMap Tiles", "Interactive geo-spatial visualization; defect clustering by ward."),
        ("Dynamic SLA Timer", "Citizen, Worker, Admin", "SQLAlchemy Timestamp Engine", "Real-time countdown to resolution deadline; visual escalation."),
        ("Proof-of-Resolution", "Field Worker & Citizen", "Dual-Image Comparison Subsystem", "Eliminates premature ticket closures through mandatory photo proof."),
        ("Cross-Tab Event Sync", "All Roles", "HTML5 BroadcastChannel Event Bus", "Zero-latency multi-window UI updates without polling overhead."),
        ("Public Audit Timeline", "Citizen & Admin", "Immutable complaint_logs Table", "Chronological audit trail of every status transition and note."),
        ("5-Star Feedback Loop", "Citizen & Admin", "Feedback Persistence Controller", "Citizen satisfaction ratings empowering contractor evaluation."),
    ]

    col_w_feat = [Inches(1.5), Inches(1.5), Inches(2.2), Inches(2.0)]

    for c_idx, htext in enumerate(feat_headers):
        cell = t_feat.rows[0].cells[c_idx]
        cell.width = col_w_feat[c_idx]
        cell.text = htext
        set_cell_background(cell, "002244")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(9.5)
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)

    for r_idx, row_values in enumerate(feat_data):
        row = t_feat.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.width = col_w_feat[c_idx]
            cell.text = val
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx in [0, 1] else WD_ALIGN_PARAGRAPH.LEFT
            p.runs[0].font.size = Pt(9)
            set_cell_margins(cell, top=70, bottom=70, left=80, right=80)
            if r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    add_body(doc, "Table 7.1: Feature Matrix Across Citizen, Field Worker, and Administrative Roles.")

    add_heading2(doc, "7.2 Automated AI Visual Defect Triage")
    add_body(
        doc,
        "When a citizen selects a photo from their camera roll or captures live imagery, CivicSync initiates instantaneous "
        "inference through the embedded YOLOv8 model. The model detects multiple co-occurring defects within a single scene "
        "(for example, identifying both a road crater and adjacent overflowing garbage). The client interface immediately renders "
        "an AI Preview Card showing the detected class, the confidence percentage (e.g., 'Pothole: 94.6% Confidence'), and the "
        "assigned municipal department. This real-time feedback reassures the citizen that their report has been quantitatively analyzed "
        "before they even click the final submission button."
    )

    add_heading2(doc, "7.3 Interactive Leaflet GIS Geo-Spatial Defect Map")
    add_body(
        doc,
        "The GIS mapping subsystem converts abstract civic data into actionable spatial intelligence. Utilizing Leaflet.js "
        "and OpenStreetMap vector tiles, all active grievances across the municipal territory are plotted with color-coded "
        "status markers (Amber for Pending, Blue for In-Progress, Emerald Green for Verified Resolution). In high-density defect "
        "zones—such as an arterial road with multiple potholes following a heavy monsoon deluge—markers automatically cluster "
        "into interactive numbered bubbles. Clicking a cluster smoothly zooms the viewport into street-level resolution, allowing "
        "municipal engineers to evaluate localized defect density."
    )

    add_heading2(doc, "7.4 Dynamic SLA Countdown Timer and Visual Escalation Engine")
    add_body(
        doc,
        "Accountability is enforced through transparent time-to-resolution tracking. Each municipal department has a strict "
        "Service Level Agreement (e.g., Solid Waste Management: 24 Hours; Roads and Pavements: 48 Hours; Streetlight Infrastructure: 12 Hours). "
        "Upon complaint creation, CivicSync calculates the exact expiration timestamp (`expires_at = created_at + sla_hours`). "
        "The frontend renders an active countdown timer displaying hours, minutes, and seconds remaining. When less than 25% of the "
        "SLA window remains, the ticket badge shifts from calm blue to flashing amber; if the SLA expires, the ticket transitions to "
        "crimson 'Escalated' status, elevating the complaint to the Municipal Commissioner's urgent review queue."
    )

    add_heading2(doc, "7.5 Before & After Proof-of-Resolution Verification Engine")
    add_body(
        doc,
        "To solve the universal problem of contractor fraud and premature ticket closure, CivicSync enforces a mandatory "
        "dual-image verification protocol. Field workers dispatched to a defect site are physically prevented from clicking "
        "'Resolve Ticket' until an on-site 'After' photograph is uploaded via the mobile camera. The system generates a side-by-side "
        "comparative display: the citizen's initial photograph of the road crater is juxtaposed directly with the worker's photograph "
        "of the newly compacted asphalt patch. This photographic evidence is permanently linked to the public tracking record, "
        "guaranteeing total transparency."
    )

    add_heading2(doc, "7.6 Real-Time Cross-Window Event Propagation via BroadcastChannel")
    add_body(
        doc,
        "In modern operational scenarios, administrators, dispatchers, and citizens frequently operate across multiple browser "
        "tabs and windows. CivicSync eliminates the need for expensive WebSocket servers or battery-draining polling loops "
        "by utilizing the HTML5 `BroadcastChannel` API. Status transitions, new issue submissions, and resolution proofs are "
        "broadcast across all client instances on the user's workstation in under 5 milliseconds. An administrator resolving an "
        "issue in Tab 1 instantly updates the citizen's live tracking card in Tab 2, delivering a modern, desktop-class reactive experience."
    )

    add_heading2(doc, "7.7 Citizen Feedback, 5-Star Ratings, and Immutable Audit Logs")
    add_body(
        doc,
        "Following ticket resolution, the citizen receives a prompt to rate the quality and promptness of the repair on a "
        "1-to-5 star scale and submit qualitative feedback. This feedback is persisted into the database and linked to the assigned "
        "field worker and department ID. Municipal commissioners can view aggregated citizen satisfaction scores across wards, "
        "providing empirical data for annual municipal contractor reviews and worker performance bonuses."
    )
