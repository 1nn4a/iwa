CREATE TABLE IF NOT EXISTS blueprint_interest (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_bi_email_created
  ON blueprint_interest (email, created_at);