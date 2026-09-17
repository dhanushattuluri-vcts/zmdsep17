# NV homepage sequence

The homepage uses the four videos supplied in `/home/dhanush/Videos/nv-hp.zip`, in numerical order: `1.mp4`, `2.mp4`, `3.mp4`, `4.mp4`. Each source is 8 seconds, 1920 × 1080, and 24 fps. Source files are unchanged.

The combined sequence lasts 32 seconds and contains 1,920 WebP frames at 60 fps. Resampling repeats source frames; it does not create new intermediate motion. Clip boundaries remain as supplied without adding transitions or trimming footage.

The fixed lower-right star watermark is repaired on all four clips using FFmpeg `delogo=x=1696:y=856:w=88:h=88`. Spatial interpolation can slightly soften that small region. The image is not cropped.

## Outputs

- Website frames: `src/assets/frame_sequence/nv_hp_60fps/frame_0001.webp` through `frame_1920.webp`.
- Cleaned silent video: `../artifacts/homepage/nv-hp-clean-60fps.mp4`.
- Timing metadata: `src/pages/homeSequence.json`.
- Recreate with `bash scripts/prepare-nv-home-sequence.sh /path/to/extracted/nv-hp`. FFmpeg must support libwebp, libx264, and delogo. The script refuses existing output frames to avoid mixing exports.

The previous export remains in its original folder, but the homepage imports only `nv_hp_60fps`.

## Chapters

Frame positions are zero-based; filenames are one-based.

| Chapter | Start | Time | Selection frame |
| --- | ---: | ---: | ---: |
| Physical AI | 0 | 0 s | 0 |
| Sense | 600 | 10 s | 960 |
| Compute | 1230 | 20.5 s | 1440 |
| Act | 1680 | 28 s | 1890 |
| Solutions | After frame 1919 | After the story | Closing section |

Desktop scrolling retains 64 frames per deliberate gesture and a 550 ms animation. Mobile retains 39 frames per gesture. Reverse scrolling, keyboard controls, chapter selection, bounded caches, reduced-motion fallback, red/white headings, and the shared navigation are retained.

## HTML scene design — September 17, 2026

The former six product descriptions are composed into an opening and three large HTML chapter headings. SENSE sits across the lower product plinth, COMPUTE above and beside the server group, and ACT above the drone beside the robot. White typography, red punctuation, numbered eyebrows, and concise captions tie the three scenes together. Controls now link to the opening, these three scenes, and the closing section.

`PhaseTitle.jsx` renders selectable letter spans with an accessible heading label. `home-scenes.css` defines the separate compositions, mobile typography, and static fallback. `sceneMotion.js` calculates opacity, letter reveal, and positional movement from the frame actually rendered. It uses the existing rendering loop, so reverse scrolling reverses the same animation and chapter jumps resolve to a readable composition. No animation dependency or separate animation loop was added.

`homeSequence.json` is the timing source for desktop and mobile. Each chapter's `reveal` and `exit` pairs define zero-based frame windows. The opening fades out before the closeups; SENSE reveals on frames 690–810 and exits on 1140–1230; COMPUTE reveals on 1230–1310 and exits on 1600–1680; ACT reveals on 1680–1760 and remains readable through the end. Reduced-motion mode shows complete headings and product images in document flow.

## Verification

All 1,920 frame filenames and dimensions were validated. FFprobe confirms the cleaned video is 32 seconds, 1920 × 1080, and 60 fps. Production build passes. Lint reports only six pre-existing unused-variable warnings in `solutions.jsx`; Vite retains its bundle-size warning.

The browser regression script verifies wheel and trackpad input, keyboard navigation, rapid gestures, reversal, final-frame handoff, all clip boundaries, chapter selection, frame-cache bounds, and the reduced-motion fallback. It checks independent title positions, accessible headings, and reversible reveal opacity at 1366 × 768, 1440 × 900, and 1920 × 1080. Mobile chapter controls seek forwards and backwards at 390 × 844. No JavaScript or frame-request errors were observed.

A final visual pass verified all three fully revealed headings at 390 × 844, 1024 × 768, and 1366 × 600, including text bounds and opacity. Desktop review images are saved in `../artifacts/homepage/design-review/`.
