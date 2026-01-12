'use client'

import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export function SmartObservations() {
  const expenses = useStore((state: any) => state.expenses)
  const settings = useStore((state: any) => state.settings)
  const [observations, setObservations] = useState<string[]>([])

  useEffect(() => {
    const obs: string[] = []

    if (expenses.length === 0) {
      setObservations(['✨ Start tracking your expenses to get personalized insights!'])
      return
    }

    // Calculate totals
    const totalSpent = expenses
      .filter((e: any) => e.type === 'expense')
      .reduce((sum: number, e: any) => sum + e.amount, 0)

    const totalEarned = expenses
      .filter((e: any) => e.type === 'income')
      .reduce((sum: number, e: any) => sum + e.amount, 0)

    // Check budget status
    if (totalSpent > settings.monthlyBudget) {
      obs.push(`🚨 You've exceeded your monthly budget (₹${settings.monthlyBudget.toFixed(2)})! Current spending: ₹${totalSpent.toFixed(2)}`)
    } else if (totalSpent > settings.monthlyBudget * 0.8) {
      obs.push(`⚠️ You're at 80% of your monthly budget (₹${settings.monthlyBudget.toFixed(2)}). Be mindful of remaining spending!`)
    }

    // Check balance
    const balance = totalEarned - totalSpent
    if (balance < 0) {
      obs.push(`💔 You're spending more than you earn! Deficit: ₹${Math.abs(balance).toFixed(2)}`)
    } else if (balance > 0) {
      obs.push(`💰 Great job! You have a surplus of ₹${balance.toFixed(2)}`)
    }

    // Check weekend spending
    const weekendExpenses = expenses.filter((e: any) => {
      const day = new Date(e.date).getDay()
      return (day === 0 || day === 6) && e.type === 'expense'
    })

    if (weekendExpenses.length > 5) {
      obs.push('☀️ You tend to spend more on weekends. Consider setting weekend budgets for better control.')
    }

    // Check categories
    const categories: { [key: string]: number } = {}
    expenses.forEach((e: any) => {
      if (e.type === 'expense') {
        categories[e.category] = (categories[e.category] || 0) + e.amount
      }
    })

    const topCategory = Object.entries(categories).sort(([, a], [, b]) => b - a)[0]
    if (topCategory) {
      obs.push(`📊 Your top spending category is ${topCategory[0]} (₹${topCategory[1].toFixed(2)})`)
    }

    // Check for subscriptions
    const avgDaily = totalSpent / Math.max(expenses.length, 1)
    if (avgDaily > 100) {
      obs.push(`💡 Your daily average is ₹${avgDaily.toFixed(2)}. A gentle reminder to check for unnecessary subscriptions.`)
    }

    // Check income vs expense ratio
    if (totalEarned > 0 && totalSpent / totalEarned > 0.7) {
      obs.push('🎯 You\'re spending 70%+ of your income. Consider saving more for emergencies.')
    }

    setObservations(obs.length > 0 ? obs : ['✨ Your spending looks balanced! Keep it up!'])
  }, [expenses, settings])

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-2">Smart Observations</h2>
      <p className="text-xs text-cloud-600 dark:text-cloud-400 mb-4">
        📌 Personalized insights based on your spending patterns
      </p>
      <div className="space-y-3">
        {observations.map((obs: string, i: number) => (
          <div
            key={i}
            className="p-3 bg-cloud-50 dark:bg-cloud-700/50 rounded-lg border-l-4 border-accent-emerald hover:bg-cloud-100 dark:hover:bg-cloud-700 transition-colors"
          >
            <p className="text-sm text-cloud-700 dark:text-cloud-300">{obs}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
