import PageHero from '../PageHero/PageHero'
import PhotoBand from '../PhotoBand/PhotoBand'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Partners.css'

const tiers = [
  {
    eyebrow: 'Matchday',
    title: 'On-ground presence',
    body: 'Banner placement, PA recognition, and hospitality at all ten home occasions.',
  },
  {
    eyebrow: 'Season',
    title: 'Season-long visibility',
    body: 'Association with the club across the campaign, digital channels, and the ground.',
  },
  {
    eyebrow: 'Community',
    title: 'Shared programmes',
    body: 'Co-branded youth clinics, community events, and island initiatives.',
  },
]

const partners = [
  'NPT Health Works',
  'NOSOLO',
  'The Pell',
  'CRU Cafe',
  'NEXT STEP Academy',
  'Bloom',
  'International Tennis Hall of Fame',
  'Newport Neighbors',
  'MAC Designs Newport',
  'NPSL',
]

const Partners = () => {
  return (
    <div className="partners-page-content" id="partners">
      <PageHero
        eyebrow="Partners"
        title="Business built"
        accent="around the club."
        lede="AC Newport partners with the island's finest — from hospitality to health, retail to the regatta set."
        image="/images/DSC03678.jpg"
        focus="center 40%"
      />

      <section className="section">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center">Partnership</p>
          <h2 className="display-title section-title">
            Reach Newport <em>through football.</em>
          </h2>
          <p className="lede intro-lede">
            A season ticket audience, ten home occasions, and a club woven into the
            island's calendar. Partnership packages are tailored to fit.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Ways to partner</p>
            <h2 className="display-title section-title">
              Three ways in, <em>one island club.</em>
            </h2>
          </header>
          <div className="card-grid card-grid--3">
            {tiers.map((tier) => (
              <article key={tier.title} className="card">
                <span className="card-eyebrow">{tier.eyebrow}</span>
                <h3 className="card-title">{tier.title}</h3>
                <p className="card-body">{tier.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-head--center">
          <p className="eyebrow eyebrow--center">In good company</p>
          <h2 className="display-title section-title partners-roster-title">
            Our partners <em>&amp; supporters.</em>
          </h2>
          <ul className="chip-list partners-chips">
            {partners.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoBand
        eyebrow="Let's talk"
        quote="Put your name alongside the island's club."
        image="/images/DSC03535.jpg"
        focus="center 30%"
      />

      <section className="section section--navy">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center eyebrow--light">Become a Partner</p>
          <h2 className="display-title display-title--light section-title">Start the conversation</h2>
          <p className="signup-lede">
            Tell us a little about your business and we'll be in touch with
            partnership options.
          </p>
          <a href="mailto:info@acnewport.com" className="btn btn-primary">
            Email the club
          </a>
          <div className="partners-signup-form">
            <MailingListForm id="partners" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners
