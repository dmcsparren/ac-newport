# AC Newport - Quick Setup Guide

## 🚀 Getting Started

### 1. Add Your Logo
Copy your AC Newport compass logo to the public folder:
```bash
cp /path/to/your/logo.png public/logo.png
```

The logo should be the compass design image you provided.

### 2. Install Dependencies
```bash
npm install
```

This will install:
- React 18
- TypeScript
- Vite
- React Router
- ESLint and related tools

### 3. Run Development Server
```bash
npm run dev
```

The site will be available at: `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 5. Preview Production Build
```bash
npm run preview
```

Test the production build locally before deploying.

---

## 📦 Railway Deployment

### First-Time Setup

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your ac-newport repository

3. **Configure (Automatic)**
   - Railway will detect `railway.json` and `nixpacks.toml`
   - Build will start automatically
   - No environment variables needed for Phase 1

4. **Get Your URL**
   - Railway will provide a public URL
   - Custom domain can be added in settings

### Automatic Deployments

Once connected, every push to your main branch will:
1. Trigger a new build
2. Run TypeScript compilation
3. Build with Vite
4. Deploy automatically

---

## 🛠 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📁 Project Structure Overview

```
src/
├── components/       # All React components
│   ├── Header/      # Sticky navigation with mobile menu
│   ├── Hero/        # Homepage hero section with logo
│   ├── News/        # News articles grid
│   ├── Schedule/    # Match schedule cards
│   └── Footer/      # Footer with links
├── App.tsx          # Main app component
├── main.tsx         # React entry point
└── index.css        # Global styles & AC Newport color theme
```

---

## 🎨 Customizing Content

### Update News Articles
Edit `src/components/News/News.tsx`:
```typescript
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Your News Title',
    date: 'February 10, 2026',
    excerpt: 'Your news excerpt...',
    category: 'Club News'
  },
  // Add more articles
]
```

### Update Match Schedule
Edit `src/components/Schedule/Schedule.tsx`:
```typescript
const upcomingMatches: Match[] = [
  {
    id: 1,
    date: 'March 15, 2026',
    time: '7:00 PM',
    opponent: 'Opponent Name',
    location: 'Home', // or 'Away'
    competition: 'League'
  },
  // Add more matches
]
```

### Modify Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --navy-blue: #1a2847;
  --red-accent: #c41e3a;
  --silver: #a8b2c1;
}
```

---

## ✅ Phase 1 Features Included

- ✅ Responsive header with sticky navigation
- ✅ Mobile hamburger menu
- ✅ Hero section with floating logo animation
- ✅ News articles grid (3 sample articles)
- ✅ Match schedule cards (3 upcoming matches)
- ✅ Footer with social links
- ✅ AC Newport brand colors throughout
- ✅ Mobile-first responsive design
- ✅ TypeScript type safety
- ✅ Railway deployment ready

---

## 🔮 Future Phases (Roadmap)

### Phase 2: Ticket Sales
- User authentication
- Ticket purchasing system
- Payment gateway integration
- Digital ticket delivery

### Phase 3: Supporter Accounts
- Member profiles
- Loyalty programs
- Exclusive content
- Order history

### Phase 4: Enhanced Features
- Live match updates
- Video highlights
- Online merchandise shop
- Mobile app

---

## 📝 Notes

- The project uses Vite for lightning-fast development
- TypeScript provides type safety and better DX
- All components are responsive by default
- The Railway configuration is already set up
- No environment variables needed for Phase 1

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npm run build
# Fix any type errors that appear
```

---

## 📞 Support

For questions about the codebase, refer to:
- `README.md` - Project overview
- `AC_Newport_Project_Plan.md` - Full project plan and phases

---

**Navigate Your Passion** | AC Newport Est. 2026
