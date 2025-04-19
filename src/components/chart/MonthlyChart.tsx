'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Transaction {
  amount: string
  date: string
  description: string
}

interface Props {
  transactions: Transaction[]
}

// Use static month names to avoid SSR hydration mismatches
function getMonthName(dateStr: string) {
  const date = new Date(dateStr)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return monthNames[date.getMonth()]
}

export default function MonthlyChart({ transactions }: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null // Prevent hydration errors

  const grouped: Record<string, number> = {}

  transactions.forEach((txn) => {
    const month = getMonthName(txn.date)
    const amount = parseFloat(txn.amount) || 0
    grouped[month] = (grouped[month] || 0) + amount
  })

  const data = Object.keys(grouped).map((month) => ({
    name: month,
    amount: grouped[month],
  }))

  if (data.length === 0) return null

  return (
    <div className="max-w-md mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-2 text-indigo-700">📊 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
