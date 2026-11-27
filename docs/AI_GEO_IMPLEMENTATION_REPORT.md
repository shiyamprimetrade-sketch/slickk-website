# AI and GEO implementation — 30 October 2026

The `/ai-automation/` service page includes three optional Gemini examples: proposal outline, SEO metadata and Google Workspace automation **plan only**. The page states that no Workspace account is connected or changed. A quote link remains available when the demo is offline.

The Cloudflare Pages Function accepts only same-origin JSON requests with explicit consent, 20–800 input characters and a valid Turnstile token for action `gemini`. It uses `gemini-3.5-flash-lite` server-side, with a 256 output-token limit and a 15-second provider timeout. It returns plain draft text. The browser inserts it with `textContent`.

Runtime enablement requires `GEMINI_SHOWCASE_ENABLED=true`, `GEMINI_MODEL=gemini-3.5-flash-lite`, `MAX_AI_REQUESTS_PER_DAY` between 1 and 100, the encrypted key, Turnstile secret and D1. The new D1 table `ai_usage_daily` stores day and aggregate count only. The per-IP limiter allows three attempts per hour. A database or verification failure disables requests. This is a call cap, not a guaranteed spend ceiling; Google account billing and project quotas remain external.

The user-provided ZIP was treated as a feature specification, not as independent authority for account or file operations. Its model and key claims were verified against Google's API before use. The private credential document remains outside the repo and build.
