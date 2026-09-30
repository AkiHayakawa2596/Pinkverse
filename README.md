# PINKVERSE Fan Arcade v1.0.0

PINKVERSE is a mobile-first, unofficial BLACKPINK-inspired fan arcade built with plain HTML, CSS and JavaScript. Progress stays local in the browser, while music-backed modes use official YouTube embeds.

## v1.0.0 release

- Finalized the RC28 codebase as V1 while preserving RC28 local-save migration.
- Refined the PV app mark and regenerated favicon, Apple touch icon, and PWA icons.
- Reduced service-worker install precache from roughly 34.45 MiB to 1.26 MiB; stage and sprite art now caches on demand.
- Optimized the media footprint from **71.81 MiB to 14.25 MiB** (about **80% smaller**) by palette-optimizing sprite/FX PNGs and converting stage artwork to WebP.
- Deferred non-essential member sprite warm-up until after page load / idle time, reducing startup decode pressure.
- Added Firebase Hosting configuration with safe cache behavior and baseline browser security headers.
- Added release integrity checks for JavaScript syntax, CSS parsing, local asset references, manifest icons, and service-worker shell paths.

### Deploy to Firebase Hosting

With Firebase CLI authenticated and a project selected:

```bash
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

The repository-level `firebase.json` is ready for static Hosting.


## v63 focus — overall UI / UX refinement

This release deliberately avoids adding another game or progression system. It focuses on making the existing app feel more coherent and finished.

### Home screen

- Reduced the oversized hero so useful content appears sooner.
- Simplified spacing, shadows and card geometry across the homepage.
- Refined the Fan Pass status strip.
- Unified Spotlight, Continue Playing, Progress, Concert and Game Deck cards.
- Progress drawers now read as separate cards instead of one long accordion block.
- Game Deck cards use a cleaner hierarchy for category, title, score and mastery.

### Mobile navigation

- The bottom dock now highlights the section currently in view.
- Improved dock spacing, active states and touch feedback.
- Added safer scroll offsets so section jumps do not land under sticky navigation.

### Game UI

- Refined the shared play header and HUD.
- Added one consistent status marker to game HUDs.
- Start screens have a cleaner image/brief/difficulty hierarchy.
- Difficulty buttons and result actions use a more consistent visual language.
- Existing v62 structural mobile layouts remain intact.

### Accessibility / interaction

- Game Deck filter buttons now update `aria-selected`.
- Mobile dock active items now expose `aria-current`.
- Focus states remain visible and reduced-motion preferences are respected.

### Save migration

Existing v62 progress automatically migrates into v63.

## Run locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Fan project notice

PINKVERSE is an unofficial fan-made project and is not affiliated with BLACKPINK, YG Entertainment, the members, YouTube, Google, or Wikimedia Commons.


## v64 stage + wardrobe refinement

- Replaced the CSS-built concert architecture with three real stage artwork backgrounds: **Pink Grid**, **Neon Arena**, and **Encore Night**. The app now layers the live LED, performers, crowd, effects, and lighting over a coherent stage image instead of assembling the whole venue from CSS boxes.
- Locked the LED content to the artwork's screen opening for more reliable centering across phone sizes.
- Rebuilt **Pixel Wardrobe** into a visual outfit selector: each member gets a larger current-look preview plus real sprite previews for Pink, Black, and Encore outfits.
- Outfit previews use the exact member sprite sheets used by the concert, so wardrobe choices are no longer text-only.
- Existing **v63** local progress migrates into **v64**.


## v65 concert stage / crowd / wardrobe fix

- Fixed the 12-frame member sprite atlas renderer (the old CSS treated each sheet as 8 frames), so Jisoo, Jennie, Rosé and Lisa now render from their own full sprite sheets reliably.
- Pixel Wardrobe now shows all four members together on mobile instead of a one-card horizontal carousel. Every Pink / Black / Encore choice changes that member's actual concert sprite.
- Reworked audience depth so the crowd stays in the pit below the stage line instead of covering performer legs and making the members look like they are behind the audience.
- Simplified the LED wall to a clean title treatment with subtle motion, removing the stacked badges, chant text, stars and decorative motif noise.
- Added a cleaner stage apron, pit barrier, floor separation and tighter light treatment for a more readable concert composition.
- Existing v64 local progress and outfit choices migrate into v65.


## v66 updated concert member assets

- Replaced all 12 member outfit sheets in `assets/sprites/` with the newly designed concert sprite atlases.
- Applied distinct Pink Stage, Black Stage, and Encore looks for Jisoo, Jennie, Rosé, and Lisa.
- Bumped app/service-worker version to v66 so the new assets load instead of a stale cache.
- Enlarged the crowd slightly and lifted the performers/stage separation for clearer live-stage readability.


## v67 concert sprite / positioning fix

- Rebuilt the newly designed member art into clean, equal-size 12-frame atlases so animation no longer slices a neighboring member pose into the viewport.
- Removed row-overlap artifacts from the generated sheets before packing the in-game sprites.
- Kept three clean animated poses per member/outfit and reused them safely across the concert pose slots.
- Lowered the performers onto the front stage floor and spread all four members more naturally across the stage.
- Kept the larger crowd in the foreground while restoring a visible gap between the performers and the pit.
- Bumped the service-worker cache to v67.


## v68 performer grounding fix

- Lowered the live and preview performer band so idols sit on the front deck instead of floating above it.
- Added visible deck/contact shadows under each member to anchor them to the stage.
- Added a front performance platform layer just above the crowd line for stronger depth.
- Bumped app and service-worker version to v68 so the CSS stage fix loads cleanly.


## v69 crowd scale pass

- Increased the audience pit height so the concert crowd reads larger on phone screens.
- Enlarged front-row and back-row crowd sprites, especially in the live mobile stage.
- Nudged crowd rows upward slightly while keeping them below the stage deck.
- Bumped app and service-worker version to v69 to force the new crowd CSS to load.


## v70 packed pit + expanded choreography

- Expanded the concert crowd from two sparse rows to three packed rows (48 visible fans total).
- Added a middle audience row, tighter spacing, larger mobile silhouettes, and layered depth so the pit feels closer and fuller.
- Added new live performer movement variants: sway, hop, dip, inward cross-step, left/right slide, turn accent, and spotlight pop.
- Auto choreography now rotates through these movement variants while retaining each song's existing pose and formation routines.
- Preserves v65-v69 local saves when migrating into v70.
- Bumped the service-worker cache to v70.


## v71 crowd size + crowd animation variance

- Increased the concert crowd scale slightly across all three audience rows.
- Added per-row and per-fan animation variation so the audience no longer moves in lockstep.
- Mixed bob, lean, jump, and sway timing offsets for a more natural concert pit.
- Bumped app and service-worker cache version to v71.


## v72 choreography improvements

- Expanded the live auto-choreography with more move variants: ripple, kick, sweep left/right, and mark-time.
- Added expressive pose switching per beat so the focused member accents more often and group poses feel less static.
- Added dynamic formation changes during travel, split, chorus, and bridge sections for a more staged performance flow.
- Added choreography CSS for the new motions and slightly stronger spotlight emphasis for featured members.
- Bumped app and service-worker cache version to v72.


## v73 concert polish pass

- Improved member blocking and spacing across line, center, and diamond formations.
- Strengthened camera focus feel by dimming non-featured members and boosting the active focus member.
- Added section hit moments so pre-chorus, chorus, bridge, final chorus, and outro trigger brief visual accents.
- Bumped app and service-worker cache version to v73.


## v74 minigame fixes

- Lightstick Wave now moves across the lane much more slowly and its hit window is aligned to the visible center marker. Each pass accepts one hit, preventing accidental spam.
- Beat Drop has been removed from the arcade, member hub, help/music lists, and game launcher.
- Beat Switch now holds each direction for multiple beats, shows a visible beat countdown, and asks for the hit on a clear GO beat.
- Camera Call now visibly animates card swaps again, slows the shuffle cadence, highlights the two moving cards, and displays CUT progress while shuffling.
- Bumped app and service-worker cache version to v74.


## v75 deck cleanup + minigame rebuild

- Removed Blink Beat, Encore Mix, and Backstage Delivery from the arcade deck.
- Merged Wardrobe Rush into Stage Route as a second dressing-wing mission after the service-hall route.
- Rebuilt Pixel Choreo into a four-member timed 8-count rehearsal with 5-6-7-8 count-ins, visible cue lines, timing grades, formation changes, and group sprite movement.
- Reduced Pixel World to four stronger chapters and updated member mission routes to avoid retired games.
- Removed the now-empty Setlist Lab filter.
- Bumped app/save/cache version to v75 with v74 migration.


## v76 concert choreography + sprite animation upgrade

- Rebuilt all 12 member outfit sprite sheets with more distinct frame sequencing so idle, travel, chorus-hit, charm, sing, and bow states read more clearly.
- Added new choreography-oriented pose states: sway, turn, kick, hop, sweep, and pose-hit.
- Upgraded Concert Free Play auto-choreography to use member-specific motion profiles so Jisoo, Jennie, Rosé, and Lisa no longer feel interchangeable.
- Expanded the live stage CSS to animate the new sprite-driven choreography poses.
- Bumped app and service-worker version to v76.


## v77 song-specific choreography pass

- Added song-family 8-count choreography clips to Concert Free Play so different tracks now favor different combinations of hit-lines, mirrors, travel, ripples, solos, and dance-break moves.
- Added larger bridge / dance-break moments with turn chains, kick lines, solo swaps, and center-focus choreography.
- Added member-specific signature movement behavior: Jisoo turns/sways, Jennie sharp kick/point hits, Rosé vocal-flow movement, and Lisa hop/kick dance accents.
- Added new live move classes and CSS animation timing for hitline, mirror, kick-line, turn-chain, dancebreak, center-solo, solo-swap, signature, and pose-hit.
- Bumped app and service-worker cache version to v77 and migrated v76 saves.


## v78 Vocal Cam + expanded Director Calls

- Added timed per-song Vocal Cam maps for every Concert Free Play track so the stage camera follows the member carrying the current vocal line. Guest/external-vocal moments use a group shot.
- Added a live VOCAL CAM chip and AUTO VOCAL CAM toggle; manual focus temporarily overrides the automatic singer camera.
- Added Director Calls for current-vocal catches, vocalist spotlight, full-stage wide shot, laser sweep, blackout hit, and fan-chant wave.
- Added laser and blackout stage effects and wired the new calls into the one-tap Director Call dock.
- Bumped app/save/service-worker cache to v78 and migrated v77 saves.


## v79 concert effects upgrade

- Improved existing live effects: denser confetti, larger pyro spread, stronger laser sweep, fuller blackout spotlight, and longer-lasting burst timings.
- Added new stage effects for Concert Free Play: CO2 jets, glitter rain, full-stage color wash, and flashbulb pops.
- Expanded Director Call cue pool and the mobile cue deck with the new effects.
- Updated automatic section hits so pre-chorus, bridge, chorus, and outro moments trigger more dramatic stage effects.
- Bumped app and service-worker version to v79.


## v80 sprite-based concert effects

- Replaced the main Concert Free Play CSS-only effects with actual animated pixel-art sprite strips.
- Added sprite-driven pyro, CO2 jets, confetti/glitter, spotlight blackout, flashbulb pops, and laser sweeps.
- Kept color wash as a hybrid lighting layer so it still tints the stage while the main effect work is sprite-based.
- Bumped app and service-worker version to v80.


## v81 track-specific sprite FX choreography

- Added per-song Concert Free Play effect presets, so each track now has its own stage-production identity across intro, verse, pre-chorus, chorus, bridge, final chorus, and outro.
- Added beat-synced micro accents during chorus / bridge sections without interrupting the member choreography poses.
- Added combined sprite effect modes: POWER HIT (pyro + laser) and PARTY HIT (CO2 + confetti/glitter + color wash).
- Improved effect placement per track and section, including narrower spotlights, stronger power-song pyro, and softer effects on slower songs.
- Added sprite FX assets to the service-worker precache for more reliable offline/local loading.
- Bumped app/cache version to v81.


## v82 bug-fix pass

- Fixed the sprite FX mapping so PIXEL PYRO shows pyro and CONFETTI shows confetti.
- Reduced pyro scale so it no longer takes over the whole stage.
- Improved vocalist spotlight behavior so the focus actually locks onto the intended member.
- Fixed manual focus persistence during auto-choreo updates.


## v83 concert polish pass

- Spotlight sprite is now attached directly to the focused performer, so it follows the singer correctly in line, center, and diamond formations.
- FX timers now use a serial/token system so an older effect timeout cannot cancel a newer cue.
- Live-stage rerenders no longer restart the same sprite FX animation every choreography update.
- Added a premium set-change transition with a stage wipe, scan line, and incoming-song card.
- Improved spotlight / blackout focus contrast and mobile sizing.


## v84 concert FX cleanup

- Fixed confetti and pyro visual mappings so each cue uses the correct sprite asset.
- Reduced confetti and laser scale for a cleaner mobile stage composition.
- Tuned pyro, CO2, spotlight, flashbulb, glitter, and colorwash intensity for cleaner layering.
- Kept the sprite-driven FX system from v80+ while making each effect read more clearly in the stage frame.


## v85 FX mapping + size fix

- Permanently separated the generated pyro and confetti assets into correctly named canonical files, so the two triggers can no longer be visually swapped.
- PIXEL PYRO now uses the flame-jet sprite and CONFETTI uses the falling-particle sprite.
- Pyro is exactly the same base size as CO2 on desktop and mobile.
- Removed the previous power-track/final-chorus pyro scaling that made pyro oversized.
- Reduced laser and confetti coverage again for a cleaner mobile stage.
- Rechecked spotlight, CO2, flashbulb, glitter, color wash, and blackout layering.


## v86 confetti readability fix

- Rebuilt the confetti effect as multiple smaller sprite clusters instead of one enlarged strip.
- Kept pyro unchanged from v85 so it still matches CO2 size.
- Tuned glitter to use the smaller cluster treatment too.
- Bumped app and service-worker version to v86.


## v87 interactive Concert Free Play

- Added two play styles: LIVE DIRECTOR and FREE DIRECTOR.
- LIVE DIRECTOR adds timed 4-beat calls with PERFECT / GOOD / MISS grading, combo, best combo, and Director Score.
- Calls now cover vocalist camera catches, camera shots, formations, stage FX, choreography hits, and crowd-hype cues.
- Added a sticky four-button Director tray directly under the stage so the show can be played without scrolling through the full control deck.
- Live Director disables automatic Vocal Cam by default so singer focus becomes an interactive camera task.
- Final concert scoring and finale summary now include Live Director performance.
- FREE DIRECTOR preserves the existing sandbox-style concert controls.


## v88 Live Director gameplay polish

- Added dynamic section-aware Director Call pacing instead of fixed calls every eight beats.
- Added Show Power, combo multipliers, live accuracy and a running grade.
- Added on-stage PERFECT / GOOD / MISS feedback so successful direction is visible without looking away from the concert.
- Higher streaks now score more and build the crowd toward MAX POWER.
- Finale results now include Live Director grade and accuracy.


## v89 Live Director depth pass

- Added player-triggered OVERDRIVE when Show Power reaches 100%. Overdrive lasts 16 beats, speeds up calls, boosts the score multiplier, and fires a track-appropriate stage hit.
- Added section goals: clear 2–3 clean calls per song section for bonus score, power, and crowd energy.
- Added adaptive pacing: long streaks and Overdrive increase call frequency, while misses create a short recovery window.
- Easy mode now uses three answer choices; Medium/Hard keep four.
- Finale reporting now includes section clears and Overdrive activations.


## v90 — shareable ending cards

Every game now ends with a branded PINKVERSE result card. The ending screen includes a share-card preview plus SHARE CARD and SAVE PNG actions. Cards are rendered locally at 1080×1350 with the game name, score, grade, best score, Fan Pass rank, mastery/show mode, difficulty, run recap, and result status. On supported mobile browsers SHARE CARD opens the native share sheet with the generated PNG; otherwise the app saves the PNG locally as a fallback. This is implemented in the shared finish flow, so it applies to every arcade game and Concert Free Play.


## v91 — Live Director continuity + deeper gameplay

- Fixed Live Director freezing after song 1 by resetting per-track call scheduling when a new setlist song loads.
- Clears stale calls during the set-change transition so song 2 starts with a fresh countdown.
- Reworked the Director dashboard update so it replaces one stable wrapper instead of duplicating stat panels.
- Added precise sub-beat timing for PERFECT / GOOD grading.
- Added Recovery Calls after a miss: longer countdown and fewer choices.
- Added per-song missions (clean calls + PERFECT hits) with bonus Director Score and Show Power.
- Added per-song call numbering and clearer call-type styling.
- Song mission clears are included in the concert finale/result summary.


## v92 member sprite + animation upgrade

- Rebuilt all member sprite sheets with cleaner grounding, more consistent frame alignment, and stronger member-specific movement silhouettes.
- Enabled additional choreography poses in the live stage renderer: sway, turn, kick, hop, sweep, pose, and final.
- Upgraded point, heart, sing, bow, kick, pose, and finale states from static frames into animated mini-sequences.
- Kept existing outfit compatibility for Pink / Noir / Encore sprite sets.


## v93 sprite personality + outfit polish

- Added outfit-aware choreography behavior so Pink, Noir, and Encore looks now feel different in motion, not only in appearance.
- Added more distinct member signature choices during signature, accent, center-solo, and finale choreography.
- Applied an outfit-specific visual polish pass to all member sprite sheets: brighter Pink Stage, sharper Noir, and warmer Encore.
- Added outfit classes on concert performers for more styling flexibility in the live stage.


## v94 smoother dance animation upgrade

- Added smoother live-stage dance motion with continuous body movement layered under the pixel sprite frames.
- Added new choreography move types: body-roll, wave-line, snap-turn, duo-link, and freestyle.
- Expanded travel choreography with slide-left, slide-right, and cross handling.
- Auto choreography now refreshes performance poses every beat for more fluid motion.
- Improved director-call default choreography preview with more musical member poses.


## v95 dedicated dance-sheet integration

- Applied a dedicated 12-frame dance-cycle sprite sheet into the app for Jennie's Pink / Noir / Encore outfits.
- Added a sprite-sheet routing layer so dance-like poses can use alternate animation atlases while idle / focus poses keep the existing sheets.
- Upgraded default dance timing app-wide to feel smoother and more musical.
- Concert Free Play, wardrobe previews, and other pixel-avatar contexts all use the new routing automatically.


## v96 member-specific group vs individual dance behavior

- Extended dedicated dance-sheet routing to all 4 members.
- Added separate group-dance and individual-feature choreography logic so members do not feel like they share the exact same animation behavior.
- Group sections now keep a more synchronized stage feel, while focused / feature moments switch to member-specific motion styles.
- Added stage classes for dance-group, dance-support, and dance-individual for richer animation styling.


## v97 choreography expansion

- Added song-specific hook choreography signatures for every Concert Free Play track.
- Added dynamic DUO PAIRS / DUO CROSS / TRIO BACK / TRIO ARC / SOLO FRONT stage formations.
- Added member-specific solo spotlight routines for Jisoo, Jennie, Rosé, and Lisa.
- Live Director can now call duo-pair and support-trio formation moments.
- Featured members use distinct solo movement language while support members keep a quieter backing routine.


## v100 generated member dance sprite upgrade

- Generated new dedicated 12-frame dance-cycle sprite sheets for Jisoo, Jennie, Rosé, and Lisa.
- Added Pink, Noir, and Encore dance variants for each member and wired them into Concert Free Play and other live-stage contexts.
- Expanded dance-sheet routing so group and individual performance poses (dance, sway, point, sing, heart, kick, pose, etc.) use the upgraded sheets more often.
- Keeps the v97 choreography logic while giving the members more visually distinct animation cycles.


## v100 smoother 16-frame dance animation upgrade

- Upgraded all generated member dance sheets from 12 frames to 16 frames for smoother motion.
- Repacked new dedicated dance sprite sheets for Jisoo, Jennie, Rosé, and Lisa in Pink / Noir / Encore variants.
- Updated Concert Free Play and live-stage animation timing to use the smoother 16-frame loops and richer pose subsets.
- Preserved the existing choreography system while making group and individual performance animations feel more fluid.


## v100 applied generated 16-frame member sprites

- Applied the newly generated 16-frame dance sprite sheets directly into the app.
- Concert Free Play now uses the upgraded Jisoo, Jennie, Rosé, and Lisa dance sheets as the active member animation assets.
- Includes Pink / Noir / Encore dance variants and the smoother 16-frame choreography timing from the updated build.
- Version bump forces the service worker/cache to refresh so the new sprite assets load correctly in the browser.


## v101 motion-smoothing pass

- Synced performer motion timing to each song BPM using stage-level beat variables.
- Added a dedicated continuous motion shell around each member so sprite-frame changes keep smooth body motion instead of looking purely stepped.
- Added member-specific micro-motion for Jisoo, Jennie, Rosé, and Lisa during group, support, and individual-feature moments.
- Added smoother formation/focus transitions and steadier support-member pose cadence to reduce visual snapping between beats.
- Keeps the 16-frame generated dance atlases from v100.


## v1.1.1 public release

- Promoted the polished v101 build to the first public release.
- Preserves local progress from v2 through v101.
- Added installable PWA icons and release metadata.
- Added the active 16-frame dance sheets to the service-worker precache.
- Reduced initial sprite preloading to the four currently selected member looks; alternate wardrobe assets now load when needed.
- Re-ran syntax, asset-reference, game-launcher, manifest, sprite-dimension, and service-worker checks before packaging.


## v1.1.1 smoother 24-frame dance animation pass

- Expanded all member dance sheets from 16 frames to 24 frames for smoother motion.
- Upgraded Concert Free Play to use the smoother 24-frame sprite strips for Jisoo, Jennie, Rosé, and Lisa across Pink / Noir / Encore outfits.
- Increased choreography readability with stronger group-vs-solo pose choices and more noticeable dance actions.
- Added extra member-specific motion polish so performances feel livelier on stage.


## v1.1.1 hero / chorus choreography expansion

- Added dedicated 32-frame HERO dance sheets for focused solo / featured member moments.
- Added dedicated 32-frame CHORUS dance sheets so chorus and final chorus sections feel bigger than verses.
- Applied song-specific signature choreography logic for each YouTube track, giving every song its own flavor in group and solo moments.
- Upgraded Concert Free Play to route focused members to hero animation loops and chorus sections to chorus dance sheets automatically.
- Added stronger dance readability with more noticeable point / kick / heart / sing / pose actions across the live stage.


## v1.1.1 final animation polish

- Tuned member animation timing song-by-song so faster tracks feel sharper and slower tracks breathe more naturally.
- Added expanded member-specific signature and dance-break routines for Jisoo, Jennie, Rosé, and Lisa.
- Increased phone-size readability of point, kick, turn, heart, and singing actions without changing sprite ground contact.
- Preserves 24-frame base dance sheets plus 32-frame HERO and CHORUS sheets from v1.1.0.
- Includes an updated release QA pass for JavaScript syntax, manifests, assets, cache coverage, and sprite dimensions.


## v1.2.0-rc1 release-candidate polish pass
- Cleaned member sprite sheets across idle / dance / chorus / hero variants by normalizing baseline and center alignment per member-outfit set.
- Added alpha-edge cleanup and a light sharpness pass so hair / clothing edges read cleaner on the dark stage.
- Reduced initial sprite warm-up cost: startup now preloads idle + base dance first, while chorus / hero sheets are warmed lazily when the concert stage renders.
- Rebuilt stage FX strips into 10-frame loops for smoother playback: pyro, CO₂, confetti, laser, spotlight, and flashbulb.
- Canonicalized FX naming so `fx_pyro_strip.png` now contains the actual pyro burst and `fx_confetti_strip.png` contains the actual confetti fall animation.
- Rebalanced live-stage FX scale and layering: pyro now matches CO₂ scale, confetti is smaller and more readable, lasers are tighter, and the vocalist spotlight includes a floor pool for clearer focus.
- Bumped app, save, and service-worker version to `v1.2.0-rc1` with migration from `v1.1.1`.


## v1.0.0 final release
- Finalized the public v1 package from the release-candidate branch.
- Fixed live hero / chorus sprite routing so Concert Free Play now uses the correct 32-frame variant based on the current section, focused member, and show phase.
- Converted the large dance / chorus / hero sprite atlases to lossless WebP, preserving dimensions and alpha while reducing package size.
- Removed unused per-frame source exports and legacy crowd generations from the shipping package.
- Removed duplicate pyro / confetti FX aliases; the final build uses one canonical file for each effect.
- Service worker install now precaches the lightweight app shell, base member sheets, crowd, stage, and FX only. Heavy dance atlases are runtime-cached as they are requested.
- Final app version is `v1.0.0`; cache/save keys use a final-release suffix to avoid stale test-build collisions while still migrating test progress.


## v1.0.0-rc2 mobile sprite hotfix
- Fixed the live-stage member corruption visible in the supplied Android recording during focus / spotlight changes.
- Repacked all base / chorus / hero live atlases as 8×4 grids (1280×960) instead of 3840/5120px-wide horizontal textures.
- Standardized all live animation variants to 32-frame geometry.
- Added decode-before-commit source switching so the browser never applies a new atlas layout while the old sheet is still displayed.
- Prewarms hero / chorus sheets in Concert Builder and before START SHOW.

## v1.0.0-rc3 — global sprite crop / atlas repair

- Rebuilt all member sprite atlases from the original clean 160×240 source frames.
- Fixed the underlying crop issue globally, not only during spotlight/focus changes.
- Rebuilt the 12-frame default sheets used on the home screen and static member previews.
- Rebuilt every 32-frame base / chorus / hero dance grid using clean, non-blended source poses.
- Added safe internal padding around each frame so hair, hands, boots, and clothing cannot touch or spill across cell boundaries.
- Removed cross-faded in-between frames that could look like doubled/ghosted body parts.
- Kept smoother motion using small per-frame position/scale in-betweens instead of blending two character drawings.
- Enforced clipped sprite viewports on home, wardrobe, live stage, finale, and Pixel Choreo so neighboring atlas cells can never leak into view.


## v1.0.0-rc4 — dance pacing correction

- Slowed the member dance loops substantially on the home screen, previews, and Concert Free Play.
- Live 32-frame animation cycles now follow roughly four beats instead of racing through a full cycle in about two beats.
- Auto choreography pose selection now changes every two beats instead of forcing a fresh pose every beat.
- Slowed continuous motion-shell movement so member cards no longer look jittery or hyperactive.
- Pixel Choreo retains beat-responsive timing so the rhythm game still feels playable.


## v1.0.0-rc5 — stage disappearance / spotlight glitch fix

- Fixed the live-stage atlas swap race that could make a performer disappear or show a giant cropped face/body fragment.
- Sprite source, pose class, sheet type, and grid variant now commit atomically only after the replacement atlas has decoded and passed a dimension check.
- Added stale-load cancellation so rapid focus/section changes cannot commit an older atlas after a newer request.
- Spotlight/blackout focus now enlarges the already-clipped avatar viewport, never the raw atlas image.
- Raised backup-member visibility during vocalist spotlight so the full group remains readable.
- Kept the slower RC4 dance pacing.


## v1.0.0-rc6 — mobile stability lock

- On screens up to 820px wide, Concert Free Play now keeps the same decoded 1280×960 base dance atlas mounted per member for the whole performance.
- Hero and chorus moments still use their special choreography and timing, but no longer swap large image sources on mobile.
- Added an atlas geometry recovery guard if a browser ever reports a sheet/class mismatch.
- Reduced mobile spotlight zoom slightly so the focused member stays fully visible and clean.
- Includes all RC5 atomic sprite-swap protections for larger screens.


## v1.0.0-rc7 — disappearing-member stability fix
- Live Concert Free Play now keeps one base 8×4 member atlas mounted for the whole stage session, including intro/transition poses.
- On mobile, the visible character is rendered as an animated background on the clipped 160×240 viewport instead of moving a large atlas `<img>` layer. This avoids the Android Chromium layer-drop that could make one or all performers disappear.
- Pose, hero, chorus, focus, and song choreography still change normally; only the underlying mobile paint method is stabilized.
- Added a lightweight live-stage paint guard that restores each member's stable atlas background without rebuilding the stage.
- Preserved RC4 slower dance pacing and RC6 clean spotlight behavior.


## v1.0.0-rc8 — live member visibility root-cause fix

- Fixed the permanent-missing-members bug on mobile Concert Free Play.
- Root cause: RC7 hid the large IMG atlas and painted frames on the viewport background, but a historical `background: transparent !important` declaration cleared that background image.
- Live member atlases now use a dedicated CSS variable (`--pv-live-atlas`) and a final `background-image: ... !important` rule, so older CSS cannot erase the character.
- Keeps the stable 8×4 mobile atlas, slower dance timing, clean spotlight behavior, and no source hot-swapping.

## v1.0.0-rc9 — synchronized group choreography

- Group camera/choreography now makes all four members perform the same dance step on the same beat.
- Rebuilt all base and chorus dance grids with one shared 32-frame choreography sequence across Jisoo, Jennie, Rosé, and Lisa.
- Song choruses keep song-specific choreography, but the whole group now executes the same move together.
- When one member is focused, that member keeps her individual solo routine while the other three perform synchronized backup choreography.
- Removed group animation phase offsets so the four performers do not look like they are doing unrelated dances.
- Preserves RC8 mobile stability, crop fixes, spotlight fixes, and slower dance pacing.

## v1.0.0-rc10 — exact group steps + FX polish

- Reworked the stable live atlas into two zones: frames 0–15 are shared group choreography; frames 16–31 preserve each member's individual solo routine.
- Group focus and backup dancers now use the exact same frame sequence and animation phase, not merely synchronized timing.
- Focused members continue to use their individual solo choreography without swapping live atlas files.
- Upgraded pyro, CO₂, confetti, laser, spotlight, and flashbulb strips from 10 to 12 frames.
- Added natural FX motion: pyro ignition/decay, rising CO₂, layered falling confetti, moving laser sweeps, softer spotlight breathing, and flashbulb pops.
- Pyro and CO₂ remain matched in scale; confetti and lasers stay intentionally restrained on mobile.

## v1.0.0-rc11 — FX loading recovery

- Fixed the service-worker cache version, which was still stuck on an older RC cache and could serve stale FX/CSS.
- Added explicit preload/decode of all six concert FX strips before and during Concert Free Play.
- Extended first-use cue duration so mobile browsers have enough time to decode and paint an effect.
- Added robust CSS fallback visuals for pyro, CO₂, confetti, lasers, spotlight, and flashbulbs.
- Raised the live FX layer above stage architecture and forced effect groups visible.
- Added cache-busted CSS/JS references in the HTML shell so the RC11 fixes cannot be hidden by an older localhost cache.


## v1.0.0-rc12 — real sprite FX restored

- Removed RC11 emergency CSS fallback overlays that made pyro/CO₂ look like simple gradient columns/flames.
- Restored the actual RC10 12-frame PNG sprite effects while keeping RC11 preload, first-use timing, service-worker, and cache-busting fixes.
- Returned floor FX below the performers, with confetti/flashbulbs layered above where appropriate.
- Tuned CO₂ opacity so it reads as smoke/plume rather than a white glowing pillar.


## v1.0.0-rc13 — crowd polish

- Expanded the live audience from three visual depths to four: far, back, mid, and front.
- Added a subtle ambient lightstick field behind the crowd for arena depth without covering the performers.
- Reworked crowd reactions so waves propagate across the audience instead of every fan bobbing identically.
- Added separate warm, wave, hype, roar, chant, and burst motion patterns with staggered lightstick timing.
- Chorus and final-chorus sections now brighten crowd lightsticks slightly; bridge sections calm them down.
- Crowd signs only appear during chant/roar moments so the stage stays clean.
- Mobile crowd sizing remains constrained below the pit rail and does not cover member sprites.


## v1.0.0-rc14 — crowd + stage revamp

- Replaced the older repeated crowd bodies with a new 12-variant fan set, cropped from a fresh crowd sprite sheet and fitted to the app's existing crowd pipeline.
- Updated all three concert stage backgrounds with a new high-polish neon-pink concert set: pink-grid, neon-arena, and encore-night.
- Kept the current RC13 interaction logic intact while refreshing the visual layer only, to minimize regression risk before release.

## v1.0.0-rc15 — final pre-v1 visual polish

- Expanded the generated crowd set from 12 to 16 fan variants and shuffled their use to reduce visible repetition.
- Retuned far/back/mid/front crowd scale and opacity for stronger depth on mobile.
- Made generated fan artwork slightly larger in the front rows while keeping the audience below the performers.
- Reduced synthetic sign overlays because several new fan sprites already carry phones/signs.
- Tuned the new generated stage art darker behind the performers so member sprites and live FX remain visually dominant.
- Added stage-depth shading and pit separation without changing the proven concert renderer.
- No changes were made to the stable RC13/RC14 member animation, focus, or FX loading pipelines.


## v1.0.0-rc16 — landscape gameplay mode

- Added a LANDSCAPE control to Concert Free Play setup and the live show.
- The control requests fullscreen + landscape orientation lock when the browser permits it; manual device rotation works too.
- Added a dedicated landscape Live Director layout: stage on the left, Director Calls and scrollable controls on the right.
- Compressed nonessential chrome, source controls, tabs, cue buttons, and status UI for short landscape phone screens.
- Increased usable stage area and performer readability in landscape while keeping the crowd below the band.
- Portrait gameplay is unchanged.
- Orientation lock failures are handled gracefully because some mobile browsers only allow rotation manually.

## v1.0.0-rc17 — landscape stability + FX optimization

- Fixed disappearing concert members after phone rotation by extending the proven stable 8×4 viewport-background renderer to all short landscape phone displays, including widths above 820px.
- Landscape no longer composites/moves the oversized live atlas `<img>`; it remains decoded only as a fallback source.
- Group, backup, solo, intro, and static transition frames are explicitly supported by the landscape stable renderer.
- Retuned performer sizing around stage height so short screens cannot collapse/clamp the member sprite viewport.
- Added landscape-specific FX composition: matched smaller pyro/CO₂ jets, shallower lasers, restrained confetti, narrower spotlight beams, and crowd-line flash pops.
- Reduced the number of simultaneous confetti/laser/wash layers on very short landscape devices to lower mobile GPU compositing load.
- Portrait Concert Free Play remains unchanged.

## v1.0.0-rc18 — landscape stage geometry recovery

- Fixed a remaining landscape layout issue where the band/crowd strip could be pushed below the visible stage window on some phones.
- Reduced the live LED/screen footprint in landscape so the lower performance deck stays visible.
- Re-anchored the stage floor, runway, crowd, and performer row using stage-height percentages tuned for short landscape phones.
- Lifted performer and crowd z-order/placement to keep members consistently visible in wide mode.
- Moved pyro and CO₂ origin points onto the visible deck area so the effects no longer appear missing in landscape.
- Kept the RC17 stable atlas renderer and landscape FX budget optimizations.

## v1.0.0-rc19 — landscape root layout fix

- Fixed the real landscape root cause: the two-column concert grid could expand to ~700–800px tall from the controls' intrinsic content height while the phone viewport was only ~350–450px tall.
- The oversized grid was clipped by the shell, putting the performers, crowd, pyro, and CO₂ physically below the visible screen.
- Landscape concert-main is now hard-constrained to the viewport with `min-height: 0`, fixed grid rows, and independently scrollable director/control panes.
- The live stage now truly occupies exactly the available landscape height.
- Re-anchored members, crowd, pyro, CO₂, lasers, confetti, and spotlight against the corrected stage box.
- Kept the stable RC17 background-atlas renderer and synchronized choreography.

## v1.0.0-rc20 — landscape director/control UX

- Repositioned the Director Call from the narrow right column into a compact full-width strip below the stage/control row.
- The Exit Landscape button is now a small icon-only stage-corner control and no longer overlaps the Director Call.
- Removed normal vertical scrolling from the landscape controls pane.
- Cues now fit as a 5×2 button grid, so all ten stage actions are visible at once.
- Focus controls, formation, LED options, and setlist/stats are compressed to fit their landscape tab without scrolling.
- Source / Play Show / End Show controls are condensed into a single row.
- Preserved RC19's stable stage geometry, member renderer, FX placement, and choreography.

## v1.0.0-rc21 — larger landscape members + complete Director Call

- Increased live member size substantially in landscape while keeping the stage/crowd safe area intact.
- Expanded the landscape Director Call strip from 68px to 92px on normal landscape phones.
- Director prompt can now use two lines instead of being ellipsized/cut off.
- Restored the 4-segment beat timer bar in landscape.
- Added a dedicated numeric countdown with BEATS / NOW / RESULT labeling.
- Enlarged Director Call choice buttons and labels.
- Standby mission text and wait meter are visible again.
- Keeps RC20's no-scroll cue/focus control layout and RC19's stable landscape stage geometry.

## v1.0.0-rc22 — landscape LED wall polish

- Reworked the main LED specifically for landscape: wider, shallower, and positioned higher so it does not compete with the larger members.
- Improved long-title readability with a controlled landscape headline scale instead of oversized/clipped text.
- Added subtle LED scan texture, restrained frame glow, animated hairlines, and theme-aware Pink / Neon / Encore treatment.
- Added section-aware LED intensity for intro, verse, pre-chorus, chorus, bridge, and final chorus.
- Reduced Vocal Cam footprint in landscape so it blocks less of the LED headline.
- No changes to RC21 member sizing, Director Call timing, choreography, crowd, or FX logic.

## v1.0.0-rc23 — readable landscape Director options

- Enlarged Director Call choice buttons and labels for landscape phones.
- Four-choice calls now use a 2×2 option grid instead of four narrow buttons in one row.
- Three-choice Recovery Calls use three large equal-width buttons.
- Choice icons and text are larger, with icon + label horizontal layout for normal four-choice calls.
- Increased the Director Call strip height slightly to 108px while preserving the RC22 stage/LED/member layout.
- Long Director prompts can use up to three lines.

## v1.0.0-rc24 — fullscreen landscape concert

- Removed the permanent right-side control column in landscape. The live stage now owns the full landscape canvas.
- Director Call is a single bottom broadcast-style overlay with the existing prompt, beat timer, and large 2×2 / 3-choice controls.
- Manual CUES / FOCUS / SETLIST controls moved into a collapsible glass drawer opened from a small floating CONTROLS button.
- The drawer automatically closes when PLAY SHOW starts.
- Added an optional MEMBER CAM overlay. It follows the current vocalist when an individual member is singing, falls back to manual focus, and disappears during group-only moments.
- Added a CAM ON/OFF floating toggle.
- Increased landscape member size and spacing again now that the right column no longer consumes stage width.
- Widened and lowered the crowd while keeping it clear of the Director Call overlay.
- Re-anchored stage floor, runway, pyro, and CO₂ above the bottom Director safe zone.
- Preserved RC22 LED treatment and the proven stable live atlas renderer.

## v1.0.0-rc25 — member cam sync + faster landscape start

- Added a floating **PLAY SHOW** button in landscape so the concert can start without opening the controls drawer.
- Refined the **Member Cam** so it now mirrors the live on-stage member pose/animation more closely.
- Member Cam now updates in-place as choreography changes, instead of only when the featured member changes.
- Reduced the Member Cam footprint and gave the live band a right-side safe margin so it no longer sits on top of Lisa.

## v1.0.0-rc26 — new songs + landscape call/FX polish

- Added **JUMP**, **Forever Young**, and **Ready For Love** to Concert Free Play.
- Added automatic LED treatments and member-camera/vocal maps for those tracks.
- Recovery Calls no longer repeat the RECOVERY prefix inside the main prompt.
- Recovery call metadata is shorter and the three choices use a horizontal icon + label layout to prevent clipping.
- Landscape FX now render inside a dedicated performance-area canvas above the Director overlay.
- Pyro / CO₂ use matched sizing and deck anchoring; lasers are shallower; confetti uses fewer layers; flash pops stay lower; color wash/strobe are lighter for mobile.

## v1.0.0-rc27 — release hardening

- Reduced Concert memory pressure: rotated short phones now count as compact sprite mode and the show only warms each member's stable **base** dance grid rather than also decoding unused hero/chorus grids.
- Reworked FX warming so only pyro is warmed in the builder, pyro + CO₂ at show entry, and other FX are decoded lazily when actually used.
- Hardened the service worker: HTML is now an offline fallback only for navigation requests, RC27 query-versioned CSS/JS are explicitly precached, and all 12 stable base dance grids are included in the offline core cache.
- Member Cam no longer runs its own solo animation loop. It mirrors the visible frame of the matching on-stage member during playback.
- Added dedicated fan-choreography and normalized section timelines for **JUMP**, **Forever Young**, and **Ready For Love** instead of falling back to HOW YOU LIKE THAT.
- YouTube API loading can retry after an initial error/timeout instead of keeping a rejected promise for the rest of the session.
- Changed mixed-source labels from **OFFICIAL M/V** to the more accurate **OFFICIAL VIDEO**.
- Updated Privacy wording to describe cached local graphics/stage/FX assets.
- No new visual architecture or gameplay systems were added.

## v1.0.0-rc28 — mobile setup scrolling hotfix

- Fixed Pink Tiles setup on mobile: the gameplay `overflow:hidden` rule was also blocking access to the difficulty selector.
- Added an explicit `game-setup` state to every game's song/difficulty screen.
- Setup screens always allow vertical touch scrolling and safe-area bottom padding.
- Music song lists allow vertical gesture chaining so the page can continue down to difficulty.
- `game-setup` is removed immediately when the selected game begins, preserving fixed/fullsreen gameplay layouts.
- Cross-game CSS audit found Pink Tiles was the only game with a direct game-specific `.playboard { overflow:hidden }` override; the universal setup guard protects every game from the same regression.
- Concert Free Play gameplay/layout was intentionally left unchanged because RC27 tested well.
