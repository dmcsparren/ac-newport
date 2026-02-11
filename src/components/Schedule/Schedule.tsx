import './Schedule.css'

interface Match {
  id: number
  date: string
  time: string
  opponent: string
  location: 'Home' | 'Away'
  competition: string
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    date: 'March 15, 2026',
    time: '7:00 PM',
    opponent: 'Coastal FC',
    location: 'Home',
    competition: 'League'
  },
  {
    id: 2,
    date: 'March 22, 2026',
    time: '6:30 PM',
    opponent: 'Harbor United',
    location: 'Away',
    competition: 'League'
  },
  {
    id: 3,
    date: 'March 29, 2026',
    time: '7:00 PM',
    opponent: 'Bay City SC',
    location: 'Home',
    competition: 'League'
  }
]

const Schedule = () => {
  return (
    <section className="schedule" id="schedule">
      <h2>Upcoming Matches</h2>
      <div className="matches-container">
        {upcomingMatches.map((match) => (
          <div key={match.id} className={`match-card ${match.location.toLowerCase()}`}>
            <div className="match-header">
              <span className="match-competition">{match.competition}</span>
              <span className={`match-location ${match.location.toLowerCase()}`}>
                {match.location}
              </span>
            </div>
            <div className="match-details">
              <div className="match-teams">
                <span className="team">AC Newport</span>
                <span className="vs">VS</span>
                <span className="opponent">{match.opponent}</span>
              </div>
              <div className="match-info">
                <time className="match-datetime">
                  <span className="date">{match.date}</span>
                  <span className="time">{match.time}</span>
                </time>
              </div>
            </div>
            <button className="match-cta">
              {match.location === 'Home' ? 'Get Tickets' : 'Match Info'}
            </button>
          </div>
        ))}
      </div>
      <div className="schedule-footer">
        <a href="#full-schedule" className="view-full-schedule">
          View Full Schedule →
        </a>
      </div>
    </section>
  )
}

export default Schedule
