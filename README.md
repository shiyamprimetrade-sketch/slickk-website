# SLICKK website

Static English-language B2B fresh-fruit sourcing website for the Bangladesh market. Public contact: **contact@slickk.online**. Intended canonical domain: **https://slickk.online**.

## Local development

Use Node 24 LTS (minimum 22.22.0) and npm. Run each command from this project directory:

```powershell
npm ci
npm run dev
```

Build and verify:

```powershell
npm run check
npm run lint
npm run build
npm test
npm run test:browser
npm audit
```

Playwright uses the existing Google Chrome installation (`channel: 'chrome'` in its configuration). Browser tests inspect every page for layout overflow, image loading, automated WCAG A/AA issues and console/CSP errors on desktop and mobile. Automated accessibility checks do not replace human assistive-technology review.

`node scripts/serve.mjs` serves production output at http://127.0.0.1:4321 with generated security headers and a real 404 for local QA. `npm run preview` is Astro’s ordinary preview and does not emulate Cloudflare headers.

## Content and source

- `src/data/site.ts`: business constants, navigation, products, values and sourcing markets.
- `src/data/pages.ts`: editorial content and FAQs.
- `src/pages/`: homepage, products, sourcing, contact, FAQs, generated editorial routes, sitemap and 404.
- `src/layouts/`, `src/components/`: shared accessible structure and reusable sections.
- `src/styles/global.css`: responsive green/citrus design, local type and reduced-motion support.
- `src/lib/inquiry.ts`: validated client-side email draft construction.
- `public/`: local fonts, optimized images, branding, robots and WWW redirect.
- `scripts/security-headers.mjs`: build-time CSP hashes and Cloudflare Pages headers.
- `tests/`: production-output, security, inquiry and browser checks.

Product categories are not live inventory. Sourcing countries are interests, not confirmed contracts. HS codes are broad references, not national customs advice. Original images are illustrative. See `ASSETS.md` for provenance.

## Contact behavior and privacy

Email links and the optional inquiry builder open the visitor’s email client. The visitor must send the email. The website has no backend submission endpoint, automatic email sending, database, analytics, tracking cookies, third-party scripts or browser storage. The builder validates fields, encodes the draft and uses a fixed public recipient. Browser-native email apps are an external dependency; webmail users can copy the address.

The owner approved the privacy and terms pages for publication on 22 October 2026. Review `src/data/pages.ts` whenever business practices or website features change. No private forwarding address is included.

## Deployment

Follow `DEPLOYMENT.md`. Use the Cloudflare account containing the existing `slickk.online` zone. Account email need not match the Codex account. Verify account, existing Pages projects and current web DNS before any production changes. Never alter nameservers, MX, SPF, DKIM, DMARC or Email Routing for this deployment.

`dist/` is the upload directory. `npm run deploy` gates upload on types, lint, build and unit/output tests. Run browser tests separately before release. Secrets are unnecessary for the website; prefer Wrangler OAuth for deployment. Never commit tokens or `.env` files. The canonical WWW redirect is a Cloudflare Single Redirect, documented in `DEPLOYMENT.md`.

Cloudflare Direct Upload cannot simply be converted to native Git integration. This project does not configure automatic deployment or incur paid services.

## Evidence and continuity

See `REPORT.md` for executed results and current blockers. `PLAN.md` records scope and checkpoints. Do not treat planned tests, deployment commands or a Pages upload as proof that the custom domain is active. `npm run verify:live` requires a real public HTTPS deployment and checks pages, assets, CSP, 404 and WWW redirect.

On Windows, live HTTP checks use native `curl.exe` with its platform TLS validator. Other platforms use Node fetch. Neither path disables certificate validation. Set `PLAYWRIGHT_BASE_URL=https://slickk.online` in the environment to run browser tests against production; omit it for the local server. See the report for the isolated automated browser’s certificate-date limitation.

Private source backup: https://github.com/shiyamprimetrade-sketch/slickk-website . Public website: https://slickk.online . This is a Direct Upload project; pushing Git does not deploy automatically.
