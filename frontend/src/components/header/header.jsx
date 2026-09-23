import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import zmdLogo from '../../assets/images/zmd-logo-tm-white.png';
import zmdLogoWebp from './zmd_logo.webp';
import MobileHeader from './mobile_header';
import './header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastStory, setIsPastStory] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('camera');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const useGlass = isHome && !isPastStory;
  const logoSrc = useGlass ? zmdLogoWebp : zmdLogo;

  const solutionsList = [
    { id: 'airports', num: '01', title: 'Airports', tag: 'Aviation', desc: 'Predictive Queue SLA & Flight Operations' },
    { id: 'cities', num: '02', title: 'Cities', tag: 'Smart Cities', desc: 'Corridor Congestion & Enforcement' },
    { id: 'hospitals', num: '03', title: 'Hospitals', tag: 'Healthcare', desc: 'ED Flow & Bed Turnover' },
    { id: 'retail', num: '04', title: 'Retail', tag: 'Commerce', desc: 'On-Shelf Availability & Billing Leakage' },
    { id: 'agritech', num: '05', title: 'Agritech', tag: 'Agriculture', desc: 'ZMD Field Kit & Soil Analytics' },
    { id: 'cinemas', num: '06', title: 'Cinemas', tag: 'Entertainment', desc: 'Interval Readiness & Turnaround Clock' },
    { id: 'venues', num: '07', title: 'Venues & Campuses', tag: 'Venues', desc: 'Gate & Attraction Metering' },
    { id: 'manufacturing', num: '08', title: 'Manufacturing', tag: 'Industrial', desc: 'Zone Safety & Stoppage Capture' },
    { id: 'education', num: '09', title: 'Education', tag: 'Academic', desc: 'Lecture Capture & Course TA' }
  ];

  useLayoutEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 10);
      const closing = isHome && document.getElementById('home-solutions');
      const bar = document.querySelector(window.matchMedia('(max-width: 992px)').matches
        ? '.mobile-top-bar' : '.header-top-bar');
      // Switch as the light section reaches the fixed navigation, including
      // chapter jumps, restored scroll positions and reverse scrolling.
      setIsPastStory(Boolean(closing && bar
        && closing.getBoundingClientRect().top <= bar.getBoundingClientRect().bottom));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    const home = isHome && document.getElementById('home');
    if (home) observer.observe(home);
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [isHome, location.key]);

  useEffect(() => {
    setProductsOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  const navigateAndScroll = (sectionId) => {
    setProductsOpen(false);
    setSolutionsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCardClick = (path) => {
    setProductsOpen(false);
    setSolutionsOpen(false);
    navigate(path);
  };

  const handleSolutionClick = (id) => {
    setProductsOpen(false);
    setSolutionsOpen(false);
    if (location.pathname !== '/solutions') {
      navigate(`/solutions#${id}`);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Separate Mobile Header for devices under 992px */}
      <MobileHeader useGlass={useGlass} />

      {/* Desktop Header for screens 992px and wider */}
      <header 
        className={`zmd-header desktop-header ${isHome ? 'home-header' : ''} ${useGlass ? 'home-glass' : ''} ${isScrolled ? 'scrolled' : ''}`}
        onMouseLeave={() => {
          setProductsOpen(false);
          setSolutionsOpen(false);
        }}
      >
        <div className="header-top-bar">
          {/* Brand Logo - Redirects to Home Page */}
          <Link 
            to="/" 
            className="header-brand"
            onClick={(e) => {
              e.preventDefault();
              navigateAndScroll('home');
            }}
          >
            <img src={logoSrc} alt="ZMD Logo" className="header-logo-img" />
          </Link>

          {/* Center Navigation */}
          <nav className="header-nav">
            <ul className="nav-list">
              {/* Home Link */}
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateAndScroll('home');
                  }}
                >
                  Home
                </Link>
              </li>

              {/* Products Dropdown Trigger */}
              <li 
                className={`nav-item ${productsOpen ? 'active' : ''}`}
                onMouseEnter={() => {
                  setSolutionsOpen(false);
                  setProductsOpen(true);
                }}
              >
                <button 
                  className={`nav-link dropdown-toggle ${productsOpen ? 'active' : ''}`}
                  onClick={() => {
                    setSolutionsOpen(false);
                    setProductsOpen(!productsOpen);
                  }}
                  aria-expanded={productsOpen}
                >
                  Products
                  <svg className="dropdown-chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </li>

              {/* Edge AI Link */}
              <li className="nav-item">
                <Link 
                  to="/edge-ai" 
                  className={`nav-link ${location.pathname === '/edge-ai' ? 'active' : ''}`}
                  onClick={() => {
                    setProductsOpen(false);
                    setSolutionsOpen(false);
                  }}
                >
                  Edge AI
                </Link>
              </li>

              {/* Solutions Dropdown Trigger */}
              <li 
                className={`nav-item ${solutionsOpen || location.pathname === '/solutions' ? 'active' : ''}`}
                onMouseEnter={() => {
                  setProductsOpen(false);
                  setSolutionsOpen(true);
                }}
              >
                <Link 
                  to="/solutions"
                  className={`nav-link dropdown-toggle ${solutionsOpen || location.pathname === '/solutions' ? 'active' : ''}`}
                  onClick={() => {
                    setProductsOpen(false);
                    setSolutionsOpen(false);
                  }}
                >
                  Solutions
                  <svg className="dropdown-chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Contact Button */}
          <div className="header-actions">
            <Link
              to="/contact"
              className={`btn-red-contact ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={() => {
                setProductsOpen(false);
                setSolutionsOpen(false);
              }}
            >
              <span>LET’S CONNECT</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* FULLSCREEN MEGA MENU OVERLAY FOR DESKTOP */}
        {productsOpen && (
          <div 
            className="mega-menu-overlay"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <div className="mega-menu-container">
              
              <div className="mega-menu-top">
                <span className="categories-label">
                  <span className="red-dot"></span> PRODUCT CATEGORIES
                </span>
                <span className="categories-subtext">
                  Click or hover over any section to explore available products
                </span>
              </div>

              <div className="mega-menu-grid">

                {/* 1. Camera Column Card - Clickable */}
                <div 
                  className={`mega-col ${activeCategory === 'camera' ? 'col-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory('camera')}
                  onClick={() => handleCardClick('/products/cam')}
                >
                  <div className="col-header">
                    <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <div className="col-title-group">
                      <h4 className="col-title">Camera</h4>
                      <span className="col-tag">VISION AI</span>
                    </div>
                  </div>
                  <div className="col-items">
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">AI Cameras</span>
                        <span className="badge-red">POPULAR</span>
                      </div>
                      <p className="card-desc">Dual-Lens &amp; thermal spatial sensing cameras</p>
                    </div>
                  </div>
                </div>

                {/* 2. Sensors Column Card - Clickable */}
                <div 
                  className={`mega-col ${activeCategory === 'sensors' ? 'col-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory('sensors')}
                  onClick={() => handleCardClick('/products/sensors')}
                >
                  <div className="col-header">
                    <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    <div className="col-title-group">
                      <h4 className="col-title">Sensors</h4>
                      <span className="col-tag">IOT SENSORS</span>
                    </div>
                  </div>
                  <div className="col-items">
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">Safety Band</span>
                        <span className="badge-red-outline">WEARABLE</span>
                      </div>
                      <p className="card-desc">Worker health &amp; safety telemetry</p>
                    </div>
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">Parking Sensor</span>
                        <span className="badge-red-outline">IOT</span>
                      </div>
                      <p className="card-desc">Real-time occupancy &amp; space management</p>
                    </div>
                  </div>
                </div>

                {/* 3. Server Column Card - Clickable */}
                <div 
                  className={`mega-col ${activeCategory === 'server' ? 'col-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory('server')}
                  onClick={() => handleCardClick('/products/server')}
                >
                  <div className="col-header">
                    <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="8" rx="2"/>
                      <rect x="2" y="14" width="20" height="8" rx="2"/>
                      <line x1="6" y1="6" x2="6.01" y2="6"/>
                      <line x1="6" y1="18" x2="6.01" y2="18"/>
                    </svg>
                    <div className="col-title-group">
                      <h4 className="col-title">Server</h4>
                      <span className="col-tag">EDGE COMPUTE</span>
                    </div>
                  </div>
                  <div className="col-items">
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">2U/2S Xeon Server</span>
                        <span className="badge-red-outline">ENTERPRISE</span>
                      </div>
                      <p className="card-desc">High-density dual-socket neural inferencing</p>
                    </div>
                  </div>
                </div>

                {/* 4. Edge Box Column Card - Clickable */}
                <div 
                  className={`mega-col ${activeCategory === 'edgebox' ? 'col-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory('edgebox')}
                  onClick={() => handleCardClick('/products/edge-box')}
                >
                  <div className="col-header">
                    <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="4" y="4" width="16" height="16" rx="2"/>
                      <rect x="9" y="9" width="6" height="6"/>
                      <line x1="9" y1="1" x2="9" y2="4"/>
                      <line x1="15" y1="1" x2="15" y2="4"/>
                      <line x1="9" y1="20" x2="9" y2="23"/>
                      <line x1="15" y1="20" x2="15" y2="23"/>
                      <line x1="20" y1="9" x2="23" y2="9"/>
                      <line x1="20" y1="15" x2="23" y2="15"/>
                      <line x1="1" y1="9" x2="4" y2="9"/>
                      <line x1="1" y1="15" x2="4" y2="15"/>
                    </svg>
                    <div className="col-title-group">
                      <h4 className="col-title">Edge Box</h4>
                      <span className="col-tag">COMPUTE BOX</span>
                    </div>
                  </div>
                  <div className="col-items">
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">Zevric Edge Box</span>
                        <span className="badge-red-outline">FEATURED</span>
                      </div>
                      <p className="card-desc">Compact neural model inferencing hardware</p>
                    </div>
                  </div>
                </div>

                {/* 5. Drone Column Card - Clickable */}
                <div 
                  className={`mega-col ${activeCategory === 'drone' ? 'col-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory('drone')}
                  onClick={() => handleCardClick('/products/drone')}
                >
                  <div className="col-header">
                    <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <div className="col-title-group">
                      <h4 className="col-title">Drone</h4>
                      <span className="col-tag">AERIAL AI</span>
                    </div>
                  </div>
                  <div className="col-items">
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">AI Surveillance Drone</span>
                        <span className="badge-red">HOT</span>
                      </div>
                      <p className="card-desc">Autonomous aerial perimeter tracking</p>
                    </div>
                  </div>
                </div>

                {/* 6. Delibot Column Card - Clickable */}
                <div 
                  className={`mega-col ${activeCategory === 'delibot' ? 'col-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory('delibot')}
                  onClick={() => handleCardClick('/products/delibot')}
                >
                  <div className="col-header">
                    <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="10" rx="2"/>
                      <circle cx="12" cy="5" r="2"/>
                      <path d="M12 7v4M8 16h.01M16 16h.01"/>
                    </svg>
                    <div className="col-title-group">
                      <h4 className="col-title">Delibot</h4>
                      <span className="col-tag">AUTONOMOUS</span>
                    </div>
                  </div>
                  <div className="col-items">
                    <div className="product-card">
                      <div className="card-head">
                        <span className="card-name">Delibot X1 Autonomous</span>
                        <span className="badge-red-outline">FEATURED</span>
                      </div>
                      <p className="card-desc">Indoor autonomous delivery robot</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mega-menu-bottom">
                <Link to="/products/server" className="view-all-link" onClick={() => setProductsOpen(false)}>
                  VIEW ALL ZMD PRODUCTS & HARDWARE →
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* FULLSCREEN MEGA MENU OVERLAY FOR SOLUTIONS */}
        {solutionsOpen && (
          <div 
            className="solutions-mega-menu-overlay"
            onMouseEnter={() => { setProductsOpen(false); setSolutionsOpen(true); }}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <div className="solutions-mega-menu-container">
              
              <div className="solutions-mega-menu-top">
                <div className="solutions-header-left">
                  <span className="solutions-categories-label">
                    <span className="solutions-red-dot"></span> 9 INDUSTRY USE CASES & SOLUTIONS
                  </span>
                  <span className="solutions-categories-subtext">
                    ZMD Edge Box deployments powered by ApexFlo real-time analytics
                  </span>
                </div>
              </div>

              <div className="solutions-mega-menu-grid">
                {solutionsList.map((sol) => (
                  <div 
                    key={sol.id}
                    className="sol-col-item"
                    onClick={() => handleSolutionClick(sol.id)}
                  >
                    <div className="sol-col-body">
                      <div className="sol-col-header">
                        <h4 className="sol-col-title">{sol.title}</h4>
                        <span className="sol-col-tag">{sol.tag}</span>
                      </div>
                      <p className="sol-col-desc">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="solutions-mega-menu-bottom">
                <Link 
                  to="/solutions" 
                  className="solutions-view-all-link"
                  onClick={() => { setProductsOpen(false); setSolutionsOpen(false); }}
                >
                  VIEW ALL ZMD SOLUTIONS →
                </Link>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
}
