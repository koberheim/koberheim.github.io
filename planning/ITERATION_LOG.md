# Iteration Log

Tracks the build → measure → identify bottleneck → improve loop from
`BUSINESS_PLAN.md`'s PROCESS. Newest entry first.

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
