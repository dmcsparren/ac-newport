// Content for the 2027 Season Memberships experience, mirroring acn.pplx.app.
// Kept as data so copy and pricing can be edited without touching layout code.

export interface Tier {
  id: string
  name: string
  /** Short nautical descriptor shown under the name. */
  tagline: string
  /** Primary price line(s). Each entry renders as one price row. */
  prices: { amount: string; label: string }[]
  perks: string[]
  /** Optional footnote shown in smaller text below the perks. */
  note?: string
  /** Ribbon label, e.g. "Most Requested" or "Limited to 100". */
  badge?: string
  /** Highlight the card visually (featured tier). */
  featured?: boolean
  ctaLabel: string
}

export const singleMatchPricing = {
  adult: '$20',
  youth: '$15',
  note: 'Single admission at the gate — child pricing is 12 & under.',
}

export const tiers: Tier[] = [
  {
    id: 'compass',
    name: 'Compass',
    tagline: 'General admission for the full campaign',
    prices: [
      { amount: '$154', label: 'Adult' },
      { amount: '$126', label: 'Youth · 12 & under' },
    ],
    perks: [
      'Full season access to every 2027 home match',
      'Commemorative compass scarf (approx. $20 value)',
      'Two general admission guest tickets',
      '10% club shop discount',
      'Early access to the season calendar',
      'Renewal priority for 2028',
    ],
    ctaLabel: 'Reserve Compass',
  },
  {
    id: 'after-guard',
    name: 'After Guard',
    tagline: 'The premium zone, cushioned seating, and the club’s private calendar',
    badge: 'Most Requested',
    featured: true,
    prices: [
      { amount: '$184', label: 'Adult' },
      { amount: '$144', label: 'Youth · 12 & under' },
    ],
    perks: [
      'Premium zone access with cushioned seating',
      'Commemorative compass scarf',
      'Two general admission guest tickets',
      'Private calendar: club receptions, ownership evening, youth clinic',
      'End-of-season gift',
      '15% club shop discount',
    ],
    ctaLabel: 'Reserve After Guard',
  },
  {
    id: 'six-pack',
    name: 'Six Pack',
    tagline: 'Six for the price of four, and six admissions to give away',
    prices: [
      { amount: '$600', label: 'Total · $100 per ticket' },
    ],
    perks: [
      'Six full season tickets (charged as four)',
      'Six single-admission credits',
      '10% club shop discount',
      'Renewal priority for 2028',
    ],
    ctaLabel: 'Reserve Six Pack',
  },
  {
    id: 'founding',
    name: 'Founding Membership',
    tagline: 'The only package that carries membership of the Athletic Club of Newport',
    badge: 'Limited to 100',
    prices: [
      { amount: '$199', label: 'One-time · first 100 members' },
    ],
    perks: [
      'Numbered, engraved membership card (starting at 002)',
      'Full Compass season ticket benefits',
      'NOSOLO collaboration hoodie — heather grey, embroidered crest',
      'Founding member status for life; number held at renewal at no extra cost',
    ],
    note: 'Saves $30 versus separate purchase ($154 ticket + $85 hoodie). Card and hoodie collected at your first home occasion. Sizes XS–XXL.',
    ctaLabel: 'Claim Founding Membership',
  },
  {
    id: 'quarterdeck',
    name: 'The Quarterdeck',
    tagline: 'Season-long hospitality for eight',
    badge: 'By Invitation',
    prices: [
      { amount: 'Enquire', label: 'Limited allocation' },
    ],
    perks: [
      'Private matchday terrace with host service',
      'Paired access to partner hotels and the harbour programme',
      'Season-long hospitality for a party of eight',
      'Booked separately from season tickets',
    ],
    ctaLabel: 'Request the Quarterdeck',
  },
]

export interface WeekendStep {
  time: string
  title: string
  description: string
}

export const weekendSteps: WeekendStep[] = [
  {
    time: 'Afternoon',
    title: 'Island & Harbour',
    description:
      'Begin on the water — Cliff Walk, Ocean Drive, and Newport’s harbour before kickoff.',
  },
  {
    time: 'Early Evening',
    title: 'Dine & Explore',
    description:
      'Dining, shopping, and museums across the island at preferential partner rates.',
  },
  {
    time: 'Kickoff',
    title: 'Toppa Field',
    description:
      'Six minutes from Thames Street at Freebody Park. Gates open one hour prior.',
  },
  {
    time: 'Full Time',
    title: 'Back to the Harbour',
    description:
      'Gather with supporters at the harbour to close out the weekend.',
  },
]

export interface GroupOffer {
  title: string
  price: string
  description: string
}

export const groupOffers: GroupOffer[] = [
  {
    title: 'Clubs & Academies',
    price: 'From $10 / person',
    description:
      'Groups of 15+ with a pitch-side walkout and squad greeting available on request.',
  },
  {
    title: 'Corporate Evenings',
    price: '20–80 people',
    description:
      'Tailored packages with catering, host service, and banner recognition.',
  },
  {
    title: 'Visiting Supporters',
    price: 'Package rate',
    description:
      'Away-day packages paired with our Newport hotel partnerships.',
  },
]

export interface Partner {
  name: string
  logo: string
  href?: string
}

export const partners: Partner[] = [
  { name: 'NPT Health Works', logo: '/images/partners/npt-health-works.jpeg', href: 'http://npthealthworks.com' },
  { name: 'NoSolo', logo: '/images/partners/nosolo.jpg', href: 'http://shop.nosolobrand.com' },
  { name: 'Willett Team', logo: '/images/partners/willett-team.jpg', href: 'https://willettteam.com/' },
  { name: 'The Pell', logo: '/images/partners/the-pell.png', href: 'https://www.hyatt.com/jdv-by-hyatt/en-US/pvdjd-the-pell' },
  { name: 'Newport Neighbors', logo: '/images/partners/newport-neighbors.png' },
  { name: 'CRU Cafe', logo: '/images/partners/cru-cafe.png', href: 'https://crucafenewport.com/' },
  { name: 'NEXT STEP', logo: '/images/partners/next-step.png', href: 'https://www.next-step-training.com/' },
  { name: 'Bloom Bus', logo: '/images/partners/bloom-bus.png', href: 'https://www.bloombus.com/' },
  { name: 'International Tennis Hall of Fame', logo: '/images/partners/tennis-hall-of-fame.png', href: 'https://www.tennisfame.com/' },
  { name: 'MAC Designs Newport', logo: '/images/partners/mac-designs.png', href: 'https://www.macdesignsnewport.com/' },
]

export const finePrint: string[] = [
  'Included: all AC Newport home events — competitive matches, friendlies, internationals, and postseason.',
  'Single admission: $20 adult, $15 child (12 & under) at the gate.',
  'Toutix service fee of 10% + $0.99 per ticket is shown before payment.',
  'Guest tickets and credits are transferable; resale runs through the verified, anti-bot Toutix marketplace.',
  'Founding renewal: a 30-day December window at the prevailing season-ticket rate; your number is retired if missed.',
  'Accessibility: step-free routes and companion arrangements available with advance notice.',
  'Delivery: ticketing via Toutix — your season ticket is held in your account and displayed on your phone at the gate.',
]

/** Where CTAs point until the Toutix flow is wired up. */
export const ticketsUrl = 'https://tickets.acnewport.com'
