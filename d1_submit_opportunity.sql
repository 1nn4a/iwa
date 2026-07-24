CREATE TABLE IF NOT EXISTS submit_opportunity (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  business_name  TEXT    NOT NULL,
  contact        TEXT    NOT NULL,
  category       TEXT    NOT NULL,
  description    TEXT    NOT NULL,
  timing         TEXT    NOT NULL,
  ip             TEXT,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_so_contact_created
  ON submit_opportunity (contact, created_at);

CREATE INDEX IF NOT EXISTS idx_so_ip_created
  ON submit_opportunity (ip, created_at);
