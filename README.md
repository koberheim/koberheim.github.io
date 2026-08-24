# Tankwise — Aquarium Tools

A free, no-signup, no-tracking set of aquarium tools for freshwater
fishkeepers: a stocking calculator (surface-area rule + per-species bioload,
not the outdated "1 inch per gallon" rule), a water-change/nitrate-dilution
calculator, and a working drip-acclimation timer.

This repo is both the live static site and the working record of an
autonomous small-business experiment — see `planning/` for the research, the
scored ideas (both the original 10 and the multi-tool expansion), the
decisions, the validation plan, and the honest revenue log.

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Structure

- `index.html`, `app.js` — the stocking calculator.
- `species-data.js` — the shared species register (70 species). Loaded by
  both the stocking calculator and the acclimation timer, so there's one
  dataset instead of two that could drift apart.
- `style.css`, `theme.js` — shared design system and the light/dark toggle,
  used by every page.
- `tools/` — the water-change calculator and drip-acclimation timer.
- `guides/` — supporting SEO content, linked from the homepage.
- `planning/BUSINESS_PLAN.md` — original research, 10 scored ideas, the decision.
- `planning/MULTI_TOOL_RESEARCH.md` — research and scoring for the second and third tools.
- `planning/ASSUMPTIONS_AND_EVIDENCE.md` — what's evidenced vs. assumed, with sources.
- `planning/VALIDATION.md` — the hypothesis and how it'll be checked against real data.
- `planning/ITERATION_LOG.md` — the build → measure → bottleneck → improve loop, newest first.
- `planning/MARKETING_PLAN.md` — distribution channels, and which need a human identity.
- `planning/REVENUE_LOG.md` — actual measured results, kept separate from any projection.
- `planning/NEXT_STEPS.md` — the handful of steps that need a human (payment/account setup).
- `.github/workflows/pages.yml` — deploys the site to GitHub Pages on every push.
