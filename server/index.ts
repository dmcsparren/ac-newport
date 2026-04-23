import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Pool } from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'
import Stripe from 'stripe'
import { syncToGoogleSheet } from './google-sheets-sync.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Initialize Stripe (only if key is present)
let stripe: Stripe | null = null
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-02-25.clover'
  })
}

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// IMPORTANT: Stripe webhook MUST come before express.json() to get raw body
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(400).json({ error: 'Stripe not configured' })
  }

  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    console.error('Missing stripe signature or webhook secret')
    return res.status(400).json({ error: 'Missing signature' })
  }

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)

    console.log('Received Stripe webhook:', event.type)

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const customerEmail = session.customer_details?.email

      if (customerEmail) {
        console.log('Payment succeeded for:', customerEmail)

        // Find registration by email and update payment status
        const result = await pool.query(
          `UPDATE tryout_registrations
           SET payment_status = 'paid',
               stripe_payment_id = $1,
               paid_at = NOW()
           WHERE email = $2 AND payment_status = 'pending'
           RETURNING id, first_name, last_name, email`,
          [session.id, customerEmail]
        )

        if (result.rows.length > 0) {
          console.log('Updated registration payment status:', result.rows[0])

          syncToGoogleSheet({
            type: 'payment_update',
            email: result.rows[0].email,
            paymentStatus: 'paid',
            stripePaymentId: session.id
          })
        } else {
          console.log('No pending registration found for email:', customerEmail)
        }
      }
    }

    // Handle PaymentIntent (test page flow)
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const registrationId = paymentIntent.metadata.registration_id

      if (registrationId) {
        console.log('PaymentIntent succeeded for registration:', registrationId)

        const result = await pool.query(
          `UPDATE tryout_registrations
           SET payment_status = 'paid',
               stripe_payment_id = $1,
               paid_at = NOW()
           WHERE id = $2 AND payment_status = 'pending'
           RETURNING id, first_name, last_name, email`,
          [paymentIntent.id, registrationId]
        )

        if (result.rows.length > 0) {
          console.log('Updated registration payment status:', result.rows[0])

          syncToGoogleSheet({
            type: 'payment_update',
            email: result.rows[0].email,
            paymentStatus: 'paid',
            stripePaymentId: paymentIntent.id
          })
        } else {
          console.log('No pending registration found for ID:', registrationId)
        }
      }
    }

    res.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err instanceof Error ? err.message : err)
    return res.status(400).json({ error: 'Webhook verification failed' })
  }
})

// Middleware (after webhook route)
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? true
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))
app.use(express.json())

// API Routes
app.post('/api/subscribe', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, source } = req.body

    console.log('Received subscription request:', { firstName, lastName, email, phone, source })

    // Validate required fields
    if (!firstName || !lastName || !email) {
      console.log('Validation failed: missing required fields')
      return res.status(400).json({
        error: 'First name, last name, and email are required'
      })
    }

    // Check if email already exists
    console.log('Checking for existing email...')
    const existingUser = await pool.query(
      'SELECT id FROM mailing_list WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      console.log('Email already exists:', email)
      return res.status(409).json({
        error: 'This email is already subscribed'
      })
    }

    // Insert new subscriber
    console.log('Inserting new subscriber...')
    const result = await pool.query(
      `INSERT INTO mailing_list (first_name, last_name, email, phone, source, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, email, created_at`,
      [firstName, lastName, email, phone || null, source || 'unknown']
    )

    console.log('Successfully inserted subscriber:', result.rows[0])

    res.status(201).json({
      message: 'Successfully subscribed to mailing list',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error subscribing to mailing list:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    res.status(500).json({
      error: 'Failed to subscribe. Please try again later.'
    })
  }
})

// Trial registration endpoint
app.post('/api/trial-register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      primaryPosition,
      secondaryPosition,
      dominantFoot,
      email,
      phone,
      city,
      state,
      country,
      experience,
      instagramHandle,
      imageAuthorization
    } = req.body

    console.log('Received trial registration:', { firstName, lastName, email })

    if (!firstName || !lastName || !dateOfBirth || !gender || !primaryPosition || !email || !phone || !city || !state || !country || !experience) {
      return res.status(400).json({
        error: 'All required fields must be filled out'
      })
    }

    const result = await pool.query(
      `INSERT INTO tryout_registrations (
        first_name, last_name, date_of_birth, gender, primary_position,
        secondary_position, dominant_foot, email, phone, city, state,
        country, experience, instagram_handle, image_authorization, created_at
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
       RETURNING id, email, created_at`,
      [
        firstName, lastName, dateOfBirth, gender, primaryPosition,
        secondaryPosition || null, dominantFoot || null, email, phone,
        city, state, country, experience,
        instagramHandle || null, imageAuthorization || false
      ]
    )

    console.log('Successfully inserted trial registration:', result.rows[0])

    syncToGoogleSheet({
      type: 'tryout_registration',
      id: result.rows[0].id,
      firstName, lastName, dateOfBirth, gender, primaryPosition,
      secondaryPosition: secondaryPosition || '',
      dominantFoot: dominantFoot || '',
      email, phone, city, state, country, experience,
      instagramHandle: instagramHandle || '',
      imageAuthorization: imageAuthorization || false,
      paymentStatus: 'pending',
      createdAt: result.rows[0].created_at
    })

    res.status(201).json({
      message: 'Successfully registered for trials',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error registering for trials:', error)
    res.status(500).json({
      error: 'Failed to register. Please try again later.'
    })
  }
})

// Tryout registration endpoint
app.post('/api/tryout-register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      primaryPosition,
      secondaryPosition,
      dominantFoot,
      email,
      phone,
      city,
      state,
      country,
      experience,
      instagramHandle,
      imageAuthorization
    } = req.body

    console.log('Received tryout registration:', { firstName, lastName, email })

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !gender || !primaryPosition || !email || !phone || !city || !state || !country || !experience) {
      console.log('Validation failed: missing required fields')
      return res.status(400).json({
        error: 'All required fields must be filled out'
      })
    }

    // Insert new registration
    console.log('Inserting new tryout registration...')
    const result = await pool.query(
      `INSERT INTO tryout_registrations (
        first_name, last_name, date_of_birth, gender, primary_position,
        secondary_position, dominant_foot, email, phone, city, state,
        country, experience, instagram_handle, image_authorization, created_at
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
       RETURNING id, email, created_at`,
      [
        firstName,
        lastName,
        dateOfBirth,
        gender,
        primaryPosition,
        secondaryPosition || null,
        dominantFoot || null,
        email,
        phone,
        city,
        state,
        country,
        experience,
        instagramHandle || null,
        imageAuthorization || false
      ]
    )

    console.log('Successfully inserted tryout registration:', result.rows[0])

    syncToGoogleSheet({
      type: 'tryout_registration',
      id: result.rows[0].id,
      firstName, lastName, dateOfBirth, gender, primaryPosition,
      secondaryPosition: secondaryPosition || '',
      dominantFoot: dominantFoot || '',
      email, phone, city, state, country, experience,
      instagramHandle: instagramHandle || '',
      imageAuthorization: imageAuthorization || false,
      paymentStatus: 'pending',
      createdAt: result.rows[0].created_at
    })

    res.status(201).json({
      message: 'Successfully registered for tryouts',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error registering for tryouts:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    res.status(500).json({
      error: 'Failed to register. Please try again later.'
    })
  }
})

// Create PaymentIntent for tryout payment
app.post('/api/create-payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(400).json({ error: 'Stripe not configured' })
  }

  try {
    const { registrationId } = req.body

    if (!registrationId) {
      return res.status(400).json({ error: 'Registration ID required' })
    }

    // Get registration details
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, payment_status
       FROM tryout_registrations
       WHERE id = $1`,
      [registrationId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' })
    }

    const registration = result.rows[0]

    if (registration.payment_status === 'paid') {
      return res.status(400).json({ error: 'Already paid' })
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9900, // $99.00
      currency: 'usd',
      metadata: {
        registration_id: registrationId.toString(),
        player_name: `${registration.first_name} ${registration.last_name}`,
        email: registration.email
      },
      description: `AC Newport Trial Registration - ${registration.first_name} ${registration.last_name}`
    })

    console.log('Created PaymentIntent:', paymentIntent.id)

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Error creating PaymentIntent:', error)
    res.status(500).json({
      error: 'Failed to create payment intent. Please try again.'
    })
  }
})

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()')
    res.json({ status: 'healthy', database: 'connected' })
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' })
  }
})

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  // Server is in dist/server/, so static files are in dist/ which is ../
  app.use(express.static(path.join(__dirname, '..')))

  // Serve index.html for all non-API routes (SPA support)
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '..', 'index.html'))
    } else {
      next()
    }
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
