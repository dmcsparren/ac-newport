import { Link } from 'react-router-dom'
import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import { features } from '../../config/features'
import './Tickets.css'

const Tickets = () => {
  return (
    <section className="tickets-section" id="tickets">
      <div className="tickets-wrapper">
        <div className="tickets-container">
          <h2>Tickets</h2>
          {features.memberships ? (
            <div className="tickets-memberships-cta">
              <p>
                Season tickets and Founding Membership for the 2027 campaign are
                now open — ten home occasions on Aquidneck Island.
              </p>
              <Link to="/memberships" className="tickets-memberships-btn">
                View Season Memberships
              </Link>
            </div>
          ) : (
            <ComingSoon />
          )}
          <MailingListForm id="tickets" />
        </div>
      </div>
    </section>
  )
}

export default Tickets
