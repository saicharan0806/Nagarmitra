"""
Utility script to generate sample test images for CivicSync AI triage testing:
1. pothole_sample.jpg - Realistic road texture with dark bitumen crater
2. garbage_sample.jpg - Municipal waste bin simulation
3. invoice_document.jpg - Flat paper document with text lines (triggers non-civic rejection)
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw

output_dir = Path(__file__).resolve().parent.parent / "test_assets"
output_dir.mkdir(exist_ok=True)

# 1. Pothole / Asphalt image (dark textured road with irregular dark crater)
pothole_img = Image.new("RGB", (640, 480), color=(48, 48, 52))
draw = ImageDraw.Draw(pothole_img)
# Asphalt speckles
import random
random.seed(42)
for _ in range(4000):
    x = random.randint(0, 639)
    y = random.randint(0, 479)
    c = random.randint(35, 75)
    draw.point((x, y), fill=(c, c, c))
# Crater
draw.ellipse([180, 150, 460, 340], fill=(22, 22, 26), outline=(60, 60, 65), width=4)
draw.ellipse([220, 180, 420, 310], fill=(12, 12, 14))
pothole_path = output_dir / "pothole_sample.jpg"
pothole_img.save(pothole_path, quality=95)
print(f"[CREATED] {pothole_path}")

# 2. Garbage Dump image (colorful mixed refuse texture)
garbage_img = Image.new("RGB", (640, 480), color=(85, 80, 75))
draw_g = ImageDraw.Draw(garbage_img)
# Dumpster outline
draw_g.rectangle([120, 120, 520, 400], fill=(45, 95, 60), outline=(30, 70, 40), width=6)
# Overflowing trash shapes
colors = [(200, 50, 50), (50, 120, 200), (220, 200, 60), (220, 220, 220), (160, 120, 80)]
for _ in range(80):
    gx = random.randint(140, 500)
    gy = random.randint(80, 320)
    gw = random.randint(15, 45)
    gh = random.randint(15, 35)
    col = random.choice(colors)
    draw_g.rectangle([gx, gy, gx + gw, gy + gh], fill=col)
garbage_path = output_dir / "garbage_sample.jpg"
garbage_img.save(garbage_path, quality=95)
print(f"[CREATED] {garbage_path}")

# 3. Flat White Document / Invoice (triggers non-civic rejection)
doc_img = Image.new("RGB", (640, 480), color=(250, 250, 252))
draw_d = ImageDraw.Draw(doc_img)
# Document header & horizontal text lines
draw_d.rectangle([40, 40, 600, 70], fill=(230, 235, 240))
for y in range(100, 420, 25):
    line_w = random.randint(280, 520)
    draw_d.rectangle([50, y, 50 + line_w, y + 8], fill=(180, 185, 190))
doc_path = output_dir / "invoice_document.jpg"
doc_img.save(doc_path, quality=95)
print(f"[CREATED] {doc_path}")

print("[DONE] Sample test images generated in test_assets/")
