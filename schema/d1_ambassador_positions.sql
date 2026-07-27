
CREATE TABLE IF NOT EXISTS ambassador_positions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  title       TEXT    NOT NULL,
  team        TEXT    NOT NULL,
  location    TEXT    NOT NULL,
  posted_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  is_active   INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_ap_active_posted
  ON ambassador_positions (is_active, posted_at);

INSERT INTO ambassador_positions (slug, title, team, location) VALUES
  ('social-media-manager', 'Social Media Manager', 'IWA Ambassador Programme', 'Remote'),
  ('programmer', 'Programmer', 'IWA Ambassador Programme', 'Remote');