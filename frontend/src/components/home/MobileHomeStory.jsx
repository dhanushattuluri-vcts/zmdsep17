import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pause, Play } from 'lucide-react';
import together from '../../assets/images/home-mobile/together.webp';
import sense from '../../assets/images/home-mobile/sense.webp';
import compute from '../../assets/images/home-mobile/compute.webp';
import act from '../../assets/images/home-mobile/act.webp';
import '../../assets/css/home-mobile.css';

// Four independent stills: the mobile homepage never loads a frame player.
const slides = [
  {
    id: 'together', label: 'All together', image: together,
    alt: 'ZMD cameras, sensors, edge computers, servers, drone and Delibot together',
    eyebrow: 'ONE CONNECTED HARDWARE ECOSYSTEM',
    title: ['One ecosystem.', 'Endless possibilities.'],
    description: 'From the first signal to the next action. All connected by ZMD.',
    actions: [{ label: 'Explore hardware', to: '#home-solutions' }, { label: 'Solutions', to: '/solutions' }],
  },
  {
    id: 'sense', label: 'Sense', image: sense,
    alt: 'ZMD AI cameras, wearable sensors and connected IoT devices',
    eyebrow: '01 / SENSE',
    title: ['See more.', 'Understand more.'],
    description: 'AI cameras, spatial sensing and connected IoT. Intelligence starts here.',
    actions: [{ label: 'AI cameras', to: '/products/cam' }, { label: 'Smart sensors', to: '/products/sensors' }],
  },
  {
    id: 'compute', label: 'Compute', image: compute,
    alt: 'Zevric edge computer and ZMD rack and tower AI servers',
    eyebrow: '02 / COMPUTE',
    title: ['Intelligence,', 'at every scale.'],
    description: 'Zevric edge systems and powerful AI servers. From signal to intelligence.',
    actions: [{ label: 'Zevric Edge Box', to: '/products/edge-box' }, { label: 'AI servers', to: '/products/server' }],
  },
  {
    id: 'act', label: 'Act', image: act,
    alt: 'ZMD autonomous drone beside the Delibot X1 delivery robot',
    eyebrow: '03 / ACT',
    title: ['Bring intelligence', 'to life.'],
    description: 'Autonomous drones and Delibot X1. In the air. On the ground.',
    actions: [{ label: 'AI drones', to: '/products/drone' }, { label: 'Delibot X1', to: '/products/delibot' }],
  },
];
const SLIDE_DURATION = 5500;
const wrapSlide = (index) => (index + slides.length) % slides.length;

export default function MobileHomeStory() {
  const sectionRef = useRef(null);
  const swipeRef = useRef(null);
  const navRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const playing = !paused && !reducedMotion && inView && pageVisible && !hovered;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= .3);
    }, { threshold: [0, .3] });
    observer.observe(sectionRef.current);
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setTimeout(() => setActive((index) => wrapSlide(index + 1)), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const selectSlide = (index) => {
    setPaused(true);
    setActive(wrapSlide(index));
  };

  const handleNavigationKey = (event, index) => {
    const next = { ArrowRight: wrapSlide(index + 1), ArrowLeft: wrapSlide(index - 1), Home: 0, End: slides.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectSlide(next);
    navRefs.current[next]?.focus();
  };

  const startSwipe = (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    swipeRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPaused(true);
  };

  const endSwipe = (event) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      selectSlide(active + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home-story"
      className="mobile-home-showcase"
      aria-roledescription="carousel"
      aria-labelledby="mobile-home-title"
      onFocusCapture={(event) => {
        if (!event.target.closest('[data-slideshow-toggle]')) setPaused(true);
      }}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="mobile-home-inner">
        <header className="mobile-home-intro">
          <p className="mobile-home-kicker"><span aria-hidden="true" />Hardware for Physical AI</p>
          <h1 id="mobile-home-title"><span>Sense.</span> <span>Compute.</span> <span>Act.</span></h1>
        </header>

        <div className="mobile-home-navigation" role="group" aria-label="Choose a hardware collection">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              ref={(element) => { navRefs.current[index] = element; }}
              type="button"
              aria-pressed={active === index}
              aria-controls="mobile-home-slides"
              onClick={() => selectSlide(index)}
              onKeyDown={(event) => handleNavigationKey(event, index)}
            >{slide.label}</button>
          ))}
        </div>

        <div className="mobile-home-slides" id="mobile-home-slides">
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className={`mobile-home-slide${active === index ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
              aria-hidden={active !== index}
              inert={active !== index}
            >
              <div
                className="mobile-home-visual"
                onPointerDown={startSwipe}
                onPointerUp={endSwipe}
                onPointerCancel={() => { swipeRef.current = null; }}
              >
                <img src={slide.image} alt={slide.alt} width="1200" height="675" decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} draggable="false" />
                <span className="mobile-home-image-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} <i /> 04</span>
              </div>
              <div className="mobile-home-copy">
                <p className="mobile-home-eyebrow">{slide.eyebrow}</p>
                <h2>{slide.title.map((line) => <span key={line}>{line}</span>)}</h2>
                <p className="mobile-home-description">{slide.description}</p>
                <div className="mobile-home-actions">
                  {slide.actions.map(({ label, to }, actionIndex) => {
                    const className = `mobile-home-action${actionIndex === 0 ? ' is-primary' : ''}`;
                    const content = <>{label}<ArrowRight size={16} aria-hidden="true" /></>;
                    return to.startsWith('#')
                      ? <a key={to} href={to} className={className}>{content}</a>
                      : <Link key={to} to={to} className={className}>{content}</Link>;
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mobile-home-controls">
          <div className="mobile-home-indicators" role="group" aria-label="Slide navigation">
            {slides.map((slide, index) => (
              <button key={slide.id} type="button" aria-label={`Show ${slide.label}`} aria-current={active === index ? 'true' : undefined} onClick={() => selectSlide(index)}>
                <span className="mobile-home-indicator"><span
                  key={`${active}-${playing}`}
                  className={playing && active === index ? 'is-playing' : ''}
                  style={{ '--slide-duration': `${SLIDE_DURATION}ms` }}
                /></span>
              </button>
            ))}
          </div>
          {!reducedMotion && <button className="mobile-home-playback" type="button" data-slideshow-toggle aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused((value) => !value)}>
            {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            <span>{paused ? 'Play' : 'Pause'}</span>
          </button>}
        </div>
        <p className="mobile-home-status" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">{slides[active].label}, slide {active + 1} of {slides.length}</p>
      </div>
    </section>
  );
}
