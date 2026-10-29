# SLICKK Digital Solutions

Independent digital agency website: software, web experiences, branding, marketing and business documents. Built with Astro and TypeScript; hosted on the existing Cloudflare Pages project `slickk` at https://slickk.online.

## Local development

Use Node.js 22.22 or newer (Node 24 recommended).

```powershell
npm ci
npm run dev
```

Copy `.env.example` to an ignored local `.env` when configuring public build settings. Public Turnstile keys are safe in the browser; private keys and administrator tokens belong only in Cloudflare runtime secrets or ignored local credential storage.

## Verification

```powershell
npm run check
npm run lint
npm run build
npm test
npm run test:browser
```

Browser tests use Playwright; install its Chromium browser if missing with `npx playwright install chromium`. Static Astro preview does not execute Cloudflare Pages Functions, so live intake verification is a separate release check.

## Project map

- `src/data/agency.ts`, `src/data/v4.ts` and `src/data/guides.ts`: services, packages, concept work and guides.
- `src/pages`, `src/components`, `src/styles`: rendered website and interface.
- `functions`: server-side intake, authenticated lead inbox and consent-based event handling.
- `migrations`: existing D1 database schema history.
- `public`: deployed images, fonts, icon and crawler configuration.
- `tests`: content, backend and browser checks.

Concept portfolio studies are self-initiated examples, not client endorsements or delivery claims. Unverified contacts, social profiles and client references remain unpublished. See `ASSETS.md` and `docs/BRAND_GUIDELINES.md` for provenance and logo exports.

## Inquiries and administration

Validated inquiries are saved through Pages Functions to the existing D1 database bound as `INQUIRIES_DB`, after server-side Turnstile verification. The private inbox at `/internal-leads/` requires the runtime `LEADS_ADMIN_TOKEN`; its API enforces authorization. The ignored Windows-encrypted local administrator file can be used by `scripts/open-private-inbox.ps1` on the Windows account that created it.

Automatic email notification is not configured; monitor the private inbox. Tracking requires visitor consent and the corresponding build/runtime flags. Do not place private credentials in Git, static assets, screenshots or public archives.

## Release and recovery

See `DEPLOYMENT.md` for preview, production and rollback steps. Git pushes alone do not upload the website to Pages. Historical release records describe their dated releases, not the current deployment. The flagship cleanup and preserved recovery records are listed in `docs/LEGACY_CLEANUP_REPORT.md`; prior V4 verification remains under `docs/SLICKK_V4_*.md`.
