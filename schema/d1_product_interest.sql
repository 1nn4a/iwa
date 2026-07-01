 
CREATE TABLE IF NOT EXISTS product_interest (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT    NOT NULL,
  email           TEXT    NOT NULL,
  products        TEXT    NOT NULL,    
  primary_product TEXT    NOT NULL,
  ip              TEXT,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

 CREATE INDEX IF NOT EXISTS idx_pi_email_created
  ON product_interest (email, created_at);

 CREATE INDEX IF NOT EXISTS idx_pi_ip_created
  ON product_interest (ip, created_at);