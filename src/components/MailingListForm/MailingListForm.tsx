import { useState } from 'react'
import './MailingListForm.css'

interface MailingListFormProps {
  id: string
}

const MailingListForm = ({ id }: MailingListFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const API_URL = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          source: id
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSubmitted(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '' })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="mailing-list-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${id}-firstName`}>First Name *</label>
          <input
            type="text"
            id={`${id}-firstName`}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${id}-lastName`}>Last Name *</label>
          <input
            type="text"
            id={`${id}-lastName`}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${id}-email`}>Email *</label>
          <input
            type="email"
            id={`${id}-email`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${id}-phone`}>Phone</label>
          <input
            type="tel"
            id={`${id}-phone`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={submitted || isSubmitting}>
        {isSubmitting ? 'Submitting...' : submitted ? 'Thank you!' : 'Join Mailing List'}
      </button>

      {submitted && (
        <p className="success-message">
          Thank you for joining! We'll keep you updated.
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </form>
  )
}

export default MailingListForm
