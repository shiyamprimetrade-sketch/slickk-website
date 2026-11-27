-- Aggregate AI request reservations only. No prompts, responses, IPs, or lead data.
CREATE TABLE IF NOT EXISTS ai_usage_daily (
  day TEXT PRIMARY KEY,
  requests INTEGER NOT NULL CHECK (requests >= 0)
);
