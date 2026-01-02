'use client'
import { logout } from "@/lib/actions"
import Button from "./button"
import { LogOut, Loader } from 'lucide-react'
import { useState } from "react"

export default function LogoutButton() {

    const [isSigningOut, setSigningOut] = useState(false)

    async function handleLogout() {

        try {
            setSigningOut(true)
            const result = await logout()

            if (result?.error) {
                console.log("Error when signing out")
                throw new Error(result.error)
            }
            
        }finally{
            setSigningOut(false)
        }
        
    }
    return (
        <Button onClick={handleLogout} variant="ghost">
            {!isSigningOut && <LogOut className="w-6 h-6" />}
            {isSigningOut && <Loader className="animate-spin" />}
        </Button>
    )
}