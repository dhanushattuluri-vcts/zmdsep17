import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import serverChassis from '../../assets/images/server/server_chassis.webp';
import overviewCpuImg from '../../assets/images/server/overview_cpu.webp';
import overviewRamImg from '../../assets/images/server/overview_ram.webp';
import overviewSsdImg from '../../assets/images/server/overview_ssd.webp';
import overviewPsuImg from '../../assets/images/server/overview_psu.webp';
import blueprintFrontImg from '../../assets/images/server/blueprint_front.webp';
import blueprintRearImg from '../../assets/images/server/blueprint_rear.webp';
import blueprintInternalImg from '../../assets/images/server/blueprint_internal.webp';
import configuratorBayImg from '../../assets/images/server/configurator_bay.webp';
import archOverviewImg from '../../assets/images/server/arch_overview.webp';
import specsVisual1Img from '../../assets/images/server/specs_visual_1.webp';
import specsVisual2Img from '../../assets/images/server/specs_visual_2.webp';
import specsVisual3Img from '../../assets/images/server/specs_visual_3.webp';
import specsVisual4Img from '../../assets/images/server/specs_visual_4.webp';
import exploreModel1Img from '../../assets/images/server/explore_model_1u.webp';
import exploreModel2Img from '../../assets/images/server/explore_model_2u.webp';
import exploreModel3Img from '../../assets/images/server/explore_model_4u.webp';
import '../../assets/css/server.css';

function TiltCard({
  index,
  tag,
  statBase,
  statAccent,
  description,
  active = false,
}) {
  const cardRef = useRef(null);

  const isTouchOrReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isCoarse || isReduced;
  };

  const handleMouseEnter = () => {
    if (isTouchOrReducedMotion() || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.15s ease-out';
  };

  const handleMouseMove = (e) => {
    if (isTouchOrReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = py * -8;
    const rotateY = px * 10;

    cardRef.current.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    if (isTouchOrReducedMotion() || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.3, 1)';
    cardRef.current.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  return (
    <article
      ref={cardRef}
      className={`tilt-spec-card ${active ? 'tilt-spec-card--active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-spec-card__header">
        <span className="tilt-spec-card__index">{index}</span>
        <span className="tilt-spec-card__tag">{tag}</span>
      </div>

      <h3 className="tilt-spec-card__stat">
        {statBase}
        {statAccent && <span className="accent">{statAccent}</span>}
      </h3>

      <p className="tilt-spec-card__description">{description}</p>
    </article>
  );
}

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-3.8A3 3 0 0 1 2 14.4V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8Z" />
    <path d="M7 10h.01M11 10h.01M15 10h.01" />
  </svg>
);

const ProcessorIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <rect x="13" y="13" width="22" height="22" rx="2" />
    <rect x="18" y="18" width="12" height="12" rx="1" />
    <path d="M18 7v6m6-6v6m6-6v6M18 35v6m6-6v6m6-6v6M7 18h6m-6 6h6m-6 6h6m22-12h6m-6 6h6m-6 6h6" />
  </svg>
);

const MemoryIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <rect x="6" y="14" width="36" height="18" rx="2" />
    <rect x="11" y="18" width="11" height="9" rx="1" />
    <rect x="27" y="18" width="10" height="9" rx="1" />
    <path d="M11 32v4m7-4v4m12-4v4m7-4v4M9 36h12m6 0h12" />
  </svg>
);

const PowerIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M27 5 10 27h12l-2 16 18-24H26l1-14Z" />
  </svg>
);

const RackIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <rect x="10" y="7" width="28" height="10" rx="2" />
    <rect x="10" y="19" width="28" height="10" rx="2" />
    <rect x="10" y="31" width="28" height="10" rx="2" />
    <path d="M32 12h2M32 24h2M32 36h2" />
  </svg>
);

const specs = [
  { Icon: ProcessorIcon, title: 'Dual Xeon', detail: '6700 / 6500 Series' },
  { Icon: MemoryIcon, title: 'Up to 8 TB', detail: 'DDR5 Memory' },
  { Icon: PowerIcon, title: '3000 W', detail: '1+1 Titanium PSU' },
  { Icon: RackIcon, title: '2U', detail: 'Rackmount Chassis' },
];

const whyFeatures = [
  {
    num: '01',
    title: 'Enterprise-Class Performance',
    description: "Dual Intel Xeon Scalable processors deliver exceptional compute density for the workloads that don't get a second attempt.",
  },
  {
    num: '02',
    title: 'Massive Memory Capacity',
    description: 'Up to 8TB DDR5 RDIMM across 32 slots for high-throughput, multi-tenant, memory-bound work.',
  },
  {
    num: '03',
    title: 'High-Speed Storage Flexibility',
    description: 'Up to 24 NVMe / E1.S drives — ultra-fast, low-latency access sized to your data pipeline.',
  },
  {
    num: '04',
    title: 'Future-Ready Expansion',
    description: 'PCIe Gen5 slots and OCP support ready for GPUs, DPUs, high-speed NICs, and add-in cards.',
  },
  {
    num: '05',
    title: 'Redundant by Design',
    description: 'Dual PSU, ECC memory, and engineered thermal headroom — from the backplane to the fan wall.',
  },
];

const cards = [
  {
    index: "BENTO-01",
    tag: "PROCESSORS",
    statBase: "2× Intel®\nXeon®\n6700/6500",
    description: "Dual Intel® Xeon® 6700/6500 Series\nprocessors with P-cores or E-cores.",
  },
  {
    index: "BENTO-02",
    tag: "MAX MEMORY",
    statBase: "8",
    statAccent: "TB",
    description: "Up to 8TB DDR5 across 32 DIMM slots\n— 2DPC RDIMM @ 5200MT/s.",
  },
  {
    index: "BENTO-03",
    tag: "STORAGE FABRIC",
    statBase: "Gen5",
    description: "NVMe Gen5 and E1.S Gen5 backplane\n— line-rate, low-latency I/O.",
  },
  {
    index: "BENTO-04",
    tag: "POWER ARCHITECTURE",
    statBase: "3,000",
    statAccent: "W",
    description: "3000W 1+1 Redundant Titanium (96%)\nCRPS supplies.",
  },
  {
    index: "BENTO-05",
    tag: "DRIVE BAY PROFILES",
    statBase: "6 ",
    statAccent: "options",
    description: "Six configurable drive bay modules\nfrom 2.5\" NVMe to 3.5\" SAS/SATA.",
  },
  {
    index: "BENTO-06",
    tag: "MAX CPU CORES",
    statBase: "144",
    statAccent: "C",
    description: "Up to 144C/144T per CPU with E-cores;\n86C/172T with P-cores.",
  },
  {
    index: "BENTO-07",
    tag: "MANAGEMENT",
    statBase: "DC-SCM",
    description: "Dedicated DC-SCM remote management\nmodule on-board.",
  },
  {
    index: "BENTO-08",
    tag: "NETWORK SUBSYSTEM",
    statBase: "OCP NIC",
    description: "Modular OCP NIC slot for built-in\nhigh-speed networking.",
    active: true,
  },
];

const overviewStats = [
  { val: '2', label: 'CPU SOCKETS' },
  { val: '32', label: 'DIMM SLOTS' },
  { val: '24', label: 'MAX DRIVE BAYS' },
  { val: '1+1', label: 'REDUNDANT PSU' },
];

const overviewFeatures = [
  {
    num: '01',
    title: 'Dual Xeon 6700 / 6500',
    description: 'Up to 86 cores / 172 threads per CPU with up to 336MB of L3 cache for P-core configurations.',
    image: overviewCpuImg,
  },
  {
    num: '02',
    title: 'Up to 8TB DDR5',
    description: '32 DIMM slots supporting 8TB at 5200MT/s in 2DPC or 4TB at 6400MT/s in 1DPC.',
    image: overviewRamImg,
  },
  {
    num: '03',
    title: 'NVMe Gen5 & E1.S',
    description: 'Six configurable bay layouts spanning 2.5" SAS/SATA, NVMe Gen4/5, and E1.S storage.',
    image: overviewSsdImg,
  },
  {
    num: '04',
    title: '3000W 1+1 Titanium',
    description: 'Redundant CRPS supplies at 96% Titanium-level efficiency for sustained data center load.',
    image: overviewPsuImg,
  },
];

const techSpecsTabs = [
  {
    id: '01',
    label: '01 System & Processor',
    visualLabel: 'SYSTEM VISUAL',
    visualImage: specsVisual1Img,
    visualCaption: 'Dual-socket compute architecture',
    cards: [
      {
        title: 'System',
        paramCount: '4 PARAMETERS',
        params: [
          { key: 'MOTHERBOARD FORM FACTOR', val: 'Dual Socket (LGA-4710), M-FLW · 18.4" × 16.7"' },
          { key: 'SERVER DIMENSIONS', val: '2U Rackmount · 438 × 87 × 770 mm (17.24" × 3.4" × 30.3")' },
          { key: 'SYSTEM BIOS', val: 'AMI 64MB SPI Flash ROM' },
          { key: 'OPERATING SYSTEMS', val: 'Windows / Linux' },
        ],
      },
      {
        title: 'Processor',
        paramCount: '3 PARAMETERS',
        params: [
          { key: 'PROCESSOR', val: 'Intel® Xeon® 6700 / 6500 series — P-cores or 6700 with E-cores' },
          { key: 'P-CORES', val: 'Up to 86 cores / 172 threads · Up to 336MB cache per CPU' },
          { key: 'E-CORES', val: 'Up to 144 cores / 144 threads · Up to 108MB cache per CPU' },
        ],
      },
    ],
  },
  {
    id: '02',
    label: '02 Memory & Storage',
    visualLabel: 'MEMORY VISUAL',
    visualImage: specsVisual2Img,
    visualCaption: 'High-density memory and storage layout',
    cards: [
      {
        title: 'System Memory',
        paramCount: '4 PARAMETERS',
        params: [
          { key: 'SLOT COUNT', val: '32 DIMM slots' },
          { key: 'MAX MEMORY (1DPC)', val: 'Up to 4TB · 6400MT/s ECC DDR5 RDIMM' },
          { key: 'MAX MEMORY (1DPC)', val: 'Up to 1TB · 8000MT/s ECC DDR5 MRDIMM' },
          { key: 'MAX MEMORY (2DPC)', val: 'Up to 8TB · 5200MT/s ECC DDR5 RDIMM' },
        ],
      },
      {
        title: 'Drive Bays & Backplane',
        paramCount: '2 PARAMETERS',
        params: [
          { key: 'DRIVE BAY OPTIONS', val: '6 configurable layouts – see Drive Bay Configuration' },
          { key: 'STORAGE BACKPLANE', val: '2 × 8-port E1.S NVMe Gen5' },
        ],
      },
    ],
  },
  {
    id: '03',
    label: '03 Expansion & Connectivity',
    visualLabel: 'EXPANSION VISUAL',
    visualImage: specsVisual3Img,
    visualCaption: 'Flexible expansion and rear connectivity',
    cards: [
      {
        title: 'Expansion',
        paramCount: '4 PARAMETERS',
        params: [
          { key: 'PCIE SUPPORT', val: '3 × 2-FH module · 1 × 1-LP + 1 × 1-FH module' },
          { key: 'DC-SCM', val: 'Remote management module' },
          { key: 'E1.S EXPANSION', val: '2 × E1.S' },
          { key: 'OCP NIC', val: '1 × OCP NIC – supported' },
        ],
      },
      {
        title: 'On-Board Devices',
        paramCount: '2 PARAMETERS',
        params: [
          { key: 'NVME', val: 'NVMe enabled · RAID 0/1/5/10 · VROC hardware key required' },
          { key: 'TPM', val: '1 × TPM header' },
        ],
      },
    ],
  },
  {
    id: '04',
    label: '04 Power & Cooling',
    visualLabel: 'POWER VISUAL',
    visualImage: specsVisual4Img,
    visualCaption: 'Redundant power and thermal control',
    cards: [
      {
        title: 'Power Supply',
        paramCount: '1 PARAMETERS',
        params: [
          { key: 'PSU FORM FACTOR', val: 'CRPS 3000W Redundant (1+1) · Titanium Level · 96% efficiency' },
        ],
      },
      {
        title: 'System Cooling',
        paramCount: '4 PARAMETERS',
        params: [
          { key: 'COOLING FANS', val: '6 × 6056 · 25700 / 24600 RPM' },
          { key: 'AIR SHROUD', val: '1 × Air Shroud' },
          { key: 'FRONT INDICATORS', val: 'Power Status · UID · HDD Activity · System Status' },
          { key: 'FRONT CONTROL', val: 'Power · Reset · UID · 2 × USB 3.0' },
        ],
      },
    ],
  },
];

const blueprintData = {
  front: {
    id: 'front',
    label: 'front',
    subheader: 'CHASSIS FACE – DRIVE BAY ARRAY & CONTROL PANEL',
    image: blueprintFrontImg,
    title: 'FRONT VIEW · HOTSPOTS',
    hotspots: [
      { id: 1, label: 'Power Button / LED', targetX: 13.2, targetY: 42.5, x: 5, y: 32 },
      { id: 2, label: 'UID Button / LED', targetX: 13.2, targetY: 51.5, x: 5, y: 51.5 },
      { id: 3, label: 'USB 3.0 Ports (2)', targetX: 13.2, targetY: 62.5, x: 5, y: 69 },
      { id: 4, label: 'USB 3.0 Ports (2)', targetX: 13.2, targetY: 71.5, x: 5, y: 84 },
      { id: 5, label: 'System Status LEDs', targetX: 9.8, targetY: 57.5, x: 26, y: 28 },
    ],
  },
  rear: {
    id: 'rear',
    label: 'rear',
    subheader: 'I/O CONNECTORS MATRIX',
    image: blueprintRearImg,
    title: 'REAR VIEW · HOTSPOTS',
    hotspots: [
      { id: 1, label: 'Redundant Power Supplies', targetX: 76, targetY: 58, x: 76, y: 26 },
      { id: 2, label: 'Cooling Fans', targetX: 24, targetY: 58, x: 16, y: 34 },
      { id: 3, label: 'DC-SCM Management Port', targetX: 34, targetY: 74, x: 34, y: 90 },
      { id: 4, label: 'USB 3.0 Ports', targetX: 41, targetY: 74, x: 41, y: 90 },
      { id: 5, label: 'VGA Port', targetX: 48, targetY: 74, x: 48, y: 90 },
      { id: 6, label: 'Serial Port', targetX: 55, targetY: 74, x: 55, y: 90 },
      { id: 7, label: '1GbE Management Port', targetX: 62, targetY: 74, x: 62, y: 90 },
      { id: 8, label: 'E1.S Ports', targetX: 38, targetY: 44, x: 38, y: 26 },
      { id: 9, label: 'PCIe Expansion Slots', targetX: 53, targetY: 44, x: 53, y: 26 },
      { id: 10, label: 'OCP NIC Slot', targetX: 66, targetY: 44, x: 66, y: 26 },
    ],
  },
  internal: {
    id: 'internal',
    label: 'internal',
    subheader: 'UNDER-THE-HOOD ARCHITECTURAL TOPOLOGY',
    image: blueprintInternalImg,
    title: 'INTERNAL VIEW · HOTSPOTS',
    hotspots: [
      { id: 1, label: 'Redundant Power Supplies', targetX: 25, targetY: 64, x: 12, y: 64 },
      { id: 2, label: 'System Fans', targetX: 34, targetY: 46, x: 34, y: 25 },
      { id: 3, label: 'CPU Sockets (Dual)', targetX: 48, targetY: 48, x: 48, y: 25 },
      { id: 4, label: 'DDR5 DIMM Slots', targetX: 58, targetY: 48, x: 58, y: 25 },
      { id: 5, label: 'PCIe 5.0 Expansion Slots', targetX: 70, targetY: 42, x: 70, y: 22 },
      { id: 6, label: 'OCP NIC Slot', targetX: 74, targetY: 68, x: 86, y: 68 },
      { id: 7, label: 'NVMe Backplane', targetX: 20, targetY: 46, x: 10, y: 46 },
      { id: 8, label: 'Drive Bays (NVMe/SATA)', targetX: 50, targetY: 82, x: 50, y: 93 },
    ],
  },
};

const configuratorData = [
  {
    id: 1,
    optNum: 'OPTION 01',
    name: 'Combo 8+8',
    title: 'Combo bay module 8-bay 2.5" Gen 5 + 8-bay E1.S Gen 5',
    desc: 'Hybrid module mixing 8× 2.5" NVMe Gen5 with 8× E1.S Gen5 — flexible mix of capacity and ruler-form factor density.',
    form: 'COMBO 8+8',
    class: 'GEN5',
    status: 'SUPPORTED',
  },
  {
    id: 2,
    optNum: 'OPTION 02',
    name: 'E1.S 24-bay',
    title: 'High-Density 24-bay E1.S Gen 5 Ruler Module',
    desc: 'Maximum EDSFF density optimizing airflow and thermal dissipation across 24 hot-swappable E1.S ruler SSDs.',
    form: 'E1.S 24-BAY',
    class: 'GEN5',
    status: 'SUPPORTED',
  },
  {
    id: 3,
    optNum: 'OPTION 03',
    name: '24× 2.5" NVMe Gen4',
    title: '24-bay 2.5" NVMe PCIe Gen4 High-Performance Storage',
    desc: 'Pure NVMe Gen4 storage array providing high IOPS throughput for databases, virtualized environments, and cloud infrastructure.',
    form: '24× 2.5" NVME',
    class: 'GEN4',
    status: 'SUPPORTED',
  },
  {
    id: 4,
    optNum: 'OPTION 04',
    name: '24× 2.5" SAS/SATA',
    title: '24-bay 2.5" Enterprise SAS-4 / SATA III Module',
    desc: 'Cost-effective high-capacity array compatible with 12G/24G SAS enterprise drives and 6G SATA SSDs/HDDs.',
    form: '24× 2.5" SAS/SATA',
    class: 'SAS-4 / SATA',
    status: 'SUPPORTED',
  },
  {
    id: 5,
    optNum: 'OPTION 05',
    name: '12× 3.5" Tri-mode',
    title: '12-bay 3.5" Large Form Factor (LFF) Tri-Mode Storage',
    desc: 'Versatile 3.5" drive backplane supporting NVMe, SAS, and SATA drives simultaneously via hardware RAID tri-mode controller.',
    form: '12× 3.5" LFF',
    class: 'TRI-MODE',
    status: 'SUPPORTED',
  },
  {
    id: 6,
    optNum: 'OPTION 06',
    name: '12× 3.5" SAS/SATA',
    title: '12-bay 3.5" LFF High-Capacity Storage Array',
    desc: 'Dense cold storage & backup module housing up to 12 high-capacity 3.5" HDD/SSD enterprise drives.',
    form: '12× 3.5" SAS/SATA',
    class: 'SAS / SATA',
    status: 'SUPPORTED',
  },
];

const applicationsData = [
  {
    num: '01',
    title: 'Cloud Infrastructure',
    subtext: 'Elastic tenants, predictable per-rack economics.',
    badge: 'CERTIFIED',
  },
  {
    num: '02',
    title: 'Virtualization',
    subtext: 'Dense hypervisor consolidation with deep memory.',
    badge: 'CERTIFIED',
  },
  {
    num: '03',
    title: 'Database Servers',
    subtext: 'In-memory and OLTP at high sustained throughput.',
    badge: 'CERTIFIED',
  },
  {
    num: '04',
    title: 'AI / Machine Learning',
    subtext: 'GPU/DPU-ready expansion, PCIe Gen5 throughout.',
    badge: 'CERTIFIED',
  },
  {
    num: '05',
    title: 'High-Performance Computing',
    subtext: 'Core-count scaled for tightly coupled workloads.',
    badge: 'CERTIFIED',
  },
];

const environmentData = [
  { label: 'COMPLIANCE', value: 'RoHS Compliant' },
  { label: 'OPERATING TEMPERATURE', value: '10°C - 35°C (50°F - 95°F)' },
  { label: 'NON-OPERATING TEMPERATURE', value: '-30°C - 60°C (-30°F - 140°F)' },
  { label: 'OPERATING HUMIDITY', value: '8% - 80% Non-condensing' },
  { label: 'NON-OPERATING HUMIDITY', value: '8% - 90% Non-condensing' },
];

const resourcesData = [
  {
    id: 'datasheet',
    title: 'Datasheet',
    desc: 'Complete detailed product specifications',
    link: '#',
    iconType: 'document',
  },
  {
    id: 'brief',
    title: 'Product Brief',
    desc: 'Overview and core design highlights',
    link: '#',
    iconType: 'book',
  },
  {
    id: 'manual',
    title: 'User Manual',
    desc: 'Step-by-step installation and board layout',
    link: '#',
    iconType: 'document',
  },
  {
    id: 'quickstart',
    title: 'Quick Start Guide',
    desc: 'Fast initialization and mounting',
    link: '#',
    iconType: 'rocket',
  },
  {
    id: 'firmware',
    title: 'Firmware',
    desc: 'Latest BIOS and firmware updates',
    link: '#',
    iconType: 'chip',
  },
];

const orderSheetData = [
  { label: 'MODELS', value: 'Contact sales for available SKUs' },
  { label: 'PACKAGE DIMENSIONS', value: 'Contact sales for configuration details' },
  { label: 'WEIGHT', value: 'Varies by drive bay & PSU configuration' },
  { label: 'LEAD TIME', value: 'Standard · 4-6 weeks' },
  { label: 'EVAL UNITS', value: 'Available on request' },
];

const serverModelsData = [
  {
    title: '1U/1S Xeon Series',
    desc: 'Compact and efficient for web, edge, and light enterprise workloads.',
    image: exploreModel1Img,
    link: '/contact',
  },
  {
    title: '2U/1S Xeon Series',
    desc: 'Balanced performance and expandability for growing business needs.',
    image: exploreModel2Img,
    link: '/contact',
  },
  {
    title: '4U/2S Xeon Series',
    desc: 'High-performance and scalable for compute-intensive and mission-critical work.',
    image: exploreModel3Img,
    link: '/contact',
  },
];

export default function ServerPage() {
  const whyRef = useRef(null);
  const modelsRef = useRef(null);
  const bentoRef = useRef(null);
  const overviewRef = useRef(null);
  const specsRef = useRef(null);
  const archRef = useRef(null);
  const blueprintRef = useRef(null);
  const configuratorRef = useRef(null);
  const applicationsRef = useRef(null);
  const resourcesRef = useRef(null);
  const orderingRef = useRef(null);

  const [whyVisible, setWhyVisible] = useState(false);
  const [modelsVisible, setModelsVisible] = useState(false);
  const [bentoVisible, setBentoVisible] = useState(false);
  const [overviewVisible, setOverviewVisible] = useState(false);
  const [specsVisible, setSpecsVisible] = useState(false);
  const [archVisible, setArchVisible] = useState(false);
  const [blueprintVisible, setBlueprintVisible] = useState(false);
  const [configuratorVisible, setConfiguratorVisible] = useState(false);
  const [applicationsVisible, setApplicationsVisible] = useState(false);
  const [resourcesVisible, setResourcesVisible] = useState(false);
  const [orderingVisible, setOrderingVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [activeBlueprintTab, setActiveBlueprintTab] = useState('front');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeConfigOption, setActiveConfigOption] = useState(0);
  const [comingSoonCard, setComingSoonCard] = useState(null);

  const handleComingSoon = (idx, e) => {
    e.preventDefault();
    setComingSoonCard(idx);
    setTimeout(() => {
      setComingSoonCard(null);
    }, 2800);
  };

  useEffect(() => {
    const sectionVisibilityMap = [
      { ref: bentoRef, setter: setBentoVisible },
      { ref: overviewRef, setter: setOverviewVisible },
      { ref: specsRef, setter: setSpecsVisible },
      { ref: archRef, setter: setArchVisible },
      { ref: blueprintRef, setter: setBlueprintVisible },
      { ref: configuratorRef, setter: setConfiguratorVisible },
      { ref: applicationsRef, setter: setApplicationsVisible },
      { ref: resourcesRef, setter: setResourcesVisible },
      { ref: whyRef, setter: setWhyVisible },
      { ref: modelsRef, setter: setModelsVisible },
      { ref: orderingRef, setter: setOrderingVisible },
    ];

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sectionVisibilityMap.find(item => item.ref.current === entry.target);
          if (matched) {
            matched.setter(true);
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    sectionVisibilityMap.forEach((item) => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="server-page-container">
      {/* SECTION 1: HERO SECTION */}
      <section className="server-hero" aria-labelledby="server-hero-title">
        <div className="server-hero__grid">
          <div className="server-hero__content">
            <p className="server-hero__eyebrow">Data sheet <span>·</span> 2U/2S Xeon series</p>

            <h1 id="server-hero-title" className="server-hero__title">
              <span>Data Center</span>
              <span><em>2U/2S</em> Xeon Server</span>
              <span className="server-hero__title-muted">with DC-MHS</span>
              <span className="server-hero__title-muted">Compliance</span>
            </h1>

            <span className="server-hero__rule" aria-hidden="true" />

            <p className="server-hero__description">
              High-density dual-socket performance engineered for cloud, AI, HPC,
              and enterprise storage workloads that demand uncompromising
              reliability and efficiency.
            </p>

            <div className="server-hero__actions">
              <Link className="server-button server-button--primary" to="/contact">
                <ContactIcon />
                <span>Contact Us</span>
              </Link>
              <Link className="server-button server-button--secondary" to="/#home">
                <MessageIcon />
                <span>Talk to Our Engineer</span>
              </Link>
            </div>
          </div>

          <figure className="server-product">
            <span className="server-product__accent" aria-hidden="true" />
            <div className="server-product__image-wrap">
              <img
                className="server-product__image"
                src={serverChassis}
                alt="ZMD 2U rackmount Xeon server chassis"
              />
            </div>
            <figcaption className="server-product__caption">
              <span>RS240 <b>·</b> 2U rackmount chassis</span>
              <span className="server-product__note"><i /> Illustrative</span>
            </figcaption>
          </figure>
        </div>

        <div className="server-hero-specs" aria-label="Key server specifications">
          {specs.map(({ Icon, title, detail }) => (
            <article className="server-spec" key={title}>
              <Icon />
              <div>
                <h2>{title}</h2>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: KEY FEATURES BENTO GRID */}
      <section
        ref={bentoRef}
        className={`server-bento ${bentoVisible ? 'is-visible' : ''}`}
        aria-labelledby="server-bento-title"
      >
        <div className="server-bento__container">
          <div className="server-bento__header">
            <p className="server-bento__eyebrow">KEY FEATURES</p>
            <h2 id="server-bento-title" className="server-bento__title">
              Engineered for density, reliability,<br />and raw throughput
            </h2>
          </div>

          <div className="spec-tilt-grid">
            {cards.map((c) => (
              <TiltCard key={c.index} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PRODUCT OVERVIEW */}
      <section
        ref={overviewRef}
        className={`server-overview ${overviewVisible ? 'is-visible' : ''}`}
        aria-labelledby="server-overview-title"
      >
        <div className="server-overview__container">
          <div className="server-overview__header">
            <div className="server-overview__header-left">
              <p className="server-overview__eyebrow">PRODUCT OVERVIEW</p>
              <h2 id="server-overview-title" className="server-overview__title">
                Every rack unit<br />accounted for.
              </h2>
            </div>
            <div className="server-overview__header-right">
              <p>
                This 2U/2S platform is engineered for high-density data-center deployment
                — pairing dual Intel Xeon 6700/6500 series processors with deep memory
                headroom and flexible storage to handle virtualization, cloud, AI, HPC, and
                storage-intensive workloads on a single chassis.
              </p>
              <p>
                DC-MHS compliance means the platform follows an open, modular hardware
                specification — giving your infrastructure team predictable serviceability and
                component interoperability as deployments scale.
              </p>
            </div>
          </div>

          <div className="server-overview__stats-grid">
            {overviewStats.map((item) => (
              <div className="server-overview__stat-card" key={item.label}>
                <div className="server-overview__stat-val">{item.val}</div>
                <div className="server-overview__stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="server-overview__features-grid">
            {overviewFeatures.map((item) => (
              <div className="server-overview__feature-card" key={item.num}>
                <div className="server-overview__feature-content">
                  <div className="server-overview__feature-num">{item.num}</div>
                  <h3 className="server-overview__feature-title">{item.title}</h3>
                  <p className="server-overview__feature-desc">{item.description}</p>
                </div>
                <div className="server-overview__feature-img-wrap">
                  <img src={item.image} alt={item.title} className="server-overview__feature-img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TECHNICAL SPECIFICATIONS */}
      <section
        ref={specsRef}
        className={`server-specs ${specsVisible ? 'server-specs--visible' : ''}`}
        aria-labelledby="server-specs-title"
      >
        <div className="server-specs__container">
          <div className="server-specs__header">
            <div className="server-specs__eyebrow">TECHNICAL SPECIFICATIONS</div>
            <h2 id="server-specs-title" className="server-specs__title">
              Every system detail, organized<br />the way your team actually checks it.
            </h2>
            <p className="server-specs__subtitle">
              Four groups covering system architecture, memory and storage, expansion and connectivity, and power and cooling.
            </p>
          </div>

          <div className="server-specs__tabs-nav">
            {techSpecsTabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                className={`server-specs__tab-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="server-specs__layout-grid" key={activeTab}>
            {/* Left Column: Visual Card */}
            <div className="server-specs__visual-card">
              <div className="server-specs__visual-header">
                <div className="server-specs__visual-bar" />
                <span className="server-specs__visual-title">
                  {techSpecsTabs[activeTab].visualLabel}
                </span>
              </div>
              <div className="server-specs__visual-img-wrap">
                <img
                  src={techSpecsTabs[activeTab].visualImage}
                  alt={techSpecsTabs[activeTab].visualLabel}
                  className="server-specs__visual-img"
                />
              </div>
            </div>

            {/* Right Column: Parameter Cards Stack */}
            <div className="server-specs__cards-stack">
              {techSpecsTabs[activeTab].cards.map((card) => (
                <div className="server-specs__card" key={card.title}>
                  <div className="server-specs__card-header">
                    <span className="server-specs__card-title">{card.title}</span>
                    <span className="server-specs__card-count">{card.paramCount}</span>
                  </div>
                  <div className="server-specs__card-rows">
                    {card.params.map((param, pIdx) => (
                      <div className="server-specs__row" key={pIdx}>
                        <div className="server-specs__param-key">{param.key}</div>
                        <div className="server-specs__param-val">{param.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ARCHITECTURE OVERVIEW */}
      <section
        ref={archRef}
        className={`server-arch ${archVisible ? 'is-visible server-arch--visible' : ''}`}
        aria-labelledby="server-arch-title"
      >
        <div className="server-arch__container">
          {/* Top Header */}
          <div className="server-arch__header">
            <div className="server-arch__eyebrow-wrap">
              <span className="server-arch__red-bar" aria-hidden="true" />
              <p className="server-arch__eyebrow">ARCHITECTURE OVERVIEW</p>
            </div>
            <h2 id="server-arch-title" className="server-arch__title">
              How the platform routes <span className="server-arch__highlight">power, data, and I/O.</span>
            </h2>
            <p className="server-arch__subtitle">
              A PCIe Gen5 switch fabric sits at the center of the system — every storage, expansion, and networking path runs through it.
            </p>
          </div>

          {/* Architecture Infographic Layout */}
          <div className="server-arch__grid">
            {/* Left Column Callout Cards */}
            <div className="server-arch__col server-arch__col--left">
              {/* Card 1: Dual Intel Xeon */}
              <div className="server-arch__callout-card">
                <div className="server-arch__card-top">
                  <div className="server-arch__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="8" y="8" width="8" height="8" />
                      <line x1="9" y1="1" x2="9" y2="4" />
                      <line x1="15" y1="1" x2="15" y2="4" />
                      <line x1="9" y1="20" x2="9" y2="23" />
                      <line x1="15" y1="20" x2="15" y2="23" />
                      <line x1="20" y1="9" x2="23" y2="9" />
                      <line x1="20" y1="15" x2="23" y2="15" />
                      <line x1="1" y1="9" x2="4" y2="9" />
                      <line x1="1" y1="15" x2="4" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="server-arch__card-h3">Dual Intel Xeon</h3>
                    <p className="server-arch__card-tag">SCALABLE PROCESSORS</p>
                  </div>
                </div>
                <p className="server-arch__card-body">
                  Up to 2 processors with high core count for compute-intensive workloads.
                </p>
              </div>

              {/* Card 2: DDR5 Memory */}
              <div className="server-arch__callout-card">
                <div className="server-arch__card-top">
                  <div className="server-arch__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <line x1="6" y1="18" x2="6" y2="21" />
                      <line x1="10" y1="18" x2="10" y2="21" />
                      <line x1="14" y1="18" x2="14" y2="21" />
                      <line x1="18" y1="18" x2="18" y2="21" />
                      <line x1="6" y1="6" x2="6" y2="9" />
                      <line x1="10" y1="6" x2="10" y2="9" />
                      <line x1="14" y1="6" x2="14" y2="9" />
                      <line x1="18" y1="6" x2="18" y2="9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="server-arch__card-h3">DDR5 Memory</h3>
                    <p className="server-arch__card-tag">UP TO 32 DIMM SLOTS</p>
                  </div>
                </div>
                <p className="server-arch__card-body">
                  High-speed memory architecture delivering maximum bandwidth and capacity.
                </p>
              </div>
            </div>

            {/* Center Graphic */}
            <div className="server-arch__center-graphic">
              <div className="server-arch__image-wrap">
                <img
                  src={archOverviewImg}
                  alt="ZMD Server PCIe Gen5 Switch Fabric Chassis Architecture"
                  className="server-arch__chassis-img"
                />
                <div className="server-arch__image-markers" aria-hidden="true">
                  <span className="server-arch__image-marker server-arch__image-marker--1">1</span>
                  <span className="server-arch__image-marker server-arch__image-marker--2">2</span>
                  <span className="server-arch__image-marker server-arch__image-marker--3">3</span>
                  <span className="server-arch__image-marker server-arch__image-marker--4">4</span>
                  <span className="server-arch__image-marker server-arch__image-marker--5">5</span>
                  <span className="server-arch__image-marker server-arch__image-marker--6">6</span>
                </div>
              </div>
            </div>

            {/* Right Column Callout Cards */}
            <div className="server-arch__col server-arch__col--right">
              {/* Card 1: NVMe Storage */}
              <div className="server-arch__callout-card">
                <div className="server-arch__card-top">
                  <div className="server-arch__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="7" y1="8" x2="17" y2="8" />
                      <line x1="7" y1="12" x2="12" y2="12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="server-arch__card-h3">NVMe Storage</h3>
                    <p className="server-arch__card-tag">UP TO 24 × E1.S</p>
                  </div>
                </div>
                <p className="server-arch__card-body">
                  High-performance NVMe drives for extreme throughput and low latency.
                </p>
              </div>

              {/* Card 2: PCIe 5.0 Slots */}
              <div className="server-arch__callout-card">
                <div className="server-arch__card-top">
                  <div className="server-arch__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="8" width="20" height="8" rx="2" />
                      <line x1="6" y1="12" x2="18" y2="12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="server-arch__card-h3">PCIe 5.0 Slots</h3>
                    <p className="server-arch__card-tag">EXPANSION</p>
                  </div>
                </div>
                <p className="server-arch__card-body">
                  Multiple PCIe Gen5 slots for GPUs, NICs, HBAs, and other accelerators.
                </p>
              </div>

              {/* Card 3: OCP NIC */}
              <div className="server-arch__callout-card">
                <div className="server-arch__card-top">
                  <div className="server-arch__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M7 15h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="server-arch__card-h3">OCP NIC</h3>
                    <p className="server-arch__card-tag">NETWORKING</p>
                  </div>
                </div>
                <p className="server-arch__card-body">
                  High-speed, low-latency networking with OCP 3.0 compatible NICs.
                </p>
              </div>

              {/* Card 4: Redundant Power */}
              <div className="server-arch__callout-card">
                <div className="server-arch__card-top">
                  <div className="server-arch__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v10" />
                      <path d="M18 8v4a6 6 0 0 1-12 0V8" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="server-arch__card-h3">Redundant Power</h3>
                    <p className="server-arch__card-tag">&amp; COOLING</p>
                  </div>
                </div>
                <p className="server-arch__card-body">
                  1+1 redundant power supplies and optimized airflow for 24/7 reliability.
                </p>
              </div>
            </div>

            {/* Red Connector Lines Overlay */}
            <svg className="server-arch__connectors-svg" viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none" aria-hidden="true">
              {/* Left Top: Dual Xeon CPU */}
              <path d="M 140 180 L 330 180 L 380 185" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="380" cy="185" r="4" fill="#dc2626" />

              {/* Left Bottom: DDR5 Memory */}
              <path d="M 140 370 L 330 370 L 370 295" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="370" cy="295" r="4" fill="#dc2626" />

              {/* Right 1: NVMe Storage */}
              <path d="M 905 50 L 680 50 L 645 115" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="645" cy="115" r="4" fill="#dc2626" />

              {/* Right 2: PCIe 5.0 Slots */}
              <path d="M 905 170 L 675 170 L 650 215" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="650" cy="215" r="4" fill="#dc2626" />

              {/* Right 3: OCP NIC */}
              <path d="M 905 290 L 685 290 L 660 325" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="660" cy="325" r="4" fill="#dc2626" />

              {/* Right 4: Redundant Power */}
              <path d="M 905 385 L 685 385 L 665 365" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="665" cy="365" r="4" fill="#dc2626" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 7: CHASSIS BLUEPRINT */}
      <section
        ref={blueprintRef}
        className={`server-blueprint ${blueprintVisible ? 'is-visible server-blueprint--visible' : ''}`}
        aria-labelledby="server-blueprint-title"
      >
        <div className="server-blueprint__container">
          <div className="server-blueprint__header">
            <p className="server-blueprint__eyebrow">04 · CHASSIS BLUEPRINT</p>
            <h2 id="server-blueprint-title" className="server-blueprint__title">
              Interactive front, rear, and internal architecture
            </h2>
          </div>

          <div className="server-blueprint__tabs-nav">
            <div className="server-blueprint__tabs-pill-group">
              {['front', 'rear', 'internal'].map((tabKey) => (
                <button
                  key={tabKey}
                  type="button"
                  className={`server-blueprint__tab-btn ${activeBlueprintTab === tabKey ? 'active' : ''}`}
                  onClick={() => {
                    setActiveBlueprintTab(tabKey);
                    setActiveHotspot(null);
                  }}
                >
                  {tabKey}
                </button>
              ))}
            </div>
          </div>

          <p className="server-blueprint__subheader">
            {blueprintData[activeBlueprintTab].subheader}
          </p>

          <div className="server-blueprint__grid" key={activeBlueprintTab}>
            {/* Diagram Display Panel */}
            <div className="server-blueprint__diagram-card">
              <div className="server-blueprint__image-wrapper">
                <img
                  src={blueprintData[activeBlueprintTab].image}
                  alt={`${activeBlueprintTab} view blueprint`}
                  className="server-blueprint__diagram-img"
                />

                <svg className="server-blueprint__svg-overlay">
                  {blueprintData[activeBlueprintTab].hotspots.map((spot) => {
                    const isActive = activeHotspot === spot.id;
                    const tx = spot.targetX ?? spot.x;
                    const ty = spot.targetY ?? spot.y;
                    return (
                      <g key={spot.id} className={`server-blueprint__leader ${isActive ? 'active' : ''}`}>
                        <line
                          x1={`${tx}%`}
                          y1={`${ty}%`}
                          x2={`${spot.x}%`}
                          y2={`${spot.y}%`}
                          className="server-blueprint__leader-line"
                        />
                        <circle
                          cx={`${tx}%`}
                          cy={`${ty}%`}
                          r={isActive ? 5 : 3.5}
                          className="server-blueprint__leader-dot"
                        />
                      </g>
                    );
                  })}
                </svg>

                {blueprintData[activeBlueprintTab].hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    className={`server-blueprint__pin ${activeHotspot === spot.id ? 'active' : ''}`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    aria-label={spot.label}
                  >
                    {spot.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotspots Panel */}
            <div className="server-blueprint__hotspots-card">
              <div className="server-blueprint__hotspots-title">
                {blueprintData[activeBlueprintTab].title}
              </div>
              <div className="server-blueprint__hotspots-list">
                {blueprintData[activeBlueprintTab].hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`server-blueprint__hotspot-row ${activeHotspot === spot.id ? 'active' : ''}`}
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                  >
                    <span className="server-blueprint__spot-num">{spot.id}</span>
                    <span className="server-blueprint__spot-label">{spot.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: DRIVE BAY CONFIGURATOR (WHITE THEME) */}
      <section
        ref={configuratorRef}
        className={`server-configurator ${configuratorVisible ? 'is-visible server-configurator--visible' : ''}`}
        aria-labelledby="server-configurator-title"
      >
        <div className="server-configurator__container">
          <div className="server-configurator__header">
            <p className="server-configurator__eyebrow">05 · DRIVE BAY CONFIGURATOR</p>
            <h2 id="server-configurator-title" className="server-configurator__title">
              Six configurable storage modules
            </h2>
          </div>

          <div className="server-configurator__grid">
            {/* Left Options Selector List */}
            <div className="server-configurator__options-list">
              {configuratorData.map((opt, index) => (
                <div
                  key={opt.id}
                  className={`server-configurator__option-card ${activeConfigOption === index ? 'active' : ''}`}
                  onClick={() => setActiveConfigOption(index)}
                >
                  <div className="server-configurator__option-content">
                    <span className="server-configurator__option-num">{opt.optNum}</span>
                    <span className="server-configurator__option-name">{opt.name}</span>
                  </div>
                  <div className="server-configurator__option-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Display Panel */}
            <div className="server-configurator__display-card">
              <div className="server-configurator__subhead">
                CONFIGURATION · OPTION {configuratorData[activeConfigOption].id}
              </div>
              <h3 className="server-configurator__detail-title">
                {configuratorData[activeConfigOption].title}
              </h3>
              <p className="server-configurator__detail-desc">
                {configuratorData[activeConfigOption].desc}
              </p>

              {/* Graphic Chassis Drive Bay Image Panel */}
              <div className="server-configurator__bay-graphic">
                <img
                  src={configuratorBayImg}
                  alt="Drive Bay Configurator Module Blueprint"
                  className="server-configurator__bay-img"
                />
              </div>

              {/* Bottom Specifications Matrix */}
              <div className="server-configurator__specs-matrix">
                <div className="server-configurator__spec-pill">
                  <span className="server-configurator__spec-label">FORM</span>
                  <span className="server-configurator__spec-value">{configuratorData[activeConfigOption].form}</span>
                </div>
                <div className="server-configurator__spec-pill">
                  <span className="server-configurator__spec-label">CLASS</span>
                  <span className="server-configurator__spec-value">{configuratorData[activeConfigOption].class}</span>
                </div>
                <div className="server-configurator__spec-pill">
                  <span className="server-configurator__spec-label">STATUS</span>
                  <span className="server-configurator__spec-value status-active">{configuratorData[activeConfigOption].status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TYPICAL APPLICATIONS & OPERATING ENVIRONMENT (WHITE THEME) */}
      <section
        ref={applicationsRef}
        className={`server-apps ${applicationsVisible ? 'is-visible server-apps--visible' : ''}`}
        aria-labelledby="server-apps-title"
      >
        <div className="server-apps__container">
          <div className="server-apps__grid">
            {/* Left Column: Typical Applications */}
            <div className="server-apps__left">
              <p className="server-apps__eyebrow">TYPICAL APPLICATIONS</p>
              <h2 id="server-apps-title" className="server-apps__title">
                Where this platform earns its rack space.
              </h2>
              <p className="server-apps__desc">
                Dual-socket compute, deep memory, and flexible NVMe storage suit workloads that scale unpredictably.
              </p>

              <div className="server-apps__list">
                {applicationsData.map((item) => (
                  <div key={item.num} className="server-apps__item">
                    <span className="server-apps__item-num">{item.num}</span>
                    <div className="server-apps__item-body">
                      <h3 className="server-apps__item-title">{item.title}</h3>
                      <p className="server-apps__item-subtext">{item.subtext}</p>
                    </div>
                    <span className="server-apps__item-badge">{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Operating Environment */}
            <div className="server-apps__right">
              <p className="server-apps__eyebrow">OPERATING ENVIRONMENT</p>
              <h2 className="server-apps__title">
                Compliance &amp; environmental tolerances.
              </h2>

              <div className="server-apps__env-card">
                {environmentData.map((env, idx) => (
                  <div key={idx} className="server-apps__env-row">
                    <span className="server-apps__env-label">{env.label}</span>
                    <span className="server-apps__env-value">{env.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: DOWNLOADS & RESOURCES (WHITE & RED THEME) */}
      <section
        ref={resourcesRef}
        className={`server-resources ${resourcesVisible ? 'is-visible server-resources--visible' : ''}`}
        aria-labelledby="server-resources-title"
      >
        <div className="server-resources__container">
          <div className="server-resources__header">
            <p className="server-resources__eyebrow">07 · RESOURCE HUB</p>
            <h2 id="server-resources-title" className="server-resources__title">
              Documentation, firmware, and quick-starts
            </h2>
          </div>

          <div className="server-resources__grid">
            {resourcesData.map((res) => (
              <div key={res.id} className="server-resources__card">
                <div className="server-resources__card-top">
                  <div className="server-resources__icon-box">
                    {res.iconType === 'document' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    )}
                    {res.iconType === 'book' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    )}
                    {res.iconType === 'rocket' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      </svg>
                    )}
                    {res.iconType === 'chip' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" />
                        <line x1="9" y1="1" x2="9" y2="4" />
                        <line x1="15" y1="1" x2="15" y2="4" />
                        <line x1="9" y1="20" x2="9" y2="23" />
                        <line x1="15" y1="20" x2="15" y2="23" />
                        <line x1="20" y1="9" x2="23" y2="9" />
                        <line x1="20" y1="15" x2="23" y2="15" />
                        <line x1="1" y1="9" x2="4" y2="9" />
                        <line x1="1" y1="15" x2="4" y2="15" />
                      </svg>
                    )}
                  </div>
                  <a
                    href={res.link}
                    className="server-resources__download-btn"
                    aria-label={`Download ${res.title}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
                <div className="server-resources__card-body">
                  <h3 className="server-resources__item-title">{res.title}</h3>
                  <p className="server-resources__item-desc">{res.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: WHY CHOOSE THIS PLATFORM */}
      <section
        ref={whyRef}
        className={`server-why ${whyVisible ? 'is-visible' : ''}`}
        aria-labelledby="server-why-title"
      >
        <div className="server-why__container">
          <div className="server-why__header">
            <p className="server-why__eyebrow">WHY CHOOSE THIS PLATFORM</p>
            <h2 id="server-why-title" className="server-why__title">
              Built for the workloads that don’t get a second attempt.
            </h2>
          </div>

          <div className="server-why__list">
            {whyFeatures.map((item) => (
              <div className="server-why__item" key={item.num}>
                <div className="server-why__num">{item.num}</div>
                <div className="server-why__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: EXPLORE OTHER SERVER MODELS */}
      <section
        ref={modelsRef}
        className={`server-models ${modelsVisible ? 'is-visible server-models--visible' : ''}`}
        aria-labelledby="server-models-title"
      >
        <div className="server-models__container">
          <div className="server-models__header">
            <div className="server-models__eyebrow-wrap">
              <span className="server-models__line" />
              <span className="server-models__eyebrow">EXPLORE MORE</span>
              <span className="server-models__line" />
            </div>
            <h2 id="server-models-title" className="server-models__title">
              Explore Our <span className="server-models__title-red">Other Server Models</span>
            </h2>
            <p className="server-models__subtitle">
              Engineered for modern workloads. Purpose-built configurations to power every stage of your growth.
            </p>
          </div>

          <div className="server-models__grid">
            {serverModelsData.map((item, idx) => (
              <div className="server-models__card" key={idx}>
                <div className="server-models__card-top-bar" />
                <div className="server-models__card-header">
                  <div className="server-models__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="7" rx="2" />
                      <rect x="2" y="13" width="20" height="7" rx="2" />
                      <line x1="6" y1="7.5" x2="6.01" y2="7.5" strokeWidth="3" />
                      <line x1="6" y1="16.5" x2="6.01" y2="16.5" strokeWidth="3" />
                    </svg>
                  </div>
                  <h3 className="server-models__card-title">{item.title}</h3>
                </div>

                <div className="server-models__divider" />

                <p className="server-models__card-desc">{item.desc}</p>

                <div className="server-models__img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="server-models__img"
                  />
                </div>

                <div className="server-models__card-footer">
                  <button
                    type="button"
                    className={`server-models__btn ${comingSoonCard === idx ? 'server-models__btn--coming-soon' : ''}`}
                    onClick={(e) => handleComingSoon(idx, e)}
                  >
                    {comingSoonCard === idx ? (
                      <span className="server-models__coming-soon-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Coming Soon
                      </span>
                    ) : (
                      <>
                        <span>View Details</span>
                        <span className="server-models__btn-arrow">→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: ORDERING INFORMATION & REFERENCE SHEET (WHITE THEME) */}
      <section
        ref={orderingRef}
        className={`server-ordering ${orderingVisible ? 'is-visible server-ordering--visible' : ''}`}
        aria-labelledby="server-ordering-title"
      >
        <div className="server-ordering__container">
          <div className="server-ordering__grid">
            {/* Left Column: CTA */}
            <div className="server-ordering__left">
              <p className="server-ordering__eyebrow">ORDERING INFORMATION</p>
              <h2 id="server-ordering-title" className="server-ordering__title">
                Ready to spec a configuration?
              </h2>
              <p className="server-ordering__desc">
                Our engineering team will help you match drive bay layout, memory configuration, and PSU redundancy to your deployment.
              </p>

              <div className="server-ordering__actions">
                <Link to="/contact" className="server-ordering__btn-primary">
                  Contact Us
                </Link>
                <Link
                  to="/#home"
                  className="server-ordering__btn-secondary"
                >
                  <span>Talk to Our Engineer</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Reference Sheet */}
            <div className="server-ordering__right">
              <div className="server-ordering__card">
                <div className="server-ordering__card-header">
                  <span className="server-ordering__sheet-title">ORDER REFERENCE SHEET</span>
                  <div className="server-ordering__live-indicator">
                    <span className="server-ordering__dot"></span>
                    <span>LIVE</span>
                  </div>
                </div>

                <div className="server-ordering__card-body">
                  {orderSheetData.map((item, idx) => (
                    <div key={idx} className="server-ordering__row">
                      <span className="server-ordering__label">{item.label}</span>
                      <span className="server-ordering__value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
