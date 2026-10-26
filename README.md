# Slickk — Software Development & Digital Growth Agency

Slickk is a new Bangladesh-based technology and digital marketing business serving domestic and international inquiries. Public email: contact@slickk.online. Domain: https://slickk.online.

## Current review status

The agency transformation is under review on branch agency-transformation-2026-10-26, forked from source checkpoint 3393a0f5. Changes on this branch are not evidence of production deployment. See AGENCY_RELEASE.md for migration, Cloudflare and rollback instructions. The old fresh-fruit website is preserved in Git history and on the original main branch until the release is approved.

## Build

Requires Node 22.22+ (Node 24 recommended) and npm.

    npm ci
    npm run check
    npm run lint
    npm run build
    npm test
    npm run test:browser

All pages use Astro's static output. Frontend config, provisional prices and verified social links live in src/data/agency.ts. Never invent portfolio clients or publish social URLs that are not owned and verified.

## Contact behavior

Without PUBLIC_TURNSTILE_SITE_KEY the form prepares a mailto draft, which visitors must send themselves. If Turnstile is configured at build time, the form will attempt server-side submission through the Cloudflare Pages Function at functions/api/inquiry.js. This requires Cloudflare Email Sending, a restricted EMAIL send binding, verified recipient INQUIRY_DESTINATION, and TURNSTILE_SECRET configured privately. See AGENCY_RELEASE.md.

No real delivery is claimed until test requests succeed and the destination mailbox confirms receipt. Do not commit private configuration, account secrets, inquiry data or API tokens.

## Deployment

Cloudflare Pages Direct Upload project: slickk (recorded in the historical deployment report). GitHub pushes do not auto-deploy. Preserve the Cloudflare domain, SSL and all email MX/SPF/DKIM/DMARC and routing records; do not move the registrar or zone. Preview with Wrangler on a non-production branch and perform a separate verified production upload only when ready.
