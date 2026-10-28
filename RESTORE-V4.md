# Restore SLICKK Digital Solutions V4

Use the source backup and Node.js 24. Extract to a new folder; do not overwrite another project. The old GitHub main is the historical fruit site. Use branch slickk-v4-upgrade for this agency version.

1. Run `npm ci` to restore the exact dependencies from package-lock.json.
2. Copy `.env.example` to `.env` for the enabled public V4 build settings. These values are public, not secrets.
3. Run `npm run check`, `npm run lint`, `npm run build`, and `npm test`.
4. Run `npm run dev` for local UI work. Real Turnstile is restricted to approved website hosts; local UI tests isolate it.
5. Use the existing Cloudflare account and Pages project slickk. Keep INQUIRIES_DB, TURNSTILE_SECRET, LEADS_ADMIN_TOKEN and EVENTS_ENABLED configured in Cloudflare. Do not embed secrets in public files.
6. Preview with `npx wrangler pages deploy dist --project-name=slickk --branch=v4-upgrade`. Verify before publishing with branch=main.
7. Run `npm run verify:live` after production upload. Direct dashboard ZIP uploads do not deploy the Functions backend.

The production archive is a ready-built copy, not a replacement for the source, dependency lockfile and Cloudflare resources. D1 contains live inquiry data and must be backed up separately through the authorized Cloudflare account.

Credential backup is separate and Windows-encrypted. Restore requires the same Windows account on this computer. OAuth tokens expire and can require sign-in again. No account password is available to this project; account recovery remains with the account provider.

See docs/SLICKK_V4_DEPLOYMENT_REPORT.md for release and rollback evidence, and docs/SLICKK_V4_LEAD_GENERATION_REPORT.md for private inbox access.
