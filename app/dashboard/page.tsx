import Trend from "@/components/trend";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <hr />
            <Trend expenses={2} investments={3} income={4} savings={5}/>
        </div>
    )
}