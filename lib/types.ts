export const TRANSACTION_TYPES = [
  'Income',
  'Expense',
  'Investment',
  'Saving',
] as const

export const CATEGORY_TYPES = [
  'BILLS',
  'FOOD',
  'CAR',
  'HOUSE',
  'FUN',
  'SUBSCRIPTION',
  'EDUCATION'
]

export type TransactionType = typeof TRANSACTION_TYPES[number]