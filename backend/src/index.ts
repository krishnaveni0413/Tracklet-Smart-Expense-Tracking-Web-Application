import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config()

// Initialize Prisma
const prisma = new PrismaClient()

// Create Express app
const app: Express = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// Error handling middleware
interface CustomError extends Error {
  status?: number
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Tracklet API is running' })
})

// Placeholder routes - will be expanded
app.post('/api/auth/register', async (req: Request, res: Response) => {
  // Authentication logic here
  res.json({ message: 'Register endpoint' })
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
  // Login logic here
  res.json({ message: 'Login endpoint' })
})

app.get('/api/expenses', async (req: Request, res: Response) => {
  // Get expenses logic here
  res.json({ message: 'Get expenses endpoint' })
})

app.post('/api/expenses', async (req: Request, res: Response) => {
  // Create expense logic here
  res.json({ message: 'Create expense endpoint' })
})

app.get('/api/insights/haiku', async (req: Request, res: Response) => {
  // Generate AI haiku logic here
  res.json({ haiku: 'Coins flow like water, wisdom guides your spending way, balance brings the peace' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Tracklet API running on http://localhost:${PORT}`)
  console.log(`📊 Prisma connected to ${process.env.DATABASE_URL}`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
