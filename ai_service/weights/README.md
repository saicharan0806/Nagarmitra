# Weights Directory for CivicSync AI Service

This directory is designated for storing machine learning model weights, ONNX runtimes, and YOLO checkpoints used by `ai_service/model.py`.

## Supported Models
- **YOLOv8 Civic Detector**: `weights/yolov8n_civic.pt` (Nano) or `weights/yolov8s_civic.pt` (Small)
- **ONNX Inference Model**: `weights/civic_classifier.onnx`
- **Haar Cascades / OpenCV DNN Models**: `weights/opencv_dnn.caffemodel` or `.pb`

## Recommended Model Setup
Place your trained weight files in this directory. If no weights file is found, `ai_service/model.py` runs in **Simulated Fallback Mode**, allowing end-to-end API testing and pipeline verification without requiring GPU acceleration or downloaded weights.
