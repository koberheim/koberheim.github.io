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

### 2. Reddit — adjusted for your actual account (~1-2 weeks, mostly passive, free)

**Your situation, stated plainly:** the account is real and active, but has
close to no post/comment history anywhere, and zero history in any
fishkeeping subreddit specifically. That's a materially different (harder)
starting point than "an established fishkeeping-community regular sharing
something they made," and the plan below is written for it rather than
pretending otherwise. Full detail — subreddit shortlist, sequencing, and
both copy variants — is in `NEXT_STEPS.md` under "Sharing the tool," since
that's the version meant to be acted on directly. The short version:

- A first appearance in a niche subreddit that *is* a link to something you
  made reads as spam to both the mod queue and the regulars, independent of
  how genuinely useful it is — this isn't about your account being "bad,"
  it's what a stranger's very first post looks like in any community.
- The fix isn't a trick, it's just being a normal community member before
  making an ask: spend a little real time genuinely reading and
  participating in 1-2 target subreddits with zero mention of Tankwise
  first, *then* share — as a comment with an upfront "I made this" disclosure
  on a thread where it's genuinely the right answer, before ever trying a
  top-level "look what I built" post.
- This can't be compressed into one sitting, and shouldn't be forced onto a
  deadline — the 4-week checkpoint doesn't depend on it having happened by
  then; it's fine for this to still be "in progress" at that check-in.

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
