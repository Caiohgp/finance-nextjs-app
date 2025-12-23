type FinancialTrendProps = {
    expenses: number;
    income: number;
    investments: number;
    savings: number;
}

export default function Trend(
    {expenses, income, 
    investments, savings }
    : FinancialTrendProps) {

    return (
        <div>
            <h2>This is your financial trend</h2>
            <div className="flex flex-container gap-10">
                <div className="flex flex-col">
                    <div>Expenses</div>
                    <div>${expenses}</div>
                </div> 
                <div className="flex flex-col">
                    <div>Income</div>
                    <div>${income}</div>
                </div> 
                <div className="flex flex-col">
                    <div>Investments</div>
                    <div>${investments}</div>
                </div> 
                <div className="flex flex-col">
                    <div>Savings</div>
                    <div>${savings}</div>
                </div>  
                
            </div>
        </div>
    )
}