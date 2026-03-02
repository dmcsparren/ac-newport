import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home'
import TeamPage from './pages/TeamPage'
import SchedulePage from './pages/SchedulePage'
import TicketsPage from './pages/TicketsPage'
import CommunityPage from './pages/CommunityPage'
import SupportersPage from './pages/SupportersPage'
import YouthProgramsPage from './pages/YouthProgramsPage'
import PartnersPage from './pages/PartnersPage'
import ContactPage from './pages/ContactPage'
import TryoutsPage from './pages/TryoutsPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/supporters" element={<SupportersPage />} />
            <Route path="/youth-programs" element={<YouthProgramsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tryouts" element={<TryoutsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
