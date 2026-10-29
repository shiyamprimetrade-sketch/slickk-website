# Flagship quality scorecard — 29 October 2026

Scores are internal review judgments, not customer preference research. Weighting rewards trust and useful outcomes above spectacle. Gates below are backed by `TEST_REPORT.md` and source review; the owner authorized production and the live release was verified.

| Criterion | Weight | Score / 5 | Evidence and limitation |
| --- | ---: | ---: | --- |
| Originality and brand coherence | 15 | 4.4 | Constructed logo system, editorial service index, ruled layouts, shared brand assets. Some older secondary pages still use V4 cards. |
| Offer and customer clarity | 15 | 4.4 | Direct hero message, eight service entries, starting prices, three practical guides. No customer research yet. |
| Portfolio truth and usefulness | 12 | 4.5 | Five clearly labeled fictional concepts; full artwork dialog; responsive HTML studies for commerce and dashboard. No commissioned proof available. |
| Accessibility and mobile | 15 | 4.5 | 40-route Axe A/AA checks in three viewports, keyboard behaviors, reduced motion, 360px responsive demo. Manual screen-reader pass pending. |
| Performance | 10 | 4.7 | Mobile Lighthouse 99, LCP 1,880 ms, CLS 0.020; desktop 100. Lab only. |
| Security and privacy | 13 | 4.4 | Restricted CSP, rate-limited Turnstile+D1 forms, private inbox, consent-bound analytics; npm audit zero. Live Turnstile-to-D1 test passed. |
| SEO and editorial | 10 | 4.4 | 40 canonical indexable paths, WebSite/Organization/Article schema, branded favicon and three original guides. Search Console indexing unverified. |
| Delivery and recovery | 10 | 4.3 | Production source verified, Git bundle/output backup, isolated branch and preview. Production release was approved, verified and remains rollback-ready. |

Weighted internal score: **89/100** (rounded). The main open quality gap is independent real-user feedback and owner-supplied client proof. The site deliberately does not publish unsupported endorsements or outcome figures.

## Multi-perspective review

- Visitor: clear offer and route to inquiry; most useful next improvement is real client evidence once rights and facts exist.
- Designer: service rows, color rhythm and geometric brand form are coherent; older secondary card patterns remain less distinctive.
- Engineer: tests, type checks, build and zero-advisory dependencies pass; CSS layering still reflects V2/V4 history and can be consolidated after release if needed.
- Trust reviewer: fictional labels and scope-qualified prices are explicit; no unsupported WhatsApp, social URLs or BAT/Unilever references are published.
- Operations: production rollback is identified; preview and production must remain separate until approved.
