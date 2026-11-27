# Growth scenarios — 29 October 2026

All inputs below are **hypothetical assumptions**, not SLICKK traffic, search rankings, or forecasts. The agency has no signup or paid-user funnel. Therefore the requested SaaS equations (`signups = visits × signup rate`, `paying customers = signups × paid rate`, `MRR = paying customers × ARPU`) do not apply to its present offer.

Agency model per month: `visits = impressions × CTR`; `inquiries = visits × inquiry rate`; `qualified = inquiries × qualification rate`; `won = qualified × close rate`; `gross project revenue = won × average collected project fee`. Fractional wins below are **expected values**, not literal clients. `contribution = gross project revenue × assumed contribution margin - fixed site cost`. All currency BDT.

| Scenario | Impressions | CTR | Visits | Inquiry / qualified / close | Expected wins | Average fee | Gross revenue | Contribution at assumed 40% margin, less BDT 1,000 site cost |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| Conservative | 2,000 | 2% | 40 | 2% / 40% / 20% | 0.064 | 8,000 | 512 | -795.20 |
| Baseline | 10,000 | 3% | 300 | 3% / 50% / 25% | 1.125 | 12,000 | 13,500 | 4,400 |
| Optimistic | 30,000 | 4% | 1,200 | 4% / 60% / 30% | 8.64 | 15,000 | 129,600 | 50,840 |

Reproduce with `visits = I*CTR; wins = visits*inquiry*qualified*close; revenue = wins*fee; contribution = revenue*0.4-1000`. Average fee, conversion, margin and site cost are assumptions; actual delivery capacity may constrain the optimistic case. No recurring revenue, churn, API cost, payment fee, or subscription accrual is included because none is active. A real retainer model would add retained customers separately and subtract churn, delivery, payment, infrastructure and acquisition costs.

Sensitivity at baseline, holding other inputs fixed: doubling CTR doubles expected revenue from BDT 13,500 to 27,000; doubling inquiry rate has the same arithmetic effect; increasing close rate from 25% to 30% raises expected revenue to BDT 16,200. These are formula sensitivities, not causal experiments. Search Console can provide actual impressions and CTR; qualified and won stages need a private sales ledger. A 28-day observed baseline should replace all assumptions before allocating spend.
