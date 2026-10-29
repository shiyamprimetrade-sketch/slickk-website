# Flagship test report — 29 October 2026

## Executed gates

- `npm run check`: 41 files, zero errors/warnings/hints, after excluding Playwright's generated report from the TS source set. The prior run exhausted Node's 2 GB heap because that generated report was scanned; it was not an application type error.
- `npm run lint`: passed.
- `npm run build`: 42 static HTML pages, 40 public sitemap routes, restricted `_headers` generated with zero executable inline script hashes.
- `npm test`: 16 passed, including SQLite persistence/rate-limit tests, Turnstile failure handling, admin authentication, privacy bounds and image dimensions.
- `npm run test:browser`: 24 passed across desktop 1280px, tablet 820px and mobile iPhone 13. Every public route returned 200, had one H1, no horizontal overflow and no Axe WCAG 2.0/2.1/2.2 A/AA findings. Navigation, keyboard menu, FAQ, quote prefill, form success/error, analytics consent and 404 passed. The six focused browser checks passed for native artwork dialog, focus return, responsive demo controls, loaded images and PNG response.
- Visual screenshots after loading lazy artwork: ignored `.wrangler/flagship-desktop.png` and `.wrangler/flagship-mobile.png`. All home images reported `complete` and `naturalWidth > 0`.
- Local Lighthouse simulated mobile: performance 99, accessibility 100, best practices 100, SEO 100; LCP 1,880 ms; CLS 0.020; transfer weight 112,816 bytes. Desktop: 100/100/100/100; LCP 486 ms; CLS 0.0078; transfer weight 115,425 bytes. These are lab results, not field Core Web Vitals. The mobile LCP is about 226 ms slower than the prior V4 lab result of 1,654 ms; the design gains substantial content and remains 99 performance.
- `npm audit` initially found 1 high and 2 moderate advisories in Wrangler's development toolchain. Upgraded pinned Wrangler from 4.151.3 to 4.155.0; install audit reported 0 vulnerabilities. No production JavaScript dependency was added.

- Production `npm run verify:live` passed for 40 routes, static assets, restricted APIs, branded 404, HTTP/HTTPS and www redirects. The first Windows curl-based attempt timed out intermittently; direct Node HTTPS requests completed the full gate with TLS verification enabled.
- A synthetic production quote saved successfully through real Turnstile and D1; a filtered D1 read returned one matching record. Notification remained truthfully unconfigured.
- GitHub CI for content commit `c09c879` passed.

## Boundaries

Automated Axe reports no detected violations; manual screen-reader testing remains unperformed. The preview browser did not complete a real inquiry because navigation timed out; production form storage and Turnstile were then verified directly. The 40-route preview HTTP smoke test also passed. Search indexing and real visitor outcomes require external observation. Lighthouse tests used local preview and simulated network/CPU, not live production traffic.
