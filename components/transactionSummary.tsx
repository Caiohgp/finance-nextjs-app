import formatCurrency from "@/lib/format-currency";

type TransactionSummaryProps = {
    date: string;
    value: number;
}

export default function TransactionSummary
    ({date, value} : TransactionSummaryProps) {
  
    const formattedAmount = formatCurrency(value)

    return (<div className="flex text-gray-500 dark:text-gray-400 font-semibold">
        <div className="grow">
        {date}
        </div>

        <div className="min-w-[70px] text-right font-semibold">{formattedAmount}</div>
        <div className="min-w-[50px]"></div>
    </div>)
}