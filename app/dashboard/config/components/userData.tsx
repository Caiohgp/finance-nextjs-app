'use client'

import Alert from "@/components/alert"
import Button from "@/components/button"
import InputItem from "@/components/inputForm"
import LabelItem from "@/components/labelForm"
import { setUserName } from "@/lib/actions"
import { Ban, Check } from "lucide-react"
import { useActionState } from "react"

const initialState = {
        message:'',
        error:false
}

export default function UserData() {

    const [state,formAction] = useActionState(setUserName, initialState)

    return <div className="flex flex-col">
        <h1 className="text-4xl font-semibold mb-8">
            Profile
        </h1>
        <form className="space-y-4" action={formAction}>
            {state?.error && <Alert icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />} title={<span className="text-red-700 dark:text-red-300">Error</span>}><span className="text-red-700 dark:text-red-300">{state.message}</span></Alert>}
            {!state?.error && state?.message && <Alert icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />} title={<span className="text-green-700 dark:text-green-300">Success</span>}><span className="text-green-700 dark:text-green-300">{state.message}</span></Alert>}
            <LabelItem htmlFor="name">Name</LabelItem>
            <InputItem type="text" name="name" id="name" />
            <Button type="submit">Update Profile</Button>
        </form>
    </div>
}