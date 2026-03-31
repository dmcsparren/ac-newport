// Google Sheets sync via Apps Script Web App
// Posts registration data to a Google Apps Script endpoint that appends rows to a Google Sheet

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

interface MailingListData {
  type: 'mailing_list'
  firstName: string
  lastName: string
  email: string
  phone?: string
  source?: string
  createdAt: string
}

interface TryoutRegistrationData {
  type: 'tryout_registration'
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  primaryPosition: string
  secondaryPosition?: string
  dominantFoot?: string
  email: string
  phone: string
  city: string
  state: string
  country: string
  experience: string
  paymentStatus: string
  paymentAmount?: number
  createdAt: string
}

interface PaymentUpdateData {
  type: 'payment_update'
  email: string
  paymentStatus: string
  stripePaymentId: string
  paymentAmount?: number
}

type SheetData = MailingListData | TryoutRegistrationData | PaymentUpdateData

export async function syncToGoogleSheet(data: SheetData): Promise<void> {
  if (!APPS_SCRIPT_URL) {
    console.log('Google Apps Script URL not configured, skipping sheet sync')
    return
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      console.error('Google Sheets sync failed:', response.status, await response.text())
    } else {
      console.log('Synced to Google Sheet:', data.type, data.email)
    }
  } catch (error) {
    // Log but don't throw — sheet sync should never block registration
    console.error('Google Sheets sync error:', error instanceof Error ? error.message : error)
  }
}
