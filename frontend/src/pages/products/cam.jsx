import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../../assets/css/cam.css';
import dcamImages from '../../assets/images/cam/dcamImages';
import ContactModal from '../../components/ContactModal';

const cameraModels = [
  {
    number: '01',
    name: 'Dual Lens',
    type: 'PANORAMIC COVERAGE',
    description: 'Wide, continuous visibility for entrances, perimeters, and open areas.',
    images: dcamImages.dualLensAngles,
    features: [
      'Dual 2MP imaging sensors',
      '180° panoramic coverage',
      '14 on-board Edge AI models',
      'IP67 and IK10 protection',
      'H.265+ video compression',
    ],
  },
  {
    number: '02',
    name: 'Single Lens',
    type: 'PRECISION VIEW',
    description: 'Focused AI detection for the places that need a closer, clearer view.',
    images: dcamImages.singleLensAngles,
    features: [
      'Focused scene coverage',
      'Edge AI event detection',
      'Day and night monitoring',
      'Compact dome housing',
      'Efficient video streaming',
    ],
  },
  {
    number: '03',
    name: 'Bullet',
    type: 'LONG-RANGE VISION',
    description: 'A directional profile for perimeter monitoring and extended sightlines.',
    images: dcamImages.bulletAngles,
    features: [
      'Long-range directional coverage',
      'Perimeter-ready imaging',
      'Edge AI event detection',
      'Day and night monitoring',
      'Flexible wall mounting',
    ],
  },
  {
    number: '04',
    name: 'Head-Mount Cam',
    type: 'WEARABLE AI VISION',
    description: 'A compact, hands-free camera for mobile teams, frontline operations, and real-time first-person visibility.',
    images: dcamImages.headMountAngles,
    features: [
      'Hands-free first-person capture',
      'Adjustable wearable fit',
      'Mobile Edge AI support',
      'Real-time video visibility',
      'Compact wearable form',
    ],
    status: 'MOBILE AI READY',
  },
];

const fovProfiles = {
  90: {
    image: dcamImages.camera90Deg,
    title: 'Focused standard view',
    description: 'Targeted coverage for entrances, corridors, and controlled access points.',
    vertical: '45°',
    sensorValue: '1×',
    sensorLabel: 'STANDARD CAM',
  },
  110: {
    image: dcamImages.camera110Deg,
    title: 'Expanded single-lens view',
    description: 'A wider scene captures more of the approach with fewer edge blind spots.',
    vertical: '50°',
    sensorValue: '1×',
    sensorLabel: 'SINGLE SENSOR',
  },
  180: {
    image: dcamImages.camera180Deg,
    title: 'Panoramic dual-lens view',
    description: 'Full-width visibility covers the complete frontage from one camera position.',
    vertical: '50°',
    sensorValue: '2×',
    sensorLabel: 'DUAL SENSORS',
  },
};

const durabilityProfiles = {
  water: {
    image: dcamImages.waterproofTest,
    alt: 'ZMD dome camera operating outdoors in heavy rain',
    testLabel: 'WATER INGRESS TEST',
    title: 'Sealed for demanding weather',
    description: 'A protected enclosure helps keep the camera dependable through rain, spray, and exposed installations.',
    badge: 'IP67 WEATHER PROTECTION',
  },
  impact: {
    image: dcamImages.impactTest,
    alt: 'ZMD dome camera undergoing an impact-resistance test',
    testLabel: 'VANDAL RESISTANCE TEST',
    title: 'Reinforced against impact',
    description: 'The metal housing and protected dome are engineered for exposed, high-contact environments.',
    badge: 'IK10 IMPACT RESISTANCE',
  },
  temp: {
    image: dcamImages.thermalTest,
    alt: 'ZMD dome camera undergoing environmental temperature testing',
    testLabel: 'THERMAL CHAMBER TEST',
    title: 'Tested across temperature extremes',
    description: 'Environmental validation supports reliable camera operation across demanding temperature conditions.',
    badge: '0 TO 80°C OPERATING RANGE',
  },
};

export default function CameraPage() {
  const [activeVariant, setActiveVariant] = useState('dual-lens');
  const [activeModelImages, setActiveModelImages] = useState({
    '01': 0,
    '02': 0,
    '03': 0,
    '04': 0,
  });
  const [previousHero, setPreviousHero] = useState(null);
  const previousVariantRef = useRef('dual-lens');
  const [openFaq, setOpenFaq] = useState(-1);
  const [activeAiCategory, setActiveAiCategory] = useState('security');
  const [activeAiSubFeature, setActiveAiSubFeature] = useState('intrusion');
  const [dayNightMode, setDayNightMode] = useState('day');

  const [fovAngle, setFovAngle] = useState(180);
  const [durabilityTest, setDurabilityTest] = useState('water');
  const [compressionMode, setCompressionMode] = useState('h265');
  const [storageUsed, setStorageUsed] = useState(142);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Live Telemetry Simulation Hook for Dynamic NPU AI Feeds
  const [telemetry, setTelemetry] = useState({
    fps: '30.0',
    latency: '3.8',
    count: 34,
    speed: 42,
    conf: 99.4,
    coordsX: 382,
    coordsY: 210,
    faceMatch: 97.8,
    faceId: 'ZMD-0482',
    age: 28,
    genderConf: 96.2,
    heartRate: 72,
    fallAngle: 12,
    ppeScore: 98,
    tempC: 22,
    smokeLevel: 0.03,
    fireProb: 0.01,
    threatLevel: 'LOW',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry({
        fps: (29.8 + Math.random() * 0.4).toFixed(1),
        latency: (3.5 + Math.random() * 0.6).toFixed(1),
        count: Math.floor(32 + Math.random() * 5),
        speed: Math.floor(40 + Math.random() * 6),
        conf: parseFloat((99.1 + Math.random() * 0.8).toFixed(1)),
        coordsX: 365 + Math.floor(Math.random() * 32),
        coordsY: 190 + Math.floor(Math.random() * 34),
        faceMatch: parseFloat((96.5 + Math.random() * 3.0).toFixed(1)),
        faceId: `ZMD-${String(480 + Math.floor(Math.random() * 10)).padStart(4, '0')}`,
        age: 26 + Math.floor(Math.random() * 6),
        genderConf: parseFloat((94.5 + Math.random() * 5.0).toFixed(1)),
        heartRate: 68 + Math.floor(Math.random() * 10),
        fallAngle: Math.floor(8 + Math.random() * 12),
        ppeScore: Math.floor(95 + Math.random() * 5),
        tempC: (21.5 + Math.random() * 2).toFixed(1),
        smokeLevel: parseFloat((0.01 + Math.random() * 0.04).toFixed(2)),
        fireProb: parseFloat((0.005 + Math.random() * 0.02).toFixed(3)),
        threatLevel: Math.random() > 0.7 ? 'ELEVATED' : 'LOW',
      });
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Viewport IntersectionObserver for smooth section entry and exit animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('dcam-section-visible');
          entry.target.classList.remove('dcam-section-hidden');
        } else {
          entry.target.classList.remove('dcam-section-visible');
          entry.target.classList.add('dcam-section-hidden');
        }
      });
    };

    const observerOptions = {
      threshold: 0.06,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll(
      'section:not(.dcam-hero-section), .dcam-why-dark-section, .dcam-contact-v2-section, .dcam-models-section, .dcam-variants-bar'
    );

    sections.forEach((sec) => {
      sec.classList.add('dcam-animated-section');
      observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  // Auto-switch between Dual Lens and Single Lens every 5 seconds
  useEffect(() => {
    // Keep the mobile hero stable; visitors can still switch variants manually.
    if (window.matchMedia('(max-width: 767px)').matches) return undefined;

    const timer = setInterval(() => {
      setActiveVariant((prev) => (prev === 'dual-lens' ? 'single-lens' : 'dual-lens'));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Automatically alternate between the day and night camera views.
  useEffect(() => {
    const timer = setInterval(() => {
      setDayNightMode((previousMode) => (previousMode === 'day' ? 'night' : 'day'));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Automatically step through the available field-of-view profiles.
  useEffect(() => {
    const angles = [90, 110, 180];
    const timer = setInterval(() => {
      setFovAngle((previousAngle) => {
        const currentIndex = angles.indexOf(previousAngle);
        return angles[(currentIndex + 1) % angles.length];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Automatically step through the environmental durability tests.
  useEffect(() => {
    const tests = ['water', 'impact', 'temp'];
    const timer = setInterval(() => {
      setDurabilityTest((previousTest) => {
        const currentIndex = tests.indexOf(previousTest);
        return tests[(currentIndex + 1) % tests.length];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Auto-cycle compression mode every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCompressionMode((prev) => (prev === 'h265' ? 'h264' : 'h265'));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = [
    { id: 'dual-lens', title: 'Dual Lens', tag: 'DOME · 180°' },
    { id: 'single-lens', title: 'Single Lens', tag: 'BULLET · 110°' },
  ];

  const heroContent = useMemo(() => ({
    'dual-lens': {
      tagText: 'ZMD EDGE AI CAMERAS',
      titlePrefix: 'Dual Lens ',
      highlight1: 'AI',
      highlight2: 'Camera',
      subtitle: 'Intelligent vision for modern safety.',
      description: 'A dual-sensor dome camera with on-board Edge AI, 180° panoramic coverage, and IP67/IK10-rated durability. Built to see everything, process it on-site, and act on it instantly.',
      stats: [
        { value: '180°', label: 'FIELD OF VIEW' },
        { value: '14', label: 'AI MODELS ON-BOARD' },
        { value: '8', label: 'CONCURRENT USERS' },
        { value: '1920×1080 / 2MP', label: 'MAX RESOLUTION' },
      ],
      image: dcamImages.dualLens,
      mobileImage: dcamImages.dualLensMobileHero,
      alt: 'Advanced Dual Lens IP Camera',
    },
    'single-lens': {
      tagText: 'ZMD EDGE AI CAMERAS',
      titlePrefix: 'Advanced ',
      highlight1: 'AI',
      highlight2: 'Camera',
      subtitle: 'Focused intelligence for targeted security.',
      description: 'A high-precision 2 MP bullet IP camera featuring on-board Edge AI, 110° field of view, low-light night vision, and IP67 waterproof protection.',
      stats: [
        { value: '110°', label: 'FIELD OF VIEW' },
        { value: '14', label: 'AI MODELS ON-BOARD' },
        { value: '8', label: 'CONCURRENT USERS' },
        { value: '1920×1080 / 2MP', label: 'MAX RESOLUTION' },
      ],
      image: dcamImages.singleLens,
      mobileImage: dcamImages.singleLensMobileHero,
      alt: 'Precision Single Lens IP Camera',
    },
  }), []);

  const currentHero = heroContent[activeVariant] || heroContent['dual-lens'];
  const activeFovProfile = fovProfiles[fovAngle];
  const activeDurabilityProfile = durabilityProfiles[durabilityTest];

  useEffect(() => {
    const previousVariant = previousVariantRef.current;
    if (previousVariant === activeVariant) return undefined;

    setPreviousHero(heroContent[previousVariant]);
    previousVariantRef.current = activeVariant;
    const transitionTimer = setTimeout(() => setPreviousHero(null), 750);
    return () => clearTimeout(transitionTimer);
  }, [activeVariant, heroContent]);

  const faqs = [
    {
      q: 'What is 180° panoramic coverage and how does it work?',
      a: 'The ZMD Dual Lens IP Camera combines two 2MP sensors inside a single rugged dome enclosure. The camera stitches both feeds on-board into a seamless 180° ultra-wide panoramic view with zero blind spots, eliminating the need to deploy multiple fixed cameras.'
    },
    {
      q: 'Does the camera require an external server for Edge AI analytics?',
      a: 'No external server is required for basic AI capabilities. The camera features a built-in Edge AI processor that performs real-time analytics directly on-board, transmitting only relevant event metadata. This drastically reduces bandwidth overhead and server costs.'
    },
    {
      q: 'What local and network storage options are supported?',
      a: 'The camera supports local MicroSD cards up to 512GB for fail-safe local recording. It also integrates seamlessly with enterprise NVRs, NAS systems, and VMS software via standard ONVIF (Profile S/G/T) and RTSP protocols.'
    },
    {
      q: 'Is the camera engineered for harsh outdoor weather and physical sabotage?',
      a: 'Yes. It features IP67 weatherproofing (impervious to heavy rain and dust) and IK10 vandal resistance (built to withstand mechanical impact force). It operates reliably across temperature extremes from 0°C to +80°C.'
    },
    {
      q: 'What cybersecurity features and certifications are included?',
      a: 'Security features include AES-256 video encryption, HTTPS secure communication, signed firmware with trusted boot, and IP/MAC address filtering. The camera is BIS certified, STQC tested, and NDAA compliant.'
    }
  ];

  return (
    <>
      {/* 0. Hero Section - Direct child of main, full viewport width */}
      <section className="dcam-hero-section">
        {/* Kept at section level so each image reaches every edge of the hero. */}
        <div className="dcam-visual-wrapper">
          <div className="dcam-image-space">
            {previousHero && (
              <picture>
                {previousHero.mobileImage && (
                  <source media="(max-width: 767px)" srcSet={previousHero.mobileImage} />
                )}
                <img
                  src={previousHero.image}
                  alt=""
                  aria-hidden="true"
                  className="dcam-hero-img dcam-hero-img-outgoing"
                />
              </picture>
            )}
            <picture key={activeVariant}>
              {currentHero.mobileImage && (
                <source media="(max-width: 767px)" srcSet={currentHero.mobileImage} />
              )}
              <img
                src={currentHero.image}
                alt={currentHero.alt}
                className="dcam-hero-img dcam-hero-img-incoming"
              />
            </picture>
          </div>
        </div>

        <div className="dcam-hero-wrapper" key={activeVariant}>
          {/* Left Column - Hero Content */}
          <div className="dcam-hero-content dcam-hero-fade">
            <div className="dcam-tag-container">
              <span className="dcam-tag-line"></span>
              <span className="dcam-tag-text">{currentHero.tagText}</span>
            </div>

            <h1 className="dcam-hero-title">
              {currentHero.titlePrefix}<span className="dcam-highlight">{currentHero.highlight1}</span><br />
              <span className="dcam-highlight">{currentHero.highlight2}</span>
            </h1>

            <h2 className="dcam-hero-subtitle">
              {currentHero.subtitle}
            </h2>

            <p className="dcam-hero-description">
              {currentHero.description}
            </p>

            <div className="dcam-hero-actions">
              <a href="#datasheet" className="dcam-btn-primary">
                GET DATASHEET <span aria-hidden="true">&rarr;</span>
              </a>
              <a href="#contact" className="dcam-btn-secondary">
                TALK TO SALES <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="dcam-hero-stats-grid">
              {currentHero.stats.map((st, idx) => (
                <div key={idx} className="dcam-hero-stat-item">
                  <span className="dcam-hero-stat-val">{st.value}</span>
                  <span className="dcam-hero-stat-lbl">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Camera Variants Navigation Bar Below Hero */}
      <nav className="dcam-variants-bar" aria-label="Camera Variants">
        <div className="dcam-variants-container">
          {variants.map((v) => {
            const isActive = activeVariant === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVariant(v.id)}
                className={`dcam-variant-card ${isActive ? 'dcam-variant-card-active' : ''}`}
              >
                <span className={`dcam-variant-dot ${isActive ? 'dcam-variant-dot-active' : ''}`} />
                <div className="dcam-variant-info">
                  <span className="dcam-variant-title">{v.title}</span>
                  <span className={`dcam-variant-tag ${isActive ? 'dcam-variant-tag-active' : ''}`}>
                    {v.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="dcam-page-container">
        {/* SECTION 1: KEY FEATURES & ARCHITECTURE */}
        <section className="dcam-section dcam-arch-section" id="features">
          <div className="dcam-section-header">
            <span className="dcam-section-badge">CORE CAPABILITIES</span>
            <h2 className="dcam-section-title">Key Features &amp; Architecture</h2>
            <p className="dcam-section-subtitle">
              Engineered to replace complex multi-camera setups with intelligent continuous 180° visibility.
            </p>
          </div>

          <div className="dcam-arch-blocks-container">
            {/* ARCHITECTURE BLOCK 1: DUAL IR CUT FILTER */}
            <div className="dcam-arch-row dcam-arch-row-normal">
              <div className="dcam-arch-text-col">
                <div className="dcam-tag-container">
                  <span className="dcam-tag-line"></span>
                  <span className="dcam-tag-text">DUAL IR CUT FILTER · 650 &amp; 850NM</span>
                </div>
                <h3 className="dcam-arch-block-title">See everything.<br />Day or night.</h3>
                <p className="dcam-arch-block-desc">
                  High-power IR illumination and a dual IR-cut filter switch the sensor automatically as light fades, delivering full color by day and 0 Lux infrared vision at night.
                </p>

                {/* Day / Night Pill Buttons */}
                <div className="dcam-feat-btns">
                  <button
                    type="button"
                    className={`dcam-feat-btn ${dayNightMode === 'day' ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setDayNightMode('day')}
                    aria-pressed={dayNightMode === 'day'}
                    aria-controls="dcam-daynight-viewer"
                  >
                    <span className="dcam-mode-icon dcam-mode-icon-day" aria-hidden="true" />
                    Day Mode
                  </button>
                  <button
                    type="button"
                    className={`dcam-feat-btn ${dayNightMode === 'night' ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setDayNightMode('night')}
                    aria-pressed={dayNightMode === 'night'}
                    aria-controls="dcam-daynight-viewer"
                  >
                    <span className="dcam-mode-icon dcam-mode-icon-night" aria-hidden="true" />
                    Night Vision
                  </button>
                </div>

                <div className="dcam-arch-stats-bar">
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">650 / 850nm</span>
                    <span className="dcam-arch-stat-lbl">DUAL IR-CUT FILTER</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">High-Power</span>
                    <span className="dcam-arch-stat-lbl">IR ILLUMINATOR</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">Auto</span>
                    <span className="dcam-arch-stat-lbl">DAY/NIGHT SWITCHING</span>
                  </div>
                </div>
              </div>

              {/* Static Day/Night Camera View */}
              <div className="dcam-arch-visual-col">
                <figure
                  id="dcam-daynight-viewer"
                  className={`dcam-daynight-viewer dcam-daynight-viewer-${dayNightMode}`}
                  aria-live="polite"
                >
                  <div className="dcam-daynight-topbar">
                    <span className="dcam-daynight-live"><i aria-hidden="true" /> LIVE CAMERA VIEW</span>
                    <span>{dayNightMode === 'day' ? 'DAY · FULL COLOR' : 'NIGHT · MONO IR'}</span>
                  </div>
                  <img
                    className="dcam-daynight-image"
                    src={dayNightMode === 'day' ? dcamImages.dayVisionCam : dcamImages.nightVisionCam}
                    alt={dayNightMode === 'day'
                      ? 'Clear full-color daytime camera view of a modern office campus'
                      : 'Monochrome infrared night camera view of a modern office campus'}
                  />
                  <figcaption className="dcam-daynight-caption">
                    <span>
                      <strong>{dayNightMode === 'day' ? 'True-color clarity' : '0 Lux infrared vision'}</strong>
                      <small>{dayNightMode === 'day'
                        ? 'Balanced detail across bright streets and shaded entrances.'
                        : 'Clear monochrome detail for low-light perimeter monitoring.'}</small>
                    </span>
                    <em>{dayNightMode === 'day' ? 'TRUE WDR' : '850nm IR ACTIVE'}</em>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* ARCHITECTURE BLOCK 2: ULTRA-WIDE FIELD OF VIEW */}
            <div className="dcam-arch-row dcam-arch-row-reverse">
              <div className="dcam-arch-visual-col">
                <figure id="dcam-fov-viewer" className="dcam-fov-viewer" aria-live="polite">
                  <div className="dcam-fov-viewer-topbar">
                    <span className="dcam-fov-viewer-live"><i aria-hidden="true" /> CAMERA VIEW</span>
                    <span>HORIZONTAL FOV · {fovAngle}°</span>
                  </div>
                  <img
                    className="dcam-fov-viewer-image"
                    src={activeFovProfile.image}
                    alt={`${fovAngle} degree camera field-of-view of a modern office entrance`}
                  />
                  <figcaption className="dcam-fov-viewer-caption">
                    <span>
                      <strong>{activeFovProfile.title}</strong>
                      <small>{activeFovProfile.description}</small>
                    </span>
                    <em>{fovAngle}° COVERAGE</em>
                  </figcaption>
                </figure>
              </div>

              <div className="dcam-arch-text-col">
                <div className="dcam-tag-container">
                  <span className="dcam-tag-line"></span>
                  <span className="dcam-tag-text">ULTRA-WIDE FIELD OF VIEW</span>
                </div>
                <h3 className="dcam-arch-block-title">One camera.<br />Zero blind spots.</h3>
                <p className="dcam-arch-block-desc">
                  Standard cameras cover 90° leaving blind spots. ZMD's dual-sensor panoramic view covers the full 180° horizontally, eliminating the need for multiple cameras.
                </p>

                <div className="dcam-feat-btns">
                  <button
                    type="button"
                    className={`dcam-feat-btn ${fovAngle === 90 ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setFovAngle(90)}
                    aria-pressed={fovAngle === 90}
                    aria-controls="dcam-fov-viewer"
                  >
                    Standard 90°
                  </button>
                  <button
                    type="button"
                    className={`dcam-feat-btn ${fovAngle === 110 ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setFovAngle(110)}
                    aria-pressed={fovAngle === 110}
                    aria-controls="dcam-fov-viewer"
                  >
                    Single Lens 110°
                  </button>
                  <button
                    type="button"
                    className={`dcam-feat-btn ${fovAngle === 180 ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setFovAngle(180)}
                    aria-pressed={fovAngle === 180}
                    aria-controls="dcam-fov-viewer"
                  >
                    Dual Lens 180°
                  </button>
                </div>

                <div className="dcam-arch-stats-bar">
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">{fovAngle}°</span>
                    <span className="dcam-arch-stat-lbl">HORIZONTAL FOV</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">
                      {activeFovProfile.vertical}
                    </span>
                    <span className="dcam-arch-stat-lbl">VERTICAL FOV</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">
                      {activeFovProfile.sensorValue}
                    </span>
                    <span className="dcam-arch-stat-lbl">
                      {activeFovProfile.sensorLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ARCHITECTURE BLOCK 3: IP67 & IK10 DURABILITY */}
            <div className="dcam-arch-row dcam-arch-row-normal">
              <div className="dcam-arch-text-col">
                <div className="dcam-tag-container">
                  <span className="dcam-tag-line"></span>
                  <span className="dcam-tag-text">MILITARY-GRADE DURABILITY</span>
                </div>
                <h3 className="dcam-arch-block-title">Built to outlast<br />the environment.</h3>
                <p className="dcam-arch-block-desc">
                  Reinforced metal housing withstands full rain immersion, vandal-grade impacts, and extreme temperatures. It is engineered for the harshest outdoor conditions.
                </p>

                <div className="dcam-feat-btns">
                  {[
                    { id: 'water', label: 'Waterproof' },
                    { id: 'impact', label: 'Impact' },
                    { id: 'temp', label: 'Temperature' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`dcam-feat-btn ${durabilityTest === d.id ? 'dcam-feat-btn-active' : ''}`}
                      onClick={() => setDurabilityTest(d.id)}
                      aria-pressed={durabilityTest === d.id}
                      aria-controls="dcam-durability-viewer"
                    >
                      <span className={`dcam-durability-mode-icon dcam-durability-mode-icon-${d.id}`} aria-hidden="true" />
                      {d.label}
                    </button>
                  ))}
                </div>

                <div className="dcam-arch-stats-bar">
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">IP67</span>
                    <span className="dcam-arch-stat-lbl">WATERPROOFING</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">IK10</span>
                    <span className="dcam-arch-stat-lbl">VANDAL RESISTANCE</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">0 to 80°C</span>
                    <span className="dcam-arch-stat-lbl">OPERATING TEMP</span>
                  </div>
                </div>
              </div>

              <div className="dcam-arch-visual-col">
                <figure
                  id="dcam-durability-viewer"
                  className="dcam-durability-viewer"
                  aria-live="polite"
                >
                  <img
                    className="dcam-durability-viewer-image"
                    src={activeDurabilityProfile.image}
                    alt={activeDurabilityProfile.alt}
                  />
                  <div className="dcam-durability-viewer-topbar" aria-hidden="true">
                    <span className="dcam-durability-viewer-live"><i /> ENVIRONMENT TEST</span>
                    <span>{activeDurabilityProfile.testLabel}</span>
                  </div>
                  <figcaption className="dcam-durability-viewer-caption">
                    <span>
                      <strong>{activeDurabilityProfile.title}</strong>
                      <small>{activeDurabilityProfile.description}</small>
                    </span>
                    <em>{activeDurabilityProfile.badge}</em>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* ARCHITECTURE BLOCK 4: H.265 COMPRESSION & STORAGE */}
            <div className="dcam-arch-row dcam-arch-row-reverse">
              <div className="dcam-arch-visual-col">
                <div className="dcam-arch-card-canvas dcam-canvas-storage">
                  <div className="dcam-storage-hud-top">
                    <span className="dcam-hud-label">BANDWIDTH COMPARISON</span>
                  </div>

                  <div className="dcam-bandwidth-compare">
                    <div className="dcam-bw-row">
                      <span className="dcam-bw-label">H.264 Standard</span>
                      <div className="dcam-bw-bar-track">
                        <div className="dcam-bw-bar-fill dcam-bw-h264" style={{ width: '100%' }} />
                      </div>
                      <span className="dcam-bw-val">8 Mbps</span>
                    </div>
                    <div className="dcam-bw-row">
                      <span className="dcam-bw-label">H.265+ Instastream</span>
                      <div className="dcam-bw-bar-track">
                        <div className={`dcam-bw-bar-fill dcam-bw-h265 ${compressionMode === 'h265' ? 'dcam-bw-active' : ''}`} style={{ width: compressionMode === 'h265' ? '30%' : '100%' }} />
                      </div>
                      <span className="dcam-bw-val">{compressionMode === 'h265' ? '2.4 Mbps' : '8 Mbps'}</span>
                    </div>
                  </div>

                  <div className="dcam-storage-visual">
                    <div className="dcam-sd-card">
                      <div className="dcam-sd-label">MicroSD</div>
                      <div className="dcam-sd-capacity">
                        <div className="dcam-sd-fill" style={{ width: `${(storageUsed / 512) * 100}%` }} />
                      </div>
                      <div className="dcam-sd-info">
                        <span>{storageUsed}GB used</span>
                        <span>512GB total</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="512"
                      value={storageUsed}
                      onChange={(e) => setStorageUsed(Number(e.target.value))}
                      className="dcam-fov-range-input dcam-storage-slider"
                    />
                  </div>

                  <div className="dcam-canvas-badge">
                    {compressionMode === 'h265'
                      ? 'H.265+ INSTASTREAM | 70% BANDWIDTH REDUCTION'
                      : 'H.264 STANDARD | BASELINE ENCODING'}
                  </div>
                </div>
              </div>

              <div className="dcam-arch-text-col">
                <div className="dcam-tag-container">
                  <span className="dcam-tag-line"></span>
                  <span className="dcam-tag-text">INSTASTREAM COMPRESSION + EDGE STORAGE</span>
                </div>
                <h3 className="dcam-arch-block-title">Save 70% bandwidth.<br />Store locally.</h3>
                <p className="dcam-arch-block-desc">
                  H.265+ Instastream codec dynamically adjusts bitrate, cutting bandwidth and storage costs. On-board MicroSD provides fail-safe local backup up to 512GB.
                </p>

                <div className="dcam-feat-btns">
                  <button
                    type="button"
                    className={`dcam-feat-btn ${compressionMode === 'h264' ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setCompressionMode('h264')}
                  >
                    H.264
                  </button>
                  <button
                    type="button"
                    className={`dcam-feat-btn ${compressionMode === 'h265' ? 'dcam-feat-btn-active' : ''}`}
                    onClick={() => setCompressionMode('h265')}
                  >
                    H.265+ Instastream
                  </button>
                </div>

                <div className="dcam-arch-stats-bar">
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">{compressionMode === 'h265' ? '70%' : '0%'}</span>
                    <span className="dcam-arch-stat-lbl">BANDWIDTH SAVED</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">512GB</span>
                    <span className="dcam-arch-stat-lbl">MAX EDGE STORAGE</span>
                  </div>
                  <div className="dcam-arch-stat-item">
                    <span className="dcam-arch-stat-val">Triple</span>
                    <span className="dcam-arch-stat-lbl">STREAM SUPPORT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 3: QUALITY-AI FEATURES (Interactive Live Simulator) */}
        <section className="dcam-section dcam-ai-sim-section" id="ai-features">
          <div className="dcam-sim-header">
            <div className="dcam-tag-container">
              <span className="dcam-tag-line"></span>
              <span className="dcam-tag-text">EDGE AI CAPABILITIES</span>
            </div>
            <h2 className="dcam-sim-title">Watch the camera think</h2>
            <p className="dcam-sim-subtitle">
              Fourteen analytics engines run directly on the camera. Pick a category and watch the live feed simulator annotate it in real time.
            </p>
          </div>

          {/* Simulator Grid Layout */}
          <div className="dcam-sim-wrapper">
            {/* Left Column - Category Cards & Sub-features */}
            <div className="dcam-sim-sidebar">
              <div className="dcam-sim-cat-list">
                {/* Category 1: Security */}
                <div
                  className={`dcam-sim-cat-card dcam-sim-cat-security ${activeAiCategory === 'security' ? 'dcam-sim-cat-active' : ''}`}
                  onClick={() => {
                    setActiveAiCategory('security');
                    setActiveAiSubFeature('intrusion');
                  }}
                >
                  <div className="dcam-sim-cat-icon-box">
                    <svg className="dcam-sim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="dcam-sim-cat-text">
                    <h3 className="dcam-sim-cat-name">Security</h3>
                    <span className="dcam-sim-cat-tags">Intrusion · Crowd · Line · Re-ID</span>
                  </div>
                </div>

                {/* Category 2: Vehicle Intel */}
                <div
                  className={`dcam-sim-cat-card dcam-sim-cat-vehicle ${activeAiCategory === 'vehicle' ? 'dcam-sim-cat-active' : ''}`}
                  onClick={() => {
                    setActiveAiCategory('vehicle');
                    setActiveAiSubFeature('anpr');
                  }}
                >
                  <div className="dcam-sim-cat-icon-box">
                    <svg className="dcam-sim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12 1 13v3c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="2" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                  </div>
                  <div className="dcam-sim-cat-text">
                    <h3 className="dcam-sim-cat-name">Vehicle Intel</h3>
                    <span className="dcam-sim-cat-tags">ANPR · Classification · Attributes</span>
                  </div>
                </div>

                {/* Category 3: Human Analytics */}
                <div
                  className={`dcam-sim-cat-card dcam-sim-cat-human ${activeAiCategory === 'human' ? 'dcam-sim-cat-active' : ''}`}
                  onClick={() => {
                    setActiveAiCategory('human');
                    setActiveAiSubFeature('face');
                  }}
                >
                  <div className="dcam-sim-cat-icon-box">
                    <svg className="dcam-sim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="dcam-sim-cat-text">
                    <h3 className="dcam-sim-cat-name">Human Analytics</h3>
                    <span className="dcam-sim-cat-tags">Face · Age/Gender · Fall</span>
                  </div>
                </div>

                {/* Category 4: Safety / Industrial */}
                <div
                  className={`dcam-sim-cat-card dcam-sim-cat-safety ${activeAiCategory === 'safety' ? 'dcam-sim-cat-active' : ''}`}
                  onClick={() => {
                    setActiveAiCategory('safety');
                    setActiveAiSubFeature('ppe');
                  }}
                >
                  <div className="dcam-sim-cat-icon-box">
                    <svg className="dcam-sim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a9 9 0 0 0-9 9v3c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-3a9 9 0 0 0-9-9z" />
                      <path d="M12 16v5" />
                      <path d="M8 21h8" />
                    </svg>
                  </div>
                  <div className="dcam-sim-cat-text">
                    <h3 className="dcam-sim-cat-name">Safety / Industrial</h3>
                    <span className="dcam-sim-cat-tags">PPE · Fire &amp; Smoke</span>
                  </div>
                </div>
              </div>

              {/* Sub-features List inside active category */}
              <div className="dcam-sim-sublist-card">
                <span className="dcam-sim-sublist-title">ACTIVE ANALYTICS ENGINE</span>
                <div className="dcam-sim-sublist">
                  {activeAiCategory === 'security' && (
                    <>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'intrusion' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('intrusion')}
                      >
                        <span className="dcam-sim-subicon">☒</span> Intrusion Detection
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'crowd' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('crowd')}
                      >
                        <span className="dcam-sim-subicon">🚨</span> Crowd Density Analysis
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'line' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('line')}
                      >
                        <span className="dcam-sim-subicon">📏</span> Line Crossing Detection
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'reid' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('reid')}
                      >
                        <span className="dcam-sim-subicon">👤</span> Re-Identification (Re-ID)
                      </button>
                    </>
                  )}

                  {activeAiCategory === 'vehicle' && (
                    <>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'anpr' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('anpr')}
                      >
                        <span className="dcam-sim-subicon">🚗</span> ANPR License Plate
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'classification' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('classification')}
                      >
                        <span className="dcam-sim-subicon">🚙</span> Vehicle Classification
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'attributes' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('attributes')}
                      >
                        <span className="dcam-sim-subicon">🏷️</span> Vehicle Attribute Recognition
                      </button>
                    </>
                  )}

                  {activeAiCategory === 'human' && (
                    <>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'face' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('face')}
                      >
                        <span className="dcam-sim-subicon">🧑</span> Face Recognition
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'demographics' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('demographics')}
                      >
                        <span className="dcam-sim-subicon">👤</span> Age &amp; Gender Analytics
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'fall' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('fall')}
                      >
                        <span className="dcam-sim-subicon">⚠️</span> Fall Detection
                      </button>
                    </>
                  )}

                  {activeAiCategory === 'safety' && (
                    <>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'ppe' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('ppe')}
                      >
                        <span className="dcam-sim-subicon">🦺</span> PPE Detection (Helmet &amp; Vest)
                      </button>
                      <button
                        type="button"
                        className={`dcam-sim-subitem ${activeAiSubFeature === 'firesmoke' ? 'dcam-sim-subitem-active' : ''}`}
                        onClick={() => setActiveAiSubFeature('firesmoke')}
                      >
                        <span className="dcam-sim-subicon">🔥</span> Fire &amp; Smoke Detection
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Live Feed HUD Simulator Screen */}
            <div className="dcam-sim-viewport-container">
              <div className="dcam-sim-hud-screen">
                {/* Telemetry Header */}
                <div className="dcam-sim-hud-header">
                  <div className="dcam-sim-hud-status">
                    <span className="dcam-sim-live-dot"></span>
                    <span className="dcam-sim-live-text">LIVE · EDGE-AI-ACTIVE</span>
                  </div>
                  <div className="dcam-sim-hud-meta">
                    <span>CAM_04 · 1920×1080 · {telemetry.fps} FPS</span>
                  </div>
                </div>

                {/* Dynamic Live Feed Canvas Viewport */}
                <div className="dcam-sim-canvas">
                  {/* Laser Scanning Line Animation */}
                  <div className="dcam-sim-scan-line"></div>

                  {/* --- 1. SECURITY CATEGORY SCENES --- */}
                  {activeAiCategory === 'security' && (
                    <div className="dcam-sim-scene" style={{ '--dcam-track-x': `${(telemetry.coordsX - 381) * 0.7}px`, '--dcam-track-y': `${(telemetry.coordsY - 207) * 0.45}px` }}>
                      {/* Background Feed: dcamImages for Intrusion, Crowd, Line, Re-ID, SVG for others */}
                      {activeAiSubFeature === 'intrusion' ? (
                        <img src={dcamImages.edc1} className="dcam-sim-bg-img" alt="Intrusion Detection AI Camera Feed" />
                      ) : activeAiSubFeature === 'crowd' ? (
                        <img src={dcamImages.croden} className="dcam-sim-bg-img" alt="Crowd Density Analysis AI Camera Feed" />
                      ) : activeAiSubFeature === 'line' ? (
                        <img src={dcamImages.linecross} className="dcam-sim-bg-img" alt="Line Crossing Detection AI Camera Feed" />
                      ) : activeAiSubFeature === 'reid' ? (
                        <img src={dcamImages.peridde} className="dcam-sim-bg-img" alt="Re-Identification AI Camera Feed" />
                      ) : (
                        <svg className="dcam-sim-bg-svg" viewBox="0 0 800 400" preserveAspectRatio="none">
                          <rect x="0" y="0" width="800" height="400" fill="#090d16" />
                          {/* Grid Lines */}
                          <path d="M0,320 L800,320 M0,360 L800,360 M100,320 L50,400 M300,320 L250,400 M500,320 L450,400 M700,320 L650,400" stroke="#1e293b" strokeWidth="1.5" />
                          {/* Perimeter Fence Line */}
                          <line x1="50" y1="200" x2="750" y2="200" stroke="#334155" strokeWidth="2" strokeDasharray="6,6" />
                          <line x1="50" y1="280" x2="750" y2="280" stroke="#334155" strokeWidth="2" strokeDasharray="6,6" />
                          <rect x="120" y="100" width="160" height="180" fill="none" stroke="#1e293b" strokeWidth="2" />
                          <rect x="520" y="100" width="180" height="180" fill="none" stroke="#1e293b" strokeWidth="2" />
                        </svg>
                      )}

                      {/* Minimal & Transparent Intrusion Detection Overlay on edc-1.webp */}
                      {activeAiSubFeature === 'intrusion' && (
                        <>
                          {/* 1. Minimal Dashed Restricted Zone framing the Security Fence */}
                          <div
                            className="dcam-hud-zone-minimal"
                            style={{ top: '16%', left: '22%', width: '64%', height: '76%', zIndex: 2 }}
                          >
                            <span className="dcam-hud-tag-minimal">
                              RESTRICTED ZONE 01
                            </span>
                          </div>

                          {/* 2. Minimal Precision Bounding Box around the Intruder */}
                          <div
                            className="dcam-hud-target-box-minimal"
                            style={{ top: '8%', left: '33%', width: '37%', height: '86%', zIndex: 3 }}
                          >
                            {/* Subtle Laser Scanning Line */}
                            <div className="dcam-target-scan-line"></div>

                            {/* Minimal Target Label */}
                            <div className="dcam-hud-minimal-label">
                              INTRUSION DETECTED (99.2%)
                            </div>

                            {/* Minimal Coordinates Tag */}
                            <div className="dcam-hud-minimal-coords">
                              X: 482 · Y: 194 · ID #8042
                            </div>
                          </div>
                        </>
                      )}

                      {/* Line Crossing Detection */}
                      {activeAiSubFeature === 'line' && (
                        <>
                          <div className="dcam-hud-tripwire-line" style={{ top: '48%', zIndex: 2 }}>
                            <span className="dcam-hud-tag dcam-tag-red">TRIPWIRE A-01: BREACH DETECTED</span>
                          </div>
                          <div
                            className="dcam-hud-target-box-minimal"
                            style={{ top: '16%', left: '38%', width: '32%', height: '74%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line"></div>
                            <div className="dcam-hud-minimal-label">
                              LINE CROSSING ALARM
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              X: {telemetry.coordsX} · Y: {telemetry.coordsY} · ID #402
                            </div>
                          </div>
                        </>
                      )}

                      {/* Crowd Density Analysis */}
                      {activeAiSubFeature === 'crowd' && (
                        <>
                          <div
                            className="dcam-hud-zone-minimal"
                            style={{ top: '16%', left: '15%', width: '70%', height: '72%', zIndex: 2 }}
                          >
                            <span className="dcam-hud-tag-minimal">
                              DENSITY HEATMAP ZONE
                            </span>
                          </div>
                          <div
                            className="dcam-hud-target-box-minimal"
                            style={{ top: '10%', left: '26%', width: '48%', height: '80%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line"></div>
                            <div className="dcam-hud-minimal-label">
                              CROWD DENSITY: HIGH ({telemetry.count} PERSONS / 50M²)
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              LIVE NPU TRACKING · {telemetry.fps} FPS
                            </div>
                          </div>
                        </>
                      )}

                      {/* Re-Identification (Re-ID) */}
                      {activeAiSubFeature === 'reid' && (
                        <div
                          className="dcam-hud-target-box-minimal dcam-box-cyan-min"
                          style={{ top: '12%', left: '34%', width: '32%', height: '80%', zIndex: 3 }}
                        >
                          <div className="dcam-hud-corner dcam-corner-tl"></div>
                          <div className="dcam-hud-corner dcam-corner-tr"></div>
                          <div className="dcam-hud-corner dcam-corner-bl"></div>
                          <div className="dcam-hud-corner dcam-corner-br"></div>
                          <div className="dcam-target-scan-line dcam-scan-cyan"></div>
                          <div className="dcam-hud-minimal-label dcam-lbl-cyan">
                            SUBJECT RE-ID MATCH #8042 ({telemetry.conf}%)
                          </div>
                          <div className="dcam-hud-minimal-coords">
                            VECTOR MATCH CONFIRMED · {telemetry.latency}ms
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- 2. VEHICLE INTEL CATEGORY SCENES --- */}
                  {activeAiCategory === 'vehicle' && (
                    <div className="dcam-sim-scene" style={{ '--dcam-track-x': `${(telemetry.coordsX - 381) * 0.7}px`, '--dcam-track-y': `${(telemetry.coordsY - 207) * 0.45}px` }}>
                      {/* Background Feed: dcamImages for ANPR, Classification, Attributes, SVG for others */}
                      {activeAiSubFeature === 'anpr' ? (
                        <img src={dcamImages.licp} className="dcam-sim-bg-img" alt="ANPR License Plate AI Camera Feed" />
                      ) : activeAiSubFeature === 'classification' ? (
                        <img src={dcamImages.vehiclass} className="dcam-sim-bg-img" alt="Vehicle Classification AI Camera Feed" />
                      ) : activeAiSubFeature === 'attributes' ? (
                        <img src={dcamImages.vehatri} className="dcam-sim-bg-img" alt="Vehicle Attribute Recognition AI Camera Feed" />
                      ) : (
                        <svg className="dcam-sim-bg-svg" viewBox="0 0 800 400" preserveAspectRatio="none">
                          <rect x="0" y="0" width="800" height="400" fill="#090d16" />
                          {/* Road Surface */}
                          <polygon points="200,400 600,400 480,120 320,120" fill="#1e293b" />
                          {/* Lane Markings */}
                          <line x1="400" y1="400" x2="400" y2="120" stroke="#f59e0b" strokeWidth="3" strokeDasharray="16,16" />
                          <line x1="270" y1="400" x2="350" y2="120" stroke="#ffffff" strokeWidth="2" strokeDasharray="12,12" />
                          <line x1="530" y1="400" x2="450" y2="120" stroke="#ffffff" strokeWidth="2" strokeDasharray="12,12" />
                        </svg>
                      )}

                      {/* ANPR License Plate Overlay */}
                      {activeAiSubFeature === 'anpr' && (
                        <div
                          className="dcam-hud-target-box-minimal dcam-box-green-min"
                          style={{ top: '44%', left: '30%', width: '40%', height: '36%', zIndex: 3 }}
                        >
                          <div className="dcam-hud-corner dcam-corner-tl"></div>
                          <div className="dcam-hud-corner dcam-corner-tr"></div>
                          <div className="dcam-hud-corner dcam-corner-bl"></div>
                          <div className="dcam-hud-corner dcam-corner-br"></div>
                          <div className="dcam-target-scan-line dcam-scan-green"></div>
                          <div className="dcam-hud-minimal-label dcam-lbl-green">
                            ANPR DETECTED: TS 09 EA 8842 ({telemetry.conf}%)
                          </div>
                          <div className="dcam-hud-minimal-coords">
                            PLATE READ: OK · SPEED: {telemetry.speed} KM/H
                          </div>
                        </div>
                      )}

                      {/* Vehicle Classification Overlay */}
                      {activeAiSubFeature === 'classification' && (
                        <div
                          className="dcam-hud-target-box-minimal dcam-box-cyan-min"
                          style={{ top: '16%', left: '16%', width: '68%', height: '72%', zIndex: 3 }}
                        >
                          <div className="dcam-hud-corner dcam-corner-tl"></div>
                          <div className="dcam-hud-corner dcam-corner-tr"></div>
                          <div className="dcam-hud-corner dcam-corner-bl"></div>
                          <div className="dcam-hud-corner dcam-corner-br"></div>
                          <div className="dcam-target-scan-line dcam-scan-cyan"></div>
                          <div className="dcam-hud-minimal-label dcam-lbl-cyan">
                            VEHICLE CLASS: SEDAN / PASSENGER CAR ({telemetry.conf}%)
                          </div>
                          <div className="dcam-hud-minimal-coords">
                            CATEGORY: LIGHT VEHICLE · NPU READ OK · {telemetry.fps} FPS
                          </div>
                        </div>
                      )}

                      {/* Vehicle Attributes Overlay */}
                      {activeAiSubFeature === 'attributes' && (
                        <div
                          className="dcam-hud-target-box-minimal dcam-box-green-min"
                          style={{ top: '16%', left: '16%', width: '68%', height: '72%', zIndex: 3 }}
                        >
                          <div className="dcam-hud-corner dcam-corner-tl"></div>
                          <div className="dcam-hud-corner dcam-corner-tr"></div>
                          <div className="dcam-hud-corner dcam-corner-bl"></div>
                          <div className="dcam-hud-corner dcam-corner-br"></div>
                          <div className="dcam-target-scan-line dcam-scan-green"></div>
                          <div className="dcam-hud-minimal-label dcam-lbl-green">
                            ATTRIBUTES: SPEED {telemetry.speed} KM/H · DIR: NORTH
                          </div>
                          <div className="dcam-hud-minimal-coords">
                            COLOR: WHITE/DARK · LATENCY: {telemetry.latency}ms
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- 3. HUMAN ANALYTICS CATEGORY SCENES --- */}
                  {activeAiCategory === 'human' && (
                    <div className="dcam-sim-scene" style={{ '--dcam-track-x': `${(telemetry.coordsX - 381) * 0.7}px`, '--dcam-track-y': `${(telemetry.coordsY - 207) * 0.45}px` }}>
                      {/* Background Feed: dcamImages for Face, Demographics, Fall, SVG for others */}
                      {activeAiSubFeature === 'face' ? (
                        <img src={dcamImages.facrecog} className="dcam-sim-bg-img" alt="Facial Recognition AI Camera Feed" />
                      ) : activeAiSubFeature === 'demographics' ? (
                        <img src={dcamImages.gencla} className="dcam-sim-bg-img" alt="Age & Gender Analytics AI Camera Feed" />
                      ) : activeAiSubFeature === 'fall' ? (
                        <img src={dcamImages.perfa} className="dcam-sim-bg-img" alt="Fall Detection AI Camera Feed" />
                      ) : (
                        <svg className="dcam-sim-bg-svg" viewBox="0 0 800 400" preserveAspectRatio="none">
                          <rect x="0" y="0" width="800" height="400" fill="#090d16" />
                          <rect x="100" y="60" width="600" height="280" fill="none" stroke="#1e293b" strokeWidth="2" />
                          <line x1="100" y1="340" x2="0" y2="400" stroke="#1e293b" strokeWidth="2" />
                          <line x1="700" y1="340" x2="800" y2="400" stroke="#1e293b" strokeWidth="2" />
                        </svg>
                      )}

                      {/* Face Recognition - Biometric Scan Reticle */}
                      {activeAiSubFeature === 'face' && (
                        <>
                          {/* Primary face bounding box with pulsing scan */}
                          <div
                            className="dcam-hud-target-box-minimal dcam-box-cyan-min"
                            style={{ top: '10%', left: '30%', width: '40%', height: '82%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line dcam-scan-cyan"></div>
                            <div className="dcam-hud-minimal-label dcam-lbl-cyan">
                              BIOMETRIC MATCH: {telemetry.faceMatch}%
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              ID: {telemetry.faceId} · ENCODING: 128-D VECTOR
                            </div>
                          </div>
                          {/* Crosshair overlay */}
                          <div className="dcam-hud-crosshair" style={{ top: '42%', left: '48%', zIndex: 4 }}>
                            <div className="dcam-crosshair-h"></div>
                            <div className="dcam-crosshair-v"></div>
                            <div className="dcam-crosshair-dot"></div>
                          </div>
                          {/* Side telemetry strip */}
                          <div className="dcam-hud-side-strip dcam-strip-right" style={{ zIndex: 4 }}>
                            <span className="dcam-strip-item">FPS: {telemetry.fps}</span>
                            <span className="dcam-strip-item">LAT: {telemetry.latency}ms</span>
                            <span className="dcam-strip-item dcam-strip-highlight">DB: 12,482 FACES</span>
                          </div>
                        </>
                      )}

                      {/* Demographics (Age & Gender) - Classification Grid */}
                      {activeAiSubFeature === 'demographics' && (
                        <>
                          {/* Primary subject bounding box */}
                          <div
                            className="dcam-hud-target-box-minimal dcam-box-green-min"
                            style={{ top: '8%', left: '28%', width: '44%', height: '86%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line dcam-scan-green"></div>
                            <div className="dcam-hud-minimal-label dcam-lbl-green">
                              AGE: {telemetry.age} · GENDER: MALE ({telemetry.genderConf}%)
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              EMOTION: NEUTRAL · ETHNICITY: N/A · {telemetry.fps} FPS
                            </div>
                          </div>
                          {/* Attribute data panel */}
                          <div className="dcam-hud-data-panel" style={{ zIndex: 4 }}>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">AGE RANGE</span>
                              <span className="dcam-panel-val">{telemetry.age - 2} to {telemetry.age + 2}</span>
                            </div>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">CONFIDENCE</span>
                              <div className="dcam-panel-bar">
                                <div className="dcam-panel-bar-fill dcam-bar-green" style={{ width: `${telemetry.genderConf}%` }}></div>
                              </div>
                            </div>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">HR EST</span>
                              <span className="dcam-panel-val dcam-val-pulse">{telemetry.heartRate} BPM</span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Fall Detection - Posture Analysis Grid */}
                      {activeAiSubFeature === 'fall' && (
                        <>
                          <div
                            className="dcam-hud-target-box-minimal"
                            style={{ top: '10%', left: '24%', width: '52%', height: '82%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line"></div>
                            <div className="dcam-hud-minimal-label">
                              POSTURE: MONITORING · TILT: {telemetry.fallAngle}°
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              SKELETON: 17-JOINT · LATENCY: {telemetry.latency}ms
                            </div>
                          </div>
                          {/* Threat gauge */}
                          <div className="dcam-hud-gauge-strip" style={{ zIndex: 4 }}>
                            <div className="dcam-gauge-label">FALL RISK</div>
                            <div className="dcam-gauge-track">
                              <div className="dcam-gauge-fill" style={{ width: `${Math.min(telemetry.fallAngle * 4, 100)}%` }}></div>
                            </div>
                            <div className="dcam-gauge-val">{telemetry.fallAngle}°</div>
                          </div>
                          {/* Side telemetry strip */}
                          <div className="dcam-hud-side-strip dcam-strip-left" style={{ zIndex: 4 }}>
                            <span className="dcam-strip-item">STATUS: {telemetry.fallAngle > 15 ? 'ALERT' : 'NORMAL'}</span>
                            <span className="dcam-strip-item">FPS: {telemetry.fps}</span>
                            <span className="dcam-strip-item">ZONE: CORRIDOR-B</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* --- 4. SAFETY / INDUSTRIAL CATEGORY SCENES --- */}
                  {activeAiCategory === 'safety' && (
                    <div className="dcam-sim-scene" style={{ '--dcam-track-x': `${(telemetry.coordsX - 381) * 0.7}px`, '--dcam-track-y': `${(telemetry.coordsY - 207) * 0.45}px` }}>
                      {/* Background Feed: dcamImages for PPE, Fire & Smoke, SVG for others */}
                      {activeAiSubFeature === 'ppe' ? (
                        <img src={dcamImages.ppever} className="dcam-sim-bg-img" alt="PPE Detection AI Camera Feed" />
                      ) : activeAiSubFeature === 'firesmoke' ? (
                        <img src={dcamImages.firede} className="dcam-sim-bg-img" alt="Fire & Smoke Detection AI Camera Feed" />
                      ) : (
                        <svg className="dcam-sim-bg-svg" viewBox="0 0 800 400" preserveAspectRatio="none">
                          <rect x="0" y="0" width="800" height="400" fill="#090d16" />
                          {/* Industrial Pipes */}
                          <rect x="0" y="40" width="800" height="20" fill="#1e293b" />
                          <rect x="0" y="70" width="800" height="15" fill="#334155" />
                          <line x1="200" y1="85" x2="200" y2="400" stroke="#1e293b" strokeWidth="12" />
                          <line x1="600" y1="85" x2="600" y2="400" stroke="#1e293b" strokeWidth="12" />
                        </svg>
                      )}

                      {/* PPE Detection - Compliance Scanner */}
                      {activeAiSubFeature === 'ppe' && (
                        <>
                          <div
                            className="dcam-hud-target-box-minimal dcam-box-green-min"
                            style={{ top: '8%', left: '24%', width: '52%', height: '86%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line dcam-scan-green"></div>
                            <div className="dcam-hud-minimal-label dcam-lbl-green">
                              PPE COMPLIANCE: {telemetry.ppeScore}% · WORKER #{telemetry.coordsX}
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              ZONE: SECTOR-A · TEMP: {telemetry.tempC}°C · {telemetry.fps} FPS
                            </div>
                          </div>
                          {/* PPE checklist panel */}
                          <div className="dcam-hud-data-panel dcam-panel-bottom-left" style={{ zIndex: 4 }}>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">HELMET</span>
                              <span className="dcam-panel-val dcam-val-ok">VERIFIED ✓</span>
                            </div>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">VEST</span>
                              <span className="dcam-panel-val dcam-val-ok">VERIFIED ✓</span>
                            </div>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">GLOVES</span>
                              <span className="dcam-panel-val dcam-val-ok">VERIFIED ✓</span>
                            </div>
                            <div className="dcam-panel-row">
                              <span className="dcam-panel-key">SCORE</span>
                              <div className="dcam-panel-bar">
                                <div className="dcam-panel-bar-fill dcam-bar-green" style={{ width: `${telemetry.ppeScore}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Fire & Smoke Detection - Thermal Analysis Grid */}
                      {activeAiSubFeature === 'firesmoke' && (
                        <>
                          <div
                            className="dcam-hud-target-box-minimal dcam-box-amber-min"
                            style={{ top: '10%', left: '20%', width: '60%', height: '82%', zIndex: 3 }}
                          >
                            <div className="dcam-hud-corner dcam-corner-tl"></div>
                            <div className="dcam-hud-corner dcam-corner-tr"></div>
                            <div className="dcam-hud-corner dcam-corner-bl"></div>
                            <div className="dcam-hud-corner dcam-corner-br"></div>
                            <div className="dcam-target-scan-line dcam-scan-amber"></div>
                            <div className="dcam-hud-minimal-label dcam-lbl-amber">
                              THERMAL SCAN · THREAT: {telemetry.threatLevel}
                            </div>
                            <div className="dcam-hud-minimal-coords">
                              SMOKE: {telemetry.smokeLevel} PPM · FIRE PROB: {telemetry.fireProb} · {telemetry.fps} FPS
                            </div>
                          </div>
                          {/* Dual gauge strip */}
                          <div className="dcam-hud-gauge-strip dcam-gauge-dual" style={{ zIndex: 4 }}>
                            <div className="dcam-gauge-row">
                              <div className="dcam-gauge-label">SMOKE</div>
                              <div className="dcam-gauge-track">
                                <div className="dcam-gauge-fill dcam-fill-amber" style={{ width: `${Math.min(telemetry.smokeLevel * 2000, 100)}%` }}></div>
                              </div>
                              <div className="dcam-gauge-val">{telemetry.smokeLevel}</div>
                            </div>
                            <div className="dcam-gauge-row">
                              <div className="dcam-gauge-label">FIRE</div>
                              <div className="dcam-gauge-track">
                                <div className="dcam-gauge-fill dcam-fill-red" style={{ width: `${Math.min(telemetry.fireProb * 4000, 100)}%` }}></div>
                              </div>
                              <div className="dcam-gauge-val">{telemetry.fireProb}</div>
                            </div>
                          </div>
                          {/* Side telemetry strip */}
                          <div className="dcam-hud-side-strip dcam-strip-right" style={{ zIndex: 4 }}>
                            <span className="dcam-strip-item">TEMP: {telemetry.tempC}°C</span>
                            <span className="dcam-strip-item">LAT: {telemetry.latency}ms</span>
                            <span className="dcam-strip-item dcam-strip-warn">{telemetry.threatLevel}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* HUD Footer Telemetry */}
                <div className="dcam-sim-hud-footer">
                  <span>NPU: ZMD-EDGE v2.4</span>
                  <span>LATENCY: {telemetry.latency}ms</span>
                  <span>CHIP TEMP: 42°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Analytics Tag Cloud (All 14 Engines) */}
          <div className="dcam-sim-tag-cloud">
            {[
              { name: 'Intrusion Detection', cat: 'security', sub: 'intrusion' },
              { name: 'Crowd Density Analysis', cat: 'security', sub: 'crowd' },
              { name: 'Line Crossing Detection', cat: 'security', sub: 'line' },
              { name: 'Re-Identification (Re-ID)', cat: 'security', sub: 'reid' },
              { name: 'ANPR', cat: 'vehicle', sub: 'anpr' },
              { name: 'Vehicle Classification', cat: 'vehicle', sub: 'classification' },
              { name: 'Vehicle Attribute Recognition', cat: 'vehicle', sub: 'attributes' },
              { name: 'Face Recognition', cat: 'human', sub: 'face' },
              { name: 'Fall Detection', cat: 'human', sub: 'fall' },
              { name: 'Age & Gender Analytics', cat: 'human', sub: 'demographics' },
              { name: 'PPE Detection', cat: 'safety', sub: 'ppe' },
              { name: 'Fire & Smoke Detection', cat: 'safety', sub: 'firesmoke' },
            ].map((engine) => {
              const isPillActive = activeAiSubFeature === engine.sub;
              return (
                <button
                  key={engine.sub}
                  type="button"
                  className={`dcam-sim-pill ${isPillActive ? 'dcam-sim-pill-active' : ''}`}
                  onClick={() => {
                    setActiveAiCategory(engine.cat);
                    setActiveAiSubFeature(engine.sub);
                  }}
                >
                  {engine.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION: CAMERA MODEL LINEUP */}
        <section className="dcam-models-section" id="camera-models">
          <div className="dcam-models-container">
            <div className="dcam-models-heading">
              <div className="dcam-tag-container">
                <span className="dcam-tag-line"></span>
                <span className="dcam-tag-text">CAMERA LINEUP</span>
              </div>
              <div>
                <h2 className="dcam-models-title">One intelligence platform.<br />Four purpose-built forms.</h2>
                <p className="dcam-models-subtitle">Choose the housing that fits the site. Every model is designed around dependable Edge AI vision.</p>
              </div>
            </div>

            <div className="dcam-models-grid">
              {cameraModels.map((model) => {
                const activeImage = activeModelImages[model.number] ?? 0;

                return (
                  <article className="dcam-model-card dcam-model-card-gallery" key={model.name}>
                    <div className="dcam-model-gallery-slot">
                      <label className="dcam-model-compare">
                        <span>Compare</span>
                        <input type="checkbox" aria-label={`Compare ${model.name} camera`} />
                        <i aria-hidden="true" />
                      </label>
                      <div className="dcam-model-main-img-wrap" aria-live="polite">
                        <img
                          key={`${model.number}-${activeImage}`}
                          src={model.images[activeImage]}
                          alt={`${model.name} camera angle ${activeImage + 1}`}
                          className="dcam-model-main-img"
                        />
                      </div>
                      <div className="dcam-model-thumbnails-row">
                        {model.images.map((imgSrc, imgIdx) => (
                          <button
                            key={imgSrc}
                            type="button"
                            onClick={() => setActiveModelImages((current) => ({
                              ...current,
                              [model.number]: imgIdx,
                            }))}
                            className={`dcam-thumb-btn ${activeImage === imgIdx ? 'dcam-thumb-btn-active' : ''}`}
                            aria-label={`View ${model.name} camera angle ${imgIdx + 1}`}
                            aria-pressed={activeImage === imgIdx}
                          >
                            <img
                              src={imgSrc}
                              alt=""
                              className="dcam-thumb-img"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="dcam-model-card-content">
                      <span className="dcam-model-number">MODEL {model.number}</span>
                      <span className="dcam-model-type">{model.type}</span>
                      <h3 className="dcam-model-name">{model.name}</h3>
                      <p className="dcam-model-description">{model.description}</p>
                      <span className="dcam-model-status"><i aria-hidden="true" /> {model.status || 'EDGE AI READY'}</span>
                      <div className="dcam-model-specs-panel" aria-hidden="true">
                        <span className="dcam-model-specs-eyebrow">KEY SPECIFICATIONS</span>
                        <strong className="dcam-model-specs-title">{model.name}</strong>
                        <ul className="dcam-model-specs-list">
                          {model.features.map((feature) => <li key={feature}>{feature}</li>)}
                        </ul>
                        <span className="dcam-model-specs-status"><i aria-hidden="true" /> {model.status || 'EDGE AI READY'}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: WHY TEAMS PICK IT */}
        <section className="dcam-why-dark-section" id="why-zmd">
          <div className="dcam-why-dark-container">
            <div className="dcam-tag-container">
              <span className="dcam-tag-line"></span>
              <span className="dcam-tag-text">WHY TEAMS PICK IT</span>
            </div>
            <h2 className="dcam-why-dark-title">Why teams choose the ZMD IP Camera</h2>
            <p className="dcam-why-dark-subtitle">
              What we optimised for, in the order it usually matters on-site.
            </p>

            <div className="dcam-why-dark-grid">
              <div className="dcam-why-dark-card">
                <span className="dcam-why-card-num">01</span>
                <span className="dcam-why-card-text">AI runs on-device with zero cloud latency</span>
              </div>
              <div className="dcam-why-dark-card">
                <span className="dcam-why-card-num">02</span>
                <span className="dcam-why-card-text">IP67 + IK10 in a single housing</span>
              </div>
              <div className="dcam-why-dark-card">
                <span className="dcam-why-card-num">03</span>
                <span className="dcam-why-card-text">PoE or 12 V DC for deployment anywhere</span>
              </div>
              <div className="dcam-why-dark-card">
                <span className="dcam-why-card-num">04</span>
                <span className="dcam-why-card-text">H.265 keeps bandwidth lean</span>
              </div>
              <div className="dcam-why-dark-card">
                <span className="dcam-why-card-num">05</span>
                <span className="dcam-why-card-text">Two-year warranty, India-based support</span>
              </div>
              <div className="dcam-why-dark-card">
                <span className="dcam-why-card-num">06</span>
                <span className="dcam-why-card-text">True 180° coverage, no fisheye dewarp needed</span>
              </div>
            </div>

            <div className="dcam-why-dark-pills-row">
              <div className="dcam-why-dark-pill">
                <span className="dcam-why-pill-label">High performance</span>
                <span className="dcam-why-pill-dot" />
              </div>
              <div className="dcam-why-dark-pill">
                <span className="dcam-why-pill-label">Easy to use</span>
                <span className="dcam-why-pill-dot" />
              </div>
              <div className="dcam-why-dark-pill">
                <span className="dcam-why-pill-label">Reliable quality</span>
                <span className="dcam-why-pill-dot" />
              </div>
              <div className="dcam-why-dark-pill">
                <span className="dcam-why-pill-label">Cost effective</span>
                <span className="dcam-why-pill-dot" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 & 7: CONTACT AND FAQ SUPPORT AREA */}
        <div className="dcam-support-section">
          <div className="dcam-support-layout">
            <section className="dcam-contact-v2-section" id="contact">
              <div className="dcam-contact-v2-container">
                <div className="dcam-contact-v2-left">
                  <div className="dcam-tag-container">
                    <span className="dcam-tag-line"></span>
                    <span className="dcam-tag-text">GET IN TOUCH</span>
                  </div>
                  <h2 className="dcam-contact-v2-title">
                    Ready to deploy intelligent vision on-site?
                  </h2>

                  <div className="dcam-contact-v2-details">
                    <div className="dcam-contact-v2-item">
                      <svg className="dcam-contact-v2-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <a href="mailto:sales@zmd.tech" className="dcam-contact-v2-link">sales@zmd.tech</a>
                    </div>

                    <div className="dcam-contact-v2-item">
                      <svg className="dcam-contact-v2-icon dcam-icon-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="dcam-contact-v2-text">
                        Sy. No. 65/6, Nallurahalli Main Road, Mourya Building, near HP Petrol Pump, Whitefield, Bengaluru, Karnataka 560066
                      </span>
                    </div>
                  </div>

                  <div className="dcam-contact-v2-actions">
                    <a href="mailto:sales@zmd.tech" className="dcam-v2-btn-white">
                      Request a Quote <span aria-hidden="true">&rarr;</span>
                    </a>
                    <button
                      type="button"
                      className="dcam-v2-btn-outline"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Download Datasheet
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="dcam-section dcam-faq-section" id="faq">
              <div className="dcam-section-header">
                <span className="dcam-section-badge">SUPPORT &amp; HELPDESK</span>
                <h2 className="dcam-section-title">Frequently Asked Questions</h2>
                <p className="dcam-section-subtitle">
                  Common questions regarding deployment, integration, and technical operation.
                </p>
              </div>

              <div className="dcam-faq-accordion">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className={`dcam-faq-item ${isOpen ? 'dcam-faq-open dcam-accordion-expanded' : ''}`}
                      onMouseEnter={() => setOpenFaq(index)}
                      onMouseLeave={() => setOpenFaq(-1)}
                    >
                      <button
                        type="button"
                        className="dcam-faq-question"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      >
                        <span>{faq.q}</span>
                        <span className="dcam-faq-icon">{isOpen ? '−' : '+'}</span>
                      </button>
                      <div className="dcam-accordion-collapse-wrapper">
                        <div className="dcam-accordion-collapse-inner">
                          <div className="dcam-faq-answer">
                            <p>{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        endpoint="/api/camera/contact"
      />
    </>
  );
}
