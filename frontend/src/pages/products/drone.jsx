import React, { useEffect, useRef } from 'react';
import '../../assets/css/drone.css';
import infrastructureCorridor from '../../assets/images/drone/critical-infrastructure-corridor.webp';
import mobileInfrastructureCorridor from '../../assets/images/drone/mobile-infrastructure-corridor.webp';
import inspectionDrone from '../../assets/images/drone/inspection-drone-front-view.webp';
import hotspotDetection from '../../assets/images/drone/power-line-hotspot-detection.webp';
import towerCorrosion from '../../assets/images/drone/tower-corrosion-detection.webp';
import structuralWear from '../../assets/images/drone/structural-wear-detection.webp';
import pipelineCorrosion from '../../assets/images/drone/pipeline-corrosion-detection.webp';
import platformSensorDrone from '../../assets/images/drone/platform-sensor-drone.webp';
import mobileDrone from '../../assets/images/drone/mobile-drone.webp';
import rgbStructuralImaging from '../../assets/images/drone/rgb-structural-imaging.webp';
import thermalHotspotImaging from '../../assets/images/drone/thermal-hotspot-imaging.webp';
import lidarPowerlineScan from '../../assets/images/drone/lidar-powerline-scan.webp';
import edgeAiDefectAnalysis from '../../assets/images/drone/edge-ai-defect-analysis.webp';
import wireConditionImage from '../../assets/images/drone/wire-condition-detection.webp';
import structuralJointsImage from '../../assets/images/drone/structural-joint-corrosion-detection.webp';
import insulatorsImage from '../../assets/images/drone/insulator-crack-detection.webp';
import towerInspectionImage from '../../assets/images/drone/tower-base-corrosion-detection.webp';
import hotspotImage from '../../assets/images/drone/electrical-hotspot-detection.webp';
import fieldEquipmentImage from '../../assets/images/drone/field-equipment-fault-detection.webp';
import sagClearanceImage from '../../assets/images/drone/sag-clearance-measurement.webp';
import crossingClearanceImage from '../../assets/images/drone/crossing-clearance-zones.webp';
import powerTransmissionImage from '../../assets/images/drone/power-transmission-inspection.webp';
import oilGasPipelineImage from '../../assets/images/drone/oil-gas-pipeline-inspection.webp';
import solarFarmImage from '../../assets/images/drone/solar-farm-inspection.webp';
import windTurbineImage from '../../assets/images/drone/wind-turbine-inspection.webp';
import bridgeCivilImage from '../../assets/images/drone/bridge-civil-structure-inspection.webp';
import railwayTractionImage from '../../assets/images/drone/railway-traction-inspection.webp';
import industrialYardImage from '../../assets/images/drone/industrial-yard-inspection.webp';
import agricultureImage from '../../assets/images/drone/agriculture-inspection.webp';

const platformFeatures = [
  {
    icon: 'camera',
    title: 'RGB Imaging',
    text: 'High-resolution optical capture with close-up zoom for cracks, corrosion, loose fittings, and missing hardware.',
    image: rgbStructuralImaging,
    imageAlt: 'RGB close-up inspection of a structural connection and surface crack',
  },
  {
    icon: 'thermal',
    title: 'Thermal Imaging',
    text: 'Thermal telemetry surfaces overheating joints, connections, and equipment before they fail outright.',
    image: thermalHotspotImaging,
    imageAlt: 'Thermal inspection view showing an overheating industrial pipe connection',
  },
  {
    icon: 'lidar',
    title: 'LiDAR Scanning',
    text: 'Multi-echo 3D point clouds measure clearance, sag, spacing, and structural alignment with precision.',
    image: lidarPowerlineScan,
    imageAlt: 'LiDAR point-cloud scan of electrical transmission towers and terrain',
  },
  {
    icon: 'chip',
    title: 'Edge AI Processing',
    text: 'Onboard neural inference classifies and geo-tags defects in flight without waiting for a post-flight upload.',
    image: edgeAiDefectAnalysis,
    imageAlt: 'Edge AI bridge defect analysis with confidence and location telemetry',
  },
];

const platformPipeline = [
  ['flight', 'Capture', 'Sensor payloads'],
  ['chip', 'Process', 'Edge AI computer'],
  ['telecom', 'Connect', '4G / 5G sync'],
  ['record', 'Review', 'Inspection dashboard'],
];

const specifications = [
  ['flight', 'Flight mode', 'Fully autonomous'],
  ['alert', 'Flight time', 'Up to 45 minutes'],
  ['speed', 'Cruise speed', '17 m/s'],
  ['bolt', 'Maximum speed', '30 m/s'],
  ['target', 'Navigation', 'RTK GPS, centimetre-level'],
  ['shield', 'Protection rating', 'IP54 weatherproof'],
  ['camera', 'RGB payload', '4K resolution with 30× optical zoom'],
  ['thermal', 'Thermal payload', '640 × 512 camera'],
  ['lidar', 'LiDAR payload', '250 m range'],
];

const certifications = [
  ['shield', 'Regulatory flight approval'],
  ['flight', 'Certified pilot operated'],
  ['target', 'Omnidirectional collision avoidance'],
];

const detections = [
  ['wire', 'Line & Wire Condition', ['RGB', 'Thermal', 'AI'], wireConditionImage, 'Drone inspection view identifying damaged transmission wires'],
  ['joint', 'Structural Connections & Joints', ['RGB', 'Thermal', 'AI'], structuralJointsImage, 'Drone inspection view identifying corrosion around structural tower joints'],
  ['shield', 'Insulators & Fittings', ['RGB', 'Thermal', 'AI'], insulatorsImage, 'Drone inspection view identifying cracks in power-line insulators'],
  ['sag', 'Sag & Clearance Measurement', ['LiDAR', 'Analytics'], sagClearanceImage, 'Power-line conductors showing measurable sag between utility poles'],
  ['antenna', 'Tower & Structure Inspection', ['RGB', 'AI'], towerInspectionImage, 'Drone inspection view identifying corrosion at the base of a transmission tower'],
  ['bolt', 'Hotspot Detection', ['Thermal', 'AI'], hotspotImage, 'Thermal inspection view identifying an electrical hotspot'],
  ['socket', 'Power & Field Equipment', ['RGB', 'Thermal', 'AI'], fieldEquipmentImage, 'Drone inspection view identifying damaged transformer field equipment'],
  ['crossing', 'Crossing & Clearance Zones', ['LiDAR', 'Analytics'], crossingClearanceImage, 'High-voltage transmission lines crossing above a bridge corridor'],
];

const useCases = [
  ['rail', 'Railways & Traction', 'Contact-wire geometry, mast alignment, and clearance along the line.', railwayTractionImage, 'Electrified railway tracks and overhead traction lines'],
  ['tower', 'Power Transmission', 'Insulators, conductors, and structures across long overhead runs.', powerTransmissionImage, 'Electrical transmission towers and overhead power lines'],
  ['agriculture', 'Agriculture', 'Crop health, irrigation coverage, and field anomalies across large growing areas.', agricultureImage, 'Autonomous inspection drone flying above rows of crops and irrigation equipment'],
  ['crane', 'Ports & Industrial Yards', 'Structural wear and thermal loads across heavy lifting equipment.', industrialYardImage, 'Large storage tanks and processing equipment in an industrial yard'],
  ['pipeline', 'Oil & Gas Pipelines', 'Corrosion, leaks, and right-of-way encroachment along the corridor.', oilGasPipelineImage, 'Oil and gas pipeline valves at an industrial facility'],
  ['wind', 'Wind Turbines', 'Blade cracks and nacelle heat, inspected without a rope crew.', windTurbineImage, 'Wind turbines across a mountain landscape'],
  ['bridge', 'Bridges & Civil Structures', 'Deck cracking, joint wear, and deformation across spans.', bridgeCivilImage, 'Cable-stayed bridge spanning a wide river'],
  ['solar', 'Solar Farms', 'Panel damage, hotspot cells, and connector faults across large arrays.', solarFarmImage, 'Rows of solar panels in a large solar farm'],
];

const workflow = [
  ['route', 'Plan', 'Mission planning', 'Pre-program optimal trajectory paths using coordinate presets.'],
  ['flight', 'Fly', 'Autonomous flight', 'Fly with RTK positioning and active collision avoidance.'],
  ['lidarEngineering', 'Scan', 'Sensor scanning', 'Capture visual, thermal, and 3D measurement data together.'],
  ['chip', 'Infer', 'Onboard inference', 'Classify defects with low-latency neural processing in flight.'],
  ['record', 'Sync', 'Analytics & logs', 'Sync findings into a searchable digital asset record.'],
];

const deepDives = [
  {
    number: '01',
    title: 'LiDAR engineering measurements',
    icon: 'lidarEngineering',
    items: [
      ['elevation', 'Height & elevation profiling', 'Measures vertical distance between reference planes, conductors, and structures.'],
      ['overlap', 'Stagger & overlap', 'Tracks lateral shift patterns and safety margins across linear runs.'],
      ['clearance', 'Sag & clearance', 'Detects droop, vegetation encroachment, and clearance infringements.'],
      ['alignment', 'Structural alignment', 'Profiles lean angles of masts, poles, and towers over the route.'],
    ],
  },
  {
    number: '02',
    title: 'Infrared thermal analytics',
    icon: 'thermalAnalytics',
    items: [
      ['hotspotPulse', 'Hotspot diagnostics', 'Tracks abnormal heating at junctions before structural damage occurs.'],
      ['connectionLink', 'Connection monitoring', 'Watches current-carrying contact points for friction and intermittent arcing.'],
      ['trendRise', 'Rate-of-rise analysis', 'Flags zones that are trending toward overload using regression models.'],
      ['temperatureLimit', 'Live equipment limits', 'Compares live surface temperatures against manufacturer thresholds.'],
    ],
  },
];

const values = [
  ['flight', 'Autonomous Flight', 'Repeatable inspection sweeps with less manual exposure.'],
  ['chip', 'AI Analytics', 'Direct visual and thermal neural diagnostics.'],
  ['thermal', 'Thermal Scans', 'Active hotspot and overload alerts.'],
  ['lidar', 'LiDAR 3D Metrics', 'Structural geometry audits down to the centimetre.'],
  ['edge', 'Edge Compute', 'Low-latency inference without an upload delay.'],
  ['target', 'RTK Navigation', 'Centimetre positioning precision, flight after flight.'],
  ['alert', 'Real-Time Alerts', 'Instant triggers to field crews when action matters.'],
  ['record', 'Digital Records', 'A searchable inspection history for every asset.'],
];

function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    camera: <><rect x="3" y="7" width="18" height="12" rx="2" /><circle cx="12" cy="13" r="3.4" /><path d="M8 7l1.5-3h5L16 7" /></>,
    thermal: <><path d="M9 3v10a3 3 0 1 0 6 0V3" /><circle cx="12" cy="17" r="3" /></>,
    lidar: <><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    chip: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9zM2 9h2M2 15h2M20 9h2M20 15h2M9 2v2M15 2v2M9 20v2M15 20v2" /></>,
    signal: <path d="M3 12h6l3-8 4 16 3-8h2" />,
    structure: <path d="M4 20l6-14 4 8 3-6 3 12" />,
    shield: <path d="M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6z" />,
    tower: <><path d="M12 3 7 22M12 3l5 19M9 9h6M8 15h8" /></>,
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
    equipment: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h.01M15 9h.01M9 15h6" /></>,
    terrain: <path d="M3 17 9 7l4 6 3-4 5 8" />,
    wire: <><path d="M12 2 6.5 22M12 2l5.5 20M5 22h14M8.2 10h7.6M7.2 15h9.6M9.5 6h5" /><path d="m4.5 10 7.5-4 7.5 4" /></>,
    joint: <><path d="M2 12h20M2 9v6M22 9v6" /><rect x="5" y="8" width="3" height="8" rx="0.7" /><rect x="16" y="8" width="3" height="8" rx="0.7" /></>,
    sag: <><path d="M3 5h18M3 19h18M6 10c4 4 8 4 12 0" /><path d="M12 8v8m-2-2 2 2 2-2" /></>,
    antenna: <><path d="M12 7v15M8 22h8M9 16h6M10 11h4" /><path d="M8 9a4 4 0 0 1 8 0M5 7a7 7 0 0 1 14 0" /><circle cx="12" cy="7" r="1" /></>,
    socket: <><rect x="3" y="4" width="18" height="16" rx="4" /><circle cx="8.5" cy="10" r="1" /><circle cx="15.5" cy="10" r="1" /><path d="M9 16h6" /></>,
    crossing: <><path d="M3 17 8.5 8l4 6 3-4 5.5 7M3 20h18" /><path d="M6 20v-2M12 20v-2M18 20v-2" /></>,
    pipeline: <><path d="M2 12h20M6 8v8M12 8v8M18 8v8" /></>,
    solar: <><rect x="4" y="9" width="16" height="10" rx="1" /><path d="M4 14h16M9 9v10M15 9v10M12 5V2M5 6 3 4M19 6l2-2" /></>,
    wind: <><path d="M12 22V8M12 8l6-2M12 8 7 4M12 8l4 6" /><circle cx="12" cy="8" r="1.5" /></>,
    telecom: <><path d="M12 22V10M8 10a4 4 0 0 1 8 0M5 7a7 7 0 0 1 14 0" /></>,
    bridge: <><path d="M2 17h20M5 17v-6M19 17v-6M9 17V8M15 17V8M2 11c5-4 15-4 20 0" /></>,
    rail: <><path d="M3 8h18M3 16h18M7 8v8M12 8v8M17 8v8" /></>,
    crane: <><path d="M4 20h6M7 20V6M7 6h12M17 6v6M17 12l3 2" /></>,
    agriculture: <><path d="M7 20h10M12 20v-7" /><path d="M12 13c-3.7 0-6-2.1-6-5.5 3.7 0 6 2.1 6 5.5Z" /><path d="M12 13c0-4.3 2.3-7 6-7 0 4.3-2.3 7-6 7Z" /></>,
    flight: <><path d="M2 16l5-1 4-4 8-8 2 2-8 8-4 4-1 5-3-3z" /></>,
    speed: <><path d="M4 18a8 8 0 1 1 16 0" /><path d="m12 14 4-5M7 18h10" /><circle cx="12" cy="14" r="1" /></>,
    edge: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M9 10h6v6H9zM7 4h10" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M1 12h4M19 12h4" /></>,
    alert: <><path d="M12 3v10l6 3" /><circle cx="12" cy="13" r="9" /></>,
    record: <><path d="M6 3h9l3 3v15H6zM15 3v4h4M9 11h6M9 15h6M9 19h4" /></>,
    lidarEngineering: <><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2.2" /><path d="M12 1v5M12 18v5M1 12h5M18 12h5" /><circle cx="4" cy="4" r="0.7" /><circle cx="20" cy="4" r="0.7" /><circle cx="4" cy="20" r="0.7" /><circle cx="20" cy="20" r="0.7" /></>,
    thermalAnalytics: <><path d="M9 4a3 3 0 0 1 6 0v9.1a5 5 0 1 1-6 0Z" /><path d="M12 7v9" /><circle cx="12" cy="18" r="1.8" /></>,
    elevation: <><path d="M3 18 8.5 9l3.6 5 2.8-3.5L21 18Z" /><path d="M3 20h18" /></>,
    overlap: <><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" /></>,
    clearance: <><path d="M12 20V9" /><path d="M12 13c-4 0-6-2.3-6-5 4 0 6 2.3 6 5ZM12 16c4 0 6-2.3 6-5-4 0-6 2.3-6 5Z" /><path d="M4 20h16" /></>,
    alignment: <><path d="m5 4 15 15-3 3L2 7Z" /><path d="m16 3 5 5L8 21l-5-5Z" /><path d="m7 6-2 2m5 1-2 2m9 4-2 2" /></>,
    hotspotPulse: <path d="M2 12h5l2.2-6 4.1 12 2.2-6H22" />,
    connectionLink: <><path d="m9.5 14.5-2 2a4 4 0 0 1-5.7-5.7l3.4-3.4a4 4 0 0 1 5.7 0" /><path d="m14.5 9.5 2-2a4 4 0 0 1 5.7 5.7l-3.4 3.4a4 4 0 0 1-5.7 0" /><path d="m8.5 15.5 7-7" /></>,
    trendRise: <><path d="M4 3v17h17" /><path d="m7 15 4-4 3 2 5-6" /><path d="M16 7h3v3" /></>,
    temperatureLimit: <><path d="M9 4a3 3 0 0 1 6 0v9.1a5 5 0 1 1-6 0Z" /><path d="M12 8v8" /><path d="M19 5h2M18 9l2 1M5 5H3M6 9l-2 1" /></>,
    chevronRight: <path d="m9 5 7 7-7 7" />,
    route: <><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 5h5a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h8" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    clock3: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>,
    ruler: <><path d="m4 15 11-11 5 5L9 20l-5-5Z" /><path d="m13 6 2 2m-5 1 2 2m-5 1 2 2" /></>,
    radio: <><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" /></>,
  };

  return <svg {...common}>{paths[name] || paths.chip}</svg>;
}

function PlatformIcon({ name }) {
  const platformPaths = {
    camera: (
      <>
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <circle cx="12" cy="13" r="3.4" />
        <path d="M8 7l1.5-3h5L16 7" />
      </>
    ),
    thermal: (
      <>
        <path d="M9.5 4v10.25a3.2 3.2 0 1 0 5 0V4a2.5 2.5 0 0 0-5 0Z" />
        <path d="M12 8v8.2" />
        <circle cx="12" cy="17" r="1.25" />
      </>
    ),
    lidar: (
      <>
        <circle cx="12" cy="12" r="6.1" />
        <circle cx="12" cy="12" r="2.35" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </>
    ),
    chip: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="1.8" />
        <rect x="8.5" y="8.5" width="7" height="7" rx="0.8" />
        <path d="M8 2v3M12 2v3M16 2v3M8 19v3M12 19v3M16 19v3M2 8h3M2 12h3M2 16h3M19 8h3M19 12h3M19 16h3" />
      </>
    ),
    flight: (
      <>
        <rect x="9" y="9" width="6" height="6" rx="1.3" />
        <path d="M9.2 10.2 6.8 8M14.8 10.2 17.2 8M9.2 13.8 6.8 16M14.8 13.8 17.2 16" />
        <circle cx="5" cy="6.5" r="2.5" />
        <circle cx="19" cy="6.5" r="2.5" />
        <circle cx="5" cy="17.5" r="2.5" />
        <circle cx="19" cy="17.5" r="2.5" />
        <path d="M11 15v2h2v-2" />
      </>
    ),
    telecom: (
      <>
        <path d="M12 21V9M9 21h6M9.5 16h5M10.5 12h3" />
        <path d="M8.5 8.5a5 5 0 0 1 7 0M5.5 5.5a9.2 9.2 0 0 1 13 0" />
        <circle cx="12" cy="7" r="1.2" />
      </>
    ),
    record: (
      <>
        <path d="M3 20h18M5 20v-6h3v6M10.5 20v-9h3v9M16 20V8h3v12" />
        <path d="m5 10 4-4 4 2 6-5M16 3h3v3" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {platformPaths[name] || platformPaths.chip}
    </svg>
  );
}

function DroneHeroVisual() {
  return (
    <div className="drone-hero-visual" aria-label="AI drone inspecting power and pipeline infrastructure">
      <img className="drone-hero-visual__drone" src={inspectionDrone} alt="ZMD autonomous inspection drone" />

      <svg
        className="drone-callout-lines drone-callout-lines--desktop"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="drone-callout-line drone-callout-line--hotspot" d="M69 13 H72 V15 H95" />
        <path className="drone-callout-line drone-callout-line--tower" d="M78 43 H80 V40 H95" />
        <path className="drone-callout-line drone-callout-line--wear" d="M74 77 H77 V83 H95" />
        <path className="drone-callout-line drone-callout-line--pipeline" d="M23 58 H29 V85 H18" />
      </svg>

      <svg
        className="drone-callout-lines drone-callout-lines--mobile"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="drone-callout-line drone-callout-line--hotspot" d="M49 37 H53 V38 H65" />
        <path className="drone-callout-line drone-callout-line--tower" d="M49 49 H53 V50 H65" />
        <path className="drone-callout-line drone-callout-line--wear" d="M49 62 H53 V63 H65" />
        <path className="drone-callout-line drone-callout-line--pipeline" d="M48 72 V78 H36" />
      </svg>

      <span className="drone-callout-marker drone-callout-marker--hotspot" aria-hidden="true" />
      <span className="drone-callout-marker drone-callout-marker--tower" aria-hidden="true" />
      <span className="drone-callout-marker drone-callout-marker--wear" aria-hidden="true" />
      <span className="drone-callout-marker drone-callout-marker--pipeline" aria-hidden="true" />

      <figure className="drone-finding drone-finding--hotspot">
        <img src={hotspotDetection} alt="Power-line hotspot detected at 85.6 degrees Celsius" />
      </figure>
      <figure className="drone-finding drone-finding--tower">
        <img src={towerCorrosion} alt="Tower corrosion detected with 92 percent confidence" />
      </figure>
      <figure className="drone-finding drone-finding--wear">
        <img src={structuralWear} alt="Structural wear detected with 89 percent confidence" />
      </figure>
      <figure className="drone-finding drone-finding--pipeline">
        <img src={pipelineCorrosion} alt="Pipeline corrosion detected with 94 percent confidence" />
      </figure>

      <div className="drone-hero-visual__coordinates">12.9716° N / 77.5946° E</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`drone-section-heading${light ? ' drone-section-heading--light' : ''}`}>
      <p className="drone-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="drone-section-heading__copy">{text}</p>}
    </div>
  );
}

export default function DronePage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.drone-page .drone-reveal');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('drone-is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('drone-is-visible');
          } else {
            entry.target.classList.remove('drone-is-visible');
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px -8% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const motionSections = page.querySelectorAll('.drone-section, .drone-cta');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = null;

    const updateScrollMotion = () => {
      animationFrame = null;

      if (!reduceMotion && window.innerWidth > 1050) {
        motionSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const normalizedDistance = Math.min(
            1,
            Math.max(-1, (sectionCenter - viewportCenter) / window.innerHeight),
          );
          section.style.setProperty('--drone-scroll-shift', `${(-normalizedDistance * 12).toFixed(2)}px`);
        });
      }
    };

    const requestScrollUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScrollMotion);
      }
    };

    updateScrollMotion();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);

    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="drone-page" ref={pageRef}>
      <section
        className="drone-hero drone-reveal"
        id="drone-hero"
        aria-labelledby="drone-hero-title"
        style={{
          '--drone-hero-background': `url(${infrastructureCorridor})`,
          '--drone-hero-mobile-background': `url(${mobileInfrastructureCorridor})`,
        }}
      >
        <div className="drone-wrap drone-hero__grid">
          <div className="drone-hero__content">
            <p className="drone-eyebrow">Autonomous inspection platform</p>
            <h1 id="drone-hero-title">
              <span className="drone-hero__lead-line">Eyes on infrastructure</span><br className="drone-hero__tablet-break" /> that <span className="drone-hero__accent">cannot</span><br className="drone-hero__final-break" /> <span className="drone-hero__accent">stop running.</span>
            </h1>
            <p className="drone-hero__lede">
              ZMD&apos;s AI-enabled inspection drone flies fixed routes over power lines, pipelines,
              towers, and critical assets—catching corrosion, heat damage, and structural wear before
              they become failures.
            </p>
            <div className="drone-actions">
              <a className="drone-button drone-button--primary" href="#drone-platform">Explore the platform <span>↗</span></a>
              <a className="drone-button drone-button--secondary" href="mailto:sales@zmd.tech">Talk to sales</a>
            </div>
            <dl className="drone-hero__stats">
              <div><dt><span className="drone-hero__stat-icon"><Icon name="clock3" /></span>45 min</dt><dd>Flight time</dd></div>
              <div><dt><span className="drone-hero__stat-icon"><Icon name="target" /></span>03</dt><dd>Sensor modes</dd></div>
              <div><dt><span className="drone-hero__stat-icon"><Icon name="ruler" /></span>cm</dt><dd>RTK accuracy</dd></div>
              <div><dt><span className="drone-hero__stat-icon"><Icon name="radio" /></span>Live</dt><dd>Edge inference</dd></div>
            </dl>
          </div>
          <DroneHeroVisual />
        </div>

        <div className="drone-hero__mobile-layout">
          <p className="drone-eyebrow">Autonomous inspection platform</p>
          <h1 className="drone-hero__mobile-title">
            <span>Eyes on</span>
            <span>infrastructure</span>
            <span className="drone-hero__mobile-title-final">that <strong>cannot stop running.</strong></span>
          </h1>
          <p className="drone-hero__mobile-copy">
            ZMD&apos;s AI-enabled inspection drone flies fixed routes over power lines, pipelines,
            towers, and critical assets—catching corrosion, heat damage, and structural wear before
            they become failures.
          </p>

          <figure className="drone-hero__mobile-drone">
            <img src={inspectionDrone} alt="ZMD autonomous inspection drone" />
          </figure>

          <div className="drone-hero__mobile-findings" aria-label="Inspection findings">
            <img src={hotspotDetection} alt="Power-line hotspot detection" />
            <img src={towerCorrosion} alt="Tower corrosion detection" />
            <img src={structuralWear} alt="Structural wear detection" />
            <img src={pipelineCorrosion} alt="Pipeline corrosion detection" />
          </div>

          <div className="drone-actions drone-hero__mobile-actions">
            <a className="drone-button drone-button--primary" href="#drone-platform">Explore the platform <span>↗</span></a>
            <a className="drone-button drone-button--secondary" href="mailto:sales@zmd.tech">Talk to sales</a>
          </div>

          <dl className="drone-hero__stats drone-hero__mobile-stats">
            <div><dt><span className="drone-hero__stat-icon"><Icon name="clock3" /></span>45 min</dt><dd>Flight time</dd></div>
            <div><dt><span className="drone-hero__stat-icon"><Icon name="target" /></span>03</dt><dd>Sensor modes</dd></div>
            <div><dt><span className="drone-hero__stat-icon"><Icon name="ruler" /></span>cm</dt><dd>RTK accuracy</dd></div>
            <div><dt><span className="drone-hero__stat-icon"><Icon name="radio" /></span>Live</dt><dd>Edge inference</dd></div>
          </dl>
        </div>
      </section>

      <section className="drone-section drone-section--paper drone-reveal" id="drone-platform">
        <div className="drone-wrap">
          <div className="drone-platform-intro">
            <SectionHeading
              eyebrow="The platform"
              title="One aircraft. Three ways of seeing."
              text="A rugged autonomous airframe combines three sensor payloads with an onboard AI computer, capturing, classifying, and geo-tagging inspection data in one flight."
            />
            <figure className="drone-platform-visual">
              <picture className="drone-platform-visual__media">
                <source media="(max-width: 1050px)" srcSet={mobileDrone} />
                <img src={platformSensorDrone} alt="ZMD drone with integrated RGB, thermal, and LiDAR sensor payload" />
              </picture>
              <dl className="drone-platform-sensors">
                <div><dt><PlatformIcon name="camera" />RGB camera</dt><dd>4K resolution with<br />30× optical zoom</dd></div>
                <div><dt><PlatformIcon name="thermal" />Thermal sensor</dt><dd>640 × 512</dd></div>
                <div><dt><PlatformIcon name="lidar" />LiDAR module</dt><dd>250 m range</dd></div>
              </dl>
            </figure>
          </div>
          <div className="drone-feature-grid">
            {platformFeatures.map((feature, index) => (
              <article
                className={`drone-feature-card drone-feature-card--${index + 1}`}
                key={feature.title}
              >
                <div className="drone-feature-card__top">
                  <span className="drone-card-index">0{index + 1}</span>
                  <span className="drone-icon"><PlatformIcon name={feature.icon} /></span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <div className="drone-feature-card__media">
                  <img src={feature.image} alt={feature.imageAlt} />
                </div>
              </article>
            ))}
          </div>
          <div className="drone-pipeline" aria-label="Inspection data pipeline">
            {platformPipeline.map(([icon, label, title], index) => {
              return (
                <React.Fragment key={label}>
                  <div className="drone-pipeline__node">
                    <span className="drone-pipeline__icon"><PlatformIcon name={icon} /></span>
                    <div><span>{label}</span><strong>{title}</strong></div>
                  </div>
                  {index < 3 && <span className="drone-pipeline__arrow" aria-hidden="true"><Icon name="arrowRight" /></span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section className="drone-section drone-section--ink drone-reveal" id="drone-specs">
        <div className="drone-wrap">
          <SectionHeading
            eyebrow="Platform specifications"
            title="Built for long, unattended runs."
            text="A weatherproof autonomous airframe with centimetre-level navigation, sized to cover long linear assets in a single mission."
          />
          <div className="drone-spec-grid">
            {specifications.map(([icon, label, value], index) => (
              <article className="drone-spec" key={label}>
                <div className="drone-spec__top">
                  <span className="drone-spec__icon"><Icon name={icon} /></span>
                  <span className="drone-spec__number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <span className="drone-spec__label">{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="drone-certifications">
            {certifications.map(([icon, item]) => (
              <span key={item}><Icon name={icon} />{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="drone-section drone-section--paper drone-reveal" id="drone-detection">
        <div className="drone-wrap">
          <SectionHeading
            eyebrow="What it catches"
            title="Spot the failure before it becomes one."
            text="Every flight runs consistent inspection routines across the infrastructure in view, tagging and classifying each finding along the way."
          />
          <div className="drone-detection-grid">
            {detections.map(([icon, title, tags, image, imageAlt]) => (
              <article className="drone-detection-card" key={title}>
                <div className={`drone-detection-card__visual${image ? ' drone-detection-card__visual--image' : ''}`}>
                  {image ? <img src={image} alt={imageAlt} loading="lazy" /> : <Icon name={icon} />}
                  {image && <div className="drone-detection-card__icon"><Icon name={icon} /></div>}
                  <span />
                  <span />
                </div>
                <div className="drone-detection-card__body">
                  <h3>{title}</h3>
                  <div className="drone-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="drone-section drone-section--mist drone-reveal" id="drone-use-cases">
        <div className="drone-wrap">
          <SectionHeading
            eyebrow="Where it flies"
            title="One platform. Different critical assets."
            text="The airframe, workflow, and dashboard stay consistent. The AI model and flight plan adapt to the infrastructure being inspected."
          />
          <div className="drone-use-grid">
            {useCases.map(([icon, title, text, image, imageAlt], index) => (
              <article className="drone-use-card" key={title}>
                <div className="drone-use-card__visual">
                  <img src={image} alt={imageAlt} loading="lazy" />
                  <div className="drone-use-card__top">
                    <span className="drone-icon"><Icon name={icon} /></span>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="drone-use-card__body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="drone-section drone-section--red drone-reveal" id="drone-workflow">
        <div className="drone-wrap">
          <SectionHeading eyebrow="System workflow" title="From flight plan to finding, in one pass." />
          <ol className="drone-workflow">
            {workflow.map(([icon, phase, title, text], index) => (
              <li key={title}>
                <div className="drone-workflow__top">
                  <span className="drone-workflow__icon"><Icon name={icon} /></span>
                  <span className="drone-workflow__number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="drone-workflow__body">
                  <span className="drone-workflow__phase">{phase}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="drone-section drone-section--mist drone-reveal" id="drone-deep-dive">
        <div className="drone-wrap">
          <SectionHeading eyebrow="Sensor deep dive" title="Where LiDAR and thermal payloads earn their keep." />
          <div className="drone-deep-grid">
            {deepDives.map((panel) => (
              <article className="drone-deep-card" key={panel.title}>
                <header><span className="drone-icon"><Icon name={panel.icon} /></span><span>{panel.number}</span><h3>{panel.title}</h3></header>
                <div>
                  {panel.items.map(([icon, title, text], index) => (
                    <div className="drone-deep-row" key={title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span className="drone-deep-row__icon"><Icon name={icon} /></span>
                      <div><h4>{title}</h4><p>{text}</p></div>
                      <span className="drone-deep-row__chevron"><Icon name="chevronRight" /></span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="drone-section drone-section--paper drone-values-section drone-reveal">
        <div className="drone-wrap">
          <SectionHeading eyebrow="Why teams choose ZMD" title="Intelligence that changes field operations." />
          <div className="drone-value-grid">
            {values.map(([icon, title, text]) => (
              <article key={title}><span className="drone-icon"><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="drone-cta drone-reveal" id="drone-contact">
        <div className="drone-wrap drone-cta__inner">
          <p className="drone-eyebrow">Enable intelligent inspection</p>
          <h2>Move maintenance ahead of failure.</h2>
          <p>Autonomous drone intelligence and real-time analytics for infrastructure that cannot afford slow inspection cycles.</p>
          <div className="drone-actions drone-actions--center">
            <a className="drone-button drone-button--primary" href="mailto:sales@zmd.tech">sales@zmd.tech <span>↗</span></a>
            <a className="drone-button drone-button--secondary" href="https://www.zmd.co.in" target="_blank" rel="noreferrer">Visit ZMD</a>
          </div>
        </div>
      </section>
    </div>
  );
}
