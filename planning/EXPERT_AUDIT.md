# Expert Audit — 2026-08-23

Full review of the Tankwise calculator from a fishkeeping-accuracy standpoint,
plus UX/depth/helpfulness. Findings ordered by severity, with what was done.

## Critical — accuracy / trust

### A1. Preset tank volume was displayed wrong (BUG, fixed)
`applyPreset()` set the volume from the preset table, then `render()` immediately
called `syncGallonsEstimate()`, which overwrote it with an estimate assuming a
fixed 14" water height. Measured effect:

| Preset | Displayed | Error |
|---|---|---|
| 10 gal | 12.1 | +2.1 |
| 20 long | 21.8 | +1.8 |
| 29 gal | 21.8 | **−7.2** |
| 55 gal | 37.8 | **−17.2** |
| 75 gal | 52.4 | **−22.6** |

The 29 gal and 20 long showed *identical* volumes (same footprint, different
height). Highly visible to any experienced hobbyist and directly undermines the
site's credibility. **Fixed:** volume is now authoritative from the preset,
user-editable in custom mode, and only auto-estimated when the user hasn't set it.

### A2. No minimum-tank-size check (largest functional gap)
The single most important stocking question — *"will this fish physically fit
this tank as an adult?"* — was not asked. Bioload percentage alone let a common
pleco or clown loach pass in a 29 gal if the budget math happened to allow it.
**Fixed:** every species now carries `minTank` (gallons) and `minLen` (tank
length), both checked and warned on. This is the check that most often prevents
real animal harm.

### A3. Missing "sold small, grows huge" trap species
The species list omitted precisely the fish that cause the most beginner
disasters — the ones sold at 2" that reach 12–18". A stocking calculator that
can't warn about a common pleco is failing at its core job.
**Fixed:** added common pleco (18"), clown loach (12"), bala shark (12"),
common/comet goldfish (12"), Chinese algae eater (10", aggressive as adult),
dojo loach, red-tail/rainbow shark, silver dollar, and more — each with an
explicit `outgrows-most-tanks` advisory.

### A4. No multiple-betta warning
The betta card said "one per tank" but adding two produced **no warning at all**.
Two male bettas in one tank is a well-known lethal outcome. **Fixed** with a
dedicated high-severity rule.

### A5. No temperature-compatibility check
Only a single hard-coded goldfish rule existed. White Cloud Mountain Minnows
(subtropical, 60–72°F) mixed with discus (82–88°F) drew no warning.
**Fixed:** every species carries a `temp` range; the engine intersects all
selected ranges and warns when the overlap is empty or impractically narrow.

## Significant — helpfulness

### B1. Fin-nipper rule was betta-only
Tiger barbs shredding male guppy or angelfish fins is at least as common.
**Fixed:** generalised to a `long-fin` tag across bettas, guppies, angelfish,
and fancy goldfish.

### B2. No shrimp-predation check
Cherry shrimp + angelfish/betta/gourami is a very common and expensive mistake.
**Fixed** as a caution-level (not absolute) warning, since outcomes vary.

### B3. No aggression/territoriality rules
Nothing flagged two territorial "sharks" together, or an aggressive cichlid in a
peaceful community. **Fixed** with territorial and aggressive-mix rules.

### B4. Otocinclus group minimum was too low
Listed 4; widely recommended minimum is 6. **Fixed.**

### B5. Corydoras were one generic entry
Pygmy cory (1", 10 gal) and bronze cory (2.5", 20 gal) have materially different
requirements. **Fixed:** split into bronze/albino, panda, and pygmy.

## Depth

### C1. 27 species was too thin
Honest, but it made the tool unusable for anyone past their first month.
**Fixed:** expanded to **68 species** covering the realistic common hobby —
nano fish (chili rasbora, CPD, ember), popular schoolers (rummynose, glowlight,
black neon, serpae, congo), rainbowfish, hatchetfish, the full common gourami
range, dwarf cichlids (bolivian ram, apistogramma, kribensis), angelfish/discus,
the loach and algae-eater range, both goldfish types, and a proper invertebrate
section (amano, ghost shrimp, assassin snail, African dwarf frog).

Deliberately still excluded: saltwater, most wild-caught/specialist species,
and full regional biotope coverage — accuracy over raw count remains the goal,
and this is stated plainly on the page.

## UX / ease of use

### D1. No way to see your stocking list without scrolling the grid — **fixed** (live summary panel).
### D2. No reset button — **fixed**.
### D3. Search matched names only; "algae" found nothing — **fixed** (searches tags too).
### D4. No category filtering across a now-68-species grid — **fixed** (filter chips).
### D5. Cards didn't show min tank size or temperature — **fixed**.
### D6. No way to share a stocking plan — **fixed** (copyable share link encoding the
plan in the URL). Directly supports the "share it on a forum for feedback"
use case the marketing plan depends on.
### D7. Warnings had a single visual severity — **fixed** (danger vs. caution).

## Code quality
- Dead code (`clamped` computed then `void`ed) removed.
- Warning logic refactored from inline conditionals into a declarative rules
  engine, so new rules are data, not branching.

## Verification
All species data cross-checked against standard published care-sheet ranges.
Every numeric claim in the guide pages re-verified against the new dataset after
the rewrite (see `ITERATION_LOG.md`).
