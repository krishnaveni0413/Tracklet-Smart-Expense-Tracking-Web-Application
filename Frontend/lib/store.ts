// Global state management using Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Expense {
  id: string
  amount: number
  category: string
  type: 'expense' | 'income'
  date: string
  note: string
  userId: string
}

export interface Budget {
  id: string
  category: string
  limit: number
  userId: string
}

export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline?: string
  userId: string
}

export interface UserSettings {
  currency: string
  language: string
  theme: 'light' | 'dark' | 'system'
  monthlyBudget: number
  aiInsights: boolean
  appLock: boolean
  hideSensitiveAmounts: boolean
  timezone: string
}

interface StoreState {
  // Auth
  user: { id: string; email: string; name: string } | null
  setUser: (user: StoreState['user']) => void

  // Expenses
  expenses: Expense[]
  addExpense: (expense: Expense) => void
  updateExpense: (id: string, expense: Partial<Expense>) => void
  deleteExpense: (id: string) => void

  // Budgets
  budgets: Budget[]
  setBudgets: (budgets: Budget[]) => void

  // Goals
  goals: SavingsGoal[]
  setGoals: (goals: SavingsGoal[]) => void
  addGoal: (goal: Omit<SavingsGoal, 'userId'>) => void
  updateGoal: (id: string, goal: Partial<SavingsGoal>) => void
  deleteGoal: (id: string) => void

  // Settings
  settings: UserSettings
  updateSettings: (settings: Partial<UserSettings>) => void

  // AI Insights
  lastHaiku: string | null
  setLastHaiku: (haiku: string) => void
}

export const useStore = create<StoreState>()(
  persist<StoreState>(
    (set: any) => ({
      user: null,
      setUser: (user: { id: string; email: string; name: string } | null) => set({ user }),

      expenses: [],
      addExpense: (expense: Expense) =>
        set((state: StoreState) => ({ expenses: [expense, ...state.expenses] })),
      updateExpense: (id: string, expense: Partial<Expense>) =>
        set((state: StoreState) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...expense } as Expense : e
          ),
        })),
      deleteExpense: (id: string) =>
        set((state: StoreState) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      budgets: [],
      setBudgets: (budgets: Budget[]) => set({ budgets }),

      goals: [],
      setGoals: (goals: SavingsGoal[]) => set({ goals }),
      addGoal: (goal: Omit<SavingsGoal, 'userId'>) =>
        set((state: StoreState) => ({
          goals: [...state.goals, { ...goal, userId: state.user?.id || 'guest' } as SavingsGoal],
        })),
      updateGoal: (id: string, goal: Partial<SavingsGoal>) =>
        set((state: StoreState) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...goal } as SavingsGoal : g
          ),
        })),
      deleteGoal: (id: string) =>
        set((state: StoreState) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),

      settings: {
        currency: 'USD',
        language: 'en',
        theme: 'system',
        monthlyBudget: 5000,
        aiInsights: true,
        appLock: false,
        hideSensitiveAmounts: false,
        timezone: 'UTC',
      },
      updateSettings: (settings: Partial<UserSettings>) =>
        set((state: StoreState) => ({
          settings: { ...state.settings, ...settings },
        })),

      lastHaiku: null,
      setLastHaiku: (haiku: string) => set({ lastHaiku: haiku }),
    } as StoreState),
    {
      name: 'tracklet-store',
    }
  )
)
