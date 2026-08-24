# Multi-Tool Expansion — Research & Selection

**Date:** 2026-08-24
**Goal:** identify 1-2 more tools, grounded in real hobbyist demand, to make
Tankwise a small multi-tool site rather than a single calculator.

## Method and an honest limitation

The plan was to read r/Aquariums, r/PlantedTank, r/shrimptank, r/discus, etc.
directly. `reddit.com` and `old.reddit.com` are both blocked to this
environment's fetcher (`Claude Code is unable to fetch from www.reddit.com`),
so direct thread-reading wasn't possible this round either.

Fell back to the same method as the original research: web search, which
surfaces the same signal indirectly — the *volume and freshness* of dedicated
competitor tools is itself evidence of real demand (nobody builds and
maintains a free calculator nobody asks for), and search results surface
forum threads, blog roundups, and documented common questions across the
hobby, not just Reddit specifically. This is disclosed here rather than
implied — nothing below should be read as "I read these exact Reddit
threads."

## Candidates checked

Same rubric as `BUSINESS_PLAN.md` (1-5, higher always better; competition
score reflects *how little* competition exists).

| # | Idea | Demand | Competition | Ease | Synergy w/ existing site | Notes |
|---|------|:--:|:--:|:--:|:--:|---|
| 1 | CO2 / bubble-count calculator | 4 | 1 | 4 | 2 | 9+ dedicated competitors found, mature market, well-established formula sites (EinstApp, FurCalc, AquariumMath, RotalaButterfly, etc.) |
| 2 | Aquarium salt dosing calculator | 3 | 2 | 5 | 2 | Several competitors (Aqulator, Interpet, Yes!Calculator); also medication-adjacent, which raises the bar for how carefully I'd need to word dosing to avoid it reading as medical advice |
| 3 | RO remineralization / GH-KH calculator (shrimp) | 3 | 2 | 4 | 2 | Dedicated, well-built competitors exist (ShrimpKeepers, AquaKit, Aquatic-Art) with brand-specific dosing (Salty Shrimp, SL-Aqua) that would need constant upkeep to match |
| 4 | Water change / nitrate dilution calculator | 4 | 1 | 5 | **5** | 10 competitors found — the most crowded of all — **but** the underlying confusion ("two 25% changes ≠ one 50%") is one of the most common beginner misunderstandings in the hobby, it's pure math with no upkeep burden, and it's a natural pair with the stocking calculator's tank-volume field |
| 5 | Drip acclimation timer | 4 | 2 | 4 | **4** | Competitors exist but are all *static calculators* — none found actually run a live countdown while you do the task. A working timer is a different, more useful thing to hand someone standing at their tank with a bag of new fish, and it can use the existing species database to flag when a species needs longer/gentler acclimation |

## What every candidate confirms (again)

Consistent with the original research: **every static aquarium-calculator
niche checked is saturated** in 2026, this time including three more (CO2,
salt dosing, remineralization). That rules out "new calculator, new niche" as
a strategy a second time. The two candidates selected below aren't picked for
being uncrowded — #4 is the *most* crowded thing on this list. They're picked
because Tankwise has two things standalone competitors don't:

1. **A tank profile that already exists on the site** (volume, once entered)
   — a paired tool can start pre-filled instead of asking again.
2. **A live interaction, not just a formula** — a timer that counts down is
   functionally different from a page that prints a number, even when the
   underlying math is identical to what a competitor offers.

## Decision

**Selected:**
1. **Water Change / Nitrate Dilution Calculator** — highest raw demand,
   directly answers a documented, common misconception, zero data-maintenance
   burden (it's arithmetic, not brand-specific product dosing), and pairs
   naturally with the existing stocking calculator.
2. **Drip Acclimation Timer** — genuine functional differentiation (a live
   tool, not a static one) for a task that happens on literally every fish
   purchase, which is a higher-frequency recurring-use event than stocking
   planning itself. Ties into the existing species database for
   species-aware guidance.

Not selected, and why: CO2 calculator (too saturated, no synergy angle to
offset it — unlike #4, nothing here is uniquely ours); salt dosing and RO
remineralization (both would need ongoing upkeep to track specific retail
products accurately, which doesn't fit a "measure real numbers before adding
scope" project, and both edge toward medication-adjacent advice where
getting it wrong has real consequences).
