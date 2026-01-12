'use client'

import { useTheme } from '@/lib/theme'
import { Moon, Sun } from 'lucide-react'
import { MobileNav } from './MobileNav'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-cloud-800/80 backdrop-blur-md border-b border-cloud-200 dark:border-cloud-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">💰</div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Tracklet
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/flow"
              className="text-sm font-medium text-cloud-600 dark:text-cloud-300 hover:text-cloud-900 dark:hover:text-cloud-50"
            >
              💳 Track Expenses
            </a>
            <a
              href="/haiku"
              className="text-sm font-medium text-cloud-600 dark:text-cloud-300 hover:text-cloud-900 dark:hover:text-cloud-50"
            >
              📊 Insights
            </a>
            <a
              href="/cloud"
              className="text-sm font-medium text-cloud-600 dark:text-cloud-300 hover:text-cloud-900 dark:hover:text-cloud-50"
            >
              ⚙️ Settings
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-cloud-100 dark:bg-cloud-700 hover:bg-cloud-200 dark:hover:bg-cloud-600"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-cloud-700" />
              )}
            </button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
