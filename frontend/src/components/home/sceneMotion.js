import { HOME_CHAPTERS } from '../../pages/homeData';

const clamp = (value) => Math.max(0, Math.min(1, value));
// Zero velocity AND acceleration at the ends of each reveal window.
const smooth = (value) => { const p = clamp(value); return p * p * p * (p * (p * 6 - 15) + 10); };
const animations = new WeakMap();

export function sceneMotion(frame, chapter) {
  const [enterStart, enterEnd] = chapter.reveal;
  const [exitStart, exitEnd] = chapter.exit;
  const reveal = enterStart === enterEnd ? 1 : smooth((frame - enterStart) / (enterEnd - enterStart));
  const exit = smooth((frame - exitStart) / (exitEnd - exitStart));
  const progress = clamp((frame - enterEnd) / Math.max(1, exitStart - enterEnd));
  return { opacity: reveal * (1 - exit), reveal, exit, travel: smooth(progress) * 12 + exit * 24 };
}

// Targets come from the image actually painted. A short exponential settling
// pass bridges skipped video frames without overshoot or direction-change snaps.
// Return true only while settling, so callers can stop their RAF when idle.
export function updateSceneCopy(root, frame, now = performance.now()) {
  let animation = animations.get(root);
  if (!animation) {
    animation = { time: now - 16.67, nodes: new Map() };
    animations.set(root, animation);
  }
  const elapsed = Math.max(0, Math.min(64, now - animation.time));
  animation.time = now;
  const blend = 1 - Math.exp(-elapsed / 75);
  let settling = false;
  for (const element of animation.nodes.keys()) {
    if (!root.contains(element)) animation.nodes.delete(element);
  }
  root.querySelectorAll('[data-scene-copy]').forEach((element) => {
    const chapter = HOME_CHAPTERS[Number(element.dataset.sceneCopy)];
    const target = sceneMotion(frame, chapter);
    let motion = animation.nodes.get(element);
    if (!motion) {
      motion = sceneMotion(0, chapter);
      animation.nodes.set(element, motion);
    }
    for (const key of Object.keys(target)) {
      const difference = target[key] - motion[key];
      if (Math.abs(difference) <= (key === 'travel' ? .02 : .0005)) motion[key] = target[key];
      else { motion[key] += difference * blend; settling = true; }
    }
    element.style.setProperty('--scene-opacity', motion.opacity.toFixed(4));
    element.style.setProperty('--scene-reveal', motion.reveal.toFixed(4));
    element.style.setProperty('--scene-exit', motion.exit.toFixed(4));
    element.style.setProperty('--scene-travel', `${motion.travel.toFixed(2)}px`);
  });
  return settling;
}
