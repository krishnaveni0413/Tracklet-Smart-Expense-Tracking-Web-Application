'use client'

import { useStore } from '@/lib/store'
import { format } from 'date-fns'

export function TodaySummary() {
  const expenses = useStore((state: any) => state.expenses)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayTransactions = expenses.filter((e: any) => {
    const eDate = new Date(e.date)
    eDate.setHours(0, 0, 0, 0)
    return eDate.getTime() === today.getTime()
  })

  const totalSpent = todayTransactions
    .filter((e: any) => e.type === 'expense')
    .reduce((sum: number, e: any) => sum + e.amount, 0)

  const totalEarned = todayTransactions
    .filter((e: any) => e.type === 'income')
    .reduce((sum: number, e: any) => sum + e.amount, 0)

  const remaining = totalEarned - totalSpent

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="card">
        <p className="text-sm text-cloud-600 dark:text-cloud-400 mb-1">
          Today's Spent
        </p>
        <p className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
          ${totalSpent.toFixed(2)}
        </p>
      </div>

      <div className="card">
        <p className="text-sm text-cloud-600 dark:text-cloud-400 mb-1">
          Today's Earned
        </p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
          ${totalEarned.toFixed(2)}
        </p>
      </div>

      <div className="card">
        <p className="text-sm text-cloud-600 dark:text-cloud-400 mb-1">
          Remaining
        </p>
        <p
          className={`text-2xl font-semibold ${
            remaining >= 0
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          ${remaining.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
