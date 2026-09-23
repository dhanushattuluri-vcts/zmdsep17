import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHeadline from '../components/home/HomeHeadline';
import HomeStory from '../components/home/HomeStory';
import MobileHomeStory from '../components/home/MobileHomeStory';
import { HOME_CHAPTERS, HOME_FRAMES } from './homeData';
import '../assets/css/home.css';
import '../assets/css/home-desktop.css';
import '../assets/css/home-scenes.css';

export default function HomePage() {
  const solutions = HOME_CHAPTERS.at(-1);
  const controllerRef = useRef(null);
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (!desktop) return undefined;
    document.documentElement.classList.add('home-desktop-active');
    return () => document.documentElement.classList.remove('home-desktop-active');
  }, [desktop]);

  return (
    <div className="hmpg-home-page" id="home">
      {desktop ? <HomeStory controllerRef={controllerRef} /> : <MobileHomeStory />}

      <section className="hmpg-closing" id="home-solutions" aria-labelledby="home-solutions-title">
        <div className="hmpg-closing-orbit hmpg-closing-orbit-one" aria-hidden="true" />
        <div className="hmpg-closing-orbit hmpg-closing-orbit-two" aria-hidden="true" />

        <div className="hmpg-closing-inner">
          <div className="hmpg-closing-copy">
            <span className="hmpg-closing-number">{solutions.number}</span>
            <p className="hmpg-closing-eyebrow">{solutions.eyebrow}</p>
            <h2 id="home-solutions-title"><HomeHeadline chapter={solutions} /></h2>
            <p>{solutions.description}</p>

            <div className="hmpg-closing-actions">
              <Link className="hmpg-button hmpg-button-primary" to="/contact">
                Partner with ZMD
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="hmpg-button hmpg-button-secondary" to="/products/cam">
                Explore products
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="hmpg-closing-visual">
            <img src={HOME_FRAMES[HOME_FRAMES.length - 1]} alt="ZMD cameras, sensors, edge systems, AI servers, drone and Delibot X1 together" />
            <div className="hmpg-closing-visual-label">
              <span>One hardware partner</span>
              <strong>Sense · Compute · Act</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
