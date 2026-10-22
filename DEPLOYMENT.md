# Cloudflare Pages deployment runbook

## Preconditions

1. Review the finished local website and privacy/terms drafts with the owner before publication.
2. Confirm the account owns the active `slickk.online` zone. Do not change account email, registrar or nameservers.
3. Inspect existing Pages projects and web DNS. Do not replace a working deployment without review.
4. Record existing DNS and routing settings privately. Never publish the destination mailbox or tokens.

Run commands one at a time in PowerShell, from `Slickk-Website`.

## Authenticate and inspect

```powershell
npx wrangler --version
npx wrangler whoami
npx wrangler login --device --browser=false
npx wrangler whoami
npx wrangler pages project list
```

Only run login if authentication is missing or wrong. Device flow needs Wrangler 4.119.0+. Approve using the Cloudflare account that contains `slickk.online`. Never paste passwords or API tokens into chat. `whoami` alone does not establish zone ownership: check the dashboard or authorized API as well. If multiple accounts exist, select the confirmed account with `CLOUDFLARE_ACCOUNT_ID` in the local environment.

## Project and upload

Reuse a suitable `slickk` project if present. Check its integration mode and production branch. If absent, creating this free Pages project changes the account and requires the owner’s authorization under workspace instructions:

```powershell
npx wrangler pages project create slickk --production-branch=main
```

After all checks and legal review:

```powershell
npm run deploy
```

Record project, account confirmation, deployment ID, timestamp and returned URL in `REPORT.md`. Visit the deployment URL independently. Do not claim domain activation from upload success.

## Custom domain

In Cloudflare: Workers & Pages → confirmed Pages project → Custom domains → Set up a domain. Inspect existing attachments first. Add `slickk.online`, then `www.slickk.online` if available and authorized. Confirm the exact web records required before applying changes. Preserve MX, TXT and routing configuration.

An authorized API client can use `POST /accounts/{actual_account_id}/pages/projects/{actual_project_name}/domains` with the discovered domain name. Do not invent IDs or print authentication material. Adding the domain through the API may still require DNS setup; check activation state and required web DNS records.

`public/_redirects` redirects WWW to the canonical apex domain once WWW DNS and TLS are active. Do not attach a conflicting existing hostname without owner approval.

## Verification and rollback

```powershell
npm run verify:live
```

Check the actual HTTPS website in a browser on desktop and mobile. Compare MX/SPF and private dashboard routing settings against the baseline. If authorized, send a real incoming email test and have the owner confirm receipt. DNS consistency alone does not prove delivery.

Use the Pages dashboard’s existing deployment history to roll back a release. Do not delete the project or mail DNS. Save prior web record values privately before a domain cutover. A rollback of website content does not automatically restore changed DNS.

## Source control

Local Git is initialized on `main`; inspect `git status` before committing. Commit only reviewed project source and lockfile. No remote or GitHub URL should be reported until verified. Native Cloudflare Git integration and Direct Upload have different constraints; future CI can invoke Wrangler with a least-privilege secret held in the CI secret store.

## Search Console

After the owner verifies domain ownership in Google Search Console, submit `https://slickk.online/sitemap.xml`. Use the provided verification method and preserve other DNS records. This project does not claim verified Search Console access or guaranteed indexing.

## Official references checked

- https://docs.astro.build/en/install-and-setup/
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/changelog/post/2026-08-04-wrangler-login-device-flow/
