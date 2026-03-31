import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import TryoutRegistrationTestForm from '../components/TryoutRegistration/TryoutRegistrationTestForm'
import PaymentForm from '../components/Payment/PaymentForm'
import './TryoutsPage.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

const TryoutsTestPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [registrationId, setRegistrationId] = useState<number | null>(null)

  const handleRegistrationSuccess = (regId: number, secret: string) => {
    setRegistrationId(regId)
    setClientSecret(secret)
  }

  return (
    <div className="tryouts-page">
      <section className="tryouts-hero">
        <div className="tryouts-hero-content">
          <h1>Register for Tryouts (TEST)</h1>
          <p className="hero-subtitle">
            Test page for integrated payment flow
          </p>
        </div>
      </section>

      <section className="tryouts-content">
        <div className="content-wrapper">
          <div className="tryouts-info">
            <h2>Test Payment Integration</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Test Mode</h3>
                <p>
                  This page uses Stripe test mode. Use test card: 4242 4242 4242 4242
                </p>
              </div>
              <div className="info-card">
                <h3>Registration Fee</h3>
                <p>
                  $99 non-refundable registration fee
                </p>
              </div>
            </div>
          </div>

          <div className="registration-section">
            <h2>Player Registration & Payment</h2>
            {!clientSecret ? (
              <TryoutRegistrationTestForm onSuccess={handleRegistrationSuccess} />
            ) : (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <div className="payment-wrapper">
                  <h3>Complete Payment</h3>
                  <p>Registration ID: {registrationId}</p>
                  <PaymentForm registrationId={registrationId!} />
                </div>
              </Elements>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TryoutsTestPage
