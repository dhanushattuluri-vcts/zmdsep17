import sequence from './homeSequence.json';

export const HOME_SEQUENCE = sequence;
const frameNumber = (path) => Number(path.match(/frame_(\d+)\.webp$/)?.[1] || 0);

const orderedUrls = (modules) => Object.entries(modules)
  .sort(([pathA], [pathB]) => frameNumber(pathA) - frameNumber(pathB))
  .map(([, url]) => url);

const frameModules = import.meta.glob(
  '../assets/frame_sequence/nv_hp_60fps/frame_*.webp',
  { eager: true, query: '?url', import: 'default' },
);

const finaleModules = import.meta.glob(
  '../assets/frame_sequence/nv_hp_finale_60fps/frame_*.webp',
  { eager: true, query: '?url', import: 'default' },
);

// Each folder is independently numbered. Append after sorting each sequence,
// preserving every original frame and the exact old-to-new join at frame 1920.
export const HOME_FRAMES = [...orderedUrls(frameModules), ...orderedUrls(finaleModules)];
if (HOME_FRAMES.length !== HOME_SEQUENCE.frameCount) {
  throw new Error(`Homepage sequence requires ${HOME_SEQUENCE.frameCount} frames; found ${HOME_FRAMES.length}.`);
}
// Preserve the existing mobile gesture size independently of the new clip length.
export const MIN_GESTURE_FRAMES = 39;
export const LAST_STORY_FRAME = HOME_FRAMES.length - 1;

export const HOME_CHAPTERS = [
  {
    label: 'Physical AI',
    scene: 'intro',
    eyebrow: 'HARDWARE FOR PHYSICAL AI',
    heading: 'Building Physical AI, from sensing to action.',
    description: 'One connected hardware ecosystem. A world of possibilities.',
    chips: [],
  },
  {
    label: 'Sense',
    scene: 'sense',
    phase: '01',
    eyebrow: 'INTELLIGENCE STARTS HERE',
    heading: 'SENSE',
    tagline: 'See more. Understand more.',
    description: 'AI cameras, spatial sensing and connected IoT.',
    chips: ['AI cameras', 'Smart sensors'],
  },
  {
    label: 'Compute',
    scene: 'compute',
    phase: '02',
    eyebrow: 'FROM SIGNAL TO INTELLIGENCE',
    heading: 'COMPUTE',
    tagline: 'Intelligence, at every scale.',
    description: 'Zevric edge systems. Powerful AI servers. One connected compute layer.',
    chips: ['Edge AI', 'Datacenter servers'],
  },
  {
    label: 'Act',
    scene: 'act',
    phase: '03',
    eyebrow: 'INTELLIGENCE IN MOTION',
    heading: 'ACT',
    tagline: 'Bring intelligence to life.',
    description: 'Autonomous drones and Delibot X1. In the air. On the ground.',
    chips: ['AI drones', 'Autonomous robotics'],
  },
  {
    label: 'Together',
    scene: 'together',
    phase: '04',
    eyebrow: 'SENSE / COMPUTE / ACT',
    heading: 'TOGETHER',
    tagline: 'One ecosystem. Endless possibilities.',
    description: 'From the first signal to the next action. All connected by ZMD.',
    chips: ['One hardware partner'],
  },
  {
    label: 'Solutions',
    eyebrow: 'FROM SENSING TO ACTION',
    heading: 'ZMD connects worlds.',
    description: 'From one device to the whole world — sense, compute, act. Build your OEM portfolio on ZMD hardware.',
    chips: [],
  },
].map((chapter, index, chapters) => ({
  ...chapter,
  ...HOME_SEQUENCE.chapters[chapter.label],
  number: `${String(index + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`,
}));

export const STORY_CHAPTER_COUNT = HOME_CHAPTERS.length - 1;

// These thresholds track when the next product has become the visual focus,
// rather than changing copy exactly at a sequence-folder boundary.
const CHAPTER_THRESHOLDS = HOME_CHAPTERS.slice(0, STORY_CHAPTER_COUNT).map((chapter) => chapter.start);

export function chapterForFrame(frame) {
  for (let index = CHAPTER_THRESHOLDS.length - 1; index >= 0; index -= 1) {
    if (frame >= CHAPTER_THRESHOLDS[index]) return index;
  }

  return 0;
}

export function clampStoryFrame(frame) {
  return Math.max(0, Math.min(LAST_STORY_FRAME, frame));
}

export function advanceStoryTarget(frame, direction) {
  return clampStoryFrame(frame + (Math.sign(direction) * MIN_GESTURE_FRAMES));
}
