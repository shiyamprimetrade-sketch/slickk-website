# Partner growth QA — 30 October 2026

## Scope and evidence

- Existing Astro 7 site, 40 prior sitemap identities, Cloudflare Pages project, D1 lead schema, quote form, consent controls and private APIs are preserved.
- Fifteen new indexable URLs cover the Business Technology Hub, four distinct tool guides, a program research page, three solution pages, a disclosure page and four original checklists/guides. Seven tools have editorial summaries; four have detailed reviews.
- The catalog has 35 typed program records. Every status remains `research_only` or `ineligible`; no tracked affiliate URL or public badge exists. `docs/PARTNER_PROGRAMS_STATUS.csv` separates checked evidence from unresolved fields. Most Bangladesh eligibility and payout details remain unconfirmed.
- The existing Gemini showcase is reused. The production secret stays in Cloudflare, not in this feature branch. Preview remains without Gemini key. No new provider call or customer-account action is required for this release.
- A new ICO favicon and 192/512 PNG icons derive from the existing SLICKK mark. The home page advertises the icons and a small manifest. Search-result favicon display still depends on Google recrawl and is not guaranteed.

## Tests

`npm ci --no-audit --no-fund` completed from the existing lockfile. `npm run security:scan` passed 181 source files. An in-memory comparison against the owner-supplied Gemini key found zero matches in 301 source/build files. `npm run check` reported 0 errors/warnings/hints; lint passed; the build generated 57 static pages and 55 sitemap URLs; 28 unit tests passed. The four-viewport Playwright suite passed 36/36, including Pixel 7, the Stack Finder's local-only behavior, all pages for Axe A/AA findings, and existing inquiry and consent flows. No real customer inquiry was sent.

Mobile Lighthouse lab on the unchanged home-page design plus new navigation/favicon: performance 99, accessibility 100, best practices 92, SEO 100; LCP 1.954 s, CLS 0.0073. These are lab values, not field Core Web Vitals. The Lighthouse JSON is in ignored `test-results/partner-growth-home-lighthouse.json`; the command wrote the complete report but its process required manual termination after output was saved.

Preview `https://937949c9.slickk.pages.dev/` served the new hub, partner index, three solution pages, quote form, sitemap, robots, favicon and manifest with HTTP 200. Fresh desktop, tablet and Pixel 7 browser contexts loaded `favicon.ico` with HTTP 200 and the expected icon MIME type. Final hub screenshots in `test-results/partner-growth-final-desktop-hub.png` and `test-results/partner-growth-final-android-hub.png` were visually reviewed; neither viewport overflowed horizontally. Preview Gemini status is disabled because the preview environment has no key.

## Independent source checks

- [Google Workspace referral countries](https://workspace.google.com/intl/en_gb/landing/partners/referral/countries/) do not list Bangladesh.
- [Google Cloud affiliate](https://cloud.google.com/affiliate-program) limits operating affiliates to the US and Canada.
- [Shopify Partner Program](https://help.shopify.com/en/partners/partner-program/about) says joining is free, while [Shopify Payments countries](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries) do not list Bangladesh.
- [Zapier Solution Partner](https://zapier.com/l/solution-partner) requires a business website and custom-domain email.
- [AWS Partner registration FAQ](https://docs.aws.amazon.com/partner-central/latest/getting-started/registration-faq.html) requires a paid AWS account plan despite no separate APN joining fee. It is not a zero-cost priority.
- [Webflow affiliate](https://help.webflow.com/hc/en-us/articles/33961372613011-Webflow-s-affiliate-program-overview) excludes direct client referral payouts; [HubSpot affiliate](https://www.hubspot.com/partners/affiliates) is also not designed for client referrals.
- [DigitalOcean referral](https://docs.digitalocean.com/platform/teams/how-to/refer-others/) pays account credits, not cash. [Make affiliate](https://help.make.com/affiliate-program) pays through Wise after three unique paying users and $100 minimum.

## Search and conversion limits

New pages use distinct titles, descriptions, canonicals and direct internal links. Search ranking, indexing speed, AI citations and commercial revenue cannot be promised. The owner should compare Search Console impressions and qualified quote inquiries after the new pages are crawled. No Search Console account data was accessed in this run.
