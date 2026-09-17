import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Inline SVG Icon Helpers (Zero external dependency to prevent Vite HMR resolution issues)
const ArrowRightIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CpuIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
  </svg>
);

const ShieldCheckIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ZapIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TrendingUpIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ServerIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const SparklesIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3l1.9 5.7L19.6 10.6l-5.7 1.9L12 18.2l-1.9-5.7L4.4 10.6l5.7-1.9z" />
  </svg>
);

const CheckCircle2Icon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// Image Imports for ZMD Edge Box Models & AI Vision Cameras
import imgSmall from '../../assets/images/edge/edge_box_small.webp';
import imgPro from '../../assets/images/edge/edge_box_pro.webp';
import imgFlex from '../../assets/images/edge/edge_box_flex.webp';
import imgUltra from '../../assets/images/edge/edge_box_ultra.webp';

import imgDualLens from '../../assets/images/cam/duallens_ourmodel.webp';
import imgSingleLens from '../../assets/images/cam/singlelens_ourmodel.webp';

import imgPPE from '../../assets/images/cam/ppever.webp';
import imgCrowd from '../../assets/images/cam/croden.webp';
import imgANPR from '../../assets/images/cam/vehatri.webp';
import imgFacRecog from '../../assets/images/cam/facrecog.webp';
import imgFall from '../../assets/images/cam/perfa.webp';
import imgFire from '../../assets/images/cam/firede.webp';
import imgPerim from '../../assets/images/cam/peridde.webp';

// Solution Section Images (solim_1 through solim_9)
import solImg1 from '../../assets/images/solutions/solim_1.webp';
import solImg2 from '../../assets/images/solutions/solim_2.webp';
import solImg3 from '../../assets/images/solutions/solim_3.webp';
import solImg4 from '../../assets/images/solutions/solim_4.webp';
import solImg5 from '../../assets/images/solutions/solim_5.webp';
import solImg6 from '../../assets/images/solutions/solim_6.webp';
import solImg7 from '../../assets/images/solutions/solim_7.webp';
import solImg8 from '../../assets/images/solutions/solim_8.webp';
import solImg9 from '../../assets/images/solutions/solim_9.webp';
import solHero from '../../assets/images/solutions/solhero.webp';

import '../../assets/css/solutions.css';

// Edge Box Model Definitions
const edgeModels = {
  small: {
    tag: 'COMPACT EDGE',
    name: 'ZMD Edge Box',
    image: imgSmall,
    spec: 'Intel Core i5, 64GB DDR5, Low Power'
  },
  pro: {
    tag: 'PRO INFERENCE',
    name: 'Edge Box Pro',
    image: imgPro,
    spec: 'Intel Core i7, 30-40 Streams, NVMe Edge'
  },
  flex: {
    tag: 'FLEX CLUSTER',
    name: 'Edge Box Flex',
    image: imgFlex,
    spec: 'Intel N100/i3, Scalable Micro-Nodes'
  },
  ultra: {
    tag: 'ULTRA RUGGED',
    name: 'Edge Box Ultra',
    image: imgUltra,
    spec: 'Industrial IP67, Wide Temp (-20°C to 70°C)'
  },
  dualLens: {
    tag: 'VISION SENSOR',
    name: 'ZMD Dual-Lens Thermal AI Cam',
    image: imgDualLens,
    spec: 'Visual + Thermal Sensor Fusion'
  },
  singleLens: {
    tag: 'EDGE CAMERA',
    name: 'ZMD AI Vision Camera',
    image: imgSingleLens,
    spec: '4K Ultra-HD, On-Board AI NPU'
  }
};

const verticals = [
  {
    id: "agritech",
    code: "01",
    name: "AGRITECH",
    title: "The field, and everything growing in it.",
    sectionImage: imgDualLens,
    solImage: solImg1,
    confidence: "98.4%",
    lede: "One Physical AI platform that gives a farm real-time vision and an automated nervous system.",
    bodyHtml: (
      <>
        Every decision on a farm is normally made on a sample: one walk, one corner, one guess about what the soil holds. By the time stress is visible to the eye, yield is already lost. An elevated solar camera reads <span className="zmd-sol-hl">crop health</span> daily, soil probes read what the eye can't, and <span className="zmd-sol-hl">AI agents</span> turn both into <span className="zmd-sol-hl">real-time</span> irrigation triggers, spray advisories, and evidence — built for operators running many farms, not one.
      </>
    ),
    expand: "Starts with crop health and soil intelligence. Expands to irrigation and fertigation triggers, then growth tracking, yield estimation, and the paperwork behind insurance and credit.",
    trust: "Farmer owns the data. Chemical actions are never taken without a human sign-off.",
    metrics: [
      { label: "Yield per acre", value: "+18% Avg Gain" },
      { label: "Input cost per acre", value: "-24% Saved" },
      { label: "Water usage", value: "-30% Saved" },
      { label: "Early stress catch", value: "99.1% Rate" },
      { label: "Advisory adoption", value: "94% Speed" }
    ],
    caps: [
      { t: "Crop health & vigor", d: "Daily vigor maps from multispectral imagery; weak zones flagged with photo evidence and tracked to recovery." },
      { t: "Pest & disease", d: "Early visual signatures caught at first spots; spray advisories drafted for the agronomist to approve." },
      { t: "Soil & nutrition", d: "NPK, pH, moisture, EC and organic carbon from in-field probes, turned into fertigation calls per zone." },
      { t: "Irrigation", d: "Soil moisture against crop-stage thresholds triggers the valve or pump; every litre logged per zone." },
      { t: "Growth tracking", d: "Phenophase progression against the crop calendar; fields running behind are flagged for the harvest forecast." },
      { t: "Yield estimation", d: "Fruit, ear, or boll counts from imagery near harvest, feeding procurement and logistics planning." }
    ],
    hardwareModels: [edgeModels.small, edgeModels.ultra],
    aiModelSample: {
      name: "Multispectral Vigor & Thermal AI",
      image: imgDualLens,
      desc: "Daily canopy health scoring & moisture stress mapping"
    }
  },
  {
    id: "airports",
    code: "02",
    name: "AIRPORTS",
    title: "The terminal, and everything that moves through it.",
    sectionImage: imgFacRecog,
    solImage: solImg2,
    confidence: "99.2%",
    lede: "An airport is the most instrumented building you own. Physical AI makes every stream actionable.",
    bodyHtml: (
      <>
        Thousands of cameras, a dozen operational systems, and a control room that still finds out about a breaking queue when a passenger complains. Every camera and system the airport already owns is fused into one <span className="zmd-sol-hl">camera network</span> that sees every touchpoint in <span className="zmd-sol-hl">real-time</span>, predicts the next two hours, and delivers measurable <span className="zmd-sol-hl">business outcomes</span> before the SLA breaks.
      </>
    ),
    expand: "Starts with the security and check-in queue. Expands to retail revenue leakage, parking enforcement, then full airside and baggage fusion with the tower and airlines.",
    trust: "On-prem by design. No video leaves the airport, and no third-party AI APIs touch it.",
    metrics: [
      { label: "On-time performance", value: "+14% Gain" },
      { label: "Queue wait SLA", value: "< 4 Min SLA" },
      { label: "PAX throughput", value: "3.2k / Hour" },
      { label: "Retail revenue", value: "+22% / sq ft" },
      { label: "Turnaround time", value: "-12 Min Avg" }
    ],
    caps: [
      { t: "Terminal queues", d: "Wait measured at every touchpoint, breach predicted 15 minutes ahead, counter-opening recommended." },
      { t: "Retail & F&B", d: "POS cross-checked against camera to flag billing gaps, rank storefronts, and trigger peak staffing." },
      { t: "Landside & parking", d: "Kerb congestion, taxi queues, and unauthorized parking dispatched with location and auto-challan." },
      { t: "Turnaround", d: "Every stand event timed — chocks, fuelling, catering, pushback — with delays predicted and flagged." },
      { t: "Flight operations", d: "On-time performance, stand and gate use, and slot conflicts recomputed as the day changes." },
      { t: "Baggage", d: "Delivery compliance per belt, damage evidence on the line, tagless bags reunited in minutes not days." }
    ],
    hardwareModels: [edgeModels.pro, edgeModels.ultra],
    aiModelSample: {
      name: "PAX Queue & Flow Analytics",
      image: imgCrowd,
      desc: "30-40 stream real-time queue SLA & wait-time engine"
    }
  },
  {
    id: "cinemas",
    code: "03",
    name: "CINEMAS",
    title: "The lobby, the screen, and the fifteen minutes between shows.",
    sectionImage: imgCrowd,
    solImage: solImg3,
    confidence: "97.9%",
    lede: "Scheduled demand deserves a scheduled response. Physical AI reconciles every interval.",
    bodyHtml: (
      <>
        The ticketing system already knows every showtime, yet the popcorn queue still breaks at every interval and the hall still waits eleven minutes for housekeeping. Scheduled demand gets an automated response: staffing and turnaround fire on the calendar, and every rupee at the counter is reconciled in <span className="zmd-sol-hl">real-time</span> against what the <span className="zmd-sol-hl">camera network</span> saw.
      </>
    ),
    expand: "Starts with interval readiness and the turnaround clock. Expands to F&B reconciliation, then lobby flow, occupancy, energy, and ad verification.",
    trust: "Audience analytics are anonymous and aggregate. Identity data never leaves the property network.",
    metrics: [
      { label: "Turnaround clock", value: "7.5 Min Avg" },
      { label: "F&B spend / head", value: "+19% Boost" },
      { label: "Queue drop rate", value: "-85% Drop" },
      { label: "Screen utilization", value: "96.4% Rate" },
      { label: "Energy cost", value: "-15% Saved" }
    ],
    caps: [
      { t: "Interval readiness", d: "Concession staffing triggers fire before the doors open, and walk-aways are measured against baseline." },
      { t: "Turnaround clock", d: "Housekeeping dispatched the moment the credits roll; the overrun is flagged live, per screen." },
      { t: "F&B reconciliation", d: "Counter activity matched against POS transactions; unbilled serves flagged with the clip attached." },
      { t: "Lobby & entry", d: "Density and ticket-check queues metered at peaks; the duty manager is paged before the crush." },
      { t: "Occupancy", d: "Entry and exit counted against ticketed numbers, giving programming a real occupancy picture." },
      { t: "Parking & exit surge", d: "Lot occupancy and post-show exit surges staged before nine screens empty at once." }
    ],
    hardwareModels: [edgeModels.small, edgeModels.flex],
    aiModelSample: {
      name: "Concession Surge & Occupancy AI",
      image: imgCrowd,
      desc: "Interval crowd surge prediction & ticket reconciliation"
    }
  },
  {
    id: "cities",
    code: "04",
    name: "CITIES",
    title: "The city, and everything moving through it.",
    sectionImage: imgANPR,
    solImage: solImg4,
    confidence: "99.6%",
    lede: "Transforming thousands of static recordings into an active, self-healing urban grid.",
    bodyHtml: (
      <>
        Almost no smart city built the loop behind the wall of screens: the junction that re-times itself before the jam, the violation that becomes a court-ready challan without a back office, the flooded underpass that pages the pump crew before the first stalled bus. Physical AI rides the <span className="zmd-sol-hl">camera network</span> and civic systems the city already owns for instant <span className="zmd-sol-hl">business outcomes</span>.
      </>
    ),
    expand: "Starts with corridor congestion and clean enforcement. Expands to crowd events and processions, then civic operations, and citizen-facing agents on the grievance line.",
    trust: "Identity matching runs only under the legal framework, on government infrastructure. A statutory act always has a human before it.",
    metrics: [
      { label: "Junction delay", value: "-32% Reduced" },
      { label: "Challan sustainment", value: "98.9% Rate" },
      { label: "Incident response", value: "3.5 Min Avg" },
      { label: "Grievance closure", value: "< 24 Hrs" },
      { label: "Monsoon readiness", value: "100% Monitored" }
    ],
    caps: [
      { t: "Traffic & junctions", d: "Queue length and saturation per arm predict the breakdown; signal retiming is recommended before it forms." },
      { t: "Violations & enforcement", d: "ANPR hits assembled into a court-ready evidence pack, queued for the reviewing officer, then filed." },
      { t: "Incidents & dispatch", d: "Accidents, breakdowns, and obstructions dispatched to the nearest crew with location and clip." },
      { t: "Crowd events", d: "Density at processions, festivals, and transit hubs metered before crush risk builds." },
      { t: "Waterlogging & drains", d: "Camera water-level reads and drain sensors page the pump crew before the underpass closes." },
      { t: "Waste operations", d: "Every pickup verified, missed routes flagged same-day, contractors scored against their SLA." }
    ],
    hardwareModels: [edgeModels.flex, edgeModels.ultra],
    aiModelSample: {
      name: "ANPR & Junction Traffic AI",
      image: imgANPR,
      desc: "High-speed ANPR enforcement & adaptive signal retiming"
    }
  },
  {
    id: "education",
    code: "05",
    name: "EDUCATION",
    title: "The classroom, and the campus around it.",
    sectionImage: imgFacRecog,
    solImage: solImg5,
    confidence: "98.7%",
    lede: "Capture every lecture, protect every lab, and answer every student doubt 24/7.",
    bodyHtml: (
      <>
        A university produces thousands of hours of teaching a week and keeps almost none of it. Every lecture is captured, transcribed, and made answerable by a course-grounded <span className="zmd-sol-hl">AI agent</span>, while on-site sensors monitor lab safety and campus operations in <span className="zmd-sol-hl">real-time</span>. Aggregate signals, zero identity exposure.
      </>
    ),
    expand: "Starts in the classroom with lecture capture and the TA agent. Expands to smart classrooms and hybrid parity, then lab safety, and campus operations.",
    trust: "Aggregate by default, identity stays on campus. No face scan, no roll call, no individual scoring — ever.",
    metrics: [
      { label: "Faculty prep saved", value: "+12 Hrs / Wk" },
      { label: "Doubt resolution", value: "< 2 Sec TA" },
      { label: "Space utilization", value: "88% Peak" },
      { label: "Lab safety rate", value: "99.5% Pass" },
      { label: "Admissions cycle", value: "-40% Time" }
    ],
    caps: [
      { t: "Lecture capture", d: "Every lecture recorded, transcribed, and published as searchable notes in regional languages within the hour." },
      { t: "Course-grounded TA", d: "Doubts answered 24/7 from the actual course material; every reply is cited and logged, never a guess." },
      { t: "Smart classrooms", d: "Occupancy auto-starts capture and drives lighting and AC; the instructor and board auto-frame for remote students." },
      { t: "Lab skills & safety", d: "Procedure and PPE compliance in engineering, nursing, and medical labs, with breaches flagged by the clip." },
      { t: "Campus spaces", d: "Classroom, library, and lab occupancy feed real timetabling and justify the next building with data." },
      { t: "Dining & services", d: "Queues and food waste staggered and cut with measured plate data, pilferage flagged with evidence." }
    ],
    hardwareModels: [edgeModels.small, edgeModels.pro],
    aiModelSample: {
      name: "Lecture Capture & TA Agent AI",
      image: imgFacRecog,
      desc: "Automated board framing, transcription & course RAG AI"
    }
  },
  {
    id: "hospitals",
    code: "06",
    name: "HOSPITALS",
    title: "The hospital, and everything that moves inside it.",
    sectionImage: imgFall,
    solImage: solImg6,
    confidence: "99.5%",
    lede: "Fusing physical truth with the EMR to eliminate bed turnover lag and patient risk.",
    bodyHtml: (
      <>
        A hospital runs on pagers, phone calls, and someone walking the ward. CCTV, RFID, and monitors already in place are fused into one physical AI operations centre that monitors <span className="zmd-sol-hl">real-time</span> bed turnover, protects patient safety, and executes clinical workflows automatically via dedicated <span className="zmd-sol-hl">AI agents</span>.
      </>
    ),
    expand: "Starts with ED flow and bed turnover. Expands to OT utilization, equipment tracking on RFID, then infection control and clinical workflow agents for claims and handover.",
    trust: "No video and no clinical data leave the hospital network. Nothing clinical is ever decided by a machine.",
    metrics: [
      { label: "Bed turnover time", value: "-45 Min Avg" },
      { label: "ED wait time", value: "-28% Reduced" },
      { label: "OT utilization", value: "92.3% Rate" },
      { label: "Length of stay", value: "-0.8 Days" },
      { label: "Claim cycle time", value: "3x Faster" }
    ],
    caps: [
      { t: "ED & OPD flow", d: "Waiting-room count and dwell predict the surge; a fast-track or extra counter is recommended before LWBS climbs." },
      { t: "Bed management", d: "Housekeeping dispatched the minute a bed is physically vacated, feeding a true, live bed board." },
      { t: "Patient safety", d: "Falls, prolonged inactivity, and missed turn-protocols page rapid response with location and evidence." },
      { t: "OT management", d: "Occupied vs scheduled, turnaround between cases, and delayed starts recompute the day's list live." },
      { t: "Equipment & assets", d: "RFID and BLE location for pumps, wheelchairs, and monitors — “where's the nearest pump” answered in seconds." },
      { t: "Infection control", d: "Sterile-zone entries and PPE compliance scored per ward and shift, breach alerts with the clip attached." }
    ],
    hardwareModels: [edgeModels.pro, edgeModels.flex],
    aiModelSample: {
      name: "Patient Fall & Safety AI Engine",
      image: imgFall,
      desc: "Real-time fall detection & bed turnover monitoring"
    }
  },
  {
    id: "manufacturing",
    code: "07",
    name: "MANUFACTURING",
    title: "The line, the yard, and everything between them.",
    sectionImage: imgPPE,
    solImage: solImg7,
    confidence: "99.8%",
    lede: "Closing the gap between machine logs and plant reality with Industrial Edge Intelligence.",
    bodyHtml: (
      <>
        The four-minute micro-stop, the pallet blocking the aisle, the PPE that came off at the hot station — none of it lives in MES data. Plant cameras close the loop: micro-stoppages captured with cause and clip, near-misses heat-mapped in <span className="zmd-sol-hl">real-time</span>, and CMMS work orders dispatched automatically to deliver concrete <span className="zmd-sol-hl">business outcomes</span>.
      </>
    ),
    expand: "Starts with zone safety and stoppage capture, camera-only. Expands to yard and gate sequencing, then visual quality at stations, and CMMS work-order agents.",
    trust: "Zone-level reporting, not worker tracking. Read-only on OT, permanently outside the certified safety chain.",
    metrics: [
      { label: "Near-miss closure", value: "99.4% Rate" },
      { label: "Micro-stop loss", value: "-62% Cut" },
      { label: "First-pass yield", value: "99.1% Target" },
      { label: "Dock turnaround", value: "-25 Min Avg" },
      { label: "CMMS lead time", value: "< 10 Mins" }
    ],
    caps: [
      { t: "Zone safety & PPE", d: "PPE and exclusion-zone discipline scored per zone per shift, anonymously, feeding the EHS leading-indicator board." },
      { t: "Line stoppages", d: "Line moving or stopped per station; micro-stops the MES never logs captured with cause and clip." },
      { t: "Forklift & pedestrian", d: "Near-miss geometry heat-mapped by conflict point, repeat patterns alerted, layout fixes justified with data." },
      { t: "Yard & gate", d: "Truck arrivals, weighbridge queue, and dock occupancy sequenced to the bay before demurrage bills." },
      { t: "Visual quality", d: "Defect signatures at inspection stations hold the lot and flag QA with images, logged against shift and batch." },
      { t: "Maintenance triggers", d: "Leaks, smoke, and abnormal vibration cues open the CMMS work order with the clip attached, tracked to close." }
    ],
    hardwareModels: [edgeModels.pro, edgeModels.ultra],
    aiModelSample: {
      name: "Zone PPE & Micro-Stoppage AI",
      image: imgPPE,
      desc: "EHS safety discipline scoring & MES line micro-stop logging"
    }
  },
  {
    id: "retail",
    code: "08",
    name: "RETAIL",
    title: "The shelf, the store, and the supply behind it.",
    sectionImage: imgSingleLens,
    solImage: solImg8,
    confidence: "98.9%",
    lede: "Eliminating on-shelf stock-outs and till revenue leakage with automated store vision.",
    bodyHtml: (
      <>
        An FMCG brand loses sales to empty shelves; a retail chain loses revenue in the gap between the camera and POS billing. Small cameras on the shelf turn out-of-stock events into same-hour distributor orders, while till vision reconciles billing discrepancies in <span className="zmd-sol-hl">real-time</span> via an intelligent <span className="zmd-sol-hl">camera network</span>.
      </>
    ),
    expand: "Starts with on-shelf availability, brand-side. Expands to billing leakage in owned stores, then checkout queues and footfall, and warehouse and cold chain.",
    trust: "Shopper analytics are anonymous and aggregate. Identity data, where it exists, never leaves the store network.",
    metrics: [
      { label: "On-shelf availability", value: "98.5% Rate" },
      { label: "Share of shelf", value: "100% Tracked" },
      { label: "Audit cost / store", value: "-75% Cut" },
      { label: "Billing leakage", value: "-90% Prevented" },
      { label: "Queue drop rate", value: "-4.2% Saved" }
    ],
    caps: [
      { t: "Shelf availability", d: "Stock level per facing and depletion rate through the day; replenishment raised before the shelf runs dry." },
      { t: "Planogram & share of shelf", d: "Facings vs plan and competitor share scored per store, with photo evidence behind every trade-spend dispute." },
      { t: "Billing leakage", d: "POS transactions cross-referenced with the till camera; discrepancies filed as recovery cases with the clip." },
      { t: "Checkout queues", d: "Queue length and abandonment at tills open a counter before the walk-away, measured against baseline." },
      { t: "Footfall & conversion", d: "Zone heatmaps and dwell by category rank layouts and promotions by measured conversion, not gut feel." },
      { t: "Cold chain", d: "Freezer and chiller temperature and door-open time alarm the excursion before product loss." }
    ],
    hardwareModels: [edgeModels.small, edgeModels.pro],
    aiModelSample: {
      name: "On-Shelf Stock-Out & POS AI",
      image: imgSingleLens,
      desc: "Same-hour replenishment triggers & till theft prevention"
    }
  },
  {
    id: "venues",
    code: "09",
    name: "VENUES + CAMPUSES",
    title: "The campus, the crowd, and the longest day of the year.",
    sectionImage: imgPerim,
    solImage: solImg9,
    confidence: "99.4%",
    lede: "Continuous crowd density metering and instant incident dispatch for major public spaces.",
    bodyHtml: (
      <>
        A large venue is a small city with one entrance problem: everyone arrives at once. Density is measured continuously, crush risk is predicted before it forms, and every incident is dispatched with location and clip to deliver reliable <span className="zmd-sol-hl">real-time</span> safety and smooth <span className="zmd-sol-hl">business outcomes</span>.
      </>
    ),
    expand: "Starts with crowd safety at gates and top attractions. Expands to queues and wait boards, then parking and shuttles, and F&B and ticket reconciliation.",
    trust: "Guest analytics are anonymous and aggregate. Crowd-control actions propose; a human always commands.",
    metrics: [
      { label: "Density SLA rate", value: "99.9% Target" },
      { label: "Attraction wait", value: "Live Synced" },
      { label: "Incident dispatch", value: "< 90 Secs" },
      { label: "Shuttle wait time", value: "-35% Cut" },
      { label: "Per-cap spend", value: "+16% Lift" }
    ],
    caps: [
      { t: "Crowd safety", d: "Density at gates, plazas, and attractions meters the approach before crush risk builds; the control room sees one map." },
      { t: "Queues & attractions", d: "Live wait per attraction feeds the guest app and rebalances ops staff to the longest lines." },
      { t: "Parking & shuttles", d: "Lot occupancy and shuttle load stage transport to demand, opening overflow lots before the jam." },
      { t: "Incidents & medical", d: "Falls, altercations, and heat-stress conditions dispatch the nearest responder with location, every response timed." },
      { t: "Ticketing & entry", d: "Throughput per lane and tailgating open extra lanes ahead of the wave, flagging gate anomalies with evidence." },
      { t: "F&B & retail outlets", d: "Queues and POS-camera reconciliation across dozens of outlets trigger staffing and flag the unbilled serve." }
    ],
    hardwareModels: [edgeModels.flex, edgeModels.ultra],
    aiModelSample: {
      name: "Perimeter Safety & Crowd Mitigation AI",
      image: imgPerim,
      desc: "Gate crowd density metering & incident dispatch"
    }
  }
];

export default function SolutionsPage() {
  const location = useLocation();

  useEffect(() => {
    // 1. Handle initial hash routing
    if (location.hash) {
      const targetId = location.hash.replace('#', '').replace('usecase-', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }

    // 2. Reversible viewport choreography for every major page section.
    // The state is removed on exit so the sequence feels intentional when
    // visitors scroll back through the page.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '-8% 0px -8% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, observerOptions);

    const sections = document.querySelectorAll(
      '.sol-hero-section, .zmd-sol-master-header, .zmd-sol-v-section, .zmd-sol-prefooter'
    );
    sections.forEach((section, index) => {
      section.classList.add('zmd-sol-motion-section');
      section.dataset.motionDirection = index % 2 === 0 ? 'left' : 'right';
      const cards = section.querySelectorAll(
        '.zmd-sol-image-card, .zmd-sol-m, .zmd-sol-cap, .zmd-sol-hw-card, .zmd-sol-pstat'
      );
      cards.forEach((card, cardIndex) => {
        card.classList.add('zmd-sol-cascade-card');
        card.style.setProperty('--zmd-sol-card-delay', `${140 + cardIndex * 72}ms`);
      });
      if (prefersReducedMotion) {
        section.classList.add('is-visible');
      } else {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.hash]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="zmd-sol-page">
      {/* HERO SECTION WITH ULTRA-PREMIUM GRID & STAGGER ANIMATIONS */}
      <section
        className="sol-ref-section sol-hero-section"
        id="hero"
        style={{ '--zmd-sol-hero-image': `url(${solHero})` }}
      >
        <div className="zmd-sol-hero-ambient-glow"></div>

        <div className="zmd-sol-shell">
          <div className="zmd-sol-hero-grid">
            <div className="zmd-sol-hero-left">
              <div className="zmd-sol-eyebrow zmd-stagger-1">
                <span className="zmd-sol-dot"></span>
                <span className="zmd-sol-eyebrow-text">ZMD · PHYSICAL AI SOLUTIONS</span>
                <span className="zmd-sol-rule"></span>
              </div>

              <h1 className="zmd-sol-display zmd-stagger-2">
                Physical AI for <em>Enterprise Operations.</em>
              </h1>

              <div className="zmd-sol-hero-visual zmd-stagger-3" aria-hidden="true">
                <img
                  src={solHero}
                  alt=""
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              <p className="zmd-sol-hero-sub zmd-stagger-3">
                ZMD turns existing cameras and on-site sensors into real-time perception — automating operations, safety, and workflow decisions across nine industries.
              </p>

              <div className="zmd-sol-hero-actions zmd-stagger-4">
                <a href="#agritech" onClick={(e) => scrollToSection(e, 'agritech')} className="zmd-sol-btn zmd-sol-btn--primary">
                  <span>Explore Industry Solutions</span>
                  <ArrowRightIcon size={16} />
                </a>
                <a href="#hardware-specs" className="zmd-sol-btn zmd-sol-btn--ghost">
                  <CpuIcon size={16} />
                  <span>Hardware Architecture</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INNOVATIVE MASTER SECTION TITLE */}
      <div className="zmd-sol-master-header" id="industry-solutions">
        <div className="zmd-sol-shell">
          <div className="zmd-sol-master-header-inner">
            <div className="zmd-sol-eyebrow zmd-sol-eyebrow--center">
              <span className="zmd-sol-dot"></span>
              <span>ENTERPRISE PHYSICAL AI SUITE</span>
              <span className="zmd-sol-dot"></span>
            </div>
            <h2 className="zmd-sol-master-title">
              Intelligence Deployed <em>Where Work Happens.</em>
            </h2>
            <p className="zmd-sol-master-sub">
              From sovereign farmland to international airport terminals — ZMD Physical AI bridges physical reality with real-time operational execution across 9 critical sectors.
            </p>
          </div>
        </div>
      </div>

      {/* 9 INDUSTRY VERTICAL SECTIONS WITH ALTERNATING LIGHT & DARK RHYTHM */}
      {verticals.map((v, vIndex) => (
        <section
          key={v.id}
          className={`sol-ref-section zmd-sol-v-section ${vIndex % 2 === 0 ? 'zmd-sol-theme-light' : 'zmd-sol-theme-dark'}`}
          id={v.id}
        >
          <div className="zmd-sol-shell">
            <div className="zmd-sol-v-grid">

              {/* LEFT COLUMN: Story, Interactive Scanner Visual & Roadmap */}
              <div className="zmd-sol-v-info">
                <div className="zmd-sol-eyebrow anim-reveal-1">
                  <span className="zmd-sol-dot"></span>
                  CH·{v.code} — {v.name}
                  <span className="zmd-sol-rule"></span>
                </div>

                <h2 className="zmd-sol-h-title anim-reveal-2">{v.title}</h2>

                {/* FEATURED SOLUTION IMAGE (BETWEEN TITLE AND CONTEXT) */}
                {v.solImage && (
                  <div className="zmd-sol-image-card anim-reveal-2">
                    <img src={v.solImage} alt={v.name} className="zmd-sol-image" />
                  </div>
                )}

                <p className="zmd-sol-h-lede anim-reveal-3">{v.lede}</p>
                <p className="zmd-sol-h-body anim-reveal-3">{v.bodyHtml}</p>

                <div className="zmd-sol-h-expand anim-reveal-5">
                  <b>Where it starts, where it goes</b>
                  {v.expand}
                </div>

                <div className="zmd-sol-h-trust anim-reveal-5">
                  <span className="tag">Trust</span>
                  <span>{v.trust}</span>
                </div>
              </div>

              {/* RIGHT COLUMN: KPI Metrics, 6 Capability Cards, & Deployment Container */}
              <div className="zmd-sol-v-media">

                {/* BUSINESS TARGET KPI CARDS */}
                <div className="zmd-sol-metric-strip anim-reveal-3">
                  {v.metrics.map((m, idx) => (
                    <div key={idx} className="zmd-sol-m">
                      <span className="v">{m.label}</span>
                      <span className="zmd-sol-m-val">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* 6 CAPABILITY CARDS WITH HOVER LIFT & EXPANDING RED ACCENT */}
                <div className="zmd-sol-caps anim-reveal-4">
                  {v.caps.map((c, idx) => (
                    <div key={idx} className="zmd-sol-cap">
                      <div className="zmd-sol-cap-accent"></div>
                      <div className="zmd-sol-cap-t">
                        <span className="zmd-sol-cap-dot"></span>
                        {c.t}
                      </div>
                      <div className="zmd-sol-cap-d">{c.d}</div>
                    </div>
                  ))}
                </div>

                {/* FLAGSHIP DEPLOYMENT ARCHITECTURE CONTAINER */}
                <div className="zmd-sol-hardware-block anim-reveal-5" id="hardware-specs">
                  <div className="zmd-sol-hw-header">
                    <div className="zmd-sol-hw-kicker">
                      <ServerIcon size={12} /> DEPLOYMENT ARCHITECTURE
                    </div>
                    <h4 className="zmd-sol-hw-title">Recommended Edge Hardware</h4>
                  </div>

                  <div className="zmd-sol-hw-models-grid">
                    {v.hardwareModels.map((h, hIdx) => (
                      <div key={hIdx} className="zmd-sol-hw-card">
                        <div className="zmd-sol-hw-img-wrap">
                          <img src={h.image} alt={h.name} className="zmd-sol-hw-img" />
                          <span className="zmd-sol-hw-badge">{h.tag}</span>
                        </div>
                        <div className="zmd-sol-hw-info">
                          <div className="zmd-sol-hw-name">{h.name}</div>
                          <div className="zmd-sol-hw-spec">{h.spec}</div>
                          <div className="zmd-sol-hw-cta">
                            Inspect Spec <ArrowRightIcon size={10} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      ))}

      {/* FLAGSHIP PRE-FOOTER BANNER WITH ANIMATED TYPOGRAPHY */}
      <section className="zmd-sol-prefooter">
        <div className="zmd-sol-shell">
          <div className="zmd-sol-prefooter-content">
            <div className="zmd-sol-eyebrow zmd-sol-eyebrow--center">
              <span className="zmd-sol-dot"></span>
              PHYSICAL AI SCALABILITY
              <span className="zmd-sol-dot"></span>
            </div>
            <h2 className="zmd-sol-prefooter-title">
              Our Physical AI Platform Powers <em>Every Enterprise Industry.</em>
            </h2>
            <p className="zmd-sol-prefooter-sub">
              Zero cloud latency. 100% on-premises security. Re-use existing camera networks and industrial sensors without rebuilding your stack.
            </p>
            <div className="zmd-sol-prefooter-stats">
              <div className="zmd-sol-pstat">
                <span className="v">9</span>
                <span className="k">Industry Verticals</span>
              </div>
              <div className="zmd-sol-pstat">
                <span className="v">100%</span>
                <span className="k">On-Prem Privacy</span>
              </div>
              <div className="zmd-sol-pstat">
                <span className="v">&lt; 50ms</span>
                <span className="k">Inference Latency</span>
              </div>
              <div className="zmd-sol-pstat">
                <span className="v">Zero</span>
                <span className="k">Cloud Dependency</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
