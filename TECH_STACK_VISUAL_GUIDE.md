# 🎨 Cloud Haiku - Visual Tech Stack Guide

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                    NEXT.JS 14 (SSR/SSG)
                              │
        ┌─────────────────────┴──────────────────────┐
        │                                             │
   FRONTEND                                     BACKEND
   ────────                                     ────────
   
┌──────────────────────┐              ┌──────────────────────┐
│   React 18           │              │   Express.js         │
│   ├─ Components      │              │   ├─ API Routes      │
│   ├─ Hooks           │              │   ├─ Middleware      │
│   └─ Context API     │              │   └─ Controllers     │
│                      │              │                      │
│   TypeScript         │              │   TypeScript         │
│   ├─ Type Safety     │              │   ├─ Type Safety     │
│   ├─ Interfaces      │              │   ├─ Contracts       │
│   └─ Enums           │              │   └─ Validation      │
│                      │              │                      │
│   Tailwind CSS       │              │   Prisma ORM         │
│   ├─ Utilities       │              │   ├─ Migrations      │
│   ├─ Dark Mode       │              │   ├─ Queries         │
│   └─ Responsive      │              │   └─ Validation      │
│                      │              │                      │
│   Zustand State      │              │   JWT Auth           │
│   ├─ Expenses        │              │   ├─ Tokens          │
│   ├─ Settings        │              │   ├─ Refresh         │
│   └─ Persistence     │              │   └─ Validation      │
│                      │              │                      │
│   Recharts           │              │   Jest Testing       │
│   ├─ Pie Charts      │              │   ├─ Unit Tests      │
│   ├─ Line Graphs     │              │   ├─ Integration     │
│   └─ Responsive      │              │   └─ Coverage        │
│                      │              │                      │
│   Axios              │              │   PostgreSQL         │
│   ├─ HTTP Requests   │──────────────│   ├─ Transactions    │
│   ├─ Interceptors    │              │   ├─ Constraints     │
│   └─ Error Handling  │              │   └─ Backups         │
│                      │              │                      │
│   Lucide Icons       │              │   Node.js            │
│   ├─ SVG Icons       │              │   ├─ Async/Await     │
│   ├─ 500+ Icons      │              │   ├─ Event Loop      │
│   └─ Tree-shakeable  │              │   └─ Streams         │
│                      │              │                      │
│   date-fns           │              │                      │
│   ├─ Date Format     │              │                      │
│   ├─ Parsing         │              │                      │
│   └─ Calculations    │              │                      │
└──────────────────────┘              └──────────────────────┘
        │                                     │
        └─────────────────┬───────────────────┘
                          │
                    REST API (/api/*)
                    ├─ Authentication
                    ├─ Expenses CRUD
                    ├─ Budgets CRUD
                    ├─ Goals Management
                    └─ Settings Update
                          │
        ┌─────────────────┴──────────────────┐
        │                                     │
    DATABASE                              STORAGE
    ────────                              ───────
    
┌──────────────────────┐         ┌──────────────────────┐
│   PostgreSQL         │         │   localStorage       │
│   ├─ Users           │         │   ├─ Theme pref      │
│   ├─ Expenses        │         │   ├─ Zustand store   │
│   ├─ Budgets         │         │   ├─ Session cache   │
│   ├─ Goals           │         │   └─ Offline data    │
│   ├─ Transactions    │         │                      │
│   └─ Audit Log       │         │   sessionStorage     │
│                      │         │   ├─ Temp data       │
│   14 Tables          │         │   ├─ Form state      │
│   ACID Compliance    │         │   └─ UI state        │
│   Full-text Search   │         │                      │
│   JSONB Support      │         │   Cookies            │
│                      │         │   ├─ Auth Token      │
│   Connection Pool    │         │   ├─ User ID         │
│   Automated Backups  │         │   └─ Preferences     │
│   Point-in-time      │         │                      │
│   Replication Ready  │         └──────────────────────┘
└──────────────────────┘
```

---

## 🔄 Data Flow Visualization

### Create Expense Flow:
```
┌─────────────────┐
│  User Input     │
│  (Form)         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Frontend Validation            │
│  ├─ Check required fields       │
│  ├─ Validate amounts            │
│  └─ Format date                 │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Optimistic UI Update           │
│  (Zustand State)                │
│  └─ Show data immediately       │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Axios POST /api/expenses       │
│  ├─ Include JWT token           │
│  ├─ Serialize to JSON           │
│  └─ Set timeout                 │
└────────┬────────────────────────┘
         │
         ▼ (Network)
         │
┌─────────────────────────────────┐
│  Express Route Handler          │
│  ├─ Validate token              │
│  ├─ Extract user ID             │
│  └─ Parse request body          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Backend Validation             │
│  ├─ Check all fields again      │
│  ├─ Verify user auth            │
│  ├─ Check budget limits         │
│  └─ Prevent duplicates          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Prisma Database Query          │
│  ├─ Generate SQL                │
│  ├─ Type-check parameters       │
│  └─ Execute transaction         │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  PostgreSQL Transaction         │
│  ├─ Lock rows                   │
│  ├─ Execute INSERT              │
│  ├─ Update ledger               │
│  └─ Commit (ACID)               │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Return JSON Response           │
│  ├─ New expense object          │
│  ├─ Updated totals              │
│  └─ 201 Created status          │
└────────┬────────────────────────┘
         │
         ▼ (Network)
         │
┌─────────────────────────────────┐
│  Frontend Receives Response      │
│  ├─ Check status code           │
│  ├─ Parse JSON                  │
│  └─ Update Zustand              │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  React Re-render                │
│  ├─ Update component tree       │
│  ├─ Show success message        │
│  └─ Clear form inputs           │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  localStorage Sync              │
│  ├─ Persist to disk             │
│  ├─ Available offline           │
│  └─ Sync on reconnect           │
└─────────────────────────────────┘
```

---

## 📚 Component Hierarchy

```
<RootLayout>
│
├─ <Header>
│  ├─ Cloud Haiku Logo
│  ├─ Navigation (Flow, Haiku, Cloud)
│  ├─ Theme Toggle (Light/Dark)
│  └─ Mobile Menu
│
└─ <main>
   │
   ├─ Route: /flow
   │  ├─ <TodaySummary>
   │  │  ├─ Income Total
   │  │  ├─ Expense Total
   │  │  └─ Net Balance
   │  │
   │  ├─ <QuickAddCard>
   │  │  ├─ Amount Input
   │  │  ├─ Category Select
   │  │  ├─ Date Picker
   │  │  └─ Add Button
   │  │
   │  └─ <TransactionTimeline>
   │     ├─ List of Expenses
   │     ├─ Edit/Delete Buttons
   │     └─ Grouping by Date
   │
   ├─ Route: /haiku
   │  ├─ <SpendingHaiku>
   │  │  ├─ AI Generated Poem
   │  │  └─ Insights Text
   │  │
   │  ├─ <ExpensePieChart>
   │  │  ├─ Category Breakdown
   │  │  ├─ Percentage Labels
   │  │  └─ Legend
   │  │
   │  ├─ <SpendingTrend>
   │  │  ├─ 7-Day Line Chart
   │  │  ├─ Trend Line
   │  │  └─ Tooltips
   │  │
   │  └─ <SmartObservations>
   │     ├─ Budget Alerts
   │     ├─ Spending Patterns
   │     └─ Recommendations
   │
   └─ Route: /cloud
      ├─ <Tabs>
      │
      ├─ Budget Tab
      │  ├─ Monthly Budget Input
      │  └─ Savings Goals
      │
      ├─ Preferences Tab
      │  ├─ Currency Select
      │  ├─ Language Select
      │  ├─ Timezone Select
      │  └─ AI Insights Toggle
      │
      ├─ Data Management Tab
      │  ├─ Export CSV Button
      │  ├─ Export PDF Button
      │  └─ Cloud Sync Button
      │
      └─ Security Tab
         ├─ App Lock Toggle
         ├─ Hide Amounts Toggle
         └─ Reset Data Button
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────┐
│ Layer 1: HTTPS/TLS Encryption                       │
│ All traffic encrypted in transit                    │
└─────────────────────────────────────────────────────┘
                      │
┌─────────────────────┴──────────────────────┐
│ Layer 2: CORS & Origin Validation          │
│ Only allow requests from trusted origins   │
└─────────────────────┬──────────────────────┘
                      │
┌─────────────────────┴──────────────────────┐
│ Layer 3: JWT Authentication                │
│ ├─ Token validation                        │
│ ├─ Signature verification                  │
│ ├─ Expiration check                        │
│ └─ User ID extraction                      │
└─────────────────────┬──────────────────────┘
                      │
┌─────────────────────┴──────────────────────┐
│ Layer 4: Input Validation                  │
│ ├─ Type checking                           │
│ ├─ Range validation                        │
│ ├─ Format verification                     │
│ └─ SQL injection prevention                │
└─────────────────────┬──────────────────────┘
                      │
┌─────────────────────┴──────────────────────┐
│ Layer 5: Authorization                     │
│ ├─ User ownership check                    │
│ ├─ Permission verification                 │
│ ├─ Role-based access control               │
│ └─ Resource ownership                      │
└─────────────────────┬──────────────────────┘
                      │
┌─────────────────────┴──────────────────────┐
│ Layer 6: Database Security                 │
│ ├─ Parameterized queries (SQL injection)   │
│ ├─ Transaction locks (race conditions)     │
│ ├─ Row-level security (PostgreSQL RLS)     │
│ └─ Audit logging (all changes)             │
└─────────────────────┬──────────────────────┘
                      │
┌─────────────────────┴──────────────────────┐
│ Layer 7: Rate Limiting                     │
│ ├─ API endpoint throttling                 │
│ ├─ Login attempt limits                    │
│ ├─ Brute force protection                  │
│ └─ DDoS mitigation                         │
└─────────────────────────────────────────────┘
```

---

## 📊 Database Schema

```
USERS
├─ id (UUID, PK)
├─ email (String, UNIQUE)
├─ passwordHash (String, bcrypted)
├─ name (String)
├─ createdAt (DateTime)
├─ updatedAt (DateTime)
└─ deletedAt (DateTime, nullable)

EXPENSES (Transactions)
├─ id (UUID, PK)
├─ userId (UUID, FK → USERS)
├─ amount (Decimal)
├─ category (Enum: food, transport, etc.)
├─ type (Enum: expense, income)
├─ note (String)
├─ date (DateTime)
├─ createdAt (DateTime)
├─ updatedAt (DateTime)
├─ Index on userId + date
└─ Index on category

BUDGETS
├─ id (UUID, PK)
├─ userId (UUID, FK → USERS)
├─ category (String)
├─ limit (Decimal)
├─ month (Int, 1-12)
├─ year (Int)
├─ createdAt (DateTime)
├─ updatedAt (DateTime)
└─ Unique(userId, category, month, year)

SAVINGS_GOALS
├─ id (UUID, PK)
├─ userId (UUID, FK → USERS)
├─ name (String)
├─ targetAmount (Decimal)
├─ currentAmount (Decimal)
├─ deadline (DateTime)
├─ status (Enum: active, completed)
├─ createdAt (DateTime)
├─ updatedAt (DateTime)
└─ Index on userId

AUDIT_LOG
├─ id (UUID, PK)
├─ userId (UUID, FK → USERS)
├─ action (String)
├─ table (String)
├─ recordId (String)
├─ oldValues (JSONB)
├─ newValues (JSONB)
├─ ipAddress (String)
├─ userAgent (String)
├─ createdAt (DateTime)
└─ Index on userId + createdAt
```

---

## 🎯 Frontend State Tree

```
ZUSTAND STORE
│
├─ AUTH STATE
│  ├─ user: { id, email, name }
│  └─ setUser(user)
│
├─ EXPENSE STATE
│  ├─ expenses: Expense[]
│  ├─ addExpense(expense)
│  ├─ updateExpense(id, data)
│  └─ deleteExpense(id)
│
├─ BUDGET STATE
│  ├─ budgets: Budget[]
│  └─ setBudgets(budgets)
│
├─ GOALS STATE
│  ├─ goals: SavingsGoal[]
│  └─ setGoals(goals)
│
├─ SETTINGS STATE
│  ├─ currency: string
│  ├─ language: string
│  ├─ theme: 'light' | 'dark' | 'system'
│  ├─ monthlyBudget: number
│  ├─ aiInsights: boolean
│  ├─ appLock: boolean
│  ├─ hideSensitiveAmounts: boolean
│  ├─ timezone: string
│  └─ updateSettings(partial)
│
└─ AI STATE
   ├─ lastHaiku: string | null
   └─ setLastHaiku(haiku)
```

---

## 🚀 Deployment Pipeline

```
┌─────────────┐
│ Code Push   │
│ to GitHub   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ GitHub Actions CI   │
├─ Lint (ESLint)      │
├─ Type Check (TSC)   │
├─ Test (Jest)        │
└──────┬──────────────┘
       │
       ▼
    ✅ All Pass?
       │
   Yes│  No
    │ └─→ Fail & Comment on PR
    │
    ▼
┌─────────────────────┐
│ Build Stage         │
├─ Next.js Build      │
├─ Bundle Analysis    │
├─ Asset Optimization │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────────┐
│ Frontend Deploy (Vercel) │
├─ Upload to CDN          │
├─ Assign domain          │
├─ SSL certificate        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Backend Deploy (Railway) │
├─ Build Docker image     │
├─ Push to registry       │
├─ Deploy container       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Database Migration       │
├─ Run pending migrations │
├─ Seed data (if needed)  │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Health Checks            │
├─ Ping API endpoints      │
├─ Check DB connection     │
├─ Verify connectivity     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Production Live!         │
├─ Monitor errors         │
├─ Track performance      │
└──────────────────────────┘
```

---

## 💾 Data Persistence Strategy

```
┌─────────────────────────────────────┐
│ Session (Current)                   │
├─ React State (Memory)               │
│  └─ Cleared on page reload          │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│ Client-Side Persistence (Fast)      │
├─ localStorage (Zustand)             │
│  ├─ Expenses                        │
│  ├─ Settings                        │
│  ├─ Theme preference                │
│  └─ Persists until app uninstalled  │
│                                     │
├─ sessionStorage                     │
│  ├─ Temporary form data             │
│  ├─ UI state                        │
│  └─ Cleared on tab close            │
│                                     │
├─ Cookies                            │
│  ├─ Auth tokens (HttpOnly)          │
│  ├─ User preferences                │
│  └─ Sent with every request         │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│ Server-Side Session (Secure)        │
├─ JWT Token (Stateless)              │
│  ├─ Contains user ID                │
│  ├─ Cryptographically signed        │
│  ├─ Expires in 24 hours             │
│  └─ Refresh token for new token     │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│ Database (Persistent)               │
├─ PostgreSQL                         │
│  ├─ User data                       │
│  ├─ All transactions                │
│  ├─ Budgets & goals                 │
│  ├─ Audit logs                      │
│  ├─ ACID transactions               │
│  ├─ Atomic writes                   │
│  └─ Consistent state                │
│                                     │
├─ Backups                            │
│  ├─ Daily automated snapshots       │
│  ├─ Point-in-time recovery          │
│  ├─ Multi-region redundancy         │
│  └─ 30-day retention                │
│                                     │
└─ Archive (Long-term)                │
   ├─ Cold storage (AWS S3)           │
   ├─ Annual data snapshots           │
   ├─ Compliance & audit              │
   └─ 7-year retention                │
└─────────────────────────────────────┘
```

---

## 📈 Performance Optimization

```
REQUEST OPTIMIZATION
├─ Code Splitting
│  ├─ Automatic by route
│  ├─ Only load needed JS
│  └─ Faster initial load
├─ Image Optimization
│  ├─ WebP format
│  ├─ Responsive sizes
│  └─ Lazy loading
└─ CSS Optimization
   ├─ Tailwind purging
   ├─ Only used classes
   └─ ~50KB gzipped

RENDERING OPTIMIZATION
├─ React Memoization
│  ├─ Prevent unnecessary renders
│  ├─ useMemo for expensive calcs
│  └─ useCallback for closures
├─ Virtual Scrolling
│  ├─ Only render visible items
│  ├─ Large lists stay fast
│  └─ Memory efficient
└─ Debouncing/Throttling
   ├─ Reduce event handlers
   ├─ Form input debouncing
   └─ Resize debouncing

DATABASE OPTIMIZATION
├─ Query Optimization
│  ├─ Proper indexes
│  ├─ Only select needed fields
│  └─ Batch operations
├─ Connection Pooling
│  ├─ Reuse connections
│  ├─ Reduce overhead
│  └─ Handle concurrency
└─ Caching
   ├─ Redis for hot data
   ├─ Query result caching
   └─ User session cache

NETWORK OPTIMIZATION
├─ CDN
│  ├─ Global edge locations
│  ├─ Static file delivery
│  └─ Fast worldwide access
├─ HTTP/2
│  ├─ Multiplexing
│  ├─ Server push
│  └─ Binary framing
└─ Compression
   ├─ Gzip responses
   ├─ Smaller payloads
   └─ Faster downloads
```

---

## 🎓 Technology Decision Matrix

| Technology | Problem Solved | Why Best? | Alternatives |
|-----------|----------------|----------|--------------|
| Next.js | SSR + Client rendering | Full-stack framework, optimal SEO | Gatsby, Remix |
| React | UI rendering | Component ecosystem | Vue, Angular |
| TypeScript | Type safety | Catches errors early | Flow, JSDoc |
| Tailwind | Rapid styling | Utility-first, small bundles | Styled, CSS Modules |
| Zustand | State management | Minimal API, persistence | Redux, MobX |
| Recharts | Data visualization | React-native charts | Chart.js, D3 |
| Express | API server | Minimal, flexible | Fastify, Koa |
| Prisma | Database ORM | Type-safe queries | TypeORM, Sequelize |
| PostgreSQL | Data storage | ACID, reliability | MongoDB, MySQL |
| Jest | Testing | Zero-config, powerful | Mocha, Vitest |
| JWT | Authentication | Stateless, scalable | Sessions, OAuth |

---

## ✨ Why This Stack?

### ✅ Developer Experience
- **TypeScript** everywhere = consistent DX
- **Hot reload** = fast feedback loop
- **Documentation** = all tools well-documented
- **Community** = huge ecosystem support

### ✅ Performance
- **Next.js optimization** = automatic code splitting
- **Tailwind** = minimal CSS
- **Zustand** = small state library
- **PostgreSQL** = efficient queries

### ✅ Scalability
- **Stateless** = easy horizontal scaling
- **Database indexes** = fast queries at scale
- **CDN** = global content delivery
- **Microservice ready** = can split services

### ✅ Security
- **TypeScript** = type safety
- **Prisma** = parameterized queries
- **JWT** = stateless auth
- **HTTPS** = encrypted transport

### ✅ Cost Efficiency
- **Open source** = free tools
- **Vercel** = generous free tier
- **PostgreSQL** = free database
- **No vendor lock-in** = can migrate anywhere

---

**Created**: January 2026  
**Status**: Production Ready ✅  
**Maintained By**: Cloud Haiku Team
