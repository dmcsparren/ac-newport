import ComingSoon from '../ComingSoon/ComingSoon'
import MailingListForm from '../MailingListForm/MailingListForm'
import './Community.css'

const Community = () => {
  return (
    <section className="community-section" id="community">
      <div className="community-wrapper">
        <div className="community-container">
          <h2>Community</h2>
          <ComingSoon />
          <MailingListForm id="community" />
        </div>
      </div>
    </section>
  )
}

export default Community
