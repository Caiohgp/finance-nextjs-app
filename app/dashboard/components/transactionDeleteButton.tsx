'use client'

import Button from "@/components/button";
import { deleteTransaction } from "@/lib/actions";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";


export default function TransactionDeleteButton({id,onDelete}:{id : string,onDelete?: () => void}){

    const [confirm,setConfirm] = useState(false)
    const [loading,setLoading] = useState(false)
    
    const handleClick = async() =>{
        
        if(!confirm){
            setConfirm(true)
            setTimeout(() => setConfirm(false), 4000)

            return
        }

        try{
            console.log(id)
            setLoading(confirm)
            await deleteTransaction(id)
                        // ✅ CHAMA onDelete APÓS DELETAR COM SUCESSO
            if (onDelete) {
                onDelete()
            }
        }catch (error) {
            throw new Error('Erro ao deletar')
        }finally{
            setLoading(false)
        }      
         
    }
    
    return(
        <Button variant={confirm ? "delete" : "ghost"} size="tiny" onClick={handleClick}>
            {loading && <Loader className="animate-spin" />}
            {!loading && <Trash2 className="text-black dark:text-white" />}
        </Button>
    )
}