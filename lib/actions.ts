'use server'
import { TransactionProps } from '@/types/transactions'
import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validator'
import { TransactionFormData } from '@/app/dashboard/components/transactionEditModal'
import { LoginForm } from '@/app/(auth)/login/components/loginform'
import { redirect } from 'next/navigation' // Adicione este import

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
            .order('date', {ascending: false})

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
            .order('date', {ascending: false})

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

export async function deleteTransaction(id : string){
  
  const supabase = await createClient()

    const { error } = await supabase
            .from('transactions')
            .delete()
            .eq("id", id)

    if (error) {
      throw new Error('Error Fetching transactions: ' + error.message)
    }

    revalidatePath('/dashboard')

}

export async function updateTransaction(
  id: string, 
  data: TransactionFormData
) {
  try {
    const supabase = await createClient()

    const { data: updatedTransaction, error } = await supabase
      .from('transactions')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar transação:', error)
      throw new Error(error.message)
    }

    revalidatePath('/dashboard')

    return { success: true, data: updatedTransaction }
  } catch (error) {
    console.error('Erro na action:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}

export async function login(formData: LoginForm) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}