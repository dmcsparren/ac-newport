import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Pool } from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// Middleware
app.use(cors())
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
