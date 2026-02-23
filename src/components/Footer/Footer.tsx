import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>AC Newport</h3>
          <p>Established 2026</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/community">Community</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><Link to="/community">Supporters</Link></li>
            <li><Link to="/community">Youth Programs</Link></li>
            <li><Link to="/community">Partners</Link></li>
            <li><Link to="/community">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://instagram.com/athletic_club_newport" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://tiktok.com/@athletic_club_newport" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TikTok</a>
            <a href="https://facebook.com/acnewport" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a href="https://youtube.com/@acnewport" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} AC Newport. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <span>|</span>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
