import Transaction from "@/components/transaction"
import TransactionSummary from "@/components/transactionSummary";
import { getTransactionsFilteredByDate } from "@/lib/actions";

type TransactionProps = {
    id : string,
    value: number,
    type: 'Income' | 'Expense' | 'Investment' | 'Saving';
    description : string,
    expenseType: string,
    date: string
}

type GroupedTransaction = {
  date: string
  transactions: TransactionProps[]
  total: number
  income: number
  expense: number
}

function groupTransactionsWithTotals(transactions: TransactionProps[]): GroupedTransaction[] {
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

  // Ordena por data (mais recente primeiro)
  return result.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export default async function TransactionList({startDate} : {startDate : Date}){

    const transactions = await getTransactionsFilteredByDate(startDate)

    const groupedTransactions = groupTransactionsWithTotals(transactions ?? [])

    return (
        <div>
            {groupedTransactions.map(transaction  => 
                <div className="my-8" key={transaction.date}>
                    <TransactionSummary date={transaction.date} value={transaction.total}  />
                    <hr/>
                    <ul className="mt-8 flex flex-col space-y-4">
                        {transaction.transactions.map((transaction: TransactionProps)  => 
                            <li key={transaction.id}>
                                <Transaction {...transaction}/>
                            </li>
                        )}
                </ul> 
                </div> 

        )}
        </div>

    )
}