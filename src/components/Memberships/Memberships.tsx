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
            <a href="#tickets" className="btn btn-primary">
              Explore Season Tickets
            </a>
            <a href="#weekend" className="btn btn-ghost">
              Plan the Weekend
            </a>
          </div>
        </div>
      </section>

      {/* Intro / single-match context */}
      <section className="mem-intro">
        <div className="mem-narrow">
          <p className="eyebrow eyebrow--center">The Case for the Season</p>
          <h2 className="display-title mem-intro-title">
            Newport has always drawn the world for sport.
            <em>Now it has a club.</em>
          </h2>
          <p className="lede mem-intro-lede">
            Tennis has its Hall of Fame here. Sailing has its harbour. AC Newport
            gives the island its football season — an international club on its own
            journey through the American ranks, with a fixture list built for
            residents and for the visitors who plan a weekend around it.
          </p>
          <div className="mem-rule" />
          <p className="mem-intro-price">
            Single match — {singleMatchPricing.adult} adult ·{' '}
            {singleMatchPricing.youth} child (12 &amp; under). A full season pays
            for itself in eight matches.
          </p>
        </div>
      </section>

      {/* Season ticket tiers */}
      <section className="mem-tiers" id="tickets">
        <div className="mem-container">
          <header className="mem-section-head">
            <p className="eyebrow">I. Season Tickets</p>
            <h2 className="display-title mem-section-title">
              Choose how you <em>hold your place.</em>
            </h2>
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
                  className={`btn mem-tier-cta${
                    tier.featured ? ' btn-primary' : ' btn-outline'
                  }`}
                >
                  {tier.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Newport Weekend — split with photo */}
      <section className="mem-weekend" id="weekend">
        <div className="mem-weekend-grid">
          <div className="mem-weekend-media" role="img" aria-label="A Newport matchday weekend" />
          <div className="mem-weekend-content">
            <p className="eyebrow eyebrow--light">II. The Newport Weekend</p>
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

      {/* Groups & Corporate */}
      <section className="mem-groups">
        <div className="mem-container">
          <header className="mem-section-head">
            <p className="eyebrow">III. Groups &amp; Corporate</p>
            <h2 className="display-title mem-section-title">
              Bring the club, the office, <em>or the away end.</em>
            </h2>
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
            <a href="/contact" className="btn btn-outline">
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
            <span className="mem-fineprint-num">IV.</span>
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
        <div className="mem-closing-scrim" />
        <div className="mem-closing-inner">
          <p className="eyebrow eyebrow--center eyebrow--light">MMXXVII</p>
          <h2 className="display-title display-title--light mem-closing-title">
            Reserve your <em>season.</em>
          </h2>
          <p className="mem-closing-lede">
            Ten Saturday evenings on Aquidneck Island. Hold your place before the
            Founding hundred are gone.
          </p>
          <a href={ticketsUrl} className="btn btn-primary">
            Reserve now
          </a>
        </div>
      </section>
    </div>
  )
}

export default Memberships
