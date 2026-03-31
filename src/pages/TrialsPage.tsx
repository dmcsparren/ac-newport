import TryoutRegistrationForm from '../components/TryoutRegistration/TryoutRegistrationForm'
import './TryoutsPage.css'

const TrialsPage = () => {
  return (
    <div className="tryouts-page">
      <section className="tryouts-hero">
        <div className="tryouts-hero-content">
          <h1>Player Registration</h1>
          <p className="hero-subtitle">
            AC Newport is seeking committed, competitive players for the club's first Men's team.
          </p>
        </div>
      </section>

      <section className="tryouts-content">
        <div className="content-wrapper">
          <div className="tryouts-info">
            <h2>How It Works</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>1. Register & Pay</h3>
                <p>
                  Complete the registration form below and pay the $99 non-refundable registration fee.
                </p>
              </div>
              <div className="info-card">
                <h3>2. Receive Your Trial Invitation</h3>
                <p>
                  After completing registration, AC Newport's coaching staff will reach out to you
                  with details for your formal trial invitation.
                </p>
              </div>
            </div>
            <p className="trials-disclaimer">
              Please note: paid registration does not guarantee a spot on AC Newport's roster. Registration
              provides an opportunity to showcase your talent during a trial with the team to potentially
              earn a roster spot.
            </p>
          </div>

          <div className="registration-section">
            <h2>Player Registration</h2>
            <p className="registration-intro">
              Complete the form below and pay the $99 registration fee. Once your registration is complete,
              our coaching staff will contact you with trial details.
            </p>
            <TryoutRegistrationForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default TrialsPage
