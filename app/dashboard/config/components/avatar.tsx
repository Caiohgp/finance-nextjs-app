'use client'

import Alert from "@/components/alert"
import Button from "@/components/button"
import InputItem from "@/components/inputForm"
import { uploadAvatar } from "@/lib/actions"
import { Ban, Check } from "lucide-react"
import { useActionState } from "react"

const initialState = {
        message:'',
        error:false
}

export default function AvatarUpload() {

    const [state,formAction] = useActionState(uploadAvatar, initialState)

    return <div className="flex flex-col">
        <h1 className="text-4xl font-semibold mb-8">
            Avatar
        </h1>
        <form className="space-y-4" action={formAction}>
            {state?.error && <Alert icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />} title={<span className="text-red-700 dark:text-red-300">Error</span>}><span className="text-red-700 dark:text-red-300">{state.message}</span></Alert>}
            {!state?.error && state?.message && <Alert icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />} title={<span className="text-green-700 dark:text-green-300">Success</span>}><span className="text-green-700 dark:text-green-300">{state.message}</span></Alert>}
            <InputItem type="file" name="file" id="file" />
            <Button type="submit">Upload Avatar</Button>
        </form>
    </div>
}