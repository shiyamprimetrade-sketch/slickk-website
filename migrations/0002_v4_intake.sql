-- Apply once with Wrangler migrations. No existing inquiry data is deleted.
ALTER TABLE leads ADD COLUMN inquiry_type TEXT NOT NULL DEFAULT 'contact' CHECK(inquiry_type IN ('contact','quote'));
CREATE TABLE IF NOT EXISTS inquiry_limits (
  key TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_inquiry_limits_expiry ON inquiry_limits(expires_at);
-- Aggregated, opt-in interaction counts only: no contact data, identifiers or full query strings.
CREATE TABLE IF NOT EXISTS interaction_counts (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  page TEXT NOT NULL,
  service TEXT NOT NULL DEFAULT '',
  total INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY(day,event,page,service)
);
