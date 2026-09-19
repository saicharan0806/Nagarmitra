"""
Download Official YOLOv8 Neural Network Checkpoint
--------------------------------------------------
Downloads the lightweight YOLOv8 Nano weights (~6MB) from the official
Ultralytics GitHub release into ai_service/weights/yolov8n.pt.
"""

import os
import sys
import urllib.request
from pathlib import Path

WEIGHTS_DIR = Path(__file__).resolve().parent.parent / "ai_service" / "weights"
WEIGHTS_DIR.mkdir(parents=True, exist_ok=True)
TARGET_FILE = WEIGHTS_DIR / "yolov8n.pt"

YOLO_URL = "https://github.com/ultralytics/assets/releases/download/v8.2.0/yolov8n.pt"


def download_weights():
    if TARGET_FILE.exists() and TARGET_FILE.stat().st_size > 1_000_000:
        print(f"[EXISTS] YOLOv8 model weights already present: {TARGET_FILE} ({TARGET_FILE.stat().st_size} bytes)")
        return True

    print(f"Downloading official YOLOv8 Nano weights from:\n  {YOLO_URL}\nTo:\n  {TARGET_FILE}...")
    try:
        urllib.request.urlretrieve(YOLO_URL, TARGET_FILE)
        size = TARGET_FILE.stat().st_size
        print(f"[SUCCESS] Download completed successfully! Model size: {size / (1024 * 1024):.2f} MB")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to download YOLO weights: {e}")
        return False


if __name__ == "__main__":
    success = download_weights()
    sys.exit(0 if success else 1)
