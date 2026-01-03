import { createClient } from "@/lib/supabase/server";
import UserData from "../components/userData";

export default async function ProfilePage() {
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    console.log(user)
    
    return (<div className="flex flex-col">
        <UserData/>
    </div>)
}