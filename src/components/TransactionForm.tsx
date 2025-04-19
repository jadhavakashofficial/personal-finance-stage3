'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MonthlyChart from './chart/MonthlyChart'
import CategoryChart from './chart/CategoryChart'
import DashboardSummary from './DashboardSummary'

interface Transaction {
  amount: string
  date: string
  description: string
  category: string
}

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('transactions')
    if (stored) {
      setTransactions(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !date || !description || !category) {
      setError('All fields including category are required.')
      return
    }

    const newTxn = { amount, date, description, category }
    setTransactions([newTxn, ...transactions])
    setAmount('')
    setDate('')
    setDescription('')
    setCategory('')
    setError('')
  }

  const handleDelete = (indexToDelete: number) => {
    const updated = transactions.filter((_, index) => index !== indexToDelete)
    setTransactions(updated)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-center text-indigo-600">💸 Personal Finance Tracker</h1>

      <Card className="bg-indigo-50 shadow-md rounded-xl">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="number"
              placeholder="💰 Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white"
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white"
            />
            <Input
              type="text"
              placeholder="📝 Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white"
            />
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="🏷️ Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">➕ Add Transaction</Button>
          </form>
        </CardContent>
      </Card>

      <MonthlyChart transactions={transactions} />
      <CategoryChart transactions={transactions} />
      <DashboardSummary transactions={transactions} />

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-400">No transactions yet.</p>
        ) : (
          transactions.map((txn, index) => (
            <Card key={index} className="shadow-sm border border-gray-200 bg-white hover:bg-gray-50 rounded-lg">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-md font-medium text-gray-800">{txn.description}</p>
                  <p className="text-xs text-gray-500">{txn.date} • {txn.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-md font-bold text-green-600">₹ {txn.amount}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ❌
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
