# Business Plan

**Objective:** Operate a legitimate internet business generating at least $1/day, starting from $0 upfront cost.

**Date:** 2026-08-23
**Owner:** Autonomous business lead (Claude) + koberheim1@gmail.com (account/payment holder)

## Operating reality (read this first)

This project is being built by an AI agent with no ability to independently open
a bank account, payment processor, or identity-verified account (Stripe, PayPal,
Ko-fi, Amazon Associates, Google AdSense, Gumroad, etc. all require a real human's
identity, tax details, and/or bank account). That means:

- Everything that can be built, researched, written, and deployed **for free using
  only GitHub** is done autonomously in this repo.
- Any step that legally requires a human identity (creating a payment/tip account,
  an affiliate account, posting under a personal social account) is called out
  explicitly in `planning/NEXT_STEPS.md` as a human action item. The agent will not
  fabricate accounts, customers, or usage to work around this.

## Research summary

Search research (queries and sources logged below) on "low-cost online business
ideas 2026" consistently pointed at the same playbook: build a small free web
tool/calculator in a niche with a real pain point, monetize with a tip jar and/or
affiliate links, distribute via SEO and niche communities.

**Important finding:** that exact playbook is now heavily commoditized. Spot-checks
of five different calculator niches (Etsy seller fees, 3D-print pricing, freelance
project quoting, FIRE/retirement, sourdough hydration) each turned up 5-8+ existing
free, competently-built competitors, most updated for 2026. This is documented
evidence, not an assumption — see the source list in
`planning/ASSUMPTIONS_AND_EVIDENCE.md`. It materially changes the plan: winning on
"first free calculator in the niche" is no longer realistic almost anywhere obvious.
The two levers still available are (a) picking a genuinely less-saturated niche, and
(b) competing on trust/accuracy/UX and direct community distribution rather than
outranking established domains on Google.

## 10 ideas, scored

Scale 1 (worst) – 5 (best) per column. "Competition" and "Operating cost" are scored
so that higher is always better (5 = little competition / near-zero cost).

| # | Idea | Demand | Competition | Ease | Monetization | Acquisition | Op. cost | Total /30 |
|---|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | Etsy seller fee & profit calculator | 4 | 1 | 5 | 3 | 2 | 5 | 20 |
| 2 | Freelance project quote / day-rate calculator | 3 | 1 | 5 | 2 | 2 | 5 | 18 |
| 3 | 3D-print pricing calculator | 3 | 1 | 5 | 3 | 2 | 5 | 19 |
| 4 | Multi-provider LLM API cost calculator | 4 | 1 | 4 | 2 | 2 | 4 | 17 |
| 5 | Pet lifetime cost calculator | 3 | 2 | 5 | 3 | 2 | 5 | 20 |
| 6 | Coast FIRE / retirement number calculator | 4 | 1 | 3 | 2 | 2 | 5 | 17 |
| 7 | No-signup client-side freelance invoice generator | 4 | 2 | 3 | 3 | 3 | 5 | 20 |
| 8 | **Aquarium stocking & bioload calculator** | 3 | 2 | 4 | 3 | 3 | 5 | **20** |
| 9 | Niche newsletter + affiliate content | 3* | 3 | 2 | 2 | 2 | 4 | 15 |
| 10 | Curated free-tool directory + affiliate links | 2 | 2 | 4 | 2 | 2 | 5 | 17 |

\* Newsletter demand is niche-dependent and wasn't scored against a specific topic, so it's a weaker estimate than the others.

### Notes per idea (why the score)

1-4, 6: Real, evidenced demand, but every one of these is already served by
multiple free, well-built, actively-maintained 2026 competitors found via direct
search — see evidence log. Competition score of 1 reflects that directly, not a guess.
5: Demand and competition weren't directly verified with the same depth of search as
1-4 and 6 (lower confidence estimate, flagged as an assumption).
7: Real recurring-use case (freelancers invoice repeatedly) and a plausible
differentiation angle (private, client-side, no signup), but PDF generation adds
real build complexity for an MVP and the competitive field, while thinner, isn't empty.
8: **Winner (revised after a follow-up check surfaced a competitor missed on the
first pass — see `ASSUMPTIONS_AND_EVIDENCE.md`).** Three real competitors exist,
including the long-established AqAdvisor.com — still fewer than the 5-8+ found in
every other niche tested, but not an empty field, so the score was corrected down
from an initial 3 to a 2 on competition. Real, well-documented pain point
(overstocking harms fish, "1 inch per gallon" is a widely-debunked myth, hobbyists
actively look for better guidance). Natural, non-spammy affiliate fit (tanks/filters/
heaters are genuinely purchased by this audience, repeatedly, as a tank grows).
Active, opt-in-friendly communities (r/Aquariums, r/PlantedTank, fishkeeping forums)
exist for honest one-time sharing — a distribution channel that doesn't depend on
outranking AqAdvisor on Google. Differentiation for the MVP: AqAdvisor is powerful
but dated and complex (500+ species, freshwater+saltwater, older UI); this project
deliberately scopes down to ~20-25 common beginner freshwater species with a fast,
modern, mobile-first UI — a "simpler on-ramp" position, not a "more comprehensive"
one. It still ties two other ideas on raw score (20/30); it's chosen over them for
the affiliate/monetization fit and community-distribution fit described above.
9-10: Viable in theory but slower to reach even $1/day, and directory sites add
little unique value in a market already full of directories.

## Decision

**Selected: Aquarium stocking & bioload calculator** (idea #8).

Rationale: ties for the highest score, and — more importantly given the competition
finding above — one of the *least crowded* niches of everything tested (3 real
competitors including one dominant incumbent, vs. 5-8+ everywhere else), with a real
underlying pain point, a natural low-friction monetization path (tip jar now,
Amazon Associates affiliate later once the human account exists), and a realistic,
non-spammy distribution channel in hobbyist communities. The MVP is positioned as a
simpler, modern, beginner-focused alternative to the dominant incumbent (AqAdvisor),
not a claim of having no competition.

Scope for the MVP is deliberately narrower than the two existing competitors
(who list hundreds of species): a tank-volume/bioload budget calculator plus a
curated table of ~20 very common beginner freshwater species, clearly labeled as
general planning guidance, not a substitute for species-specific research. See
`planning/VALIDATION.md` for the hypothesis being tested and
`planning/ASSUMPTIONS_AND_EVIDENCE.md` for the full source list.
