# Source recovery report — 29 October 2026

Production deployment `6f1409ab-7f45-4067-bb80-b353e94e83ab` was read before editing. Its source commit is `33cfd7ffadd68867a61402016fe6b6a3f6e3e6fd`; the checked-out `slickk-v4-upgrade` head was `7d5756f3eda4416bd840c37c4e4ffc666c451c77`, whose only changes from that commit were the V4 deployment report and browser timeout. Deployed homepage HTML and both referenced Astro CSS/JS assets matched the local `dist` byte-for-byte. This is the active agency source, not the obsolete fruit site in remote `main`.

A Git bundle of all local refs and a production-output ZIP were saved before changes in ignored `.wrangler/flagship-before.bundle` and `.wrangler/flagship-before-production.zip`. The earlier Desktop V4 backup includes source, deployment, test evidence and Windows-encrypted credentials. New work is isolated on `slickk-flagship-2026-10-28`. The old deployment remains the production rollback target. No history was rewritten.
