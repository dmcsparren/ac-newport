import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Supporters.css'

const Supporters = () => {
  return (
    <section className="supporters-section" id="supporters">
      <div className="supporters-wrapper">
        <div className="supporters-container">
          <h2>Supporters</h2>
          <ComingSoon />
          <MailingListForm id="supporters" />
        </div>
      </div>
    </section>
  )
}

export default Supporters
