
ALTER TABLE product_interest ADD COLUMN phone           TEXT;
ALTER TABLE product_interest ADD COLUMN wants_callback  INTEGER NOT NULL DEFAULT 0;
ALTER TABLE product_interest ADD COLUMN preferred_day   TEXT;
ALTER TABLE product_interest ADD COLUMN preferred_time  TEXT;