# SLICKK V4 lead generation

28 October 2026. Owner explicitly approved the free Cloudflare setup and Windows-encrypted administrator key storage.

## Configured resources

- Existing Pages project: slickk, account 787c24edd826a6f65dc162382454ee72.
- D1: slickk-leads-v4, ID 19a51e66-c0f8-40f2-b861-c23df9e01023, binding INQUIRIES_DB.
- Turnstile public sitekey: 0x4AAAAAAFpSucD7-7Bc1qU9. Domains: slickk.online and v4-upgrade.slickk.pages.dev (including their subdomains).
- TURNSTILE_SECRET is an encrypted Pages secret. LEADS_ADMIN_TOKEN is configured only in production. Preview and production share the approved lead database; explicitly labeled test rows must not be counted as genuine customers.
- EVENTS_ENABLED=true enables bounded first-party counters; PUBLIC_TRACKING_ENABLED=true displays opt-in controls.
- Migrations 0001 and 0002 were applied once to the new database through the Cloudflare API. Do not reapply the ALTER TABLE in 0002. No prior lead data existed or was deleted.

## Verified preview behavior

Real browser submissions named SLICKK V4 preview test and SLICKK V4 preview quote test passed Turnstile and produced durable D1 rows. The quote retained logo-design and inquiry_type=quote. Database inspection independently confirmed both records. Actual page_view, consultation_request, contact_request and quote_submission counters were also present. These tests are not business leads.

Server checks include bounded streamed JSON, same-origin requests, field/service/budget allowlists, consent, honeypot, Turnstile hostname/action, atomic salted-IP rate limits (five inquiries per ten-minute bucket; 30 events per minute) and confirmed database writes before success. Expired rate keys are cleaned opportunistically. No raw IP is stored in these application tables. Failure paths fail closed. Private APIs require a long secret, never a PUBLIC variable, URL parameter or browser-persisted credential. CSV formula prefixes are escaped.

## Inbox access

Run `scripts/open-private-inbox.ps1` locally as the Windows account that created the key. It copies the decrypted key to your clipboard and opens https://slickk.online/internal-leads/. Paste the token, load inquiries and clear the session and clipboard afterward. The encrypted local file is `.wrangler/v4-admin-token.clixml`, excluded from Git. The dashboard supports status updates, paged export and aggregate metrics. The Windows-encrypted key cannot be restored under a different Windows account or computer.

## Remaining owner action

Automatic email notification is not configured. Saved inquiries must be checked in the private inbox; the public success message states this accurately. Configure an authorized sending provider and verified sender, then test receipt before claiming notifications work. Existing email/DNS records were not changed. Search Console/Bing access and verified social/WhatsApp details remain owner-required. Interactions are approximate opt-in counts, not unique visitors or trusted attribution; stored inquiries provide the durable lead record.
