'use client'

import { useStore } from '@/lib/store'
import { useState } from 'react'
import { Settings, Lock, Download, RefreshCw } from 'lucide-react'

export default function CloudPage() {
  const settings = useStore((state) => state.settings)
  const updateSettings = useStore((state) => state.updateSettings)
  const expenses = useStore((state) => state.expenses)
  const goals = useStore((state) => state.goals || [])
  const addGoal = useStore((state) => state.addGoal)
  const updateGoal = useStore((state) => state.updateGoal)
  const deleteGoal = useStore((state) => state.deleteGoal)
  
  const [activeTab, setActiveTab] = useState('budget')
  const [exportMessage, setExportMessage] = useState<string | null>(null)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [goalName, setGoalName] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null)

  // Export functions
  const handleExportCSV = () => {
    if (expenses.length === 0) {
      setExportMessage('No transactions to export')
      setTimeout(() => setExportMessage(null), 3000)
      return
    }

    const headers = ['Date', 'Amount', 'Category', 'Type', 'Note']
    const rows = expenses.map((e) => [
      new Date(e.date).toLocaleDateString(),
      e.amount,
      e.category,
      e.type,
      e.note,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tracklet-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setExportMessage('Data exported successfully!')
    setTimeout(() => setExportMessage(null), 3000)
  }

  const handleExportPDF = () => {
    if (expenses.length === 0) {
      setExportMessage('No transactions to export')
      setTimeout(() => setExportMessage(null), 3000)
      return
    }

    const totalIncome = expenses
      .filter((e) => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0)
    const totalExpense = expenses
      .filter((e) => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0)

    let pdfContent = `TRACKLET - EXPENSE REPORT\n`
    pdfContent += `Generated: ${new Date().toLocaleString()}\n`
    pdfContent += `Currency: ${settings.currency}\n\n`
    pdfContent += `SUMMARY\n`
    pdfContent += `Total Income: ${settings.currency} ${totalIncome.toFixed(2)}\n`
    pdfContent += `Total Expenses: ${settings.currency} ${totalExpense.toFixed(2)}\n`
    pdfContent += `Net: ${settings.currency} ${(totalIncome - totalExpense).toFixed(2)}\n\n`
    pdfContent += `TRANSACTIONS\n`
    pdfContent += expenses
      .map(
        (e) =>
          `${new Date(e.date).toLocaleDateString()} | ${e.category} | ${e.type} | ${settings.currency} ${e.amount}`
      )
      .join('\n')

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tracklet-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setExportMessage('Report exported successfully!')
    setTimeout(() => setExportMessage(null), 3000)
  }

  const handleSyncCloud = () => {
    setExportMessage('Cloud sync initiated (mock)')
    setTimeout(() => setExportMessage(null), 3000)
  }

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure? This will permanently delete all your data. This action cannot be undone.'
      )
    ) {
      setExportMessage('Data reset initiated (mock)')
      setTimeout(() => setExportMessage(null), 3000)
    }
  }

  const handleAddGoal = () => {
    setEditingGoalId(null)
    setGoalName('')
    setGoalAmount('')
    setShowGoalModal(true)
  }

  const handleEditGoal = (goal: any) => {
    setEditingGoalId(goal.id)
    setGoalName(goal.name)
    setGoalAmount(goal.targetAmount.toString())
    setShowGoalModal(true)
  }

  const handleDeleteGoal = (id: string) => {
    if (window.confirm('Delete this goal?')) {
      deleteGoal(id)
      setExportMessage('Goal deleted successfully')
      setTimeout(() => setExportMessage(null), 3000)
    }
  }

  const handleSaveGoal = () => {
    if (!goalName.trim() || !goalAmount || parseFloat(goalAmount) <= 0) {
      setExportMessage('Please fill in all fields correctly')
      setTimeout(() => setExportMessage(null), 3000)
      return
    }

    if (editingGoalId) {
      // Update existing goal
      updateGoal(editingGoalId, {
        name: goalName,
        targetAmount: parseFloat(goalAmount),
      })
      setExportMessage('Goal updated successfully! 🎯')
    } else {
      // Add new goal
      addGoal({
        id: Date.now().toString(),
        name: goalName,
        targetAmount: parseFloat(goalAmount),
        currentAmount: 0,
      })
      setExportMessage('Goal created successfully! 🎯')
    }

    setGoalName('')
    setGoalAmount('')
    setShowGoalModal(false)
    setEditingGoalId(null)
    setTimeout(() => setExportMessage(null), 3000)
  }

  const tabs = [
    { id: 'budget', label: 'Budget & Goals', icon: '💰' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'data', label: 'Data Management', icon: '☁️' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Your Cloud</h1>
        <p className="text-cloud-600 dark:text-cloud-400">
          Personalize your experience and manage your data
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cloud-200 dark:border-cloud-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-accent-emerald text-accent-emerald'
                : 'border-transparent text-cloud-600 dark:text-cloud-400 hover:text-cloud-900 dark:hover:text-cloud-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Budget & Goals Tab */}
      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Monthly Budget</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Set your monthly budget
                </label>
                <input
                  type="number"
                  value={settings.monthlyBudget}
                  onChange={(e) =>
                    updateSettings({
                      monthlyBudget: parseFloat(e.target.value),
                    })
                  }
                  className="input-field"
                />
              </div>
              <div className="p-3 bg-cloud-50 dark:bg-cloud-700/50 rounded-lg">
                <p className="text-sm text-cloud-600 dark:text-cloud-400">
                  Your monthly allocation is {settings.currency}{' '}
                  {settings.monthlyBudget.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Savings Goals 🎯</h2>
            <p className="text-xs text-cloud-600 dark:text-cloud-400 mb-4">
              Set financial targets and track your progress toward them
            </p>
            <button
              onClick={handleAddGoal}
              className="btn-primary w-full justify-center mb-4"
            >
              + Add Goal
            </button>
            {goals && goals.length > 0 ? (
              <div className="space-y-3">
                {goals.map((goal: any) => (
                  <div
                    key={goal.id}
                    className="p-3 bg-cloud-50 dark:bg-cloud-700/50 rounded-lg border border-cloud-200 dark:border-cloud-600 hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{goal.name}</p>
                        <p className="text-xs text-cloud-500 mt-0.5">{settings.currency} {goal.targetAmount.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-accent-emerald/20 text-accent-emerald px-2 py-1 rounded">
                          {Math.round(
                            ((goal.currentAmount || 0) / goal.targetAmount) * 100
                          )}%
                        </span>
                        <button
                          onClick={() => handleEditGoal(goal)}
                          className="p-1.5 hover:bg-sky-100 dark:hover:bg-sky-900/30 rounded text-sky-600 dark:text-sky-400 transition-colors"
                          title="Edit goal"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded text-rose-600 dark:text-rose-400 transition-colors"
                          title="Delete goal"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-cloud-200 dark:bg-cloud-600 rounded-full h-2">
                      <div
                        className="bg-accent-emerald h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            ((goal.currentAmount || 0) / goal.targetAmount) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-cloud-600 dark:text-cloud-400 mt-2">
                      {settings.currency} {(goal.currentAmount || 0).toFixed(2)} /{' '}
                      {settings.currency} {goal.targetAmount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-cloud-600 dark:text-cloud-400 text-center py-4">
                No goals yet. Create one to get started!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Localization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) =>
                    updateSettings({ currency: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    updateSettings({ language: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    updateSettings({ timezone: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST (US Eastern)</option>
                  <option value="CST">CST (US Central)</option>
                  <option value="PST">PST (US Pacific)</option>
                  <option value="GMT">GMT (UK)</option>
                  <option value="IST">IST (India)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">AI & Insights</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.aiInsights}
                  onChange={(e) =>
                    updateSettings({ aiInsights: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium">
                  Enable AI Insights & Haiku
                </span>
              </label>

              <p className="text-xs text-cloud-500 dark:text-cloud-400">
                Turn off to disable spending haikus and smart observations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'data' && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Data Management</h2>
          {exportMessage && (
            <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg">
              {exportMessage}
            </div>
          )}
          <div className="space-y-4">
            <button
              onClick={handleExportCSV}
              className="w-full px-4 py-3 bg-cloud-100 dark:bg-cloud-700 rounded-lg font-medium hover:bg-cloud-200 dark:hover:bg-cloud-600 transition-colors flex items-center gap-3"
            >
              <Download size={20} />
              Export Data (CSV)
            </button>
            <button
              onClick={handleExportPDF}
              className="w-full px-4 py-3 bg-cloud-100 dark:bg-cloud-700 rounded-lg font-medium hover:bg-cloud-200 dark:hover:bg-cloud-600 transition-colors flex items-center gap-3"
            >
              <Download size={20} />
              Export Report (PDF)
            </button>
            <button
              onClick={handleSyncCloud}
              className="w-full px-4 py-3 bg-cloud-100 dark:bg-cloud-700 rounded-lg font-medium hover:bg-cloud-200 dark:hover:bg-cloud-600 transition-colors flex items-center gap-3"
            >
              <RefreshCw size={20} />
              Sync with Cloud
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Privacy Options</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appLock}
                  onChange={(e) =>
                    updateSettings({ appLock: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium">Enable App Lock</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.hideSensitiveAmounts}
                  onChange={(e) =>
                    updateSettings({
                      hideSensitiveAmounts: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium">
                  Hide Sensitive Amounts
                </span>
              </label>
            </div>
          </div>

          <div className="card bg-rose-50 dark:bg-rose-900/20">
            <h2 className="text-lg font-semibold mb-4 text-rose-700 dark:text-rose-400">
              Danger Zone
            </h2>
            <button
              onClick={handleResetData}
              className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
            >
              Reset All Data
            </button>
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">
              This action cannot be undone
            </p>
          </div>
        </div>
      )}

      {/* Modal for adding/editing goals */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-cloud-800 rounded-lg shadow-lg max-w-md w-full p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingGoalId ? 'Edit Savings Goal ✏️' : 'Create Savings Goal 🎯'}
              </h3>
              <button
                onClick={() => {
                  setShowGoalModal(false)
                  setEditingGoalId(null)
                  setGoalName('')
                  setGoalAmount('')
                }}
                className="text-cloud-400 hover:text-cloud-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Summer Vacation"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="input-field w-full"
                />
                <p className="text-xs text-cloud-500 mt-1">
                  Give your goal a meaningful name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Amount ({settings.currency})
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  className="input-field w-full"
                />
                <p className="text-xs text-cloud-500 mt-1">
                  Set the amount you want to save
                </p>
              </div>

              <div className="bg-cloud-50 dark:bg-cloud-700/50 p-3 rounded-lg">
                <p className="text-xs text-cloud-600 dark:text-cloud-400">
                  💡 Track multiple savings goals and watch your progress over time
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowGoalModal(false)
                  setEditingGoalId(null)
                  setGoalName('')
                  setGoalAmount('')
                }}
                className="flex-1 px-4 py-2 border border-cloud-300 dark:border-cloud-600 rounded-lg font-medium hover:bg-cloud-50 dark:hover:bg-cloud-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoal}
                className="flex-1 px-4 py-2 bg-accent-emerald text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                {editingGoalId ? 'Update Goal' : 'Create Goal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status message */}
      {exportMessage && (
        <div className="fixed bottom-4 right-4 bg-accent-emerald text-white px-4 py-3 rounded-lg shadow-lg animate-slide-up">
          {exportMessage}
        </div>
      )}
    </div>
  )
}
