import { Metadata } from "next";
import TransactionForm from "../../components/transactionForm";
import { Suspense } from "react";
import { TransactionFormItemSkeleton } from "../../components/transactionFormSkeleton";

export const metadata: Metadata = {
  title: "Add Transaction",
  description: "Adding Transaction",
};

export default function AddTransaction(){
    return(
        <Suspense fallback={<TransactionFormItemSkeleton/>}>
          <TransactionForm/>
        </Suspense>
    )
}