import PageHero from '../PageHero/PageHero'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Contact.css'

const details = [
  {
    label: 'Email',
    value: 'info@acnewport.com',
    href: 'mailto:info@acnewport.com',
  },
  {
    label: 'Phone',
    value: '(401) 391-0632',
    href: 'tel:+14013910632',
  },
  {
    label: 'Home',
    value: 'Newport, Rhode Island',
  },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/ac_newport' },
  { label: 'TikTok', href: 'https://tiktok.com/@athletic_club_newport' },
  { label: 'Facebook', href: 'https://facebook.com/acnewport' },
]

const Contact = () => {
  return (
    <div className="contact-page-content" id="contact">
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        accent="with the club."
        lede="Questions about tickets, partnerships, trials, or the community? We'd love to hear from you."
        image="/images/DSC03539.jpg"
        focus="center 25%"
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-details">
            <p className="eyebrow">Reach us</p>
            <h2 className="display-title section-title">
              The details, <em>all in one place.</em>
            </h2>
            <ul className="contact-detail-list">
              {details.map((item) => (
                <li key={item.label} className="contact-detail">
                  <span className="contact-detail-label">{item.label}</span>
                  {item.href ? (
                    <a className="contact-detail-value" href={item.href}>
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-detail-value">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="contact-social">
              <span className="contact-detail-label">Follow</span>
              <div className="contact-social-links">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="contact-form-card">
            <p className="eyebrow">Stay Connected</p>
            <h3 className="contact-form-title">Join the mailing list</h3>
            <p className="contact-form-lede">
              Match schedules, ticket information, and community events — straight
              to your inbox.
            </p>
            <MailingListForm id="contact" />
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Contact
