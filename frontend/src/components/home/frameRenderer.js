import { HOME_FRAMES } from '../../pages/homeData';
import { STORY_CONFIG, clampFrame } from './storyConfig';

// Compressed network prefetch and decoded presentation are separate budgets.
// No images are decoded simply because their response has been prefetched.
export function createFrameRenderer(canvas, wake, onFailure) {
  const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
  if (!context) { onFailure(); return null; }
  const blobs = new Map();
  const decoded = new Map();
  const fetching = new Map();
  const decoding = new Set();
  const failed = new Set();
  let fetchQueue = [];
  let decodeQueue = [];
  let disposed = false;
  let last = -1;
  let requested = 0;
  let landing = 0;
  let redraw = true;

  function trim(map, limit, release = () => {}) {
    for (const [index, value] of map) {
      if (map.size <= limit) break;
      if (index === last || index === requested || index === landing) continue;
      map.delete(index);
      release(value);
    }
  }

  async function decode(index) {
    decoding.add(index);
    try {
      const bitmap = await createImageBitmap(blobs.get(index));
      if (disposed) bitmap.close();
      else {
        decoded.set(index, bitmap);
        trim(decoded, STORY_CONFIG.DECODED_FRAME_LIMIT, (image) => image.close());
        wake();
      }
    } catch {
      if (!disposed) {
        failed.add(index);
        if (index === 0 && last < 0) onFailure();
        wake();
      }
    } finally {
      decoding.delete(index);
      if (!disposed) pump();
    }
  }

  async function fetchFrame(index) {
    const abort = new AbortController();
    fetching.set(index, abort);
    try {
      const response = await fetch(HOME_FRAMES[index], { signal: abort.signal });
      if (!response.ok) throw new Error(`Frame response: ${response.status}`);
      const blob = await response.blob();
      if (!disposed) {
        blobs.set(index, blob);
        trim(blobs, STORY_CONFIG.COMPRESSED_FRAME_LIMIT);
      }
    } catch (error) {
      if (!disposed && error.name !== 'AbortError') {
        failed.add(index);
        if (index === 0 && last < 0) onFailure();
        wake();
      }
    } finally {
      fetching.delete(index);
      if (!disposed) pump();
    }
  }

  function pump() {
    if (disposed) return;
    for (const index of decodeQueue) {
      if (decoding.size >= STORY_CONFIG.DECODE_CONCURRENCY) break;
      if (blobs.has(index) && !decoded.has(index) && !decoding.has(index) && !failed.has(index)) decode(index);
    }
    for (const index of fetchQueue) {
      if (fetching.size >= STORY_CONFIG.FETCH_CONCURRENCY) break;
      if (!blobs.has(index) && !fetching.has(index) && !failed.has(index)) fetchFrame(index);
    }
  }

  function prepare(frame, target, direction) {
    requested = Math.round(clampFrame(frame));
    landing = Math.round(clampFrame(target));
    const unique = (values) => [...new Set(values.map((value) => Math.round(clampFrame(value))))];
    decodeQueue = unique([
      requested, landing,
      ...[2, 4, 6, 8, 10, 12, 1, -2].map((offset) => requested + offset * direction),
    ]);
    const distance = Math.abs(landing - requested);
    const ahead = Array.from({ length: 20 }, (_, i) => requested + direction * (i + 1) * 4);
    const path = Array.from({ length: 12 }, (_, i) => requested + direction * distance * (i + 1) / 12);
    // Global indexing prefetches across every scene in the combined clip.
    fetchQueue = unique([...decodeQueue, ...path, ...ahead]);
    pump();
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, STORY_CONFIG.DPR_CAP, 1920 / width, 1080 / height);
    const nextWidth = Math.max(1, Math.round(width * ratio));
    const nextHeight = Math.max(1, Math.round(height * ratio));
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      redraw = true;
      // Resize clears canvas state; repaint the retained bitmap synchronously.
      if (last >= 0 && decoded.has(last)) paint(decoded.get(last));
    }
    wake();
  }

  function paint(bitmap) {
    const { width, height } = canvas;
    // Fill the entire viewport without stretching or letterboxing. Anchor the
    // proportional crop at the bottom to retain the foreground hardware.
    const scale = Math.max(width / bitmap.width, height / bitmap.height);
    const imageWidth = bitmap.width * scale;
    const imageHeight = bitmap.height * scale;
    context.fillStyle = '#080909';
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, (width - imageWidth) / 2, height - imageHeight, imageWidth, imageHeight);
    canvas.style.opacity = '1';
    redraw = false;
  }

  function show(frame, target, direction) {
    prepare(frame, target, direction);
    let candidate = decoded.has(requested) ? requested : last;
    if (candidate !== requested) {
      for (const index of decoded.keys()) {
        const onPath = direction >= 0 ? index > last && index <= requested : index < last && index >= requested;
        if (onPath && (candidate < 0 || Math.abs(requested - index) < Math.abs(requested - candidate))) candidate = index;
      }
    }
    if (candidate >= 0 && decoded.has(candidate) && (candidate !== last || redraw)) {
      paint(decoded.get(candidate));
      last = candidate;
    }
    // A missing frame never clears or replaces the last successful render.
    return last;
  }

  resize();
  prepare(0, 0, 1);
  return {
    show, resize,
    get failedTarget() { return failed.has(landing); },
    get stats() { return { decoded: decoded.size, compressed: blobs.size, fetching: fetching.size, decoding: decoding.size }; },
    dispose() {
      disposed = true;
      fetching.forEach((abort) => abort.abort());
      decoded.forEach((bitmap) => bitmap.close());
      decoded.clear();
      blobs.clear();
      fetchQueue = decodeQueue = [];
    },
  };
}
