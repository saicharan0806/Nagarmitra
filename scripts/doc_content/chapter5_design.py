"""
Chapter 5: System Architecture and Detailed Design
Comprehensive academic chapter detailing 3-tier architecture, DFD Levels 0/1/2,
UML Use Cases, complete ER schema, Data Dictionary, and Sequence Diagrams.
"""

from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from .helpers import (
    add_chapter_heading, add_heading2, add_heading3, add_body, add_bullet,
    set_cell_background, set_cell_margins, set_table_borders
)

def build_chapter5(doc):
    add_chapter_heading(doc, 5, "SYSTEM ARCHITECTURE AND DETAILED DESIGN")

    add_heading2(doc, "5.1 High-Level Three-Tier Enterprise Architecture")
    add_body(
        doc,
        "CivicSync implements an enterprise-grade Three-Tier Architecture comprising the Presentation Tier, the Application "
        "and Deep Learning Inference Tier, and the Data Persistence Tier. This design pattern enforces strict decoupling between "
        "the presentation logic, compute-intensive tensor convolutions, and relational data storage."
    )
    add_body(
        doc,
        "+=============================================================================+\n"
        "|                       PRESENTATION TIER (CLIENT BROWSER)                    |\n"
        "|  +-----------------------+ +-----------------------+ +--------------------+ |\n"
        "|  | Citizen Portal (SPA)  | | Admin Command Center  | | Field Operations   | |\n"
        "|  | - Camera / File Input | | - KPI Analytics       | | - Active Work Order| |\n"
        "|  | - Leaflet OpenStreetMap| | - SLA Countdown Heatmap| - Proof-of-Work Cam| |\n"
        "|  | - Real-Time Status    | | - Worker Load Matrix  | | - One-Tap Resolve  | |\n"
        "|  +-----------------------+ +-----------------------+ +--------------------+ |\n"
        "|                              ^                   ^                          |\n"
        "|                              | (BroadcastChannel)|                          |\n"
        "|                              v                   v                          |\n"
        "|  +------------------------------------------------------------------------+ |\n"
        "|  |  tabSync.js (Zero-Latency Cross-Tab Client Messaging Event Bus)         | |\n"
        "|  +------------------------------------------------------------------------+ |\n"
        "+======================================|======================================+\n"
        "                                       | HTTPS / REST (JSON & Multipart)\n"
        "                                       v\n"
        "+=============================================================================+\n"
        "|                 APPLICATION & AI INFERENCE TIER (PYTHON FLASK)               |\n"
        "|  +------------------------------------------------------------------------+ |\n"
        "|  | Flask Web Application Entrypoint (backend/app.py)                      | |\n"
        "|  | - Blueprint Router (Auth, Issues, AI, Analytics, Health)               | |\n"
        "|  | - CORS Headers Middleware & Session Authorization                      | |\n"
        "|  | - Werkzeug Secure File Upload Handler (UUID Naming)                    | |\n"
        "|  +------------------------------------------------------------------------+ |\n"
        "|              |                                              |               |\n"
        "|              v (Raw Image Tensor)                           v (SQLAlchemy)  |\n"
        "|  +-------------------------------------+      +---------------------------+ |\n"
        "|  | AI Tensor Engine (ai_service/yolo.py)|      | SQLAlchemy 2.0 ORM Engine | |\n"
        "|  | - Ultralytics YOLOv8 Pre-Warmed     |      | - Transaction Pool Mgr    | |\n"
        "|  | - 640x640 Bilinear Resampling       |      | - Cascading Integrity     | |\n"
        "|  | - Bounding Box Regression & NMS     |      | - Query Parameterization  | |\n"
        "|  | - Multi-Factor Severity Scoring     |      | - Entity Relational Mapper| |\n"
        "|  +-------------------------------------+      +---------------------------+ |\n"
        "+=============================================================|===============+\n"
        "                                                              v\n"
        "+=============================================================================+\n"
        "|                       DATA PERSISTENCE TIER (STORAGE)                       |\n"
        "|  +---------------------------------------+ +------------------------------+ |\n"
        "|  | MySQL 8.0 Relational Database Engine   | | Local / S3 File Storage      | |\n"
        "|  | - users, departments, workers tables  | | - Citizen Defect Photographs | |\n"
        "|  | - complaints, complaint_logs tables   | | - Worker Resolution Proofs   | |\n"
        "|  | - feedback, analytics cache tables    | | - UUID-Indexed Disk Assets   | |\n"
        "|  +---------------------------------------+ +------------------------------+ |\n"
        "+=============================================================================+",
        bold_prefix="Figure 5.1: High-Level Three-Tier Enterprise Architecture Diagram:\n"
    )

    add_heading2(doc, "5.2 Layer-by-Layer Architectural Decomposition")
    add_bullet(
        doc,
        "Executed in the user's web browser as an asynchronous Single-Page Application. Encapsulates all rendering logic, "
        "client-side validation, image compression, Leaflet GIS coordinate pinning, and dynamic timeline rendering. Communicates "
        "with the backend exclusively via asynchronous HTTP fetch requests.",
        bold_prefix="1. Presentation Tier (Client Layer): "
    )
    add_bullet(
        doc,
        "The central coordination hub running Flask on port 5000. It authenticates sessions, sanitizes file uploads, calculates "
        "SLA expiration timestamps, and routes images to the embedded deep learning pipeline.",
        bold_prefix="2. Application Service Tier (Middleware): "
    )
    add_bullet(
        doc,
        "Encapsulated in `ai_service/yolo.py`. When an image upload occurs, this singleton service ingests the file, resizes "
        "tensors to 640x640, performs forward-pass inference, filters detections at a confidence threshold of 0.40, and computes "
        "the quantitative severity index.",
        bold_prefix="3. AI Inference Subsystem: "
    )
    add_bullet(
        doc,
        "Comprises MySQL 8.0 for relational metadata (tables, indexes, foreign keys) and a structured file directory (`uploads/`) "
        "for binary photographic evidence. Cryptographic UUID prefixes ensure zero filename collision across millions of submissions.",
        bold_prefix="4. Data Persistence Tier: "
    )

    add_heading2(doc, "5.3 Data Flow Diagrams (DFD)")
    add_body(
        doc,
        "Data Flow Diagrams model the movement, transformation, and storage of grievance data as it traverses the system:",
        bold_prefix="DFD Specifications: "
    )

    add_heading3(doc, "DFD Level 0: Context Level Diagram")
    add_body(
        doc,
        "The Level 0 context diagram defines the boundary of the CivicSync system in relation to the three external entities:\n\n"
        "  +-----------+           (Photo, GPS, Title, Description)           +-------------+\n"
        "  |           | ---------------------------------------------------> |             |\n"
        "  |  CITIZEN  | <--------------------------------------------------- |             |\n"
        "  |           |            (Tracking ID, Status, AI Triage)          |             |\n"
        "  +-----------+                                                      |  CIVICSYNC  |\n"
        "                                                                     |   SYSTEM    |\n"
        "  +-----------+              (Assigned Work Orders)                  |  BOUNDARY   |\n"
        "  |   FIELD   | <--------------------------------------------------- |             |\n"
        "  |  WORKER   | ---------------------------------------------------> |             |\n"
        "  +-----------+       (After-Resolution Photo, Status Update)        |             |\n"
        "                                                                     |             |\n"
        "  +-----------+          (KPI Metrics, Heatmaps, SLA Health)         |             |\n"
        "  | MUNICIPAL | <--------------------------------------------------- |             |\n"
        "  |   ADMIN   | ---------------------------------------------------> |             |\n"
        "  +-----------+          (Manual Reassignments, Dept Config)         +-------------+",
        bold_prefix="Figure 5.2: Data Flow Diagram Level 0 (Context Level Diagram):\n"
    )

    add_heading3(doc, "DFD Level 1: Subsystem Decomposed Diagram")
    add_body(
        doc,
        "Level 1 decomposes the CivicSync system boundary into five core interacting processes:\n"
        "1. Process 1.0 (Auth & Session Management): Validates citizen, admin, and worker credentials.\n"
        "2. Process 2.0 (Grievance Ingestion & File Upload): Streams image to disk, extracts GPS coordinates, and passes tensor to AI.\n"
        "3. Process 3.0 (AI Triage & Severity Estimation): Invokes YOLOv8, classifies defect, calculates severity, assigns SLA.\n"
        "4. Process 4.0 (Work Order Dispatch & Proof Engine): Routes work order to field personnel, validates after-repair photo.\n"
        "5. Process 5.0 (Analytics & Cross-Tab Event Bus): Computes ward KPIs and emits real-time events via BroadcastChannel."
    )

    add_heading2(doc, "5.4 UML Use Case Diagrams and Actor Specifications")
    add_body(
        doc,
        "The system models three primary actors and fourteen formal use cases:",
        bold_prefix="Actor-Use Case Specifications: "
    )
    add_bullet(doc, "UC-01 (Report Grievance), UC-02 (Upload Photo), UC-03 (Pin Map Location), UC-04 (Track Grievance), UC-05 (Submit 5-Star Feedback).", bold_prefix="Actor: Citizen -> ")
    add_bullet(doc, "UC-06 (View Assigned Work Orders), UC-07 (Navigate to Defect GPS), UC-08 (Update Status to In-Progress), UC-09 (Upload Resolution Proof Photo), UC-10 (Close Work Order).", bold_prefix="Actor: Field Worker -> ")
    add_bullet(doc, "UC-11 (View Executive Dashboard), UC-12 (Analyze Ward Defect Heatmaps), UC-13 (Monitor SLA Expirations), UC-14 (Reassign Workers and Manage Departments).", bold_prefix="Actor: Municipal Admin -> ")

    add_heading2(doc, "5.5 Entity-Relationship (ER) Schema and Complete Data Dictionary")
    add_body(
        doc,
        "The relational database schema is normalized to Third Normal Form (3NF) to eliminate insertion, update, and deletion anomalies. "
        "The following Data Dictionary provides the complete technical specification for all six database entities:"
    )

    # Table 5.1: Complete Data Dictionary Table
    t_dd = doc.add_table(rows=25, cols=5)
    t_dd.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_dd)

    dd_headers = ["Table Name", "Field Name", "Data Type", "Constraints / Keys", "Description"]
    dd_data = [
        ("users", "id", "INT", "PK, AUTO_INCREMENT", "Unique identifier for user account."),
        ("users", "name", "VARCHAR(100)", "NOT NULL", "Full legal name of the user."),
        ("users", "email", "VARCHAR(120)", "UNIQUE, NOT NULL", "Email address used for authentication."),
        ("users", "role", "ENUM('citizen','admin','field_worker')", "NOT NULL, DEFAULT 'citizen'", "Role-Based Access Control identifier."),
        ("users", "phone", "VARCHAR(20)", "NULLABLE", "Contact phone number for SMS notifications."),
        ("users", "created_at", "DATETIME", "NOT NULL, DEFAULT NOW()", "Timestamp of account registration."),
        ("departments", "id", "INT", "PK, AUTO_INCREMENT", "Unique department identifier."),
        ("departments", "name", "VARCHAR(100)", "UNIQUE, NOT NULL", "Name (Roads, Sanitation, Water, Electrical)."),
        ("departments", "sla_hours", "INT", "NOT NULL, DEFAULT 48", "Standard resolution deadline in hours."),
        ("workers", "id", "INT", "PK, AUTO_INCREMENT", "Unique field worker record identifier."),
        ("workers", "user_id", "INT", "FK -> users(id), ON DELETE CASCADE", "Links worker record to authentication user."),
        ("workers", "department_id", "INT", "FK -> departments(id)", "Department to which worker is assigned."),
        ("workers", "status", "ENUM('available','busy','offline')", "NOT NULL, DEFAULT 'available'", "Current field availability state."),
        ("complaints", "id", "INT", "PK, AUTO_INCREMENT", "Internal primary key for grievance record."),
        ("complaints", "tracking_id", "VARCHAR(36)", "UNIQUE, NOT NULL, INDEXED", "Public UUID tracking code for citizens."),
        ("complaints", "citizen_id", "INT", "FK -> users(id)", "Citizen user who submitted the grievance."),
        ("complaints", "category", "VARCHAR(50)", "NOT NULL, INDEXED", "Category inferred by AI or selected by citizen."),
        ("complaints", "status", "ENUM('pending','in_progress','resolved')", "NOT NULL, DEFAULT 'pending'", "Current lifecycle state of the ticket."),
        ("complaints", "latitude", "DECIMAL(10, 8)", "NOT NULL", "WGS-84 Geographic Latitude coordinate."),
        ("complaints", "longitude", "DECIMAL(11, 8)", "NOT NULL", "WGS-84 Geographic Longitude coordinate."),
        ("complaints", "image_url", "VARCHAR(255)", "NOT NULL", "Path to initial defect photo on disk."),
        ("complaints", "resolution_image_url", "VARCHAR(255)", "NULLABLE", "Path to on-site after-repair photo."),
        ("complaints", "ai_confidence", "FLOAT", "NULLABLE", "Ultralytics YOLOv8 confidence score (0.0 to 1.0)."),
        ("complaint_logs", "id", "INT", "PK, AUTO_INCREMENT", "Unique chronological audit log entry."),
    ]

    col_w_dd = [Inches(1.2), Inches(1.3), Inches(1.3), Inches(1.7), Inches(1.7)]

    for c_idx, htext in enumerate(dd_headers):
        cell = t_dd.rows[0].cells[c_idx]
        cell.width = col_w_dd[c_idx]
        cell.text = htext
        set_cell_background(cell, "002244")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(9.5)
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)

    for r_idx, row_values in enumerate(dd_data):
        row = t_dd.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.width = col_w_dd[c_idx]
            cell.text = val
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx in [0, 2] else WD_ALIGN_PARAGRAPH.LEFT
            p.runs[0].font.size = Pt(8.5)
            set_cell_margins(cell, top=60, bottom=60, left=70, right=70)
            if r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    add_body(doc, "Table 5.1: Complete Database Entity and Data Dictionary Specification (All Tables).")

    add_heading2(doc, "5.6 Sequence Diagrams: Core System Transactions")
    add_body(
        doc,
        "The interaction sequence for grievance reporting and resolution follows a strict chronological order:\n\n"
        "Citizen Browser           Flask API Server              YOLOv8 Engine          MySQL Database\n"
        "      |                          |                            |                      |\n"
        "      |--- 1. POST /api/issues ->|                            |                      |\n"
        "      |    (photo, lat, lng)     |--- 2. classify_image() --->|                      |\n"
        "      |                          |                            |                      |\n"
        "      |                          |<-- 3. (class, conf, bboxes)|                      |\n"
        "      |                          |                            |                      |\n"
        "      |                          |--- 4. INSERT INTO complaints -------------------->|\n"
        "      |                          |<-- 5. Return complaint_id (201 Created) ----------|\n"
        "      |<-- 6. HTTP 201 Created --|                            |                      |\n"
        "      |    (tracking_id, status) |                            |                      |",
        bold_prefix="Sequence 1: Citizen Grievance Reporting Flow:\n"
    )
