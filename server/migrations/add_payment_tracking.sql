-- Add payment tracking to tryout_registrations
ALTER TABLE tryout_registrations
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS stripe_payment_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS payment_amount INTEGER DEFAULT 9900;

-- Create index for payment lookups
CREATE INDEX IF NOT EXISTS idx_tryout_registrations_payment_status
  ON tryout_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_tryout_registrations_stripe_payment_id
  ON tryout_registrations(stripe_payment_id);
