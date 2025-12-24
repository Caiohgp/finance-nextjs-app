import Trend from "@/components/trend";
import Transaction from "@/components/transaction";
import TransactionSummary from "@/components/transactionSummary";
import Button from "@/components/button";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <hr />
            <div className="flex flex-container space-x-10">
                <Trend type="Income" value={2000} previousValue={1000}/>
                <Trend type="Expense" value={1000} previousValue={2000}/>
                <Trend type="Investment" value={1700} previousValue={2000}/>
                <Trend type="Saving" value={0} previousValue={0}/>
            </div>

            <hr/>
            <div className="flex flex-col space-y-5 mt-10">
                <Transaction description="Salary" type="Income" value={2000} date="2025-12-12"/>
                <Transaction description="Going out to eat" expenseType="bills" type="Expense" value={2000} date="2025-12-12"/>
                <Transaction description="Investing in some random shit" type="Investment" value={300} date="2025-12-12"/>
                <Transaction description="Saving for my child school" type="Saving" value={500} date="2025-12-12"/>
            </div>
            <hr/>
            <div className="flex flex-col space-y-5 mt-10">
                <TransactionSummary value={6000} date="2025-12-12"/>

                <Transaction description="Salary" type="Income" value={2000} date="2025-12-12"/>
                <Transaction description="Going out to eat" expenseType="bills" type="Expense" value={2000} date="2025-12-12"/>
                <Transaction description="Investing in some random shit" type="Investment" value={300} date="2025-12-12"/>
                <Transaction description="Saving for my child school" type="Saving" value={500} date="2025-12-12"/>
            </div>

            <div className="space-x-4">
                <h2>Buttons</h2>
                <Button props={{size: 'medium', text:'Click Me'}}/>
                <Button props={{variant: 'outline', size: 'small', text:'Click Me'}}/>
                <Button props={{size: 'large', text:'Click Me'}}/>
                <Button props={{variant: 'ghost', size: 'medium', text:'Click Me'}}/>
            
            </div>

        </div>
    )
}