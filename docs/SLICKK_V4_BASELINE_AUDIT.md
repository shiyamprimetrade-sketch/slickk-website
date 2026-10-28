# SLICKK V4 baseline audit

Inspected 28 October 2026. Production: https://slickk.online. Public homepage retrieved directly with TLS validation. Firecrawl was unavailable because its connected account has no credits; no paid service was enabled.

## Source and rollback

- GitHub main: eddc207, still the original fruit-site tree.
- Recovered agency source: release-slickk-v2-2026-10-26 at e627aaa.
- Its build reproduces production assets exactly: Layout.B5cjmgvI.css and Layout.astro_astro_type_script_index_0_lang.L1LVYPkt.js.
- Production Pages deployment: 381f7163-bce7-4376-a069-c61b90f4e310, https://381f7163.slickk.pages.dev, created 26 October. Direct Upload, with no recorded source SHA.
- V4 work branch: slickk-v4-upgrade. Original main preserved by local tag slickk-before-v4-2026-10-28-main. Agency release branches remain intact.
- Roll back with Cloudflare Pages deployment history to the recorded production deployment; do not change DNS or email records. Preserve matching e627aaa source.

## Findings

| Priority | Evidence / affected area | Impact | Action |
| --- | --- | --- | --- |
| P1 | main contains fruit source while production is the agency release | Deploying main could undo the agency site | Work from the matched release, preserve both histories and document the final branch |
| P1 | Pages production env/binding configuration is empty; contact is email-draft mode | No verified server-side lead capture, notifications or conversion storage | Preserve honest draft fallback; harden and test the existing Functions before requesting infrastructure activation |
| P1 | Eight core service pages share three generic sections | Weak service-specific information and differentiation | Add audience, specific deliverables, exclusions, process, pricing context, FAQs and related work |
| P1 | Portfolio previews are numbered gradient blocks | Concepts have no useful work samples | Publish original, clearly labeled concept visuals and richer study pages |
| P2 | Pricing CTAs send package display names that are rejected by the service-select allowlist | Buyer intent is lost at the form | Centralize package-to-service mapping and test all package links |
| P2 | GradientButton supports links only and has no loading/disabled implementation | Inconsistent form/CTA states | Add AnimatedGradientButton while preserving the existing import seam |
| P2 | Infinite CSS animation has mobile/reduced-motion fallbacks but no hidden-tab/offscreen pause | Avoidable desktop work | Add visibility/intersection controls and bounded fine-pointer lighting |
| P2 | SVG-only social image | Inconsistent social preview support | Supply a local raster sharing image with dimensions |
| P2 | Visible breadcrumbs have no BreadcrumbList; service structured data absent | Less explicit machine-readable hierarchy | Add evidence-based breadcrumb and service schema; never ratings |
| P2 | Public HTML contains Cloudflare email obfuscation | Contact availability depends on a decoding script | Keep direct public email actions readable and test the live transformed output |
| P2 | Legal copy still describes draft/future collection | Visitor disclosures may not match activation | Update actual practices; retain clear owner-review status for changes requiring approval |
| P2 | Internal lead UI contains inline style under a strict CSP | Layout rule can be blocked | Replace inline style with a reusable class |
| P2 | Existing inquiry handler does not reject oversized company values; email text joins literal backslash-n | Invalid data and poor notifications | Validate all fields and preserve actual newlines, with regression tests |

## Preserve

Astro static rendering, pinned dependencies, 37 indexable routes, existing contact fallback, portfolio disclosure, owner starting prices, security headers, restricted admin API, original local font, current Pages project, custom domains and all email/DNS settings. Existing unit baseline: 11 passed. No new motion framework is needed.

Mobile/tablet/desktop measurements, browser findings and Lighthouse baselines are recorded alongside final comparisons in SLICKK_V4_PERFORMANCE_AND_ACCESSIBILITY.md. Field traffic, ranking, indexing, actual phone hardware and real mail delivery are not established by this audit.
