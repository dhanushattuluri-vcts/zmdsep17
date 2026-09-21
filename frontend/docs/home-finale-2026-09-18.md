# Appended homepage finale — September 18, 2026

Source: `/home/dhanush/Videos/nv-hp/6.mp4`, an 8-second, 1280 × 720, 24 fps clip. Its first second is excluded. The remaining 7 seconds are resampled to 60 fps, yielding 420 WebP frames. Resampling repeats source frames; it does not synthesize intermediate motion. Native 720p resolution is retained.

The lower-right star is repaired with `delogo=x=1128:y=568:w=64:h=64`. This interpolates the surrounding background and can locally soften fine texture. No crop or MP4 copy is generated, and the external source video is unchanged.

## Integration

The original 1,920 frames remain in `src/assets/frame_sequence/nv_hp_60fps/`. The new 420 frames are in `src/assets/frame_sequence/nv_hp_finale_60fps/`, numbered `frame_0001.webp` through `frame_0420.webp`. `homeData.js` sorts each folder independently, then appends the finale. The global timeline now spans frames 0–2339, lasting 39 seconds at 60 fps. The new clip begins at global frame 1920.

Recreate the finale with `bash scripts/prepare-home-finale.sh /path/to/6.mp4`. The script rejects existing output frames to avoid mixing exports. It requires FFmpeg with libwebp and delogo.

Desktop gestures still advance 64 frames over 550 ms. Mobile retains 39-frame gestures. Both controllers use the same extended frame list and chapter metadata. The renderer scales each frame using its own dimensions, maintaining full-width proportional cover rendering across the 1080p-to-720p join.

## Text and choreography

- ACT fades on frames 1920–2016 while the camera begins its pullback.
- The TOGETHER chapter starts at 2040, reveals over 2070–2160, and selects frame 2280 from navigation. Its title and short caption occupy the foreground floor beneath the reunited product groups.
- TOGETHER remains readable through frame 2339; another deliberate gesture moves into the existing closing section.
- The opening heading has a masked, upward entrance, followed by its caption. Product eyebrows, letters, taglines, descriptions, and capability labels reveal in order. Scroll-driven details reverse with the displayed frame; they do not run on a separate animation loop.
- Reduced-motion mode presents the complete text and representative images in document flow.

Homepage export scripts write only frames. On September 21, the original `src/assets/images/delibot/lightbackground.mp4` was restored from Git commit `9b2f2cd` specifically for the Delibot hero, with its original muted, looping autoplay behavior. Other removed videos remain excluded. External source videos remain available for frame regeneration.

## Verification

Validated all 1,920 original 1080p frames and all 420 appended 720p frames for consecutive numbering and dimensions. The first exported frame byte-matches an independent extraction at exactly source second 1 with the same watermark filter and WebP settings.

Production build passes. Lint reports the same six unused-variable warnings in `solutions.jsx`; the existing Vite bundle-size warning remains. Shell syntax checks pass for all three exporters.

Browser checks pass at 1366 × 768, 1440 × 900, and 1920 × 1080: 64-frame gestures across the new join in both directions, keyboard and trackpad behavior, clip boundaries, all chapter links, staged caption opacity, cache bounds, final-frame handoff, footer access, and reduced-motion rendering. Mobile chapter seeking passes. A focused finale layout check also passes at 320 × 740, 390 × 844, 1024 × 768, and 1366 × 600. The Delibot static hero loads correctly. No JavaScript errors or failed frame requests were observed.
