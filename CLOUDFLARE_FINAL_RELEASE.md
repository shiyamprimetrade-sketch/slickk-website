# Slickk V2 — Final Cloudflare Production Release

**Source branch:** `slickk-digital-solutions-v2-2026-10-26`
**Owner-approved production target:** Existing Cloudflare Pages project `slickk`, domain `slickk.online`.
**Do not edit:** Cloudflare DNS, custom domain bindings, MX, SPF, DKIM, DMARC or Cloudflare Email Routing.
**Rollback baseline:** Prior Cloudflare Pages deployment in `slickk`; original fruit-source Git checkpoint `3393a0f5b35da84792cdbd573bf7d3881f0bc2c3`.

## Source release

- 37 main public routes and five concept case-study pages, plus private staff-facing `/internal-leads/` UI (not in sitemap, noindex).
- SEO metadata, sitemap, semantic headings, keyboard navigation, reduced-motion styles and responsive layouts tested using GitHub Actions.
- Hero and gradient-border CTAs are CSS-based, with mobile animation reduction.
- All named portfolio examples are **illustrative concepts, not paid client outcomes**. Do not add BAT, Unilever, metrics, client logos or testimonials without records and publication rights.
- Pricing is owner-proposed and illustrative, not a guaranteed quote.
- Cloudflare Pages Functions live at `functions/api/` but cannot be deployed by the dashboard's ZIP-only path.

## Step 1 — Add Cloudflare production deploy credentials privately

In the existing Cloudflare account, create a restricted API token with **Account → Cloudflare Pages → Edit**, using Cloudflare's token dashboard. Collect the **account ID** shown in the Cloudflare dashboard.

In GitHub repository **Settings → Secrets and variables → Actions → New repository secret**, save:
- `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: your restricted Cloudflare API token

**Never put these values in chat, a repository file, an issue, or a screenshot.** Do not share raw secrets with support agents.

The workflow `.github/workflows/release-v2-production.yml` targets the **existing** `slickk` Pages project using `npx wrangler pages deploy dist --project-name=slickk --branch=main`. It runs TypeScript checks, linting, npm production dependency audit, build, Node tests and Playwright before deployment and then checks real public routes. If either credential is absent, the workflow intentionally fails **without attempting a deployment**.

## Step 2 — Enable actual server-side inquiry capture (separate binding setup)

The V2 frontend **always works in email-draft mode** unless you configure the public Turnstile site key at BUILD time. Email draft mode explicitly requires the visitor to send their email manually, so no false auto-submission promise is made.

To enable a real form:
1. Create a Cloudflare **Turnstile** widget for `slickk.online` and its intended preview domains. Keep the **secret** private.
2. In the existing Pages project, add environment secret **`TURNSTILE_SECRET`** (Turnstile private key).
3. Create a private **D1 database** for Slickk leads and apply the schema `migrations/0001_leads.sql` using Cloudflare's D1 management interface or authenticated Wrangler, according to the D1 documentation.
4. Bind that D1 database to the Pages Function variable **`INQUIRIES_DB`** (Production; Preview separately if testing preview forms).
5. Create a random private token at least 32 characters long and save as Pages Function secret **`LEADS_ADMIN_TOKEN`**. Restrict access to `/internal-leads/` using Cloudflare Access when possible. The page never embeds or persists the token.
6. Add the Turnstile *public site key* as **GitHub Actions repository variable `PUBLIC_TURNSTILE_SITE_KEY`** (not a GitHub secret; the value appears in public HTML by design) and redeploy using the tested authenticated Wrangler workflow. The private key stays only in the Cloudflare Pages environment.
7. Submit a **real non-sensitive test inquiry** and verify that the private D1 database contains the record and the protected staff inbox retrieves it. Check validation and rate limits. Deactivate the secure form and return to email draft mode if this verification fails.
8. Optionally configure a verified Cloudflare **EMAIL** send binding and **INQUIRY_DESTINATION** secret/variable if your plan supports sending. DNS email routing alone **does not** establish a verified sender domain or ensure delivery. Check actual receipt independently.

Never claim automatic email notification or automated acknowledgment unless a real delivery test passes. D1 stores leads even if an optional email notification fails; this is indicated by the API response.

## Step 3 — Confirm the live deployment

Read the GitHub **Release Slickk V2 to Cloudflare Pages** workflow run. A green run means the Cloudflare deploy command succeeded **and** public `https://slickk.online/` responded with V2 brand text plus 200 statuses on core pages. If the run fails, production status is **not verified**; check the failed step and Cloudflare dashboard.

Verify on a mobile device:
- /, /services/, /services/logo-design/, /services/brochure-design/, /portfolio/, /pricing/, /contact/
- Navigation, contrast, keyboard/reduced motion, SSL and custom domain www handling.
- Real email reception and the full backend lead path **separately** after configuration.

## Remaining owner review and non-automatable proof

- Legitimate business social accounts, number-based WhatsApp link and meeting-booking platform must be verified/connected before listing.
- Real commercial case-study evidence, rights to use customer logos and testimonials, actual photos and work samples are required before publishing them as client work.
- Draft privacy/legal notices and package prices require approval against actual operational policies.
- Search Console, analytics and external conversions require account access and consent/legal review. Lighthouse lab scores are not field Core Web Vitals.
- Follow-up scheduling and marketing automations require actual recipient and timing policy, avoiding unsolicited messages.

**Do not equate source-ready, test-green, deployed, and lead-delivery-verified; they are four distinct outcomes.**
