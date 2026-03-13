# Stripe Webhook Setup Guide

This guide will help you configure Stripe webhooks to automatically update the database when payments complete.

## What's Been Implemented

1. **Database Migration** - Adds payment tracking columns to `tryout_registrations`
2. **Webhook Endpoint** - `/api/webhooks/stripe` that listens for payment completions
3. **Automatic Updates** - Matches payments by email and updates database status to "paid"

---

## Step 1: Run Database Migration

Run this SQL migration to add payment tracking columns:

```bash
# On Railway, use their CLI or run directly in Railway dashboard:
railway run psql $DATABASE_URL < server/migrations/add_payment_tracking.sql

# Or manually via psql:
psql $DATABASE_URL < server/migrations/add_payment_tracking.sql
```

This adds these columns to `tryout_registrations`:
- `payment_status` - 'pending' or 'paid'
- `stripe_payment_id` - Stripe checkout session ID
- `paid_at` - Timestamp when payment completed
- `payment_amount` - Amount paid (default $99)

---

## Step 2: Add Environment Variables

Add these to your Railway environment variables (or `.env` for local):

```env
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Where to get these:**
1. **STRIPE_SECRET_KEY**:
   - Go to https://dashboard.stripe.com/apikeys
   - Copy your "Secret key" (start with test key: `sk_test_...`)

2. **STRIPE_WEBHOOK_SECRET**:
   - See Step 3 below (you'll get this when creating the webhook)

---

## Step 3: Configure Stripe Webhook

1. **Go to Stripe Dashboard**:
   - https://dashboard.stripe.com/webhooks

2. **Click "Add endpoint"**

3. **Enter your webhook URL**:
   ```
   https://your-app.railway.app/api/webhooks/stripe
   ```
   (Replace with your actual Railway URL)

4. **Select events to listen for**:
   - Search for and select: `checkout.session.completed`
   - This is the only event we need

5. **Click "Add endpoint"**

6. **Copy the "Signing secret"**:
   - After creating the webhook, you'll see the signing secret
   - It starts with `whsec_...`
   - Copy this to Railway as `STRIPE_WEBHOOK_SECRET`

---

## Step 4: Configure Stripe Buy Button

When you created your Stripe Payment Link/Buy Button, make sure:

1. **Enable "Collect customer email"**:
   - This is REQUIRED for matching payments to registrations
   - Without the email, we can't link the payment to the registration

2. To check/update your buy button:
   - Go to https://dashboard.stripe.com/payment-links
   - Click your payment link
   - Edit settings
   - Under "Collect customer information"
   - Check "Email address"

---

## Step 5: Deploy and Test

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add Stripe webhook for payment tracking"
   # Don't push to main directly - create PR or push to feature branch
   ```

2. **After deployment, test the flow**:
   - Register on your site with an email (e.g., `test@example.com`)
   - Complete payment with test card: `4242 4242 4242 4242`
   - Check Stripe dashboard → Webhooks → Your endpoint
   - You should see successful webhook delivery
   - Check your database to confirm payment_status is now 'paid'

---

## Verification Queries

Check if webhooks are working:

```sql
-- View all registrations with payment status
SELECT id, first_name, last_name, email, payment_status, paid_at
FROM tryout_registrations
ORDER BY created_at DESC;

-- Count paid vs pending
SELECT payment_status, COUNT(*)
FROM tryout_registrations
GROUP BY payment_status;

-- Recent payments (last 24 hours)
SELECT id, first_name, last_name, email, stripe_payment_id, paid_at
FROM tryout_registrations
WHERE payment_status = 'paid'
  AND paid_at > NOW() - INTERVAL '24 hours';
```

---

## How It Works

1. **User registers** → Saved to database with `payment_status='pending'`
2. **User sees Stripe button** → Clicks to pay
3. **Stripe collects payment** → Captures customer email
4. **Stripe sends webhook** → Calls `/api/webhooks/stripe`
5. **Webhook verifies signature** → Ensures request is from Stripe
6. **Webhook finds registration** → Matches by email
7. **Database updated** → Sets `payment_status='paid'` and `paid_at`

---

## Troubleshooting

### Webhook not receiving events:
- Check Railway logs for errors
- Verify webhook URL is correct in Stripe dashboard
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Check Stripe dashboard → Webhooks → Your endpoint → Recent deliveries

### Payment not updating database:
- Check that customer email is being collected in Stripe
- Verify email in Stripe checkout matches email in registration
- Check Railway logs for "Payment succeeded for: [email]"
- Ensure database migration ran successfully

### Webhook signature verification failing:
- Verify `STRIPE_WEBHOOK_SECRET` matches the signing secret in Stripe dashboard
- Make sure webhook endpoint comes BEFORE `express.json()` middleware

---

## Testing with Stripe Test Mode

Use these test cards in Stripe test mode:

- **Successful payment**: `4242 4242 4242 4242`
- **Payment fails**: `4000 0000 0000 0002`

Use any future expiration date, any CVC, and any ZIP code.

---

## Going Live

When ready to accept real payments:

1. **Switch to live keys**:
   - Replace `sk_test_...` with `sk_live_...`
   - Update `STRIPE_WEBHOOK_SECRET` from live webhook endpoint

2. **Create new webhook in live mode**:
   - Stripe has separate webhooks for test/live mode
   - Repeat Step 3 but in live mode
   - Get new signing secret for live mode

3. **Test with small real payment**:
   - Use a real card with small amount
   - Verify it works
   - Refund the test payment in Stripe dashboard

---

## Support

If you run into issues:
- Check Railway logs: `railway logs`
- Check Stripe webhook logs in dashboard
- Review recent webhook deliveries for error details
