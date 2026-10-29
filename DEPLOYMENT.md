# Deployment and recovery

Target: existing Cloudflare Pages project `slickk`, serving https://slickk.online. Preserve its custom-domain bindings, DNS, mail records and Email Routing. No replacement project or domain setup is needed.

## Prepare and verify

Use the existing authenticated Wrangler installation pinned in `package-lock.json`. Run `npx wrangler whoami` to confirm the account before any deployment. If authentication has expired, complete the official Wrangler login flow; never copy credentials into this repository.

Run each release check:

```powershell
npm ci
npm run check
npm run lint
npm run build
npm test
npm run test:browser
```

Inspect desktop and mobile layouts, navigation, keyboard focus, content accuracy and inquiry success/error states. Browser tests are a separate gate: `npm run deploy` does not run them.

## Existing runtime configuration

- `INQUIRIES_DB`: existing D1 database `slickk-leads-v4`.
- `TURNSTILE_SECRET`: encrypted Pages runtime secret; validate challenges server-side.
- `LEADS_ADMIN_TOKEN`: encrypted runtime secret protecting inbox APIs.
- `PUBLIC_TURNSTILE_SITE_KEY`: public build setting for the existing widget.
- `PUBLIC_TRACKING_ENABLED` and `EVENTS_ENABLED`: build/runtime consent-based event controls.

Preserve production secrets and bindings. Preview requires its own working bindings/secrets and a hostname allowed by the Turnstile widget. Migration files record the already-applied schema; do not blindly rerun `0002_v4_intake.sql` against the existing database. Email notifications remain pending verified sender configuration.

## Preview and production

Upload a preview to an approved branch alias using:

```powershell
npx wrangler pages deploy dist --project-name=slickk --branch=<approved-preview-branch>
```

Replace the placeholder before running; confirm that alias is allowed by Turnstile. Verify the returned deployment URL, inquiry storage and authenticated inbox before production approval. Keep a recoverable source snapshot and previous deployment identifier.

After owner approval, from the verified source checkout:

```powershell
npm run deploy
```

This checks, lints, rebuilds and tests before uploading to the Pages production branch `main`. Record the source revision, returned deployment ID, URL and actual verification results in the release report. A Git branch named `main` is not itself evidence that its contents match the current live agency release.

## Live checks and rollback

```powershell
npm run verify:live
```

Also verify HTTPS, www-to-apex behavior, rendered pages, static assets and a deliberate inquiry through the real production form. A successful upload or static page response does not prove intake or email delivery. Do not expose administrator credentials when capturing evidence.

Use Cloudflare Pages deployment history to restore the recorded prior production deployment if needed; preserve D1 data and bindings. Do not apply destructive database rollback. The pre-flagship recovery bundle and production archive are recorded in `docs/LEGACY_CLEANUP_REPORT.md`. Test restore material separately before overwriting working source.

Retired, unrelated legacy URLs should return the useful 404 page, not redirect visitors to unrelated agency offerings. Preserve existing valid agency URLs and internal links.
