import Trend from "@/components/trend"
import { FinancialTrendProps } from "@/types/trends"

export default async function DashboardTrend() {
    const response = await fetch('http://localhost:3100/trends')

    const trends = await response.json()
    
    return (
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-container space-x-10">
            {trends.map((trend: FinancialTrendProps) =>
                <div key={trend.type}>
                    <Trend {...trend}/>
                </div>
            )}
        </div>
    )
}