# SLICKK service SEO implementation — 29 October 2026

## Scope and evidence

The baseline is frozen in `SEO_BASELINE.md` and `SEO_BASELINE_INVENTORY.csv`. This was a project/live inventory, not Screaming Frog. All 40 production URLs returned 200 before edits. `SEO_URL_INVENTORY.csv` and `SEO_INTERNAL_LINKS.csv` describe the rebuilt site; the latter contains 991 unique rendered source/destination/anchor rows and no destinations outside the 40-route sitemap. The inventory generator is `scripts/seo-inventory.mjs`.

Six organic service categories already had URLs. We retained all existing paths. Four matching detailed pages existed; software and content creation lacked a distinct child offer with enough evidence to justify another page. None of the candidate nested URLs was created. The site remains an Astro/Cloudflare Pages service agency, with its secure inquiry and private D1 inbox intact. No historical fruit content was restored. No DNS, mail, paid services or account settings were changed.

## Implemented changes

| Page | Previous title | New title | Link change |
| --- | --- | --- | --- |
| `/` | Creative Technology, Branding & Digital Solutions | Website Development, Software & SEO Services | The existing eight capability links remain; hero now explains all six requested categories and Dhaka as a target market without claiming an office. |
| `/web-development/` | Web Development | Website Development for Businesses | Links to existing `/services/website-development/`. |
| `/software-development/` | Software Development | Custom Software Development | Existing page and software brief guide retained; no duplicate child. |
| `/app-development/` | App Development | Mobile App Development | Links to existing `/services/app-development/`. |
| `/seo-services/` | Search Engine Optimization | SEO Services & Search Visibility | Links to existing `/services/seo/`. |
| `/digital-marketing/` | Digital Marketing | Digital Marketing for Businesses | Links to existing `/services/digital-marketing/`. |
| `/content-creation/` | Content Creation | Content Creation for Websites & Campaigns | Existing page retained; no duplicate child. |

All titles have the existing `| Slickk Digital Solutions` suffix. Detailed pages link back to their broad parent where one exists. Their visible breadcrumbs and BreadcrumbList JSON-LD include that parent. `src/data/serviceSilos.ts` is the shared mapping; `src/data/agency.ts`, `src/pages/index.astro`, `src/pages/[slug].astro`, `src/pages/services/[slug].astro`, `src/layouts/Layout.astro`, and `src/styles/flagship.css` contain the site changes. `src/scripts/analytics.ts` and `src/styles/v4.css` reveal the optional consent panel through opacity while keeping it inert until visible; this resolved a lab layout shift. `tests/agency.test.mjs` adds silo assertions. `scripts/seo-inventory.mjs` generates reproducible inventories.

The homepage targets businesses in Dhaka and Bangladesh, but does not claim a physical Dhaka office. Google requires in-person customer contact for Business Profile eligibility, which has not been verified. We did not create GBP, select an official category, or add LocalBusiness markup. The six category names in `SEO_GBP_CATEGORY_GAPS.csv` are **website service categories only**. See [Google eligibility](https://support.google.com/business/answer/13763036), [category selection rules](https://support.google.com/business/answer/3038177), and the [official category API](https://developers.google.com/my-business/reference/rest/v4/categories/list).

## Keyword and competitor basis

`SEO_KEYWORD_MAP.csv` distinguishes prior Keyword Tool guest phrase suggestions from editorial hypotheses. No search volume, difficulty, ranking or conversion data was available. Public competitor pages show that the market presents website development, software/apps, SEO, marketing and content writing as separate buyer intents: [iT Services BD](https://itservices.com.bd/pricing/), [Againsoft website development](https://www.againsoft.com/services/website-development), [UXAtom web and mobile](https://uxatom.com/services/web-mobile-development), [Imran Ahmed Moshio technical SEO](https://imranahmedmoshio.com/services/technical-seo), [Digital SproutX content writing](https://digitalsproutx.com/content-writing/). These pages establish presence, not keyword difficulty or an endorsement. Named ChatGPT/Gemini integration pages were rejected because SLICKK has no verified named integration.

## Validation and status

`npm ci` completed after a Windows sandbox `EPERM` retry with elevated filesystem access; 480 packages installed and npm reported 0 vulnerabilities. `npm run check`: 0 errors, warnings and hints. `npm run lint`: no issues. `npm run build`: 42 pages. `npm test`: 19 passed, 0 failed. The test checks unique titles, canonicals, sitemap membership, all public internal links, fruit-claim absence, six homepage category links, category-to-detail links, reciprocal breadcrumbs and inert-by-default consent. The generated sitemap still has 40 URLs. `npm run test:browser` first hit `EADDRINUSE` on port 4321; the final preview-hosted suite passed **24/24** across desktop, tablet and mobile, with Axe WCAG A/AA checks. No live Search Console, rank, field Core Web Vitals, or GBP data was accessed.

Lighthouse 13.5 mobile lab runs on the preview, with the same command/settings: initial performance 94, accessibility 100, best practices 100, LCP 1,902 ms and CLS 0.133; after consent-panel fix performance 97, accessibility 100, best practices 100, LCP 1,808 ms and CLS 0.007. This is lab data, not 75th-percentile field data. Preview SEO scored 69 because its `is-crawlable` audit failed; preview noindex is expected. Production SEO will be measured after release.

Preview `https://48daec30.slickk.pages.dev/` returned 200 on all 40 sitemap routes and 404 on a missing route; the new homepage language and reciprocal website links were present. Production deployment status: **pending owner approval**. Automatic approval review rejected the production upload because this new local-SEO release lacks explicit approval after preview review. The production command was not executed. After approval and deployment, verify all 40 live routes, changed titles, sitemap, canonical tags, redirects, contact route and no new broken links.
