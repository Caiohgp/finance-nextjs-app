import formatCurrency from "@/lib/format-currency";
import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";

type TransactionProps = {
    description: string;
    value: number;
    date: string;
    type: 'Income' | 'Expense' | 'Investment' | 'Saving';

    expenseType?: string;

}

const typesMap = {
'Income': {
    icon: HandCoins,
    colors: 'text-green-700 dark:text-green-300'
},
'Expense': {
    icon: Wallet,
    colors: 'text-red-700 dark:text-red-300'
},
'Investment': {
    icon: PiggyBank,
    colors: 'text-indigo-700 dark:text-indigo-300'
},
'Saving': {
    icon: Landmark,
    colors: 'text-yellow-700 dark:text-yellow-300'
}
}


export default function Transaction({description,value,date,type,expenseType}:TransactionProps){

    const IconComponent = typesMap[type].icon;
    const colors = typesMap[type].colors
    const formattedValue = formatCurrency(value);

    return (
    <div className="flex flex-container items-center border p-4 rounded-lg shadow-sm hover:shadow-md">
        <div className={`${colors} flex items-center grow`}>
            <IconComponent className="mr-2 w-4 h-4 hidden sm:block" />
            <span>{description}</span>
        </div>

        <div className="min-w-[80px] hidden md:flex">
            {expenseType && <div className="rounded-md bg-gray-700 dark:bg-gray-200 text-xs text-gray-200 dark:text-gray-800 px-2 py-0.5">
                {expenseType.toUpperCase()}
            </div>}
        </div>
        <div className="min-w-[170px] hidden md:flex">
            {date}
        </div>

        <div className="min-w-[70px] text-right">
            {formattedValue}
        </div>
        <div className="min-w-[30px] flex justify-end">
            ...
        </div>
           
    </div>)
}