'use client'

import { useStore } from '@/lib/store'
import { format } from 'date-fns'
import { Trash2, Edit } from 'lucide-react'
import { useState } from 'react'

export function TransactionTimeline() {
  const expenses = useStore((state: any) => state.expenses)
  const deleteExpense = useStore((state: any) => state.deleteExpense)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sortedExpenses = [...expenses].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      <div className="space-y-3">
        {sortedExpenses.length === 0 ? (
          <p className="text-center text-cloud-500 dark:text-cloud-400 py-8">
            No transactions yet. Add one to get started!
          </p>
        ) : (
          sortedExpenses.map((expense: any) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 bg-cloud-50 dark:bg-cloud-700/50 rounded-lg hover:bg-cloud-100 dark:hover:bg-cloud-700 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {expense.type === 'expense' ? '💸' : '💰'}
                  </span>
                  <div>
                    <p className="font-medium">{expense.category}</p>
                    <p className="text-sm text-cloud-500 dark:text-cloud-400">
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className={`font-semibold text-lg ${
                      expense.type === 'expense'
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {expense.type === 'expense' ? '-' : '+'}$
                    {expense.amount.toFixed(2)}
                  </p>
                  {expense.note && (
                    <p className="text-xs text-cloud-500 dark:text-cloud-400">
                      {expense.note}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(expense.id)}
                    className="p-2 hover:bg-cloud-200 dark:hover:bg-cloud-600 rounded-lg transition-colors"
                  >
                    <Edit size={18} className="text-cloud-600 dark:text-cloud-300" />
                  </button>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                  >
                    <Trash2
                      size={18}
                      className="text-rose-600 dark:text-rose-400"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
