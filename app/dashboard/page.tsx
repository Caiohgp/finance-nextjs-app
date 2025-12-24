import TransactionList from "./components/transactionList";
import { Suspense } from "react";
import TransactionListFallback from "./components/transactionListSkeleton";
import DashboardTrend from "./components/dashboardTrend";
import TrendFallback from "./components/trendSkeleton";

export default function Dashboard() {
    return (        
            <div className="flex flex-col">

                <div>
                    <Suspense fallback={<TrendFallback/>}>
                        <DashboardTrend/>
                    </Suspense>
                    
                </div>
                <hr/>
                <div>
                    <Suspense fallback={<TransactionListFallback/>}>
                        <TransactionList/>
                    </Suspense>
    
                </div>
    
            </div>
    )
}