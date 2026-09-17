import { HOME_CHAPTERS, LAST_STORY_FRAME, STORY_CHAPTER_COUNT } from '../../pages/homeData';

// All desktop motion, input and memory budgets live here. Mobile retains its
// original controller, with shared chapter checkpoints in homeData.js.
export const STORY_CONFIG = Object.freeze({
  FRAMES_PER_GESTURE: 64,
  BURST_DURATION_MS: 550,
  TEXT_DURATION_MS: 300,
  GESTURE_GAP_MS: 150,
  NOTCH_GAP_MS: 45,
  WHEEL_INTENT_PX: 10,
  DPR_CAP: 1.5,
  DECODED_FRAME_LIMIT: 16,
  COMPRESSED_FRAME_LIMIT: 96,
  FETCH_CONCURRENCY: 4,
  DECODE_CONCURRENCY: 3,
});

// Chapter-specific composition is in home-scenes.css. Timings, reveal windows,
// and checkpoints are shared with mobile through homeSequence.json.
export const STORY_CHAPTERS = HOME_CHAPTERS.map((chapter, index) => ({
  ...chapter,
  ...(index === STORY_CHAPTER_COUNT ? { start: LAST_STORY_FRAME + 1 } : {
    x: '4%', width: index === 0 ? 'min(840px, 48vw)' : 'min(600px, 43vw)',
    align: 'left', enterX: '-16px',
  }),
}));

export const clampFrame = (frame) => Math.max(0, Math.min(LAST_STORY_FRAME, frame));

export function displayedChapter(frame, previous = 0) {
  let next = 0;
  for (let i = 1; i < STORY_CHAPTER_COUNT; i += 1) {
    if (frame >= STORY_CHAPTERS[i].start) next = i;
  }
  // Two source frames of reverse hysteresis prevent boundary chatter during
  // scrollbar micro-adjustments, without leaving stale copy on a new product.
  if (next === previous - 1 && frame >= STORY_CHAPTERS[previous].start - 2) return previous;
  return next;
}

export function normalizeWheel(event, pageHeight) {
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? pageHeight : 1;
  return { x: event.deltaX * unit, y: event.deltaY * unit };
}

// WheelEvent has no device/gesture identifier. Separate spaced mouse notches
// from continuous trackpad streams, and recognize renewed acceleration after
// a decaying tail. A tail never earns another step merely by lasting 550ms.
export function createGestureRecognizer() {
  let lastTime = -Infinity;
  let lastDirection = 0;
  let lastMagnitude = 0;
  let peak = 0;
  let total = 0;
  let fired = false;
  let decaying = 0;

  return {
    reset() {
      lastTime = -Infinity;
      lastDirection = 0;
      lastMagnitude = peak = total = decaying = 0;
      fired = false;
    },
    push(event, now, pageHeight) {
      const { x, y } = normalizeWheel(event, pageHeight);
      if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(x) >= Math.abs(y) || Math.abs(y) < 0.1) return null;
      const magnitude = Math.abs(y);
      const direction = Math.sign(y);
      const gap = now - lastTime;
      const reversed = direction !== lastDirection;
      const notch = event.deltaMode !== 0
        || (Number.isInteger(event.deltaY) && magnitude >= 40 && magnitude % 40 === 0);
      const renewed = fired && decaying >= 3 && magnitude >= 12
        && magnitude > lastMagnitude * 1.8 && magnitude > peak * 0.35;
      const fresh = reversed || gap > STORY_CONFIG.GESTURE_GAP_MS
        || (notch && gap >= STORY_CONFIG.NOTCH_GAP_MS && magnitude >= lastMagnitude * 0.95)
        || renewed;
      if (fresh) {
        total = peak = decaying = 0;
        fired = false;
      }
      if (magnitude < lastMagnitude) decaying += 1;
      else if (!renewed) decaying = 0;
      peak = Math.max(peak, magnitude);
      total += magnitude;
      lastTime = now;
      lastMagnitude = magnitude;
      lastDirection = direction;
      const deliberate = !fired && total >= STORY_CONFIG.WHEEL_INTENT_PX;
      if (deliberate) fired = true;
      return { direction, deliberate, fresh };
    },
  };
}
