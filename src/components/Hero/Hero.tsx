import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to AC Newport</h1>
          <p className="hero-subtitle">Est. 2026</p>
          <p className="hero-motto">Amor Vincit Omnia - Love Conquers All</p>
          <p className="hero-description">
            At the heart of AC Newport lies a commitment to advancing soccer, engaging fans
            and communities through the beautiful game. We aim to create pathways and
            opportunities for an entire community to participate in high-quality football.
          </p>
          <p className="hero-description">
            Located in Newport, Rhode Island—home of the Tennis Hall of Fame and the
            Sailing Capital of the World—AC Newport brings professional soccer to one of
            America's most iconic sporting destinations.
          </p>
          <div className="hero-cta">
            <Link to="/tickets" className="cta-primary">Get Tickets</Link>
            <Link to="/community" className="cta-secondary">Join Our Community</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/logo.png" alt="AC Newport Compass Logo" />
        </div>
      </div>
    </section>
  )
}

export default Hero
