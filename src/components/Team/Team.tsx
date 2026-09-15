import PageHero from '../PageHero/PageHero'
import PhotoBand from '../PhotoBand/PhotoBand'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Team.css'

const roster = [
  'Aris Taki',
  'Carl Toulou',
  'Carter Robbins',
  'Chris Mencos',
  'Dan Goba',
  'Evan Conceicao',
  'Horace Avila',
  'JT Newbury',
  'Jack Clarke',
  'Jack Krikorian',
  'Jackoby Pelland',
  'JeanLuca Frenzilli',
  'Justin Talbot',
  'Kaisei Korytoski',
  'Moises Morales',
  'Niko Alberga',
  'TJ Levisee',
]

const leadership = [
  {
    name: 'Ziggy Korytoski',
    role: 'Sporting Director',
    bio: 'Jeffrey "Ziggy" Korytoski brings distinguished coaching experience, including leading ASC San Diego to two conference championships and an NPSL National Semifinal.',
  },
]

const Team = () => {
  return (
    <div className="team-page-content" id="team">
      <PageHero
        eyebrow="The Squad"
        title="The players"
        accent="who carry the crest."
        lede="AC Newport's competitive squad, representing Aquidneck Island in the National Premier Soccer League."
        image="/images/DSC03664.jpg"
        focus="center 30%"
      />

      <section className="section">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center">2026 Squad</p>
          <h2 className="display-title section-title">
            Meet the players <em>carrying the crest.</em>
          </h2>
          <p className="lede team-intro-lede">
            The group representing Aquidneck Island this season — trained on the
            island, competing in the National Premier Soccer League.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">The Squad</p>
            <h2 className="display-title section-title">
              First team, <em>2026.</em>
            </h2>
          </header>
          <ul className="team-roster">
            {roster.map((name) => (
              <li key={name} className="team-tile">
                <div className="team-tile-photo">
                  <img
                    src={`/images/headshots/${encodeURIComponent(name)}.jpg`}
                    alt={name}
                    loading="lazy"
                  />
                </div>
                <span className="team-tile-name">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Leadership</p>
            <h2 className="display-title section-title">
              The people <em>behind the badge.</em>
            </h2>
          </header>
          <div className="team-leader-grid">
            {leadership.map((person) => (
              <article key={person.name} className="team-leader-card">
                <span className="team-leader-role">{person.role}</span>
                <h3 className="team-leader-name">{person.name}</h3>
                <p className="team-leader-bio">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand
        eyebrow="On the pitch"
        quote="Football built for the island — competitive, local, and here to stay."
        image="/images/DSC04365.jpg"
        focus="center 40%"
      />

      <section className="section section--navy">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center eyebrow--light">Stay Connected</p>
          <h2 className="display-title display-title--light section-title">Meet the squad first</h2>
          <p className="team-signup-lede">
            Roster news, player features, and matchday updates — straight to your
            inbox.
          </p>
          <MailingListForm id="team" />
        </div>
      </section>
    </div>
  )
}

export default Team
