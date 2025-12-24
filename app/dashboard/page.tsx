import Transaction from "@/components/transaction";
import Trend from "@/components/trend";
import TransactionList from "./components/transactionList";

export default function Dashboard() {
    return (        <div className="flex flex-col">
                <h1>Dashboard</h1>
                <hr />
                <div>
                    <div className="flex flex-container space-x-10">
                        <Trend type="Income" value={2000} previousValue={1000}/>
                        <Trend type="Expense" value={1000} previousValue={2000}/>
                        <Trend type="Investment" value={1700} previousValue={2000}/>
                        <Trend type="Saving" value={0} previousValue={0}/>
                    </div>
    
                    <TransactionList/>
    
                </div>
    
            </div>
    )
}