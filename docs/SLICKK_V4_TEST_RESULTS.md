# SLICKK V4 test results

28 October 2026.

- Astro check: 44 files, zero errors/warnings/hints.
- ESLint: no issues.
- Production build: 39 HTML pages, including 37 indexable routes, private inbox and 404.
- Node tests: 15 passed. Includes actual in-memory SQLite schema and writes, atomic rate limits, expired-key cleanup, body limits, input rejection, Turnstile failure, authenticated metrics and package/schema assets.
- Browser tests: 18 passed across desktop, tablet and phone. Includes all 37 routes and Axe checks, navigation, no-JavaScript fallback, filters, prefill, busy/error states, reduced motion and analytics consent/withdrawal.
- Real preview contact and quote submissions passed Turnstile and were independently confirmed in Cloudflare D1. Actual optional event rows were also inspected.
- Schema.org Validator: deployed logo-design page, Organization/BreadcrumbList/Service, zero errors and zero warnings.
- Lighthouse: mobile 99/100/100/100; desktop 100/100/100/100. See performance report for measurements and boundaries.

The initial preview revealed Cloudflare dropping an oversized CSP line. The generator was corrected and a 2,000-character regression assertion added. A first local browser attempt could not reach a sandboxed preview; restarting the server in the browser's environment resolved it. Tests using real Turnstile on localhost were separated from UI tests because localhost is not an authorized production-widget hostname. Final UI tests do not claim to validate real challenges; deployed browser submissions provide that evidence.

Production checks and release identifiers are recorded in the deployment report. No email-delivery, search-indexing, physical-device or complete manual accessibility result is claimed.
