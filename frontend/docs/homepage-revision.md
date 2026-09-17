# Desktop homepage revision

Historical layout notes. The current assets, chapter timings, and regeneration process are documented in [NV homepage sequence](home-sequence-nv-hp.md).

Implemented September 9, 2026 for viewport widths of 1024px and above.

The homepage now uses the shared primary navigation as a translucent glass header, individually composed chapter copy, one bottom chapter control, and a frame-driven canvas story. The complete closing message and both original CTAs precede the existing footer in normal document flow. Other routes retain the white shared header.

## Changed files

| File | Purpose |
| --- | --- |
| `src/pages/home.jsx` | Select the desktop or existing mobile experience and scope desktop styles. |
| `src/components/header/header.jsx` | Shared desktop navigation, with a home-route glass variant. |
| `src/components/header/header.css` | White shared header styling and the translucent home-header treatment. |
| `src/assets/css/home-desktop.css` | Desktop scene compositions, progress controls, closing section and static fallback. |
| `src/components/home/HomeStory.jsx` | Selectable chapter HTML, displayed-chapter state, six accessible chapter buttons and static fallback. |
| `src/components/home/MobileHomeStory.jsx` | Previous scrolling behavior and layout below 1024px, with the shared red/white heading treatment. |
| `src/components/home/HomeHeadline.jsx` | Shared red emphasis for product names, preserving original heading copy and punctuation. |
| `src/components/home/storyConfig.js` | Motion budgets, input normalization, gesture recognition and chapter compositions/checkpoints. |
| `src/components/home/storyController.js` | One animation loop, displayed-frame synchronization, target accumulation/reversal and native scroll handoff. |
| `src/components/home/frameRenderer.js` | Separate bounded compressed/decoded caches, controlled prefetch/decode, retained-image rendering and proportional canvas sizing. |
| `scripts/verify-home-story.cjs` | Repeatable browser interaction and viewport regression checks. |
| `docs/homepage-review/` | Seven screenshots from the production preview. |

Original copy, punctuation, capability chips, `homeData.js`, the four frame folders, mobile scrolling behavior, routing definitions, product pages and footer files remain unchanged. The later red/white typography adjustment adds a shared accent rule to `home.css` and uses the same headline treatment on desktop, mobile and reduced-motion scenes. No animation library or runtime dependency was added.

## Final settings

| Setting | Value |
| --- | --- |
| Frames per deliberate gesture | **64** |
| Burst duration | **550ms** |
| Motion interpolation | Timestamp-based sine ease-out; updated targets coalesce into the active motion. |
| Text entrance | **300ms**, with 14px vertical and up to 16px horizontal movement. |
| Text exit | 140ms at the outgoing chapter's own position. |
| Header-menu entrance | **200ms** |
| Gesture stream gap | 150ms; discrete notch recognition can accept a new notch after 45ms. |
| Intent threshold | 10 normalized CSS pixels. |
| Reverse chapter hysteresis | Two source frames. |
| Retained decoded bitmap budget | **16**, plus at most 3 in-flight decodes. |
| Compressed response budget | **96** blobs. |
| Fetch concurrency | **4** |
| DPR cap | **1.5**, additionally capped at the 1920 × 1080 source resolution. |

One global zero-based timeline spans frames 0–767. A chapter selection replaces the old destination. Reversal starts from the image actually on screen. The last successful render remains visible when the next requested frame is unavailable. Canvas size changes only on resize; bitmaps are explicitly closed on eviction/disposal.

| Chapter | Starts at global frame | Direct-selection frame | Composition |
| --- | ---: | ---: | --- |
| Physical AI | 0 | 0 | Upper-left, wide opening headline. |
| Cameras | 96 | 176 | Upper-right, leaving the foreground camera clear. |
| Zevric Edge | 248 | 360 | Upper-left, leaving the edge system in the center/right clear. |
| Datacenter Servers | 454 | 552 | Compact centered copy left of the rack faces. |
| Custom IoT | 684 | 760 | Upper-left above the foreground sensor. |
| Solutions | After the story | Beginning of the closing section | Light two-column closing layout. |

Following the requested edge-to-edge adjustment, the source frame fills the entire viewport using proportional cover scaling, centered horizontally and anchored at the bottom to retain foreground hardware. Aspect-ratio differences crop excess imagery rather than leaving side or top borders. The opening image uses the same cover placement as the canvas. There is no stretching, brightness filter, vignette, gradient or panel behind desktop story copy.

## Verification performed

Automated headless Chrome testing used the existing local Playwright installation. Screenshots were visually reviewed at **1366 × 768**, **1440 × 900**, and **1920 × 1080**; additional checks covered **1024 × 768** and **1366 × 600**.

- Verified all 768 frame filenames and dimensions: four complete sets of `frame_0001.webp`–`frame_0192.webp`, all 1920 × 1080, approximately 60 MiB compressed in total.
- Checked each sequence's opening, middle and ending, adjacent folder boundaries, chapter transitions and all chapter landing frames at the three requested viewport sizes.
- Confirmed the fixed desktop homepage header reserves no height, the stage starts at viewport y=0, and the brand, full primary navigation and contact CTA remain readable over every story frame.
- Verified Home, Products, Edge AI, Solutions and Contact, the six product destinations, and all nine solution anchors through the shared navigation.
- Checked 64-frame isolated advances, three gestures reaching global frame 192, and twelve gestures reaching frame 767 in the production build.
- Checked rapid notches accumulating targets, simulated trackpad event streams and momentum, reversal, keyboard input, horizontal/zoom exclusions, direct selection, native scrollbar dragging and reverse entry from the closing section.
- Confirmed the home Products control opens the same six-category mega menu used by the white headers on the rest of the site.
- Fixed a browser-observed delayed native scroll event that could cancel a newly selected chapter after leaving the closing section. Added regression coverage.
- Confirmed the final gesture lands at the final story frame; its momentum does not spill into closing. Later scrolling reaches the complete message, both CTAs and the original footer.
- Compared canvas output directly to source pixels at global frames **0, 96, 192, 256, 288, 384, 448, 454, 480, 576, 684 and 767**. Sampled pixel differences were zero.
- Delayed frame responses by 90ms during a cold motion path. The last valid image remained visible, with 18 distinct displayed frames during that test and a maximum sampled animation-frame interval of approximately 17ms. These are local test measurements, not a guarantee for every device/network.
- Verified the retained decoded cache stays at or below 16 images, reduced-motion content/navigation remain available, and a failed opening-frame request produces the readable static fallback.
- Confirmed the existing story still mounts at 390px, and the camera route retains its original desktop navigation.
- `npm run build` passes. The production preview loaded hashed frame URLs across all four sequences without missing asset responses or JavaScript errors.
- `npm run lint` passes with six pre-existing unused-variable warnings in `src/pages/products/solutions.jsx`; no warnings originate in the added implementation. Vite still reports its application-bundle size warning.

The interaction checks use browser-generated wheel/keyboard input and synthetic trackpad event streams. Physical trackpad hardware and Safari/Firefox were not tested.

### Edge-to-edge follow-up

Changed both canvas rendering and the opening image from contain to cover scaling. Verified the exact address `http://192.168.10.203:5173/#home` at 1849 × 961, 1366 × 600, 1440 × 900 and 1920 × 1080. At opening frame 0 and IoT frame 760, the canvas touches both content-viewport edges, and sampled pixel columns at both sides match the scaled source image with zero difference. Only the browser's native scrollbar occupies space at the right. Build and lint checks pass with the existing warnings described above.

Latest screenshots: [Full-screen opening](homepage-review/fullscreen-opening.png) · [Full-screen IoT](homepage-review/fullscreen-iot.png).

### Red and white headline treatment

The five story headlines now emphasize **Physical AI**, **Cameras**, **Zevric**, **Servers** and **Custom IoT** in `#f33b32`, with the surrounding heading text in white. `HomeHeadline.jsx` splits the existing heading strings without changing their wording or punctuation. The same treatment appears in the desktop, mobile and reduced-motion story. Verified all five headlines at 1366 × 768 and 1920 × 1080, plus the 390px mobile and static fallbacks. Build and lint checks pass with the pre-existing warnings. [Server chapter preview](homepage-review/red-white-servers.png).

## Source footage limitations

The opening transition contains ghosted/doubled devices around `hm1/frame_0097.webp`. Large foreground surfaces cross and sometimes fill the view in hm2 and hm3, notably around local frames 0065–0097. The source also contains inconsistent small product lettering and a visible overhead light in later scenes. Pixel comparisons confirmed these features are in the supplied footage. They remain visible; the implementation does not conceal them with black fades, alter the assets, or cut out timeline spans. During a full-frame foreground occlusion, no text placement can expose the hardware hidden by that source image.

## Review screenshots

[Opening](homepage-review/opening.jpg) · [Cameras](homepage-review/cameras.jpg) · [Zevric](homepage-review/zevric.jpg) · [Servers](homepage-review/servers.jpg) · [Custom IoT](homepage-review/iot.jpg) · [Menu](homepage-review/menu.jpg) · [Closing](homepage-review/closing.jpg)

## Repeat the browser checks

Build and serve the frontend:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

In a separate terminal, with Playwright available:

```bash
node scripts/verify-home-story.cjs
```

The script accepts `PLAYWRIGHT_MODULE` (an existing module directory), `CHROME_PATH`, `BASE_URL`, and `ARTIFACT_DIR`. It defaults to the local production preview, `/usr/bin/google-chrome`, and `/tmp/zmd-home-verification` for screenshots/results. On the workspace machine, the existing module used for verification is `/home/dhanush/.cache/ms-playwright-go/1.57.0/package`.

The browser checks read nonvisual `data-*` frame/target/cache attributes. No visible diagnostics are present in the homepage.

## References inspected

The supplied `Screencast from 2026-09-09 11-44-02.webm` was located and reviewed. [Analog](https://analog.io/) informed the minimal navigation and immersive presentation. Input handling accounts for wheel delta modes, zoom and cancellation as described by [MDN's wheel-event documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event); timestamp-based rendering follows [MDN's requestAnimationFrame guidance](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame). The 64-frame/550ms values are ZMD settings from the brief, not measured Analog behavior.
