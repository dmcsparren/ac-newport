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
          <h3 className="banner-title">AC Newport - Tryouts - March 21st & 22nd</h3>
          <p className="banner-description">
            AC Newport will be hosting tryouts on Aquidneck Island in March, location to be determined. Please register here for more details.
          </p>
        </div>
      </div>
    </Link>
  )
}

export default TryoutBanner
