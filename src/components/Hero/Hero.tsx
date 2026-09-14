import { Link } from 'react-router-dom'
import { features } from '../../config/features'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-media" role="img" aria-label="AC Newport player on the ball at Saint George's School" />
      <div className="hero-scrim" />
      <div className="hero-inner">
        <p className="eyebrow eyebrow--light">Newport · Rhode Island — Est. MMXXVI</p>
        <h1 className="display-title display-title--light hero-title">
          Newport has a
          <em>football club.</em>
        </h1>
        <p className="hero-lede">
          Aquidneck Island's own competitive club, bringing first-rate football to
          the sailing capital of the world — <em>Amor Vincit Omnia.</em>
        </p>
        <div className="hero-cta">
          {features.memberships && (
            <Link to="/memberships" className="btn btn-primary">
              2027 Season Memberships
            </Link>
          )}
          <a
            href="https://tickets.acnewport.com"
            className={features.memberships ? 'btn btn-ghost' : 'btn btn-primary'}
          >
            Get Tickets
          </a>
          <Link to="/community" className="btn btn-ghost">
            The Community
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
