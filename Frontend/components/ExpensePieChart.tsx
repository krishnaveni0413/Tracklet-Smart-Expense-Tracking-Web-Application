'use client'

import { useStore } from '@/lib/store'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#10b981', '#f59e0b', '#f43f5e', '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

export function ExpensePieChart() {
  const expenses = useStore((state: any) => state.expenses)

  const expensesByCategory = expenses
    .filter((e: any) => e.type === 'expense')
    .reduce(
      (acc: any, e: any) => {
        const existing = acc.find((item: any) => item.name === e.category)
        if (existing) {
          existing.value += e.amount
        } else {
          acc.push({ name: e.category, value: e.amount })
        }
        return acc
      },
      [] as { name: string; value: number }[]
    )

  if (expensesByCategory.length === 0) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
        <p className="text-center text-cloud-500 dark:text-cloud-400 py-12">
          No expense data yet
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expensesByCategory}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {expensesByCategory.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${Number(value).toFixed(2)}`}
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
