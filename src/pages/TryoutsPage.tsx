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
            <h2>Tryout Details</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Dates & Times</h3>
                <p>
                  March 21 & 22, 2026<br />
                  9:00 am - 12:00 pm
                </p>
              </div>
              <div className="info-card">
                <h3>Location</h3>
                <p>
                  Saint George's School<br />
                  372 Purgatory Rd<br />
                  Middletown, RI 02842
                </p>
              </div>
              <div className="info-card">
                <h3>What to Bring</h3>
                <p>
                  Black Shorts<br />
                  White Socks<br />
                  Shinguards<br />
                  Water
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
