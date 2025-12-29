'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateTransaction } from '@/lib/actions'
import { TransactionProps } from '@/types/transactions'
import Button from '@/components/button'
import SelectItem from '@/components/selectForm'
import LabelItem from '@/components/labelForm'
import { TRANSACTION_TYPES } from '@/lib/types'
import InputItem from '@/components/inputForm'

export type TransactionFormData = {
  description: string
  value: number
  type: 'Income' | 'Expense' | 'Investment' | 'Saving'
  expenseType?: string
  date?: string
}

export default function TransactionEditModal({ 
    transaction, 
    isOpen, 
    onClose, 
    onUpdate 
    }: { 
    transaction: TransactionProps
    isOpen: boolean
    onClose: () => void
    onUpdate: (updated: TransactionProps) => void
    }) {
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit } = useForm<TransactionFormData>({
    defaultValues: {
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      expenseType: transaction.expenseType
    }
  })

  const onSubmit = async (data: TransactionFormData) => {
    setLoading(true)
    try {
      await updateTransaction(transaction.id, data)
      onUpdate({ ...transaction, ...data })
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <LabelItem className="block mb-2">Description</LabelItem>
            <InputItem
              {...register('description')}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>

          <div>
            <LabelItem className="block mb-2">Value</LabelItem>
            <InputItem
              type="number"
              step="0.01"
              {...register('value', { valueAsNumber: true })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>

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
          </div>

          <div>
            <LabelItem className="block mb-2">Date</LabelItem>
            <InputItem
                type="date" {...register('date')}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}