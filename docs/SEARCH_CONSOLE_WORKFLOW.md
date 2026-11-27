# Search Console workflow — 1 November 2026

## Verified property and baseline

The owner approved verification for `shiyamtalukder75@gmail.com`. Google Search Console auto-verified `https://slickk.online/` using the existing domain-provider verification method; no DNS record was changed. URL Inspection reported the homepage **on Google**, indexed, fetched successfully over HTTPS, crawled by Googlebot smartphone on 30 October 2026, with `https://slickk.online/` as the declared and selected canonical.

The sitemap report showed `https://slickk.online/sitemap.xml` submitted on 28 October, last read on 30 October with status **Success** and **40 discovered pages**. This count predates the 55-page partner release and this 56-page release. Search Console performance and page indexing reports for this newly verified property displayed **Processing data** on 1 November; they are not evidence of zero live traffic or of full index coverage.

The owner-shared [29 October Search Console export](https://docs.google.com/spreadsheets/d/1X2NOvUjMnsgCJDDGFGvoGhHkJspXroydGxfmfYWpFq0/edit) covers 23–27 October. It reports 77 impressions, zero clicks and only the branded query `slickk` in its Queries tab. It is a historical snapshot; it does not measure the new pages or establish current rankings. The Keyword Tool guest query for “website development company” in Bangladesh returned phrase suggestions, including “website development company in bangladesh” and “website development company in dhaka,” but no volume or difficulty metrics.

## Read-only API integration

`npm run gsc:report -- --start=YYYY-MM-DD --end=YYYY-MM-DD` queries the official Search Console Search Analytics API for daily, query and page rows. It uses the URL-prefix property above and `GSC_ACCESS_TOKEN` from the current process environment. It never places an OAuth token in public Astro code, Git, URLs or report output. The token must have the `https://www.googleapis.com/auth/webmasters.readonly` scope and access to this property. No OAuth client or persistent Google credential was provisioned in this release, and the script has not made a live authenticated API call. Its request, error and credential handling have isolated tests.

Search Console uses OAuth 2.0 for private API data. If a later owner-approved Google Cloud OAuth client is created, store its credentials outside the public repository and use the smallest read-only scope. Do not copy an access token into chat, a source file or a PowerShell command history. See [Google's authorization guide](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing) and [Search Analytics query reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

## Release checks

After production deployment, submit the existing `sitemap.xml` again in this property and verify the submission result. Inspect the homepage and the new SEO checklist URL; request indexing once for changed pages if offered. Recheck the sitemap's discovered count and the indexing/performance reports after Google processes them. A sitemap is a discovery hint, not an indexing guarantee. Google decides crawling, search placement and favicon display.
