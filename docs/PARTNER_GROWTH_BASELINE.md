# Partner growth baseline — 30 October 2026

## Verified

- Source checkout started clean at `522d7ef387f849e1941db51ecb80dd246b690b6a` on `slickk-flagship-2026-10-28`; feature branch is `feat/partner-growth-2026-10-30`.
- Existing Astro 7.4.2 build is static, with Pages Functions in `functions/`, a 40-URL sitemap, a quote form and three editorial guides.
- Cloudflare Pages project `slickk` has production branch `main`, D1 binding `INQUIRIES_DB` in preview and production, and a production `GEMINI_API_KEY` secret. Preview has no Gemini key.
- Previous production deployment and rollback point: `b2e2c12b-21f9-42ee-b173-6bc197b244ce` (`https://b2e2c12b.slickk.pages.dev`). Its live release checks are in `docs/RELEASE_VERIFICATION.md`.
- The existing manual GitHub release workflow requires `DEPLOY-SLICKK-V4` plus the `slickk-production` environment. Production remains gated separately from this preview work.
- Existing partner catalog, Business Stack Finder, Workspace/Cloud solution pages and affiliate tracking links: none found in this checkout. Existing `/ai-automation/` demo already uses server-side Gemini, Turnstile and a D1 daily cap; it should be reused, not duplicated.

## Assumptions and limits

- A public GitHub remote URL alone does not prove current visibility; verify repository metadata before pushing.
- Google, Shopify and other partner program terms can change. A vendor listing is not membership or Bangladesh eligibility.
- Cloudflare preview can share the same D1 binding, so no preview write test will touch lead data.
- Current field Core Web Vitals and Google Search Console state were not available from this repo snapshot; historical Lighthouse reports are dated evidence only.
