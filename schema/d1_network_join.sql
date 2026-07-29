CREATE TABLE IF NOT EXISTS network_join (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT    NOT NULL,
  business_name  TEXT    NOT NULL,
  email          TEXT    NOT NULL UNIQUE,
  ip             TEXT,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_nj_email_created
  ON network_join (email, created_at);

CREATE INDEX IF NOT EXISTS idx_nj_ip_created
  ON network_join (ip, created_at);