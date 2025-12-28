'use server'
import { TransactionProps } from '@/types/transactions'
import { revalidateTag } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validator'

export async function purgeTransactionListCache() {
  revalidateTag('transaction-list','')
}


export async function getTransactionsFilteredByDateAndLimit(startDate : Date, offset : number, limit : number){
  
  const supabase = await createClient()

    const { data: transactions, error } = await supabase
            .from('transactions')
            .select()
            .gte("date", startDate.toISOString())
            .range(offset, offset + limit - 1)
            .order('created_at', {ascending: false})

    if (error) {
      throw new Error('Error Fetching transactions: ' + error.message)
    }

    return transactions
}

export async function getTransactionsFilteredByDate(startDate : Date){
    const supabase = await createClient()

    const { data: transactions, error } = await supabase
            .from('transactions')
            .select()
            .gte("date", startDate.toISOString())
            .order('created_at', {ascending: false})

    if (error) {
      throw new Error('Error Fetching transactions: ' + error.message)
    }

    return transactions
}

export async function createTransaction(data : TransactionProps){

  const validated =  transactionSchema.safeParse(data)

  if(!validated.success){
    throw new Error('Invalid Data on the form.')
  }

  const supabase = await createClient()

  const { error } = await supabase
          .from('transactions')
          .insert(validated.data)

          if(error){
            throw new Error ('Something went wrong while creating the transactions')
          }

          await purgeTransactionListCache()

}