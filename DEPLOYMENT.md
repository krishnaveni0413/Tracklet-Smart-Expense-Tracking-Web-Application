# Deployment Guide

## Frontend Deployment (Vercel)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial Cloud Haiku commit"
git branch -M main
git remote add origin https://github.com/yourusername/cloud-haiku.git
git push -u origin main
```

### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### 3. Set Environment Variables
In Vercel Dashboard:
- `NEXT_PUBLIC_API_URL` = Your backend API URL

## Backend Deployment (Railway)

### 1. Create Railway Project
- Visit https://railway.app
- Create new project from GitHub

### 2. Add PostgreSQL Database
- Click "Create" → "Database" → "PostgreSQL"
- Get DATABASE_URL from plugin settings

### 3. Set Environment Variables
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
```

### 4. Deploy
- Railway auto-deploys on git push

## Database Migration

### Initial Setup
```bash
cd backend
npm run prisma:migrate -- --name init
npm run prisma:generate
```

### Update Schema
```bash
# Update schema.prisma
npm run prisma:migrate -- --name "description of change"
```

## Scaling Considerations

### Database
- Use connection pooling (PgBouncer)
- Index frequently queried fields
- Archive old transactions yearly

### Backend
- Add Redis for caching
- Implement rate limiting
- Use CDN for static files

### Frontend
- Enable image optimization
- Implement service worker
- Use dynamic imports for large charts

## Security Checklist

- [ ] JWT secret is strong (32+ characters)
- [ ] Database credentials stored in env vars
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS protection (Next.js built-in)
- [ ] HTTPS enforced
- [ ] Sensitive data encrypted
- [ ] Regular security audits

## Monitoring & Logging

### Backend Monitoring
- Use Sentry for error tracking
- Enable query logging
- Set up health check endpoint

### Frontend Monitoring
- Use Vercel Analytics
- Implement error boundaries
- Track user interactions

## Backup Strategy

- Daily automated database backups
- Test restore procedure monthly
- Keep 30-day backup retention
- Store backups in separate region
