import { Metadata } from "next";
import TransactionForm from "../../components/transactionForm";

export const metadata: Metadata = {
  title: "Add Transaction",
  description: "Adding Transaction",
};

export default function AddTransaction(){
    return(
        <TransactionForm/>
    )
}