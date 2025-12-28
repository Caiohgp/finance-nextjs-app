'use client'

import SelectItem from "@/components/selectForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range(){

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const range = searchParams.get('range') ?? 'month'

    const handleChange = (e: { target: { value: string; }; }) => {
        const params = new URLSearchParams()
        params.set('range', e.target.value)
        replace(`${pathname}?${params.toString()}`)
    }
    
    return(
        <SelectItem className="min-w-[150px]" value={range} onChange={handleChange}>
            <option value="today">Today</option>
            <option value="week">7 days</option>
            <option value="month">1 Month</option>
            <option value="semester">6 Months</option>
            <option value="year">12 Months</option>
        </SelectItem>
    )
}