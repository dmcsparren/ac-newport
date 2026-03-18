import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import './PaymentForm.css'

interface Props {
  registrationId: number
}

const PaymentForm = ({ registrationId }: Props) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?registration_id=${registrationId}`,
        },
      })

      if (submitError) {
        setError(submitError.message || 'Payment failed')
        setIsProcessing(false)
      }
    } catch (err) {
      setError('Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="payment-details">
        <h3>Payment Details</h3>
        <p className="amount">Amount: $99.00</p>
        <p className="note">Non-refundable registration fee</p>
      </div>

      <PaymentElement />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="payment-btn"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay $99.00'}
      </button>
    </form>
  )
}

export default PaymentForm
