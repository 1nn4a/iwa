CREATE TABLE IF NOT EXISTS deal_click (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL,
  email       TEXT,
  ip          TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_dc_slug_created
  ON deal_click (slug, created_at);