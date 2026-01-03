import Link from "next/link";
import { Settings, User, Camera } from 'lucide-react'

export default function SideNavigation() {
    return (
        <div className="flex flex-col space-y-4">
            <Link className="flex hover:text-blue-500" href="./preferences">
                <Settings className="mr-2" />
                Preferences
            </Link>
            <Link className="flex hover:text-blue-500" href="./avatar">
                <Camera className="mr-2" />
                Avatar
            </Link>
            
            <Link className="flex hover:text-blue-500" href="./profile">
                <User className="mr-2" />
                Profile
            </Link>
        </div>

    )
}