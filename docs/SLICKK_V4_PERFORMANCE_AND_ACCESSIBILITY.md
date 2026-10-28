# SLICKK V4 performance and accessibility

Measured 28 October 2026 with installed Lighthouse 13.5.0 and local Chrome against the production build at 127.0.0.1:4321. Lab measurements, not field Core Web Vitals or physical-device certification.

| Build / profile | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Matched V2 / mobile | 100 | 100 | 100 | 100 | 1503 ms | 0.00177 |
| Matched V2 / desktop | 100 | 100 | 100 | 100 | 364 ms | 0.00431 |
| V4 / mobile | 99 | 100 | 100 | 100 | 1654 ms | 0.00925 |
| V4 / desktop | 100 | 100 | 100 | 100 | 446 ms | 0.01021 |

V4 reports had no Lighthouse run warnings. Reports are retained locally under `.wrangler/v4-upgraded-{mobile,desktop}.json` and baseline equivalents. The homepage contains consent controls and local assets. A real Turnstile challenge is loaded only on inquiry pages, so homepage scores do not represent challenge latency.

All 37 indexable pages passed automated Axe WCAG 2/2.1 A/AA checks at desktop, tablet (820 × 1180) and phone widths. No horizontal overflow was detected. Menu keyboard behavior, skip link, filters, form states, quote prefill, consent withdrawal and reduced-motion behavior passed browser tests. Automated UI tests deliberately isolate third-party anti-bot scripts; real intake was separately verified on Cloudflare with successful Turnstile and D1 persistence.

No animation library or new production dependency was introduced. Local fonts, CSS gradients, original SVG assets, image dimensions, lazy loading, visibility pauses and reduced-motion rules preserve a small static build. A complete screen-reader audit and physical-device test remain outside these automated checks.
