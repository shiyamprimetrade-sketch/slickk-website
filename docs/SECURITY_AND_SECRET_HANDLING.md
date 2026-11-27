# Security and secret handling — 30 October 2026

`GEMINI_API_KEY` is stored as a Cloudflare Pages encrypted production secret. It is absent from source, built assets, URLs, generated reports and command arguments. The uploaded handoff archive remains on the owner's computer; do not commit or republish it. Access to that archive should be limited to the owner. Rotate the key through Google AI Studio and update the Pages secret if the archive or key has been shared beyond trusted operators.

The browser never receives the key. The API requires same-origin POST, consent, strict input size, Turnstile verification, rate limiting and an atomic daily D1 reservation before calling Google. It sends only a fixed task instruction and the submitted business text. Prompts and outputs are not logged or stored in D1. Cloudflare and Google may process request data under their own policies; the privacy page discloses this.

Production variables: `GEMINI_SHOWCASE_ENABLED=true`, `GEMINI_MODEL=gemini-3.5-flash-lite`, `MAX_AI_REQUESTS_PER_DAY=20`. Preview has no key and remains disabled. Disable quickly by setting `GEMINI_SHOWCASE_ENABLED=false` in the production Pages environment.
