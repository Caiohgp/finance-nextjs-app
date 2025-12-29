import TransactionDeleteButton from "@/app/dashboard/components/transactionDeleteButton";
import formatCurrency from "@/lib/format-currency";
import { TransactionProps } from "@/types/transactions";
import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";
import TransactionEditButton from "@/app/dashboard/components/transactionEditButton";

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

export default function Transaction({
        id,
        description,
        value,
        type,
        date,
        expenseType,
        onDelete,
        onUpdate
        }: TransactionProps & {
        onDelete?: () => void
        onUpdate?: (updated: TransactionProps) => void
        }) {
    const IconComponent = typesMap[type].icon;
    const colors = typesMap[type].colors
    const formattedValue = formatCurrency(value);

    const transactionData = { id, description, value, type, date,expenseType }

    return (
    <div className="flex flex-container items-center border p-4 rounded-lg shadow-sm hover:shadow-md">
        <div className={`${colors} flex items-center grow`}>
            <IconComponent className="mr-2 w-4 h-4 hidden sm:block" />
            <span>{description}</span>
        </div>

        <div className="min-w-[150px] hidden md:flex">
            {expenseType && <div className="rounded-md bg-gray-700 dark:bg-gray-200 text-xs text-gray-200 dark:text-gray-800 px-2 py-0.5">
                {expenseType.toUpperCase()}
            </div>}
        </div>

        <div className="min-w-[100px] text-center">
            {formattedValue}
        </div>
        <div className="min-w-[100px] flex justify-end space-x-1 text-white">
            <TransactionEditButton 
                transaction={transactionData} 
                onUpdate={onUpdate}
            />
            <TransactionDeleteButton id={id} onDelete={onDelete}/>
        </div>
           
    </div>)
}