'use client'

import { useStore } from '@/lib/store'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { format, subDays, startOfDay } from 'date-fns'

export function SpendingTrend() {
  const expenses = useStore((state: any) => state.expenses)

  const last7Days = Array.from({ length: 7 }, (_: any, i: number) => {
    const date = subDays(new Date(), 6 - i)
    date.setHours(0, 0, 0, 0)
    return date
  })

  const data = last7Days.map((date: any) => {
    const dayExpenses = expenses
      .filter((e: any) => {
        const eDate = new Date(e.date)
        eDate.setHours(0, 0, 0, 0)
        return eDate.getTime() === date.getTime()
      })
      .reduce((acc: any, e: any) => {
        if (e.type === 'expense') {
          acc.spent += e.amount
        } else {
          acc.earned += e.amount
        }
        return acc
      }, { spent: 0, earned: 0 })

    return {
      date: format(date, 'MMM dd'),
      spent: dayExpenses.spent,
      earned: dayExpenses.earned,
    }
  })

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Spending Trend (7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            formatter={(value: number) => `$${Number(value).toFixed(2)}`}
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="spent"
            stroke="#f43f5e"
            strokeWidth={2}
            dot={{ fill: '#f43f5e' }}
            name="Spent"
          />
          <Line
            type="monotone"
            dataKey="earned"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981' }}
            name="Earned"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
