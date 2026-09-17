import { LAST_STORY_FRAME, STORY_CHAPTER_COUNT } from '../../pages/homeData';
import { STORY_CHAPTERS, STORY_CONFIG, clampFrame, createGestureRecognizer, displayedChapter, normalizeWheel } from './storyConfig';
import { createFrameRenderer } from './frameRenderer';
import { updateSceneCopy } from './sceneMotion';

const INTERACTIVE = 'a, button, input, textarea, select, [contenteditable], [role="dialog"], dialog';

function nestedScroller(target, boundary) {
  for (let node = target; node instanceof Element && node !== boundary && node !== document.body; node = node.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight + 1) return true;
  }
  return false;
}

export function createStoryController({ story, canvas, onChapter, onFailure }) {
  let raf = 0;
  let disposed = false;
  let paused = false;
  let moving = false;
  let from = 0;
  let position = 0;
  let target = 0;
  let displayed = 0;
  let startedAt = 0;
  let direction = 1;
  let chapter = 0;
  let expectedY = null;
  let syncDocument = false;
  let pausedY = 0;
  let lastDrawAt = performance.now();
  const gestures = createGestureRecognizer();
  const fills = [...story.querySelectorAll('[data-segment-fill]')];

  function metrics() {
    const start = story.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(1, story.offsetHeight - window.innerHeight);
    return { start, range, end: start + range };
  }
  function frameAt(y) {
    const { start, range } = metrics();
    return clampFrame((y - start) / range * LAST_STORY_FRAME);
  }
  function scrollToFrame(frame) {
    const { start, range } = metrics();
    expectedY = Math.round(start + frame / LAST_STORY_FRAME * range);
    window.scrollTo({ top: expectedY, behavior: 'instant' });
  }
  function active() {
    const { start, end } = metrics();
    return window.scrollY >= start - 2 && window.scrollY <= end + 2;
  }
  function wake() {
    if (!raf && !disposed && !paused && !document.hidden) raf = requestAnimationFrame(tick);
  }
  const renderer = createFrameRenderer(canvas, wake, onFailure);
  if (!renderer) return { dispose() {}, setPaused() {}, select() {} };

  function updateChapter() {
    const below = window.scrollY > metrics().end + 2;
    const next = below ? STORY_CHAPTER_COUNT : displayedChapter(displayed, Math.min(chapter, STORY_CHAPTER_COUNT - 1));
    if (chapter !== next) {
      chapter = next;
      onChapter(chapter);
    }
    fills.forEach((fill, index) => {
      const start = STORY_CHAPTERS[index].start;
      const end = STORY_CHAPTERS[index + 1]?.start ?? LAST_STORY_FRAME + 1;
      const progress = index === STORY_CHAPTER_COUNT ? Number(below) : Math.max(0, Math.min(1, (displayed - start) / (end - start)));
      fill.style.transform = `scaleX(${progress})`;
    });
  }

  // This is the only requestAnimationFrame loop. Network completion just wakes
  // it; images, text, controls and programmatic scrollbar updates share its state.
  function tick(now) {
    raf = 0;
    if (paused || disposed) return;
    if (moving) {
      const elapsed = Math.min(1, (now - startedAt) / STORY_CONFIG.BURST_DURATION_MS);
      position = from + (target - from) * Math.sin(elapsed * Math.PI / 2);
      if (elapsed === 1) { position = target; moving = false; }
    }
    const next = renderer.show(position, target, direction);
    if (next >= 0 && next !== displayed) {
      displayed = next;
      lastDrawAt = now;
    }
    if (syncDocument) scrollToFrame(displayed);
    updateSceneCopy(story, displayed);
    updateChapter();
    // Nonvisual diagnostics also make production interaction regression checks
    // possible without exposing a debug panel or updating React on every frame.
    story.dataset.displayedFrame = String(displayed);
    story.dataset.targetFrame = String(Math.round(target));
    story.dataset.moving = String(moving || displayed !== Math.round(target));
    story.dataset.decodedFrames = String(renderer.stats.decoded);
    story.dataset.renderAgeMs = String(Math.round(now - lastDrawAt));
    if (!moving && renderer.failedTarget) onFailure();
    if (moving) wake();
    // When settled but awaiting a decode, the loader wakes us on completion.
  }

  function animateTo(frame) {
    // A control can receive focus after native scrollIntoView. Acknowledge that
    // position before claiming motion so its delayed scroll event cannot cancel
    // this new selection. Later scrollbar movement still takes over normally.
    expectedY = Math.round(window.scrollY);
    target = clampFrame(frame);
    from = displayed;
    position = displayed;
    direction = target >= displayed ? 1 : -1;
    startedAt = performance.now();
    moving = target !== displayed;
    syncDocument = true;
    story.dataset.targetFrame = String(Math.round(target));
    story.dataset.moving = String(moving);
    wake();
  }
  function advance(sign) {
    // Reversal cancels the old destination, starting at the image on screen.
    const base = sign !== direction ? displayed : target;
    animateTo(base + sign * STORY_CONFIG.FRAMES_PER_GESTURE);
  }
  function stop() {
    moving = false;
    position = target = displayed;
    syncDocument = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    story.dataset.targetFrame = String(displayed);
    story.dataset.moving = 'false';
  }
  function goToClosing() {
    stop();
    gestures.reset();
    position = target = LAST_STORY_FRAME;
    direction = 1;
    expectedY = document.getElementById('home-solutions').getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: expectedY, behavior: 'instant' });
    wake();
  }

  function onScroll() {
    if (paused) return;
    if (expectedY !== null && Math.abs(window.scrollY - expectedY) <= 1) return;
    // Native scrolling/scrollbar dragging takes ownership immediately.
    expectedY = null;
    moving = false;
    syncDocument = false;
    position = target = frameAt(window.scrollY);
    direction = position >= displayed ? 1 : -1;
    wake();
  }
  function onWheel(event) {
    if (paused || event.ctrlKey || event.metaKey || event.shiftKey || !active()) return;
    if (event.target instanceof Element && event.target.closest(INTERACTIVE)) return;
    const { x, y } = normalizeWheel(event, window.innerHeight);
    if (Math.abs(x) >= Math.abs(y) || nestedScroller(event.target, story)) return;
    const gesture = gestures.push(event, performance.now(), window.innerHeight);
    if (!gesture) return;
    const atEnd = gesture.direction > 0 ? displayed === LAST_STORY_FRAME : displayed === 0;
    // Only a NEW gesture after the endpoint settles may leave the sequence.
    // Momentum from the gesture that landed there remains consumed.
    if (atEnd && !moving && gesture.deliberate) {
      syncDocument = false;
      expectedY = null;
      return;
    }
    if (!event.cancelable) return; // Some browsers expose uncancelable tails.
    event.preventDefault();
    if (gesture.deliberate) advance(gesture.direction);
  }
  function onKey(event) {
    if (paused || event.ctrlKey || event.metaKey || event.altKey || !active()) return;
    if (event.target instanceof Element && event.target.closest(INTERACTIVE)) return;
    const forward = ['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey);
    const backward = ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey);
    if (forward || backward) {
      const sign = forward ? 1 : -1;
      if (!moving && displayed === (sign > 0 ? LAST_STORY_FRAME : 0)) {
        syncDocument = false;
        expectedY = null;
        return;
      }
      event.preventDefault();
      if (!event.repeat) advance(sign);
    } else if (event.key === 'Home') {
      event.preventDefault();
      animateTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToClosing();
    }
  }
  function onPointer(event) {
    if (event.clientX >= document.documentElement.clientWidth) {
      stop();
      expectedY = null;
    }
  }
  function onResize() {
    renderer.resize();
    if (active() && syncDocument) scrollToFrame(displayed);
    wake();
  }
  function onVisibility() {
    if (document.hidden) stop();
    else wake();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('pointerdown', onPointer);
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(canvas);
  position = target = frameAt(window.scrollY);
  wake();

  return {
    select(index) {
      if (paused) return;
      gestures.reset();
      if (index === STORY_CHAPTER_COUNT) goToClosing();
      else animateTo(STORY_CHAPTERS[index].checkpoint);
    },
    setPaused(value) {
      if (disposed || value === paused) return;
      paused = value;
      gestures.reset();
      if (value) {
        const wasAnimating = syncDocument;
        stop();
        if (wasAnimating && active()) scrollToFrame(displayed);
        pausedY = window.scrollY;
      } else {
        expectedY = pausedY;
        window.scrollTo({ top: pausedY, behavior: 'instant' });
        wake();
      }
    },
    dispose() {
      disposed = true;
      stop();
      renderer.dispose();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
