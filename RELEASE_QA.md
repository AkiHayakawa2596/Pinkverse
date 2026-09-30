# PINKVERSE Fan Arcade v1.0.0-rc28 — Setup Scroll QA

## Pink Tiles
1. Open Pink Tiles on the target phone.
2. Scroll through the song list.
3. Continue downward to EASY / MEDIUM / HARD.
4. Verify every difficulty button is fully reachable and tappable.
5. Start a run and confirm the falling-tile board itself does not page-scroll.

## Cross-game difficulty audit
Verify the difficulty buttons are reachable on:
- Polaroid Pair
- Camera Call
- Lightstick Wave
- Pink Tiles
- Beat Switch
- Pink Cipher
- Stage Route
- Fanlight Grid
- Pixel Choreo
- Encore Dash
- Stage Clash
- Concert Free Play

## Music setup
Pink Tiles / Lightstick Wave / Beat Switch:
- song list scrolls;
- outer setup page can continue to difficulty;
- no horizontal overflow;
- no trapped nested scrolling.

## Regression
- Starting any game removes `game-setup`.
- Existing full-screen/fixed-height gameplay layouts remain unchanged.
- Concert Free Play remains RC27 behavior.
