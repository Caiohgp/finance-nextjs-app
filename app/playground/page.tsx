import Trend from "@/components/trend";
import Transaction from "@/components/transaction";
import TransactionSummary from "@/components/transactionSummary";
import Button from "@/components/button";
import LabelItem from "@/components/labelForm";
import TextAreaItem from "@/components/textAreaForm";
import InputItem from "@/components/inputForm";
import SelectItem from "@/components/selectForm";
import TransactionListSkeleton from "../../components/skeletonLoading";
import { Metadata } from "next";
import TransactionForm from "../dashboard/components/transactionForm";

export const metadata: Metadata = {
    title: "Playground",
    description: "Playground Page",
};

export default function Playground() {
    return (
        <div className="flex flex-col">
            <h1>Dashboard</h1>
            <hr />
            <div>
                <div className="flex flex-container space-x-10">
                    <Trend type="Income" value={2000} previousValue={1000} />
                    <Trend type="Expense" value={1000} previousValue={2000} />
                    <Trend type="Investment" value={1700} previousValue={2000} />
                    <Trend type="Saving" value={0} previousValue={0} />
                </div>

                <div className="flex flex-col space-y-5 mt-10">
                    <Transaction id="1" description="Salary" type="Income" value={2000} date="2025-12-12" />
                    <Transaction id="2" description="Going out to eat" expenseType="bills" type="Expense" value={2000} date="2025-12-12" />
                    <Transaction id="3" description="Investing in some random shit" type="Investment" value={300} date="2025-12-12" />
                    <Transaction id="4" description="Saving for my child school" type="Saving" value={500} date="2025-12-12" />
                </div>

                <div className="flex flex-col space-y-5 mt-10">
                    <TransactionSummary value={6000} date="2025-12-12" />

                    <Transaction id="5" description="Salary" type="Income" value={2000} date="2025-12-12" />
                    <Transaction id="6" description="Going out to eat" expenseType="bills" type="Expense" value={2000} date="2025-12-12" />
                    <Transaction id="7" description="Investing in some random shit" type="Investment" value={300} date="2025-12-12" />
                    <Transaction id="8" description="Saving for my child school" type="Saving" value={500} date="2025-12-12" />
                </div>

                <div className="space-x-4">
                    <h2>Buttons</h2>
                    <Button size='medium' >Click Me</Button>
                    <Button variant='outline' size='small'>Click Me</Button>
                    <Button size='large'>Click Me</Button>
                    <Button variant='ghost' size='medium'> Click Me</Button>

                </div>

                <div className="space-y-4">
                    <h2>Forms</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <LabelItem >
                            Name
                            <InputItem type="text" placeholder="Name" />
                        </LabelItem>
                        <LabelItem >
                            Email
                            <InputItem type="email" placeholder="Email" />
                        </LabelItem>
                        <LabelItem >
                            Combobox
                            <SelectItem>
                                <option></option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </SelectItem>
                        </LabelItem>

                        <LabelItem>
                            Free Text
                            <TextAreaItem placeholder="Insira o texto aqui" />
                        </LabelItem>
                        <div className="flex items-center">
                            <InputItem type="checkbox" id="terms" />
                            <LabelItem className="ml-2" htmlFor="terms">Accept terms</LabelItem>
                        </div>


                    </div>

                    <Button size='medium'> Submit </Button>

                    <div>
                        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
                        <hr />
                        <div className="space-y-8">
                            <div className="flex space-x-4">
                                <TransactionListSkeleton />
                                <TransactionListSkeleton />
                                <TransactionListSkeleton />
                            </div>

                            <div className="space-y-4">
                                <TransactionListSkeleton />
                                <TransactionListSkeleton />
                                <TransactionListSkeleton />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>Transaction Form</h1>
                        <TransactionForm/>
                    </div>

                </div>
            </div>

        </div>
    )
}