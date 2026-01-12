import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Middleware to attach prisma to request
declare global {
  namespace Express {
    interface Request {
      db: PrismaClient
      userId?: string
    }
  }
}

export function attachPrisma(req: any, res: any, next: any) {
  req.db = prisma
  next()
}

export default prisma
