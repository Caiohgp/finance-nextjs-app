'use client'

import Button from "@/components/button";
import InputItem from "@/components/inputForm";
import LabelItem from "@/components/labelForm";
import SelectItem from "@/components/selectForm";
import { TRANSACTION_TYPES,CATEGORY_TYPES } from "@/lib/types";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'

export default function TransactionForm(){

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode:"onTouched"
    })
    
    const type = watch('type')
    const isExpense = type === 'Expense'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit : SubmitHandler<FieldValues> = (data : any) => console.log(data)

    return (<form className="space-y-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelItem>
                Transaction Type
                <SelectItem {...register('type',{required:"The transaction type must be especified"})}>
                    <option value="">Select a Type</option>
                    {TRANSACTION_TYPES.map(type =>
                        <option key={type} value={type}>
                            {type}
                        </option>
                    )}
                </SelectItem>
            </LabelItem>
            {errors.type && <p className="my-1 text-red-500">{errors.type.message}</p>}

            <LabelItem>
                Value
                <InputItem {...register('value', {
                    required:"The value is required",
                    valueAsNumber:true,
                    min:{value:1,message:"The value must be at least 1"}
                    })} type="number" placeholder="Transaction Value"></InputItem>
            </LabelItem>
            {errors.value && <p className="my-1 text-red-500">{errors.value.message}</p>}

            <LabelItem>
                Date
                <InputItem {...register('date',{required:"The date is required"})} type="date" placeholder="Transaction Date"></InputItem>
            </LabelItem>
            {errors.date && <p className="my-1 text-red-500">{errors.date.message}</p>}

            {isExpense && (
            <LabelItem>
                Category of expense
                <SelectItem {...register('expenseType')}>
                    <option value="">Select a Category of expenses</option>
                    {CATEGORY_TYPES.map(type =>
                        <option key={type} value={type}>
                            {type}
                        </option>
                    )}
                </SelectItem>
            </LabelItem>
            )}
            <LabelItem className="col-span-1 md:col-span-2">
                Description
                <InputItem {...register("description", {required: "Description is required"})} type="text" placeholder="Transaction Description"></InputItem>
            </LabelItem>
            {errors.description && <p className="my-1 text-red-500">{errors.description.message}</p>}
        </div>
        <div className="my-8">
            <Button variant="default">Save</Button>
        </div>
    </form>
    )
}