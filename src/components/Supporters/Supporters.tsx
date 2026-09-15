import PageHero from '../PageHero/PageHero'
import PhotoBand from '../PhotoBand/PhotoBand'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Supporters.css'

const ways = [
  {
    eyebrow: 'Be there',
    title: 'Take your place',
    body: 'Single-match tickets and season memberships for all ten home occasions at Toppa Field.',
  },
  {
    eyebrow: 'Wear it',
    title: 'The NOSOLO collection',
    body: 'Official club kit and the NOSOLO collaboration — proceeds support mental health through sport.',
  },
  {
    eyebrow: 'Arrive green',
    title: 'Ride to the match',
    body: 'Free entry for supporters who cycle to the ground, in partnership with Bike Newport.',
  },
  {
    eyebrow: 'Bring the noise',
    title: 'Matchday atmosphere',
    body: 'Songs, scarves, and floodlights — the island end that turns a fixture into an occasion.',
  },
]

const Supporters = () => {
  return (
    <div className="supporters-page-content" id="supporters">
      <PageHero
        eyebrow="Supporters"
        title="Stand with"
        accent="the island's club."
        lede="From the first whistle to the final harbour gathering, AC Newport is carried by its supporters."
        image="/images/DSC04169.jpg"
        focus="center 55%"
      />

      <section className="section">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center">The Twelfth Player</p>
          <h2 className="display-title section-title">
            The club is nothing <em>without its people.</em>
          </h2>
          <p className="lede intro-lede">
            There are as many ways to back AC Newport as there are supporters. Pick
            yours — and help build something that lasts on Aquidneck Island.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Ways to support</p>
            <h2 className="display-title section-title">
              Back the club, <em>your way.</em>
            </h2>
          </header>
          <div className="card-grid card-grid--2">
            {ways.map((way) => (
              <article key={way.title} className="card">
                <span className="card-eyebrow">{way.eyebrow}</span>
                <h3 className="card-title">{way.title}</h3>
                <p className="card-body">{way.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand
        eyebrow="Every Saturday"
        quote="Ten evenings under the lights. One island, behind one club."
        image="/images/DSC03691.jpg"
        focus="center 30%"
      />

      <section className="section section--navy">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center eyebrow--light">Join In</p>
          <h2 className="display-title display-title--light section-title">Never miss a matchday</h2>
          <p className="signup-lede">
            Ticket releases, supporter events, and club news — straight to your
            inbox.
          </p>
          <MailingListForm id="supporters" />
        </div>
      </section>
    </div>
  )
}

export default Supporters
