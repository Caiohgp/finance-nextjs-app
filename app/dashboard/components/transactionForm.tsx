'use client'

import Button from "@/components/button";
import InputItem from "@/components/inputForm";
import LabelItem from "@/components/labelForm";
import SelectItem from "@/components/selectForm";
import { TRANSACTION_TYPES, CATEGORY_TYPES, TransactionType } from "@/lib/types";
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "@/lib/validator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/lib/actions";
import ErrorForm from "@/components/error-form";

export type TransactionAddProps = {
    description: string;
    value: number;
    date: string;
    type: TransactionType;
    expenseType?: string;
}


export default function TransactionForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: zodResolver(transactionSchema)
    })

    const type = watch('type')
    const isExpense = type === 'Expense'
    const [isSaving, setSaving] = useState(false)
    const [error, setError] = useState<Error | null>(null)    
    const router = useRouter()

    const onSubmit: SubmitHandler<TransactionAddProps> = async (data) => {
        setSaving(true)
        try {

            createTransaction(data)
            router.push('/dashboard')

        }catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown Error'))
        }
        finally {
            setSaving(false)
        }
    }

    return (<form className="space-y-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <LabelItem>
                    Transaction Type
                    <SelectItem {...register('type')}>
                        <option value="">Select a Type</option>
                        {TRANSACTION_TYPES.map(type =>
                            <option key={type} value={type}>
                                {type}
                            </option>
                        )}
                    </SelectItem>
                </LabelItem>
                <ErrorForm error={errors.type}/>
            </div>

            <div>
                <LabelItem>
                    Category of expense
                    <SelectItem disabled={!isExpense} {...register('expenseType')}>
                        <option value="">Select a Category of expenses</option>
                        {CATEGORY_TYPES.map(type =>
                            <option key={type} value={type}>
                                {type}
                            </option>
                        )}
                    </SelectItem>
                </LabelItem>
            </div>

            <div>
                <LabelItem>
                    Value
                    <InputItem {...register('value', { valueAsNumber: true })} type="number" placeholder="Transaction Value"></InputItem>
                </LabelItem>
                <ErrorForm error={errors.value}/>
            </div>

            <div>
                <LabelItem>
                    Date
                    <InputItem {...register('date')} type="date" placeholder="Transaction Date"></InputItem>
                </LabelItem>
                <ErrorForm error={errors.date}/>
            </div>

            <div className="col-span-1 md:col-span-2">
                <LabelItem>
                    Description
                    <InputItem {...register("description")} type="text" placeholder="Transaction Description"></InputItem>
                </LabelItem>
                <ErrorForm error={errors.description}/>
            </div>

        </div>
        <div className="my-8 flex justify-between">
            <div>
                {error && <ErrorForm error={error} />}
            </div>
            <Button variant="default" disabled={isSaving}>Save</Button>
        </div>
    </form>
    )
}