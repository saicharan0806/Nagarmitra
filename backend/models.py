"""
CivicSync Backend Models
------------------------
SQLAlchemy models for Users, Departments, Workers, Complaints, Audit Logs, and Feedback.
Matches the MySQL schema and provides dictionary serialization methods for REST APIs.
"""

from datetime import datetime
# pyrefly: ignore [missing-import]
from flask_sqlalchemy import SQLAlchemy
# pyrefly: ignore [missing-import]
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    """System users: citizens, department managers, field workers, and admins."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(25), nullable=True)
    preferred_language = db.Column(db.String(50), default='English', nullable=True)
    role = db.Column(
        db.Enum('citizen', 'manager', 'worker', 'admin', name='user_roles'),
        default='citizen',
        nullable=False,
        index=True
    )
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    complaints = db.relationship('Complaint', backref='citizen', lazy='dynamic', foreign_keys='Complaint.citizen_id')
    worker_profile = db.relationship('Worker', backref='user', uselist=False, cascade="all, delete-orphan")
    feedbacks = db.relationship('Feedback', backref='citizen', lazy='dynamic')

    def set_password(self, password: str):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'preferred_language': self.preferred_language or 'English',
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Department(db.Model):
    """Civic departments (Roads, Sanitation, Electrical, Water, etc.)."""
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    code = db.Column(db.String(30), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    contact_email = db.Column(db.String(150), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    workers = db.relationship('Worker', backref='department', lazy='dynamic')
    complaints = db.relationship('Complaint', backref='department', lazy='dynamic')

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'description': self.description,
            'contact_email': self.contact_email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Worker(db.Model):
    """Field operations staff assigned to complaints."""
    __tablename__ = 'workers'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False, index=True)
    designation = db.Column(db.String(100), default='Field Operations Worker', nullable=False)
    badge_number = db.Column(db.String(50), unique=True, nullable=False)
    status = db.Column(
        db.Enum('available', 'assigned', 'off_duty', name='worker_status'),
        default='available',
        nullable=False,
        index=True
    )
    skills = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    assigned_complaints = db.relationship('Complaint', backref='assigned_worker', lazy='dynamic')

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.user.full_name if self.user else None,
            'user_email': self.user.email if self.user else None,
            'department_id': self.department_id,
            'department_name': self.department.name if self.department else None,
            'designation': self.designation,
            'badge_number': self.badge_number,
            'status': self.status,
            'skills': self.skills
        }


class Complaint(db.Model):
    """Core civic issue complaint submitted by citizens and triaged by managers."""
    __tablename__ = 'complaints'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tracking_id = db.Column(db.String(40), unique=True, nullable=False, index=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(80), nullable=False, index=True)
    ai_predicted_category = db.Column(db.String(80), nullable=True)
    ai_confidence = db.Column(db.Numeric(5, 2), nullable=True)
    severity = db.Column(
        db.Enum('low', 'medium', 'high', 'critical', name='complaint_severity'),
        default='medium',
        nullable=False
    )
    status = db.Column(
        db.Enum('pending', 'verified', 'assigned', 'in_progress', 'resolved', 'rejected', name='complaint_status'),
        default='pending',
        nullable=False,
        index=True
    )
    citizen_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id', ondelete='SET NULL'), nullable=True, index=True)
    assigned_worker_id = db.Column(db.Integer, db.ForeignKey('workers.id', ondelete='SET NULL'), nullable=True, index=True)
    
    latitude = db.Column(db.Numeric(10, 7), nullable=True)
    longitude = db.Column(db.Numeric(10, 7), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    landmark = db.Column(db.String(150), nullable=True)

    image_url = db.Column(db.String(500), nullable=True)
    proof_image_url = db.Column(db.String(500), nullable=True)
    resolution_notes = db.Column(db.Text, nullable=True)
    resolved_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    timeline_logs = db.relationship('ComplaintLog', backref='complaint', lazy='dynamic', cascade="all, delete-orphan")
    feedback = db.relationship('Feedback', backref='complaint', uselist=False, cascade="all, delete-orphan")

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'tracking_id': self.tracking_id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'ai_predicted_category': self.ai_predicted_category,
            'ai_confidence': float(self.ai_confidence) if self.ai_confidence is not None else None,
            'severity': self.severity,
            'status': self.status,
            'citizen_id': self.citizen_id,
            'citizen_name': self.citizen.full_name if self.citizen else None,
            'department_id': self.department_id,
            'department_name': self.department.name if self.department else None,
            'assigned_worker_id': self.assigned_worker_id,
            'assigned_worker_name': self.assigned_worker.user.full_name if self.assigned_worker and self.assigned_worker.user else None,
            'assigned_worker_badge': self.assigned_worker.badge_number if self.assigned_worker else None,
            'latitude': float(self.latitude) if self.latitude is not None else None,
            'longitude': float(self.longitude) if self.longitude is not None else None,
            'address': self.address,
            'landmark': self.landmark,
            'image_url': self.image_url,
            'proof_image_url': self.proof_image_url,
            'resolution_notes': self.resolution_notes,
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class ComplaintLog(db.Model):
    """Audit timeline events for tracking status changes and worker actions."""
    __tablename__ = 'complaint_logs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    complaint_id = db.Column(db.Integer, db.ForeignKey('complaints.id', ondelete='CASCADE'), nullable=False, index=True)
    actor_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    action = db.Column(db.String(80), nullable=False)
    note = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    actor = db.relationship('User', foreign_keys=[actor_id])

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'complaint_id': self.complaint_id,
            'actor_id': self.actor_id,
            'actor_name': self.actor.full_name if self.actor else "System",
            'action': self.action,
            'note': self.note,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Feedback(db.Model):
    """Citizen satisfaction ratings and comments on resolved civic issues."""
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    complaint_id = db.Column(db.Integer, db.ForeignKey('complaints.id', ondelete='CASCADE'), nullable=False, unique=True)
    citizen_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    rating = db.Column(db.SmallInteger, nullable=False)
    comments = db.Column(db.Text, nullable=True)
    is_satisfied = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'complaint_id': self.complaint_id,
            'citizen_id': self.citizen_id,
            'citizen_name': self.citizen.full_name if self.citizen else None,
            'rating': self.rating,
            'comments': self.comments,
            'is_satisfied': self.is_satisfied,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
