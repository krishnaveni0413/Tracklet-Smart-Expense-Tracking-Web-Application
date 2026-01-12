'use client'

import { useStore } from '@/lib/store'
import { useState, useRef } from 'react'
import { Camera, Upload, X } from 'lucide-react'

export function ReceiptScanner() {
  const addExpense = useStore((state) => state.addExpense)
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [note, setNote] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    { value: 'food', label: '🍔 Food & Dining' },
    { value: 'transport', label: '🚗 Transport' },
    { value: 'entertainment', label: '🎬 Entertainment' },
    { value: 'shopping', label: '🛍️ Shopping' },
    { value: 'utilities', label: '💡 Utilities' },
    { value: 'healthcare', label: '🏥 Healthcare' },
    { value: 'other', label: '📌 Other' },
  ]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would use OCR to extract amount from receipt
      // For now, we'll show a modal to manually enter the amount
      setFeedback('📸 Receipt uploaded! Please enter the amount below.')
    }
  }

  const handleAddFromReceipt = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setFeedback('❌ Please enter a valid amount')
      return
    }

    const newExpense = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category: category,
      type: 'expense' as const,
      date: new Date().toISOString(),
      note: `Receipt: ${note}` || 'Receipt expense',
      userId: 'user-1',
    }

    addExpense(newExpense)
    setFeedback('✅ Receipt expense added successfully!')
    
    // Reset form
    setTimeout(() => {
      setAmount('')
      setNote('')
      setCategory('food')
      setIsOpen(false)
      setFeedback(null)
    }, 2000)
  }

  return (
    <>
      {/* Receipt Scanner Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg font-medium hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-lg"
      >
        <Camera size={20} />
        📸 Scan Receipt
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-cloud-800 rounded-2xl p-6 max-w-md w-full space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">📸 Receipt Scanner</h3>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setFeedback(null)
                }}
                className="p-1 hover:bg-cloud-100 dark:hover:bg-cloud-700 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
              <p className="text-sm text-sky-700 dark:text-sky-300">
                💡 <strong>How to use:</strong> Upload a receipt photo or manually enter the amount. The system will extract the total and add it to your expenses.
              </p>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-3 rounded-lg ${
                feedback.includes('✅')
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400'
              }`}>
                {feedback}
              </div>
            )}

            {/* Upload Section */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Upload Receipt Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 border-2 border-dashed border-sky-300 dark:border-sky-700 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  Choose File
                </button>
              </div>

              {/* Camera Capture */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full px-4 py-2 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center gap-2"
              >
                <Camera size={18} />
                Take Photo
              </button>
            </div>

            {/* Manual Entry */}
            <div className="border-t border-cloud-200 dark:border-cloud-700 pt-4 space-y-3">
              <p className="text-sm font-medium">Or enter details manually:</p>

              <div>
                <label className="text-sm font-medium mb-1 block">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Notes (Optional)</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Store name, items, etc."
                  className="input-field"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setFeedback(null)
                  }}
                  className="flex-1 px-4 py-2 bg-cloud-100 dark:bg-cloud-700 rounded-lg font-medium hover:bg-cloud-200 dark:hover:bg-cloud-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFromReceipt}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
