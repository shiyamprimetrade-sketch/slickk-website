# Partner growth release — 30 October 2026

## Current state

Feature branch: `feat/partner-growth-2026-10-30`. Prior production rollback deployment: `b2e2c12b-21f9-42ee-b173-6bc197b244ce`. GitHub repository remains PUBLIC with default branch `main`; neither setting was changed. Production Pages branch is `main`. Production release is authorized by the owner's direct message in this chat, subject to successful preview and regression checks.

Validated preview: `https://937949c9.slickk.pages.dev/`, Cloudflare deployment `937949c9-73ca-4f82-9507-4ee2326307d0`. Tests: clean install, 28 unit, 36 browser, 55 sitemap URLs, 0 detected Axe A/AA violations, mobile Lighthouse 99/100/92/100. See `docs/PARTNER_GROWTH_QA.md`. Production deployment ID, source SHA and live checks will be appended after release. No partner application has been submitted and no partner approval is claimed.

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
