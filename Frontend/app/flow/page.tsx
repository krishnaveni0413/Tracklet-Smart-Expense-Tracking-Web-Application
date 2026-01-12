import { TodaySummary } from '@/components/TodaySummary'
import { QuickAddCard } from '@/components/QuickAddCard'
import { TransactionTimeline } from '@/components/TransactionTimeline'
import { ReceiptScanner } from '@/components/ReceiptScanner'

export const metadata = {
  title: 'Track Expenses - Tracklet',
  description: 'Quick daily money tracking',
}

export default function FlowPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">Tracklet</span>
        </h1>
        <p className="text-cloud-600 dark:text-cloud-400">
          Track your daily flows with mindful precision
        </p>
      </div>

      <TodaySummary />
      <ReceiptScanner />
      <QuickAddCard />
      <TransactionTimeline />
    </div>
  )
}
