'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import Button from '@/components/button'
import TransactionEditModal from './transactionEditModal'
import { TransactionProps } from '@/types/transactions'

export default function TransactionEditButton({ 
  transaction, 
  onUpdate 
}: { 
  transaction: TransactionProps
  onUpdate?: (updated: TransactionProps) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button 
        variant="ghost" 
        size="tiny" 
        onClick={() => setIsOpen(true)}
      >
        <Pencil className="text-black dark:text-white" />
      </Button>

      <TransactionEditModal
        transaction={transaction}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdate={(updated: TransactionProps) => {
          if (onUpdate) onUpdate(updated)
          setIsOpen(false)
        }}
      />
    </>
  )
}