# PINKVERSE V1 Optimization Report

## Applied

- Quantized 64 sprite PNGs to indexed 256-color PNG where the result saved at least 10%, preserving dimensions and alpha.
- Quantized 6 concert FX strips using the same conservative rule.
- Converted all 3 1600×900 stage backgrounds from PNG to WebP quality 84 and updated runtime references.
- Deferred member sprite warm-up until after `window.load`, then idle time (or a short fallback delay).
- Removed duplicate query/non-query JavaScript and CSS entries from the service-worker shell cache.
- Bumped the service-worker cache generation to `v1.0.0-opt1` so existing installs refresh runtime assets.

## Asset footprint

- Before: **71.81 MiB**
- After: **14.25 MiB**
- Saved: **57.56 MiB (80.2%)**

## Notes

The character/FX files remain PNG so pixel edges and transparency behavior are unchanged at runtime. Only full-stage background art moves to WebP. No gameplay rules, scoring, save schema, or Firebase configuration were changed.
