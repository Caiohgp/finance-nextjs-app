import Link from "next/link";

export default function SideNavigation(){
    return(
        <div className="flex flex-col space-y-4">
           <Link className="hover:text-blue-500" href="./preferences"> Preferences</Link>
           <Link className="hover:text-blue-500" href="./profile"> Profile</Link>
        </div>
        
    )
}