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

## Remaining

### Submit the sitemap to Google Search Console (biggest remaining lever, ~5 min, free)

This is the single highest-leverage thing left, and only you can do it — it
needs your Google login:

1. Go to [search.google.com/search-console](https://search.google.com/search-console), add a property using
   **URL prefix**: `https://koberheim.github.io/`.
2. Verify ownership — the easiest method here is **HTML tag**: Google gives
   you a `<meta name="google-site-verification" ...>` tag. Send it to the
   agent (or paste it into `index.html`'s `<head>` yourself) and push.
3. Once verified, submit the sitemap: `https://koberheim.github.io/sitemap.xml`.

Without this, Google will still eventually find the site, but it can take
weeks; Search Console usually gets it indexed in days.

**Bonus:** [Bing Webmaster Tools](https://www.bing.com/webmasters) has an
"Import from Google Search Console" button that does steps 1-3 for Bing/
ChatGPT-search/Copilot in about 30 seconds once GSC is set up.

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

Distribution plan in `VALIDATION.md` relies on one honest, non-spammy share
in a relevant community (e.g. r/Aquariums, r/PlantedTank) rather than paid
ads. This should come from you, personally, on an account with real posting
history — a first post from a brand-new/agent-controlled account reads as
spam and most communities' rules discourage exactly that. A suggested,
honest post (edit freely):

> Built a free aquarium stocking calculator that uses the surface-area rule
> instead of "1 inch per gallon," with a rough bioload weighting per species.
> No signup, no ads, calculations run in your browser. Feedback (especially
> on the species list or the compatibility warnings) welcome:
> [your link]

Check each community's self-promotion rules before posting (some want a
flair, some restrict how often you can post your own content).

## Reporting real numbers back

Whenever you check GitHub Pages traffic or the Ko-fi dashboard, drop the
numbers in `planning/REVENUE_LOG.md` (or just tell the agent and it will log
them) so the record stays accurate and separate from projections.
