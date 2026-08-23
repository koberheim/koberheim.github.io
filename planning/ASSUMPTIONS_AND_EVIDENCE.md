# Assumptions and Evidence Log

Kept separately and honestly so projections never get quietly treated as facts.
Anything not backed by a cited source below is an assumption, and is labeled as one.

## Evidence (from web research, 2026-08-23)

- General low-cost online business ideas for 2026 (Forbes, Shopify, others) converge
  on: services, dropshipping/POD, affiliate marketing, digital products, free tools.
  [Forbes](https://www.forbes.com/sites/liendepau/2025/12/19/low-cost-small-business-ideas-that-make-real-money-in-2026/),
  [Shopify: start with no money](https://www.shopify.com/blog/start-business-without-money),
  [Shopify: low-investment ideas](https://www.shopify.com/blog/low-investment-business-ideas)

- Free web tools + affiliate links is a proven, commonly used indie-hacker monetization
  pattern (e.g., NerdWallet's calculators funneling to affiliate offers).
  [Lasso: affiliate website examples](https://getlasso.co/affiliate-marketing-website-examples/),
  [Indie Hackers: monetizing a project](https://www.indiehackers.com/post/i-will-tell-you-how-to-monetize-your-project-1ac8d0e5d9)

- Ko-fi supports a no-signup-required tip button/widget embeddable on a static site;
  the JS widget uses `document.write()` and can slow page load, so a plain link/image
  button is the safer choice for a static site.
  [Ko-fi tip widget docs](https://help.ko-fi.com/hc/en-us/articles/360018381678-Ko-fi-tip-widget),
  [Technically Product: performant Ko-fi button](https://www.technicallyproduct.co.uk/web-development/using-ko-fi-button-version-keeps-pagespeed-insights-happy/)

- **Etsy fee calculators are saturated.** Direct competitors found: Craftybase,
  Vendoo, Alura, Investomatica, MultiSellr, PageFly, GlobalFeeCalculator (incl.
  country-specific UK/Canada/Australia/Germany variants), Voolist, SellerToolsHQ,
  Futureproof, plus several paid spreadsheet versions on Gumroad.
  [Craftybase](https://craftybase.com/etsy/fee-calculator),
  [Investomatica](https://investomatica.com/etsy-calculator),
  [GlobalFeeCalculator](https://globalfeecalculator.com/etsy-fee-calculator/),
  [MultiSellr](https://multisellr.com/tools/etsy-fee-calculator)

- Current Etsy fee structure (for context, not used in the MVP): $0.20 listing fee,
  6.5% transaction fee on item+shipping, ~3%+$0.25 US payment processing, 12-15%
  offsite ads when applicable (mandatory over $10k/yr sales).
  [Printify: Etsy fees explained](https://printify.com/blog/how-much-does-etsy-take-per-sale/)

- **3D-print pricing calculators are saturated.** Direct competitors found: PrintPal,
  3DPrintForce, Filamath, LayerMath, 3D PriceTag, 3D Print Pricing Calculator,
  Calc3dprint — at least 7 dedicated tools, several explicitly 2026-dated.
  [PrintPal](https://printpal.io/tools/etsy-profit-calculator),
  [Filamath](https://filamath.com/), [LayerMath](https://layermath.com/calculator)

- **Freelance project/rate calculators are saturated.** Direct competitors found:
  Harvest, FreelancePricing.com, MiniWebtool, Teamz Lab, NoToolsLeftBehind,
  FreelancePricingCalculator.com, FreelancerToolkit, Loomrate, FreelanceCalculator.app.
  [FreelancePricing.com](https://freelancepricing.com/), [Loomrate](https://www.loomrate.com/)

- **LLM API pricing calculators are saturated** and actively maintained by
  well-resourced competitors (YourGPT, PricePerToken, CostGoat, BenchLM, Fungies,
  IntuitionLabs, MorphLLM, Developers Digest).
  [YourGPT](https://yourgpt.ai/tools/openai-and-other-llm-api-pricing-calculator),
  [PricePerToken](https://pricepertoken.com/), [CostGoat](https://costgoat.com/compare/llm-api)

- **Sourdough hydration/baker's-percentage calculators are saturated.** Direct
  competitors found: SourdoughTalk, GigaCalculator, BakingStarter, FlexSourdough
  (claims 2,973+ test loaves behind their numbers), Flourwise, CalculatorTeam,
  SourdoughJoe.
  [SourdoughTalk](https://sourdoughtalk.com/sourdough-calculator/), [Flourwise](https://flourwise.com/calculator/)

- **Aquarium stocking calculators are less crowded than every other niche tested,
  but not empty — a follow-up search corrected an initial miss.** First pass found
  two competitors: AquariumStocking.com (90+ species) and
  AquariumStockingCalculator.com (800+ species). A deliberate follow-up check then
  surfaced **AqAdvisor.com**, a long-established, well-known "intelligent" freshwater
  + saltwater stocking calculator with 500+ species and real brand recognition in
  the hobby. Correcting for this: the niche has ~3 real competitors, not 2 — still
  meaningfully fewer than the 5-8+ found in every other niche checked, but not a
  clean gap. AqAdvisor's own positioning and third-party guides note it as a
  powerful but dated/complex tool best paired with further research — which is the
  opening used for this project's differentiation (see `BUSINESS_PLAN.md`): a
  smaller, modern, mobile-friendly, beginner-scoped alternative, not a claim of "no
  competition."
  [AquariumStocking.com](https://aquariumstocking.com/),
  [AquariumStockingCalculator.com](https://www.aquariumstockingcalculator.com/),
  [AqAdvisor.com](https://aqadvisor.com/),
  [Nippyfish: AqAdvisor user guide](https://nippyfish.net/2019/05/08/aqadvisor-user-guide/)

- Side-hustle income surveys (Bankrate via multiple 2026 roundups) report a mean of
  ~$885/mo and *median* of ~$200/mo across all side hustles — most of that from
  active services, not passive free tools. This is general market context, not a
  projection for this specific project.
  [Jobright: side hustles 2026](https://jobright.ai/blog/best-side-hustles-2026/)

## Explicit assumptions (not directly evidenced — treat as hypotheses to test)

- A tank-volume + bioload calculator, kept to ~20 curated common species, is "good
  enough" to be useful to a beginner fishkeeper even though it covers far fewer
  species than the two existing competitors. **Untested until real users try it.**
- Species adult-size/temperament/bioload data used in the tool comes from the
  agent's general training knowledge of widely-published fishkeeping facts (the kind
  found in any standard care-sheet), not from a single live source per species, and
  not fabricated. It is presented as approximate planning guidance with an explicit
  disclaimer, matching how the existing competitor tools frame the same kind of data.
- Fishkeeping communities (Reddit r/Aquariums, r/PlantedTank, forums) will tolerate
  one honest, non-spammy share of a genuinely free tool. **Not verified** — community
  rules vary and change; the human should check each community's self-promotion
  rules before posting (see `planning/NEXT_STEPS.md`).
- $1/day is achievable from tip-jar + (later) affiliate revenue on a small, honestly
  distributed tool within a few months. This is a hypothesis, not a projection based
  on this project's own data — there is no traffic or revenue history yet.

## What counts as "evidence" going forward

Once live, real evidence is: GitHub Pages traffic (Settings → Insights → Traffic,
free, no extra signup), actual Ko-fi tip totals reported by the human account
holder, and actual affiliate click/conversion data once that account exists. All of
this goes in `planning/REVENUE_LOG.md`, kept separate from any projection.
