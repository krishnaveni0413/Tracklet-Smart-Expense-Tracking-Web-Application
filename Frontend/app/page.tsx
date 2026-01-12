export default function Home() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">💰</div>
      <h1 className="text-4xl font-semibold mb-2">Tracklet</h1>
      <p className="text-cloud-600 dark:text-cloud-400 mb-8">
        Track your expenses with mindful, poetic precision
      </p>
      <div className="flex gap-4 justify-center">
        <a href="/flow" className="btn-primary">
          Get Started
        </a>
        <a href="/haiku" className="btn-secondary">
          View Insights
        </a>
      </div>
    </div>
  )
}
