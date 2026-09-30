# PINKVERSE v1.0.0 — Safari / iOS hardening

This build adds a conservative Safari-specific compatibility pass without changing gameplay or save data.

## Changes

- Detects Safari, iPhone/iPad (including iPadOS desktop UA), and installed standalone-PWA mode.
- Adds `apple-mobile-web-app-title` and disables accidental telephone-number detection.
- Uses real viewport orientation for the compact Concert layout instead of assuming orientation lock succeeded.
- Avoids arbitrary fullscreen requests on iPhone Safari and provides a manual rotate-device fallback.
- Keeps orientation lock/fullscreen attempts on capable browsers and iPad where available.
- Explicitly unlocks Web Audio from a user gesture, including the Safari `webkitAudioContext` path.
- Adds Safari-friendly touch/tap behavior and momentum scrolling without disabling normal page selection.
- Extends Support diagnostics with Safari/device/display-mode information.
- Makes service-worker cache writes awaitable so short-lived Safari workers are less likely to lose runtime cache updates.
- Bumps shell cache and CSS/JS query versions so installed PWAs receive the hardening changes.

## Validation note

Static checks and local HTTP smoke tests can verify syntax, references, image decoding, and service-worker paths. Final Safari sign-off still requires a real iPhone/iPad/macOS Safari smoke test because this build environment does not emulate WebKit hardware/browser behavior.
