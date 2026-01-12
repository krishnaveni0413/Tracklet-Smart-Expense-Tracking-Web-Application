'use client'

import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'

const HAIKU_TEMPLATES = [
  (spent: number, earned: number) => `Markets overflow,\nYour choices write tomorrow,\nLess becomes the path.`,
  (spent: number, earned: number) => `Money flows like water,\nQuiet today's spending stream,\nBalance finds the way.`,
  (spent: number, earned: number) => `Cloud brings gentle rain,\nYour coins dance with the seasons,\nWisdom in the flow.`,
  (spent: number, earned: number) => `${spent > 100 ? 'Large' : 'Small'} coins whisper soft,\nYour choices echo forward,\nWealth grows from within.`,
  (spent: number, earned: number) => `Budget like bamboo,\nBending gently with the wind,\nRoots hold you steady.`,
  (spent: number, earned: number) => `Seasons change your needs,\nExpenses wax and wane free,\nBalance finds the peak.`,
]

export function SpendingHaiku() {
  const expenses = useStore((state: any) => state.expenses)
  const [haiku, setHaiku] = useState<string>('')

  useEffect(() => {
    // Calculate spending metrics
    const totalSpent = expenses
      .filter((e: any) => e.type === 'expense')
      .reduce((sum: number, e: any) => sum + e.amount, 0)

    const totalEarned = expenses
      .filter((e: any) => e.type === 'income')
      .reduce((sum: number, e: any) => sum + e.amount, 0)

    // Generate haiku based on actual data
    const random = Math.floor(Math.random() * HAIKU_TEMPLATES.length)
    const generatedHaiku = HAIKU_TEMPLATES[random](totalSpent, totalEarned)
    setHaiku(generatedHaiku)
  }, [expenses])

  return (
    <div className="card bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20">
      <h2 className="text-lg font-semibold mb-4">Your Spending Haiku</h2>
      <div className="text-center space-y-3">
        {haiku.split('\n').map((line: string, i: number) => (
          <p key={i} className="text-base text-cloud-700 dark:text-cloud-300 font-light italic leading-relaxed">
            {line}
          </p>
        ))}
      </div>
      <p className="text-xs text-cloud-500 dark:text-cloud-400 text-center mt-4">
        ✨ AI-crafted from your patterns
      </p>
      
      <div className="mt-4 pt-4 border-t border-sky-200 dark:border-sky-700">
        <p className="text-xs text-center text-cloud-600 dark:text-cloud-400">
          💭 <strong>Why haiku?</strong> Traditional Japanese poetry that captures financial wisdom. Each haiku reflects your spending journey in three lines of mindfulness.
        </p>
      </div>
    </div>
  )
}
