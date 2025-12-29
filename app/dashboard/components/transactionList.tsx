'use client'

import { useEffect, useState } from "react";
import Button from "@/components/button";
import TransactionSummary from "@/components/transactionSummary";
import Transaction from "@/components/transaction";
import { TransactionProps } from "@/types/transactions";
import { getTransactionsFilteredByDateAndLimit } from "@/lib/actions";
import groupTransactionsWithTotals from "@/utils/groupTransactions"
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react"

export default function TransactionList({startDate,transactions, limit} : {startDate : Date, transactions : TransactionProps[], limit : number}){

  const searchParams = useSearchParams()
  const rangeParam = searchParams.get("range") ?? "month"

  const [transactionsList, setTransactionsList] = useState<TransactionProps[]>(transactions)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [buttonHidden, setButtonHidden] = useState(transactions.length === 0)

  const fetchTransactions = async (newOffset: number) => {

    setLoading(true)
    const res = await getTransactionsFilteredByDateAndLimit(startDate,newOffset,limit)

    setButtonHidden(res.length ===0 )

    console.log(res)
    if (newOffset === 0) {
      setTransactionsList(res)
    } else {
      setTransactionsList(prev => [...prev, ...res])
    }

    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset(0)
    fetchTransactions(0)
  }, [rangeParam])

  const handleLoadMore = () => {
    const nextOffset = offset + limit
    setOffset(nextOffset)
    fetchTransactions(nextOffset)
  }



  const groupedTransactions = groupTransactionsWithTotals(transactionsList ?? [])

  return (
    <div className="space-y-8 mb-8">

      {groupedTransactions.length === 0 && <div className="text-center text-gray-400 dark:text-gray-500">No transactions found</div>}
      
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
      <div className="flex justify-center">
        
        <Button disabled={loading || buttonHidden} className="justify-center" variant="ghost" onClick={handleLoadMore}>
          <div className="flex items-center space-x-1">
            {loading && <Loader className="animate-spin" />} Load More
          </div>
        </Button>
      </div>
      

    </div>

    )
}