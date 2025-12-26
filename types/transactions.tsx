import { TransactionType } from "@/lib/types";

export type TransactionProps = {
    description: string;
    value: number;
    date: string;
    type: TransactionType;

    expenseType?: string;
}
