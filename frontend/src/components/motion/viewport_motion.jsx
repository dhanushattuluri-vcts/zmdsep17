import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CARD_TOKEN = /(?:^|[-_])(card|tile|panel|feature|item)$/i;

function isMotionCard(element) {
  return [...element.classList].some((name) => CARD_TOKEN.test(name));
}

/** Adds reversible viewport motion to every route without changing page markup. */
export default function ViewportMotion() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = [...document.querySelectorAll('main section')];
    const cards = [];

    sections.forEach((section, index) => {
      section.dataset.motionSection = '';
      section.dataset.motionStyle = ['rise', 'sweep', 'depth', 'glide'][index % 4];
      section.style.setProperty('--motion-order', index % 4);
      section.querySelectorAll('[class]').forEach((element) => {
        // Accordions manage their own height; do not apply a lifting transform
        // to their rows, which can make surrounding sections appear to jump.
        if (!isMotionCard(element) || element.classList.contains('delibot-faq-item')) return;
        element.dataset.motionCard = '';
        element.style.setProperty('--motion-card-order', cards.length % 8);
        cards.push(element);
      });
    });

    if (reducedMotion) {
      [...sections, ...cards].forEach((element) => element.classList.add('is-in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-in-view', entry.isIntersecting));
    }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.12 });
    [...sections, ...cards].forEach((element) => observer.observe(element));

    const updateTilt = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      card.style.setProperty('--motion-rotate-x', `${-y * 2.5}deg`);
      card.style.setProperty('--motion-rotate-y', `${x * 2.5}deg`);
    };
    const resetTilt = (event) => {
      event.currentTarget.style.removeProperty('--motion-rotate-x');
      event.currentTarget.style.removeProperty('--motion-rotate-y');
    };
    cards.forEach((card) => {
      card.addEventListener('pointermove', updateTilt, { passive: true });
      card.addEventListener('pointerleave', resetTilt);
    });

    return () => {
      observer.disconnect();
      cards.forEach((card) => {
        card.removeEventListener('pointermove', updateTilt);
        card.removeEventListener('pointerleave', resetTilt);
      });
    };
  }, [pathname]);

  return null;
}
