import React, { useEffect, useRef, useState } from 'react';
import HomeHeadline from './HomeHeadline';
import PhaseTitle from './PhaseTitle';
import { HOME_FRAMES, STORY_CHAPTER_COUNT } from '../../pages/homeData';
import { STORY_CHAPTERS, STORY_CONFIG } from './storyConfig';
import { createStoryController } from './storyController';

function ChapterCopy({ chapter, index, active = true, staticMode = false }) {
  const Heading = index === 0 ? 'h1' : 'h2';
  return (
    <article className={`home-scene-copy home-scene-${chapter.scene} ${active ? 'is-active' : ''}`} data-chapter={index} data-scene-copy={staticMode ? undefined : index} aria-hidden={!active}
      style={{ '--copy-x': chapter.x, '--copy-width': chapter.width, '--copy-align': chapter.align, '--copy-enter-x': chapter.enterX }}>
      <p className="home-scene-eyebrow"><span aria-hidden="true">{chapter.phase || 'ZMD'}</span>{chapter.eyebrow}</p>
      {chapter.phase ? <PhaseTitle chapter={chapter} /> : <Heading><HomeHeadline chapter={chapter} /></Heading>}
      <div className="home-scene-caption">
        {chapter.tagline && <p className="home-scene-tagline">{chapter.tagline}</p>}
        <p className="home-scene-description">{chapter.description}</p>
        {chapter.chips.length > 0 && <div className="home-scene-chips" aria-label={`${chapter.label} capabilities`}>{chapter.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>}
      </div>
      {staticMode && <img className="home-static-image" src={HOME_FRAMES[chapter.checkpoint]} alt={`${chapter.label} hardware in the ZMD ecosystem`} loading={index === 0 ? 'eager' : 'lazy'} />}
    </article>
  );
}

export default function HomeStory({ controllerRef }) {
  const storyRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [failed, setFailed] = useState(false);
  const staticMode = reduced || failed;
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (staticMode) return undefined;
    const controller = createStoryController({ story: storyRef.current, canvas: canvasRef.current, onChapter: setActiveChapter, onFailure: () => setFailed(true) });
    controllerRef.current = controller;
    return () => { controller.dispose(); controllerRef.current = null; };
  }, [staticMode, controllerRef]);
  const select = (index) => {
    if (!staticMode) controllerRef.current?.select(index);
    else document.getElementById(index === STORY_CHAPTER_COUNT ? 'home-solutions' : `home-static-${index}`)?.scrollIntoView({ behavior: 'instant' });
  };
  if (staticMode) return (
    <section className="home-static-story" aria-label="ZMD hardware story">
      <nav className="home-static-navigation" aria-label="Homepage chapters">{STORY_CHAPTERS.map((chapter, index) => <button key={chapter.label} onClick={() => select(index)}>{chapter.label}</button>)}</nav>
      {STORY_CHAPTERS.slice(0, STORY_CHAPTER_COUNT).map((chapter, index) => <div id={`home-static-${index}`} key={chapter.label}><ChapterCopy chapter={chapter} index={index} staticMode /></div>)}
    </section>
  );
  return (
    <section ref={storyRef} className="home-desktop-story" id="home-story" aria-label="ZMD hardware product story" style={{ '--copy-duration': `${STORY_CONFIG.TEXT_DURATION_MS}ms` }}>
      <div className="home-desktop-stage">
        <div className="home-scene-media" aria-hidden="true"><img src={HOME_FRAMES[0]} alt="" fetchPriority="high" className="home-opening-frame" /><canvas ref={canvasRef} /></div>
        {STORY_CHAPTERS.slice(0, STORY_CHAPTER_COUNT).map((chapter, index) => <ChapterCopy key={chapter.label} chapter={chapter} index={index} active={index === Math.min(activeChapter, STORY_CHAPTER_COUNT - 1)} />)}
        <nav className="home-story-controls" aria-label="Homepage chapters">
          <div className="home-story-current" aria-live="polite" aria-atomic="true"><span>{String(activeChapter + 1).padStart(2, '0')}<span className="home-chapter-total"> / {String(STORY_CHAPTERS.length).padStart(2, '0')}</span></span><strong>{STORY_CHAPTERS[activeChapter].label}</strong></div>
          <div className="home-story-segments">{STORY_CHAPTERS.map((chapter, index) => <button key={chapter.label} type="button" aria-label={`Go to chapter ${index + 1}: ${chapter.label}`} aria-current={index === activeChapter ? 'step' : undefined} onClick={() => select(index)} title={chapter.label}><span className="home-segment-track"><span data-segment-fill /></span></button>)}</div>
        </nav>
        <span className="home-story-instruction" aria-hidden="true">Scroll to explore <span>↓</span></span>
      </div>
    </section>
  );
}
