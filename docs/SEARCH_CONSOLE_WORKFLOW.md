# Search Console workflow — 1 November 2026

## Verified property and baseline

The owner approved verification for `shiyamtalukder75@gmail.com`. Google Search Console auto-verified `https://slickk.online/` using the existing domain-provider verification method; no DNS record was changed. URL Inspection reported the homepage **on Google**, indexed, fetched successfully over HTTPS, crawled by Googlebot smartphone on 30 October 2026, with `https://slickk.online/` as the declared and selected canonical.

The sitemap report showed `https://slickk.online/sitemap.xml` submitted on 28 October, last read on 30 October with status **Success** and **40 discovered pages**. This count predates the 55-page partner release and this 56-page release. Search Console performance and page indexing reports for this newly verified property displayed **Processing data** on 1 November; they are not evidence of zero live traffic or of full index coverage.

The owner-shared [29 October Search Console export](https://docs.google.com/spreadsheets/d/1X2NOvUjMnsgCJDDGFGvoGhHkJspXroydGxfmfYWpFq0/edit) covers 23–27 October. It reports 77 impressions, zero clicks and only the branded query `slickk` in its Queries tab. It is a historical snapshot; it does not measure the new pages or establish current rankings. The Keyword Tool guest query for “website development company” in Bangladesh returned phrase suggestions, including “website development company in bangladesh” and “website development company in dhaka,” but no volume or difficulty metrics.

## Read-only API integration

`npm run gsc:report -- --start=YYYY-MM-DD --end=YYYY-MM-DD` queries the official Search Console Search Analytics API for daily, query and page rows. It uses the URL-prefix property above and `GSC_ACCESS_TOKEN` from the current process environment. It never places an OAuth token in public Astro code, Git, URLs or report output. The token must have the `https://www.googleapis.com/auth/webmasters.readonly` scope and access to this property. No OAuth client or persistent Google credential was provisioned in this release, and the script has not made a live authenticated API call. Its request, error and credential handling have isolated tests.

Search Console uses OAuth 2.0 for private API data. If a later owner-approved Google Cloud OAuth client is created, store its credentials outside the public repository and use the smallest read-only scope. Do not copy an access token into chat, a source file or a PowerShell command history. See [Google's authorization guide](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing) and [Search Analytics query reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

## Release checks

Production deployment `f2ee70b6-26fa-4377-8d3f-56dbad0b92b9` published source commit `37a71a6` to `slickk.online` on 1 November. The prior production deployment `72899920-82f0-4d1a-9412-64610ee6783c` remains the rollback point. The live verifier passed all 56 sitemap routes, metadata, CSP, TLS, static assets, redirects, private API denial and enabled Gemini status. No real inquiry or paid AI call was made.

Preview deployment `507f69d7-eff0-4bcc-ac75-3f3f4f1ad8f0` passed the same 56-route checks with its AI demo correctly disabled. Local Astro check and ESLint passed; 30 unit tests passed; the public [GitHub CI run](https://github.com/shiyamprimetrade-sketch/slickk-website/actions/runs/41300079885) passed clean install, secret scan, check, lint, build and unit tests. The interactive preview guide was inspected in Chrome. The full local browser suite started and reached its last test, but the shell session did not return a final summary; it is not counted as passed for this release.

The existing `sitemap.xml` was submitted again in this property. Google displayed **Sitemap submitted successfully** and then **Success**, last read 1 November, **56 discovered pages**. URL Inspection reported the new SEO checklist as **Discovered - currently not indexed**, with no last crawl. Its live test reported **URL is available to Google** and **Page can be indexed**. The indexing request failed with “We had a problem submitting your indexing request” and “Could not connect to the reCAPTCHA service”; it is not counted as queued. Recheck the indexing/performance reports after Google processes them. A sitemap is a discovery hint, not an indexing guarantee. Google decides crawling, search placement and favicon display.
