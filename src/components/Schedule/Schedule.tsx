import { useState } from 'react'
import { games, monthNames, getGamesByMonth, getHomeGames, getAwayGames, Game } from './scheduleData'
import './Schedule.css'

type FilterType = 'all' | 'home' | 'away' | 'may' | 'june' | 'july'

const Schedule = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const getFilteredGames = (): Game[] => {
    switch (activeFilter) {
      case 'home':
        return getHomeGames()
      case 'away':
        return getAwayGames()
      case 'may':
      case 'june':
      case 'july':
        return getGamesByMonth(activeFilter)
      default:
        return games
    }
  }

  const filteredGames = getFilteredGames()

  // Group games by month for display
  const gamesByMonth = {
    may: filteredGames.filter(g => g.month === 'may'),
    june: filteredGames.filter(g => g.month === 'june'),
    july: filteredGames.filter(g => g.month === 'july')
  }

  return (
    <div className="schedule">
      {/* Hero Section */}
      <div className="schedule-hero">
        <div className="schedule-hero-content">
          <span className="hero-badge">North Atlantic Conference · 2026 Season</span>
          <h1>2026 Schedule</h1>
          <p className="hero-subtitle">
            All kickoff times listed in Eastern Time<br />
            Home games at Toppa Field, Newport, RI
          </p>
          <div className="legend">
            <span className="legend-item">
              <span className="dot dot-home"></span> AC Newport Home
            </span>
            <span className="legend-item">
              <span className="dot dot-away"></span> AC Newport Away
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Matches
        </button>
        <button
          className={`filter-btn ${activeFilter === 'home' ? 'active' : ''}`}
          onClick={() => setActiveFilter('home')}
        >
          ⚽ Home Games
        </button>
        <button
          className={`filter-btn ${activeFilter === 'away' ? 'active' : ''}`}
          onClick={() => setActiveFilter('away')}
        >
          ✈ Away Games
        </button>
        <button
          className={`filter-btn ${activeFilter === 'may' ? 'active' : ''}`}
          onClick={() => setActiveFilter('may')}
        >
          May
        </button>
        <button
          className={`filter-btn ${activeFilter === 'june' ? 'active' : ''}`}
          onClick={() => setActiveFilter('june')}
        >
          June
        </button>
        <button
          className={`filter-btn ${activeFilter === 'july' ? 'active' : ''}`}
          onClick={() => setActiveFilter('july')}
        >
          July
        </button>
      </div>

      {/* Games Content */}
      <div className="schedule-content">
        {/* May Games */}
        {gamesByMonth.may.length > 0 && (
          <div className="month-group">
            <div className="month-header">
              <span className="month-label">{monthNames.may}</span>
              <div className="month-divider"></div>
              <span className="month-count">{gamesByMonth.may.length} {gamesByMonth.may.length === 1 ? 'Match' : 'Matches'}</span>
            </div>
            <div className="games-grid">
              {gamesByMonth.may.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* June Games */}
        {gamesByMonth.june.length > 0 && (
          <div className="month-group">
            <div className="month-header">
              <span className="month-label">{monthNames.june}</span>
              <div className="month-divider"></div>
              <span className="month-count">{gamesByMonth.june.length} {gamesByMonth.june.length === 1 ? 'Match' : 'Matches'}</span>
            </div>
            <div className="games-grid">
              {gamesByMonth.june.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* July Games */}
        {gamesByMonth.july.length > 0 && (
          <div className="month-group">
            <div className="month-header">
              <span className="month-label">{monthNames.july}</span>
              <div className="month-divider"></div>
              <span className="month-count">{gamesByMonth.july.length} {gamesByMonth.july.length === 1 ? 'Match' : 'Matches'}</span>
            </div>
            <div className="games-grid">
              {gamesByMonth.july.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="cta-section">
          <div>
            <h3>Get Your Tickets Now</h3>
            <p>Don't miss AC Newport's inaugural season at Toppa Field. All home matches are played in Newport, Rhode Island.</p>
          </div>
          <a className="btn-red" href="/tickets">Buy Tickets</a>
        </div>
      </div>
    </div>
  )
}

// Game Card Component
interface GameCardProps {
  game: Game
}

const GameCard = ({ game }: GameCardProps) => {
  const isACNewportHome = game.homeTeam === 'AC Newport'
  const cardClass = game.isHome ? 'game-card featured-home' : 'game-card featured-away'

  return (
    <div className={cardClass}>
      <div className="game-inner">
        {/* Date Column */}
        <div className="game-date-col">
          <span className="month-day">{game.date}</span>
          <span className="day-name">{game.dayName}</span>
          <span className="game-time">{game.time}</span>
        </div>

        {/* Game Info */}
        <div className="game-info">
          <div className="matchup">
            <span className={`team-home ${isACNewportHome ? 'team-acnewport' : ''}`}>
              {game.homeTeam}
            </span>
            <span className="vs-divider">vs</span>
            <span className={`team-away ${!isACNewportHome ? 'team-acnewport' : ''}`}>
              {game.awayTeam}
            </span>
          </div>
          <div className="venue-row">
            <svg fill="none" height="13" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="13">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {game.venue}, {game.location}
          </div>
        </div>

        {/* Badge Column */}
        <div className="game-badge-col">
          <span className={`badge ${game.isHome ? 'badge-home' : 'badge-away'}`}>
            {game.isHome ? 'Home' : 'Away'}
          </span>
          <span className="badge badge-acnewport">AC Newport</span>
        </div>
      </div>
    </div>
  )
}

export default Schedule
