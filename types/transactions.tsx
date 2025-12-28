import { TransactionType } from "@/lib/types";

export type TransactionProps = {
    id: string;
    description: string;
    value: number;
    date: string;
    type: TransactionType;

    expenseType?: string;
}
