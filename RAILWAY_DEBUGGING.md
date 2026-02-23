# Railway Debugging Guide

## Getting 500 Error on /api/subscribe

If you're getting a "Failed to subscribe" error with a 500 status, follow these steps:

### Step 1: Check Railway Logs

1. Go to your Railway project dashboard
2. Click on your web service (not the database)
3. Click the "Deployments" tab
4. Click on the most recent deployment
5. Look at the logs for errors

Common errors you might see:
- `relation "mailing_list" does not exist` → Migration not run
- `Connection refused` or `ECONNREFUSED` → Database not connected
- `password authentication failed` → DATABASE_URL incorrect

### Step 2: Verify PostgreSQL is Added

1. In Railway dashboard, make sure you have a PostgreSQL database added
2. It should show "PostgreSQL" as a separate service in your project
3. If not, click "New" → "Database" → "Add PostgreSQL"

### Step 3: Check Environment Variables

1. Click on your web service
2. Go to "Variables" tab
3. Verify these are set:
   - `DATABASE_URL` (should be auto-set when you added PostgreSQL)
   - `NODE_ENV=production`
   - `PORT` (auto-set by Railway)

### Step 4: Run the Database Migration

The `mailing_list` table needs to be created. You have two options:

#### Option A: Using Railway CLI (Recommended)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link your project (select your project from the list)
railway link

# Run migration
railway run npm run migrate
```

#### Option B: Manual SQL (Easier if CLI doesn't work)

1. In Railway dashboard, click on your **PostgreSQL database**
2. Click the "Query" tab
3. Copy this SQL and paste it in:

```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mailing_list_email ON mailing_list(email);
CREATE INDEX IF NOT EXISTS idx_mailing_list_created_at ON mailing_list(created_at DESC);

-- Create trigger for updated_at
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
```

4. Click "Run Query"
5. You should see "CREATE TABLE" success message

### Step 5: Test the Health Endpoint

After running the migration, test if the database is connected:

Visit: `https://your-app.railway.app/api/health`

You should see:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

If you see `"database": "disconnected"`, the DATABASE_URL isn't set correctly.

### Step 6: Redeploy

After running the migration, redeploy your app:
1. In Railway dashboard, click "Deploy" → "Redeploy"
2. Or push a new commit to GitHub

### Step 7: Test the Form Again

Try submitting the contact form on your website. It should now work!

## Still Having Issues?

Check the server logs in Railway for the specific error message. The most common issues are:

1. **"relation 'mailing_list' does not exist"**
   → Run the migration (Step 4)

2. **"ECONNREFUSED" or connection errors**
   → DATABASE_URL not set or PostgreSQL service not running

3. **"password authentication failed"**
   → DATABASE_URL has wrong credentials (should be auto-set by Railway)

## Verifying It Works

After fixing, you should be able to:
1. Submit the contact form on any page
2. See a "Thank you for joining!" success message
3. Check your PostgreSQL database in Railway to see the new subscriber row
