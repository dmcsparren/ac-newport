# AC Newport Website

Official website for AC Newport professional soccer team, established 2026.

## Tech Stack

- **Frontend:** React 18 with TypeScript, Vite, React Router
- **Backend:** Express, Node.js
- **Database:** PostgreSQL
- **Hosting:** Railway
- **Styling:** CSS Modules with Custom Properties

## Features

### Current Features
- Responsive multi-page application with React Router
- Header with navigation between pages
- Hero section with mission and Newport information
- Latest news section with club updates
- **Mailing List System** - Subscribe forms on all pages with PostgreSQL database
- Separate pages: Home, Team, Schedule, Tickets, Community
- REST API for mailing list submissions
- Footer with social media links

### Future Phases
- Phase 2: Ticket sales system with payment integration
- Phase 3: Supporter login and membership features
- Phase 4: Enhanced features (live updates, video, merchandise)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (local or Railway)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run database migration
npm run migrate

# Run development servers (in separate terminals)
npm run dev          # Frontend on http://localhost:5173
npm run dev:server   # Backend on http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
ac-newport/
├── public/                # Static assets
│   └── logo.png          # AC Newport compass logo
├── src/                  # Frontend source
│   ├── components/       # React components
│   │   ├── Header/       # Navigation header
│   │   ├── Hero/         # Hero section
│   │   ├── News/         # News articles
│   │   ├── ComingSoon/   # Coming soon message
│   │   ├── MailingListForm/ # Mailing list subscription form
│   │   └── Footer/       # Footer
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page
│   │   ├── TeamPage.tsx
│   │   ├── SchedulePage.tsx
│   │   ├── TicketsPage.tsx
│   │   └── CommunityPage.tsx
│   ├── App.tsx           # Main app with routing
│   └── main.tsx          # Entry point
├── server/               # Backend source
│   ├── index.ts          # Express API server
│   ├── migrate.ts        # Database migration script
│   └── db-setup.sql      # Database schema
├── railway.json          # Railway deployment config
└── RAILWAY_SETUP.md      # Railway deployment guide
```

## Brand Colors

The design uses AC Newport's official color palette:

- **Navy Blue:** `#1a2847` - Primary brand color
- **White:** `#ffffff` - Secondary color
- **Red Accent:** `#c41e3a` - Call-to-action and highlights
- **Silver:** `#a8b2c1` - Accents and secondary text

## API Endpoints

- **POST /api/subscribe** - Subscribe to mailing list
- **GET /api/health** - Health check

See `server/index.ts` for implementation details.

## Deployment

### Railway

This project is configured for automatic deployment on Railway with PostgreSQL:

1. Add PostgreSQL database in Railway dashboard
2. Connect your GitHub repository to Railway
3. Railway auto-deploys from main branch
4. Run migration: `railway run npm run migrate`

For detailed setup instructions, see [RAILWAY_SETUP.md](./RAILWAY_SETUP.md).

**Required Environment Variables:**
- `DATABASE_URL` - Auto-set by Railway when you add PostgreSQL
- `NODE_ENV=production`
- `PORT` - Auto-set by Railway

## Development Guidelines

- All new components should be TypeScript (.tsx)
- Use CSS modules for component-specific styling
- Maintain mobile-first responsive design
- Keep accessibility in mind (semantic HTML, ARIA labels)
- Follow the existing component structure

## Contributing

This is a professional team website. For feature requests or bug reports, please contact the development team.

## License

© 2026 AC Newport. All rights reserved.
