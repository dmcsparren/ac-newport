-- Create mailing_list table
CREATE TABLE IF NOT EXISTS mailing_list (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  source VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_mailing_list_email ON mailing_list(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_mailing_list_created_at ON mailing_list(created_at DESC);

-- Add a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mailing_list_updated_at BEFORE UPDATE
    ON mailing_list FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
