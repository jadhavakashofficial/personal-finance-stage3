'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Transaction {
  amount: string
  category: string
  date: string
  description: string
}

interface Props {
  transactions: Transaction[]
}

const categoryLabels: Record<string, string> = {
  food: 'Food',
  travel: 'Travel',
  bills: 'Bills',
  shopping: 'Shopping',
  others: 'Others',
}

export default function BudgetInsights({ transactions }: Props) {
  const [budgets, setBudgets] = useState<Record<string, number> | null>(null)

  useEffect(() => {
    // Wait for client-side localStorage
    const stored = localStorage.getItem('budgets')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed === 'object') {
          setBudgets(parsed)
        } else {
          setBudgets({})
        }
      } catch {
        setBudgets({})
      }
    } else {
      setBudgets({})
    }
  }, [])

  if (budgets === null) {
    return (
      <div className="text-center text-sm text-gray-400 mt-4">
        ⏳ Loading budget data...
      </div>
    )
  }

  const spending: Record<string, number> = {}
  transactions.forEach((txn) => {
    const amt = parseFloat(txn.amount) || 0
    spending[txn.category] = (spending[txn.category] || 0) + amt
  })

  const categories = Object.keys(budgets)

  if (categories.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 mt-6">
        💤 No budgets found. Please set them above.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-bold text-indigo-700">📈 Budget vs Actual</h2>
      {categories.map((cat) => {
        const budget = budgets[cat]
        const spent = spending[cat] || 0
        const percent = Math.min((spent / budget) * 100, 100)
        const status = spent > budget ? '⚠️ Overspent' : '✅ Under Budget'

        return (
          <Card key={cat} className="bg-white">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{categoryLabels[cat]}</span>
                <span>₹ {spent.toFixed(2)} / ₹ {budget}</span>
              </div>
              <Progress value={percent} />
              <p className={`text-xs ${spent > budget ? 'text-red-600' : 'text-green-600'}`}>
                {status}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
