# Railway Deployment Setup

This guide will help you set up the AC Newport website with a PostgreSQL database on Railway.

## Prerequisites

- Railway account ([sign up at railway.app](https://railway.app))
- Your code pushed to GitHub

## Step 1: Add PostgreSQL Database

1. Go to your Railway project dashboard
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway will automatically create the database and set the `DATABASE_URL` environment variable

## Step 2: Run Database Migration

After deploying your app and adding the database, you need to create the mailing_list table:

### Option 1: Using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link your project
railway link

# Run migration
railway run npm run migrate
```

### Option 2: Manual SQL Execution

1. Go to your PostgreSQL database in Railway
2. Click "Query" tab
3. Copy and paste the contents of `server/db-setup.sql`
4. Execute the query

## Step 3: Verify Environment Variables

Your Railway app should have these environment variables set automatically:

- `DATABASE_URL` - Auto-set when you add PostgreSQL
- `NODE_ENV` - Set to `production`
- `PORT` - Auto-set by Railway

## Step 4: Deploy

Railway will automatically deploy when you push to your main branch.

The build process will:
1. Install dependencies
2. Build the frontend (Vite)
3. Compile the backend (TypeScript → JavaScript)
4. Start the Express server

The server will:
- Serve the frontend from `/dist`
- Handle API requests at `/api/*`
- Connect to the PostgreSQL database

## Local Development

1. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your local or Railway database URL

3. Run the migration:
   ```bash
   npm run migrate
   ```

4. Start the development servers:
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   npm run dev:server
   ```

## API Endpoints

- `POST /api/subscribe` - Subscribe to mailing list
- `GET /api/health` - Health check endpoint

## Troubleshooting

### Database connection errors

- Ensure `DATABASE_URL` is set in Railway environment variables
- Check that the PostgreSQL database is running
- Verify the migration has been run

### Build errors

- Make sure all dependencies are in `package.json`
- Check Railway build logs for specific errors

### API not working

- Ensure Railway has completed the build and deployment
- Check that `NODE_ENV=production` is set
- Verify API requests are going to the correct URL

## Database Schema

The `mailing_list` table includes:
- `id` (SERIAL PRIMARY KEY)
- `first_name` (VARCHAR 100, required)
- `last_name` (VARCHAR 100, required)
- `email` (VARCHAR 255, unique, required)
- `phone` (VARCHAR 20, optional)
- `source` (VARCHAR 50) - tracks which page the user signed up from
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Security Notes

- Never commit `.env` file to git
- Railway automatically uses SSL for PostgreSQL connections in production
- CORS is enabled for all origins (consider restricting in production)
