# SLICKK V4 deployment report

28 October 2026. Branch: slickk-v4-upgrade. Existing agency source e627aaa was matched to production before editing. GitHub main contains the historical fruit site; no force-push or main replacement was performed.

## Release path

Existing pinned Wrangler and Cloudflare Pages project slickk are reused. The owner explicitly requested immediate live deployment and a Desktop backup. No paid plan, domain, DNS record or email configuration was changed.

Preview: https://v4-upgrade.slickk.pages.dev. Initial deployment 8f5e2c7c; corrected security-header deployment 58d26e61. Real contact/quote storage and event recording were verified on preview. All source changes are preserved in the upgrade branch.

Production is live at https://slickk.online. Deployment: 6f1409ab-7f45-4067-bb80-b353e94e83ab, https://6f1409ab.slickk.pages.dev. Deployed source: 33cfd7ffadd68867a61402016fe6b6a3f6e3e6fd. The Cloudflare API confirms this deployment as canonical production with the matching source hash.

Independent live checks passed for all 37 indexable routes, titles, canonical URLs, JSON-LD, raster sharing image, security headers, assets, HTTPS/WWW redirects, branded 404 and unauthorized private API rejection. Authenticated production metrics returned successfully using the encrypted local key, without printing credentials or customer data. Before/after Cloudflare DNS snapshots are identical.

GitHub branch backup succeeded. CI run 40662729821 was in progress when this report was written; no CI success is claimed here. Later documentation-only commits do not change the deployed application.

## Restore and rollback

Previous production deployment: 381f7163-bce7-4376-a069-c61b90f4e310, https://381f7163.slickk.pages.dev. Restore that version through Cloudflare Pages deployment history if needed; do not change DNS. A code rollback does not revert the D1 database or its data.

Source ZIP includes application code, original/optimized assets, Functions, migrations, lockfile, tests, scripts and documentation. Production ZIP includes built static assets plus Functions and restore notes. Credentials are kept in a separate encrypted owner backup, never in source ZIP or GitHub. Database contents are not part of the source archive.

## CI and limitations

The existing agency CI now watches slickk-v4-upgrade and runs check/lint/build/tests/browser checks and Lighthouse. The existing release workflow is updated for explicit V4 manual dispatch. No repository Cloudflare Actions secrets were listed; local authenticated Wrangler is the working deployment route. Future unattended GitHub deployment requires owner-configured restricted Cloudflare credentials and a workflow available on the default branch. Do not deploy old fruit main by accident.

Remaining owner actions: search-account verification, notification sender setup, and verified business profiles. See the visibility and lead reports.
