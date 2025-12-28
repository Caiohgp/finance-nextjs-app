import { TransactionProps } from "@/types/transactions"

type GroupedTransaction = {
  date: string
  transactions: TransactionProps[]
  total: number
  income: number
  expense: number
}

export default function groupTransactionsWithTotals(transactions: TransactionProps[]): GroupedTransaction[] {
  const grouped: { [date: string]: TransactionProps[] } = {}

  transactions.forEach(transaction => {
    const date = transaction.date.split('T')[0]
    
    if (!grouped[date]) {
      grouped[date] = []
    }
        grouped[date].push(transaction)
    })

    const result = Object.entries(grouped).map(([date, transactionsOfDay]) => {

    const income = transactionsOfDay
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.value, 0)
    
    const expense = transactionsOfDay
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.value, 0)
    
    const total = income - expense

    return {
      date,
      transactions: transactionsOfDay,
      total,
      income,
      expense
    }
  })

  return result.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}