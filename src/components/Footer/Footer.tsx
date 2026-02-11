import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>AC Newport</h3>
          <p>Established 2026</p>
          <p className="tagline">Navigate Your Passion</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#team">Team</a></li>
            <li><a href="#schedule">Schedule</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#tickets">Tickets</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="#supporters">Supporters</a></li>
            <li><a href="#youth">Youth Programs</a></li>
            <li><a href="#partners">Partners</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#twitter" aria-label="Twitter">Twitter</a>
            <a href="https://instagram.com/ac_newport" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://facebook.com/ac_newport" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a href="#youtube" aria-label="YouTube">YouTube</a>
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
