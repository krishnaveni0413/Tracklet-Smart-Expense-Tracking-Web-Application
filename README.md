# Cloud Haiku - Intelligent Expense Tracker

## Overview

Cloud Haiku is a modern, minimal, and intelligent expense tracking web application with a calm, nature-inspired design. It combines poetic UI microcopy with AI-powered financial insights to help users track their spending habits mindfully.

### Key Features

- 🌤️ **Three Main Pages**: Flow (Daily Tracking), Haiku (Insights), Cloud (Settings)
- 💡 **AI-Powered Insights**: Smart observations and spending haikus
- 📊 **Rich Visualizations**: Pie charts, trend lines, and spending forecasts
- 🌙 **Light/Dark Mode**: Adaptive theming with system preferences
- 📱 **Mobile-First Design**: Fully responsive across all devices
- 🔒 **Secure Cloud Storage**: Encrypted data with cloud sync
- 🚀 **PWA Ready**: Offline-first support with service workers
- ♿ **Accessible**: WCAG 2.1 compliant with keyboard navigation

## Project Structure

```
expense_tracker/
├── frontend/                 # Next.js React application
│   ├── app/                  # App router pages
│   │   ├── page.tsx          # Home page
│   │   ├── flow/             # Daily tracking page
│   │   ├── haiku/            # Insights page
│   │   ├── cloud/            # Settings page
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   │   ├── Header.tsx
│   │   ├── TodaySummary.tsx
│   │   ├── QuickAddCard.tsx
│   │   ├── TransactionTimeline.tsx
│   │   ├── ExpensePieChart.tsx
│   │   ├── SpendingHaiku.tsx
│   │   ├── SpendingTrend.tsx
│   │   └── SmartObservations.tsx
│   ├── lib/
│   │   ├── theme.tsx         # Theme context
│   │   └── store.ts          # Zustand state management
│   ├── styles/
│   │   └── globals.css       # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── index.ts          # Server entry point
│   │   ├── db.ts             # Prisma connection
│   │   ├── auth.ts           # JWT authentication
│   │   └── ai.ts             # AI insights service
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── README.md
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **State Management**: Zustand with persistence
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Utilities**: clsx for className management

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcryptjs
- **AI Integration**: OpenAI API (optional)

### DevOps
- **Database**: PostgreSQL (local dev or cloud)
- **Deployment**: Vercel (frontend), Railway/Heroku (backend)
- **Container**: Docker support (optional)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 14+ (or use cloud provider)
- OpenAI API key (optional, for AI features)

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

3. **Set up database**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   API runs at `http://localhost:3001`

5. **View database UI**
   ```bash
   npm run prisma:studio
   ```

## Pages Overview

### 1. Flow Page (`/flow`)
**Purpose**: Quick daily money tracking

**Components**:
- `TodaySummary`: Today's spending metrics (spent, earned, remaining)
- `QuickAddCard`: Form to add expenses/income with auto-complete
- `TransactionTimeline`: Chronological list with edit/delete actions

**Features**:
- One-click expense entry
- Auto-suggest categories based on history
- Real-time summary updates
- Delete and edit transactions

### 2. Haiku Page (`/haiku`)
**Purpose**: Visualization and AI insights

**Components**:
- `SpendingHaiku`: AI-generated poetic summary of spending
- `ExpensePieChart`: Category breakdown visualization
- `SpendingTrend`: 7-day line chart of income vs expenses
- `SmartObservations`: Intelligent patterns and suggestions

**Features**:
- Interactive charts with hover tooltips
- Weekend spending alerts
- Subscription detection
- Predictive forecasts

### 3. Cloud Page (`/cloud`)
**Purpose**: Control and personalization

**Tabs**:
- **Budget & Goals**: Monthly budget setting and savings goals tracking
- **Preferences**: Currency, language, timezone, AI controls
- **Data Management**: Export CSV/PDF, cloud sync
- **Security**: App lock, sensitive amount hiding, reset data

**Features**:
- Granular privacy controls
- Multiple currency support
- Data export/import
- AI insights toggle

## Design System

### Color Palette
- **Primary**: Emerald (#10b981) - Growth, income, positive actions
- **Danger**: Rose (#f43f5e) - Expenses, warnings
- **Secondary**: Sky (#06b6d4) - Information, calm
- **Neutral**: Cloud (custom grays) - Light (#f1f5f9) to Dark (#0f172a)
- **Accent**: Amber (#f59e0b) - Warnings, highlights

### Typography
- **Fonts**: System fonts (Inter fallback)
- **Headings**: Semibold (600) for hierarchy
- **Body**: Regular (400) for readability
- **Small**: Reduced opacity for secondary text

### Spacing
- **Gap**: 4px increments (gap-1 to gap-8)
- **Padding**: 1rem base (p-4 to p-8)
- **Border Radius**: 12px (rounded-lg) to 32px (rounded-4xl)

### Shadows
- **Soft**: Light shadow for cards (shadow-soft)
- **Soft-lg**: Hover state amplification
- **Soft-xl**: Emphasis on modals/dialogs

## State Management

### Zustand Store (`lib/store.ts`)

**Global State**:
```typescript
{
  // Auth
  user: { id, email, name }
  
  // Expenses
  expenses: Expense[]
  
  // Budgets & Goals
  budgets: Budget[]
  goals: SavingsGoal[]
  
  // Settings
  settings: UserSettings
  
  // AI
  lastHaiku: string
}
```

**Features**:
- Persistent storage (localStorage)
- Type-safe actions
- Auto-syncing with backend (optional)

## Authentication Flow

1. User registers/logs in via email or Google OAuth
2. Backend generates JWT token
3. Token stored in localStorage
4. Sent in `Authorization: Bearer <token>` header
5. Protected routes verified via middleware

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Expenses
- `GET /api/expenses` - List all expenses
- `POST /api/expenses` - Create expense
- `PATCH /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Insights
- `GET /api/insights/haiku` - Generate AI haiku
- `GET /api/insights/observations` - Get smart observations
- `GET /api/insights/forecast` - Monthly forecast
- `GET /api/insights/summary` - Category breakdown

### Settings
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update settings
- `POST /api/data/export` - Export data
- `POST /api/data/import` - Import data

### Budgets
- `GET /api/budgets` - List budgets
- `POST /api/budgets` - Create budget
- `PATCH /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

## Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
npm run build
# Set DATABASE_URL, JWT_SECRET in environment
git push heroku main
```

## Environment Variables

### Frontend
```
NEXT_PUBLIC_API_URL=https://api.cloudhaiku.com
```

### Backend
```
DATABASE_URL=postgresql://user:pass@host:5432/cloud_haiku
JWT_SECRET=your-secret-key-min-32-chars
OPENAI_API_KEY=sk-...
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://cloudhaiku.com
```

## Features Roadmap

- ✅ Basic expense tracking
- ✅ Light/Dark mode
- ✅ Category management
- ⏳ AI haiku generation (OpenAI integration)
- ⏳ Push notifications
- ⏳ Receipt scanning (OCR)
- ⏳ Multi-user family budgets
- ⏳ Cryptocurrency tracking
- ⏳ Mobile app (React Native)
- ⏳ Advanced reporting (PDF export)

## Contributing

1. Clone repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: Report bugs and feature requests
- Email: support@cloudhaiku.com
- Discord: Join our community server

---

**Built with ☁️ and ✨ for mindful financial living**
