'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const categories = ['food', 'travel', 'bills', 'shopping', 'others']

export default function BudgetManager() {
  const [budgets, setBudgets] = useState<Record<string, number>>({})

  useEffect(() => {
    const stored = localStorage.getItem('budgets')
    if (stored) {
      setBudgets(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  const handleChange = (cat: string, value: string) => {
    setBudgets({
      ...budgets,
      [cat]: parseFloat(value) || 0,
    })
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">📊 Set Monthly Budgets</h2>
      <Card className="p-4 space-y-3">
        {categories.map((cat) => (
          <div key={cat} className="flex justify-between items-center gap-4">
            <label className="capitalize text-sm w-1/2">{cat}</label>
            <Input
              type="number"
              placeholder="₹ Budget"
              value={budgets[cat] || ''}
              onChange={(e) => handleChange(cat, e.target.value)}
              className="w-full bg-white"
            />
          </div>
        ))}
        <div className="text-center mt-4 text-green-700 font-medium text-sm">
          ✅ Budgets are saved automatically
        </div>
      </Card>
    </div>
  )
}
