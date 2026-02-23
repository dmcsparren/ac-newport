import { Pool } from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

async function migrate() {
  try {
    console.log('Running database migration...')

    const sqlPath = path.join(__dirname, 'db-setup.sql')
    const sql = fs.readFileSync(sqlPath, 'utf-8')

    await pool.query(sql)

    console.log('✓ Migration completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('✗ Migration failed:', error)
    process.exit(1)
  }
}

migrate()
