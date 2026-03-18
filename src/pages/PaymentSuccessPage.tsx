import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentSuccessPage.css'

const PaymentSuccessPage = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="payment-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        <p className="success-message">
          Thank you for completing your tryout registration payment. You're all set!
        </p>

        <div className="next-steps">
          <h2>What's Next?</h2>
          <ul>
            <li>Check your email for payment confirmation</li>
            <li>We'll contact you with tryout details soon</li>
            <li>Bring your gear and be ready to play!</li>
          </ul>
        </div>

        <p className="redirect-notice">
          Redirecting to home page in {countdown} seconds...
        </p>

        <button onClick={() => navigate('/')} className="btn-primary">
          Return to Home
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
