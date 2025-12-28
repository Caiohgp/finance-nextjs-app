'use client'

import { useState } from "react";
import Button from "@/components/button";
import TransactionSummary from "@/components/transactionSummary";
import Transaction from "@/components/transaction";
import { TransactionProps } from "@/types/transactions";
import { getTransactionsFilteredByDateAndLimit } from "@/lib/actions";
import groupTransactionsWithTotals from "@/utils/groupTransactions"

export default function TransactionList({startDate,transactions} : {startDate : Date, transactions : TransactionProps[]}){

  const [transactionsList, setTransactionsList] = useState<TransactionProps[]>(transactions)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const limit = 3
  
  const fetchTransactions = async (newOffset: number) => {
    console.log(newOffset)
    console.log(limit)
    setLoading(true)
    const res = await getTransactionsFilteredByDateAndLimit(startDate,newOffset,limit)

    console.log(res)
    if (newOffset === 0) {
      setTransactionsList(res)
    } else {
      setTransactionsList(prev => [...prev, ...res])
    }

    if (res.length < limit) setHasMore(false)

    setLoading(false)
  }

  const handleLoadMore = () => {
    const nextOffset = offset + limit
    setOffset(nextOffset)
    fetchTransactions(nextOffset)
  }
  console.log(transactionsList)
  const groupedTransactions = groupTransactionsWithTotals(transactionsList ?? [])

  return (
    <div className="space-y-8 mb-8">
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
      <Button disabled={!hasMore || loading} className="justify-center" variant="ghost" onClick={handleLoadMore}>Load More</Button>

    </div>

    )
}