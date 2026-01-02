'use client'

import Button from "@/components/button"
import InputItem from "@/components/inputForm"
import { uploadAvatar } from "@/lib/actions"

export default function AvatarPage() {

    return <div className="flex flex-col">
        <h1 className="text-4xl font-semibold mb-8">
            Avatar
        </h1>
        <form className="space-y-4" action={uploadAvatar}>
            <InputItem type="file" name="file" id="file" />
            <Button type="submit">Upload Avatar</Button>
        </form>
    </div>
}