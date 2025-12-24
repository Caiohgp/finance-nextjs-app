import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import formatCurrency from "@/lib/format-currency";
import { FinancialTrendProps } from "@/types/trends";

const colorTypes: Record<string, string> = {
    'Income': 'text-green-700 dark:text-green-300',
    'Expense': 'text-red-700 dark:text-red-300',
    'Investment': 'text-indigo-700 dark:text-indigo-300',
    'Saving': 'text-yellow-700 dark:text-yellow-300'
}

export default function Trend(
    {type, value, 
    previousValue }
    : FinancialTrendProps) {


    const calcPercentageChange = (value: number, previousValue: number) => {
        if (!previousValue || !value) return 100
        return ((value - previousValue) / previousValue) * 100
    }

    const percentageChange : string = useMemo(
        () => calcPercentageChange(value, previousValue).toFixed(0),
        [value, previousValue]
    )

    const formattedCurrentValue = formatCurrency(value)
    
    return (
        <div>
            <div className="grid grid-cols gap-4">
                <div className="md:flex md:flex-col">
                    <div className={`font-semibold ${colorTypes[type]}`}>{type}</div>                    
                    <div className="text-2xl font-semibold text-black dark:text-white mb-2">
                        {formattedCurrentValue}
                    </div>
                    <div className="flex space-x-1 items-center text-sm">
                        {percentageChange < "0" && <ArrowDownLeft className="text-red-700 dark:text-red-300" />}
                        {percentageChange >= "0" && <ArrowUpRight className="text-green-700 dark:text-green-300" />}
                        <div>{percentageChange}% vs last period</div>
                    </div>
                </div>                
            </div>
        </div>
    )
}