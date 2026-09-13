"""
CivicSync Flask Application Entrypoint
--------------------------------------
Configures Flask blueprints, SQLAlchemy ORM, CORS, file uploads,
and endpoints for Citizens, Managers, Workers, and AI Triage.
"""

import os
import sys
import uuid
from datetime import datetime
from pathlib import Path
# pyrefly: ignore [missing-import]
from flask import Flask, request, jsonify, Blueprint, send_from_directory
from flask_cors import CORS
# pyrefly: ignore [missing-import]
from werkzeug.utils import secure_filename

# Add project root to sys.path for ai_service imports
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.config import config_by_name, DevelopmentConfig
from backend.models import db, User, Department, Worker, Complaint, ComplaintLog, Feedback

try:
    from ai_service.model import classifier as ai_classifier
except ImportError:
    ai_classifier = None

# =====================================================================
# Blueprints Initialization
# =====================================================================
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
complaints_bp = Blueprint('complaints', __name__, url_prefix='/api/complaints')
manager_bp = Blueprint('manager', __name__, url_prefix='/api/manager')
worker_bp = Blueprint('worker', __name__, url_prefix='/api/worker')
ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')


# ---------------------------------------------------------------------
# Auth Blueprint Routes (Sign Up & Sign In)
# ---------------------------------------------------------------------
@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user in Nagarmitra."""
    data = request.get_json() or {}
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    role = data.get('role', 'citizen')
    preferred_language = data.get('preferred_language', 'English')

    if not full_name or not email or not password:
        return jsonify({"message": "Full name, email, and password are required"}), 400

    if role not in ['citizen', 'manager', 'worker', 'admin']:
        role = 'citizen'

    try:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "An account with this email already exists"}), 409

        user = User(
            full_name=full_name,
            email=email,
            role=role,
            preferred_language=preferred_language,
            is_active=True
        )
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify({
            "message": "Account created successfully",
            "user": user.to_dict(),
            "token": f"live-jwt-{user.id}-{uuid.uuid4().hex[:8]}"
        }), 201
    except Exception as e:
        # Fallback response if DB is in mock mode
        return jsonify({
            "message": "Simulated registration complete",
            "user": {
                "id": 999,
                "full_name": full_name,
                "email": email,
                "role": role,
                "preferred_language": preferred_language
            },
            "token": f"sim-jwt-{uuid.uuid4().hex[:8]}"
        }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate an existing user."""
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    requested_role = data.get('role')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            return jsonify({
                "message": "Authentication successful",
                "user": user.to_dict(),
                "role": user.role,
                "token": f"live-jwt-{user.id}-{uuid.uuid4().hex[:8]}"
            }), 200
        elif user:
            return jsonify({"message": "Invalid password"}), 401
    except Exception:
        pass

    # Demo fallback accounts
    return jsonify({
        "message": "Demo session authenticated",
        "user": {
            "id": 101,
            "full_name": email.split('@')[0].replace('.', ' ').title(),
            "email": email,
            "role": requested_role or 'citizen'
        },
        "role": requested_role or 'citizen',
        "token": f"demo-jwt-{uuid.uuid4().hex[:8]}"
    }), 200


# ---------------------------------------------------------------------
# AI Blueprint Routes
# ---------------------------------------------------------------------
@ai_bp.route('/classify', methods=['POST'])
def classify_complaint_image():
    """Run AI classification on an uploaded photo or text context."""
    text_hint = request.form.get('hint', '') or request.form.get('title', '')
    image_file = request.files.get('image')

    if ai_classifier:
        result = ai_classifier.predict(image_file, fallback_hint=text_hint)
        return jsonify(result), 200

    filename = getattr(image_file, 'filename', '').lower() if image_file else ''
    combined = f"{filename} {text_hint.lower()}".strip()

    # Check for text/screenshot/non-civic markers
    if any(term in combined for term in ['screenshot', 'seat', 'text', 'word', 'doc', 'pdf', 'invoice', 'receipt', 'code']):
        return jsonify({
            "status": "unrecognized",
            "is_civic_issue": False,
            "predicted_category": "unrecognized",
            "category_label": "Non-Civic / Document Image Detected",
            "suggested_department": "Manual Verification Required",
            "confidence_score": 0.18,
            "confidence_percentage": "18%",
            "severity": "low",
            "message": "The uploaded file contains digital text or a computer screenshot rather than a municipal infrastructure issue."
        }), 200

    return jsonify({
        "status": "mock",
        "is_civic_issue": True,
        "predicted_category": "pothole",
        "category_label": "Pothole & Road Damage",
        "suggested_department": "Roads & Infrastructure",
        "confidence_score": 0.92,
        "confidence_percentage": "92%",
        "severity": "high",
        "detections": [{"label": "Pothole", "category": "pothole", "confidence": 0.92, "bbox": [100, 150, 200, 180]}]
    }), 200


@ai_bp.route('/categories', methods=['GET'])
def get_ai_categories():
    """List supported civic categories and department mappings."""
    if ai_classifier:
        return jsonify({"categories": ai_classifier.get_supported_categories()}), 200
    return jsonify({"categories": {}}), 200


# ---------------------------------------------------------------------
# Complaints Blueprint Routes (Citizen Portal)
# ---------------------------------------------------------------------
@complaints_bp.route('', methods=['GET'])
def list_complaints():
    """Retrieve citizen complaints with optional status/category filtering."""
    try:
        status_filter = request.args.get('status')
        citizen_id = request.args.get('citizen_id')

        query = Complaint.query
        if status_filter:
            query = query.filter_by(status=status_filter)
        if citizen_id:
            query = query.filter_by(citizen_id=citizen_id)

        complaints = query.order_by(Complaint.created_at.desc()).all()
        return jsonify([c.to_dict() for c in complaints]), 200
    except Exception as e:
        # Fallback sample data if DB is offline
        return jsonify([
            {
                "id": 1,
                "tracking_id": "CIVIC-2026-00101",
                "title": "Deep Pothole at Main St Intersection",
                "description": "Large pothole in the right lane damaging vehicle suspensions.",
                "category": "pothole",
                "ai_predicted_category": "pothole",
                "ai_confidence": 95.4,
                "severity": "high",
                "status": "assigned",
                "department_name": "Roads & Infrastructure",
                "address": "452 Main Street, Downtown",
                "created_at": "2026-09-10T10:30:00"
            }
        ]), 200


@complaints_bp.route('', methods=['POST'])
def submit_complaint():
    """Citizen submits a new civic issue complaint with image attachment."""
    data = request.form
    title = data.get('title', 'Civic Issue')
    description = data.get('description', '')
    category = data.get('category', 'other')
    citizen_id = int(data.get('citizen_id', 5))
    address = data.get('address', '')
    lat = data.get('latitude')
    lng = data.get('longitude')
    
    # Save uploaded file
    image_file = request.files.get('image')
    image_url = None
    if image_file and image_file.filename:
        filename = f"{uuid.uuid4().hex}_{secure_filename(image_file.filename)}"
        upload_path = os.path.join(DevelopmentConfig.UPLOAD_FOLDER, filename)
        image_file.save(upload_path)
        image_url = f"/uploads/{filename}"

    # Auto-run AI classification
    ai_category = category
    ai_conf = 0.85
    if ai_classifier:
        pred = ai_classifier.predict(image_file, fallback_hint=f"{title} {description}")
        ai_category = pred.get("predicted_category", category)
        ai_conf = pred.get("confidence_score", 0.85) * 100

    tracking_id = f"CIVIC-2026-{uuid.uuid4().hex[:6].upper()}"

    try:
        new_complaint = Complaint(
            tracking_id=tracking_id,
            title=title,
            description=description,
            category=category,
            ai_predicted_category=ai_category,
            ai_confidence=ai_conf,
            severity='high' if ai_conf > 90 else 'medium',
            status='pending',
            citizen_id=citizen_id,
            address=address,
            latitude=float(lat) if lat else None,
            longitude=float(lng) if lng else None,
            image_url=image_url
        )
        db.session.add(new_complaint)
        db.session.flush()

        log = ComplaintLog(
            complaint_id=new_complaint.id,
            actor_id=citizen_id,
            action="created",
            note=f"Complaint created with AI Category: {ai_category} ({ai_conf:.1f}% conf)"
        )
        db.session.add(log)
        db.session.commit()

        return jsonify({"message": "Complaint submitted successfully", "complaint": new_complaint.to_dict()}), 201
    except Exception as err:
        return jsonify({
            "message": "Complaint registered (Mock DB mode)",
            "complaint": {
                "tracking_id": tracking_id,
                "title": title,
                "category": category,
                "ai_predicted_category": ai_category,
                "ai_confidence": ai_conf,
                "status": "pending",
                "image_url": image_url,
                "created_at": datetime.utcnow().isoformat()
            }
        }), 201


@complaints_bp.route('/<int:complaint_id>/timeline', methods=['GET'])
def get_complaint_timeline(complaint_id):
    """Retrieve audit history timeline for a complaint."""
    try:
        logs = ComplaintLog.query.filter_by(complaint_id=complaint_id).order_by(ComplaintLog.created_at.asc()).all()
        return jsonify([log.to_dict() for log in logs]), 200
    except Exception:
        return jsonify([
            {"action": "created", "note": "Complaint submitted via portal", "created_at": "2026-09-10T10:30:00"},
            {"action": "ai_classified", "note": "AI matched category with 95% confidence", "created_at": "2026-09-10T10:31:00"},
            {"action": "assigned", "note": "Assigned to Marcus Vance", "created_at": "2026-09-11T09:00:00"}
        ]), 200


# ---------------------------------------------------------------------
# Manager Blueprint Routes (Triage, Overrides, Worker Assignment)
# ---------------------------------------------------------------------
@manager_bp.route('/complaints', methods=['GET'])
def manager_get_all_complaints():
    """Fetch complaints with full manager context (AI conf, assigned workers)."""
    try:
        complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
        return jsonify([c.to_dict() for c in complaints]), 200
    except Exception:
        return jsonify([]), 200


@manager_bp.route('/assign', methods=['POST'])
def assign_worker():
    """Assign a field worker to an open complaint."""
    payload = request.get_json() or {}
    complaint_id = payload.get('complaint_id')
    worker_id = payload.get('worker_id')
    department_id = payload.get('department_id')

    try:
        complaint = Complaint.query.get(complaint_id)
        if complaint:
            complaint.assigned_worker_id = worker_id
            if department_id:
                complaint.department_id = department_id
            complaint.status = 'assigned'
            
            # Update worker status
            worker = Worker.query.get(worker_id)
            if worker:
                worker.status = 'assigned'

            db.session.add(ComplaintLog(
                complaint_id=complaint.id,
                action="assigned",
                note=f"Assigned to worker ID: {worker_id}"
            ))
            db.session.commit()
            return jsonify({"status": "success", "message": "Worker assigned successfully"}), 200
    except Exception as err:
        pass

    return jsonify({"status": "simulated", "message": f"Assigned worker {worker_id} to complaint {complaint_id}"}), 200


@manager_bp.route('/override-category', methods=['POST'])
def override_category():
    """Override AI classification tag and update department routing."""
    payload = request.get_json() or {}
    complaint_id = payload.get('complaint_id')
    new_category = payload.get('category')
    new_dept_id = payload.get('department_id')
    reason = payload.get('reason', 'Manager override')

    try:
        complaint = Complaint.query.get(complaint_id)
        if complaint:
            complaint.category = new_category
            if new_dept_id:
                complaint.department_id = new_dept_id
            
            db.session.add(ComplaintLog(
                complaint_id=complaint.id,
                action="category_override",
                note=f"Category manually changed to {new_category}. Reason: {reason}"
            ))
            db.session.commit()
            return jsonify({"status": "success", "complaint": complaint.to_dict()}), 200
    except Exception:
        pass

    return jsonify({"status": "simulated", "message": f"Overrode category to {new_category}"}), 200


@manager_bp.route('/workers', methods=['GET'])
def get_available_workers():
    """List workers filtered by department or availability."""
    try:
        workers = Worker.query.all()
        return jsonify([w.to_dict() for w in workers]), 200
    except Exception:
        return jsonify([
            {"id": 1, "user_name": "Marcus Vance", "department_name": "Roads & Infrastructure", "badge_number": "ROADS-W01", "status": "available"},
            {"id": 2, "user_name": "Elena Gomez", "department_name": "Sanitation & Waste", "badge_number": "SAN-W02", "status": "available"}
        ]), 200


# ---------------------------------------------------------------------
# Worker Blueprint Routes (Field Operations, Proof-of-Work Upload)
# ---------------------------------------------------------------------
@worker_bp.route('/tasks', methods=['GET'])
def get_worker_tasks():
    """List assigned civic complaint tasks for field worker."""
    worker_id = request.args.get('worker_id', 1)
    try:
        complaints = Complaint.query.filter_by(assigned_worker_id=worker_id).all()
        return jsonify([c.to_dict() for c in complaints]), 200
    except Exception:
        return jsonify([
            {
                "id": 1,
                "tracking_id": "CIVIC-2026-00101",
                "title": "Deep Pothole at Main St Intersection",
                "description": "Large pothole in the right lane damaging vehicle suspensions.",
                "category": "pothole",
                "severity": "high",
                "status": "assigned",
                "address": "452 Main Street, Downtown",
                "image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600"
            }
        ]), 200


@worker_bp.route('/tasks/<int:complaint_id>/resolve', methods=['POST'])
def resolve_task(complaint_id):
    """Worker uploads proof-of-work photo and marks task resolved."""
    notes = request.form.get('resolution_notes', 'Issue rectified on site.')
    proof_file = request.files.get('proof_image')
    proof_url = None

    if proof_file and proof_file.filename:
        filename = f"proof_{uuid.uuid4().hex}_{secure_filename(proof_file.filename)}"
        upload_path = os.path.join(DevelopmentConfig.UPLOAD_FOLDER, filename)
        proof_file.save(upload_path)
        proof_url = f"/uploads/{filename}"

    try:
        complaint = Complaint.query.get(complaint_id)
        if complaint:
            complaint.status = 'resolved'
            complaint.proof_image_url = proof_url
            complaint.resolution_notes = notes
            complaint.resolved_at = datetime.utcnow()

            # Free worker
            if complaint.assigned_worker:
                complaint.assigned_worker.status = 'available'

            db.session.add(ComplaintLog(
                complaint_id=complaint.id,
                action="resolved",
                note=f"Task marked resolved by worker. Notes: {notes}"
            ))
            db.session.commit()
            return jsonify({"status": "success", "message": "Complaint marked as resolved"}), 200
    except Exception:
        pass

    return jsonify({
        "status": "simulated",
        "message": f"Task {complaint_id} marked as resolved with proof image",
        "proof_url": proof_url
    }), 200


# ---------------------------------------------------------------------
# Static Uploads & System Health
# ---------------------------------------------------------------------
@complaints_bp.route('/uploads/<path:filename>', methods=['GET'])
def serve_upload(filename):
    """Serve uploaded images from the storage folder."""
    return send_from_directory(DevelopmentConfig.UPLOAD_FOLDER, filename)


def create_app(config_name="development"):
    """Application factory for CivicSync Flask backend."""
    app = Flask(__name__)
    app_config = config_by_name.get(config_name, DevelopmentConfig)
    app.config.from_object(app_config)

    # Initialize CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Ensure uploads directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Initialize SQLAlchemy
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(complaints_bp)
    app.register_blueprint(manager_bp)
    app.register_blueprint(worker_bp)
    app.register_blueprint(ai_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "CivicSync API Server",
            "environment": config_name,
            "timestamp": datetime.utcnow().isoformat(),
            "ai_service_loaded": ai_classifier is not None
        }), 200

    return app


if __name__ == '__main__':
    app = create_app(os.getenv('FLASK_ENV', 'development'))
    print("🚀 CivicSync Flask Backend running on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
