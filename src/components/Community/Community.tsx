import PageHero from '../PageHero/PageHero'
import PhotoBand from '../PhotoBand/PhotoBand'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Community.css'

const pillars = [
  {
    title: 'Matchday atmosphere',
    body: 'Ten Saturday evenings that bring the island together under the floodlights.',
  },
  {
    title: 'Youth & schools',
    body: 'Clinics, walkouts, and a pathway that gives local players somewhere to aim.',
  },
  {
    title: 'Arrive by bike',
    body: 'Free entry for supporters who cycle to the ground, in partnership with Bike Newport.',
  },
  {
    title: 'Local partners',
    body: 'Dining, hotels, and island businesses woven into the AC Newport weekend.',
  },
]

const Community = () => {
  return (
    <div className="community-page-content" id="community">
      <PageHero
        eyebrow="Community"
        title="More than"
        accent="a game."
        lede="AC Newport is built for the people of Aquidneck Island — the supporters, families, and neighbours who make a fixture feel like a weekend."
        image="/images/DSC03977-1.jpg"
        focus="center 35%"
      />

      <section className="section">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center">The Club &amp; the Island</p>
          <h2 className="display-title section-title">
            A club that belongs <em>to the island.</em>
          </h2>
          <p className="lede community-intro-lede">
            We aim to create pathways and opportunities for an entire community to
            take part in high-quality football — on the pitch and in the stands.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">What we build</p>
            <h2 className="display-title section-title">
              Around every <em>ninety minutes.</em>
            </h2>
          </header>
          <div className="community-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="community-card">
                <h3 className="community-card-title">{pillar.title}</h3>
                <p className="community-card-body">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand
        eyebrow="Together"
        quote="Amor Vincit Omnia — love conquers all."
        image="/images/DSC03591.jpg"
        focus="center 30%"
      />

      <section className="section section--navy">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center eyebrow--light">Get Involved</p>
          <h2 className="display-title display-title--light section-title">Join the community</h2>
          <p className="community-signup-lede">
            Community events, volunteer opportunities, and matchday news — straight
            to your inbox.
          </p>
          <MailingListForm id="community" />
        </div>
      </section>
    </div>
  )
}

export default Community
