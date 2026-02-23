import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Schedule.css'

const Schedule = () => {
  return (
    <section className="schedule" id="schedule">
      <div className="schedule-container">
        <h2>Schedule</h2>
        <ComingSoon />
        <MailingListForm id="schedule" />
      </div>
    </section>
  )
}

export default Schedule
