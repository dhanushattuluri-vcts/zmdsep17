import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import zmdLogo from '../../assets/images/zmd-logo-tm-white.png';
import zmdLogoWebp from './zmd_logo.webp';
import './mobile_header.css';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const logoSrc = isHome ? zmdLogoWebp : zmdLogo;

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setProductsExpanded(false);
    setSolutionsExpanded(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigateAndScroll = (sectionId) => {
    setIsOpen(false);
    setProductsExpanded(false);
    setSolutionsExpanded(false);
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

  const handleProductClick = (path) => {
    setIsOpen(false);
    setProductsExpanded(false);
    setSolutionsExpanded(false);
    navigate(path);
  };

  const handleSolutionClick = (id) => {
    setIsOpen(false);
    setProductsExpanded(false);
    setSolutionsExpanded(false);
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
  const productCategories = [
    {
      id: 'cam',
      name: 'Camera',
      tag: 'VISION AI',
      desc: 'AI Cameras (Dual-Lens & Thermal)',
      path: '/products/cam',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      )
    },
    {
      id: 'sensors',
      name: 'Sensors',
      tag: 'IOT SENSORS',
      desc: 'Safety Band & Parking Sensor',
      path: '/products/sensors',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    },
    {
      id: 'server',
      name: 'Server',
      tag: 'EDGE COMPUTE',
      desc: '2U/2S Xeon Server',
      path: '/products/server',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/>
          <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
      )
    },
    {
      id: 'edgebox',
      name: 'Edge Box',
      tag: 'COMPUTE BOX',
      desc: 'Zevric Edge Box',
      path: '/products/edge-box',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      )
    },
    {
      id: 'drone',
      name: 'Drone',
      tag: 'AERIAL AI',
      desc: 'AI Surveillance Drone',
      path: '/products/drone',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      id: 'delibot',
      name: 'Delibot',
      tag: 'AUTONOMOUS',
      desc: 'Delibot X1 Autonomous',
      path: '/products/delibot',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4M8 16h.01M16 16h.01"/>
        </svg>
      )
    }
  ];

  return (
    <div className={`mobile-header-root ${isHome ? 'home-glass' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      {/* Mobile Top Bar */}
      <div className="mobile-top-bar">
        <Link 
          to="/" 
          className="mobile-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavigateAndScroll('home');
          }}
        >
          <img src={logoSrc} alt="ZMD Logo" className="mobile-logo-img" />
        </Link>

        {/* Animated Hamburger Button */}
        <button 
          className={`mobile-hamburger-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </button>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="mobile-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-Down Mobile Navigation Menu */}
      <nav className={`mobile-nav-panel ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            
            {/* 1. Home Link */}
            <li className="mobile-nav-item">
              <a 
                href="#home"
                className={`mobile-nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateAndScroll('home');
                }}
              >
                <span>Home</span>
                <svg className="nav-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
            </li>

            {/* 3. Products Accordion */}
            <li className="mobile-nav-item mobile-products-accordion">
              <button 
                className={`mobile-nav-link accordion-btn ${productsExpanded ? 'expanded' : ''}`}
                onClick={() => setProductsExpanded(!productsExpanded)}
              >
                <div className="accordion-label">
                  <span>Products</span>
                  <span className="badge-mobile-pill">6 Categories</span>
                </div>
                <svg className={`accordion-chevron ${productsExpanded ? 'rotate' : ''}`} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Accordion Content */}
              {productsExpanded && (
                <div className="mobile-products-grid">
                  {productCategories.map((cat) => (
                    <div 
                      key={cat.id}
                      className="mobile-product-card"
                      onClick={() => handleProductClick(cat.path)}
                    >
                      <div className="mobile-card-icon">
                        {cat.icon}
                      </div>
                      <div className="mobile-card-info">
                        <div className="mobile-card-header">
                          <span className="mobile-card-title">{cat.name}</span>
                          <span className="mobile-card-tag">{cat.tag}</span>
                        </div>
                        <p className="mobile-card-desc">{cat.desc}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mobile-view-all-box">
                    <button 
                      className="mobile-view-all-btn"
                      onClick={() => handleProductClick('/products/server')}
                    >
                      VIEW ALL HARDWARE →
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* 4. Edge AI Link */}
            <li className="mobile-nav-item">
              <Link 
                to="/edge-ai" 
                className={`mobile-nav-link ${location.pathname === '/edge-ai' ? 'active' : ''}`}
                onClick={() => {
                  setIsOpen(false);
                  setProductsExpanded(false);
                }}
              >
                <span>Edge AI</span>
                <svg className="nav-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            </li>

            {/* 5. Solutions Accordion */}
            <li className="mobile-nav-item mobile-products-accordion">
              <button 
                className={`mobile-nav-link accordion-btn ${solutionsExpanded ? 'expanded' : ''}`}
                onClick={() => setSolutionsExpanded(!solutionsExpanded)}
              >
                <div className="accordion-label">
                  <span>Solutions</span>
                  <span className="badge-mobile-pill">9 Use Cases</span>
                </div>
                <svg className={`accordion-chevron ${solutionsExpanded ? 'rotate' : ''}`} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Accordion Content */}
              {solutionsExpanded && (
                <div className="mobile-products-grid">
                  {solutionsList.map((sol) => (
                    <div 
                      key={sol.id}
                      className="mobile-product-card"
                      onClick={() => handleSolutionClick(sol.id)}
                    >
                      <div className="mobile-card-info">
                        <div className="mobile-card-header">
                          <span className="mobile-card-title">{sol.title}</span>
                          <span className="mobile-card-tag">{sol.tag}</span>
                        </div>
                        <p className="mobile-card-desc">{sol.desc}</p>
                      </div>
                    </div>
                  ))}

                  <div className="mobile-view-all-box">
                    <button 
                      className="mobile-view-all-btn"
                      onClick={() => handleProductClick('/solutions')}
                    >
                      VIEW ALL SOLUTIONS →
                    </button>
                  </div>
                </div>
              )}
            </li>

          </ul>

          {/* Mobile Footer Action / Contact CTA */}
          <div className="mobile-nav-footer">
            <Link
              to="/contact"
              className="mobile-contact-btn"
              onClick={() => {
                setIsOpen(false);
                setProductsExpanded(false);
                setSolutionsExpanded(false);
              }}
            >
              <span>LET’S CONNECT</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
