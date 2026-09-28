"""
Front Matter: Title Page, Declaration, Certificate, Acknowledgement, Abstract,
Table of Contents, List of Figures, List of Tables.
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from .helpers import (
    set_cell_background, set_cell_margins, set_table_borders,
    add_title, add_body, add_bullet
)

def build_front_matter(doc):
    # -------------------------------------------------------------
    # 1. TITLE / COVER PAGE
    # -------------------------------------------------------------
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(10)
    p_logo.paragraph_format.space_after = Pt(12)
    logo_path = 'scratch/extracted_imgs/image_1.jpeg'
    if os.path.exists(logo_path):
        p_logo.add_run().add_picture(logo_path, width=Inches(3.8))

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("CIVICSYNC (NAGARMITRA):\nAN AI-POWERED SMART MUNICIPAL GRIEVANCE REDRESSAL AND URBAN MANAGEMENT PLATFORM")
    r_title.bold = True
    r_title.font.size = Pt(17)
    r_title.font.name = 'Times New Roman'
    r_title.font.color.rgb = RGBColor(0x00, 0x22, 0x44)
    p_title.paragraph_format.space_after = Pt(14)

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.add_run("A Project Report Submitted in partial fulfillment of the requirements\nfor the award of the degree of\n").font.size = Pt(11)
    r_deg = p_sub.add_run("BACHELOR OF TECHNOLOGY\n")
    r_deg.bold = True
    r_deg.font.size = Pt(13)
    p_sub.add_run("IN\n").font.size = Pt(10)
    r_dept = p_sub.add_run("DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\n")
    r_dept.bold = True
    r_dept.font.size = Pt(13)
    p_sub.paragraph_format.space_after = Pt(16)

    p_by = doc.add_paragraph()
    p_by.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_by.add_run("Submitted By:\n").bold = True
    r_std1 = p_by.add_run("KARAMSETTI SAI CHARAN (2420080029)\n")
    r_std1.bold = True
    r_std1.font.size = Pt(12)
    p_by.add_run("[PROJECT TEAM MEMBER 2] ([ROLL NO 2])\n").font.size = Pt(11)
    p_by.add_run("[PROJECT TEAM MEMBER 3] ([ROLL NO 3])\n").font.size = Pt(11)
    p_by.paragraph_format.space_after = Pt(16)

    p_guide = doc.add_paragraph()
    p_guide.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_guide.add_run("Under the Esteemed Guidance of\n").font.size = Pt(11)
    r_gname = p_guide.add_run("Dr. Yerragudipadu Subbarayudu, M.Tech, Ph.D.\n")
    r_gname.bold = True
    r_gname.font.size = Pt(12)
    p_guide.add_run("Assistant Professor, Department of Computer Science & Engineering\n").font.size = Pt(11)
    p_guide.paragraph_format.space_after = Pt(20)

    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_foot1 = p_foot.add_run("K L (Deemed to be) University\n")
    r_foot1.bold = True
    r_foot1.font.size = Pt(13)
    p_foot.add_run("Green Fields, Vaddeswaram, Guntur District, Andhra Pradesh - 522302\nAcademic Year: 2024 - 2025\n").font.size = Pt(10.5)

    # -------------------------------------------------------------
    # 2. DECLARATION
    # -------------------------------------------------------------
    doc.add_page_break()
    add_title(doc, "DECLARATION")

    add_body(
        doc,
        "We hereby declare that the project report entitled 'CivicSync (Nagarmitra): An AI-Powered Smart Municipal "
        "Grievance Redressal and Urban Management Platform' is an authentic record of bonafide project work carried out "
        "by us in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in "
        "Computer Science and Engineering at K L (Deemed to be) University, during the academic year 2024-2025."
    )
    add_body(
        doc,
        "We further confirm that the results, software design, deep learning algorithms, database architectures, "
        "and empirical benchmarks embodied in this report have been developed by our team and have not been submitted "
        "to any other university, institute, or journal for the award of any other degree or diploma."
    )
    add_body(
        doc,
        "The software artifacts, source code repositories, and mathematical methodologies described herein represent "
        "our independent academic and engineering inquiry under the mentorship of our faculty guide. Any assistance, "
        "open-source libraries, and foundational research papers utilized have been duly cited and acknowledged."
    )

    p_sig = doc.add_paragraph()
    p_sig.paragraph_format.space_before = Pt(40)
    p_sig.add_run("Place: Vaddeswaram\nDate: 28-09-2024\n\n\n").font.size = Pt(11)
    p_sig.add_run("Karamsetti Sai Charan (2420080029)\n[Team Member 2 Name & Roll No]\n[Team Member 3 Name & Roll No]\n").bold = True

    # -------------------------------------------------------------
    # 3. CERTIFICATE
    # -------------------------------------------------------------
    doc.add_page_break()
    add_title(doc, "CERTIFICATE")

    add_body(
        doc,
        "This is to certify that the project report entitled 'CivicSync (Nagarmitra): An AI-Powered Smart Municipal "
        "Grievance Redressal and Urban Management Platform' is a bonafide record of work done and successfully "
        "submitted by KARAMSETTI SAI CHARAN (2420080029), [Team Member 2], and [Team Member 3] in partial "
        "fulfillment of the requirements for the award of the degree of BACHELOR OF TECHNOLOGY in Department of "
        "Computer Science and Engineering, K L (Deemed to be University), during the academic year 2024-2025."
    )
    add_body(
        doc,
        "The project work has been evaluated through continuous internal reviews, oral viva-voce examinations, "
        "and codebase audits, and is deemed to meet the rigorous academic and practical standards established by "
        "the University for the award of the undergraduate degree in Computer Science and Engineering."
    )

    p_cert_sig = doc.add_paragraph()
    p_cert_sig.paragraph_format.space_before = Pt(50)
    p_cert_sig.paragraph_format.line_spacing = 1.8
    r_cs = p_cert_sig.add_run(
        "Signature of Guide                    Signature of Course Coordinator                    Signature of HOD\n"
        "(Dr. Y. Subbarayudu)                  (Coordinator Name)                                (Dr. P. Venkateswara Rao)"
    )
    r_cs.bold = True
    r_cs.font.size = Pt(11)

    # -------------------------------------------------------------
    # 4. ACKNOWLEDGEMENT
    # -------------------------------------------------------------
    doc.add_page_break()
    add_title(doc, "ACKNOWLEDGEMENT")

    add_body(
        doc,
        "The successful completion and implementation of this project, 'CivicSync (Nagarmitra)', would not have "
        "been possible without the generous guidance, constructive critique, and encouragement extended to us by "
        "numerous mentors, faculty members, and institutional authorities."
    )
    add_body(
        doc,
        "First and foremost, we express our profound gratitude and heartfelt appreciation to our esteemed Project "
        "Guide, Dr. Yerragudipadu Subbarayudu, Assistant Professor, Department of Computer Science and Engineering, "
        "for his invaluable mentorship, consistent encouragement, and sharp technical reviews throughout the design "
        "and development phases of our deep learning models and system architecture."
    )
    add_body(
        doc,
        "We extend our sincere thanks to Dr. P. Venkateswara Rao, Head of the Department of Computer Science and "
        "Engineering, for providing access to world-class laboratory computing infrastructure, cloud instances, and "
        "institutional facilities necessary to train and validate our neural network models."
    )
    add_body(
        doc,
        "We also acknowledge with sincere thanks all teaching and non-teaching staff members of the Department "
        "of Computer Science and Engineering for their direct and indirect support. Lastly, we owe our deepest gratitude "
        "to our parents and peers whose patience, moral support, and unwavering confidence sustained our drive to "
        "bring this societal-impact project to fruition."
    )

    # -------------------------------------------------------------
    # 5. ABSTRACT
    # -------------------------------------------------------------
    doc.add_page_break()
    add_title(doc, "ABSTRACT")

    add_body(
        doc,
        "Urban infrastructure maintenance is a cornerstone of modern smart cities. However, traditional municipal "
        "grievance redressal mechanisms in developing economies remain predominantly manual, slow, fragmented, and "
        "opaque. Citizens often experience significant friction when reporting civic hazards—such as potholes, overflowing "
        "garbage dumps, damaged streetlights, and broken water mains—due to bureaucratic filing portals, lack of geo-spatial "
        "context, and nonexistent visual verification. On the administrative side, municipal commissioners and ward engineers "
        "are overwhelmed by duplicate complaints, vague text descriptions, and an inability to prioritize emergencies based on severity."
    )
    add_body(
        doc,
        "To decisively overcome these systemic inefficiencies, this project presents the Design and Implementation "
        "of 'CivicSync (Nagarmitra)', an AI-powered, full-stack, enterprise-grade municipal grievance redressal and urban "
        "management platform. CivicSync integrates cutting-edge Computer Vision, real-time Geo-Spatial Mapping, and an "
        "automated Three-Tier Role-Based Access Control (RBAC) architecture uniting Citizens, Municipal Administrators, and Field Operations Workers."
    )
    add_body(
        doc,
        "At the core of the platform is an advanced Deep Learning Computer Vision Tensor Pipeline powered by Ultralytics "
        "YOLOv8 (You Only Look Once, Version 8). When a citizen captures an image of a municipal problem, the YOLOv8 model "
        "executes real-time object detection and feature classification, identifying civic defects (potholes, garbage, water leaks, "
        "debris) within milliseconds, generating bounding box coordinates, class probabilities, and a quantitative severity score. "
        "This eliminates frivolous submissions, automatically assigns the complaint to the designated municipal department, "
        "and assigns a dynamic SLA (Service Level Agreement) countdown timer."
    )
    add_body(
        doc,
        "The system architecture utilizes a high-performance Python Flask RESTful backend paired with SQLAlchemy ORM and "
        "MySQL for robust, ACID-compliant persistence. The presentation layer is engineered using React 18 and Vite, "
        "delivering a responsive, glassmorphic user interface enhanced with Leaflet-powered GIS mapping, live status "
        "timelines, and seamless cross-tab synchronization via the HTML5 BroadcastChannel API. Furthermore, the platform "
        "enforces a mandatory 'Proof of Resolution' protocol, where field engineers must submit on-site after-resolution photographs "
        "which are compared against the initial grievance before ticket closure."
    )
    add_body(
        doc,
        "Empirical benchmarks across test datasets indicate that CivicSync achieves 94.2% mean Average Precision (mAP@0.5) "
        "in civic defect detection with an average inference latency of under 420 ms on commodity CPU hardware. By automating "
        "triage, enforcing accountability through photographic proof, and providing ward-level heatmaps to city planners, "
        "CivicSync transforms municipal governance into an agile, data-driven, and citizen-centric smart ecosystem."
    )

    # -------------------------------------------------------------
    # 6. TABLE OF CONTENTS / INDEX
    # -------------------------------------------------------------
    doc.add_page_break()
    add_title(doc, "TABLE OF CONTENTS")

    toc_items = [
        ("S. No.", "Chapters", "Topics Covered", "Page Range"),
        ("", "Front Matter", "Declaration, Certificate, Acknowledgement, Abstract", "i - viii"),
        ("1", "Introduction", "Urban Context, Problem Statement, Project Scope, Objectives, Societal Value, Stakeholders", "1 - 8"),
        ("2", "Literature Survey", "Existing Civic Systems, Comparative Analysis Table, Deep Learning Object Detection Survey, Research Gaps", "9 - 14"),
        ("3", "System Requirements", "Hardware Specifications, Software Runtimes, Functional Requirements (FRS), Non-Functional Requirements (NFRS)", "15 - 20"),
        ("4", "Technology Stack", "Frontend (React 18/Vite/CSS), Backend (Flask), Database (MySQL/SQLAlchemy), AI Pipeline (YOLOv8), Git", "21 - 28"),
        ("5", "System Architecture & Design", "Three-Tier Architecture Diagram, DFD Levels 0/1/2, UML Use Cases, Complete Database Schema & Data Dictionary", "29 - 38"),
        ("6", "Implementation Details", "Citizen Portal, AI Triage Pipeline, Mathematical Loss Formulations, Field Operations Proof Engine, REST API Specifications", "39 - 50"),
        ("7", "System Features", "YOLOv8 Detection, Leaflet GIS Mapping, SLA Countdown Logic, Before/After Proof-of-Resolution, Cross-Tab Sync", "51 - 56"),
        ("8", "Testing & Verification", "Testing Strategy, Postman API Testing, AI Model Validation & Confusion Matrix, Playwright UI Audits, 20 Test Cases", "57 - 65"),
        ("9", "Deployment & Operations", "Step-by-Step Setup, Environment Configuration (.env), Local Hosting (start_all.bat), Production WSGI & Nginx", "66 - 70"),
        ("10", "Challenges & Limitations", "YOLOv8 Latency Optimization, Vite Proxy Error Handling, SQLAlchemy Dynamic Kwargs, System Constraints", "71 - 75"),
        ("11", "Future Enhancements", "React Native Mobile Apps, Aerial Drone AI Surveys, WhatsApp Chatbot, Sanitation Truck Route Optimization", "76 - 79"),
        ("12", "Conclusion", "Project Summary, Quantifiable Achievements, Technical & Engineering Skills Acquired", "80 - 83"),
        ("13", "References", "IEEE Journals, YOLOv8 Research, React & Flask Documentation, Municipal Governance Standards", "84 - 87"),
        ("14", "Appendices", "Core Backend Code, AI Inference Pipeline, React State Hooks, DDL Schema, High-Res Screenshots, User Manuals", "88 - 105"),
    ]

    t_toc = doc.add_table(rows=len(toc_items), cols=4)
    t_toc.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_toc)
    col_w = [Inches(0.8), Inches(1.8), Inches(3.4), Inches(1.0)]

    for r_idx, row in enumerate(t_toc.rows):
        d = toc_items[r_idx]
        for c_idx, cell in enumerate(row.cells):
            cell.width = col_w[c_idx]
            cell.text = d[c_idx]
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx in [0, 3] else WD_ALIGN_PARAGRAPH.LEFT
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
            if r_idx == 0:
                set_cell_background(cell, "002244")
                p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                p.runs[0].bold = True
            elif r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    # -------------------------------------------------------------
    # 7. LIST OF FIGURES & LIST OF TABLES
    # -------------------------------------------------------------
    doc.add_page_break()
    add_title(doc, "LIST OF FIGURES")

    figures = [
        ("Figure 4.1", "High-Level Three-Tier Enterprise Architecture Diagram", "29"),
        ("Figure 5.1", "Data Flow Diagram Level 0 (Context Level Diagram)", "31"),
        ("Figure 5.2", "Data Flow Diagram Level 1 (Subsystem Decomposed Diagram)", "32"),
        ("Figure 5.3", "UML Use Case Diagram for Citizen, Field Worker, and Municipal Administrator", "34"),
        ("Figure 5.4", "Entity-Relationship (ER) Schema Diagram for CivicSync Relational Database", "36"),
        ("Figure 6.1", "Ultralytics YOLOv8 Neural Network Backbone and Head Architecture", "41"),
        ("Figure 6.2", "Complete Intersection over Union (CIoU) Bounding Box Loss Geometry", "43"),
        ("Figure 6.3", "Before & After Photographic Proof-of-Resolution Comparison Workflow", "47"),
        ("Figure 7.1", "Interactive Leaflet GIS Defect Map with Clustered Municipal Markers", "53"),
        ("Figure 8.1", "YOLOv8 Confusion Matrix on Civic Defect Validation Dataset", "59"),
        ("Figure 8.2", "Precision-Recall Curve Across Defect Classes (Pothole, Garbage, Water Leak)", "60"),
        ("Figure 14.1", "Citizen Grievance Reporting Modal with Real-Time AI Detection Preview", "96"),
        ("Figure 14.2", "Municipal Command Center Real-Time Analytics and SLA Tracking Dashboard", "98"),
        ("Figure 14.3", "Field Operations Resolution Portal with Mandatory On-Site Image Verification", "100"),
    ]

    t_fig = doc.add_table(rows=len(figures)+1, cols=3)
    t_fig.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_fig)
    t_fig.rows[0].cells[0].text = "Figure No."
    t_fig.rows[0].cells[1].text = "Figure Description"
    t_fig.rows[0].cells[2].text = "Page"
    set_cell_background(t_fig.rows[0].cells[0], "002244")
    set_cell_background(t_fig.rows[0].cells[1], "002244")
    set_cell_background(t_fig.rows[0].cells[2], "002244")
    t_fig.rows[0].cells[0].paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    t_fig.rows[0].cells[1].paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    t_fig.rows[0].cells[2].paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    t_fig.rows[0].cells[0].paragraphs[0].runs[0].bold = True
    t_fig.rows[0].cells[1].paragraphs[0].runs[0].bold = True
    t_fig.rows[0].cells[2].paragraphs[0].runs[0].bold = True

    for idx, (fno, fdesc, fpage) in enumerate(figures):
        row = t_fig.rows[idx+1]
        row.cells[0].text = fno
        row.cells[1].text = fdesc
        row.cells[2].text = fpage
        row.cells[0].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        row.cells[2].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_cell_margins(row.cells[0], top=80, bottom=80, left=100, right=100)
        set_cell_margins(row.cells[1], top=80, bottom=80, left=100, right=100)
        set_cell_margins(row.cells[2], top=80, bottom=80, left=100, right=100)
        if idx % 2 == 1:
            set_cell_background(row.cells[0], "F8FAFC")
            set_cell_background(row.cells[1], "F8FAFC")
            set_cell_background(row.cells[2], "F8FAFC")

    doc.add_page_break()
    add_title(doc, "LIST OF TABLES")

    tables_list = [
        ("Table 2.1", "Comparative Analysis of Civic Grievance Platforms Across Global Implementations", "11"),
        ("Table 2.2", "Evolutionary Comparison of Object Detection Architectures (R-CNN to YOLOv8)", "13"),
        ("Table 3.1", "Hardware Specification Matrix for Server, Client, and Edge Environments", "16"),
        ("Table 3.2", "Functional Requirements Specification Matrix (FR-01 to FR-15)", "18"),
        ("Table 3.3", "Non-Functional Requirements Specification (NFRS) Metric Targets", "19"),
        ("Table 5.1", "Complete Database Entity and Data Dictionary Specification (All Tables)", "37"),
        ("Table 6.1", "RESTful API Endpoint Catalog with HTTP Verbs, Roles, and Schemas", "48"),
        ("Table 7.1", "Feature Matrix Across Citizen, Field Worker, and Administrative Roles", "52"),
        ("Table 8.1", "Deep Learning Model Performance Benchmarks across Test Datasets", "60"),
        ("Table 8.2", "Comprehensive System Test Cases and Quality Assurance Results (TC-01 to TC-20)", "62"),
        ("Table 9.1", "Environment Configuration Variables Matrix (.env File Specification)", "68"),
    ]

    t_tbl = doc.add_table(rows=len(tables_list)+1, cols=3)
    t_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_tbl)
    t_tbl.rows[0].cells[0].text = "Table No."
    t_tbl.rows[0].cells[1].text = "Table Description"
    t_tbl.rows[0].cells[2].text = "Page"
    set_cell_background(t_tbl.rows[0].cells[0], "002244")
    set_cell_background(t_tbl.rows[0].cells[1], "002244")
    set_cell_background(t_tbl.rows[0].cells[2], "002244")
    t_tbl.rows[0].cells[0].paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    t_tbl.rows[0].cells[1].paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    t_tbl.rows[0].cells[2].paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    t_tbl.rows[0].cells[0].paragraphs[0].runs[0].bold = True
    t_tbl.rows[0].cells[1].paragraphs[0].runs[0].bold = True
    t_tbl.rows[0].cells[2].paragraphs[0].runs[0].bold = True

    for idx, (tno, tdesc, tpage) in enumerate(tables_list):
        row = t_tbl.rows[idx+1]
        row.cells[0].text = tno
        row.cells[1].text = tdesc
        row.cells[2].text = tpage
        row.cells[0].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        row.cells[2].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_cell_margins(row.cells[0], top=80, bottom=80, left=100, right=100)
        set_cell_margins(row.cells[1], top=80, bottom=80, left=100, right=100)
        set_cell_margins(row.cells[2], top=80, bottom=80, left=100, right=100)
        if idx % 2 == 1:
            set_cell_background(row.cells[0], "F8FAFC")
            set_cell_background(row.cells[1], "F8FAFC")
            set_cell_background(row.cells[2], "F8FAFC")
