"""
Master Compiler for CivicSync 70-Page Academic Project Documentation
---------------------------------------------------------------------
Compiles Front Matter and Chapters 1 through 14 into a unified,
professionally formatted Word document (.docx).
"""

import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

# Ensure current directory is on sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.doc_content.front_matter import build_front_matter
from scripts.doc_content.chapter1_intro import build_chapter1
from scripts.doc_content.chapter2_literature import build_chapter2
from scripts.doc_content.chapter3_reqs import build_chapter3
from scripts.doc_content.chapter4_techstack import build_chapter4
from scripts.doc_content.chapter5_design import build_chapter5
from scripts.doc_content.chapter6_impl import build_chapter6
from scripts.doc_content.chapter7_features import build_chapter7
from scripts.doc_content.chapter8_testing import build_chapter8
from scripts.doc_content.chapter9_deployment import build_chapter9
from scripts.doc_content.chapter10_challenges import build_chapter10
from scripts.doc_content.chapter11_future import build_chapter11
from scripts.doc_content.chapter12_conclusion import build_chapter12
from scripts.doc_content.chapter13_refs import build_chapter13
from scripts.doc_content.chapter14_appendices import build_chapter14

def add_page_number_to_footer(footer):
    """Inserts a dynamic Word PAGE field into the section footer."""
    p = footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run("Page ")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)
    
    fldSimple = parse_xml(r'<w:fldSimple %s w:instr="PAGE"/>' % nsdecls('w'))
    p._p.append(fldSimple)

def generate_report():
    print("[1/16] Initializing Word Document...")
    doc = docx.Document()

    # Standard Academic Margins (1.0 inch)
    for sec in doc.sections:
        sec.top_margin = Inches(1.0)
        sec.bottom_margin = Inches(1.0)
        sec.left_margin = Inches(1.0)
        sec.right_margin = Inches(1.0)
        # Header / Footer distance
        sec.header_distance = Inches(0.5)
        sec.footer_distance = Inches(0.5)
        add_page_number_to_footer(sec.footer)

    # Base Normal Style Configuration
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(12)
    normal_style.font.color.rgb = RGBColor(0x1F, 0x29, 0x37)
    normal_style.paragraph_format.line_spacing = 1.35
    normal_style.paragraph_format.space_after = Pt(6)

    print("[2/16] Building Front Matter (Title Page, Declaration, Certificate, Abstract, TOC)...")
    build_front_matter(doc)

    print("[3/16] Building Chapter 1: Introduction...")
    build_chapter1(doc)

    print("[4/16] Building Chapter 2: Literature Survey & Related Work...")
    build_chapter2(doc)

    print("[5/16] Building Chapter 3: System Requirements Specification...")
    build_chapter3(doc)

    print("[6/16] Building Chapter 4: Technology Stack Deep Dive...")
    build_chapter4(doc)

    print("[7/16] Building Chapter 5: System Architecture & Design...")
    build_chapter5(doc)

    print("[8/16] Building Chapter 6: Implementation & Algorithmic Details...")
    build_chapter6(doc)

    print("[9/16] Building Chapter 7: System Features & Walkthrough...")
    build_chapter7(doc)

    print("[10/16] Building Chapter 8: Testing & Quality Assurance...")
    build_chapter8(doc)

    print("[11/16] Building Chapter 9: Deployment & Operations Guide...")
    build_chapter9(doc)

    print("[12/16] Building Chapter 10: Challenges & Applied Solutions...")
    build_chapter10(doc)

    print("[13/16] Building Chapter 11: Future Scope & Roadmap...")
    build_chapter11(doc)

    print("[14/16] Building Chapter 12: Conclusion & Key Learnings...")
    build_chapter12(doc)

    print("[15/16] Building Chapter 13: References & Citations...")
    build_chapter13(doc)

    print("[16/16] Building Chapter 14: Appendices (Code & Manuals)...")
    build_chapter14(doc)

    output_path = "CivicSync_Project_Documentation.docx"
    doc.save(output_path)
    file_size = os.path.getsize(output_path)
    print(f"\n[SUCCESS] Generated Comprehensive Academic Report: {output_path}")
    print(f"File Size: {file_size:,} bytes (~{file_size / (1024*1024):.2f} MB)")

if __name__ == "__main__":
    generate_report()
