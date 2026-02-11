import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import News from './components/News/News'
import Schedule from './components/Schedule/Schedule'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <News />
        <Schedule />
      </main>
      <Footer />
    </div>
  )
}

export default App
