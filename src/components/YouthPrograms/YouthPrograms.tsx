import { Link } from 'react-router-dom'
import PageHero from '../PageHero/PageHero'
import PhotoBand from '../PhotoBand/PhotoBand'
import MailingListForm from '../MailingListForm/MailingListForm'
import './YouthPrograms.css'

const programs = [
  {
    eyebrow: 'Ages 6–12',
    title: 'Junior clinics',
    body: 'Skill-building sessions run by AC Newport staff, on the island, through the season.',
  },
  {
    eyebrow: 'Ages 13–18',
    title: 'Academy pathway',
    body: 'A route for committed players toward trials and the first-team environment.',
  },
  {
    eyebrow: 'Matchday',
    title: 'Player walkouts',
    body: 'Junior members lead the team out and greet the squad at home occasions.',
  },
]

const YouthPrograms = () => {
  return (
    <div className="youth-page-content" id="youth-programs">
      <PageHero
        eyebrow="Youth Programs"
        title="A pathway for"
        accent="island talent."
        lede="From first touches to first trials — AC Newport gives young players on Aquidneck Island somewhere to aim."
        image="/images/DSC03977.jpg"
        focus="center 30%"
      />

      <section className="section">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center">Player Development</p>
          <h2 className="display-title section-title">
            Built to bring players <em>through.</em>
          </h2>
          <p className="lede intro-lede">
            High-quality coaching, real matchday connection, and a clear route from
            the clinic to the club — all rooted on the island.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Programs</p>
            <h2 className="display-title section-title">
              From first touch <em>to first team.</em>
            </h2>
          </header>
          <div className="card-grid card-grid--3">
            {programs.map((program) => (
              <article key={program.title} className="card">
                <span className="card-eyebrow">{program.eyebrow}</span>
                <h3 className="card-title">{program.title}</h3>
                <p className="card-body">{program.body}</p>
              </article>
            ))}
          </div>
          <div className="youth-cta">
            <Link to="/trials" className="btn btn-outline">
              Register for trials
            </Link>
          </div>
        </div>
      </section>

      <PhotoBand
        eyebrow="The next generation"
        quote="Give the island's young players a club to grow into."
        image="/images/DSC03977-1.jpg"
        focus="center 30%"
      />

      <section className="section section--navy">
        <div className="container measure section-head--center">
          <p className="eyebrow eyebrow--center eyebrow--light">Stay Informed</p>
          <h2 className="display-title display-title--light section-title">Program updates &amp; dates</h2>
          <p className="signup-lede">
            Clinic schedules, academy openings, and camp announcements — straight
            to your inbox.
          </p>
          <MailingListForm id="youth-programs" />
        </div>
      </section>
    </div>
  )
}

export default YouthPrograms
