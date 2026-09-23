# Homepage frame replacement — September 22, 2026

The supplied `hme1.mp4`, `hme2.mp4`, `hme3.mp4`, and `hme5.mp4` from
`/home/dhanush/Videos/dh-hp/` replace the matching parts of the existing homepage
sequence. Each source is 1920 × 1080, 24 fps, and eight seconds long.

The sources omit the COMPUTE → ACT transition (`hme4.mp4`). Its existing 480
frames remain in place to preserve the complete story, all chapter timings,
and the current scrolling behavior. No replacement transition was invented.

| Source | Destination | Global frames (zero-based) |
| --- | --- | --- |
| hme1.mp4 | nv_hp_60fps/frame_0001–0480.webp | 0–479 |
| hme2.mp4 | nv_hp_60fps/frame_0481–0960.webp | 480–959 |
| hme3.mp4 | nv_hp_60fps/frame_0961–1440.webp | 960–1439 |
| Existing ACT transition | nv_hp_60fps/frame_1441–1920.webp | 1440–1919 |
| hme5.mp4, seconds 1–8 | nv_hp_finale_60fps/frame_0001–0420.webp | 1920–2339 |

Both folders are under `src/assets/frame_sequence/`. Existing asset paths and
numbering are retained. The timeline remains 2,340 frames / 39 seconds at 60 fps.
The final clip retains the previous one-second trim. Text, layouts, product
links, chapter checkpoints, reveal/exit windows, desktop 64-frame gestures,
and mobile 39-frame gestures are unchanged.

## Export

FFmpeg removes the fixed lower-right star with
`delogo=x=1696:y=856:w=88:h=88`, then resamples to 60 fps. This repeats source
frames rather than synthesizing optical-flow frames. The repaired region can
be slightly softer than the surrounding texture; the image is not cropped.
All replacement frames are 1080p WebP, quality 82, compression level 4.
External MP4 originals are unchanged; no MP4 was added to the homepage.

For each of the first three clips, export into a separate empty staging folder:

```sh
ffmpeg -i /path/to/hme1.mp4 \
  -vf 'setpts=PTS-STARTPTS,delogo=x=1696:y=856:w=88:h=88,fps=60' \
  -an -c:v libwebp -quality 82 -compression_level 4 \
  -start_number 1 /empty/staging/frame_%04d.webp
```

For `hme5.mp4`, prefix the filter with `trim=start=1:end=8,`. Validate 480 frames
for each full clip and 420 for the trimmed finale before copying to the ranges
above. Do not remove or overwrite the retained ACT range.

## Verification

- Validated the consecutive names and 1920 × 1080 dimensions of all 1,860
  replacement frames. The timeline still contains 1,920 main + 420 finale frames.
- Checksums confirm all 480 retained ACT frames are identical. Homepage JSX,
  CSS, copy, links, controllers, and chapter timings are unchanged; only asset
  provenance and finale resolution metadata changed in `homeSequence.json`.
- Production build passes (existing Vite bundle-size warning remains).
- `scripts/verify-home-story.cjs` passes: mouse/trackpad/keyboard input, reverse
  scrolling, clip boundaries, final-frame handoff, frame-cache limits, all
  chapters at 1366 × 768, 1440 × 900 and 1920 × 1080, mobile navigation at
  390 × 844, reduced-motion fallback, and no browser errors or failed frame loads.
- Visual checks saved under `/tmp/zmd-hme-browser/`.
