import Transaction from "@/components/transaction"
import transaction from "@/components/transaction"
import Link from "next/link"
import { Key } from "react"

type TransactionProps = {
    id : string,
    value: number,
    type: 'Income' | 'Expense' | 'Investment' | 'Saving';
    description : string,
    expenseType: string,
    date: string
}

export default async function TransactionList(){
    
    const response = await fetch('http://localhost:3100/transactions')

    const transactions = await response.json()

    console.log(transactions)

    return (
        <ul className="mt-8 flex flex-col space-y-4">
            {transactions.map((transaction: TransactionProps)  => 
                <li key={transaction.id}>
                    <Transaction description={transaction.description} 
                    value={transaction.value} date={transaction.date} 
                    type={transaction.type} expenseType={transaction.expenseType}/>
                </li>
            )}
        </ul>
        
        

    )
}