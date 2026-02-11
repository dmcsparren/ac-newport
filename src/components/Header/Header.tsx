import { useState } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img src="/logo.png" alt="AC Newport Logo" className="logo" />
          <span className="team-name">AC NEWPORT</span>
        </div>

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
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a>
          <a href="#schedule" onClick={() => setIsMenuOpen(false)}>Schedule</a>
          <a href="#news" onClick={() => setIsMenuOpen(false)}>News</a>
          <a href="#tickets" onClick={() => setIsMenuOpen(false)}>Tickets</a>
          <a href="#community" onClick={() => setIsMenuOpen(false)}>Community</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
