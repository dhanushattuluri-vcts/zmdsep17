# Homepage sequence replacement — September 16, 2026

Superseded by the later [NV homepage sequence](home-sequence-nv-hp.md). These notes describe the previous video export, retained for reference.

Source: `VN20260916_103709.mp4`, supplied inside `VN20260916_103709-zip.zip`. The original video remains unchanged.

The full 20.2-second, 1920 × 1080 video replaces the old four-folder sequence. Its 50 fps source is resampled to 60 fps by repeating frames; this does not synthesize new motion. The output is 1,212 sequential WebP images, about 64 MiB total, in `src/assets/frame_sequence/home_60fps/`.

The small star watermark near the lower-right corner is repaired with FFmpeg's spatial interpolation (`delogo`, rectangle x=1696, y=856, width=88, height=88). The filter runs only before 17 seconds, when the mark is visible. This can slightly soften that small background area. No crop is applied; original clip transitions are retained.

## Assets and regeneration

- Homepage assets: `src/assets/frame_sequence/home_60fps/frame_0001.webp` through `frame_1212.webp`.
- Cleaned, silent 60 fps MP4: `../artifacts/homepage/home-clean-60fps.mp4`.
- Sequence metadata: `src/pages/homeSequence.json`.
- Reproduction: `bash scripts/prepare-home-sequence.sh /path/to/VN20260916_103709.mp4` from the frontend directory. Requires FFmpeg with libwebp and libx264. The script intentionally refuses existing output frames; archive the previous output before regenerating.

## Chapter timing

Frame numbers below are zero-based; filenames are one-based.

| Chapter | Start frame | Start time | Selection frame |
| --- | ---: | ---: | ---: |
| Physical AI | 0 | 0.0 s | 0 |
| Cameras | 468 | 7.8 s | 630 |
| Custom IoT | 708 | 11.8 s | 780 |
| Zevric Edge | 810 | 13.5 s | 900 |
| Datacenter Servers | 948 | 15.8 s | 1020 |
| Autonomous Systems | 1092 | 18.2 s | 1188 |
| Solutions | After frame 1211 | After the story | Closing section |

Desktop and mobile share these timings. The added autonomous chapter covers the drone and delivery robot at the end of the supplied video. Product names retain the red/white headline treatment.

Desktop gestures retain their 64-frame advance and 550 ms animation; mobile retains its 39-frame advance. Frame-rate conversion does not change those gesture settings. Reverse scrolling, direct chapter navigation, the reduced-motion fallback, full-width cover rendering, and bounded frame caches remain in place.

## Verification

Validated all 1,212 consecutive image filenames and their 1920 × 1080 dimensions. FFprobe confirms the cleaned MP4 is 60 fps, 20.2 seconds, and 1,212 frames. Production build passes; lint has only six existing unused-variable warnings in `solutions.jsx`. Vite retains its existing JavaScript bundle-size warning.

`scripts/verify-home-story.cjs` passes wheel/trackpad steps, rapid gestures, reversal, keyboard controls, native scroll handoff, all chapter controls, cache bounds, closing/footer reachability, shared navigation, and reduced-motion checks. Screenshots were reviewed at 1366 × 768, 1440 × 900, and 1920 × 1080. A final focused browser pass verified the compact text placement and mobile chapter selection in both directions at 390 × 844, including the closing section, with no frame request failures or JavaScript errors.
