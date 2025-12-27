import { z } from 'zod'
import { TRANSACTION_TYPES } from '@/lib/types'

export const transactionSchema = z.object({

   type: z.enum(TRANSACTION_TYPES, {
      message: 'Transaction type is required',
      invalid_type_error: 'Invalid transaction type',
    }),

    value: z
    .number({
        message: 'This field must be a number.',
    })
    .min(1,{message:'Value has to be bigger than 0'}),

    date: z.string({
        message: 'Date is required',
    }),

    expenseType: z.string().optional(),

    description: z
        .string({
        message: 'Description is required',
        })
        .min(1, 'Description cannot be empty'),

})
.superRefine((data, ctx) => {
  if (data.type === 'Expense' && !data.expenseType) {
    ctx.addIssue({
      code: 'custom',
      path: ['expenseType'],
      message: 'Category of expense is required for Expense transactions',
    })
  }
})