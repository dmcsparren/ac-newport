# AC Newport Website

Official website for AC Newport professional soccer team, established 2026.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router
- **Hosting:** Railway
- **Styling:** CSS Modules with Custom Properties

## Features

### Phase 1 (Current - MVP)
- Responsive single-page application
- Header with sticky navigation
- Hero section with team branding
- Latest news section
- Match schedule display
- Footer with social links

### Future Phases
- Phase 2: Ticket sales system with payment integration
- Phase 3: Supporter login and membership features
- Phase 4: Enhanced features (live updates, video, merchandise)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will run on `http://localhost:3000`

## Project Structure

```
ac-newport/
├── public/              # Static assets
│   └── logo.png        # AC Newport compass logo
├── src/
│   ├── components/     # React components
│   │   ├── Header/    # Navigation header
│   │   ├── Hero/      # Hero section
│   │   ├── News/      # News articles
│   │   ├── Schedule/  # Match schedule
│   │   └── Footer/    # Footer
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles & theme
├── railway.json       # Railway deployment config
└── vite.config.ts     # Vite configuration
```

## Brand Colors

The design uses AC Newport's official color palette:

- **Navy Blue:** `#1a2847` - Primary brand color
- **White:** `#ffffff` - Secondary color
- **Red Accent:** `#c41e3a` - Call-to-action and highlights
- **Silver:** `#a8b2c1` - Accents and secondary text

## Deployment

### Railway

This project is configured for automatic deployment on Railway:

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the configuration
3. The app will build and deploy using the nixpacks.toml settings

Environment variables are not required for Phase 1.

### Manual Deploy

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Upload to any static hosting service
```

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

---

**Navigate Your Passion** | Est. 2026
