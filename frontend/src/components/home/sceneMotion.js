import { HOME_CHAPTERS } from '../../pages/homeData';

const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => { const p = clamp(value); return p * p * (3 - 2 * p); };

export function sceneMotion(frame, chapter) {
  const [enterStart, enterEnd] = chapter.reveal;
  const [exitStart, exitEnd] = chapter.exit;
  const reveal = enterStart === enterEnd ? 1 : smooth((frame - enterStart) / (enterEnd - enterStart));
  const exit = smooth((frame - exitStart) / (exitEnd - exitStart));
  const progress = clamp((frame - enterEnd) / Math.max(1, exitStart - enterEnd));
  return { opacity: reveal * (1 - exit), reveal, travel: progress * 18 - exit * 36 };
}

// Runs in the existing renderer loop, using the frame actually painted. No
// extra scroll listeners, React renders per frame, or independent animation clock.
export function updateSceneCopy(root, frame) {
  root.querySelectorAll('[data-scene-copy]').forEach((element) => {
    const chapter = HOME_CHAPTERS[Number(element.dataset.sceneCopy)];
    const motion = sceneMotion(frame, chapter);
    element.style.setProperty('--scene-opacity', motion.opacity.toFixed(4));
    element.style.setProperty('--scene-reveal', motion.reveal.toFixed(4));
    element.style.setProperty('--scene-travel', `${motion.travel.toFixed(2)}px`);
  });
}
