CREATE TABLE IF NOT EXISTS deal_access (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT,
  business_name  TEXT,
  email          TEXT    NOT NULL,
  slug           TEXT    NOT NULL,
  ip             TEXT,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (email, slug)
);

CREATE INDEX IF NOT EXISTS idx_da_email_created
  ON deal_access (email, created_at);

CREATE INDEX IF NOT EXISTS idx_da_slug_created
  ON deal_access (slug, created_at);
