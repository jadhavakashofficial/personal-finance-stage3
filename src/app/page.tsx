import TransactionForm from "@/components/TransactionForm"

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Personal Finance Tracker</h1>
      <TransactionForm />
    </main>
  )
}
