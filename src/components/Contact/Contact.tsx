import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Contact.css'

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-wrapper">
        <div className="contact-container">
          <h2>Contact</h2>
          <ComingSoon />
          <MailingListForm id="contact" />
        </div>
      </div>
    </section>
  )
}

export default Contact
