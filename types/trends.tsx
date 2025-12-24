export type FinancialTrendProps = {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving';
    value: number;
    previousValue: number;
}