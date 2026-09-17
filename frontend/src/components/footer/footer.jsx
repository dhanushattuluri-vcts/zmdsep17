import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import zmdLogo from '../../assets/images/zmd-logo-tm-white.png';
import './footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      const sectionId = decodeURIComponent(location.hash.slice(1));
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.pathname, location.hash]);

  const resetPageScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const navigateAndScroll = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="zmd-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Left Column: Brand Info */}
          <div className="footer-brand-col">
            <Link
              to="/"
              className="footer-brand-logo"
              onClick={(event) => {
                event.preventDefault();
                navigateAndScroll('home');
              }}
            >
              <img src={zmdLogo} alt="ZMD Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">
              Engineering next-generation hardware, AI vision sensors, and high-density computing platforms.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn" className="social-link">
                <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="social-link">
                <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="footer-col">
            <h4 className="footer-col-title">PRODUCTS</h4>
            <ul className="footer-links">
              <li><Link to="/products/cam">Camera</Link></li>
              <li><Link to="/products/delibot">Delibot</Link></li>
              <li><Link to="/products/drone">Drone</Link></li>
              <li><Link to="/products/edge-box">Edge Box</Link></li>
              <li><Link to="/products/safety">Safety Band</Link></li>
              <li><Link to="/products/sensors">Sensors</Link></li>
              <li><Link to="/products/server">Server</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="footer-col">
            <h4 className="footer-col-title">SOLUTIONS</h4>
            <ul className="footer-links">
              <li><Link to="/solutions#usecase-airports">Airports</Link></li>
              <li><Link to="/solutions#usecase-cities">Cities</Link></li>
              <li><Link to="/solutions#usecase-hospitals">Hospitals</Link></li>
              <li><Link to="/solutions#usecase-retail">Retail</Link></li>
              <li><Link to="/solutions#usecase-manufacturing">Manufacturing</Link></li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#home"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateAndScroll('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <Link to="/edge-ai" onClick={resetPageScroll}>
                  Edge AI
                </Link>
              </li>
              <li>
                <Link to="/solutions" onClick={resetPageScroll}>
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={resetPageScroll}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Zettamicro Devices Inc. All rights reserved.
          </p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="divider">•</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
