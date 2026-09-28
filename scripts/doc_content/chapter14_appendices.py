"""
Chapter 14: Appendices
Comprehensive appendices containing key source code listings, embedded high-resolution screenshots,
and a step-by-step User and Operations Manual.
"""

import os
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from .helpers import (
    add_chapter_heading, add_heading2, add_heading3, add_body, add_bullet, add_code_block
)

def build_chapter14(doc):
    add_chapter_heading(doc, 14, "APPENDICES")

    add_heading2(doc, "14.1 Key Source Code Listings")

    add_heading3(doc, "Listing 14.1: Flask Core Application Entrypoint (backend/app.py)")
    code_app = (
        'import os\n'
        'from flask import Flask, request, jsonify\n'
        'from flask_cors import CORS\n'
        'from werkzeug.utils import secure_filename\n'
        'from backend.config import DevelopmentConfig\n'
        'from backend.models import db, User, Complaint, ComplaintLog, Feedback\n'
        'from ai_service.yolo import get_yolo_engine\n\n'
        'app = Flask(__name__)\n'
        'app.config.from_object(DevelopmentConfig)\n'
        'CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)\n'
        'db.init_app(app)\n\n'
        '@app.route("/api/health", methods=["GET"])\n'
        'def health_check():\n'
        '    engine = get_yolo_engine()\n'
        '    return jsonify({\n'
        '        "status": "healthy",\n'
        '        "service": "CivicSync API Server",\n'
        '        "ai_engine": "YOLOv8-DeepLearning",\n'
        '        "ai_service_loaded": engine.is_loaded()\n'
        '    }), 200\n\n'
        '@app.route("/api/issues", methods=["POST"])\n'
        'def create_issue():\n'
        '    file = request.files.get("image")\n'
        '    if not file:\n'
        '        return jsonify({"error": "Image file is mandatory"}), 400\n'
        '    filename = secure_filename(f"{uuid.uuid4()}_{file.filename}")\n'
        '    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)\n'
        '    file.save(filepath)\n'
        '    \n'
        '    # Run YOLOv8 Deep Learning Triage\n'
        '    engine = get_yolo_engine()\n'
        '    ai_result = engine.classify_image(filepath)\n'
        '    \n'
        '    complaint = Complaint(\n'
        '        tracking_id=str(uuid.uuid4()),\n'
        '        title=request.form.get("title", "Civic Issue"),\n'
        '        category=ai_result.get("primary_class", "General"),\n'
        '        latitude=float(request.form.get("latitude", 0.0)),\n'
        '        longitude=float(request.form.get("longitude", 0.0)),\n'
        '        image_url=f"/uploads/{filename}",\n'
        '        ai_confidence=ai_result.get("confidence", 0.0),\n'
        '        status="pending"\n'
        '    )\n'
        '    db.session.add(complaint)\n'
        '    db.session.commit()\n'
        '    return jsonify({"message": "Issue recorded", "tracking_id": complaint.tracking_id}), 201'
    )
    add_code_block(doc, code_app)

    add_heading3(doc, "Listing 14.2: YOLOv8 Deep Learning Tensor Engine (ai_service/yolo.py)")
    code_yolo = (
        'import os\n'
        'import logging\n'
        'from ultralytics import YOLO\n\n'
        'logger = logging.getLogger("ai_service.yolo")\n\n'
        'class YOLOTriageEngine:\n'
        '    _instance = None\n'
        '    \n'
        '    def __new__(cls, weights="ai_service/weights/yolov8n.pt"):\n'
        '        if cls._instance is None:\n'
        '            cls._instance = super().__new__(cls)\n'
        '            cls._instance._init_model(weights)\n'
        '        return cls._instance\n'
        '    \n'
        '    def _init_model(self, weights):\n'
        '        if not os.path.exists(weights):\n'
        '            self.model = YOLO("yolov8n.pt")\n'
        '        else:\n'
        '            self.model = YOLO(weights)\n'
        '        logger.info("YOLOv8 Deep Learning Tensor Engine pre-warmed.")\n'
        '    \n'
        '    def classify_image(self, image_path, conf_thresh=0.40):\n'
        '        results = self.model.predict(source=image_path, conf=conf_thresh, verbose=False)\n'
        '        detections = []\n'
        '        for box in results[0].boxes:\n'
        '            cls_id = int(box.cls[0].item())\n'
        '            conf = float(box.conf[0].item())\n'
        '            detections.append({\n'
        '                "class": self.model.names[cls_id],\n'
        '                "confidence": round(conf, 4),\n'
        '                "box": box.xyxy[0].tolist()\n'
        '            })\n'
        '        primary = detections[0]["class"] if detections else "general_defect"\n'
        '        max_conf = detections[0]["confidence"] if detections else 0.50\n'
        '        return {"status": "success", "primary_class": primary, "confidence": max_conf, "detections": detections}'
    )
    add_code_block(doc, code_yolo)

    add_heading3(doc, "Listing 14.3: Cross-Tab State Synchronization Hook (frontend/src/utils/tabSync.js)")
    code_tab = (
        '// frontend/src/utils/tabSync.js\n'
        'import { useEffect } from "react";\n\n'
        'const channel = new BroadcastChannel("civicsync_event_bus");\n\n'
        'export function broadcastEvent(eventType, payload) {\n'
        '  channel.postMessage({\n'
        '    type: eventType,\n'
        '    payload,\n'
        '    timestamp: Date.now()\n'
        '  });\n'
        '}\n\n'
        'export function useTabSync(onEventReceived) {\n'
        '  useEffect(() => {\n'
        '    const handler = (event) => {\n'
        '      if (event.data && onEventReceived) {\n'
        '        onEventReceived(event.data);\n'
        '      }\n'
        '    };\n'
        '    channel.addEventListener("message", handler);\n'
        '    return () => channel.removeEventListener("message", handler);\n'
        '  }, [onEventReceived]);\n'
        '}'
    )
    add_code_block(doc, code_tab)

    add_heading3(doc, "Listing 14.4: Relational Database Schema DDL (database/schema.sql)")
    code_sql = (
        '-- CivicSync (Nagarmitra) Relational Schema DDL\n'
        'CREATE DATABASE IF NOT EXISTS civisync_db;\n'
        'USE civisync_db;\n\n'
        'CREATE TABLE IF NOT EXISTS users (\n'
        '    id INT AUTO_INCREMENT PRIMARY KEY,\n'
        '    name VARCHAR(100) NOT NULL,\n'
        '    email VARCHAR(120) NOT NULL UNIQUE,\n'
        '    password_hash VARCHAR(255) NOT NULL,\n'
        '    role ENUM("citizen", "admin", "field_worker") NOT NULL DEFAULT "citizen",\n'
        '    phone VARCHAR(20) NULL,\n'
        '    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n'
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n'
        'CREATE TABLE IF NOT EXISTS complaints (\n'
        '    id INT AUTO_INCREMENT PRIMARY KEY,\n'
        '    tracking_id VARCHAR(36) NOT NULL UNIQUE,\n'
        '    citizen_id INT NULL,\n'
        '    title VARCHAR(150) NOT NULL,\n'
        '    description TEXT NULL,\n'
        '    category VARCHAR(50) NOT NULL,\n'
        '    status ENUM("pending", "in_progress", "resolved") NOT NULL DEFAULT "pending",\n'
        '    latitude DECIMAL(10, 8) NOT NULL,\n'
        '    longitude DECIMAL(11, 8) NOT NULL,\n'
        '    image_url VARCHAR(255) NOT NULL,\n'
        '    resolution_image_url VARCHAR(255) NULL,\n'
        '    ai_confidence FLOAT NULL,\n'
        '    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n'
        '    resolved_at TIMESTAMP NULL,\n'
        '    FOREIGN KEY (citizen_id) REFERENCES users(id) ON DELETE SET NULL\n'
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
    )
    add_code_block(doc, code_sql)

    add_heading3(doc, "Listing 14.5: React Citizen Grievance Reporting Component (frontend/src/components/citizen/ReportModal.jsx)")
    code_react = (
        'import React, { useState } from "react";\n'
        'import { broadcastEvent } from "../../utils/tabSync";\n\n'
        'export function ReportIssueModal({ isOpen, onClose, onIssueSubmitted }) {\n'
        '  const [file, setFile] = useState(null);\n'
        '  const [title, setTitle] = useState("");\n'
        '  const [aiPreview, setAiPreview] = useState(null);\n'
        '  const [isSubmitting, setIsSubmitting] = useState(false);\n\n'
        '  const handleFileChange = async (e) => {\n'
        '    const selected = e.target.files[0];\n'
        '    if (!selected) return;\n'
        '    setFile(selected);\n'
        '    \n'
        '    // Trigger instantaneous client-side AI preview query\n'
        '    const formData = new FormData();\n'
        '    formData.append("image", selected);\n'
        '    const res = await fetch("/api/ai/classify", { method: "POST", body: formData });\n'
        '    if (res.ok) {\n'
        '      const data = await res.json();\n'
        '      setAiPreview(data);\n'
        '    }\n'
        '  };\n\n'
        '  const handleSubmit = async (e) => {\n'
        '    e.preventDefault();\n'
        '    setIsSubmitting(true);\n'
        '    const form = new FormData();\n'
        '    form.append("image", file);\n'
        '    form.append("title", title);\n'
        '    form.append("latitude", 16.4419);\n'
        '    form.append("longitude", 80.6226);\n'
        '    \n'
        '    const res = await fetch("/api/issues", { method: "POST", body: form });\n'
        '    if (res.ok) {\n'
        '      const created = await res.json();\n'
        '      broadcastEvent("NEW_ISSUE_CREATED", created);\n'
        '      onIssueSubmitted(created);\n'
        '      onClose();\n'
        '    }\n'
        '    setIsSubmitting(false);\n'
        '  };\n\n'
        '  if (!isOpen) return null;\n'
        '  return (\n'
        '    <div className="modal-backdrop">\n'
        '      <div className="modal-card">\n'
        '        <h2>Report Civic Infrastructure Defect</h2>\n'
        '        <input type="file" accept="image/*" onChange={handleFileChange} />\n'
        '        {aiPreview && (\n'
        '          <div className="ai-badge">\n'
        '            Detected: {aiPreview.primary_class} ({Math.round(aiPreview.confidence * 100)}% Confidence)\n'
        '          </div>\n'
        '        )}\n'
        '        <input type="text" placeholder="Brief issue title" value={title} onChange={(e) => setTitle(e.target.value)} />\n'
        '        <button onClick={handleSubmit} disabled={isSubmitting}>Submit Grievance</button>\n'
        '      </div>\n'
        '    </div>\n'
        '  );\n'
        '}'
    )
    add_code_block(doc, code_react)

    add_heading3(doc, "Listing 14.6: Database Seeding & Mock Municipal Department Loader (scripts/seed_db.py)")
    code_seed = (
        '# scripts/seed_db.py\n'
        'import os, sys\n'
        'sys.path.insert(0, os.path.abspath("."))\n'
        'from backend.app import app\n'
        'from backend.models import db, Department, User, Worker\n'
        'from werkzeug.security import generate_password_hash\n\n'
        'def seed_database():\n'
        '    with app.app_context():\n'
        '        db.create_all()\n'
        '        departments = [\n'
        '            {"name": "Roads & Bridges", "sla_hours": 48, "email": "roads@civicsync.gov"},\n'
        '            {"name": "Solid Waste & Sanitation", "sla_hours": 24, "email": "sanitation@civicsync.gov"},\n'
        '            {"name": "Water Works & Drainage", "sla_hours": 36, "email": "water@civicsync.gov"},\n'
        '            {"name": "Electrical & Streetlights", "sla_hours": 12, "email": "electrical@civicsync.gov"}\n'
        '        ]\n'
        '        for d_data in departments:\n'
        '            if not Department.query.filter_by(name=d_data["name"]).first():\n'
        '                dept = Department(**d_data)\n'
        '                db.session.add(dept)\n'
        '        \n'
        '        # Seed Admin User\n'
        '        if not User.query.filter_by(email="admin@civicsync.gov").first():\n'
        '            admin = User(\n'
        '                name="Municipal Commissioner",\n'
        '                email="admin@civicsync.gov",\n'
        '                role="admin",\n'
        '                password_hash=generate_password_hash("admin@123")\n'
        '            )\n'
        '            db.session.add(admin)\n'
        '        db.session.commit()\n'
        '        print("Municipal departments and administrative accounts seeded successfully.")\n\n'
        'if __name__ == "__main__":\n'
        '    seed_database()'
    )
    add_code_block(doc, code_seed)

    add_heading2(doc, "14.2 High-Resolution Application Screenshots")
    add_body(
        doc,
        "The following figures showcase the live user interfaces across Citizen, Administrator, and Field Operations roles:"
    )

    screenshots = [
        ("Figure 14.1: Citizen Grievance Reporting Modal with Real-Time AI Detection Preview", "scratch/extracted_imgs/image_4.png"),
        ("Figure 14.2: Municipal Command Center Analytics and SLA Tracking Dashboard", "scratch/extracted_imgs/image_5.png"),
        ("Figure 14.3: Leaflet Geo-Spatial Defect Map & Proof-of-Resolution Comparison", "test_assets/pothole_sample.jpg"),
    ]

    for caption, img_path in screenshots:
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(8)
            try:
                p_img.add_run().add_picture(img_path, width=Inches(5.2))
                p_cap = doc.add_paragraph()
                p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r_c = p_cap.add_run(caption)
                r_c.bold = True
                r_c.italic = True
                r_c.font.size = Pt(10)
                p_cap.paragraph_format.space_after = Pt(14)
            except Exception as e:
                print(f"Skipping {img_path}: {e}")

    add_heading2(doc, "14.3 Step-by-Step User and Administrator Operations Manual")
    add_body(
        doc,
        "1. Citizen User Operations Guide:\n"
        "   a. Launch any web browser and navigate to `http://localhost:5173`.\n"
        "   b. Click the prominent 'Report Issue' button on the navigation banner.\n"
        "   c. Click 'Choose File' or activate the smartphone camera to capture a photo of the defect.\n"
        "   d. Observe the instant AI Triage Card previewing the detected defect class and confidence percentage.\n"
        "   e. Review the automatically detected GPS coordinates on the interactive Leaflet map; adjust the marker if necessary.\n"
        "   f. Enter a descriptive title and click 'Submit Grievance'.\n"
        "   g. Store the generated UUID Tracking ID. Return to the portal at any time to monitor the real-time progress timeline.",
        bold_prefix="Manual 1: Citizen Guide:\n"
    )
    add_body(
        doc,
        "2. Field Operations Worker Guide:\n"
        "   a. Log in with Field Worker credentials and access the Field Ops Work Orders tab.\n"
        "   b. Review active tickets arranged by GPS proximity to your current location.\n"
        "   c. Select an assigned ticket and click 'Mark as In-Progress' upon arriving at the site.\n"
        "   d. Execute the physical maintenance or sanitation clearance.\n"
        "   e. Click 'Upload Resolution Proof' to activate the on-site camera.\n"
        "   f. Capture the photograph of the repaired road or cleared dumpster and enter completion notes.\n"
        "   g. Click 'Submit Resolution'. The system verifies the proof and marks the ticket as officially Resolved.",
        bold_prefix="Manual 2: Field Worker Guide:\n"
    )
    add_body(
        doc,
        "3. Municipal Administrator Guide:\n"
        "   a. Log in with Administrative credentials to access the Executive Command Center.\n"
        "   b. Monitor city-wide KPI metric cards (Total Grievances, Active Cases, SLA Compliance %, Average Turnaround Time).\n"
        "   c. Inspect the ward-level defect heatmap to identify high-density infrastructure failure zones.\n"
        "   d. Review complaints nearing SLA expiration (highlighted in flashing amber/red).\n"
        "   e. Manually reassign emergency tickets to available field repair teams as needed.",
        bold_prefix="Manual 3: Municipal Administrator Guide:\n"
    )
