import Hero from '../components/Hero/Hero'
import News from '../components/News/News'
import MailingListForm from '../components/MailingListForm/MailingListForm'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <News />
      <section className="home-mailing-list">
        <div className="mailing-list-container">
          <h2>Stay Connected</h2>
          <p className="mailing-list-intro">
            Join our mailing list to receive the latest updates about AC Newport, including
            match schedules, ticket information, and exclusive community events.
          </p>
          <MailingListForm id="home" />
        </div>
      </section>
    </div>
  )
}

export default Home
