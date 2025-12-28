
import { getTransactionsFilteredByDateAndLimit } from "@/lib/actions"
import TransactionList from "./transactionList"

export default async function TransactionListWrapper({startDate} : {startDate : Date}){

    const transactions = await getTransactionsFilteredByDateAndLimit(startDate,0,3)

    return (

          <TransactionList startDate={startDate} transactions={transactions}></TransactionList>


    )
}