# Next Steps (human actions required)

The agent driving this project cannot open financial or identity-verified
accounts — no bank account, no tax ID, no way to pass KYC. Everything that
could be built and deployed for free using only GitHub has been done. The
items below are the specific, small steps only a human can complete. Nothing
else is blocked on you; the site works and is ready to deploy without any of
these.

## 1. Enable GitHub Pages (required to go live)

The site is a static build with a GitHub Actions workflow
(`.github/workflows/pages.yml`) ready to deploy it. One-time setup:

1. Merge this branch to the repo's default branch (or repoint the workflow's
   `branches:` trigger at whatever branch you deploy from).
2. In the repo: **Settings → Pages → Build and deployment → Source →
   GitHub Actions**.
3. Push to that branch (or re-run the workflow from the Actions tab). The
   site will publish at `https://koberheim.github.io/Test-Website/` (update
   the canonical URL / sitemap / robots.txt in the repo if you attach a
   custom domain instead).

## 2. Set up a tip jar (needed for any revenue)

The footer has a "buy me a coffee" link that currently points nowhere
(`href="#support"`, marked with a `TODO(human)` comment in `index.html`).
Recommended: [Ko-fi](https://ko-fi.com) — free, quick signup, supports
one-time and recurring support, no platform fee on tips.

1. Create a Ko-fi account (or Buy Me a Coffee, whichever you prefer) and
   connect a payout method.
2. Send the resulting page URL (e.g. `https://ko-fi.com/yourhandle`) back so
   it can be wired into the site, or edit the `href` in `index.html` yourself.

## 3. (Later, once traffic is proven) Amazon Associates affiliate account

Not needed for launch — the validation plan (`VALIDATION.md`) says to check
for real traffic first. If/when there's a reason to believe visitors are
using the tool, an Amazon Associates account would let equipment
recommendations (tanks/filters/heaters) earn a commission. This requires your
identity/tax details and a live site with content, which will exist once
step 1 is done.

## 4. Sharing the tool in fishkeeping communities (optional, your call)

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
