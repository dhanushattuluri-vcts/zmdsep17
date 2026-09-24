import React, { useState, useEffect, useRef } from 'react';
import deliheroVideo from '../../assets/images/delibot/lightbackground.mp4';
import traditionalBotImg from '../../assets/images/delibot/traditonalbot.jpeg';
import delibotSec2Img from '../../assets/images/delibot/delibotsec2.webp';
import delibotSec3Img from '../../assets/images/delibot/delibotsec3.webp';
import delStep1Img from '../../assets/images/delibot/delsec3_1.webp';
import delStep2Img from '../../assets/images/delibot/delsec3_2.webp';
import delStep3Img from '../../assets/images/delibot/delsec3_3.webp';
import delStep4Img from '../../assets/images/delibot/delsec3_4.webp';
import delStep5Img from '../../assets/images/delibot/delsec3_5.webp';
import deliSec4HeroImg from '../../assets/images/delibot/delisec4hero.webp';
import deliSec4Step1Img from '../../assets/images/delibot/delisec4_1.webp';
import deliSec4Step2Img from '../../assets/images/delibot/delisec4_2.webp';
import deliSec4Step3Img from '../../assets/images/delibot/delisec4_3.webp';
import deliEnSec1Img from '../../assets/images/delibot/deliensec_1.webp';
import deliEnSec2Img from '../../assets/images/delibot/deliensec_2.webp';
import deliEnSec3Img from '../../assets/images/delibot/deliensec_3.webp';
import deliFBanImg from '../../assets/images/delibot/delfban.webp';
import '../../assets/css/delibot.css';
import ContactModal from '../../components/ContactModal';

// Per-card target ratios within the robot image (x,y as fraction of image w/h)
// These define which part of the robot each card highlights
const CARD_IMG_TARGETS = {
  1: { rx: 0.50, ry: 0.20 }, // LiDAR / top 360° perception sensor dome
  2: { rx: 0.38, ry: 0.44 }, // Robotic elevator arm (left side)
  3: { rx: 0.48, ry: 0.32 }, // Front camera / SLAM module
  4: { rx: 0.60, ry: 0.48 }, // Cargo door (right side)
  5: { rx: 0.52, ry: 0.62 }, // Compute chassis
  6: { rx: 0.50, ry: 0.80 }, // Base MCU frame / wheels
};

export default function DelibotPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, setActiveNav] = useState('overview');
  const [activeCard, setActiveCard] = useState(null);
  const [connector, setConnector] = useState(null);
  const [openFaq, setOpenFaq] = useState(-1);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const overviewRef = useRef(null);
  const problemRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const elevatorTechRef = useRef(null);
  const industriesRef = useRef(null);
  const faqsRef = useRef(null);
  const contactRef = useRef(null);

  // Refs for the connector animation
  const gridRef = useRef(null);
  const centerImgRef = useRef(null);
  const cardRefs = useRef([]);
  const cardRefCallbacks = useRef(
    Array.from({ length: 6 }, (_, index) => (node) => {
      cardRefs.current[index] = node;
    })
  );

  const [visibleSections, setVisibleSections] = useState({
    overview: true,
    'the-problem': false,
    capabilities: false,
    'elevator-tech': false,
    industries: false,
    faqs: false,
    contact: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Update active subnav based on scroll position
      const sections = ['overview', 'the-problem', 'capabilities', 'elevator-tech', 'industries', 'contact', 'faqs'];
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionMap = [
      { id: 'overview', ref: overviewRef },
      { id: 'the-problem', ref: problemRef },
      { id: 'capabilities', ref: capabilitiesRef },
      { id: 'elevator-tech', ref: elevatorTechRef },
      { id: 'industries', ref: industriesRef },
      { id: 'contact', ref: contactRef },
      { id: 'faqs', ref: faqsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;
          setVisibleSections((prev) => {
            if (prev[sectionId]) return prev;
            return { ...prev, [sectionId]: true };
          });
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    sectionMap.forEach((item) => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setActiveNav(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track the connector only while the card/image hover transition is moving.
  useEffect(() => {
    if (!activeCard) {
      setConnector(null);
      return;
    }

    let animId;
    const startedAt = performance.now();
    const transitionDuration = 750;

    const updateLoop = () => {
      if (!gridRef.current || !centerImgRef.current) {
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      const cardEl = cardRefs.current[activeCard - 1];
      if (!cardEl) {
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      const gridRect = gridRef.current.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const imgRect  = centerImgRef.current.getBoundingClientRect();

      const isLeft = activeCard <= 3;

      // Origin: right edge of left card, left edge of right card, vertically centered
      const ox = isLeft
        ? cardRect.right  - gridRect.left
        : cardRect.left   - gridRect.left;
      const oy = cardRect.top + cardRect.height / 2 - gridRect.top;

      // Target on robot image
      const t = CARD_IMG_TARGETS[activeCard];
      const tx = imgRect.left - gridRect.left + imgRect.width  * t.rx;
      const ty = imgRect.top  - gridRect.top  + imgRect.height * t.ry;

      // Tech Spec 90-degree Orthogonal Line:
      // Exit horizontally from card, drop/rise vertically, then enter target horizontally
      const midX = isLeft
        ? ox + Math.max(30, (tx - ox) * 0.45)
        : ox - Math.max(30, (ox - tx) * 0.45);

      const w = gridRect.width;
      const h = gridRect.height;

      const round = (value) => Math.round(value * 10) / 10;
      const nextConnector = {
        ox: round(ox),
        oy: round(oy),
        tx: round(tx),
        ty: round(ty),
        midX: round(midX),
        w: round(w),
        h: round(h),
        isLeft,
        cardId: activeCard,
      };

      setConnector((previous) => {
        if (
          previous &&
          previous.cardId === nextConnector.cardId &&
          previous.ox === nextConnector.ox &&
          previous.oy === nextConnector.oy &&
          previous.tx === nextConnector.tx &&
          previous.ty === nextConnector.ty &&
          previous.midX === nextConnector.midX &&
          previous.w === nextConnector.w &&
          previous.h === nextConnector.h
        ) {
          return previous;
        }
        return nextConnector;
      });

      if (performance.now() - startedAt < transitionDuration) {
        animId = requestAnimationFrame(updateLoop);
      }
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [activeCard]);

  const handleCardEnter = (cardId) => {
    setActiveCard(cardId);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="delibot-page-wrapper">
      {/* 1. SCROLL PROGRESS BAR */}
      <div 
        className="delibot-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />



      {/* 3. HERO SECTION (BLACK BACKGROUND) */}
      <section 
        id="overview" 
        ref={overviewRef}
        className={`delibot-hero delibot-animated-section ${visibleSections['overview'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
      >
        {/* Full-bleed hero video background and left text shade overlay */}
        <div className="delibot-hero-bg-wrapper">
          <video
            className="delibot-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={deliheroVideo} type="video/mp4" />
          </video>
          <div className="delibot-hero-left-shade" aria-hidden="true" />
        </div>

        <div className="delibot-hero__container">
          <div className="delibot-hero__left">
            <div className="dcam-tag-container">
              <span className="dcam-tag-line"></span>
              <span className="dcam-tag-text">AUTONOMOUS MULTI-FLOOR LOGISTICS</span>
            </div>

            <h1 className="delibot-hero__headline">Autonomous <span className="delibot-title-red">DeliBot</span></h1>
            <h2 className="delibot-hero__subheadline">Intelligence at the <span className="delibot-title-red">Source</span><span className="delibot-title-dot">.</span></h2>

            <p className="delibot-hero__supporting">
              DeliBot is engineered to deliver seamless, end-to-end logistics across multiple floors autonomously.
            </p>

            <div className="delibot-hero__badges">
              <span className="delibot-badge-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E10600" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Multi-Floor Autonomy
              </span>
              <span className="delibot-badge-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E10600" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                100% Secure Delivery
              </span>
            </div>

            <div className="delibot-hero__actions">
              <a 
                href="#contact" 
                className="delibot-btn-red"
                onClick={(e) => scrollToSection(e, 'contact')}
              >
                <span>Request a Demo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 7 Feature Chips Strip */}
        <div className="delibot-hero-chips">
          {[
            'Autonomous',
            'Edge AI',
            'Multi-Floor',
            'ROS2',
            'LiDAR',
            '5-Camera Vision',
            'Micro-ROS'
          ].map((chip, idx, array) => (
            <React.Fragment key={chip}>
              <div className="delibot-chip-item">
                <div className="delibot-chip-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span className="delibot-chip-label">{chip}</span>
              </div>
              {idx < array.length - 1 && <div className="delibot-chip-divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 4. SECTION 2: THE PROBLEM - "THE VERTICAL GAP" (LIGHT GREY BACKGROUND) */}
      <section 
        id="the-problem" 
        ref={problemRef}
        className={`delibot-section-light delibot-animated-section ${visibleSections['the-problem'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
      >
        <div className="delibot-section-header">
          <div className="dcam-tag-container" style={{ justifyContent: 'center' }}>
            <span className="dcam-tag-line"></span>
            <span className="dcam-tag-text">THE PROBLEM</span>
          </div>
          <h2 className="delibot-section-title-dark">The <span className="delibot-title-red">Vertical Gap</span><span className="delibot-title-dot">.</span></h2>
          <p className="delibot-section-subtext-dark">
            Traditional AMRs are limited to single-floor operations. Elevators remain a barrier requiring human intervention, causing delays, safety risks, and operational inefficiencies.
          </p>
        </div>

        <div className="delibot-comparison-grid">
          {/* Left Column: Traditional AMR */}
          <div className="delibot-comparison-col delibot-col-traditional">
            <div>
              <div className="delibot-col-header">
                <h3 className="delibot-col-title" style={{ color: '#334155' }}>Traditional AMR</h3>
              </div>

              <div className="delibot-sec2-img-container">
                <img 
                  src={traditionalBotImg} 
                  alt="Traditional AMR stuck at elevator doors" 
                  className="delibot-sec2-card-img"
                />
              </div>

              <div className="delibot-timeline">
                <div className="delibot-timeline-item">
                  <div className="delibot-node">1</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text">Floor 3: Delivers on current floor only</span>
                  </div>
                </div>

                <div className="delibot-timeline-item">
                  <div className="delibot-node">2</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text">Elevator: Requires human to call elevator</span>
                  </div>
                </div>

                <div className="delibot-timeline-item">
                  <div className="delibot-node">3</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text">Floor 2: Cannot autonomously navigate to next floor</span>
                  </div>
                </div>

                <div className="delibot-timeline-item">
                  <div className="delibot-node">4</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text">Destination: Needs human navigation to complete delivery</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="delibot-col-banner delibot-banner-traditional">
              Multiple human interventions required at every transition point.
            </div>
          </div>

          {/* Center VS Badge */}
          <div className="delibot-vs-badge">VS</div>

          {/* Right Column: DeliBot */}
          <div className="delibot-comparison-col delibot-col-vdelibot">
            <div>
              <div className="delibot-col-header">
                <h3 className="delibot-col-title" style={{ color: '#FFFFFF' }}>DeliBot</h3>
              </div>

              <div className="delibot-sec2-img-container">
                <img 
                  src={delibotSec2Img} 
                  alt="DeliBot entering elevator autonomously" 
                  className="delibot-sec2-card-img"
                />
              </div>

              <div className="delibot-timeline">
                <div className="delibot-timeline-item">
                  <div className="delibot-node">1</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text" style={{ color: '#FFFFFF' }}>
                      Floor 3: Autonomously completes delivery on floor
                    </span>
                  </div>
                </div>

                <div className="delibot-timeline-item">
                  <div className="delibot-node">2</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text" style={{ color: '#FFFFFF' }}>
                      Elevator: Autonomously calls elevator and enters
                    </span>
                  </div>
                </div>

                <div className="delibot-timeline-item">
                  <div className="delibot-node">3</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text" style={{ color: '#FFFFFF' }}>
                      Floor 2: Autonomously exits and navigates to destination
                    </span>
                  </div>
                </div>

                <div className="delibot-timeline-item">
                  <div className="delibot-node">4</div>
                  <div className="delibot-timeline-content">
                    <span className="delibot-timeline-text" style={{ color: '#FFFFFF' }}>
                      Destination: End-to-end autonomous delivery completed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="delibot-col-banner delibot-banner-vdelibot">
              Zero human intervention. True end-to-end autonomous delivery.
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: CAPABILITIES (DARK BACKGROUND) */}
      <section 
        id="capabilities" 
        ref={capabilitiesRef}
        className={`delibot-section-dark delibot-animated-section ${visibleSections['capabilities'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
      >
        <div className="delibot-section-header">
          <div className="dcam-tag-container" style={{ justifyContent: 'center' }}>
            <span className="dcam-tag-line"></span>
            <span className="dcam-tag-text">CORE CAPABILITIES</span>
          </div>
          <h2 className="delibot-section-title-light">Built to <span className="delibot-title-red">Deliver</span>. Designed to <span className="delibot-title-red">Scale</span><span className="delibot-title-dot">.</span></h2>
          <p className="delibot-section-subtext-light">
            DeliBot combines advanced robotics, AI, and a modular architecture to deliver unmatched performance, reliability, and scalability for diverse applications.
          </p>
        </div>

        {/* Central Radial Layout around robot image */}
        <div className="delibot-radial-grid" ref={gridRef}>
          {/* ── 90-DEGREE ORTHOGONAL TECH SPEC HUD OVERLAY ── */}
          {connector && (() => {
            const { ox, oy, tx, ty, midX, w, h, isLeft, cardId } = connector;
            const pathD = `M ${ox},${oy} L ${midX},${oy} L ${midX},${ty} L ${tx},${ty}`;

            const specLabels = {
              1: 'SYS_01 // 360_LIDAR_DOME',
              2: 'SYS_02 // ELEV_ACTUATOR',
              3: 'SYS_03 // AI_SLAM_VISION',
              4: 'SYS_04 // SECURE_BAY_LOCK',
              5: 'SYS_05 // COMPUTE_CHASSIS',
              6: 'SYS_06 // MODULAR_MCU_BASE'
            };
            const labelText = specLabels[cardId];

            return (
              <svg
                key={cardId}
                className="delibot-connector-svg"
                viewBox={`0 0 ${w} ${h}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="dlbTechGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Ambient Glow Backdrop Line */}
                <path
                  d={pathD}
                  stroke="#E10600"
                  strokeWidth="3.5"
                  fill="none"
                  opacity="0.3"
                  filter="url(#dlbTechGlow)"
                />

                {/* 2. Main 90-Degree Crisp Orthogonal Spec Line */}
                <path
                  d={pathD}
                  stroke="#E10600"
                  strokeWidth="1.6"
                  fill="none"
                  className="dlb-tech-line-main"
                />

                {/* 3. 90-Degree Corner Joint Nodes */}
                <circle cx={midX} cy={oy} r="2.5" fill="#E10600" />
                <circle cx={midX} cy={ty} r="2.5" fill="#E10600" />

                {/* 4. Origin Card Anchor (Square Tech Node) */}
                <rect
                  x={ox - (isLeft ? 0 : 6)}
                  y={oy - 3}
                  width="6"
                  height="6"
                  fill="#E10600"
                  className="dlb-tech-origin"
                />

                {/* 5. Precision Target HUD Reticle & Spec Tag */}
                <g className="dlb-tech-reticle">
                  {/* Crosshair Hairlines */}
                  <line x1={tx - 16} y1={ty} x2={tx + 16} y2={ty} stroke="#E10600" strokeWidth="1" />
                  <line x1={tx} y1={ty - 16} x2={tx} y2={ty + 16} stroke="#E10600" strokeWidth="1" />

                  {/* Center Target Focal Dot */}
                  <circle cx={tx} cy={ty} r="2.5" fill="#E10600" />

                  {/* Tech Spec Tag Badge */}
                  <g transform={`translate(${isLeft ? tx + 14 : tx - 138}, ${ty - 22})`}>
                    <rect
                      x="0"
                      y="0"
                      width="125"
                      height="18"
                      rx="3"
                      fill="rgba(15, 23, 42, 0.92)"
                      stroke="#E10600"
                      strokeWidth="0.8"
                    />
                    <text
                      x="7"
                      y="12"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="800"
                      fontFamily="var(--font-site)"
                      letterSpacing="0.05em"
                    >
                      {labelText}
                    </text>
                  </g>
                </g>
              </svg>
            );
          })()}


          {/* Left 3 Callouts */}
          <div className="delibot-radial-col">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                ref={cardRefCallbacks.current[id - 1]}
                className={`delibot-capability-card ${activeCard === id ? 'delibot-card-active' : ''}`}
                onMouseEnter={() => handleCardEnter(id)}
                onMouseLeave={handleCardLeave}
              >
                <div className="delibot-card-head">
                  <div className="delibot-card-icon-ring">{id}</div>
                  <h3 className="delibot-card-title">
                    {id === 1 ? '360° Perception' : id === 2 ? 'Elevator Integration' : 'AI-Powered Autonomy'}
                  </h3>
                </div>
                <p className="delibot-card-desc">
                  {id === 1 ? 'LiDAR + RGB cameras provide 360° environmental awareness.'
                   : id === 2 ? 'Robotic arm for elevator interaction enables seamless multi-floor delivery.'
                   : 'SLAM-based mapping, intelligent navigation, and human-aware movement.'}
                </p>
              </div>
            ))}
          </div>

          {/* Central Image Card */}
          <div className="delibot-radial-center">
            <div className={`delibot-sec3-img-container ${activeCard ? 'delibot-sec3-focused' : ''}`}>
              <img 
                ref={centerImgRef}
                src={delibotSec3Img} 
                alt="DeliBot Core Capabilities architecture" 
                className="delibot-sec3-center-img"
                style={(() => {
                  const zooms = {
                    1: 'scale(1.45) translate(-8%, 18%)',
                    2: 'scale(1.5)  translate(-14%, -6%)',
                    3: 'scale(1.45) translate(0%,   10%)',
                    4: 'scale(1.45) translate(12%,  -4%)',
                    5: 'scale(1.45) translate(10%, -20%)',
                    6: 'scale(1.45) translate(0%,  -20%)',
                  };
                  return activeCard
                    ? { transform: zooms[activeCard], filter: 'brightness(1.08)' }
                    : { transform: 'scale(1) translate(0,0)', filter: 'brightness(1)' };
                })()}
              />
            </div>
          </div>

          {/* Right 3 Callouts */}
          <div className="delibot-radial-col">
            {[4, 5, 6].map((id) => {
              const titles = { 4: 'Secure Delivery', 5: 'High-Performance Compute', 6: 'Modular & Scalable' };
              const descs  = {
                4: 'Lockable compartments, software authentication, and real-time alerts.',
                5: 'Robotics compute platform with dedicated MCUs for AI, control, and safety.',
                6: 'Adaptable architecture for different infrastructures and use cases.',
              };
              return (
                <div
                  key={id}
                  ref={cardRefCallbacks.current[id - 1]}
                  className={`delibot-capability-card ${activeCard === id ? 'delibot-card-active' : ''}`}
                  onMouseEnter={() => handleCardEnter(id)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="delibot-card-head">
                    <div className="delibot-card-icon-ring">{id}</div>
                    <h3 className="delibot-card-title">{titles[id]}</h3>
                  </div>
                  <p className="delibot-card-desc">{descs[id]}</p>
                </div>
              );
            })}
          </div>
        </div>


        {/* 5-Step Process Strip: How a delivery works */}
        <div className="delibot-process-strip">
          <h3 className="delibot-process-strip__title">How a Delivery Works</h3>
          <div className="delibot-process-steps">

            {[
              { img: delStep1Img, step: 'STEP 01', label: 'Order Placed',            alt: 'Mobile app order confirmation screen' },
              { img: delStep2Img, step: 'STEP 02', label: 'Robot Assigned',           alt: 'Fleet dashboard assigning DeliBot' },
              { img: delStep3Img, step: 'STEP 03', label: 'Autonomous Navigation',   alt: 'DeliBot navigating hallway corridor' },
              { img: delStep4Img, step: 'STEP 04', label: 'Secure Delivery',         alt: 'Recipient unlocking compartment via PIN' },
              { img: delStep5Img, step: 'STEP 05', label: 'Notifications',           alt: 'Real-time delivery notification alert' },
            ].map(({ img, step, label, alt }, idx, array) => (
              <div className={`delibot-process-step delibot-step-${idx + 1}`} key={step}>
                <div className="delibot-step-img-wrap">
                  <img src={img} alt={alt} className="delibot-step-img" />
                  {idx < array.length - 1 && (
                    <div className="delibot-step-arrow-badge" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E10600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="delibot-step-num">{step}</span>
                <span className="delibot-step-label">{label}</span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 6. SECTION 4: NATIVE ELEVATOR INTEGRATION (LIGHT BACKGROUND) */}
      <section 
        id="elevator-tech" 
        ref={elevatorTechRef}
        className={`delibot-section-light delibot-animated-section ${visibleSections['elevator-tech'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
      >
        <div className="delibot-section-header">
          <div className="dcam-tag-container" style={{ justifyContent: 'center' }}>
            <span className="dcam-tag-line"></span>
            <span className="dcam-tag-text">SIGNATURE CAPABILITY</span>
          </div>
          <h2 className="delibot-section-title-dark">Native <span className="delibot-title-red">Elevator Integration</span><span className="delibot-title-dot">.</span></h2>
          <p className="delibot-section-subtext-dark">Engineered to Interact. Designed to Deliver.</p>
        </div>

        <div className="delibot-elevator-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.7', margin: 0 }}>
              DeliBot's integrated, height-adjustable robotic arm enables seamless vertical mobility with precise, force-controlled button presses across all standard elevator panel heights.
            </p>

            <div className="delibot-highlight-card">
              <h3 className="delibot-highlight-title">Height-Adjustable Robotic Arm</h3>
              <ul className="delibot-checklist">
                <li className="delibot-checklist-item">
                  <span className="delibot-check-icon">✓</span>
                  Force-controlled actuation for safe button press
                </li>
                <li className="delibot-checklist-item">
                  <span className="delibot-check-icon">✓</span>
                  Precision alignment with elevator panel
                </li>
                <li className="delibot-checklist-item">
                  <span className="delibot-check-icon">✓</span>
                  Automatic retraction after interaction
                </li>
                <li className="delibot-checklist-item">
                  <span className="delibot-check-icon">✓</span>
                  Supports wide range of elevator configurations
                </li>
              </ul>
            </div>
          </div>

          <div className="delibot-sec4-hero-wrap">
            <img 
              src={deliSec4HeroImg} 
              alt="DeliBot robotic arm extended, pressing elevator button panel" 
              className="delibot-sec4-hero-img"
            />
          </div>
        </div>

        {/* 3-Step Mini Process with Hover Detail Overlays */}
        <div className="delibot-mini-process">
          {[
            {
              img: deliSec4Step1Img,
              title: '1. Detect & Align',
              badge: 'PERCEPTION PHASE',
              alt: 'Vision camera detecting elevator panel buttons',
              desc: 'RGB-D cameras scan elevator panels, calculating 3D spatial coordinates and aligning the robotic arm with millimeter precision.'
            },
            {
              img: deliSec4Step2Img,
              title: '2. Actuate',
              badge: 'ACTUATION PHASE',
              alt: 'Robotic arm force-controlled button press',
              desc: 'Height-adjustable end-effector extends with closed-loop force control to safely press targeted floor buttons without panel wear.'
            },
            {
              img: deliSec4Step3Img,
              title: '3. Transit',
              badge: 'NAVIGATION PHASE',
              alt: 'DeliBot riding inside elevator cabin',
              desc: 'DeliBot monitors cabin door states, boards alongside human passengers, and executes multi-floor vertical travel autonomously.'
            }
          ].map(({ img, title, badge, alt, desc }) => (
            <div className="delibot-mini-card" key={title}>
              <div className="delibot-mini-img-wrap">
                <img src={img} alt={alt} className="delibot-mini-img" />
                <div className="delibot-mini-overlay">
                  <span className="delibot-mini-overlay-badge">{badge}</span>
                  <h4 className="delibot-mini-overlay-title">{title}</h4>
                  <p className="delibot-mini-overlay-desc">{desc}</p>
                </div>
              </div>
              <div className="delibot-mini-card-footer">
                <h4 className="delibot-mini-title">{title}</h4>
                <span className="delibot-mini-hover-hint">Hover to inspect &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* 5 Capability Badges Strip */}
        <div className="delibot-badges-strip">
          {[
            'Door Detection',
            'Cabin Occupancy',
            'Obstacle Avoidance',
            'Emergency Stop',
            'Auto Recovery'
          ].map((badge) => (
            <div key={badge} className="delibot-capability-badge">
              <span className="delibot-badge-circle">✓</span>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SECTION 6: ENTERPRISE INTEGRATION (BLACK BACKGROUND) */}
      <section 
        id="industries" 
        ref={industriesRef}
        className={`delibot-section-dark delibot-animated-section ${visibleSections['industries'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
      >
        <div className="delibot-section-header">
          <div className="dcam-tag-container" style={{ justifyContent: 'center' }}>
            <span className="dcam-tag-line"></span>
            <span className="dcam-tag-text">DEEP INFRASTRUCTURE</span>
          </div>
          <h2 className="delibot-section-title-light"><span className="delibot-title-red">Enterprise</span> Integration<span className="delibot-title-dot">.</span></h2>
        </div>

        {/* 4 Industries Cards Grid (2x2 Layout with Hover Details) */}
        <div className="delibot-industries-grid-2x2">
          {[
            { 
              img: deliEnSec1Img, 
              title: 'Hospitals',       
              alt: 'DeliBot delivering medical supplies in hospital corridor',
              desc: 'Autonomous delivery of pharmaceuticals, lab specimens, and sterile surgical tools across multi-floor medical facilities with zero contamination risk.'
            },
            { 
              img: deliEnSec2Img, 
              title: 'Smart Buildings', 
              alt: 'DeliBot navigating corporate office tower',
              desc: 'Multi-floor document, mail, and package dispatch across high-rise corporate office towers via autonomous elevator button interaction.'
            },
            { 
              img: deliEnSec3Img, 
              title: 'Airports',        
              alt: 'DeliBot autonomous airport terminal logistics',
              desc: 'Advanced sensor and perception system combination to navigate unpredictably moving, dense passenger crowds safely.'
            },
            { 
              img: deliSec4Step2Img,
              title: 'Hotels',
              alt: 'DeliBot operating an elevator for autonomous hotel delivery',
              desc: 'Round-the-clock delivery of guest amenities, room-service items, and luggage support across hotel floors through autonomous elevator interaction.'
            },
          ].map(({ img, title, alt, desc }) => (
            <div className="delibot-usecase-card-2x2" key={title}>
              <div className="delibot-usecase-img-wrap-2x2">
                <img src={img} alt={alt} className="delibot-usecase-img" />
                <div className="delibot-usecase-overlay">
                  <span className="delibot-usecase-badge">ENTERPRISE USE CASE</span>
                  <h4 className="delibot-usecase-overlay-title">{title}</h4>
                  <p className="delibot-usecase-desc">{desc}</p>
                </div>
              </div>
              <div className="delibot-usecase-card-footer">
                <h3 className="delibot-usecase-title">{title}</h3>
                <span className="delibot-usecase-hover-hint">Hover to inspect &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SECTION: CONTACT CTA (LIGHT BACKGROUND) */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`delibot-contact-v2-section delibot-contact-v2-section--light delibot-animated-section ${visibleSections['contact'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
      >
        <div className="delibot-contact-v2-container">
          {/* Left Column: Get In Touch + Headline + Contact Details + Action Buttons */}
          <div className="delibot-contact-v2-left">
            <div className="dcam-tag-container">
              <span className="dcam-tag-line"></span>
              <span className="dcam-tag-text">GET IN TOUCH</span>
            </div>
            <h2 className="delibot-contact-v2-title">
              Ready to deploy <span className="delibot-title-red">autonomous delivery</span> on-site?<span className="delibot-title-dot">.</span>
            </h2>

            <div className="delibot-contact-v2-details">
              <div className="delibot-contact-v2-item">
                <svg className="delibot-contact-v2-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:sales@zmd.tech" className="delibot-contact-v2-link">sales@zmd.tech</a>
              </div>

              <div className="delibot-contact-v2-item">
                <svg className="delibot-contact-v2-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="delibot-contact-v2-text">
                  Sy. No. 65/6, Nallurahalli Main Road, Mourya Building, near HP Petrol Pump, Whitefield, Bengaluru, Karnataka 560066
                </span>
              </div>
            </div>

            <div className="delibot-contact-v2-actions">
              <a href="mailto:sales@zmd.tech" className="delibot-v2-btn-white">
                Request a Quote <span aria-hidden="true">&rarr;</span>
              </a>
              <button
                type="button"
                className="delibot-v2-btn-outline"
                onClick={() => setIsContactModalOpen(true)}
              >
                Download Datasheet
              </button>
            </div>
          </div>

          {/* Right Column: Final Banner Image */}
          <div className="delibot-contact-v2-right">
            <div className="delibot-banner-img-wrap">
              <img 
                src={deliFBanImg} 
                alt="DeliBot autonomous delivery in modern corporate building lobby" 
                className="delibot-banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECTION: FREQUENTLY ASKED QUESTIONS (DARK BACKGROUND) */}
      <section 
        id="faqs" 
        ref={faqsRef}
        className={`delibot-section-dark delibot-animated-section ${visibleSections['faqs'] ? 'delibot-section-visible' : 'delibot-section-exit'}`}
        style={{ padding: '6rem 2rem' }}
      >
        <div className="delibot-section-header">
          <div className="dcam-tag-container" style={{ justifyContent: 'center' }}>
            <span className="dcam-tag-line"></span>
            <span className="dcam-tag-text">SUPPORT &amp; HELPDESK</span>
          </div>
          <h2 className="delibot-section-title-light">Frequently Asked <span className="delibot-title-red">Questions</span><span className="delibot-title-dot">.</span></h2>
          <p className="delibot-section-subtext-light">
            Common questions regarding deployment, integration, and technical operation.
          </p>
        </div>

        <div className="delibot-faq-accordion">
          {[
            {
              q: 'How does DeliBot navigate across multiple floors without elevator API integration?',
              a: "DeliBot features an integrated, height-adjustable robotic arm with force-controlled actuation and vision-guided alignment. It can physically press elevator panel buttons just like a human operator, eliminating the need for expensive elevator hardware modifications or proprietary API integrations."
            },
            {
              q: 'Can the robot be customized without robotic arm integration?',
              a: "Yes. In buildings equipped with IoT-enabled elevator systems, DeliBot can communicate directly with the elevator through secure network APIs instead of using the robotic arm. This enables the robot to request elevator calls and select destination floors automatically, reducing delivery cycle time while maintaining seamless multi-floor autonomous operation wherever compatible infrastructure is available."
            },
            {
              q: 'What payload capacity and security features are supported?',
              a: "DeliBot offers up to 60 Liters / 30 kg cargo capacity across secure, lockable internal compartments. Deliveries are protected via software-authenticated locking mechanisms, PIN code verification on a 7-inch interactive display, and optional RFID/NFC scanning for authorized recipients."
            },
            {
              q: 'How does DeliBot handle obstacles, crowded hallways, and human safety?',
              a: "Equipped with 360° LiDAR perception, 5 RGB-D depth vision cameras, and micro-second ROS2 safety control loops, DeliBot dynamically plans paths around pedestrians, temporary obstacles, and tight doorways with zero collisions and human-aware motion planning."
            },
            {
              q: 'How is the robot fleet managed and monitored?',
              a: "DeliBot connects to our Fleet Management System via Wi-Fi and 5G/LTE networks. Facility managers gain real-time telemetry, live 2D/3D floor map tracking, mission dispatching, analytics, and automated over-the-air (OTA) software updates."
            },
            {
              q: 'What is the battery life and charging process?',
              a: "DeliBot delivers up to 10 hours of continuous operational runtime on a single charge. When battery levels drop or missions complete, the robot autonomously returns to its compact self-docking charging station."
            },
            {
              q: 'Can it operate outdoors?',
              a: 'The current focus is only for indoor autonomous operation. Outdoor operation depends on very specific robot configurations, environmental conditions, and deployment requirements for which DeliBot is not designed.'
            },
            {
              q: 'Does it need a human operator?',
              a: 'Routine missions are intended to be autonomous. Human intervention may be required in exceptional situations, such as an inaccessible route, unusual obstruction, or facility-specific access issue.'
            }
          ].map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`delibot-faq-item ${isOpen ? 'delibot-faq-open delibot-accordion-expanded' : ''}`}
                onMouseEnter={() => setOpenFaq(index)}
                onMouseLeave={() => setOpenFaq(-1)}
                onFocus={() => setOpenFaq(index)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setOpenFaq(-1);
                }}
              >
                <button
                  type="button"
                  className="delibot-faq-question"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{faq.q}</span>
                  <span className="delibot-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="delibot-accordion-collapse-wrapper">
                  <div className="delibot-accordion-collapse-inner">
                    <div className="delibot-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT REQUEST MODAL */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
