# Marketing Plan

Same rule as everything else in this project: no deceptive marketing, no
spam, no fabricated testimonials/reviews/traffic, no mass/cold outreach.
Free/near-free channels only. Every tactic below is either done, in
progress, or explicitly needs a human because it requires an identity,
email address, or account the agent doesn't have and shouldn't act as.

## What's done autonomously (no identity required)

1. **On-page SEO** (`planning/BUSINESS_PLAN.md` iteration log has the details):
   - FAQ section with `FAQPage` schema targeting "People Also Ask"-style queries.
   - Two long-tail guide pages (`/guides/surface-area-rule.html`,
     `/guides/beginner-fish-for-a-10-gallon-tank.html`) that link back to the
     calculator — real, accurate content, not thin SEO filler (every number
     in them was cross-checked against the calculator's own math).
   - `WebApplication` + `FAQPage` structured data, canonical URLs, sitemap.xml,
     robots.txt, Open Graph/Twitter card image so shared links look right.
2. That's the ceiling of what's safe to automate. Everything below either
   needs your identity/email, or needs to come from you personally to be
   authentic and non-spammy.

## What needs you (ranked by effort : impact)

### 1. Google Search Console (5 min, free, highest leverage)
See `planning/NEXT_STEPS.md` — verify the site, submit the sitemap. This is
the single biggest lever available and only takes your Google login.

### 2. One honest post in a relevant community (~15 min, free)
Reddit (r/Aquariums, r/PlantedTank, r/fishtank) or a fishkeeping forum.
Suggested copy is in `NEXT_STEPS.md`. This has to come from your account,
personally — not because the agent is being cautious for its own sake, but
because a first post from a brand-new/agent-run account reads as spam, most
communities explicitly ban that, and it would violate the project's own
"no spam" rule to try to route around it.

### 3. Free tool directories (~5-10 min each, free)
These are a normal, legitimate indie-hacker distribution channel — small
directories that list free tools, typically via a short submission form.
The agent isn't submitting these itself because most ask for a contact
email, and sending your email address to third-party sites without you
explicitly asking is exactly the kind of thing this project shouldn't do
unilaterally. If you want to do a couple, low-effort/decent-traffic options
found in research:
- [Twelve Tools](https://twelvetools.com) — no-signup daily tool spotlight.
- [MyTools.directory](https://mytools.directory) — indie-hacker-tool directory.
- [Where To Submit](https://wheretosubmit.org) — a curated list of *other*
  free directories like these, if you want more options.

### 4. Awesome-list PRs — researched, nothing to submit yet
Checked for a curated "awesome-fishkeeping" or "awesome-free-tools" GitHub
list to contribute an honest PR to (a normal, non-spammy open-source
practice). Didn't find one specific to this niche — "awesome-fish" on GitHub
turned out to mean the *fish shell* (a terminal program), not fishkeeping.
Not worth forcing a submission into an unrelated list. Worth re-checking
occasionally; the agent will note it if one turns up.

## What happens next

Once GSC is set up and/or a community post goes out, the next real signal is
traffic data. Nothing further should be spent on distribution effort until
that data says whether the tool is worth promoting harder or the product
needs rework — see the decision thresholds in `planning/VALIDATION.md`.
