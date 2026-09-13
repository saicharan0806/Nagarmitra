"""
CivicSync Backend Configuration
--------------------------------
Handles environment variable loading, database connection URI generation (MySQL via PyMySQL),
file upload paths, and application security settings.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root or backend folder
env_path = Path(__file__).resolve().parent.parent / '.env'
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()


class Config:
    """Base Configuration"""
    SECRET_KEY = os.getenv("SECRET_KEY", "civisync-dev-super-secret-key-2026")
    
    # MySQL Database Configuration
    MYSQL_USER = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
    MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
    MYSQL_PORT = os.getenv("MYSQL_PORT", "3306")
    MYSQL_DB = os.getenv("MYSQL_DB", "civisync_db")
    
    # Primary SQLAlchemy Database URI using PyMySQL
    DEFAULT_MYSQL_URI = (
        f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"
    )
    
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", DEFAULT_MYSQL_URI)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_recycle": 280,
        "pool_pre_ping": True,
    }

    # Uploads Configuration
    BASE_DIR = Path(__file__).resolve().parent
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", str(BASE_DIR / "uploads"))
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload size
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}

    # AI Service Integration
    AI_SERVICE_ENABLED = os.getenv("AI_SERVICE_ENABLED", "True").lower() in ("true", "1", "yes")
    AI_WEIGHTS_PATH = os.getenv(
        "AI_WEIGHTS_PATH", 
        str(Path(__file__).resolve().parent.parent / "ai_service" / "weights" / "yolov8n_civic.pt")
    )


class DevelopmentConfig(Config):
    """Development configuration with debugging enabled"""
    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    """Testing configuration with SQLite in-memory database"""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"


class ProductionConfig(Config):
    """Production configuration with strict settings"""
    DEBUG = False
    TESTING = False


config_by_name = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}
