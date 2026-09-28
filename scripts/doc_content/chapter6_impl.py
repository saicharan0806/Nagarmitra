"""
Chapter 6: Implementation and Algorithmic Details
Comprehensive academic chapter detailing module-wise code structure,
mathematical formulations (CIoU loss, mAP, Severity Index), REST API catalog, and RBAC security.
"""

from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from .helpers import (
    add_chapter_heading, add_heading2, add_heading3, add_body, add_bullet,
    set_cell_background, set_cell_margins, set_table_borders
)

def build_chapter6(doc):
    add_chapter_heading(doc, 6, "IMPLEMENTATION AND ALGORITHMIC DETAILS")

    add_heading2(doc, "6.1 Module-Wise Implementation Breakdown")
    add_body(
        doc,
        "CivicSync's codebase is structured into four primary functional modules spanning frontend client components, "
        "middleware controllers, and machine learning pipelines:",
        bold_prefix="Module Partitioning: "
    )
    add_bullet(
        doc,
        "Implemented across `frontend/src/components/citizen/`. Manages citizen grievance intake via file input or live camera streaming. "
        "Integrates HTML5 Canvas for client-side image downsampling to preserve network bandwidth. Implements Leaflet map pinning "
        "allowing users to adjust geolocation coordinates manually if GPS signal drift occurs. Displays real-time ticket progression "
        "along an interactive multi-step timeline (Submitted -> AI Triaged -> Assigned -> In Progress -> Resolved).",
        bold_prefix="1. Citizen Grievance Portal Module: "
    )
    add_bullet(
        doc,
        "Encapsulated in `ai_service/yolo.py`. Implements the `YOLOTriageEngine` class. Loads pre-trained neural network weights (`yolov8n.pt`) "
        "at application initialization. Pre-processes incoming image buffers, executes forward-pass tensor inference, performs "
        "Non-Maximum Suppression (NMS) with an IoU threshold of 0.45 and confidence threshold of 0.40, and computes defect severity.",
        bold_prefix="2. Deep Learning AI Triage Pipeline: "
    )
    add_bullet(
        doc,
        "Located in `frontend/src/components/field-operations/`. Designed with high-contrast, touch-optimized UI components for field use. "
        "Fetches assigned work orders filtered by proximity to the worker's current coordinates. Enforces a mandatory photo upload "
        "protocol before the 'Mark as Resolved' button is enabled.",
        bold_prefix="3. Field Operations Mobility Suite: "
    )
    add_bullet(
        doc,
        "Implemented in `frontend/src/components/admin/AnalyticsDashboard.jsx`. Aggregates municipal grievance data, computes real-time "
        "SLA compliance percentages, calculates average turnaround hours, and generates categorical distribution charts.",
        bold_prefix="4. Municipal Administrative Command Center: "
    )

    add_heading2(doc, "6.2 Deep Learning AI Triage Pipeline Implementation")
    add_body(
        doc,
        "The AI inference pipeline executes within an isolated Python sub-service. When a citizen submits a photograph, "
        "the server initiates the following sequence:",
        bold_prefix="AI Execution Sequence: "
    )
    add_bullet(
        doc,
        "The uploaded binary image is read using Pillow (`PIL.Image.open`), validated for file corruption, and converted to RGB. "
        "Images exceeding 1920x1080 resolution are resampled to standard 640x640 dimensions while preserving the native aspect ratio.",
        bold_prefix="Step 1 (Image Validation and Normalization): "
    )
    add_bullet(
        doc,
        "The normalized tensor is passed to the Ultralytics YOLOv8 engine. The model's CSPDarknet53 backbone extracts multi-scale "
        "feature maps across P3, P4, and P5 pyramid levels, identifying micro-textures (asphalt cracking) and macro-structures (garbage piles).",
        bold_prefix="Step 2 (Forward-Pass Feature Extraction): "
    )
    add_bullet(
        doc,
        "Overlapping bounding box proposals are filtered using Non-Maximum Suppression (NMS). Bounding boxes with confidence "
        "scores below 0.40 are rejected as background noise.",
        bold_prefix="Step 3 (Confidence Filtering and Non-Maximum Suppression): "
    )
    add_bullet(
        doc,
        "The detected classes are mapped to municipal department IDs (e.g., 'pothole' -> Department 1: Roads & Bridges; 'garbage' -> "
        "Department 2: Solid Waste Management). The system then computes the Defect Severity Index.",
        bold_prefix="Step 4 (Departmental Auto-Routing): "
    )

    add_heading2(doc, "6.3 Mathematical Formulations & Loss Functions")
    add_body(
        doc,
        "The deep learning engine relies on rigorous mathematical formulations governing bounding box localization, "
        "classification loss, and defect severity scoring:",
        bold_prefix="Mathematical Foundations: "
    )

    add_heading3(doc, "1. Intersection over Union (IoU)")
    add_body(
        doc,
        "Intersection over Union evaluates the spatial overlap between the predicted bounding box B_pred and ground-truth box B_gt:\n\n"
        "                     Area(B_pred ∩ B_gt)\n"
        "       IoU = -------------------------------------\n"
        "                     Area(B_pred ∪ B_gt)\n\n"
        "where an IoU value of 1.0 represents a perfect geometric match, and values below 0.50 indicate spatial misalignment."
    )

    add_heading3(doc, "2. Complete Intersection over Union (CIoU) Loss")
    add_body(
        doc,
        "YOLOv8 utilizes Complete IoU (CIoU) loss for bounding box regression, which incorporates three geometric factors: "
        "overlap area, central point distance, and aspect ratio consistency:\n\n"
        "       L_CIoU = 1 - IoU + [ ρ²(b, b_gt) / c² ] + α · v\n\n"
        "where b and b_gt denote the central coordinates of predicted and ground-truth boxes, ρ(·) is the Euclidean distance, "
        "c is the diagonal length of the smallest enclosing box covering both boxes, α is a positive trade-off parameter, "
        "and v measures the consistency of the aspect ratio:\n\n"
        "       v = (4 / π²) · [ arctan(w_gt / h_gt) - arctan(w / h) ]²"
    )

    add_heading3(doc, "3. Mean Average Precision (mAP)")
    add_body(
        doc,
        "Model detection accuracy across multiple defect classes (pothole, garbage, water leak) is evaluated using Mean Average Precision:\n\n"
        "                   1    N\n"
        "       mAP = ---  ∑  AP_i\n"
        "                   N   i=1\n\n"
        "where N is the number of distinct defect classes, and AP_i is the Average Precision for class i computed as the area "
        "under the Precision-Recall curve:\n\n"
        "       AP = ∫₀¹ Precision(Recall) d(Recall)"
    )

    add_heading3(doc, "4. Quantitative Defect Severity Index Formula")
    add_body(
        doc,
        "To eliminate subjective human bias, CivicSync calculates a quantitative Severity Score S ∈ [0.0, 1.0] for every grievance:\n\n"
        "       S = w₁ · C_max + w₂ · [ ∑ (A_box / A_img) ] + w₃ · P_dept\n\n"
        "where C_max is the maximum detection confidence score, (A_box / A_img) is the fractional surface area occupied by "
        "the defect bounding box relative to total image area, P_dept is the inherent departmental hazard weight (Roads = 0.9, "
        "Sanitation = 0.7, Electrical = 0.8), and w₁, w₂, w₃ are calibrated weighting coefficients satisfying w₁ + w₂ + w₃ = 1.0. "
        "Scores S ≥ 0.75 are automatically classified as 'Emergency', triggering accelerated SLA deadlines."
    )

    add_heading2(doc, "6.4 Field Operations Proof-of-Resolution Verification Engine")
    add_body(
        doc,
        "The Proof-of-Resolution protocol is a foundational integrity mechanism in CivicSync. When a field worker initiates "
        "ticket closure, the client interface activates the device camera. The worker must capture an on-site photograph of the "
        "completed repair. The server enforces a two-stage verification:\n"
        "1. Geospatial Proximity Check: The GPS coordinates of the resolution photograph are compared against the initial grievance "
        "coordinates using the Haversine formula to confirm the worker is physically present at the defect site.\n"
        "2. Dual-Image Public Audit: The resolved grievance displays the initial defect photo and the resolution proof photo "
        "side-by-side in the citizen's tracking portal. Tickets cannot enter the 'Resolved' state without this proof."
    )

    add_heading2(doc, "6.5 Cross-Tab State Synchronization Architecture (tabSync.js)")
    add_body(
        doc,
        "To achieve instantaneous UI updates across multiple open browser windows without overloading the backend with polling requests, "
        "CivicSync implements a client-side publish-subscribe event bus utilizing the HTML5 BroadcastChannel API:\n\n"
        "   // frontend/src/utils/tabSync.js\n"
        "   const channel = new BroadcastChannel('civicsync_event_bus');\n\n"
        "   export function broadcastEvent(eventType, payload) {\n"
        "     channel.postMessage({ type: eventType, payload, timestamp: Date.now() });\n"
        "   }\n\n"
        "   export function useTabSync(onEventReceived) {\n"
        "     useEffect(() => {\n"
        "       const handler = (event) => onEventReceived(event.data);\n"
        "       channel.addEventListener('message', handler);\n"
        "       return () => channel.removeEventListener('message', handler);\n"
        "     }, [onEventReceived]);\n"
        "   }\n\n"
        "When a municipal administrator reassigns a work order or a worker uploads resolution proof in Tab 1, a lightweight broadcast "
        "message is transmitted across browser tabs in under 5 milliseconds, triggering immediate UI state updates in open citizen tabs."
    )

    add_heading2(doc, "6.6 Comprehensive RESTful API Endpoint Catalog")
    add_body(
        doc,
        "The Flask API exposes stateless REST endpoints adhering strictly to HTTP/1.1 specifications:"
    )

    # Table 6.1: REST API Endpoint Catalog
    t_api = doc.add_table(rows=9, cols=5)
    t_api.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_api)

    api_headers = ["Verb", "Endpoint URI", "Authorized Role", "Payload Type", "Expected Response Code"]
    api_data = [
        ("GET", "/api/health", "Public", "None", "200 OK (status: healthy, ai_engine: YOLOv8)"),
        ("POST", "/api/auth/login", "Public", "JSON {email, password}", "200 OK (token, user details, role)"),
        ("GET", "/api/issues", "All Roles", "Query Params (?status, ?dept)", "200 OK (Array of complaint objects with GPS)"),
        ("POST", "/api/issues", "Citizen, Admin", "Multipart (image, title, lat, lng)", "201 Created (tracking_id, ai_confidence)"),
        ("GET", "/api/issues/<id>", "All Roles", "None", "200 OK (Detailed complaint with audit logs)"),
        ("POST", "/api/issues/<id>/resolve", "Worker, Admin", "Multipart (resolution_image, notes)", "200 OK (status: resolved, timestamp)"),
        ("GET", "/api/admin/analytics", "Admin", "None", "200 OK (KPI totals, SLA %, ward stats)"),
        ("POST", "/api/feedback", "Citizen", "JSON {complaint_id, rating, review}", "201 Created (feedback recorded)"),
    ]

    col_w_api = [Inches(0.8), Inches(2.2), Inches(1.2), Inches(1.8), Inches(1.2)]

    for c_idx, htext in enumerate(api_headers):
        cell = t_api.rows[0].cells[c_idx]
        cell.width = col_w_api[c_idx]
        cell.text = htext
        set_cell_background(cell, "002244")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(9.5)
        set_cell_margins(cell, top=100, bottom=100, left=70, right=70)

    for r_idx, row_values in enumerate(api_data):
        row = t_api.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.width = col_w_api[c_idx]
            cell.text = val
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx in [0, 2, 4] else WD_ALIGN_PARAGRAPH.LEFT
            p.runs[0].font.size = Pt(8.5)
            set_cell_margins(cell, top=70, bottom=70, left=70, right=70)
            if r_idx % 2 == 1:
                set_cell_background(cell, "F8FAFC")

    add_body(doc, "Table 6.1: RESTful API Endpoint Catalog with HTTP Verbs, Roles, and Schemas.")

    add_heading2(doc, "6.7 Role-Based Access Control (RBAC) & Security Policies")
    add_body(
        doc,
        "System security is enforced through a strict Role-Based Access Control matrix. The backend implements authorization "
        "decorators (`@role_required('admin')`, `@role_required('field_worker')`) that intercept incoming requests before reaching "
        "business controllers. Attempting to invoke restricted actions—such as a citizen attempting to close a ticket at "
        "`/api/issues/<id>/resolve`—results in an immediate HTTP 403 Forbidden response with an audit alert logged to the database."
    )

    add_heading2(doc, "6.8 Geolocation Triangulation & Haversine Distance Calculation Algorithm")
    add_body(
        doc,
        "To enforce physical verification during work order resolution, CivicSync implements the spherical Haversine formula "
        "to calculate the great-circle distance between two geographic coordinates on the Earth's surface:\n\n"
        "       a = sin²(Δφ / 2) + cos(φ₁) · cos(φ₂) · sin²(Δλ / 2)\n"
        "       c = 2 · atan2( √a, √(1 − a) )\n"
        "       d = R · c\n\n"
        "where φ₁ and φ₂ represent the latitudes of the initial grievance site and the field worker's resolution location in radians, "
        "Δφ = (φ₂ − φ₁), Δλ = (λ₂ − λ₁) is the difference in longitude, R ≈ 6,371,000 meters is the mean radius of Earth, and d is "
        "the physical distance in meters. When a field worker submits resolution proof, the server computes d: if d > 150 meters, "
        "the system rejects the resolution submission with a warning flag indicating that the worker is not within proximity of the reported defect."
    )

    add_heading2(doc, "6.9 Image EXIF Metadata Extraction and Anti-Tampering Protocols")
    add_body(
        doc,
        "To prevent malicious actors from uploading recycled stock photos or internet screenshots of potholes from other cities, "
        "CivicSync incorporates an EXIF metadata verification checkpoint. When a JPEG image is uploaded, the backend inspects "
        "Exchangeable Image File Format (EXIF) tags using Pillow:\n"
        "1. DateTimeOriginal Tag (0x9003): Confirms the image capture timestamp occurred within the preceding 2 hours, preventing "
        "the submission of archival photos.\n"
        "2. GPSInfo Tag (0x8825): Extracts native camera GPS coordinates and cross-references them against the client's reported "
        "browser geolocation. If a discrepancy exceeding 500 meters is detected, the submission is flagged for human administrative review.\n"
        "3. Software / Processing Tags: Inspects metadata for known digital photo-manipulation software signatures (e.g., Adobe Photoshop, GIMP), "
        "ensuring only genuine field imagery is ingested into the municipal record."
    )
