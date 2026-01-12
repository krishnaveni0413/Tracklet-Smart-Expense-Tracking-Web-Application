import { SpendingHaiku } from '@/components/SpendingHaiku'
import { ExpensePieChart } from '@/components/ExpensePieChart'
import { SpendingTrend } from '@/components/SpendingTrend'
import { SmartObservations } from '@/components/SmartObservations'

export const metadata = {
  title: 'Insights - Tracklet',
  description: 'Visualization and AI insights',
}

export default function HaikuPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Your Financial Poetry</h1>
        <p className="text-cloud-600 dark:text-cloud-400">
          Insights woven from your spending patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingHaiku />
        <SmartObservations />
      </div>

      <ExpensePieChart />
      <SpendingTrend />
    </div>
  )
}
