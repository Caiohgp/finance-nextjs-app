import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logoutButton";
import CustomLink from "./customLink";
import Avatar from "./avatar";

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
                    <CustomLink variant="ghost" href="/dashboard/config/profile" className="flex items-center space-x-6">
                        <Avatar/>
                        {user && user.email}
                    </CustomLink>
                </div>
                {!user && <Link href="/login" className="text-2xl font-bold">
                        Login
                    </Link>}
                {user && <LogoutButton/>}
            </div>

        </header>
    );
}