'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validator'
import { TransactionFormData } from '@/app/dashboard/components/transactionEditModal'
import { LoginForm } from '@/app/(auth)/login/components/loginform'
import { redirect } from 'next/navigation'
import { TransactionAddProps } from '@/app/dashboard/components/transactionForm'

export async function purgeTransactionListCache() {
  revalidateTag('transaction-list', '')
}

export async function getTransactionsFilteredByDateAndLimit(startDate: Date, offset: number, limit: number) {

  const supabase = await createClient()

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select()
    .gte("date", startDate.toISOString())
    .range(offset, offset + limit - 1)
    .order('date', { ascending: false })

  if (error) {
    throw new Error('Error Fetching transactions: ' + error.message)
  }

  return transactions
}

export async function getTransactionsFilteredByDate(startDate: Date) {
  const supabase = await createClient()

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select()
    .gte("date", startDate.toISOString())
    .order('date', { ascending: false })

  if (error) {
    throw new Error('Error Fetching transactions: ' + error.message)
  }

  return transactions
}

export async function createTransaction(data: TransactionAddProps) {

  const validated = transactionSchema.safeParse(data)

  if (!validated.success) {
    throw new Error('Invalid Data on the form.')
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('transactions')
    .insert(validated.data)

  if (error) {
    throw new Error('Something went wrong while creating the transactions')
  }

  await purgeTransactionListCache()

}

export async function deleteTransaction(id: string) {

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
  const supabase = await createClient();

  const authData = {
    email: formData.email,
    password: formData.password
  };

  const { error } = await supabase.auth.signInWithPassword(authData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Erro na autenticação:", error.message);
    return { error: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getCurrentUser() {
  const supabase = await createClient(); //

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function signup(formData: LoginForm) {
  const supabase = await createClient()

  const data = {
    email: formData.email as string,
    password: formData.password as string,
    options: {
    data: {
      user_type: 'standard',
    },
  },
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function uploadAvatar(prevState: unknown, formData: FormData) {
  

  const supabase = await createClient()
  const file = formData.get('file') as File
  const fileExt = file.name.split('.').pop()

  const user = await getCurrentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const fileName = `${user.id}.${fileExt}`

  const { data: fileExists } = await supabase
    .storage
    .from('Avatar Images')
    .exists(fileName);

  if (fileExists) {
    deleteAvatar(fileName)
  }

  const { error } = await supabase.storage
    .from('Avatar Images')
    .upload(fileName, file)

  if (error) {
    return {
      error: true,
      message: 'Error when uploading the avatar'
    }
  }

  updateUserAvatar(fileName)

  return {
    error: false,
    message: 'Avatar successfully uploaded'
  }
}

export async function setUserName(prevState: unknown, formData: FormData) {

  const supabase = await createClient()

  const user = await getCurrentUser()

  const name = formData.get('name') as string;

  if (!user) {
    throw new Error('User not found')
  }

  const { error: dataUpdateError } = await supabase.auth
    .updateUser({
      data: {
        name : name,
      }
    })

  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error updating your user'
    }
  }

  return {
    error: false,
    message: 'Information updated'
  }
}

export async function deleteAvatar(fileName: string) {

  const supabase = await createClient()

  const { error } = await supabase
    .storage
    .from('Avatar Images')
    .remove([`${fileName}`])

  if (error) {
    return {
      error: true,
      message: 'Error deleting the previous avatar'
    }
  }
}

export async function updateUserAvatar(fileName?: string) {

  const supabase = await createClient()

  const { error: dataUpdateError } = await supabase.auth
    .updateUser({
      data: {
        avatar: fileName
      }
    })

  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error associating the avatar with the user'
    }
  }

}