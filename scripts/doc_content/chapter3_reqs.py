"""
Chapter 3: System Requirements Specification
Detailed academic specifications covering hardware, software, functional requirements (FRS),
non-functional requirements (NFRS), and development toolchains.
"""

from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from .helpers import (
    add_chapter_heading, add_heading2, add_heading3, add_body, add_bullet,
    set_cell_background, set_cell_margins, set_table_borders
)

def build_chapter3(doc):
    add_chapter_heading(doc, 3, "SYSTEM REQUIREMENTS SPECIFICATION")

    add_heading2(doc, "3.1 Hardware Requirements Specification")
    add_body(
        doc,
        "The hardware architecture for CivicSync is designed to strike an optimal balance between computational efficiency, "
        "model inference throughput, and infrastructural cost. Unlike heavy transformer models that demand enterprise-tier GPU "
        "clusters, the Ultralytics YOLOv8 nano model (`yolov8n.pt`) is optimized for low-latency CPU and edge execution."
    )

    # Table 3.1: Hardware Specification Matrix
    t_hw = doc.add_table(rows=6, cols=4)
    t_hw.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_hw)

    hw_headers = ["Component", "Minimum Development Specification", "Recommended Production Specification", "Client Workstation Specification"]
    hw_data = [
        ("Processor (CPU)", "Intel Core i5 (8th Gen) / AMD Ryzen 5 (4 Cores, 8 Threads)", "Intel Xeon E5 / AMD EPYC (8+ Cores, 2.8+ GHz)", "Any modern Dual-Core / Quad-Core CPU (x86 or ARM)"),
        ("System Memory (RAM)", "8 GB DDR4 @ 2400 MHz", "16 GB to 32 GB ECC DDR4/DDR5", "4 GB RAM (Mobile: 2 GB RAM)"),
        ("Storage / Disk", "256 GB NVMe SSD (20 GB allocated for project)", "512 GB NVMe SSD with RAID-1 redundancy", "Standard device flash storage (100 MB cache)"),
        ("Graphics (GPU)", "Integrated Intel UHD 630 / AMD Radeon Vega", "NVIDIA Tesla T4 / RTX 3060 (8+ GB VRAM, CUDA 11.8+)", "WebGL 2.0 compatible hardware accelerator"),
        ("Network Interface", "100 Mbps Ethernet / Wi-Fi 5 (802.11ac)", "1 Gbps dedicated full-duplex fiber connection", "3G / 4G / 5G Cellular or Broadband Wi-Fi"),
    ]

    col_w_hw = [Inches(1.5), Inches(2.0), Inches(2.0), Inches(1.7)]

    for c_idx, htext in enumerate(hw_headers):
        cell = t_hw.rows[0].cells[c_idx]
        cell.width = col_w_hw[c_idx]
        cell.text = htext
        set_cell_background(cell, "002244")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(9.5)
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)

    for r_idx, row_values in enumerate(hw_data):
        row = t_hw.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.width = col_w_hw[c_idx]
            cell.text = val
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx == 0 else WD_ALIGN_PARAGRAPH.LEFT
            p.runs[0].font.size = Pt(9)
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            if r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    add_body(doc, "Table 3.1: Hardware Specification Matrix for Server, Client, and Edge Environments.")

    add_heading2(doc, "3.2 Software Requirements Specification")
    add_bullet(
        doc,
        "Microsoft Windows 10/11 (64-bit) for local development; Ubuntu Linux 22.04 LTS (Jammy Jellyfish) for containerized "
        "production staging and cloud hosting.",
        bold_prefix="1. Host Operating System: "
    )
    add_bullet(
        doc,
        "Python 3.10+ (specifically validated on Python 3.14.7 64-bit) with isolated virtual environments (`venv`). "
        "Node.js v18.16.0+ LTS and npm v9.5.0+ package manager.",
        bold_prefix="2. Execution Runtimes: "
    )
    add_bullet(
        doc,
        "MySQL Community Server 8.0.33+ utilizing the InnoDB storage engine with full support for foreign key cascades, "
        "spatial GIS indexing (`SPATIAL INDEX`), and UTF-8 multi-byte (`utf8mb4`) encoding.",
        bold_prefix="3. Database Engine: "
    )
    add_bullet(
        doc,
        "Modern evergreen web browsers equipped with HTML5 Canvas, WebGL, Geolocation API, and BroadcastChannel API "
        "(Google Chrome 100+, Mozilla Firefox 98+, Microsoft Edge 100+, Safari 15+).",
        bold_prefix="4. Client Web Browsers: "
    )

    add_heading2(doc, "3.3 Functional Requirements Specification (FRS)")
    add_body(
        doc,
        "Functional requirements define the core operational behaviors and service boundaries of the system across the three "
        "interconnected stakeholder roles:",
        bold_prefix="Functional Requirements Overview: "
    )

    # Table 3.2: FRS Matrix
    t_fr = doc.add_table(rows=16, cols=4)
    t_fr.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_fr)

    fr_headers = ["Req ID", "Module", "Functional Requirement Description", "Priority"]
    fr_data = [
        ("FR-01", "Citizen Portal", "The system shall permit citizens to upload photographs of civic defects via file selection or direct camera capture.", "HIGH (P1)"),
        ("FR-02", "Citizen Portal", "The system shall automatically extract GPS coordinates (Latitude/Longitude) from device geolocation or interactive map pin.", "HIGH (P1)"),
        ("FR-03", "AI Inference", "The system shall invoke the YOLOv8 model to infer defect class (Pothole, Garbage, Water Leak) with confidence score.", "HIGH (P1)"),
        ("FR-04", "AI Inference", "The system shall compute a normalized Defect Severity Index (Low, Medium, High, Emergency) based on bounding box metrics.", "HIGH (P1)"),
        ("FR-05", "Automated Triage", "The system shall automatically assign the grievance to the designated municipal department based on AI classification.", "HIGH (P1)"),
        ("FR-06", "SLA Engine", "The system shall compute a dynamic countdown timer based on the department's Service Level Agreement threshold.", "MEDIUM (P2)"),
        ("FR-07", "Citizen Tracking", "The system shall generate a unique cryptographic Tracking ID (UUID) and display a real-time status progression timeline.", "HIGH (P1)"),
        ("FR-08", "GIS Mapping", "The system shall plot all active grievances as clustered markers on an interactive Leaflet OpenStreetMap view.", "HIGH (P1)"),
        ("FR-09", "Field Ops", "The system shall provide field workers with a mobile-responsive list of assigned work orders sorted by GPS proximity.", "HIGH (P1)"),
        ("FR-10", "Field Ops", "The system shall permit field workers to transition ticket states (Pending -> In Progress -> Under Review -> Resolved).", "HIGH (P1)"),
        ("FR-11", "Proof Engine", "The system shall strictly mandate the upload of an on-site 'After-Resolution' photograph before marking a ticket Resolved.", "HIGH (P1)"),
        ("FR-12", "Citizen Feedback", "The system shall permit citizens to submit a 1-to-5 star rating and written review once their grievance is resolved.", "MEDIUM (P2)"),
        ("FR-13", "Admin Analytics", "The system shall compute real-time municipal KPIs (Total Complaints, Resolved %, SLA Compliance %, Category Breakdown).", "HIGH (P1)"),
        ("FR-14", "Cross-Tab Sync", "The system shall propagate resolution and status change events across all active browser tabs via BroadcastChannel.", "MEDIUM (P2)"),
        ("FR-15", "Security & RBAC", "The system shall enforce role-based authorization ensuring field resolution endpoints are inaccessible to unauthorized roles.", "HIGH (P1)"),
    ]

    col_w_fr = [Inches(1.0), Inches(1.5), Inches(3.7), Inches(1.0)]

    for c_idx, htext in enumerate(fr_headers):
        cell = t_fr.rows[0].cells[c_idx]
        cell.width = col_w_fr[c_idx]
        cell.text = htext
        set_cell_background(cell, "002244")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(9.5)
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)

    for r_idx, row_values in enumerate(fr_data):
        row = t_fr.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.width = col_w_fr[c_idx]
            cell.text = val
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx in [0, 3] else WD_ALIGN_PARAGRAPH.LEFT
            p.runs[0].font.size = Pt(9)
            set_cell_margins(cell, top=70, bottom=70, left=80, right=80)
            if r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    add_body(doc, "Table 3.2: Functional Requirements Specification Matrix (FR-01 to FR-15).")

    add_heading2(doc, "3.4 Non-Functional Requirements Specification (NFRS)")
    add_body(
        doc,
        "Non-functional requirements specify quality criteria, behavioral constraints, and mathematical thresholds "
        "governing system operation:",
        bold_prefix="Non-Functional Dimensions: "
    )

    # Table 3.3: NFRS Metric Targets
    t_nfr = doc.add_table(rows=6, cols=4)
    t_nfr.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_nfr)

    nfr_headers = ["NFR Category", "Metric Target", "Measurement Protocol", "Design Implementation"]
    nfr_data = [
        ("Performance & Latency", "< 500 ms AI Inference Latency; < 1.5s Initial Page Load", "Chrome DevTools Network waterfall and Python time benchmarks", "Pre-warmed singleton YOLOv8 model; Vite Rollup code splitting; gzip compression"),
        ("Security & Privacy", "100% Parameterized SQL Queries; RBAC Endpoint Protection", "Automated SQL injection audit; OWASP Top 10 compliance scanning", "SQLAlchemy ORM binding; Werkzeug secure_filename; Role verification middleware"),
        ("Reliability & Availability", "99.9% Uptime; Zero Silent Crash Failures", "Continuous ping health-checks via /api/health endpoint", "React ErrorBoundary UI containment; WSGI multi-worker auto-recovery"),
        ("Scalability", "Support 5,000+ Concurrent Grievance Ingestions", "Apache Bench (ab) and Locust load simulation testing", "Stateless REST API design; connection pooling via SQLAlchemy; MySQL read-replicas"),
        ("Usability & Accessibility", "Mobile-First Responsiveness; WCAG 2.1 AA Compliance", "Lighthouse accessibility audit; multi-device viewport testing", "Custom Vanilla CSS responsive fluid grid; 48px minimum touch targets; contrast ratios > 4.5:1"),
    ]

    col_w_nfr = [Inches(1.5), Inches(1.8), Inches(1.9), Inches(2.0)]

    for c_idx, htext in enumerate(nfr_headers):
        cell = t_nfr.rows[0].cells[c_idx]
        cell.width = col_w_nfr[c_idx]
        cell.text = htext
        set_cell_background(cell, "002244")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(9.5)
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)

    for r_idx, row_values in enumerate(nfr_data):
        row = t_nfr.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.width = col_w_nfr[c_idx]
            cell.text = val
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx == 0 else WD_ALIGN_PARAGRAPH.LEFT
            p.runs[0].font.size = Pt(9)
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            if r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    add_body(doc, "Table 3.3: Non-Functional Requirements Specification (NFRS) Metric Targets.")

    add_heading2(doc, "3.5 Development Tools and Integrated Frameworks")
    add_body(
        doc,
        "The project development environment is standardized across a modern open-source toolchain:",
        bold_prefix="Integrated Toolchain: "
    )
    add_bullet(
        doc,
        "Visual Studio Code paired with Google Antigravity AI IDE for paired programming, syntax validation, and continuous linting.",
        bold_prefix="1. Integrated Development Environments (IDEs): "
    )
    add_bullet(
        doc,
        "Ultralytics PyTorch distribution, OpenCV-Python for matrix image transformations, and Pillow for streaming JPEG encoding.",
        bold_prefix="2. Computer Vision Frameworks: "
    )
    add_bullet(
        doc,
        "Postman v10 for automated HTTP endpoint regression testing and cURL command-line scripts for batch API ingestion.",
        bold_prefix="3. API Testing Tools: "
    )
    add_bullet(
        doc,
        "Playwright end-to-end browser automation suite for responsive cross-browser validation and console error auditing.",
        bold_prefix="4. Automated Browser Testing: "
    )
    add_bullet(
        doc,
        "Git version control hosted on GitHub (`saicharan0806/Nagarmitra`) with automated Windows batch orchestration (`auto_sync.bat`, `start_all.bat`).",
        bold_prefix="5. Source Control & Automation: "
    )
