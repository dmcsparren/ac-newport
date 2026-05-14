import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          <img src="/logo.png" alt="AC Newport Logo" className="logo" />
          <span className="team-name">AC NEWPORT</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link>
          <Link to="/schedule" onClick={() => setIsMenuOpen(false)}>Schedule</Link>
          <a href="https://tickets.acnewport.com" onClick={() => setIsMenuOpen(false)}>Tickets</a>
          <Link to="/trials" onClick={() => setIsMenuOpen(false)}>Trial Registration</Link>
          <Link to="/community" onClick={() => setIsMenuOpen(false)}>Community</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
