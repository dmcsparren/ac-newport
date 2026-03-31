import { Link } from 'react-router-dom'
import './TrialBanner.css'

const TrialBanner = () => {
  return (
    <Link to="/trials" className="trial-banner">
      <div className="trial-banner-content">
        <div className="banner-logo">
          <img src="/logo.png" alt="AC Newport Logo" />
        </div>
        <div className="banner-text-content">
          <h3 className="banner-title">AC Newport - Player Trials</h3>
          <p className="banner-description">
            Register now for your opportunity to trial with AC Newport
          </p>
        </div>
      </div>
    </Link>
  )
}

export default TrialBanner
