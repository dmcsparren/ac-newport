import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Tickets.css'

const Tickets = () => {
  return (
    <section className="tickets-section" id="tickets">
      <div className="tickets-wrapper">
        <div className="tickets-container">
          <h2>Tickets</h2>
          <ComingSoon />
          <MailingListForm id="tickets" />
        </div>
      </div>
    </section>
  )
}

export default Tickets
