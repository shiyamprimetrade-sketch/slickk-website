# SLICKK local SEO baseline — 29 October 2026

This report was saved before site-source changes for the local SEO mission. `SEO_BASELINE_INVENTORY.csv` is a 40-route machine-readable inventory generated from the current Astro build. `node scripts/seo-inventory.mjs --live --output=SEO_BASELINE_INVENTORY.csv` fetched all 40 public URLs from `https://slickk.online/`; all returned HTTP 200. This is an equivalent project/live inventory, **not a Screaming Frog crawl**. No Screaming Frog exports or existing GBP categories were found in the available workspace.

## Current structure

Astro 7.4.2 generates 42 pages; 40 canonical public URLs are in the sitemap. Cloudflare Pages hosts static pages and inquiry Functions. The site is an independent Bangladesh-based creative technology service business. Homepage title: `Creative Technology, Branding & Digital Solutions | Slickk Digital Solutions`; H1: `We Design. We Build. We Elevate.` Its lead names brands, websites and software. Eight capability rows link directly to broad service URLs, including the six requested offerings. The broad URLs are `/web-development/`, `/software-development/`, `/app-development/`, `/seo-services/`, `/digital-marketing/`, and `/content-creation/`.

Detailed URLs already exist for website development, app development, SEO and digital marketing under `/services/`. No `/services/software-development/` or `/services/content-creation/` exists. The broad pages do not link contextually to their matching detailed pages, and detailed pages do not link back to broad parents. Homepage prose does not naturally spell out all six requested service categories. It says Bangladesh and worldwide, not Dhaka; no physical office or in-person service was verified. The existing homepage, service hub, and footer give every sitemap route at least one incoming internal link; no route is orphaned at the site level.

## Technical baseline and risks

Built pages have unique titles and descriptions, one H1, canonical URLs, and static rendered content, as checked by the existing 17-test suite. Sitemap and robots.txt already work; previous live verification confirmed 301 HTTP/www normalization and 404 for a missing page. Organization, WebSite, Service and Article JSON-LD are already present where applicable. The live contact form had been verified in the earlier deployment; this mission will recheck existing behavior. Historic fruit routes have been retired and the existing tests reject fruit business claims. Current Search Console data, real rankings, traffic, Core Web Vitals field data, GBP eligibility and current GBP categories are unknown.

Google's eligibility rule requires in-person customer contact for a Business Profile; an online-only business is ineligible. Do not create GBP or LocalBusiness markup until the owner confirms eligible in-person service. Google categories must come from its official category list; the six requested offerings are organic site categories, **not verified official GBP categories**. See [eligibility](https://support.google.com/business/answer/13763036), [category rules](https://support.google.com/business/answer/3038177), and [category API](https://developers.google.com/my-business/reference/rest/v4/categories/list).

## Priorities

P0: preserve all live URLs and infrastructure; verify title/canonical/link behavior after changes. P1: clarify six services on homepage, add direct links to each intended category, and connect broad categories with existing detailed service pages. Do not create duplicate or thin nested URLs from the candidate list. P2: revisit city targeting and GBP only with verified service-area and in-person evidence. No unsupported Dhaka office claim, reviews, location coordinates or category label will be published.
