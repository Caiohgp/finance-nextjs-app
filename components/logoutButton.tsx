'use client'
import { logout } from "@/lib/actions"
import Button from "./button"

async function handleLogout() {
        const result = await logout()

        if (result?.error){
            console.log("Error when signing out")
            throw new Error(result.error)
        }

    }
    
export default function LogoutButton(){
    return (                
    <Button onClick={handleLogout}> Logout </Button>
)
}