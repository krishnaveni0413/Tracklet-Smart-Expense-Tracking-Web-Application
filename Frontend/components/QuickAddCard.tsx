'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Plus } from 'lucide-react'

const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Health',
  'Bills',
  'Salary',
  'Freelance',
  'Other',
]

export function QuickAddCard() {
  const addExpense = useStore((state: any) => state.addExpense)
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    type: 'expense' as 'expense' | 'income',
    date: new Date().toISOString().split('T')[0],
    note: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount) return

    const expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: new Date(formData.date).toISOString(),
      note: formData.note,
      userId: 'user-1',
    }

    addExpense(expense)
    setFormData({
      amount: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      note: '',
    })
  }

  return (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Plus size={20} className="text-accent-emerald" />
        Quick Add
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="input-field"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="input-field"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({
                  ...formData,
                  type: (e.target.value as 'expense' | 'income'),
                })
              }
              className="input-field"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Note</label>
          <input
            type="text"
            placeholder="Add a note..."
            value={formData.note}
            onChange={(e) =>
              setFormData({ ...formData, note: e.target.value })
            }
            className="input-field"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full justify-center"
        >
          Add Transaction
        </button>
      </form>
    </div>
  )
}
