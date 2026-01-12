import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/theme'
import { Header } from '@/components/Header'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Tracklet - Smart Expense Tracker',
  description:
    'A modern, minimal expense tracking app with AI insights and real-time tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen bg-gradient-to-br from-cloud-50 to-cloud-100 dark:from-cloud-900 dark:to-cloud-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
