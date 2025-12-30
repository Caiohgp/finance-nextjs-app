import { sizes,variants } from "@/lib/variants";
import Link from "next/link";
import { ChevronLeft } from "lucide-react"

export default function Layout({children}: {children : any}){
    return (
    <main>
    <div className="left-8 top-8 w-15">
      <Link href="/" className={`${variants['ghost']} ${sizes['base']} flex items-center space-x-2 text-sm`}>
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
    </div>
    <div className="mt-8">
      {children}
    </div>
  </main>
    )
}