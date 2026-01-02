import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logoutButton";
import Button from "./button";
import {CircleUser} from "lucide-react"

export default async function Header() {

    const supabase = await createClient();
    
    const {data: {user}, error} = await supabase.auth.getUser()

    return (
        <header className="align-center my-4 flex justify-between">
            <div className="space-x-6">
                <Link href="/dashboard" className="text-2xl font-bold">
                    App
                </Link>
            </div>

            <div className="flex space-x-6 items-center">
                <ThemeToggle/>
                
                <div >
                    <Button variant="ghost" className="flex space-x-6">
                        <CircleUser className="w-6 h-6 mr-1" />
                        {user && user.email}
                    </Button>
                </div>
                {!user && <Link href="/login" className="text-2xl font-bold">
                        Login
                    </Link>}
                {user && <LogoutButton/>}
            </div>

        </header>
    );
}