import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './YouthPrograms.css'

const YouthPrograms = () => {
  return (
    <section className="youth-programs-section" id="youth-programs">
      <div className="youth-programs-wrapper">
        <div className="youth-programs-container">
          <h2>Youth Programs</h2>
          <ComingSoon />
          <MailingListForm id="youth-programs" />
        </div>
      </div>
    </section>
  )
}

export default YouthPrograms
