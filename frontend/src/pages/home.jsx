import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HomeStory from '../components/home/HomeStory';
import MobileHomeStory from '../components/home/MobileHomeStory';
import PhysicalAIStack from '../components/home/PhysicalAIStack';
import '../assets/css/home.css';
import '../assets/css/home-desktop.css';
import '../assets/css/home-scenes.css';

export default function HomePage() {
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

      <PhysicalAIStack />
    </div>
  );
}
