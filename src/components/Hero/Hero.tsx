import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to AC Newport</h1>
        <p className="hero-subtitle">Est. 2026 | Navigate Your Passion</p>
        <p className="hero-description">
          Join us as we embark on a historic journey. Be part of the founding community
          of AC Newport's inaugural season.
        </p>
        <div className="hero-cta">
          <button className="cta-primary">Get Tickets</button>
          <button className="cta-secondary">Become a Member</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/logo.png" alt="AC Newport Compass Logo" />
      </div>
    </section>
  )
}

export default Hero
