import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import darkLogo from '../header/zmd_logo.webp';
import lightLogo from '../../assets/images/zmd-logo-tm-white.png';

const products = [
  ['AI Cameras', '/products/cam'], ['Safety Band & Parking Sensor', '/products/sensors'],
  ['2U/2S Xeon Server', '/products/server'], ['Zevric Edge Box', '/products/edge-box'],
  ['AI Surveillance Drone', '/products/drone'], ['Delibot X1 Autonomous', '/products/delibot'],
];
const solutions = [
  ['Airports', 'airports'], ['Cities', 'cities'], ['Hospitals', 'hospitals'], ['Retail', 'retail'],
  ['Agritech', 'agritech'], ['Cinemas', 'cinemas'], ['Venues & Campuses', 'venues'],
  ['Manufacturing', 'manufacturing'], ['Education', 'education'],
];

export default function HomeNavigation({ controllerRef }) {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const lightRef = useRef(false);
  useEffect(() => {
    const update = () => {
      const button = triggerRef.current?.getBoundingClientRect();
      const foregroundAt = button ? button.top + button.height / 2 : 50;
      const next = (document.getElementById('home-solutions')?.getBoundingClientRect().top ?? Infinity) <= foregroundAt;
      if (next !== lightRef.current) { lightRef.current = next; setLight(next); }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const controller = controllerRef.current;
    const trigger = triggerRef.current;
    const root = document.documentElement;
    const oldOverflow = root.style.overflowY;
    controller?.setPaused(true);
    root.style.overflowY = 'hidden';
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      root.style.overflowY = oldOverflow;
      controller?.setPaused(false);
      trigger?.focus({ preventScroll: true });
    };
  }, [open, controllerRef]);
  const close = () => setOpen(false);
  const followLink = () => {
    close();
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };
  const trapFocus = (event) => {
    if (event.key !== 'Tab') return;
    const items = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const home = (event) => {
    event.preventDefault();
    close();
    window.setTimeout(() => {
      if (controllerRef.current) controllerRef.current.select(0);
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
  };
  return (
    <>
      <header className={`home-navigation ${light ? 'on-light' : ''}`}>
        <Link to="/" className="home-brand" aria-label="ZMD home" onClick={home}><img className={light ? 'home-logo-light' : 'home-logo-dark'} src={light ? lightLogo : darkLogo} alt="ZMD — Zettamicro Devices" /></Link>
        <button ref={triggerRef} className="home-menu-trigger" type="button" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="home-navigation-dialog" onClick={() => { controllerRef.current?.setPaused(true); setOpen(true); }}><span /><span /><span /></button>
      </header>
      <dialog ref={dialogRef} id="home-navigation-dialog" className="home-navigation-dialog" aria-label="Main navigation" onKeyDown={trapFocus} onCancel={(event) => { event.preventDefault(); close(); }}>
        <div className="home-menu-top">
          <Link to="/" className="home-brand" onClick={home}><img className="home-logo-light" src={lightLogo} alt="ZMD home" /></Link>
          <button ref={closeRef} type="button" className="home-menu-close" onClick={close} aria-label="Close navigation menu"><span>Close</span><span aria-hidden="true">×</span></button>
        </div>
        <div className="home-menu-content">
          <nav className="home-menu-primary" aria-label="Main destinations">{[['Home', '/', home], ['Products', '/products/cam'], ['Edge AI', '/edge-ai'], ['Solutions', '/solutions'], ['Contact', '/contact']].map(([label, path, handler], index) => <Link key={label} to={path} onClick={handler || followLink}><span>{String(index + 1).padStart(2, '0')}</span>{label}<span aria-hidden="true">↗</span></Link>)}</nav>
          <div className="home-menu-directory">
            <nav aria-label="All products"><h2>Products</h2>{products.map(([label, path]) => <Link key={path} to={path} onClick={followLink}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>
            <nav aria-label="Industry solutions"><h2>Solutions</h2>{solutions.map(([label, id]) => <Link key={id} to={`/solutions#${id}`} onClick={followLink}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>
          </div>
        </div>
        <div className="home-menu-bottom"><span>Hardware for Physical AI</span><span>Sense · Compute · Act</span></div>
      </dialog>
    </>
  );
}
