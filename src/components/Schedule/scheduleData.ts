// 2026 Season Schedule Data
export interface Game {
  id: string
  date: string // Format: "May 2"
  dayName: string // "Saturday", "Wednesday", etc.
  time: string
  homeTeam: string
  awayTeam: string
  venue: string
  location: string
  isHome: boolean // true if AC Newport is home team
  month: string // "may", "june", "july"
}

export const games: Game[] = [
  // MAY
  // {
  //   id: "game-1",
  //   date: "May 2",
  //   dayName: "Saturday",
  //   time: "6:00 PM",
  //   homeTeam: "AC Newport",
  //   awayTeam: "Osner's FC",
  //   venue: "Portsmouth High School",
  //   location: "Portsmouth, RI",
  //   isHome: true,
  //   month: "may"
  // },
  {
    id: "game-2",
    date: "May 16",
    dayName: "Saturday",
    time: "6:00 PM",
    homeTeam: "ASC New York",
    awayTeam: "AC Newport",
    venue: "Stony Brook University",
    location: "Stony Brook, NY",
    isHome: false,
    month: "may"
  },
  {
    id: "game-3",
    date: "May 23",
    dayName: "Saturday",
    time: "6:00 PM",
    homeTeam: "AC Newport",
    awayTeam: "ASC New York",
    venue: "Toppa Field",
    location: "Newport, RI",
    isHome: true,
    month: "may"
  },

  // JUNE
  {
    id: "game-4",
    date: "Jun 6",
    dayName: "Saturday",
    time: "6:00 PM",
    homeTeam: "AC Newport",
    awayTeam: "New York Shockers",
    venue: "Toppa Field",
    location: "Newport, RI",
    isHome: true,
    month: "june"
  },
  {
    id: "game-5",
    date: "Jun 13",
    dayName: "Saturday",
    time: "6:00 PM",
    homeTeam: "AC Newport",
    awayTeam: "New Haven United FC",
    venue: "Toppa Field",
    location: "Newport, RI",
    isHome: true,
    month: "june"
  },
  {
    id: "game-6",
    date: "Jun 17",
    dayName: "Wednesday",
    time: "7:00 PM",
    homeTeam: "New York Shockers",
    awayTeam: "AC Newport",
    venue: "Afrim's Sports Park",
    location: "Colonie, NY 12205",
    isHome: false,
    month: "june"
  },
  {
    id: "game-7",
    date: "Jun 20",
    dayName: "Saturday",
    time: "7:00 PM",
    homeTeam: "Santa Cruz FC",
    awayTeam: "AC Newport",
    venue: "Doucette Stadium",
    location: "Bridgeport, CT",
    isHome: false,
    month: "june"
  },
  {
    id: "game-8",
    date: "Jun 24",
    dayName: "Wednesday",
    time: "6:00 PM",
    homeTeam: "AC Newport",
    awayTeam: "Santa Cruz FC",
    venue: "Toppa Field",
    location: "Newport, RI",
    isHome: true,
    month: "june"
  },
  {
    id: "game-9",
    date: "Jun 27",
    dayName: "Saturday",
    time: "7:30 PM",
    homeTeam: "Osner's FC",
    awayTeam: "AC Newport",
    venue: "Queens College",
    location: "Flushing, NY",
    isHome: false,
    month: "june"
  },

  // JULY
  {
    id: "game-10",
    date: "Jul 1",
    dayName: "Wednesday",
    time: "7:00 PM",
    homeTeam: "New Haven United FC",
    awayTeam: "AC Newport",
    venue: "Yale University",
    location: "New Haven, CT",
    isHome: false,
    month: "july"
  }
]

export const monthNames: { [key: string]: string } = {
  may: "May 2026",
  june: "June 2026",
  july: "July 2026"
}

export function getGamesByMonth(month: string): Game[] {
  return games.filter(game => game.month === month)
}

export function getHomeGames(): Game[] {
  return games.filter(game => game.isHome)
}

export function getAwayGames(): Game[] {
  return games.filter(game => !game.isHome)
}
