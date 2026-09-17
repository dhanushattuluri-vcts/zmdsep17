import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/edge_ai.css';

export default function EdgeAIPage() {
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Trigger smooth entrance animation state
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 850);

    // 2. IntersectionObserver for ultra-smooth scroll reveals across all sections & cards
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const animElements = document.querySelectorAll(
      '.edge-hero, .edge-flow, .edge-layers, .edge-solutions, .edge-cta, .edge-flow__group, .edge-layer-card, .edge-sol-card'
    );
    animElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      animElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleSmoothNav = (path) => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(path);
    }, 360);
  };

  return (
    <div className={`edgeai-page ${isEntering ? 'edgeai-page--entering' : ''} ${isExiting ? 'edgeai-page--exiting' : ''}`}>
      {/* 1. HERO SECTION (Light) */}
      <section className="edge-hero">
        <div className="edge-hero__card">
          <div className="edge-hero__left">
            <div className="edge-hero__eyebrow-pill">
              + APEXFABRIC PHYSICAL AI PLATFORM • POWERING ZMD EDGE DEVICES
            </div>

            <h1 className="edge-hero__title">
              The Physical AI platform powering{' '}
              <span className="edge-hero__title-red">ZMD AI Solutions.</span>
            </h1>

            <p className="edge-hero__desc">
              ApexFabric (by ApexFlo) is the software layer that turns ZMD Edge Devices into intelligent systems — processing real-world video, sensor, and operational data where it's created and turning it into decisions in real time.
            </p>

            <div className="edge-hero__actions">
              <a href="#architecture" className="edge-hero__btn-primary">
                See How It Works
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <button 
                type="button" 
                onClick={() => handleSmoothNav('/solutions')} 
                className="edge-hero__btn-secondary"
              >
                Explore Solutions
              </button>
            </div>

            <div className="edge-hero__divider"></div>

            <div className="edge-hero__stats">
              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">30-40</span>
                </div>
                <p className="edge-hero__stat-label">Streams per Box</p>
              </div>

              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">&lt;50ms</span>
                </div>
                <p className="edge-hero__stat-label">Inference Latency</p>
              </div>

              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">4 Wks</span>
                </div>
                <p className="edge-hero__stat-label">Pilot to Live</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT FLOWS SECTION (Refined Enterprise Architecture) */}
      <section className="edge-flow" id="architecture">
        <div className="edge-flow__container">
          <div className="edge-flow__header edge-flow__entry--header">
            <span className="edge-flow__eyebrow">HOW IT FLOWS</span>
            <h2 className="edge-flow__title">
              From Edge Hardware to Intelligent Business Decisions
            </h2>
            <p className="edge-flow__subtitle">
              ZMD captures data at the edge. ApexFabric transforms it into intelligence through AI computing and orchestration. The resulting insights power enterprise-ready solutions.
            </p>
          </div>

          {/* 4 VISUALLY DIVIDED CONNECTED GROUPS */}
          <div className="edge-flow__groups-wrapper edge-flow__groups-wrapper--4col">
            
            {/* GROUP 0: DATA SOURCES (Standalone Input) */}
            <div className="edge-flow__group edge-flow__group--sources edge-flow__entry--g0">
              <div className="edge-flow__group-badge">DATA SOURCES</div>
              <div className="edge-flow__group-cards">
                
                {/* Step 1: Data Sources */}
                <div className="edge-flow__step-card edge-flow__step-card--stg0">
                  <div className="edge-flow__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                      <line x1="6" y1="6" x2="6.01" y2="6"/>
                      <line x1="6" y1="18" x2="6.01" y2="18"/>
                    </svg>
                  </div>
                  <h3 className="edge-flow__step-name">Data Sources</h3>
                  <p className="edge-flow__step-desc">CAMERAS · SENSORS · FEEDS</p>
                </div>

              </div>
              <div className="edge-flow__group-footer">Input Layer</div>
            </div>

            {/* Inter-Group Data Stream Connector 0 -> 1 */}
            <div className="edge-flow__inter-connector edge-flow__entry--g0">
              <svg viewBox="0 0 54 24" className="edge-flow__bridge-svg">
                <line x1="0" y1="12" x2="44" y2="12" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M40,6 L48,12 L40,18" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="0" cy="12" r="4" fill="#DC2626" className="edge-flow__bridge-particle" />
              </svg>
            </div>

            {/* GROUP 1: ZMD EDGE DEVICES (Hardware Layer) */}
            <div className="edge-flow__group edge-flow__group--hardware edge-flow__entry--g1">
              <div className="edge-flow__group-badge">ZMD EDGE DEVICES</div>
              <div className="edge-flow__group-cards">
                
                {/* Step 2: ZMD Edge Device */}
                <div className="edge-flow__step-card edge-flow__step-card--hw edge-flow__step-card--stg1">
                  <div className="edge-flow__icon-box edge-flow__icon-box--hw">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="2"/>
                      <rect x="9" y="9" width="6" height="6"/>
                      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
                    </svg>
                  </div>
                  <h3 className="edge-flow__step-name">ZMD Edge Device</h3>
                  <p className="edge-flow__step-desc">THE HARDWARE LAYER</p>
                </div>

              </div>
              <div className="edge-flow__group-footer">Hardware Layer</div>
            </div>

            {/* Inter-Group Data Stream Connector 1 -> 2 */}
            <div className="edge-flow__inter-connector edge-flow__entry--g1">
              <svg viewBox="0 0 54 24" className="edge-flow__bridge-svg">
                <line x1="0" y1="12" x2="44" y2="12" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M40,6 L48,12 L40,18" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="0" cy="12" r="4" fill="#DC2626" className="edge-flow__bridge-particle" />
              </svg>
            </div>

            {/* GROUP 2: APEXFABRIC PHYSICAL AI PLATFORM (Engine Focus) */}
            <div className="edge-flow__group edge-flow__group--platform edge-flow__entry--g2">
              <div className="edge-flow__group-badge edge-flow__group-badge--red">
                <span className="edge-flow__badge-pulse"></span>
                APEXFABRIC PHYSICAL AI PLATFORM
              </div>
              <div className="edge-flow__group-cards">
                
                {/* Step 3: ApexFabric */}
                <div className="edge-flow__step-card edge-flow__step-card--platform edge-flow__step-card--stg2">
                  <div className="edge-flow__icon-box edge-flow__icon-box--platform">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3 className="edge-flow__step-name">ApexFabric</h3>
                  <p className="edge-flow__step-desc">PHYSICAL AI PLATFORM</p>
                </div>

                {/* Inner Step Stream Connector 2 */}
                <div className="edge-flow__stream-connector">
                  <svg viewBox="0 0 40 24" className="edge-flow__connector-svg">
                    <line x1="0" y1="12" x2="40" y2="12" stroke="#FCA5A5" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="0" cy="12" r="3.5" fill="#DC2626" className="edge-flow__particle-dot" />
                  </svg>
                </div>

                {/* Step 4: AI Applications */}
                <div className="edge-flow__step-card edge-flow__step-card--stg2">
                  <div className="edge-flow__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  </div>
                  <h3 className="edge-flow__step-name">AI Applications</h3>
                  <p className="edge-flow__step-desc">DETECTION · TRACKING · ANALYTICS</p>
                </div>

                {/* Inner Step Stream Connector 3 */}
                <div className="edge-flow__stream-connector">
                  <svg viewBox="0 0 40 24" className="edge-flow__connector-svg">
                    <line x1="0" y1="12" x2="40" y2="12" stroke="#FCA5A5" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="0" cy="12" r="3.5" fill="#DC2626" className="edge-flow__particle-dot" />
                  </svg>
                </div>

                {/* Step 5: Insights & Actions */}
                <div className="edge-flow__step-card edge-flow__step-card--stg2">
                  <div className="edge-flow__icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"/>
                      <path d="M18 17V9"/>
                      <path d="M13 17V5"/>
                      <path d="M8 17v-3"/>
                    </svg>
                  </div>
                  <h3 className="edge-flow__step-name">Insights &amp; Actions</h3>
                  <p className="edge-flow__step-desc">ALERTS · AUTOMATION</p>
                </div>

              </div>
              <div className="edge-flow__group-footer edge-flow__group-footer--red">
                Compute • AI Inference • Analytics • Orchestration
              </div>
            </div>

            {/* Inter-Group Data Stream Connector 2 -> 3 */}
            <div className="edge-flow__inter-connector edge-flow__entry--g3">
              <svg viewBox="0 0 54 24" className="edge-flow__bridge-svg">
                <line x1="0" y1="12" x2="44" y2="12" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M40,6 L48,12 L40,18" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="0" cy="12" r="4" fill="#DC2626" className="edge-flow__bridge-particle" />
              </svg>
            </div>

            {/* GROUP 3: AI SOLUTIONS (Business Layer) */}
            <div className="edge-flow__group edge-flow__group--business edge-flow__entry--g3">
              <div className="edge-flow__group-badge">AI SOLUTIONS</div>
              <div className="edge-flow__group-cards">
                
                {/* Step 6: Business Outcomes */}
                <div className="edge-flow__step-card edge-flow__step-card--outcomes edge-flow__step-card--stg3">
                  <div className="edge-flow__icon-box edge-flow__icon-box--green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                  </div>
                  <h3 className="edge-flow__step-name">Business Outcomes</h3>
                  <p className="edge-flow__step-desc">EFFICIENCY · SAFETY · GROWTH</p>
                </div>

              </div>
              <div className="edge-flow__group-footer">Enterprise Solutions</div>
            </div>

          </div>

        </div>
      </section>


      {/* 4. SOLUTIONS OVERVIEW SECTION (Light Section) */}
      <section className="edge-solutions" id="solutions">
        <div className="edge-solutions__container">
          <div className="edge-solutions__header">
            <span className="edge-solutions__tag">ZMD AI SOLUTIONS</span>
            <h2 className="edge-solutions__title">Nine industries, one platform underneath</h2>
            <p className="edge-solutions__subtitle">
              Every solution below runs on the same foundation: ZMD Edge Devices in the field, ApexFabric (by ApexFlo) making sense of what they see.
            </p>
          </div>

          <div className="edge-solutions__grid">
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">01</span>
              <h4 className="edge-sol-card__title">Airports</h4>
              <p className="edge-sol-card__desc">Predictive queue SLAs, retail leakage recovery, and landside violation dispatch.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">02</span>
              <h4 className="edge-sol-card__title">Smart Cities</h4>
              <p className="edge-sol-card__desc">Junction congestion prediction, ANPR enforcement, and instant incident response.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">03</span>
              <h4 className="edge-sol-card__title">Healthcare</h4>
              <p className="edge-sol-card__desc">ED surge forecasting, bed turnover dispatch, and patient fall safety monitoring.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">04</span>
              <h4 className="edge-sol-card__title">Retail</h4>
              <p className="edge-sol-card__desc">Hourly stock-out tracking, planogram scoring, and POS leakage recovery.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">05</span>
              <h4 className="edge-sol-card__title">Agriculture</h4>
              <p className="edge-sol-card__desc">Multispectral crop health mapping, pest advisories, and moisture irrigation triggers.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">06</span>
              <h4 className="edge-sol-card__title">Cinemas</h4>
              <p className="edge-sol-card__desc">Interval concession surge triggers and automated auditorium turnaround clocks.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">07</span>
              <h4 className="edge-sol-card__title">Venues &amp; Campuses</h4>
              <p className="edge-sol-card__desc">Real-time gate crowd metering, live wait board automation, and shuttle staging.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">08</span>
              <h4 className="edge-sol-card__title">Manufacturing</h4>
              <p className="edge-sol-card__desc">Zone PPE safety discipline scoring and line micro-stoppage cause logging.</p>
            </div>
            <div className="edge-sol-card">
              <span className="edge-sol-card__num">09</span>
              <h4 className="edge-sol-card__title">Education</h4>
              <p className="edge-sol-card__desc">Automated lecture capture, course-grounded AI TA agents, and lab compliance.</p>
            </div>
          </div>

          <div className="edge-solutions__footnote">
            <strong>ZMD AI Solutions</strong> are powered by the ApexFabric platform (by ApexFlo), running on ZMD Edge Devices deployed on-site — one integrated system, purpose-built for each industry above.
          </div>

          <div className="edge-solutions__action">
            <button 
              type="button" 
              onClick={() => handleSmoothNav('/solutions')} 
              className="edge-hero__btn-primary"
            >
              View Detailed Solution Stacks
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER SECTION (BLACK / DARK SECTION) */}
      <section className="edge-cta edge-cta--dark">
        <div className="edge-cta__container">
          <h2 className="edge-cta__title">Hardware and platform, built as one.</h2>
          <p className="edge-cta__desc">
            See how ZMD Edge Devices and ApexFabric work together for your enterprise operations.
          </p>
          <div className="edge-cta__buttons">
            <button 
              type="button" 
              onClick={() => handleSmoothNav('/contact')} 
              className="edge-hero__btn-primary"
            >
              Talk to Sales
            </button>
            <button 
              type="button" 
              onClick={() => handleSmoothNav('/solutions')} 
              className="edge-hero__btn-secondary edge-hero__btn-secondary--dark"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
