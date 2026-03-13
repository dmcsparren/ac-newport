# Stripe Payment Integration for Tryout Registration

## Overview
Implement a two-phase payment system for AC Newport tryout registrations:
- **Phase 1 (Priority):** Payment capture functionality - enable immediate payment collection via unique payment links
- **Phase 2 (Future):** Authentication & Admin Dashboard - secure staff portal with login and CRM foundation

## Current System Analysis
- **Tech Stack:** React/TypeScript frontend, Express backend, PostgreSQL on Railway
- **Registration Flow:** Form submission → API endpoint → Direct database insert
- **Database:** `tryout_registrations` table stores player info
- **Payment:** Currently no payment processing (just informational $99 fee note)

## User Requirements
- Post-invitation payment workflow (register first, pay after manual invitation)
- Embedded Stripe Elements payment form (not Checkout redirect)
- Save all registrations, mark payment status
- Email confirmations after successful payment
- Admin dashboard with authentication (Phase 2)
- Foundation for future CRM system

---

# PHASE 1: Payment Capture System (Priority)

## 1. Database Schema Migration

**File:** `/server/migrations/001_add_payment_fields.sql`

```sql
-- Add payment tracking columns
ALTER TABLE tryout_registrations
ADD COLUMN payment_status VARCHAR(20) DEFAULT 'pending'
  CHECK (payment_status IN ('pending', 'invited', 'paid', 'failed', 'expired')),
ADD COLUMN payment_amount INTEGER DEFAULT 9900,
ADD COLUMN payment_link_token VARCHAR(64) UNIQUE,
ADD COLUMN payment_link_expires_at TIMESTAMP,
ADD COLUMN invitation_sent_at TIMESTAMP,
ADD COLUMN stripe_payment_intent_id VARCHAR(255) UNIQUE,
ADD COLUMN stripe_customer_id VARCHAR(255),
ADD COLUMN paid_at TIMESTAMP,
ADD COLUMN payment_metadata JSONB DEFAULT '{}';

-- Performance indexes
CREATE INDEX idx_tryout_registrations_payment_status
  ON tryout_registrations(payment_status);
CREATE INDEX idx_tryout_registrations_payment_token
  ON tryout_registrations(payment_link_token)
  WHERE payment_link_token IS NOT NULL;
CREATE INDEX idx_tryout_registrations_stripe_payment_intent
  ON tryout_registrations(stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL;

-- Payment events audit log
CREATE TABLE payment_events (
  id SERIAL PRIMARY KEY,
  registration_id INTEGER REFERENCES tryout_registrations(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  stripe_event_id VARCHAR(255),
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payment_events_registration_id ON payment_events(registration_id);
CREATE INDEX idx_payment_events_created_at ON payment_events(created_at DESC);
```

**Update:** `/server/db-setup.sql` - Add migration SQL to main setup file

---

## 2. Backend Services

### 2.1 Token Service
**File:** `/server/services/token.service.ts`

**Purpose:** Generate and validate secure payment link tokens

**Key Methods:**
- `generatePaymentToken()` - Creates 64-char cryptographic token
- `validatePaymentToken(token)` - Validates token, checks expiry, returns registration ID

**Security:**
- Cryptographically random tokens (32 bytes = 64 hex chars)
- Time-limited (72 hours default)
- Single registration per token

### 2.2 Stripe Service
**File:** `/server/services/stripe.service.ts`

**Purpose:** Handle all Stripe payment operations

**Key Methods:**
- `createPaymentIntent(registrationId)` - Creates Stripe PaymentIntent, returns client secret
- `handleWebhookEvent(event)` - Processes Stripe webhook events
- `handlePaymentSuccess()` - Updates DB when payment succeeds
- `handlePaymentFailure()` - Logs failed payments
- `constructWebhookEvent()` - Verifies webhook signatures

**Features:**
- Creates/retrieves Stripe customers
- Stores payment metadata
- Logs all payment events to audit table
- Idempotent payment handling

### 2.3 Email Service
**File:** `/server/services/email.service.ts`

**Purpose:** Send transactional emails via Resend

**Key Methods:**
- `sendPaymentInvitation(registrationId, token)` - Sends payment link email
- `sendPaymentConfirmation(registrationId)` - Sends receipt after payment

**Email Templates:**
1. **Payment Invitation:** Includes unique payment link, expiry warning, registration details
2. **Payment Confirmation:** Receipt with amount, date, registration ID, next steps

**Configuration:**
- Uses Resend API (free tier: 100 emails/day)
- Sends from verified domain (e.g., tryouts@acnewport.com)
- HTML emails with professional styling

---

## 3. API Endpoints

### 3.1 Modify Existing Endpoint
**Endpoint:** `POST /api/tryout-register`

**Change:** Add `payment_status='pending'` to INSERT query

**Result:** All new registrations start as unpaid

### 3.2 New Payment Endpoints

**Endpoint:** `POST /api/admin/send-payment-link`
- **Purpose:** Generate payment link and send invitation email
- **Input:** `{ registrationId: number }`
- **Process:**
  1. Validate registration exists and not already paid
  2. Generate secure token with 72-hour expiry
  3. Update DB with token and `payment_status='invited'`
  4. Send invitation email with payment link
- **Response:** `{ message, data: { registrationId, email, expiresAt } }`
- **Note:** Phase 1 - called manually or via script; Phase 2 - called from admin UI

**Endpoint:** `GET /api/payment-info/:token`
- **Purpose:** Get registration details for payment page
- **Process:**
  1. Validate token (not expired, not paid)
  2. Return player info and payment amount
- **Response:** `{ data: { id, first_name, last_name, email, payment_amount, payment_status } }`

**Endpoint:** `POST /api/create-payment-intent`
- **Purpose:** Create Stripe PaymentIntent for payment page
- **Input:** `{ token: string }`
- **Process:**
  1. Validate payment token
  2. Get/create Stripe customer
  3. Create PaymentIntent with $99 amount
  4. Store payment_intent_id in DB
  5. Log payment_initiated event
- **Response:** `{ clientSecret, paymentIntentId }`

**Endpoint:** `POST /api/webhooks/stripe`
- **Purpose:** Handle Stripe webhook events (payment confirmations)
- **Critical:** Must use raw body for signature verification
- **Events Handled:**
  - `payment_intent.succeeded` → Update to `payment_status='paid'`, send confirmation email
  - `payment_intent.payment_failed` → Update to `payment_status='failed'`, log error
  - `payment_intent.canceled` → Log cancellation
- **Security:** Verifies Stripe signature on every request

### 3.3 Webhook Setup Details

**Important:** Stripe webhook endpoint must come BEFORE `express.json()` middleware:

```typescript
// BEFORE regular middleware
app.post('/api/webhooks/stripe',
  express.raw({ type: 'application/json' }), // Raw body for signature
  createWebhookValidator(stripeService),
  async (req, res) => { /* handler */ }
)

// AFTER webhook routes
app.use(express.json())
```

---

## 4. Frontend Components

### 4.1 Payment Page
**File:** `/src/pages/PaymentPage.tsx`

**Route:** `/payment/:token`

**Flow:**
1. Extract token from URL params
2. Fetch registration info via `GET /api/payment-info/:token`
3. Create PaymentIntent via `POST /api/create-payment-intent`
4. Render payment form with Stripe Elements

**Displays:**
- Player name and email
- Payment amount ($99.00)
- "Non-refundable registration fee" notice
- Embedded Stripe payment form

**Error Handling:**
- Invalid/expired token → Show error message
- Already paid → Show error message
- API errors → User-friendly error display

### 4.2 Payment Form
**File:** `/src/components/Payment/PaymentForm.tsx`

**Features:**
- Uses `@stripe/react-stripe-js` PaymentElement component
- Handles card input, validation, errors
- "Processing..." state during payment
- Calls `stripe.confirmPayment()` with return URL

**Success Flow:**
- Stripe redirects to `/payment-success?registration_id=X`
- Webhook confirms payment in background
- DB updated to `paid` status
- Confirmation email sent

### 4.3 Payment Success Page
**File:** `/src/pages/PaymentSuccessPage.tsx`

**Route:** `/payment-success`

**Displays:**
- Success checkmark icon
- "Payment Successful!" message
- Registration ID and receipt info
- "Check your email" reminder
- Next steps list
- Auto-redirect to home after 10 seconds

### 4.4 Update Router
**File:** `/src/App.tsx`

**Add Routes:**
```typescript
<Route path="/payment/:token" element={<PaymentPage />} />
<Route path="/payment-success" element={<PaymentSuccessPage />} />
```

---

## 5. Dependencies

**Install:**
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js resend
```

**Packages:**
- `stripe` (^17.4.0) - Backend Stripe SDK
- `@stripe/stripe-js` (^4.15.0) - Frontend Stripe loader
- `@stripe/react-stripe-js` (^2.11.0) - React Stripe components
- `resend` (^4.0.0) - Email service API

---

## 6. Environment Variables

### Backend (.env)
```env
# Existing
DATABASE_URL=postgresql://...
NODE_ENV=production

# Stripe (start with test mode)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=tryouts@acnewport.com

# Application
APP_BASE_URL=https://acnewport.com
PAYMENT_LINK_EXPIRY_HOURS=72
PAYMENT_AMOUNT_CENTS=9900
```

### Frontend (.env.development.local)
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 7. Stripe Configuration

### Setup Steps:

1. **Create Stripe Account** (if not done)
   - Sign up at stripe.com
   - Complete business verification

2. **Get API Keys**
   - Dashboard → Developers → API keys
   - Copy Publishable key (`pk_test_...`) and Secret key (`sk_test_...`)
   - Start in Test mode for development

3. **Configure Webhook**
   - Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://acnewport.com/api/webhooks/stripe`
   - Select events:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `payment_intent.canceled`
   - Copy Signing secret (`whsec_...`) → `STRIPE_WEBHOOK_SECRET`

4. **Test Mode First**
   - Use test API keys for development
   - Test with Stripe test cards: `4242 4242 4242 4242`
   - Monitor webhook events in Stripe dashboard

5. **Go Live**
   - Complete Stripe account activation
   - Switch to live API keys (`pk_live_...`, `sk_live_...`)
   - Update webhook endpoint for production
   - Test with real card (small amount, then refund)

---

## 8. Resend Email Setup

### Setup Steps:

1. **Create Resend Account**
   - Sign up at resend.com (free tier: 100 emails/day)
   - Get API key from dashboard

2. **Verify Domain**
   - Add domain (`acnewport.com`)
   - Add DNS records (provided by Resend):
     - DKIM record (TXT)
     - SPF record (TXT)
     - Optional: DMARC for better deliverability
   - Wait for verification (usually instant)

3. **Configure Email Address**
   - Set `EMAIL_FROM=tryouts@acnewport.com`
   - Emails will come from your verified domain
   - Replies go to your Google Workspace inbox

4. **Test Emails**
   - Send test email from Resend dashboard
   - Verify delivery and formatting
   - Check spam folder if needed

---

## 9. Phase 1 Manual Payment Link Generation

Since Phase 1 doesn't include admin UI, here are two ways to generate payment links:

### Option A: Simple Node Script

**File:** `/server/scripts/send-payment-link.ts`

```typescript
import dotenv from 'dotenv'
import { Pool } from 'pg'
import { TokenService } from '../services/token.service'
import { EmailService } from '../services/email.service'

dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const tokenService = new TokenService(pool)
const emailService = new EmailService(pool)

async function sendPaymentLink(registrationId: number) {
  const token = tokenService.generatePaymentToken()
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000)

  await pool.query(
    `UPDATE tryout_registrations
     SET payment_link_token = $1, payment_link_expires_at = $2,
         payment_status = 'invited', invitation_sent_at = NOW()
     WHERE id = $3`,
    [token, expiresAt, registrationId]
  )

  await emailService.sendPaymentInvitation(registrationId, token)
  console.log(`Payment link sent for registration #${registrationId}`)
  process.exit(0)
}

const regId = parseInt(process.argv[2])
if (!regId) {
  console.error('Usage: npm run send-payment-link <registration_id>')
  process.exit(1)
}

sendPaymentLink(regId)
```

**Usage:**
```bash
npm run send-payment-link 123
```

### Option B: Direct API Call

```bash
curl -X POST http://localhost:3000/api/admin/send-payment-link \
  -H "Content-Type: application/json" \
  -d '{"registrationId": 123}'
```

### Option C: Database Query + Manual Email

1. Query pending registrations:
```sql
SELECT id, first_name, last_name, email, primary_position, created_at
FROM tryout_registrations
WHERE payment_status = 'pending'
ORDER BY created_at DESC;
```

2. Use Option A or B to send payment links

---

## 10. Testing Strategy

### Manual Testing Checklist (Phase 1)

**Registration:**
- [ ] Submit tryout registration form
- [ ] Verify database entry with `payment_status='pending'`
- [ ] Check all fields saved correctly

**Payment Link Generation:**
- [ ] Generate payment link (script or API)
- [ ] Verify token created in database
- [ ] Verify `payment_status='invited'`
- [ ] Verify invitation email sent and received
- [ ] Check email formatting and payment link

**Payment Flow:**
- [ ] Click payment link from email
- [ ] Verify payment page loads with correct player info
- [ ] Verify Stripe form displays
- [ ] Complete payment with test card: `4242 4242 4242 4242`
- [ ] Verify redirect to success page
- [ ] Check Stripe dashboard for successful payment

**Webhook Processing:**
- [ ] Verify webhook received in Stripe dashboard
- [ ] Check database: `payment_status='paid'`
- [ ] Verify `paid_at` timestamp set
- [ ] Verify confirmation email sent and received
- [ ] Check `payment_events` table for audit trail

**Edge Cases:**
- [ ] Expired payment link → Shows error message
- [ ] Already paid registration → Shows error message
- [ ] Invalid token → Shows error message
- [ ] Payment failure (use test card `4000 0000 0000 0002`) → Status updated to 'failed'
- [ ] Abandoned payment → Registration stays 'invited'

### Database Verification Queries

```sql
-- View all registrations with payment status
SELECT id, first_name, last_name, email, payment_status,
       invitation_sent_at, paid_at
FROM tryout_registrations
ORDER BY created_at DESC;

-- Check payment events
SELECT pe.event_type, pe.created_at, tr.first_name, tr.last_name
FROM payment_events pe
JOIN tryout_registrations tr ON pe.registration_id = tr.id
ORDER BY pe.created_at DESC;

-- Total revenue
SELECT COUNT(*) as paid_count,
       SUM(payment_amount) / 100.0 as total_revenue
FROM tryout_registrations
WHERE payment_status = 'paid';
```

---

## 11. Deployment (Railway)

### Pre-Deployment Checklist:

1. **Run Database Migration**
```bash
# Test locally first
psql $DATABASE_URL < server/migrations/001_add_payment_fields.sql

# Or use migrate script
npm run migrate
```

2. **Set Environment Variables** (Railway Dashboard)
   - All variables from section 6
   - Start with Stripe test keys
   - Update webhook URL to Railway domain

3. **Configure Stripe Webhook**
   - Get Railway deployment URL
   - Add webhook endpoint: `https://your-app.railway.app/api/webhooks/stripe`
   - Copy webhook secret to Railway env vars

4. **Verify Resend Domain**
   - Complete DNS verification before deployment
   - Test email delivery

5. **Build and Deploy**
```bash
npm run build
git push origin main  # Railway auto-deploys
```

6. **Post-Deployment Testing**
   - Run through complete payment flow in test mode
   - Verify webhook delivery in Stripe dashboard
   - Check email delivery in Resend dashboard
   - Test error cases (expired link, invalid token)

7. **Go Live**
   - Switch to Stripe live keys in Railway env vars
   - Update webhook to live mode
   - Test with real card (then refund)
   - Monitor for first few payments

---

## 12. Monitoring & Troubleshooting

### Key Metrics to Monitor:

1. **Registrations:** Count by payment_status
2. **Payments:** Success rate, total revenue
3. **Emails:** Delivery rate (Resend dashboard)
4. **Webhooks:** Delivery success (Stripe dashboard)

### Common Issues:

**Webhook not processing:**
- Check webhook signature verification
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check server logs for errors
- Ensure raw body middleware is before webhook route

**Emails not sending:**
- Verify domain DNS records in Resend
- Check `RESEND_API_KEY` is valid
- Review Resend activity logs
- Check spam folder

**Payment link expired:**
- Resend invitation (generates new token)
- Consider extending `PAYMENT_LINK_EXPIRY_HOURS`

**Payment page not loading:**
- Verify `VITE_STRIPE_PUBLISHABLE_KEY` is set
- Check browser console for errors
- Verify token is valid in database

### Useful Database Queries:

```sql
-- Pending registrations needing payment links
SELECT id, first_name, last_name, email, created_at
FROM tryout_registrations
WHERE payment_status = 'pending'
ORDER BY created_at DESC;

-- Invited but not paid (follow up)
SELECT id, first_name, last_name, email,
       invitation_sent_at, payment_link_expires_at
FROM tryout_registrations
WHERE payment_status = 'invited'
ORDER BY invitation_sent_at DESC;

-- Recent payment events
SELECT pe.event_type, pe.created_at,
       tr.first_name, tr.last_name, tr.email
FROM payment_events pe
JOIN tryout_registrations tr ON pe.registration_id = tr.id
ORDER BY pe.created_at DESC
LIMIT 20;

-- Failed payments
SELECT id, first_name, last_name, email, payment_metadata
FROM tryout_registrations
WHERE payment_status = 'failed';
```

---

# PHASE 2: Authentication & Admin Dashboard (Future)

## Overview
Phase 2 will build on the payment system with secure staff authentication and a full-featured admin dashboard, laying groundwork for the eventual CRM system.

## Planned Features:

### Authentication System
- JWT-based authentication
- Login page with username/password
- Secure password hashing (bcrypt)
- Token refresh mechanism
- Role-based access control (admin, staff, viewer)
- Password reset functionality

### Admin Dashboard
- **Registration Management:**
  - View all registrations (filterable by status)
  - Search by name, email, position
  - Sort by date, status, payment
  - One-click payment invitation sending
  - Bulk operations (send multiple invites)

- **Payment Tracking:**
  - Revenue dashboard with analytics
  - Payment history and receipts
  - Failed payment follow-up
  - Export data to CSV

- **User Management:**
  - Add/remove staff accounts
  - Manage roles and permissions
  - Activity logging

### Database Schema (Phase 2)
```sql
CREATE TABLE staff_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE TABLE activity_log (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES staff_users(id),
  action VARCHAR(100) NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Protected Routes
All admin endpoints will require authentication:
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/admin/*` - All admin operations (protected)
- `GET /api/admin/*` - All admin queries (protected)

### Admin UI Routes
- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/registrations` - Registration list
- `/admin/payments` - Payment tracking
- `/admin/users` - User management (admin only)

---

## Phase 2 Success Criteria:

- [ ] Staff can login securely
- [ ] All admin routes protected with JWT
- [ ] Dashboard shows all registrations with filters
- [ ] One-click payment invitation sending
- [ ] Payment tracking and analytics
- [ ] User management for club staff
- [ ] Activity logging for audit trail
- [ ] Mobile-responsive admin UI

---

# Critical Files Summary

## Phase 1 Files to Create/Modify:

**Database:**
- `/server/migrations/001_add_payment_fields.sql` - NEW
- `/server/db-setup.sql` - MODIFY (add payment schema)

**Backend Services:**
- `/server/services/token.service.ts` - NEW
- `/server/services/stripe.service.ts` - NEW
- `/server/services/email.service.ts` - NEW
- `/server/middleware/webhook-validator.middleware.ts` - NEW

**Backend API:**
- `/server/index.ts` - MODIFY (add payment endpoints, update registration endpoint)

**Frontend Components:**
- `/src/pages/PaymentPage.tsx` - NEW
- `/src/components/Payment/PaymentForm.tsx` - NEW
- `/src/pages/PaymentSuccessPage.tsx` - NEW
- `/src/pages/PaymentPage.css` - NEW
- `/src/components/Payment/PaymentForm.css` - NEW
- `/src/pages/PaymentSuccessPage.css` - NEW

**Frontend Router:**
- `/src/App.tsx` - MODIFY (add payment routes)

**Configuration:**
- `package.json` - MODIFY (add dependencies)
- `.env` - UPDATE (add Stripe, Resend, payment config)
- `.env.development.local` - UPDATE (add Stripe publishable key)

**Utilities (Optional):**
- `/server/scripts/send-payment-link.ts` - NEW (manual link generation)

---

# Implementation Order

1. **Database migration** → Run SQL to add payment fields
2. **Install dependencies** → npm install stripe @stripe/stripe-js @stripe/react-stripe-js resend
3. **Environment setup** → Configure Stripe test keys, Resend API key
4. **Backend services** → Create TokenService, StripeService, EmailService
5. **API endpoints** → Update server/index.ts with payment routes
6. **Frontend components** → Build PaymentPage, PaymentForm, SuccessPage
7. **Stripe configuration** → Set up webhook endpoint
8. **Resend configuration** → Verify domain, test emails
9. **Local testing** → Complete end-to-end payment flow
10. **Deployment** → Deploy to Railway with production configs
11. **Production testing** → Test with Stripe test mode in production
12. **Go live** → Switch to Stripe live keys

---

# Success Criteria (Phase 1)

- [ ] Players can register for tryouts (existing functionality maintained)
- [ ] All registrations saved with `payment_status='pending'`
- [ ] Can generate payment links (manually via script/API)
- [ ] Payment invitation emails sent with unique secure links
- [ ] Payment links expire after 72 hours
- [ ] Payment page loads with player info and Stripe form
- [ ] Players can complete payment with credit card
- [ ] Stripe webhook processes payment confirmations
- [ ] Database updates to `payment_status='paid'` automatically
- [ ] Confirmation emails sent after successful payment
- [ ] Failed payments logged appropriately
- [ ] All payment events tracked in audit log
- [ ] Can query database to see registration and payment status

---

# Security Considerations

1. **Payment Links:** 64-character cryptographic tokens, time-limited, validated on every use
2. **Webhook Verification:** Stripe signature verified on all webhook requests
3. **SQL Injection:** Parameterized queries throughout ($1, $2, etc.)
4. **Idempotency:** PaymentIntent IDs stored to prevent duplicate charges
5. **CORS:** Configured for production and development environments
6. **Environment Variables:** Sensitive keys in .env, never committed to git
7. **Raw Body:** Webhook endpoint uses raw body for signature verification
8. **Token Validation:** Checks expiry, payment status before allowing payment

---

# Notes for Phase 2

When implementing authentication and admin dashboard:
- Use JWT tokens with short expiration (15 min access, 7 day refresh)
- Hash passwords with bcrypt (cost factor 12+)
- Implement CSRF protection for admin forms
- Add rate limiting on login endpoint
- Consider 2FA for admin accounts
- Build role-based access control from start
- Log all admin actions for audit trail
- Design with CRM scalability in mind (database schema, API patterns)

---

# Support Resources

- **Stripe Docs:** https://stripe.com/docs/payments/payment-intents
- **Stripe Elements:** https://stripe.com/docs/stripe-js/react
- **Resend Docs:** https://resend.com/docs
- **Stripe Testing:** https://stripe.com/docs/testing
- **Webhook Testing:** Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
