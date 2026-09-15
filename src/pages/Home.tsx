import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import News from '../components/News/News'
//import TrialBanner from '../components/TrialBanner/TrialBanner'
import MailingListForm from '../components/MailingListForm/MailingListForm'
import './Home.css'

const differentiators = [
  {
    label: 'On the island',
    title: 'Matches you can walk to',
    body: 'Home fixtures staged on Aquidneck Island — competitive football, minutes from Thames Street.',
  },
  {
    label: 'The league',
    title: 'National Premier Soccer League',
    body: 'AC Newport competes in the NPSL, one of the largest leagues in the American soccer pyramid.',
  },
  {
    label: 'The pathway',
    title: 'A route for local players',
    body: 'Trials, youth programs, and a first team that gives island talent somewhere to aim.',
  },
  {
    label: 'The community',
    title: 'More than ninety minutes',
    body: 'A club built for residents and the visitors who plan a weekend around a Saturday night.',
  },
]

const experience = [
  { to: '/team', label: 'The Team', body: 'The squad carrying the crest.' },
  { to: '/schedule', label: 'Fixtures', body: 'Every home and away date.' },
  { to: 'https://tickets.acnewport.com', label: 'Tickets', body: 'Take your place in the ground.', external: true },
  { to: '/community', label: 'Community', body: 'The people around the club.' },
]

const Home = () => {
  return (
    <div className="home-page">
      <Hero />

      {/* Intro statement */}
      <section className="home-intro">
        <div className="home-narrow">
          <p className="eyebrow eyebrow--center">The Club</p>
          <h2 className="display-title home-intro-title">
            Newport has always drawn the world for sport.
            <em>Now it has a club.</em>
          </h2>
          <p className="lede home-intro-lede">
            Tennis has its Hall of Fame here. Sailing has its harbour. AC Newport
            gives Aquidneck Island its football season — an international club on
            its own journey through the American ranks, with a home built for the
            people who live here.
          </p>
        </div>
      </section>

      {/* Why AC Newport — split with photo */}
      <section className="home-why">
        <div className="home-why-grid">
          <div className="home-why-media" role="img" aria-label="AC Newport training at Saint George's School" />
          <div className="home-why-content">
            <p className="eyebrow">Why AC Newport</p>
            <h2 className="display-title home-section-title">
              A real club, <em>on the island.</em>
            </h2>
            <ul className="home-feature-list">
              {differentiators.map((item) => (
                <li key={item.title} className="home-feature">
                  <span className="home-feature-label">{item.label}</span>
                  <div>
                    <h3 className="home-feature-title">{item.title}</h3>
                    <p className="home-feature-body">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full-bleed matchday band */}
      <section className="home-band" aria-label="Matchday at AC Newport">
        <div className="home-band-inner">
          <p className="eyebrow eyebrow--light">Matchday</p>
          <p className="home-band-quote">
            Ten Saturday evenings. Floodlights on the island, and a ground that
            feels like it has always been here.
          </p>
        </div>
      </section>

      {/* The full experience */}
      <section className="home-experience">
        <div className="home-container">
          <header className="home-experience-head">
            <p className="eyebrow eyebrow--center">Explore</p>
            <h2 className="display-title home-section-title home-center">The full experience</h2>
          </header>
          <div className="home-experience-grid">
            {experience.map((card) =>
              card.external ? (
                <a key={card.label} href={card.to} className="home-experience-card">
                  <span className="home-experience-label">{card.label}</span>
                  <span className="home-experience-body">{card.body}</span>
                  <span className="home-experience-arrow" aria-hidden="true">&rarr;</span>
                </a>
              ) : (
                <Link key={card.label} to={card.to} className="home-experience-card">
                  <span className="home-experience-label">{card.label}</span>
                  <span className="home-experience-body">{card.body}</span>
                  <span className="home-experience-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* <TrialBanner /> */}
      <News />

      {/* Mailing list */}
      <section className="home-mailing-list">
        <div className="mailing-list-wrapper">
          <div className="mailing-list-container">
            <p className="eyebrow eyebrow--center eyebrow--light">Stay Connected</p>
            <h2>Join the mailing list</h2>
            <p className="mailing-list-intro">
              Match schedules, ticket information, and exclusive community events —
              straight to your inbox.
            </p>
            <MailingListForm id="home" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
