# PINKVERSE Fan Arcade — V1 Release Audit

## Release decision

Prepared as **v1.0.0** from `v1.0.0-rc28`. The V1 pass keeps gameplay behavior intact and focuses on release reliability, branding, install/update behavior, and Firebase Hosting readiness.

## Changes made

- Finalized app/save version from `v1.0.0-rc28` to `v1.0.0`; existing RC28 saves remain migration candidates.
- Replaced the legacy PV badge with a cleaner mask-safe vector mark and regenerated favicon, Apple touch icon, and PWA icons.
- Reduced service-worker install pressure: only the shell and icons are precached; large stage/sprite assets are cached on demand. Measured install precache drops from about **34.45 MiB** in RC28 to about **1.26 MiB** in V1.
- Added basic social/application metadata and clarified manifest icon purposes.
- Added Firebase Hosting configuration with cache and baseline security headers.
- Optimized V1 media from **71.81 MiB to 14.25 MiB** (about **80.2% smaller**): sprite and concert-FX PNGs use indexed palettes where beneficial, while full-stage artwork uses WebP.
- Deferred member-sprite warm-up until after load/idle and removed duplicate query/non-query entries from the service-worker shell. Cache generation is bumped to `v1.0.0-opt1` to retire heavier runtime caches.

## Verified

- `app.js` and `sw.js` pass Node syntax checks.
- Static HTML, CSS, manifest, service-worker shell references, and icon dimensions pass local integrity checks.
- PWA manifest and service-worker paths resolve locally.
- No Firebase SDK, API keys, auth credentials, or server secrets are embedded in the client.

## Remaining launch considerations

- The project is an unofficial fan work and depends on third-party Wikimedia images, Google Fonts, and YouTube embeds. Those services can fail or change independently.
- Concert Mode remains the heaviest section because it contains multiple member animation atlases, but the optimized media set is now about **14.25 MiB** total and those assets still load/cache on demand.
- Firebase deployment requires an authenticated Firebase CLI session and a selected Firebase project. The uploaded RC did not include a Firebase project ID or credentials.
