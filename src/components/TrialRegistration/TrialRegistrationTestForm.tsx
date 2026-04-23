import { useState } from 'react'
import './TryoutRegistrationForm.css'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

interface Props {
  onSuccess: (registrationId: number, clientSecret: string) => void
}

const TryoutRegistrationTestForm = ({ onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    primaryPosition: '',
    secondaryPosition: '',
    dominantFoot: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'United States',
    experience: '',
    instagramHandle: '',
    imageAuthorization: false
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target
    const value = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : target.value
    setFormData({
      ...formData,
      [target.name]: value
    })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const API_URL = import.meta.env.VITE_API_URL || ''

      // Step 1: Register
      const registerResponse = await fetch(`${API_URL}/api/tryout-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const registerData = await registerResponse.json()

      if (!registerResponse.ok) {
        throw new Error(registerData.error || 'Failed to register')
      }

      const registrationId = registerData.data.id

      // Step 2: Create PaymentIntent
      const paymentResponse = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId }),
      })

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || 'Failed to create payment')
      }

      // Step 3: Transition to payment form
      onSuccess(registrationId, paymentData.clientSecret)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="tryout-registration-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Personal Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Player Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="primaryPosition">Primary Position *</label>
            <input
              type="text"
              id="primaryPosition"
              name="primaryPosition"
              value={formData.primaryPosition}
              onChange={handleChange}
              placeholder="e.g., Midfielder, Forward, Defender"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="secondaryPosition">Secondary Position</label>
            <input
              type="text"
              id="secondaryPosition"
              name="secondaryPosition"
              value={formData.secondaryPosition}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Dominant Foot</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="dominantFoot"
                value="Right"
                checked={formData.dominantFoot === 'Right'}
                onChange={handleChange}
              />
              Right
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="dominantFoot"
                value="Left"
                checked={formData.dominantFoot === 'Left'}
                onChange={handleChange}
              />
              Left
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="dominantFoot"
                value="Both"
                checked={formData.dominantFoot === 'Both'}
                onChange={handleChange}
              />
              Both
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Your Experience *</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your playing experience, teams you've played for, achievements, etc."
            required
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Contact Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select a state</option>
              {US_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instagramHandle">Instagram Handle</label>
          <input
            type="text"
            id="instagramHandle"
            name="instagramHandle"
            value={formData.instagramHandle}
            onChange={handleChange}
            placeholder="@username"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Authorizations</h3>
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="imageAuthorization"
              checked={formData.imageAuthorization}
              onChange={handleChange}
              required
            />
            <span>I authorize AC Newport to use my image, likeness, and photographs taken during tryouts, training, and matches for promotional purposes including social media, website, and marketing materials. *</span>
          </label>
        </div>
      </div>

      <div className="form-note">
        <p>A $99 non-refundable registration fee is required to complete your registration.</p>
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Continue to Payment'}
      </button>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </form>
  )
}

export default TryoutRegistrationTestForm
