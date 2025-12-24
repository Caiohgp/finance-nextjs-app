import Transaction from "@/components/transaction";
import Trend from "@/components/trend";

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
    
                    <div className="flex flex-col space-y-5 mt-10">
                        <Transaction description="Salary" type="Income" value={2000} date="2025-12-12"/>
                        <Transaction description="Going out to eat" expenseType="bills" type="Expense" value={2000} date="2025-12-12"/>
                        <Transaction description="Investing in some random shit" type="Investment" value={300} date="2025-12-12"/>
                        <Transaction description="Saving for my child school" type="Saving" value={500} date="2025-12-12"/>
                    </div>
    
                </div>
    
            </div>
    )
}