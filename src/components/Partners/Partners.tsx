import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Partners.css'

const Partners = () => {
  return (
    <section className="partners-section" id="partners">
      <div className="partners-wrapper">
        <div className="partners-container">
          <h2>Partners</h2>
          <ComingSoon />
          <MailingListForm id="partners" />
        </div>
      </div>
    </section>
  )
}

export default Partners
