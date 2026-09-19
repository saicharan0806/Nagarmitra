"""
Nagarmitra Database Viewer Utility
----------------------------------
Convenient CLI tool to inspect live MySQL records.
Usage:
    python scripts/view_db.py users
    python scripts/view_db.py complaints
    python scripts/view_db.py workers
    python scripts/view_db.py all
"""

import sys
import os
import pymysql
from pathlib import Path
from dotenv import load_dotenv

# Load .env
env_path = Path(__file__).resolve().parent.parent / '.env'
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", 3306))
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "root")
MYSQL_DB = os.getenv("MYSQL_DB", "civisync_db")


def get_connection():
    return pymysql.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )


def show_users():
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT id, full_name, email, role, phone, preferred_language, is_active, created_at FROM users ORDER BY id;")
        rows = cur.fetchall()
        print("\n" + "="*80)
        print(f" USERS TABLE (`civisync_db`.`users`) - Total: {len(rows)}")
        print("="*80)
        print(f"{'ID':<4} | {'Role':<9} | {'Full Name':<22} | {'Email':<30} | {'Lang':<8}")
        print("-"*80)
        for r in rows:
            print(f"{r['id']:<4} | {r['role'].upper():<9} | {r['full_name']:<22} | {r['email']:<30} | {str(r.get('preferred_language') or 'English'):<8}")
    conn.close()


def show_complaints():
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("""
        SELECT c.id, c.tracking_id, c.title, c.category, c.status, c.severity, 
               u.full_name as citizen_name, d.name as dept_name, c.created_at
        FROM complaints c
        LEFT JOIN users u ON c.citizen_id = u.id
        LEFT JOIN departments d ON c.department_id = d.id
        ORDER BY c.id DESC;
        """)
        rows = cur.fetchall()
        print("\n" + "="*95)
        print(f" COMPLAINTS TABLE (`civisync_db`.`complaints`) - Total: {len(rows)}")
        print("="*95)
        print(f"{'ID':<4} | {'Tracking ID':<18} | {'Status':<12} | {'Category':<15} | {'Citizen':<16} | {'Title'}")
        print("-"*95)
        for r in rows:
            print(f"{r['id']:<4} | {r['tracking_id']:<18} | {r['status'].upper():<12} | {r['category']:<15} | {str(r['citizen_name']):<16} | {r['title'][:25]}")
    conn.close()


def show_workers():
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("""
        SELECT w.id, w.badge_number, w.status, w.designation, u.full_name, u.email, d.name as dept_name
        FROM workers w
        JOIN users u ON w.user_id = u.id
        JOIN departments d ON w.department_id = d.id
        ORDER BY w.id;
        """)
        rows = cur.fetchall()
        print("\n" + "="*85)
        print(f" WORKERS TABLE (`civisync_db`.`workers`) - Total: {len(rows)}")
        print("="*85)
        print(f"{'ID':<4} | {'Badge':<12} | {'Status':<10} | {'Name':<18} | {'Department':<24} | {'Designation'}")
        print("-"*85)
        for r in rows:
            print(f"{r['id']:<4} | {r['badge_number']:<12} | {r['status'].upper():<10} | {r['full_name']:<18} | {r['dept_name']:<24} | {r['designation']}")
    conn.close()


if __name__ == '__main__':
    arg = (sys.argv[1] if len(sys.argv) > 1 else 'all').lower()
    if arg in ['users', 'user']:
        show_users()
    elif arg in ['complaints', 'complaint', 'tickets']:
        show_complaints()
    elif arg in ['workers', 'worker']:
        show_workers()
    else:
        show_users()
        show_workers()
        show_complaints()
