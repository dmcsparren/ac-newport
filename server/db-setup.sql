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

DROP TRIGGER IF EXISTS update_mailing_list_updated_at ON mailing_list;
CREATE TRIGGER update_mailing_list_updated_at BEFORE UPDATE
    ON mailing_list FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create tryout_registrations table
CREATE TABLE IF NOT EXISTS tryout_registrations (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  primary_position VARCHAR(50) NOT NULL,
  secondary_position VARCHAR(50),
  dominant_foot VARCHAR(10),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  experience TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_tryout_registrations_email ON tryout_registrations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_tryout_registrations_created_at ON tryout_registrations(created_at DESC);

-- Create trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS update_tryout_registrations_updated_at ON tryout_registrations;
CREATE TRIGGER update_tryout_registrations_updated_at BEFORE UPDATE
    ON tryout_registrations FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
