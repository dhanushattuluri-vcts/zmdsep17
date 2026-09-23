import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HomeHeadline from './HomeHeadline';
import PhaseTitle from './PhaseTitle';
import SceneLinks from './SceneLinks';
import { updateSceneCopy } from './sceneMotion';
import {
  HOME_CHAPTERS,
  HOME_FRAMES,
  LAST_STORY_FRAME,
  MIN_GESTURE_FRAMES,
  STORY_CHAPTER_COUNT,
  advanceStoryTarget,
  chapterForFrame,
} from '../../pages/homeData';

const WHEEL_BURST_GAP = 170;
const WHEEL_INTENT_THRESHOLD = 10;
const SETTLE_DURATION = 700;
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [contenteditable="true"], [role="dialog"], .zmd-header, .mobile-header-root';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function normalizeWheelDelta(event) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

function hasScrollableParent(target, direction, boundary) {
  let element = target instanceof Element ? target : null;

  while (element && element !== boundary && element !== document.body) {
    const style = window.getComputedStyle(element);
    const canScroll = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1;

    if (canScroll) {
      const canMoveDown = direction > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1;
      const canMoveUp = direction < 0 && element.scrollTop > 1;
      if (canMoveDown || canMoveUp) return true;
    }

    element = element.parentElement;
  }

  return false;
}

function StaticStory({ onChapterSelect }) {
  return (
    <section className="hmpg-static-story" aria-label="ZMD hardware story">
      <nav className="hmpg-static-nav" aria-label="Homepage chapters">
        {HOME_CHAPTERS.map((chapter, index) => (
          <button key={chapter.label} type="button" onClick={() => onChapterSelect(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {chapter.label}
          </button>
        ))}
      </nav>

      {HOME_CHAPTERS.slice(0, STORY_CHAPTER_COUNT).map((chapter, index) => {
        const Heading = index === 0 ? 'h1' : 'h2';
        return (
          <article className="hmpg-static-panel" id={`home-chapter-${index}`} key={chapter.label}>
            <img src={HOME_FRAMES[chapter.checkpoint]} alt="" />
            <div className="hmpg-static-copy">
              <span className="hmpg-chapter-number">{chapter.number}</span>
              <p className="hmpg-eyebrow">{chapter.eyebrow}</p>
              {chapter.phase ? <PhaseTitle chapter={chapter} /> : <Heading><HomeHeadline chapter={chapter} /></Heading>}
              {chapter.tagline && <p className="home-scene-tagline">{chapter.tagline}</p>}
              <p className="hmpg-description">{chapter.description}</p>
              <SceneLinks chapter={chapter} />
              {chapter.chips.length > 0 && (
                <div className="hmpg-chips" aria-label={`${chapter.label} capabilities`}>
                  {chapter.chips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default function HomeStory() {
  const storyRef = useRef(null);
  const stageRef = useRef(null);
  const mediaRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const navigationRef = useRef(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(0);
  const activeChapterRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const [frameLoadFailed, setFrameLoadFailed] = useState(false);
  const staticMode = reducedMotion || frameLoadFailed;

  useLayoutEffect(() => {
    if (!staticMode) rendererRef.current?.animateCopy();
  }, [activeChapter, staticMode]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(query.matches);
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (staticMode) return undefined;

    const canvas = canvasRef.current;
    const media = mediaRef.current;
    if (!canvas || !media) return undefined;

    const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const cache = new Map();
    const pending = new Map();
    const queued = new Set();
    const queue = [];
    const cacheLimit = window.matchMedia('(max-width: 767px)').matches ? 18 : 46;
    const concurrentLoads = window.matchMedia('(max-width: 767px)').matches ? 2 : 4;
    let activeLoads = 0;
    let disposed = false;
    let copyRaf = 0;
    const tickCopy = (now) => {
      copyRaf = 0;
      if (disposed || !storyRef.current) return;
      const settling = updateSceneCopy(storyRef.current, lastRenderedFrameRef.current, now);
      storyRef.current.dataset.copyMoving = String(settling);
      if (settling) copyRaf = requestAnimationFrame(tickCopy);
    };
    const animateCopy = () => {
      if (!disposed && !copyRaf) copyRaf = requestAnimationFrame(tickCopy);
    };
    let requestedFrame = 0;
    let lastQueueCenter = 0;

    const touchCacheEntry = (index) => {
      const entry = cache.get(index);
      if (!entry) return null;
      cache.delete(index);
      cache.set(index, entry);
      return entry;
    };

    const evictFrames = () => {
      while (cache.size > cacheLimit) {
        const oldest = cache.keys().next().value;
        if (oldest === requestedFrame && cache.size > 1) {
          const active = cache.get(oldest);
          cache.delete(oldest);
          cache.set(oldest, active);
        } else {
          cache.delete(oldest);
        }
      }
    };

    const drawImage = (image) => {
      if (!image || document.hidden) return;

      const width = Math.max(1, media.clientWidth);
      const height = Math.max(1, media.clientHeight);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const outputWidth = Math.round(width * pixelRatio);
      const outputHeight = Math.round(height * pixelRatio);

      if (canvas.width !== outputWidth || canvas.height !== outputHeight) {
        canvas.width = outputWidth;
        canvas.height = outputHeight;
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.fillStyle = '#040506';
      context.fillRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      const containProduct = window.innerWidth <= 900;
      const scale = containProduct
        ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
        : Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      const desktopShift = containProduct ? 0 : width * 0.035;
      const x = ((width - imageWidth) / 2) + desktopShift;
      const y = (height - imageHeight) / 2;

      context.drawImage(image, x, y, imageWidth, imageHeight);
    };

    const drawFrame = (index) => {
      const entry = touchCacheEntry(index);
      if (!entry) return false;
      drawImage(entry);
      lastRenderedFrameRef.current = index;
      animateCopy();
      return true;
    };

    const pumpQueue = () => {
      if (disposed) return;

      while (activeLoads < concurrentLoads && queue.length > 0) {
        const index = queue.shift();
        queued.delete(index);
        if (cache.has(index) || pending.has(index)) continue;

        const image = new Image();
        image.decoding = 'async';
        pending.set(index, image);
        activeLoads += 1;

        const finish = () => {
          pending.delete(index);
          activeLoads -= 1;
          if (!disposed) pumpQueue();
        };

        image.onload = () => {
          if (!disposed) {
            cache.set(index, image);
            evictFrames();
            if (index === requestedFrame) drawFrame(index);
          }
          finish();
        };
        image.onerror = () => {
          if (!disposed && index === 0 && cache.size === 0) setFrameLoadFailed(true);
          finish();
        };
        image.src = HOME_FRAMES[index];
      }
    };

    const enqueue = (index, priority = false) => {
      const safeIndex = clamp(Math.round(index), 0, LAST_STORY_FRAME);
      if (cache.has(safeIndex) || pending.has(safeIndex) || queued.has(safeIndex)) return;

      if (priority) queue.unshift(safeIndex);
      else queue.push(safeIndex);
      queued.add(safeIndex);

      while (queue.length > 24) {
        const removed = queue.pop();
        queued.delete(removed);
      }

      pumpQueue();
    };

    const showFrame = (index, direction = 1) => {
      const safeIndex = clamp(Math.round(index), 0, LAST_STORY_FRAME);
      requestedFrame = safeIndex;

      if (!drawFrame(safeIndex)) enqueue(safeIndex, true);

      if (Math.abs(safeIndex - lastQueueCenter) > 5) {
        queue.splice(0, queue.length).forEach((queuedIndex) => queued.delete(queuedIndex));
        lastQueueCenter = safeIndex;
      }

      const forwardOffsets = [1, 2, 3, 5, 8, 13, -1, -2];
      const reverseOffsets = [-1, -2, -3, -5, -8, -13, 1, 2];
      (direction >= 0 ? forwardOffsets : reverseOffsets)
        .forEach((offset) => enqueue(safeIndex + offset));
    };

    const resize = () => {
      const fallback = touchCacheEntry(lastRenderedFrameRef.current);
      if (fallback) drawImage(fallback);
      else showFrame(currentFrameRef.current);
    };

    rendererRef.current = { showFrame, resize, animateCopy };
    showFrame(0, 1);

    const observer = new ResizeObserver(resize);
    observer.observe(media);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(copyRaf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', resize);
      pending.forEach((image) => { image.src = ''; });
      pending.clear();
      cache.clear();
      queue.length = 0;
      queued.clear();
      rendererRef.current = null;
    };
  }, [staticMode]);

  useEffect(() => {
    if (staticMode) return undefined;

    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage) return undefined;

    let scrollFrame = 0;
    let animationFrame = 0;
    let animationActive = false;
    let animationStartedAt = 0;
    let animationStartY = 0;
    let animationTargetY = 0;
    let previousFrame = 0;
    const wheelBurst = { lastEvent: 0, direction: 0, accumulated: 0, advanced: false };
    const touchGesture = {
      active: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startedAt: 0,
    };

    const getMetrics = () => {
      const stageTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      const start = storyTop - stageTop;
      const range = Math.max(1, story.offsetHeight - stage.offsetHeight);
      return { start, end: start + range, range };
    };

    const frameFromScroll = (scrollY, metrics) => (
      clamp((scrollY - metrics.start) / metrics.range, 0, 1) * LAST_STORY_FRAME
    );

    const scrollFromFrame = (frame, metrics) => (
      metrics.start + ((clamp(frame, 0, LAST_STORY_FRAME) / LAST_STORY_FRAME) * metrics.range)
    );

    const updateChapter = (frame, belowStory = false) => {
      const nextChapter = belowStory ? STORY_CHAPTER_COUNT : chapterForFrame(frame);
      if (nextChapter !== activeChapterRef.current) {
        activeChapterRef.current = nextChapter;
        setActiveChapter(nextChapter);
      }
    };

    const syncStory = () => {
      scrollFrame = 0;
      const metrics = getMetrics();
      const nextFrame = frameFromScroll(window.scrollY, metrics);
      const direction = nextFrame >= previousFrame ? 1 : -1;
      previousFrame = nextFrame;
      currentFrameRef.current = nextFrame;
      if (!animationActive) targetFrameRef.current = nextFrame;

      story.dataset.currentFrame = String(Math.round(nextFrame));
      story.style.setProperty('--hmpg-story-progress', `${(nextFrame / LAST_STORY_FRAME) * (STORY_CHAPTER_COUNT / HOME_CHAPTERS.length) * 100}%`);
      rendererRef.current?.showFrame(nextFrame, direction);
      updateChapter(nextFrame, window.scrollY > metrics.end + 2);
    };

    const requestSync = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncStory);
    };

    const finishAnimation = () => {
      animationActive = false;
      animationFrame = 0;
      syncStory();
    };

    const animationTick = (time) => {
      const elapsed = time - animationStartedAt;
      const progress = clamp(elapsed / SETTLE_DURATION, 0, 1);
      const eased = 1 - ((1 - progress) ** 3);
      window.scrollTo({
        left: 0,
        top: animationStartY + ((animationTargetY - animationStartY) * eased),
        behavior: 'instant',
      });

      if (progress < 1) animationFrame = window.requestAnimationFrame(animationTick);
      else finishAnimation();
    };

    const animateToFrame = (frame) => {
      const metrics = getMetrics();
      targetFrameRef.current = clamp(frame, 0, LAST_STORY_FRAME);
      animationStartY = window.scrollY;
      animationTargetY = scrollFromFrame(targetFrameRef.current, metrics);
      animationStartedAt = performance.now();
      animationActive = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(animationTick);
    };

    const moveOneGesture = (direction) => {
      animateToFrame(advanceStoryTarget(targetFrameRef.current, direction));
    };

    const goToClosing = () => {
      const closing = document.getElementById('home-solutions');
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationActive = false;
      closing?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    navigationRef.current = (index) => {
      if (index === STORY_CHAPTER_COUNT) {
        goToClosing();
        return;
      }

      animateToFrame(HOME_CHAPTERS[index].checkpoint);
    };

    const storyIsActive = (metrics) => (
      window.scrollY >= metrics.start - 2 && window.scrollY <= metrics.end + 2
    );

    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;

      const delta = normalizeWheelDelta(event);
      if (Math.abs(delta) < 0.1) return;
      const direction = Math.sign(delta);
      const metrics = getMetrics();
      if (!storyIsActive(metrics) || hasScrollableParent(event.target, direction, story)) return;

      const canAdvance = direction > 0
        ? targetFrameRef.current < LAST_STORY_FRAME - 0.5
        : targetFrameRef.current > 0.5;

      if (!canAdvance) {
        if (animationActive && event.cancelable) event.preventDefault();
        return;
      }

      if (event.cancelable) event.preventDefault();
      const now = performance.now();
      const beginsNewBurst = now - wheelBurst.lastEvent > WHEEL_BURST_GAP
        || direction !== wheelBurst.direction;

      if (beginsNewBurst) {
        wheelBurst.direction = direction;
        wheelBurst.accumulated = 0;
        wheelBurst.advanced = false;
      }

      wheelBurst.lastEvent = now;
      wheelBurst.accumulated += Math.abs(delta);

      if (!wheelBurst.advanced && wheelBurst.accumulated >= WHEEL_INTENT_THRESHOLD) {
        wheelBurst.advanced = true;
        moveOneGesture(direction);
      }
    };

    const handleKeyDown = (event) => {
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;
      const metrics = getMetrics();
      if (!storyIsActive(metrics)) return;

      const forward = event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey);
      const backward = event.key === 'ArrowUp' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey);

      if (forward) {
        if (targetFrameRef.current >= LAST_STORY_FRAME - 0.5) {
          goToClosing();
        } else {
          event.preventDefault();
          moveOneGesture(1);
        }
      } else if (backward && targetFrameRef.current > 0.5) {
        event.preventDefault();
        moveOneGesture(-1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        animateToFrame(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goToClosing();
      }
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;
      const metrics = getMetrics();
      if (!storyIsActive(metrics)) return;

      touchGesture.active = true;
      touchGesture.startX = event.touches[0].clientX;
      touchGesture.startY = event.touches[0].clientY;
      touchGesture.currentX = touchGesture.startX;
      touchGesture.currentY = touchGesture.startY;
      touchGesture.startedAt = performance.now();
    };

    const handleTouchMove = (event) => {
      if (!touchGesture.active || event.touches.length !== 1) return;
      touchGesture.currentX = event.touches[0].clientX;
      touchGesture.currentY = event.touches[0].clientY;
      const horizontalDistance = touchGesture.startX - touchGesture.currentX;
      const verticalDistance = touchGesture.startY - touchGesture.currentY;
      if (Math.abs(verticalDistance) < 10 || Math.abs(verticalDistance) <= Math.abs(horizontalDistance)) return;

      const direction = Math.sign(verticalDistance);
      const canAdvance = direction > 0
        ? targetFrameRef.current < LAST_STORY_FRAME - 0.5
        : targetFrameRef.current > 0.5;
      if ((canAdvance || animationActive) && event.cancelable) event.preventDefault();
    };

    const handleTouchEnd = () => {
      if (!touchGesture.active) return;
      const horizontalDistance = touchGesture.startX - touchGesture.currentX;
      const verticalDistance = touchGesture.startY - touchGesture.currentY;
      const duration = performance.now() - touchGesture.startedAt;
      touchGesture.active = false;

      if (
        Math.abs(verticalDistance) < 32
        || Math.abs(verticalDistance) <= Math.abs(horizontalDistance)
        || duration > 1400
      ) return;
      const direction = Math.sign(verticalDistance);
      const canAdvance = direction > 0
        ? targetFrameRef.current < LAST_STORY_FRAME - 0.5
        : targetFrameRef.current > 0.5;
      if (canAdvance) moveOneGesture(direction);
    };

    const handleTouchCancel = () => {
      touchGesture.active = false;
    };

    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true, capture: true });
    syncStory();

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      window.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart, true);
      window.removeEventListener('touchmove', handleTouchMove, true);
      window.removeEventListener('touchend', handleTouchEnd, true);
      window.removeEventListener('touchcancel', handleTouchCancel, true);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      navigationRef.current = null;
    };
  }, [staticMode]);

  const selectChapter = (index) => {
    if (staticMode) {
      if (index === STORY_CHAPTER_COUNT) {
        document.getElementById('home-solutions')?.scrollIntoView({ behavior: 'auto' });
      } else {
        document.getElementById(`home-chapter-${index}`)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      return;
    }

    navigationRef.current?.(index);
  };

  if (staticMode) return <StaticStory onChapterSelect={selectChapter} />;

  const chapter = HOME_CHAPTERS[Math.min(activeChapter, STORY_CHAPTER_COUNT - 1)];
  const Heading = activeChapter === 0 ? 'h1' : 'h2';

  return (
    <section
      className="hmpg-story-shell"
      id="home-story"
      ref={storyRef}
      aria-label="ZMD hardware product story"
    >
      <div className="hmpg-story-stage" ref={stageRef}>
        <div
          className="hmpg-story-media"
          ref={mediaRef}
          style={{ backgroundImage: `url(${HOME_FRAMES[0]})` }}
          aria-hidden="true"
        >
          <canvas ref={canvasRef} />
        </div>
        <div className="hmpg-story-shade" aria-hidden="true" />

        <div className="hmpg-progress-track" aria-hidden="true">
          <span />
        </div>

        <nav className="hmpg-chapter-selector" aria-label="Homepage chapters">
          {HOME_CHAPTERS.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={index === activeChapter ? 'is-active' : ''}
              aria-current={index === activeChapter ? 'step' : undefined}
              aria-label={`Go to chapter ${index + 1}: ${item.label}`}
              onClick={() => selectChapter(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={`hmpg-story-copy home-mobile-scene home-scene-${chapter.scene}`} data-scene-copy={Math.min(activeChapter, STORY_CHAPTER_COUNT - 1)} key={chapter.number} aria-live="polite" inert>
          <span className="hmpg-chapter-number">{chapter.number}</span>
          <p className="hmpg-eyebrow">{chapter.eyebrow}</p>
          {chapter.phase ? <PhaseTitle chapter={chapter} /> : <Heading><HomeHeadline chapter={chapter} /></Heading>}
          {chapter.tagline && <p className="home-scene-tagline">{chapter.tagline}</p>}
          <p className="hmpg-description">{chapter.description}</p>
          <SceneLinks chapter={chapter} />
          {chapter.chips.length > 0 && (
            <div className="hmpg-chips" aria-label={`${chapter.label} capabilities`}>
              {chapter.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          )}
        </div>

        <nav className="hmpg-chapter-rail" aria-label="Chapter progress">
          {HOME_CHAPTERS.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={index === activeChapter ? 'is-active' : ''}
              aria-current={index === activeChapter ? 'step' : undefined}
              aria-label={`Go to ${item.label}`}
              onClick={() => selectChapter(index)}
            >
              <span />
              <small>{String(index + 1).padStart(2, '0')}</small>
            </button>
          ))}
        </nav>

        {currentFrameRef.current < MIN_GESTURE_FRAMES && (
          <div className="hmpg-scroll-hint" aria-hidden="true">
            <span className="hmpg-scroll-icon"><i /></span>
            Scroll to explore
          </div>
        )}
      </div>
    </section>
  );
}
