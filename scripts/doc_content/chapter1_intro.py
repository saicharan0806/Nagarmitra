"""
Chapter 1: Introduction
Comprehensive academic chapter covering background, problem statement,
scope, objectives, societal importance, and stakeholder personas.
"""

from .helpers import (
    add_chapter_heading, add_heading2, add_heading3, add_body, add_bullet
)

def build_chapter1(doc):
    add_chapter_heading(doc, 1, "INTRODUCTION")

    add_heading2(doc, "1.1 Context and Background of Urban Governance in Smart Cities")
    add_body(
        doc,
        "The twenty-first century is characterized by unprecedented urban expansion. According to projections by the "
        "United Nations Department of Economic and Social Affairs (UNDESA), over 68% of the global human population "
        "will reside in urban agglomerations by the year 2050, with developing economies in Asia and Africa witnessing "
        "the fastest transition. In India, the rapid growth of tier-1 and tier-2 metropolitan centers has created enormous "
        "economic vitality, industrial growth, and educational opportunities. However, this demographic acceleration "
        "has severely outpaced the operational and technical capacities of municipal corporations and Urban Local Bodies (ULBs)."
    )
    add_body(
        doc,
        "Urban infrastructure—encompassing asphalt road networks, stormwater drains, solid waste collection dumpsters, "
        "potable water distribution pipelines, and street illumination systems—forms the lifeblood of daily city life. "
        "When these physical assets suffer degradation, the resulting socioeconomic consequences are severe. Unrepaired potholes "
        "and road craters on arterial thoroughfares lead to catastrophic vehicular accidents, permanent physical injuries, and "
        "loss of human life, particularly among vulnerable two-wheeler commuters. Concurrently, unattended municipal garbage "
        "dumps overflow into public pedestrian pathways, releasing bioaerosols, generating toxic leachate that contaminates urban "
        "soil and groundwater reserves, and providing fertile breeding grounds for vector-borne epidemics such as dengue, "
        "chikungunya, and malaria."
    )
    add_body(
        doc,
        "Historically, municipal governance operated on passive, highly bureaucratic administrative models. Citizens encountering "
        "a civic defect were forced to physically visit municipal ward offices, locate jurisdictional engineers across maze-like "
        "bureaucratic hierarchies, and draft handwritten grievance letters that were cataloged into physical ledger books. "
        "These manual records were frequently misplaced, subject to bureaucratic apathy, and possessed zero auditability. "
        "Even with the advent of first-generation electronic municipal web portals over the past decade, the core grievance "
        "workflow remained fundamentally unchanged: portals simply substituted paper forms with flat digital forms consisting "
        "of dozens of text inputs, lacking automated validation, visual verification, or spatial intelligence."
    )
    add_body(
        doc,
        "The confluence of mobile edge computing, high-speed cellular networks (4G/5G), and breakthrough advancements in "
        "Deep Learning Computer Vision now presents a profound opportunity to radically restructure municipal administration. "
        "CivicSync (Nagarmitra) is conceived to operationalize this vision. By harnessing real-time convolutional neural networks, "
        "interactive geographic information systems (GIS), and an interconnected three-tier operational workflow, CivicSync converts "
        "every citizen smartphone into an intelligent sensor node, bridging the communication chasm between urban residents "
        "and city authorities."
    )

    add_heading2(doc, "1.2 Evolution of Municipal Grievance Redressal Systems")
    add_body(
        doc,
        "To comprehend the imperative for CivicSync, it is necessary to examine the historical evolution of municipal "
        "complaint systems across three distinct paradigms:",
        bold_prefix="Paradigms of Civic Redressal: "
    )
    add_bullet(
        doc,
        "Characterized by manual paper registers, physical visits to municipal corporation headquarters, and reliance on ward councilors. "
        "Average turnaround time for basic pothole repairs exceeded 30 to 45 days. Lack of documentation meant zero accountability, "
        "high risk of corruption, and total exclusion of citizens who could not spare time during working hours to visit municipal offices.",
        bold_prefix="1. Era of Physical Bureaucracy (1970 - 2005): "
    )
    add_bullet(
        doc,
        "Introduction of computerized municipal websites and centralized telephonic call centers (e.g., dial-in civic helplines). "
        "While reducing physical travel, these portals suffered from 'black-hole triage': complaints were entered into digital databases, "
        "but manual sorting by administrative clerks caused backlogs of thousands of unresolved tickets. Complaints lacked photographic "
        "evidence and precise GPS coordinates, resulting in field teams visiting incorrect streets or dismissing valid grievances.",
        bold_prefix="2. Era of Static Digital Portals (2006 - 2020): "
    )
    add_bullet(
        doc,
        "The contemporary paradigm embodied by CivicSync. In this paradigm, grievances are no longer treated as unstructured text. "
        "Instead, every submission is an AI-triaged, spatially indexed data point with embedded photographic proof, automated severity "
        "ranking, dynamic SLA countdowns, and mandatory before-and-after photo verification. The paradigm shifts governance from "
        "passive complaint handling to proactive, data-driven municipal asset management.",
        bold_prefix="3. Era of AI-Powered Cognitive Governance (2021 - Present): "
    )

    add_heading2(doc, "1.3 Detailed Problem Statement & Gap Analysis")
    add_body(
        doc,
        "A rigorous empirical investigation of existing municipal redressal workflows in major urban centers reveals six "
        "critical systemic deficiencies:",
        bold_prefix="Core Problem Statement: "
    )
    add_bullet(
        doc,
        "Municipal clerical staff lack technical civil engineering training to distinguish between complex civic failures. "
        "For instance, when a citizen reports 'water stagnant on road', clerical workers frequently route the ticket to the "
        "Sanitation Department (assuming dirty water) rather than the Stormwater Drainage Engineering Wing. This misrouting "
        "generates an average delay of 5 to 9 days as tickets are passed back and forth between administrative silos.",
        bold_prefix="1. High Latency and Error in Manual Triage: "
    )
    add_bullet(
        doc,
        "Text descriptions submitted by citizens are notoriously subjective and ambiguous. A description such as 'big pit near supermarket' "
        "provides zero quantifiable engineering data regarding depth, diameter, or vehicular hazard level. Consequently, municipal "
        "repair crews are dispatched without proper machinery or asphalt volume estimates, necessitating multiple exploratory visits.",
        bold_prefix="2. Ambiguity and Subjectivity in Text Reports: "
    )
    add_bullet(
        doc,
        "Conventional portals process complaints in strict chronological First-In, First-Out (FIFO) sequence. Consequently, a cosmetic "
        "weed overgrowth on a sidewalk is scheduled ahead of an acute road subsidence on a high-speed arterial road, resulting in "
        "severe misallocation of emergency repair resources and avoidable accidents.",
        bold_prefix="3. Absence of Quantitative Severity Assessment: "
    )
    add_bullet(
        doc,
        "Address entry via free-text fields leads to severe geospatial inaccuracies. Ambiguous street names, misspelled landmark references, "
        "and unnumbered alleys cause field workers to waste up to 40% of their daily shift searching for reported defect sites.",
        bold_prefix="4. Geospatial Inaccuracy and Route Blindness: "
    )
    add_bullet(
        doc,
        "The single greatest source of citizen disillusionment is premature ticket closure. Contractors and ground workers routinely "
        "mark tickets as 'Completed' or 'Resolved' in internal software without performing any physical repair, knowing that the "
        "citizen has no visual proof to dispute the closure. This lack of transparency severely damages public trust.",
        bold_prefix="5. Opaque Resolution and Lack of Photographic Verification: "
    )
    add_bullet(
        doc,
        "Citizens, administrative commissioners, and field crews operate in disjointed technical silos. Field workers receive printed "
        "work orders, commissioners review monthly paper reports, and citizens receive uninformative SMS messages stating 'Your request "
        "is under review'. This disjointed state prevents real-time collaboration and feedback.",
        bold_prefix="6. Siloed Communication and Zero Real-Time Synchronization: "
    )

    add_heading2(doc, "1.4 Comprehensive Scope of the Project")
    add_body(
        doc,
        "CivicSync (Nagarmitra) is designed as a holistic, end-to-end municipal governance ecosystem. The functional and "
        "technical boundaries of the project encompass the following operational dimensions:",
        bold_prefix="Scope Definition: "
    )
    add_bullet(
        doc,
        "A reactive Single-Page Application (SPA) accessible across mobile and desktop web browsers. Incorporates one-click "
        "photo capture, automatic HTML5 geolocation querying, interactive Leaflet OpenStreetMap defect pinning, dynamic tracking "
        "timelines, real-time notifications, and a 5-star citizen satisfaction feedback engine.",
        bold_prefix="1. Citizen Grievance Portal: "
    )
    add_bullet(
        doc,
        "An embedded deep learning computer vision pipeline utilizing the Ultralytics YOLOv8 architecture (`yolov8n.pt`). "
        "Processes uploaded images in under 500 ms, detecting potholes, garbage accumulations, water leaks, and construction debris. "
        "Extracts class probabilities, normalized bounding box coordinates, and computes a multi-factor Severity Index.",
        bold_prefix="2. Deep Learning AI Triage Engine: "
    )
    add_bullet(
        doc,
        "A responsive interface tailored for municipal field crews and contractors. Delivers GPS-ordered work orders, one-touch "
        "status transitions (Pending -> In Progress -> Under Review -> Resolved), and enforces a mandatory 'After-Resolution' "
        "photo upload protocol.",
        bold_prefix="3. Field Operations Mobility Suite: "
    )
    add_bullet(
        doc,
        "A high-level command and analytics console for city commissioners and department directors. Features live KPI metric "
        "counters (Total Grievances, Active Cases, SLA Compliance %, Average Turnaround Time), ward-wise defect heatmaps, and "
        "departmental load balancing matrices.",
        bold_prefix="4. Executive Command & Analytics Center: "
    )
    add_bullet(
        doc,
        "A secure, modular Python Flask backend utilizing SQLAlchemy 2.0 ORM and MySQL 8.0 relational database. Features "
        "Role-Based Access Control (RBAC), multi-part secure file streaming, transactional integrity, and cross-tab real-time "
        "synchronization via the BroadcastChannel API.",
        bold_prefix="5. RESTful Core Backend & Relational Store: "
    )

    add_heading2(doc, "1.5 Technical and Societal Objectives")
    add_body(
        doc,
        "The project is driven by both rigorous technical performance benchmarks and concrete societal impact goals:",
        bold_prefix="Project Objectives: "
    )
    add_bullet(
        doc,
        "Achieve a mean Average Precision (mAP@0.5) of over 90% in detecting common urban defects (potholes, garbage, water leaks) "
        "under diverse real-world lighting and weather conditions.",
        bold_prefix="Objective 1 (Computer Vision Accuracy): "
    )
    add_bullet(
        doc,
        "Reduce client-perceived inference latency to under 500 milliseconds on commodity CPU server hardware without requiring "
        "cost-prohibitive dedicated GPU cloud clusters.",
        bold_prefix="Objective 2 (Sub-Second Latency): "
    )
    add_bullet(
        doc,
        "Automate the classification and routing of civic complaints with 100% determinism, eliminating manual clerical sorting "
        "delays and reducing initial triage time from 48 hours to under 3 seconds.",
        bold_prefix="Objective 3 (Automated Triage): "
    )
    add_bullet(
        doc,
        "Eliminate false ticket closures by enforcing a dual-image 'Proof-of-Resolution' protocol that displays the citizen's original "
        "defect photo side-by-side with the worker's on-site repair photograph in the public domain.",
        bold_prefix="Objective 4 (Accountability Enforcement): "
    )
    add_bullet(
        doc,
        "Deliver an intuitive, zero-training user interface with sub-1.5 second initial page loads and seamless multi-tab state "
        "synchronization without server polling overhead.",
        bold_prefix="Objective 5 (User Experience & Responsiveness): "
    )
    add_bullet(
        doc,
        "Provide urban local bodies with spatial density heatmaps and SLA compliance analytics, enabling proactive municipal budgeting "
        "and reducing average complaint turnaround times from weeks to under 48 hours.",
        bold_prefix="Objective 6 (Data-Driven Municipal Planning): "
    )

    add_heading2(doc, "1.6 Societal, Economic, and Public Safety Significance")
    add_body(
        doc,
        "The deployment of CivicSync generates profound dividends across multiple sectors of urban society. "
        "In terms of public safety, prompt pothole remediation directly prevents fatal motorcycle and bicycle skidding accidents, "
        "saving lives and preventing severe spinal and orthopedic injuries. From an economic perspective, smooth road surfaces "
        "reduce vehicular wear and tear, curtail tire punctures, lower fuel consumption by up to 8% in congested urban corridors, "
        "and reduce logistics transit delays for commercial supply chains."
    )
    add_body(
        doc,
        "From an environmental and public health standpoint, rapid clearance of open garbage dumps prevents municipal leachate from "
        "percolating into urban aquifer tables, preserving the chemical safety of municipal borewells and drinking water supplies. "
        "It decisively interrupts the reproductive cycles of Aedes and Anopheles mosquitoes, lowering the clinical burden on public "
        "hospitals during monsoon seasons. Most importantly, by creating an unbroken, transparent digital record where every ticket "
        "is publicly visible, verifiable, and rated by residents, CivicSync restores democratic trust between the citizen and the "
        "municipal corporation."
    )

    add_heading2(doc, "1.7 Stakeholder Personas & Target Audience")
    add_body(
        doc,
        "To ensure human-centered design, CivicSync models three comprehensive user personas representing the core user groups:",
        bold_prefix="Stakeholder Personas: "
    )
    add_bullet(
        doc,
        "Urban residents, daily commuters, student pedestrians, and resident welfare associations (RWAs). "
        "Requires zero-friction reporting, automated location tagging, and instantaneous tracking updates without complex login procedures.",
        bold_prefix="1. The Urban Citizen: "
    )
    add_bullet(
        doc,
        "Municipal road repair crews, sanitation workers, sanitary inspectors, and private maintenance contractors. "
        "Operates on mobile devices under outdoor sunlight. Needs clear geographic navigation, simple large-touch targets, "
        "and frictionless photo upload for work validation.",
        bold_prefix="2. The Field Operations Worker: "
    )
    add_bullet(
        doc,
        "Municipal Commissioners, Ward Executive Engineers, Urban Planners, and Department Directors. "
        "Requires high-altitude visibility into SLA health, department-wise backlogs, contractor performance metrics, "
        "and ward-level defect heatmaps for resource optimization.",
        bold_prefix="3. The Municipal Administrator: "
    )
