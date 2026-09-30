# Build the PINKVERSE promo with GitHub Actions

The repository already contains the workflow:

`.github/workflows/build-promo.yml`

## Build

1. Upload this entire project folder to a GitHub repository. Keep `.github/` at the repository root.
2. Open **Actions** in GitHub.
3. Select **Build PINKVERSE Promo**.
4. Select **Run workflow** and run it on `main` (or your chosen branch).
5. When the job is green, open the completed workflow run.
6. Under **Artifacts**, download **pinkverse-promo-videos**.

## Outputs

The artifact contains:

- `pinkverse_promo_30s_9x16.mp4`
- `pinkverse_promo_15s_9x16.mp4`
- `pinkverse_promo_6s_9x16.mp4`
- `shot_log.json`
- raw Playwright `.webm` capture files

## What GitHub Actions does

- Sets up Python 3.12.
- Installs FFmpeg.
- Installs the Python package(s) in `promo/requirements.txt`.
- Installs Playwright's bundled Chromium with Linux dependencies.
- Serves a temporary copy of the real PINKVERSE app on `127.0.0.1:8000`.
- Records the real application UI at 390x844 with DPR 3.
- Uses FFmpeg to create the vertical 1080x1920 promo renders.
- Uploads the finished videos as a GitHub Actions artifact.

Firebase Hosting is not required to build the promo.

## Re-run after changes

The workflow can be started manually at any time. It also runs automatically when these paths change:

- `promo/**`
- `index.html`
- `app.js`
- `styles.css`
- `assets/**`
- `.github/workflows/build-promo.yml`

## If a job fails

Open the failed workflow run and expand the first red step. The most useful logs will normally be under:

- **Install Playwright Chromium**
- **Capture real PINKVERSE UI**
- **Render promo videos**

The workflow deliberately uses Playwright's own Chromium instead of relying on Ubuntu's `/usr/bin/chromium` package.
