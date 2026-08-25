# Next Steps (human actions required)

The agent driving this project cannot open financial or identity-verified
accounts — no bank account, no tax ID, no way to pass KYC. Everything that
could be built and deployed for free using only GitHub has been done. The
items below are the specific, small steps only a human can complete.

## Done

1. ✅ **GitHub Pages is live**, deploying automatically via
   `.github/workflows/pages.yml` on every push.
2. ✅ **Tip jar wired up** — the footer "buy me a coffee" link points to
   https://ko-fi.com/kober (2026-08-23).
3. ✅ **Repo renamed to `koberheim.github.io`** (2026-08-23) — site is live at
   the root `https://koberheim.github.io/`, no purchase needed.
4. ✅ **SEO pass (2026-08-23):** FAQ section with schema markup, two guide
   pages targeting long-tail searches, Open Graph preview image, sitemap
   updated. See `planning/BUSINESS_PLAN.md` iteration log for details.
5. ✅ **Google Search Console verification tag added** (2026-08-23) — you
   provided the `google-site-verification` meta tag, it's live in
   `index.html`'s `<head>` and deployed.
6. ✅ **Site verified and submitted in both Google Search Console and Bing
   Webmaster Tools** (2026-08-23). The two highest-leverage discoverability
   steps in this whole plan are now done — indexing is out of the agent's
   and the human's hands from here; it's just a matter of Google/Bing's own
   crawl schedule (typically days, not weeks, once submitted this way).

## Remaining

### If you want a real custom domain later instead

Optional, not needed now. Requires purchasing a domain (~$10-15/year from a
registrar) — the one recurring cost in the whole project. Once you own one:

1. Add a `CNAME` file to the repo containing just the domain, and set it in
   **Settings → Pages → Custom domain**.
2. At your registrar, point DNS at GitHub Pages (either an `ALIAS`/`ANAME`/four
   `A` records at the apex, or a `CNAME` record if using a `www` subdomain —
   exact records depend on which you pick).

Ask the agent to do step 1 and give exact DNS records once you've picked and
purchased a domain.

### Amazon Associates affiliate account (later, once traffic is proven)

Not needed for launch — the validation plan (`VALIDATION.md`) says to check
for real traffic first. If/when there's a reason to believe visitors are
using the tool, an Amazon Associates account would let equipment
recommendations (tanks/filters/heaters) earn a commission. Requires your
identity/tax details.

### Sharing the tool in fishkeeping communities (optional, your call)

**Your account:** active, but little post/comment history anywhere, and none
in any fishkeeping subreddit. Written for that specifically — not the more
common "just post it, you're an established regular" advice, which doesn't
apply here and would likely just get removed or ignored.

**Why the sequencing below matters:** a subreddit's mods and regulars can't
see your account's history on other topics — what they see is a stranger's
*first-ever appearance in their community* being a link to something that
benefits its poster. That reads as spam on its own, regardless of how useful
the tool actually is or how genuine your intent is. It's not a trick to get
around, it's just what showing up already promoting yourself looks like
anywhere. The fix is the same thing that makes any new person welcome in a
community: show up as a normal participant first.

**Step 1 — warm-up, no mention of Tankwise at all (spend a few real
sessions over a week or two):**
Join and genuinely read 1-2 of the subreddits below. Comment or upvote where
you actually have something to add — answering a beginner's question,
agreeing/disagreeing with advice being given, whatever's authentic to you.
The goal is only that your username stops being a blank slate in that
community before you ever mention the tool. This has to be genuine
participation, not a box-ticking exercise — don't manufacture activity
just to hit a number.

**Step 2 — the first mention is a comment, not a post, with disclosure:**
Watch for a thread where Tankwise is *actually the right answer* — someone
asking "how many fish can I fit in X," "why didn't my water change lower my
nitrates," or "how long should I drip acclimate this." Reply to that
specific question first, genuinely, and only add the link as a "here's a
tool that does this math, made it myself" aside. This is lower-risk than a
top-level post (it's judged as a comment on-topic in an existing
conversation, not a new self-promotional thread) and it's also just more
useful to the person asking.

> [Genuine answer to their actual question first.]
>
> Full disclosure, I built a free tool that does this calculation
> automatically if it's useful: [link]. No signup, no ads — happy to hear if
> anything looks off, especially [the specific thing relevant to their
> question — the species list, a warning rule, the dilution math].

**Step 3 — a top-level post, only once step 2 has gone fine at least once
and you've found a subreddit whose rules clearly welcome maker posts:**

> I kept seeing people get told "1 inch of fish per gallon" and end up
> overstocked, so I built a free calculator that uses the surface-area rule
> instead, with a rough bioload weighting per species — plus two smaller
> tools for water-change math and drip acclimation timing. No signup, no
> ads, runs entirely in your browser: [link]
>
> I'm not a huge Reddit poster so go easy on me, but genuinely want to know
> if the species list or the compatibility warnings are missing anything
> obvious — that's the part I'd most value feedback on.

The "I'm not a huge Reddit poster" line isn't filler — naming the exact
thing a skeptical reader is already thinking defuses it better than hoping
nobody notices, and it's just true.

**Subreddits to consider** (check each one's sidebar/wiki rules yourself
before posting — self-promotion rules, required flair, and karma/account-age
minimums change and weren't verified live for this list):
r/Aquariums, r/PlantedTank, r/bettafish, r/shrimptank, r/discus. Pick one to
start, not several — the same link appearing in multiple subreddits close
together is itself a spam signal, independent of your account's history.

**What not to do:** don't cross-post the same content to several subreddits
at once, don't post the top-level version first, don't skip a subreddit's
stated self-promo rule because step 1-2 felt like enough, and don't treat
any of this as something to rush — there's no deadline tied to it.

## Reporting real numbers back

Whenever you check GitHub Pages traffic or the Ko-fi dashboard, drop the
numbers in `planning/REVENUE_LOG.md` (or just tell the agent and it will log
them) so the record stays accurate and separate from projections.
