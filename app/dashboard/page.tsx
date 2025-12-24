import Trend from "@/components/trend";

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
        </div>
    )
}