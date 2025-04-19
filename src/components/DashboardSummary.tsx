'use client'

interface Transaction {
  amount: string
  category: string
  date: string
  description: string
}

interface Props {
  transactions: Transaction[]
}

export default function DashboardSummary({ transactions }: Props) {
  if (transactions.length === 0) return null

  const total = transactions.reduce((sum, txn) => sum + parseFloat(txn.amount), 0)

  const categoryTotals: Record<string, number> = {}
  transactions.forEach(txn => {
    const amt = parseFloat(txn.amount) || 0
    categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + amt
  })

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"
  const mostRecent = transactions[0]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto">
      <div className="bg-indigo-100 rounded-xl p-4 shadow">
        <h3 className="text-sm text-indigo-700 font-semibold">Total Spent</h3>
        <p className="text-xl font-bold text-indigo-900">₹ {total.toFixed(2)}</p>
      </div>
      <div className="bg-green-100 rounded-xl p-4 shadow">
        <h3 className="text-sm text-green-700 font-semibold">Top Category</h3>
        <p className="text-xl font-bold text-green-900 capitalize">{topCategory}</p>
      </div>
      <div className="bg-yellow-100 rounded-xl p-4 shadow">
        <h3 className="text-sm text-yellow-700 font-semibold">Most Recent</h3>
        <p className="text-sm font-medium text-yellow-900">{mostRecent.description}</p>
        <p className="text-xs text-yellow-700">{mostRecent.date}</p>
      </div>
    </div>
  )
}
