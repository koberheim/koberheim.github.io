# Iteration Log

Tracks the build → measure → identify bottleneck → improve loop from
`BUSINESS_PLAN.md`'s PROCESS. Newest entry first.

---

## Iteration 4 — 2026-08-24: Multi-tool expansion

**Trigger:** user request to research aquarium-community tool needs and add
1-2 more tools, turning Tankwise into a small multi-tool site.

**Research, and an honest limitation:** the plan was to read r/Aquariums,
r/PlantedTank, r/shrimptank, r/discus directly for requested tools. Both
`reddit.com` and `old.reddit.com` are blocked to this environment's fetcher,
so — same as the original research — the method was web search surfacing
existing competitor tooling as demand evidence, not direct thread-reading.
Documented in full, including the exact tools checked and why each was or
wasn't picked, in `planning/MULTI_TOOL_RESEARCH.md`.

**What that research found:** every candidate niche checked (CO2 calculator,
salt dosing, RO remineralization, water-change/nitrate dilution, drip
acclimation) is already saturated with dedicated competitors — consistent
with iteration 1's finding, now confirmed a second time across five more
niches. That ruled out "new calculator, new niche" as a strategy again. The
two tools selected instead lean on two things standalone competitors don't
have: a tank profile already sitting in this site's localStorage, and (for
the timer) an actual live interaction instead of a static formula page.

**Built:**
1. **Water change / nitrate dilution calculator** (`tools/water-change-calculator.html`)
   — exact dilution math including a tap-water-nitrate term most competitors
   assume away, a real multi-change schedule table (directly answering the
   "two 25% ≠ one 50%" misconception), an "unreachable target" check when
   source water itself exceeds the target, and auto-fill from the stocking
   calculator's saved tank volume.
2. **Drip acclimation timer** (`tools/drip-acclimation-timer.html`) — a
   working countdown (timestamp-based, so it stays correct across a
   backgrounded tab) with an end chime, a tap-to-measure drip-rate tool, and
   species-aware duration pulled from the same species register the stocking
   calculator uses (shrimp and water-sensitive/advanced species get a
   longer, gentler default).

**Refactor along the way:** extracted the 70-species dataset out of `app.js`
into `species-data.js`, shared by both the stocking calculator and the new
timer, specifically so the two tools can't drift into disagreeing with each
other about the same species.

**Verification:** scripted tests covering — dilution math against hand
calculation (50% and tap-water-adjusted cases), the unreachable-target and
already-there edge cases, the schedule table's raw cell values (two apparent
"bugs" during testing turned out to be test-script artifacts: `newPage()`
creating a fresh isolated context per call rather than real cross-page
storage, and `allTextContents()` concatenating table cells without a
separator — both re-verified correctly in a single real browsing session),
species-based timer recommendations (shrimp → 75 min/1.5 drops-sec, discus →
75 min/2.5, neon tetra → default 40 min/3), the tap-to-measure tool, a live
timer run to actual completion, pause/resume, nav presence and correct
active-state across all 5 pages, and no mobile horizontal overflow.

**Next checkpoint:** unchanged, **~2026-09-20** — these tools add surface
area for the same traffic problem the checkpoint already measures, not a new
metric to track separately yet.

---

## Iteration 3 — 2026-08-23: Expert accuracy audit & product overhaul

**Trigger:** a full review of the tool from a fishkeeping-accuracy standpoint,
rather than a traffic-driven iteration. Full findings in `EXPERT_AUDIT.md`.

**Bottleneck identified:** *product credibility.* Traffic work is wasted if a
knowledgeable visitor immediately spots something wrong — and there was
plenty to spot. The tool was pleasant but shallow, and one bug was visible
within seconds of use.

**What was found and fixed:**
- **A real display bug:** choosing the "55 gal" preset showed 37.8 gal, and
  29 gal showed 21.8 — the preset volume was being overwritten by a fixed
  14"-height estimate. The 20-long and 29 gal presets displayed *identical*
  volumes. Fixed; volumes are now authoritative and user-editable.
- **The biggest functional gap:** no minimum-tank-size check at all. "Will
  this fish fit this tank as an adult?" is the question that most often
  prevents animal harm, and it wasn't being asked. Added `minTank` and
  `minLen` per species, both enforced.
- **Missing trap species.** The list omitted exactly the fish that cause the
  worst beginner outcomes — common pleco, clown loach, bala shark, comet
  goldfish, Chinese algae eater — all sold at 2" and reaching 10–18".
- **No multiple-betta warning** despite the card saying "one per tank".
- **No temperature compatibility model.**
- Species count 27 → **70**, with new rules for fin-nipping (generalised
  beyond bettas), shrimp/snail predation, territoriality, aggression mixing,
  plant-eaters, jumpers, and mature-tank feeders.
- UX: live stocking summary, reset, shareable plan links, category filters,
  tag-aware search, min-tank/temperature on every card, two-tier warning
  severity, and a sticky status bar so the budget stays visible while
  scrolling a now much longer species list.

**Self-inconsistency caught during verification:** re-checking the guide pages
against the rebuilt dataset showed my own "beginner fish for a 10 gallon"
guide recommending 3 bronze corydoras — a combination the improved calculator
now correctly flags three ways (needs 20 gal, needs a 24" footprint, shoal too
small). The guide was rewritten to recommend pygmy corydoras and to explain
the distinction. A units error in the surface-area guide (raw inches labelled
as "adjusted inches") was also corrected. Both guides' numbers were then
re-verified against the live dataset programmatically.

**Verification:** 10 scripted expert scenarios (min-tank, two bettas,
temperature clash, fin-nipping, shrimp predation, territorial pair, a clean
community, share-link roundtrip, category filter, tag search) all pass; all
five tank presets verified exact; three pages load with zero console errors;
no mobile horizontal overflow.

**Next checkpoint:** unchanged — **~2026-09-20**, per `VALIDATION.md`.

---

## Iteration 2 — 2026-08-23: SEO + marketing prep

**Measured state at start of this iteration:** site live for less than a
day, zero recorded traffic, zero recorded revenue (see `REVENUE_LOG.md`).
Too early for the 4-week traffic checkpoint in `VALIDATION.md`.

**Bottleneck identified:** not conversion, not the product — it's plain
**visibility**. A brand-new page with no inbound links and nothing submitted
to a search engine won't get found regardless of how good the calculator is.

**What was done about it:**
- Added real content depth (FAQ + 2 guide pages) instead of a single thin
  page, to give search engines more to index and more long-tail queries to
  match — every number in the new content was independently recomputed and
  checked against `app.js`'s actual formula before publishing, not just
  eyeballed for plausibility.
- Added structured data (`FAQPage`, already had `WebApplication`), OG image,
  sitemap covering all pages.
- Documented the two things that would move visibility the most (Search
  Console submission, one honest community post) in `NEXT_STEPS.md` and
  `MARKETING_PLAN.md`, and why they need to come from the human rather than
  being automated — both require an identity/account, and for the community
  post specifically, coming from an agent would read as spam and break the
  project's own no-spam rule.
- Checked for a legitimate open-source distribution angle (awesome-list PR)
  and found none relevant to this niche — noted rather than forced.

**What wasn't done, on purpose:** no paid promotion (cost constraint), no
directory submissions using the human's email without asking first, no
community posting under any agent-controlled identity.

**Next checkpoint:** per `VALIDATION.md`, revisit ~4 weeks after Search
Console is submitted *and* at least one community share has happened —
whichever is later. Check GitHub Pages traffic (Settings → Insights →
Traffic) and the Ko-fi dashboard, log real numbers in `REVENUE_LOG.md`, and
re-run this loop: if visibility is still the bottleneck, look at what
searches/referrers are (or aren't) landing; if traffic shows up but $0
revenue, the bottleneck has moved to monetization and Amazon Associates
becomes the priority.

**Update, same day:** human completed both Search Console (verification tag
deployed, site verified, sitemap submitted) and Bing Webmaster Tools. Both
halves of the highest-leverage discoverability step are done. The 4-week
checkpoint clock starts from today (2026-08-23) — target check-in date
**~2026-09-20**. The community-share step is still open and optional; it
would pull useful, faster signal forward if done sooner, but isn't required
to start the clock.

---

## Iteration 1 — 2026-08-23: Research, build, launch

Covered in full in `BUSINESS_PLAN.md`, `ASSUMPTIONS_AND_EVIDENCE.md`,
`VALIDATION.md`. Summary: researched 10 ideas, found the "free calculator"
niches largely saturated, selected aquarium stocking calculator as the least
crowded with a real pain point, built and shipped the MVP, wired up a tip
jar and a free (no-purchase) domain.
