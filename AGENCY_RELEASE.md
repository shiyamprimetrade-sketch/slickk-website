# Slickk — Agency Transformation Release / Migration

Prepared 26 October 2026. This is a source-change preview, NOT a verified production deployment.

## Baseline and rollback

* GitHub: shiyamprimetrade-sketch/slickk-website
* Original production-source branch: main
* Source checkpoint: 3393a0f5b35da84792cdbd573bf7d3881f0bc2c3
* Isolated review branch: agency-transformation-2026-10-26
* Existing framework: Astro 7 / TypeScript / npm, static output.
* Recorded hosting: Cloudflare Pages Direct Upload project slickk. Domain/WWW DNS and email routing were not changed.
* Recorded previous Cloudflare deployment: fe506cda-fac0-40a9-91ea-744badcaa42f (as documented in docs/qa/cloudflare-deployment.json, not newly verified).
* Original fruit content is recoverable from original commit/main. Historical assets and business sources are retained in the repository; avoid touching separate Prime International applications or APIs.
* Roll back a future Pages deployment by selecting the last known good deployment in the Pages dashboard. To revert Git source, keep main untouched or revert the merge; do not change mail DNS.

## URL migration

New service routes: /services/, /software-development/, /app-development/, /web-development/, /seo-services/, /digital-marketing/, /content-creation/.
New company routes: /portfolio/, /pricing/, /cookies/. Preserved: /, /about/, /contact/, /faq/, /privacy/, /terms/.
Removed from active output: /products/, /global-sourcing/, /quality-logistics/, /why-slickk/, /for-exporters/, /for-buyers/, /responsible-sourcing/.
Unrelated fruit-import URLs must respond 404/410 rather than redirect to the new homepage; Cloudflare Pages normally returns the branded 404 page when a static route is missing.
No blanket redirects are introduced. Removed paths may lose their existing search rankings; resubmit canonical sitemap and monitor 404/index coverage in Google Search Console after launch.

## Inquiry mode and production gate

Without PUBLIC_TURNSTILE_SITE_KEY, the contact form prepares a mailto draft, which the visitor must send; no automatic submission is claimed.
With PUBLIC_TURNSTILE_SITE_KEY set at Astro build time, the contact page uses a POST to /api/inquiry, which is implemented as a Cloudflare Pages Function under functions/api/inquiry.js. The function requires Cloudflare Turnstile secret TURNSTILE_SECRET and Email Service EMAIL binding, plus INQUIRY_DESTINATION (a verified allowed destination). Restrict the EMAIL binding to its recipient and an onboarded verified sender domain. Configure rate limiting through Cloudflare WAF or INQUIRY_RATE_LIMIT binding. Deploy with Wrangler from repository root, NOT Cloudflare dashboard drag-and-drop (which will not compile functions).
IMPORTANT: Existing Cloudflare Email Routing does not by itself verify a FROM address for Cloudflare Email Sending. Onboard the domain for sending and test this independently. Cloudflare Email Service is in beta and availability/plan limits should be confirmed.
Never put Turnstile secrets or email credentials in source or chat. If secure form prerequisites cannot be met, leave PUBLIC_TURNSTILE_SITE_KEY unset and retain the explicit email-draft fallback. Contact form delivery remains UNVERIFIED until a real accepted test message is received.

## Privacy, SEO, QA, deployment

1. Have the business owner review pricing and all draft legal pages before production publication.
2. Configure actual social profile URLs in src/data/agency.ts only after verification.
3. For social sharing, export agency-social.svg to a raster PNG or JPEG that is tested with Facebook/LinkedIn link previews; SVG preview support is inconsistent.
4. Run npm ci; npm run check; npm run lint; npm run build; npm test; npm run test:browser.
5. Check responsive display (390px/768px/desktop), menu keyboard escape, accessibility, all links and canonical/sitemap; scan generated dist for legacy fruit marketing text and secrets.
6. Update tests and verify Cloudflare Pages Functions using Wrangler locally. Run mocked delivery tests without sending real customer data.
7. After preview validation and owner approval, run npx wrangler pages deploy dist --project-name=slickk --branch=agency-preview-2026-10-26. Verify preview URL and contact fallback; backend test only when bindings are fully configured.
8. Publish production using --branch=main only after tests and account authorization. Do not change Cloudflare DNS, SSL, email MX/SPF/DKIM/DMARC.
9. Record real deployment IDs, screenshots, HTTP status and mail verification only after checking them. Git push alone does not deploy.

No production deployment or live-mail delivery is evidenced by this branch.
