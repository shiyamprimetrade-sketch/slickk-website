# Partner growth release — 30 October 2026

## Current state

Feature branch: `feat/partner-growth-2026-10-30`. Website source commit: `5ecbf4f2274b220024ef68befeee5f89febdee63`. Prior production rollback deployment: `b2e2c12b-21f9-42ee-b173-6bc197b244ce`. GitHub repository remains PUBLIC with default branch `main`; neither setting was changed. Production Pages branch is `main`. The owner explicitly approved live deployment in this chat after the preview was tested.

Validated preview: `https://937949c9.slickk.pages.dev/`, Cloudflare deployment `937949c9-73ca-4f82-9507-4ee2326307d0`. The preview was uploaded before the commit, so its Cloudflare source metadata names the previous HEAD; its files were the tested feature build. Tests: clean install, 28 unit, 36 browser, 55 sitemap URLs, 0 detected Axe A/AA violations, mobile Lighthouse 99/100/92/100. See `docs/PARTNER_GROWTH_QA.md`.

Production: `https://slickk.online/`, immutable URL `https://72899920.slickk.pages.dev/`, Cloudflare deployment `72899920-82f0-4d1a-9412-64610ee6783c`. Cloudflare reports production environment, branch `main`, and source commit `5ecbf4f2274b220024ef68befeee5f89febdee63`, matching the committed website build. The initial live verifier failed because its old 40-route assertion had not been updated. After updating that assertion to 55 and checking sitemap uniqueness, `npm run verify:live` passed all 55 HTTPS routes, metadata, canonical URLs, JSON-LD parsing, CSP, sitemap, robots, static assets, branded 404, WWW redirects, private API denial and the existing enabled Gemini status. A read-only D1 schema check found the existing `leads`, `inquiry_limits` and `interaction_counts` tables plus the earlier `ai_usage_daily` table. No real inquiry or paid AI call was made. A live Pixel 7 smoke test confirmed the Stack Finder returned two local results with no POST request, Bangladesh payment caveat, the existing AI form, and the ICO favicon with HTTP 200. The verifier change after deployment does not change website assets.

No partner application has been submitted and no partner approval is claimed. Search ranking and Google favicon display depend on later crawling and cannot be guaranteed by deployment.

## Five application priorities for the owner

1. [Shopify Partner Program](https://help.shopify.com/en/partners/partner-program/about): free entry, directly relevant to merchant site work. Check Bangladesh merchant payment gateway options before offering checkout work.
2. [Microsoft AI Cloud Partner Program](https://partner.microsoft.com/en-us/partnership): no-cost enrollment with business identity and email verification; benefits and designations are separate.
3. [Zapier Solution Partner](https://zapier.com/l/solution-partner): suited to automation consulting; prepare a working site, custom-domain email and evidence of relevant implementation skill.
4. [Pipedrive Solution Provider](https://www.pipedrive.com/en/solution-provider-partnership): relevant to CRM consulting, but requires CRM expertise and market coverage. Confirm Bangladesh terms before applying.
5. [Cloudflare Partners](https://www.cloudflare.com/partners/): aligned to the existing Pages/DNS experience. Ask about qualification, fees and Bangladesh availability before any application.

Keep only these five in the active application queue. No membership, payouts, credits, discounts or badges are active. Google Workspace referral is not listed for Bangladesh; Google Cloud affiliate is restricted to US/Canada operators. AWS Partner Central requires a paid AWS account plan, so it is outside the default $0 budget.

## Android owner steps

1. Open each official link above in Chrome on Android. Use the real Slickk business name, `contact@slickk.online`, actual Bangladesh address and owner-controlled account. Do not use a different country or bank identity.
2. Before accepting terms, review eligibility, fees, client referral rules, tax and payout method. Save the terms and submission confirmation privately. Do not send credentials or personal documents through the website quote form.
3. If accepted, save the approval email and dashboard proof privately. Only then request a reviewed site update for a badge or tracked link, with a nearby commission disclosure.
4. In Google Search Console on Android, open the `slickk.online` property, inspect the home page and submit the existing sitemap `https://slickk.online/sitemap.xml` if it is absent. Request indexing for the home page after the favicon release. Google may take days or weeks to process it.

## Recovery

Cloudflare Pages deployment history contains the prior production deployment above. Restore that deployment if the new release fails, preserving D1 and existing secrets. The new pages are static and add no D1 migration. A Git branch switch alone does not restore Pages production.
