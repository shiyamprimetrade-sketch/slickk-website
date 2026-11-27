# Legacy cleanup report — 28 October 2026

## Scope and recovery

Cleaned only the SLICKK website checkout on `slickk-flagship-2026-10-28`. No history rewriting, deployment, credentials, account settings, DNS, email records, other projects or database data were changed by this cleanup.

The pre-cleanup gate recorded source `33cfd7f` matching production deployment `6f1409ab-7f45-4067-bb80-b353e94e83ab`. Recovery material is retained in ignored `.wrangler/flagship-before.bundle`, `.wrangler/flagship-before-production.zip` and the existing Desktop V4 backup. These are recovery references, not files to publish.

## Removed files

Usage searches found no active agency imports or asset references to these obsolete files. The old component/data relationship and obsolete test's inquiry import were confined to the removed legacy set.

- `src/components/ProductCards.astro`
- `src/components/SourcingMap.astro`
- `src/components/ContactCTA.astro`
- `src/data/pages.ts`
- `src/data/site.ts`
- `src/lib/inquiry.ts`
- `src/styles/global.css`
- `tests/site.test.mjs`
- `scripts/prepare-assets.mjs`
- `public/images/apples-small.webp`
- `public/images/apples.webp`
- `public/images/grapes-small.webp`
- `public/images/grapes.webp`
- `public/images/hero-small.webp`
- `public/images/hero.webp`
- `public/images/oranges-small.webp`
- `public/images/oranges.webp`
- `public/images/social.jpg`
- `public/wordmark.svg`
- `assets/originals/fruit-still-life.png`
- `docs/qa/desktop-home.png`
- `docs/qa/mobile-home.png`
- `docs/qa/production-home.png`

The obsolete `ContactCTA` was also removed: it had no callers and contained wholesale sourcing copy. Current agency components, styles, portfolio images, favicon and fonts were preserved. Historical screenshots remain recoverable from Git/backups rather than being shipped in the active source tree.

## Archived text and exceptions

Moved historical records without rewriting their dated claims:

| Previous path | Archive path |
| --- | --- |
| `PLAN.md` | `docs/archive/legacy-2026-10-22/PLAN.md` |
| `REPORT.md` | `docs/archive/legacy-2026-10-22/REPORT.md` |
| `docs/qa/cloudflare-deployment.json` | `docs/archive/legacy-2026-10-22/qa/cloudflare-deployment.json` |
| `docs/qa/lighthouse-summary.json` | `docs/archive/legacy-2026-10-22/qa/lighthouse-summary.json` |
| `docs/qa/live-http-checks.txt` | `docs/archive/legacy-2026-10-22/qa/live-http-checks.txt` |

Archived reports retain original path references as historical evidence; removed screenshots can be recovered from the recorded backup. Archive files are outside `public` and are not website output. Existing agency V2/V4 release documents remain as dated history, including baseline references to the previous business identity. They are not current marketing copy or new verification claims.

`tests/agency.test.mjs` intentionally retains forbidden legacy phrases and retired-route expectations to prevent reintroduction. This cleanup report necessarily names removed files. These are the intentional remaining legacy references.

Root `README.md`, `DEPLOYMENT.md` and `ASSETS.md` now describe agency architecture, current inquiry storage, runtime secrets, release checks and asset provenance. No credentials were opened or copied.

## URL policy and validation

Keep valid agency URLs. Unrelated retired product/sourcing URLs must return an actual 404 (or an explicitly justified 410), with useful navigation; do not redirect them to unrelated services or the homepage. Existing retired-route regression tests remain in place. This cleanup did not introduce redirects or modify application routes.

File/import searches were run before removal. A final targeted reference scan checks that no removed module or asset is referenced by current `src`, `functions`, `scripts` or active tests. Build, runtime and browser verification are performed by the integrated flagship release task; this report does not claim those checks passed merely from file cleanup.
