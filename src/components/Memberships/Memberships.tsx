import './Memberships.css'
import MailingListForm from '../MailingListForm/MailingListForm'
import { weekendSteps, partners } from './membershipsData'

const Memberships = () => {
  return (
    <div className="memberships">
      {/* Hero */}
      <section className="mem-hero" id="top">
        <div className="mem-hero-media" role="img" aria-label="AC Newport training at Saint George's School" />
        <div className="mem-hero-scrim" />
        <div className="mem-hero-inner">
          <p className="eyebrow eyebrow--light">Season Tickets &amp; Membership — MMXXVII</p>
          <h1 className="display-title display-title--light mem-hero-title">
            A Season on
            <em>Aquidneck Island</em>
          </h1>
          <p className="mem-hero-lede">
            Ten home occasions in the sailing capital of the world. Football,
            harbour, and hospitality — held to the standard Newport expects.
          </p>
          <div className="mem-hero-cta">
            <a href="#notify" className="btn btn-primary">
              Join the waitlist
            </a>
            <a href="#weekend" className="btn btn-ghost">
              Plan the Weekend
            </a>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="section">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center">Season Tickets &amp; Membership</p>
          <h2 className="display-title section-title mem-coming-title">
            Coming <em>soon.</em>
          </h2>
          <p className="lede mem-coming-lede">
            Season tickets and Founding Membership for the 2027 campaign are on
            their way. Join the list and we'll let you know the moment they're
            available — before general release.
          </p>
          <a href="#notify" className="btn btn-outline mem-coming-cta">
            Notify me
          </a>
        </div>
      </section>

      {/* The Newport Weekend — split with photo */}
      <section className="mem-weekend" id="weekend">
        <div className="mem-weekend-grid">
          <div className="mem-weekend-media" role="img" aria-label="A Newport matchday weekend" />
          <div className="mem-weekend-content">
            <p className="eyebrow eyebrow--light">The Newport Weekend</p>
            <h2 className="display-title display-title--light mem-weekend-title">
              More than ninety minutes.
              <em>A destination season.</em>
            </h2>
            <p className="mem-weekend-lede">
              Home matches run March through December on Saturday evenings across
              the island's finest weeks — so a fixture becomes a weekend.
            </p>
            <ol className="mem-weekend-steps">
              {weekendSteps.map((step) => (
                <li key={step.title} className="mem-weekend-step">
                  <span className="mem-weekend-time">{step.time}</span>
                  <div>
                    <h3 className="mem-weekend-step-title">{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mem-partners">
        <div className="mem-container">
          <p className="mem-partners-label">In good company</p>
          <ul className="mem-partners-list">
            {partners.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Notify / sign up */}
      <section className="section section--navy" id="notify">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center eyebrow--light">Be first to know</p>
          <h2 className="display-title display-title--light section-title">
            Join the waitlist
          </h2>
          <p className="signup-lede">
            Leave your details and we'll be in touch the moment 2027 season tickets
            and membership go live.
          </p>
          <MailingListForm id="memberships" />
        </div>
      </section>
    </div>
  )
}

export default Memberships
