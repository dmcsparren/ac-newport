import { useState } from 'react'
import './Memberships.css'
import {
  tiers,
  singleMatchPricing,
  weekendSteps,
  groupOffers,
  partners,
  finePrint,
  ticketsUrl,
} from './membershipsData'

const Memberships = () => {
  const [finePrintOpen, setFinePrintOpen] = useState(false)

  return (
    <div className="memberships">
      {/* Hero */}
      <section className="mem-hero" id="top">
        <div className="mem-hero-inner">
          <p className="mem-eyebrow">Season Tickets &amp; Membership · MMXXVII</p>
          <h1 className="mem-hero-title">
            A Season on <em>Aquidneck Island</em>
          </h1>
          <p className="mem-hero-lede">
            Ten home occasions in the sailing capital of the world. Football,
            harbour, and hospitality — held to the standard Newport expects.
          </p>
          <div className="mem-hero-cta">
            <a href="#tickets" className="mem-btn mem-btn-primary">
              Explore Season Tickets
            </a>
            <a href="#membership" className="mem-btn mem-btn-ghost">
              Founding Membership
            </a>
          </div>
        </div>
      </section>

      {/* Intro / single-match context */}
      <section className="mem-intro">
        <div className="mem-container mem-intro-grid">
          <div className="mem-intro-copy">
            <h2 className="mem-section-title">The case for the season</h2>
            <p>
              Newport keeps its own sporting company — the Hall of Fame, the
              regattas, the clubs. AC Newport joins it with ten home occasions
              staged across the island’s finest weeks.
            </p>
            <p>
              Single admission runs {singleMatchPricing.adult} for adults and{' '}
              {singleMatchPricing.youth} for youth. A Compass season ticket pays
              for itself by the eighth match — everything after is the club’s
              thanks for turning up.
            </p>
          </div>
          <aside className="mem-intro-card" aria-label="Single match pricing">
            <span className="mem-intro-card-label">Single Match</span>
            <div className="mem-intro-prices">
              <div>
                <strong>{singleMatchPricing.adult}</strong>
                <span>Adult</span>
              </div>
              <div>
                <strong>{singleMatchPricing.youth}</strong>
                <span>Youth · 12 &amp; under</span>
              </div>
            </div>
            <p className="mem-intro-card-note">{singleMatchPricing.note}</p>
          </aside>
        </div>
      </section>

      {/* Season ticket tiers */}
      <section className="mem-tiers" id="tickets">
        <div className="mem-container">
          <header className="mem-section-head">
            <p className="mem-section-num">I</p>
            <h2 className="mem-section-title">Season Tickets</h2>
            <p className="mem-section-sub">
              Four ways to hold your place for the full campaign — plus a fifth,
              by invitation.
            </p>
          </header>

          <div className="mem-tier-grid">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                id={tier.id === 'founding' ? 'membership' : undefined}
                className={`mem-tier${tier.featured ? ' mem-tier-featured' : ''}`}
              >
                {tier.badge && <span className="mem-tier-badge">{tier.badge}</span>}
                <h3 className="mem-tier-name">{tier.name}</h3>
                <p className="mem-tier-tagline">{tier.tagline}</p>

                <div className="mem-tier-prices">
                  {tier.prices.map((p) => (
                    <div key={p.label} className="mem-tier-price">
                      <span className="mem-tier-amount">{p.amount}</span>
                      <span className="mem-tier-price-label">{p.label}</span>
                    </div>
                  ))}
                </div>

                <ul className="mem-tier-perks">
                  {tier.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>

                {tier.note && <p className="mem-tier-note">{tier.note}</p>}

                <a
                  href={ticketsUrl}
                  className={`mem-btn mem-tier-cta${
                    tier.featured ? ' mem-btn-primary' : ' mem-btn-outline'
                  }`}
                >
                  {tier.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Newport Weekend */}
      <section className="mem-weekend">
        <div className="mem-container">
          <header className="mem-section-head">
            <p className="mem-section-num">II</p>
            <h2 className="mem-section-title">The Newport Weekend</h2>
            <p className="mem-section-sub">
              Home matches run March through December on Saturday evenings — so a
              fixture becomes a weekend.
            </p>
          </header>

          <ol className="mem-weekend-steps">
            {weekendSteps.map((step, i) => (
              <li key={step.title} className="mem-weekend-step">
                <span className="mem-weekend-index">{i + 1}</span>
                <div>
                  <span className="mem-weekend-time">{step.time}</span>
                  <h3 className="mem-weekend-title">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Groups & Corporate */}
      <section className="mem-groups">
        <div className="mem-container">
          <header className="mem-section-head">
            <p className="mem-section-num">III</p>
            <h2 className="mem-section-title">Groups &amp; Corporate</h2>
            <p className="mem-section-sub">
              Bring the club, the office, or the away end.
            </p>
          </header>

          <div className="mem-group-grid">
            {groupOffers.map((offer) => (
              <article key={offer.title} className="mem-group-card">
                <h3 className="mem-group-title">{offer.title}</h3>
                <p className="mem-group-price">{offer.price}</p>
                <p className="mem-group-desc">{offer.description}</p>
              </article>
            ))}
          </div>

          <div className="mem-groups-cta">
            <a href="/contact" className="mem-btn mem-btn-outline">
              Enquire about groups
            </a>
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

      {/* Fine print */}
      <section className="mem-fineprint">
        <div className="mem-container">
          <button
            type="button"
            className="mem-fineprint-toggle"
            aria-expanded={finePrintOpen}
            onClick={() => setFinePrintOpen((open) => !open)}
          >
            <span className="mem-section-num">IV</span>
            The Fine Print
            <span className="mem-fineprint-chevron" aria-hidden="true">
              {finePrintOpen ? '−' : '+'}
            </span>
          </button>
          {finePrintOpen && (
            <ul className="mem-fineprint-list">
              {finePrint.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mem-closing">
        <div className="mem-container mem-closing-inner">
          <h2 className="mem-closing-title">Reserve your 2027</h2>
          <p>
            Ten Saturday evenings on Aquidneck Island. Hold your place before the
            Founding hundred are gone.
          </p>
          <a href={ticketsUrl} className="mem-btn mem-btn-primary">
            Reserve now
          </a>
        </div>
      </section>
    </div>
  )
}

export default Memberships
