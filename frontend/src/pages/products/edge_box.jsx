import React, { useEffect } from 'react';
import edgeBoxProductImage from '../../assets/images/edge/edge_box_small.webp';
import edgeBoxProImage from '../../assets/images/edge/edge_box_pro.webp';
import edgeBoxFlexImage from '../../assets/images/edge/edge_box_flex.webp';
import edgeBoxUltraImage from '../../assets/images/edge/edge_box_ultra.webp';
import airportsCardImage from '../../assets/images/edge-box/airports-use-case.webp';
import citiesCardImage from '../../assets/images/edge-box/cities-use-case.webp';
import hospitalsCardImage from '../../assets/images/edge-box/hospitals-use-case.webp';
import retailCardImage from '../../assets/images/edge-box/retail-use-case.webp';
import agritechCardImage from '../../assets/images/edge-box/agritech-use-case.webp';
import cinemasCardImage from '../../assets/images/edge-box/cinemas-use-case.webp';
import venuesCardImage from '../../assets/images/edge-box/venues-use-case.webp';
import manufacturingCardImage from '../../assets/images/edge-box/manufacturing-use-case.webp';
import educationCardImage from '../../assets/images/edge-box/education-use-case.webp';
import '../../assets/css/edge_box.css';

const TICKER_ITEMS = [
  '285H SOC — INTEL® CORE™ ULTRA SERIES 2',
  '99 TOPS PLATFORM PEAK',
  '96GB DDR5 MAX',
  '2× PCIE 4.0 NVME',
  '1GbE + 2.5GbE LAN',
  'WI-FI 7 / BT 5.4',
  '8K VISUAL COMPUTING',
  '19–28V WIDE DC INPUT',
  '24/7 INDUSTRIAL RELIABILITY',
  'SMALL FORM FACTOR',
];

const OVERVIEW_STATS = [
  ['99', 'Platform peak TOPS'],
  ['96GB', 'Max DDR5 memory'],
  ['2×', 'PCIe 4.0 NVMe slots'],
  ['8K', 'Display output'],
  ['24/7', 'Rated duty cycle'],
  ['19–28V', 'DC input range'],
];

const FEATURE_CARDS = [
  {
    icon: 'processor',
    title: 'Next-gen processing',
    description: 'Intel® Core™ Ultra 9 285H SoC delivers desktop-class multitasking headroom in an embedded footprint.',
  },
  {
    icon: 'ai',
    title: 'AI-native software',
    description: 'A dedicated NPU handles inference workloads locally, at low power, without occupying CPU cycles.',
  },
  {
    icon: 'network',
    title: 'Hyper connectivity',
    description: '1× 1GbE plus 1× 2.5GbE LAN for redundant uplinks, or isolated internal and external networks.',
  },
  {
    icon: 'wireless',
    title: 'Advanced wireless',
    description: 'Integrated Wi-Fi 7 and Bluetooth 5.4 keep untethered deployments fast and low-latency.',
  },
  {
    icon: 'display',
    title: 'Visual powerhouse',
    description: 'Intel® Arc™ integrated graphics drives up to 8K resolution across multiple simultaneous displays.',
  },
];

const SPECIFICATIONS = [
  {
    icon: 'processor',
    label: 'System on Chip',
    value: <>Intel® Core™ Ultra Series 2 <strong>285H</strong> SoC with Intel® AI Boost NPU and Intel® Arc™ 140T iGPU — <strong>99 TOPS</strong> platform peak</>,
  },
  {
    icon: 'memory',
    label: 'Memory',
    value: <>Dual-channel <strong>DDR5-5600/6400MHz</strong>, up to <strong>96GB</strong> (48GB per DIMM × 2)</>,
  },
  {
    icon: 'storage',
    label: 'Storage',
    value: <><strong>2×</strong> M.2 Key M (2242 / 2280 / 22110) — PCIe 4.0 NVMe SSD slots</>,
  },
  {
    icon: 'formFactor',
    label: 'Form Factor',
    value: <>Small Form Factor (SFF) — cabinet, panel, and DIN-adjacent mounting</>,
  },
  {
    icon: 'power',
    label: 'Power',
    value: <><strong>19V – 28V</strong> wide-range DC adapter input</>,
  },
  {
    icon: 'network',
    label: 'Networking',
    value: <><strong>1× 1GbE</strong> + <strong>1× 2.5GbE</strong> LAN</>,
  },
  {
    icon: 'wireless',
    label: 'Wireless',
    value: <><strong>Wi-Fi 7</strong> &amp; <strong>Bluetooth 5.4</strong></>,
  },
  {
    icon: 'display',
    label: 'Display',
    value: <>Intel® Arc™ graphics — up to <strong>4K / 8K</strong> across HDMI, DisplayPort &amp; USB-C</>,
  },
  {
    icon: 'layers',
    label: 'OS Support',
    value: <><strong>Windows 11</strong> &amp; major <strong>Linux</strong> distributions</>,
  },
];

const IO_PORTS = [
  ['usbA', 'USB-A Port'],
  ['usbC', 'Thunderbolt / USB-C'],
  ['displayPort', 'DisplayPort'],
  ['audio', 'Audio Jack'],
  ['hdmi', 'HDMI Port'],
  ['powerButton', 'Power Button'],
];

const ADVANTAGES = [
  {
    icon: 'clock',
    title: 'Low-latency edge AI',
    description: 'Workloads process locally for instant decision-making. Removing the round trip to the cloud improves both response time and reliability for mission-critical applications.',
    tag: 'Latency',
  },
  {
    icon: 'shield',
    title: 'Bandwidth efficiency',
    description: 'High-resolution video and dense sensor data are processed on-device; only actionable results are transmitted upstream, cutting uplink cost significantly.',
    tag: 'Uplink cost',
  },
  {
    icon: 'lock',
    title: 'Data privacy & security',
    description: 'Sensitive information stays on-premise for total data sovereignty — built for healthcare and finance environments with strict regulatory requirements.',
    tag: 'Sovereignty',
  },
  {
    icon: 'offline',
    title: 'Reliable offline operation',
    description: "Operations don't stop when the network does. Zeveric keeps running through connectivity outages, buffering and syncing once the link returns.",
    tag: 'Continuity',
  },
];

const USE_CASES = [
  {
    icon: 'plane',
    image: airportsCardImage,
    tag: 'AVIATION',
    title: 'Airports',
    description: 'Predictive Queue SLA & Flight Operations with real-time passenger-flow insights for better staffing and faster terminal turnaround.',
  },
  {
    icon: 'city',
    image: citiesCardImage,
    tag: 'SMART CITIES',
    title: 'Cities',
    description: 'Corridor Congestion & Enforcement analytics that improve traffic flow, incident response, and road-user safety.',
  },
  {
    icon: 'healthcare',
    image: hospitalsCardImage,
    tag: 'HEALTHCARE',
    title: 'Hospitals',
    description: 'ED Flow & Bed Turnover visibility that helps care teams reduce wait times and coordinate patient movement efficiently.',
  },
  {
    icon: 'retail',
    image: retailCardImage,
    tag: 'COMMERCE',
    title: 'Retail',
    description: 'On-Shelf Availability & Billing Leakage detection for faster replenishment, accurate checkout, and stronger revenue protection.',
  },
  {
    icon: 'leaf',
    image: agritechCardImage,
    tag: 'AGRICULTURE',
    title: 'Agritech',
    description: 'ZMD Field Kit & Soil Analytics deliver local crop intelligence for precise irrigation, healthier fields, and resilient decisions.',
  },
  {
    icon: 'media',
    image: cinemasCardImage,
    tag: 'ENTERTAINMENT',
    title: 'Cinemas',
    description: 'Interval Readiness & Turnaround Clock monitoring helps teams prepare every auditorium accurately and on schedule.',
  },
  {
    icon: 'gate',
    image: venuesCardImage,
    tag: 'VENUES',
    title: 'Venues & Campuses',
    description: 'Gate & Attraction Metering provides live occupancy intelligence for safer entry, shorter queues, and smarter operations.',
  },
  {
    icon: 'industrial',
    image: manufacturingCardImage,
    tag: 'INDUSTRIAL',
    title: 'Manufacturing',
    description: 'Zone Safety & Stoppage Capture detects unsafe activity and production interruptions close to the line in real time.',
  },
  {
    icon: 'education',
    image: educationCardImage,
    tag: 'ACADEMIC',
    title: 'Education',
    description: 'Lecture Capture & Course TA tools support reliable recording, searchable learning content, and responsive student assistance.',
  },
];

const OTHER_EDGE_BOX_MODELS = [
  {
    badge: 'PERFORMANCE',
    category: 'POWERED',
    name: 'Edge Box Pro',
    image: edgeBoxProImage,
    description: 'Built for demanding AI workloads that need more processing headroom in a compact edge system.',
  },
  {
    badge: 'BALANCED',
    category: 'VALUE',
    name: 'Edge Box Flex',
    image: edgeBoxFlexImage,
    description: 'A balanced edge platform for efficient deployments, everyday automation, and scalable growth.',
  },
  {
    badge: 'HIGH IMPACT',
    category: 'ULTRA RUGGED',
    name: 'Edge Box Ultra',
    image: edgeBoxUltraImage,
    description: 'Engineered for extreme environments and mission-critical workloads that demand rugged reliability.',
  },
];

const ICON_PATHS = {
  processor: <><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>,
  ai: <><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>,
  network: <><rect x="3" y="7" width="18" height="4" rx="1" /><path d="M6 11v3M12 11v5M18 11v3" /><circle cx="6" cy="16" r="1.4" /><circle cx="12" cy="18" r="1.4" /><circle cx="18" cy="16" r="1.4" /></>,
  wireless: <><path d="M4 17a11 11 0 0 1 16 0M7.5 13.5a6.5 6.5 0 0 1 9 0M11 10a2 2 0 0 1 2 0" /><circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" /></>,
  display: <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></>,
  memory: <><rect x="4" y="8" width="16" height="8" rx="1" /><path d="M8 8v8M12 8v8M16 8v8" /></>,
  storage: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 7h2" /></>,
  formFactor: <rect x="4" y="4" width="16" height="16" rx="2" />,
  power: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  layers: <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />,
  usbA: <rect x="4" y="9" width="14" height="6" rx="1" />,
  usbC: <rect x="4" y="6" width="10" height="12" rx="5" />,
  displayPort: <rect x="4" y="9" width="16" height="6" rx="1" />,
  audio: <><path d="M4 10h4l3-3v10l-3-3H4z" /><path d="M15 9a3 3 0 0 1 0 6M18 6a7 7 0 0 1 0 12" /></>,
  hdmi: <rect x="3" y="6" width="18" height="12" rx="1" />,
  powerButton: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  shield: <><path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6l-9-4Z" /><path d="M9 12l2 2 4-4" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  offline: <><path d="M4 17a11 11 0 0 1 16 0M7.5 13.5a6.5 6.5 0 0 1 9 0M11 10a2 2 0 0 1 2 0" /><path d="m3 3 18 18" /></>,
  car: <><path d="m3 13 2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5" /><rect x="2" y="13" width="20" height="5" rx="1.5" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
  healthcare: <path d="M3 12h4l2 6 4-14 2 8h6" />,
  retail: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6" /></>,
  industrial: <path d="m14 4-2 2 4 4-6 6-4-4-2 2 6 6 8-8-4-4 2-2z" />,
  media: <><rect x="3" y="5" width="18" height="12" rx="1.5" /><path d="m10 9 5 3-5 3z" /></>,
  plane: <><path d="M22 2 9.5 14.5M22 2l-7 19-4-8-8-4 19-7Z" /></>,
  city: <><path d="M4 21V9l5-3v15M9 21V3l7 3v15M16 21v-9l4-2v11M2 21h20" /><path d="M12 7h1M12 11h1M12 15h1" /></>,
  leaf: <><path d="M20 4c-7 0-13 3-13 9a6 6 0 0 0 6 6c6 0 7-8 7-15Z" /><path d="M4 21c2-6 6-10 12-13" /></>,
  gate: <><path d="M4 21V5h16v16M4 9h16M8 9v12M16 9v12" /><path d="M10.5 15h3" /></>,
  education: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5M22 9v7" /></>,
};

function LineIcon({ name, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

function CornerBrackets() {
  return <><span className="edgebox-bracket-tr" /><span className="edgebox-bracket-br" /></>;
}

function SectionHeading({ title, description, className = '' }) {
  return (
    <div className={`edgebox-section-head ${className}`.trim()}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function DeviceSchematic() {
  return (
    <div className="edgebox-schematic edgebox-bracketed edgebox-reveal is-visible">
      <CornerBrackets />
      <div className="edgebox-schematic-label">
        <span>Fig. 01 — Product Front Panel</span>
        <span className="edgebox-schematic-model">ZVR-285H / SFF</span>
      </div>

      <div className="edgebox-product-visual">
        <img
          src={edgeBoxProductImage}
          alt="ZMD Edge Box front panel"
          className="edgebox-product-image"
        />
      </div>

      <svg className="edgebox-schematic-svg" viewBox="0 0 520 340" role="img" aria-label="Line diagram of the Zeveric Edge Device front panel showing power, USB ports, and ventilated chassis">
        <rect x="150" y="70" width="220" height="200" rx="4" fill="none" stroke="#14171C" strokeWidth="1.4" />
        <line x1="150" y1="86" x2="370" y2="86" stroke="#D9DCE1" />
        <g stroke="#BFC3CA">
          <line x1="320" y1="96" x2="320" y2="262" />
          <line x1="330" y1="96" x2="330" y2="262" />
          <line x1="340" y1="96" x2="340" y2="262" />
          <line x1="350" y1="96" x2="350" y2="262" />
          <line x1="360" y1="96" x2="360" y2="262" />
        </g>
        <rect x="316" y="92" width="50" height="174" fill="none" stroke="#5B6270" />
        <circle cx="184" cy="120" r="7" fill="none" stroke="#D71A21" strokeWidth="1.6" />
        <circle cx="184" cy="120" r="2" fill="#D71A21" />
        <rect x="174" y="158" width="20" height="9" rx="1.5" fill="none" stroke="#14171C" strokeWidth="1.3" />
        <rect x="176" y="188" width="16" height="16" rx="6" fill="none" stroke="#14171C" strokeWidth="1.3" />
        <line x1="160" y1="272" x2="190" y2="272" stroke="#14171C" strokeWidth="2" />
        <line x1="330" y1="272" x2="360" y2="272" stroke="#14171C" strokeWidth="2" />

        <g stroke="#8A909C" strokeDasharray="3 3">
          <line x1="184" y1="113" x2="184" y2="40" />
          <line x1="196" y1="162" x2="70" y2="162" />
          <line x1="196" y1="196" x2="70" y2="230" />
          <line x1="340" y1="92" x2="400" y2="52" />
          <line x1="370" y1="180" x2="440" y2="180" />
        </g>
        <g fill="#8A909C">
          <circle cx="184" cy="40" r="2" />
          <circle cx="70" cy="162" r="2" />
          <circle cx="70" cy="230" r="2" />
          <circle cx="400" cy="52" r="2" />
          <circle cx="440" cy="180" r="2" />
        </g>

        <g fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="#5B6270">
          <text x="60" y="36">SYSTEM POWER</text>
          <text x="8" y="150">USB-A</text>
          <text x="8" y="220">USB-C</text>
          <text x="404" y="48">VENTILATED</text>
          <text x="444" y="177">SMALL FORM</text>
        </g>
        <g fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#8A909C">
          <text x="8" y="163">3.2 GEN PORT</text>
          <text x="8" y="233">DATA / THUNDERBOLT</text>
          <text x="404" y="61">CHASSIS</text>
          <text x="444" y="190">FACTOR CHASSIS</text>
        </g>
        <line x1="150" y1="300" x2="370" y2="300" stroke="#D9DCE1" />
        <text x="150" y="316" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#8A909C">SCALE — INDICATIVE, NOT TO SPEC</text>
      </svg>

      <div className="edgebox-schematic-foot">
        <span>ZMD EDGE COMPUTING</span>
        <span>PRODUCT REFERENCE</span>
        <span>FRONT PANEL</span>
      </div>
    </div>
  );
}

export default function EdgeBoxPage() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('.edgebox-page .edgebox-reveal:not(.is-visible)'));

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="edgebox-page">
      <section className="edgebox-hero">
        <div className="edgebox-wrap">
          <div className="edgebox-hero-grid">
            <div className="edgebox-hero-copy">
              <p className="edgebox-eyebrow">Introducing</p>
              <h1 className="edgebox-reveal is-visible">
                <span className="edgebox-title-primary">
                  <span className="edgebox-hero-word">ZEVERIC</span>
                </span>
                <span className="edgebox-title-secondary">
                  <span className="edgebox-hero-word">EDGE</span>{' '}
                  <span className="edgebox-hero-word">DEVICE</span>
                </span>
                <span className="edgebox-model-line">
                  <span className="edgebox-hero-word">Model</span>{' '}
                  <span className="edgebox-hero-word">ZVR-285H</span>{' '}
                  <span className="edgebox-hero-word">·</span>{' '}
                  <span className="edgebox-hero-word">AI-Native</span>{' '}
                  <span className="edgebox-hero-word">Edge</span>{' '}
                  <span className="edgebox-hero-word">system</span>
                </span>
              </h1>
              <p className="edgebox-hero-description">
                A small-form-factor edge computer built on Intel® Core™ Ultra Series 2, engineered by ZMD for manufacturers and integrators who need on-premise AI inference without the footprint, power draw, or fragility of a rack server.
              </p>

              <div className="edgebox-actions">
                <a href="#contact" className="edgebox-button edgebox-button-primary">Request Datasheet</a>
                <a href="#specs" className="edgebox-button edgebox-button-ghost">View Full Specifications</a>
              </div>
            </div>

            <DeviceSchematic />
          </div>

          <div className="edgebox-badge-row" aria-label="Key Edge Box specifications">
            <span className="edgebox-chip"><span className="edgebox-status-dot" />Intel® Core™ Ultra Series 2</span>
            <span className="edgebox-chip"><strong>99</strong> TOPS platform peak</span>
            <span className="edgebox-chip">24/7 industrial duty cycle</span>
          </div>
        </div>

        <div className="edgebox-ticker" aria-label="Key product specifications">
          <div className="edgebox-ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
              <span className="edgebox-ticker-item" key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="edgebox-section">
        <div className="edgebox-wrap">
          <SectionHeading
            title="Built to sit where the data happens"
            description="A platform brief for OEM partners, systems integrators, and industrial buyers evaluating edge AI compute."
            className="edgebox-overview-head edgebox-reveal"
          />

          <div className="edgebox-overview-grid">
            <div className="edgebox-overview-copy edgebox-reveal">
              <p>The Zeveric Edge Device moves AI inference off the network and onto the shop floor, the vehicle, the clinic, or the store. It pairs an Intel® Core™ Ultra Series 2 SoC with a dedicated NPU in a chassis small enough to mount inside a cabinet or panel, and rugged enough to run unattended.</p>
              <p>Where a conventional edge server trades size for expansion slots, Zeveric trades slots for density — dual NVMe, dual-channel DDR5, and full 8K-capable graphics inside a small form factor enclosure, powered from a wide-range DC input rather than mains AC.</p>
              <p>It is designed as a component: a compute brick that ODM and integration partners can specify into their own enclosures, kiosks, vehicles, or racks with minimal re-engineering.</p>
            </div>

            <div className="edgebox-stat-grid edgebox-reveal">
              {OVERVIEW_STATS.map(([value, label]) => (
                <div className="edgebox-stat" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="edgebox-section edgebox-section-alt">
        <div className="edgebox-wrap">
          <SectionHeading
            title="Edge Capabilities"
            description="Five characteristics that define what Zeveric is engineered to do."
            className="edgebox-capabilities-head edgebox-reveal"
          />

          <div className="edgebox-feature-grid edgebox-capabilities-grid edgebox-reveal">
            {FEATURE_CARDS.map((feature) => (
              <article className="edgebox-feature-card edgebox-bracketed" key={feature.title}>
                <CornerBrackets />
                <LineIcon name={feature.icon} className="edgebox-feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="edgebox-section">
        <div className="edgebox-wrap">
          <SectionHeading
            title="Specifications"
            description="Engineering reference. Final configuration subject to validation per deployment."
            className="edgebox-specs-head edgebox-reveal"
          />

          <div className="edgebox-specs-shell edgebox-specs-console edgebox-reveal">
            {SPECIFICATIONS.map((specification) => (
              <div className="edgebox-spec-row" key={specification.label}>
                <div className="edgebox-spec-key">
                  <LineIcon name={specification.icon} />
                  {specification.label}
                </div>
                <div className="edgebox-spec-value">{specification.value}</div>
              </div>
            ))}
            <p className="edgebox-spec-note">* Final specifications subject to configuration and validation. Contact ZMD engineering for signed-off datasheet and BOM.</p>
          </div>

          <div className="edgebox-io-strip edgebox-specs-io edgebox-reveal">
            {IO_PORTS.map(([icon, label]) => (
              <div className="edgebox-io-item" key={label}>
                <LineIcon name={icon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="edgebox-section edgebox-section-alt">
        <div className="edgebox-wrap">
          <SectionHeading
            title="The Edge Advantage"
            description="Why the inference happens here, on the device, and not somewhere upstream."
            className="edgebox-advantage-head edgebox-reveal"
          />

          <div className="edgebox-advantage-list">
            {ADVANTAGES.map((advantage) => (
              <article className="edgebox-advantage-row edgebox-advantage-animated edgebox-reveal" key={advantage.title}>
                <LineIcon name={advantage.icon} className="edgebox-advantage-icon" />
                <div>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
                <span className="edgebox-advantage-tag">{advantage.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="edgebox-section">
        <div className="edgebox-wrap">
          <SectionHeading
            title="ZMD Edge AI solution"
            description="Instant sensor and video processing for safer systems and faster operations, across sectors."
            className="edgebox-solutions-head edgebox-reveal"
          />

          <div className="edgebox-use-case-grid edgebox-solutions-grid edgebox-reveal">
            {USE_CASES.map((useCase) => (
              <article className="edgebox-use-case edgebox-reveal" key={useCase.title}>
                <img
                  src={useCase.image}
                  alt=""
                  className="edgebox-use-case-art"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <div className="edgebox-use-case-top">
                  <LineIcon name={useCase.icon} className="edgebox-use-case-icon" />
                  <span>{useCase.tag}</span>
                </div>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="edgebox-platform-section">
        <div className="edgebox-wrap">
          <div className="edgebox-platform-band edgebox-platform-animated edgebox-reveal">
            <div>
              <h2>Boots your platform of choice</h2>
              <p>Zeveric ships validated for Windows 11 and major Linux distributions, so it drops into existing OT and IT fleets without a re-qualification cycle.</p>
            </div>
            <div className="edgebox-os-pills">
              <span className="edgebox-os-pill">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.5-1.2L21 3v8.5h-9.5V4.3ZM3 12.5h7.5v7L3 18.4v-5.9Zm8.5 0H21V21l-9.5-1.5v-7Z" /></svg>
                Windows 11
              </span>
              <span className="edgebox-os-pill">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1.4 1.8 1.8 3.4 1.2 5-1 .1-1.8.9-1.8 1.9 0 .5.2 1 .5 1.3-2 .6-3.4 2.4-3.4 4.5 0 .8.2 1.5.5 2.1-1 .3-1.7 1.2-1.7 2.2 0 1.4 1.5 2.5 4.2 2.9-.3-.4-.5-.9-.5-1.4 0-1 .8-1.9 1.9-2 1 .1 1.9 1 1.9 2 0 .5-.2 1-.5 1.4 2.7-.4 4.2-1.5 4.2-2.9 0-1-.7-1.9-1.7-2.2.3-.6.5-1.3.5-2.1 0-2.1-1.4-3.9-3.4-4.5.3-.3.5-.8.5-1.3 0-1-.8-1.8-1.8-1.9-.6-1.6-.2-3.2 1.2-5-1 .3-2 1-2.7 2-.7-1-1.7-1.7-2.7-2Z" /></svg>
                Linux (Ubuntu, Debian, Yocto)
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="edgebox-models-section" aria-labelledby="edgebox-models-title">
        <div className="edgebox-wrap">
          <header className="edgebox-models-head edgebox-reveal">
            <span className="edgebox-models-eyebrow">Explore more</span>
            <h2 id="edgebox-models-title">
              Explore Our <span>Other Edge Box Models</span>
            </h2>
            <p>Purpose-built configurations to power every stage of your edge AI growth.</p>
          </header>

          <div className="edgebox-models-grid">
            {OTHER_EDGE_BOX_MODELS.map((model) => (
              <article className="edgebox-model-card edgebox-reveal" key={model.name}>
                <div className="edgebox-model-card-top">
                  <span className="edgebox-model-badge">
                    <span aria-hidden="true">⚡</span> {model.badge}
                  </span>
                  <span className="edgebox-model-category">{model.category}</span>
                  <h3>{model.name}</h3>
                </div>

                <p className="edgebox-model-description">{model.description}</p>

                <div className="edgebox-model-image-wrap">
                  <img
                    src={model.image}
                    alt={`${model.name} edge computing system`}
                    className="edgebox-model-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <a className="edgebox-model-link" href="/edge-ai">
                  View Details <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="edgebox-cta" id="contact">
        <div className="edgebox-wrap edgebox-cta-inner edgebox-cta-animated edgebox-reveal">
          <div>
            <h2>Specify Zeveric into your next platform.</h2>
            <p>Request the signed datasheet, mechanical drawings, or a sample unit for evaluation.</p>
          </div>
          <div className="edgebox-actions">
            <a href="mailto:sales@zmd.tech" className="edgebox-button edgebox-button-light">Email Sales</a>
            <a href="mailto:sales@zmd.tech?subject=Zeveric%20ZVR-285H%20Datasheet%20Request" className="edgebox-button edgebox-button-outline-light">Request Datasheet (PDF)</a>
          </div>
        </div>
      </section>
    </div>
  );
}
