import Trend from "@/components/trend"
import { getTransactionsFilteredByDate } from "@/lib/actions"
import { FinancialTrendProps } from "@/types/trends"

export default async function DashboardTrend({startDate} : {startDate : Date}) {
    
    const transactions = await getTransactionsFilteredByDate(startDate)

    const totals = transactions?.reduce(
    (acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] ?? 0) + transaction.value
      return acc
    },
    {
      Income: 0,
      Expense: 0,
      Investment: 0,
      Saving: 0,
    } as Record<string, number>
  ) ?? {
    Income: 0,
    Expense: 0,
    Investment: 0,
    Saving: 0,
  }

  const trends: FinancialTrendProps[] = [
    { type: "Income", value: totals.Income, previousValue: 0 },
    { type: "Expense", value: totals.Expense, previousValue: 0 },
    { type: "Investment", value: totals.Investment, previousValue: 0 },
    { type: "Saving", value: totals.Saving, previousValue: 0 },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:flex-container space-x-10">
      {trends.map((trend) => (
        <Trend key={trend.type} {...trend} />
      ))}
    </div>
  )
}