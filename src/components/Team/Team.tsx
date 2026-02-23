import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Team.css'

const Team = () => {
  return (
    <section className="team-section" id="team">
      <div className="team-container">
        <h2>Our Team</h2>
        <ComingSoon />
        <MailingListForm id="team" />
      </div>
    </section>
  )
}

export default Team
