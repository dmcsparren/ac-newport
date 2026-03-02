import TryoutRegistrationForm from '../components/TryoutRegistration/TryoutRegistrationForm'
import './TryoutsPage.css'

const TryoutsPage = () => {
  return (
    <div className="tryouts-page">
      <section className="tryouts-hero">
        <div className="tryouts-hero-content">
          <h1>Register for Tryouts</h1>
          <p className="hero-subtitle">
            AC Newport is seeking committed, competitive players for the club's first Men's team.
          </p>
        </div>
      </section>

      <section className="tryouts-content">
        <div className="content-wrapper">
          <div className="tryouts-info">
            <h2>What to Expect</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Commitment</h3>
                <p>
                  We're looking for dedicated players who are ready to compete at a high level
                  and contribute to our team culture.
                </p>
              </div>
              <div className="info-card">
                <h3>Competition</h3>
                <p>
                  Our teams compete in competitive leagues, providing opportunities for growth
                  and development throughout the season.
                </p>
              </div>
              <div className="info-card">
                <h3>Registration Fee</h3>
                <p>
                  A $99 non-refundable registration fee applies once invited to tryouts.
                  This covers facility costs and administrative expenses.
                </p>
              </div>
            </div>
          </div>

          <div className="registration-section">
            <h2>Player Registration</h2>
            <p className="registration-intro">
              Complete the form below to register for tryouts. We'll review your information
              and contact you with tryout details.
            </p>
            <TryoutRegistrationForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default TryoutsPage
