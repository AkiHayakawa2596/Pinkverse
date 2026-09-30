# PINKVERSE motion promo capture kit

This kit renders the promo from the **real running app UI**. It does not redraw or AI-generate any application frame.

## Local build

Prerequisites: Python 3.10+, Chromium/Chrome, FFmpeg.

```bash
cd pinkverse-fan-arcade-v1.0.0
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r promo/requirements.txt
playwright install chromium
python promo/capture_promo.py --browser /path/to/chromium
python promo/render_promo.py
```

On Windows, omit `--browser` after `playwright install chromium` if `/usr/bin/chromium` does not exist; Playwright will use its bundled browser.

Outputs are written to `promo/build/`:
- `pinkverse_promo_30s_9x16.mp4`
- `pinkverse_promo_15s_9x16.mp4`
- `pinkverse_promo_6s_9x16.mp4`
- `raw/*.webm`
- `shot_log.json`

The capture script creates a temporary copy of the app and exposes one private capture-only hook to render the app's own result-card UI. It does not modify the shipped app.

## Fidelity rules implemented
- 390×844 mobile viewport at DPR 3.
- Seed: 312 hearts / 14 plays / existing best scores / onboarding hidden.
- Real `window.PV` actions drive navigation, concert builder, wardrobe, effects, deck filters, and gameplay screens.
- UI is never re-typeset. Marketing captions are added only by FFmpeg around the capture.
- Capture audio is omitted; add only licensed/original music in your editor.

## YouTube note
Concert playback depends on YouTube availability. If a runner blocks YouTube, the concert stage, sprites, wardrobe, setlist, and manual FX still render; the timed Live Director call may remain in standby. Run locally with network access for the full call sequence.

## GitHub Actions build

For a no-local-install build, use `.github/workflows/build-promo.yml`.
Detailed steps are in `promo/GITHUB_BUILD.md`.
