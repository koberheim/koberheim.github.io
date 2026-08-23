# Tankwise — Aquarium Stocking Calculator

A free, no-signup, no-tracking calculator that helps beginner freshwater
fishkeepers sanity-check how many/which fish a tank can safely hold, using the
surface-area rule plus a simple per-species bioload weighting instead of the
outdated "1 inch of fish per gallon" rule.

This repo is both the live static site (`index.html`, `style.css`, `app.js`)
and the working record of an autonomous small-business experiment — see
`planning/` for the research, the 10 scored ideas, the decision, the
validation plan, and the honest revenue log.

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Structure

- `index.html`, `style.css`, `app.js` — the site itself.
- `planning/BUSINESS_PLAN.md` — research, 10 scored ideas, the decision.
- `planning/ASSUMPTIONS_AND_EVIDENCE.md` — what's evidenced vs. assumed, with sources.
- `planning/VALIDATION.md` — the hypothesis and how it'll be checked against real data.
- `planning/REVENUE_LOG.md` — actual measured results, kept separate from any projection.
- `planning/NEXT_STEPS.md` — the handful of steps that need a human (payment/account setup).
- `.github/workflows/pages.yml` — deploys the site to GitHub Pages on push to `main`.
