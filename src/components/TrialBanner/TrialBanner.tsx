import { Link } from 'react-router-dom'
import './TryoutBanner.css'

const TryoutBanner = () => {
  return (
    <Link to="/tryouts" className="tryout-banner">
      <div className="tryout-banner-content">
        <div className="banner-logo">
          <img src="/logo.png" alt="AC Newport Logo" />
        </div>
        <div className="banner-text-content">
          <h3 className="banner-title">AC Newport - Tryouts - March 21 & 22</h3>
          <p className="banner-description">
            9:00 am - 12:00 pm at Saint George's School, Middletown, RI
          </p>
        </div>
      </div>
    </Link>
  )
}

export default TryoutBanner
