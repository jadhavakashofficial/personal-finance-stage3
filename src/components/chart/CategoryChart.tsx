'use client'

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts'

interface Transaction {
  amount: string
  category: string
  date: string
  description: string
}

interface Props {
  transactions: Transaction[]
}

const COLORS = ['#6366F1', '#34D399', '#FBBF24', '#F87171', '#A78BFA']

export default function CategoryChart({ transactions }: Props) {
  const grouped: Record<string, number> = {}

  transactions.forEach((txn) => {
    const amount = parseFloat(txn.amount) || 0
    grouped[txn.category] = (grouped[txn.category] || 0) + amount
  })

  const data = Object.keys(grouped).map((cat) => ({
    name: cat,
    value: grouped[cat],
  }))

  if (data.length === 0) return null

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-2 text-indigo-700">📊 Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
