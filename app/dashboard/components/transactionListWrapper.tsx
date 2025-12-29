
import { getTransactionsFilteredByDateAndLimit } from "@/lib/actions"
import TransactionList from "./transactionList"

export default async function TransactionListWrapper({startDate} : {startDate : Date}){

    const limit : number = 10

    const transactions = await getTransactionsFilteredByDateAndLimit(startDate,0,limit)

    return (

          <TransactionList startDate={startDate} transactions={transactions} limit={limit}></TransactionList>

    )
}