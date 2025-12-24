export type TransactionProps = {
    description: string;
    value: number;
    date: string;
    type: 'Income' | 'Expense' | 'Investment' | 'Saving';

    expenseType?: string;

}
