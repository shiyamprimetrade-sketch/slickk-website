# SEO audit — 29 October 2026

## Verified baseline

SLICKK is a Bangladesh-based creative technology service agency, built with Astro 7 and deployed as static pages plus Cloudflare Pages Functions. Revenue currently comes from project inquiries. It has no consumer AI product, signup flow, subscription, or public API billing. Public inquiry data lives in D1; analytics are first-party aggregate events after consent.

The local production build has 40 canonical sitemap routes. Every route has one H1, a unique title and description, a canonical URL, and server-rendered main content. The sitemap references only public canonical URLs; robots.txt points to it. The private inbox and 404 are noindex. Existing redirects normalize HTTP, www, and trailing slashes. Organization, WebSite, Article, Service, and Breadcrumb JSON-LD match page types. The site has a 1200×630 sharing image. Existing live release passed its 40-route verification; this audit does not claim current Google indexing or rank.

## Findings

| Severity | Finding and evidence | Action |
| --- | --- | --- |
| P1 | `/industries/` had zero incoming links from other public pages in a 40-route built-HTML audit. | Link it from `/services/`, where visitors can find industry fit. |
| P1 | Three editorial guides pointed to quote action but did not link directly to their corresponding service pages. | Add descriptive service links and matching guide links on detailed service pages. |
| P2 | Guide Open Graph type was `website` despite genuine Article JSON-LD. | Set `article` and published date on guide pages only. |
| Observe | Eleven pages had fewer than 250 main-content words. These include contact, policy, FAQ, process, industry and concept pages. Word count alone is not a defect; their distinct purposes are clear. | Review query and engagement data before expanding. Avoid filler. |
| Unknown | No verified Search Console, field Core Web Vitals, ranking, traffic, or attribution data. | Owner connects Search Console; measure 28 days before ranking claims. |

## Performance and privacy

Prior local Lighthouse lab result: mobile 99 performance and 100 accessibility, best practices and SEO; desktop 100 in all four categories (see `QUALITY_SCORECARD.md`). This is lab data, not 75th-percentile field data. No performance defect was proven in this audit, so no image or script rewrite was made. LCP, INP and CLS field thresholds should be checked in Search Console when available. Existing analytics are opt-in aggregate counts; they do not identify Google organic sessions or prove revenue.

## Checkpoints

Baseline: 40 routes, no missing generated files, no duplicate titles/descriptions, one orphan. Implementation: one service-page link removes that orphan; three guide-service paths improve navigation. Validation commands and outcomes are recorded in `seo-implementation-report.md`.

Google guidance: [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
