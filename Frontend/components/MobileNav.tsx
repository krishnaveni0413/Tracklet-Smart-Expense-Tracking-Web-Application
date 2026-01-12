'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-cloud-100 dark:hover:bg-cloud-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-cloud-800 border-b border-cloud-200 dark:border-cloud-700 md:hidden">
          <nav className="flex flex-col p-4 space-y-2">
            <a
              href="/flow"
              className="px-4 py-2 rounded-lg hover:bg-cloud-100 dark:hover:bg-cloud-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              💳 Track Expenses
            </a>
            <a
              href="/haiku"
              className="px-4 py-2 rounded-lg hover:bg-cloud-100 dark:hover:bg-cloud-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              📊 Insights
            </a>
            <a
              href="/cloud"
              className="px-4 py-2 rounded-lg hover:bg-cloud-100 dark:hover:bg-cloud-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ⚙️ Settings
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
