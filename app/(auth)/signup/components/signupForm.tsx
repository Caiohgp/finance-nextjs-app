'use client'

import Button from '@/components/button'
import LabelItem from '@/components/labelForm'
import { signup } from '@/lib/actions'
import { useState } from 'react'

export type LoginForm = {
    email: string
    password: string
}

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signup({ email, password })

            if (result?.error)
                console.log("error")
            setError(result.error)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    Signup
                </h1>

                <div className="space-y-6">
                    {/* Email */}
                    <div>
                        <LabelItem
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                            Email
                        </LabelItem>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all"
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <LabelItem
                            htmlFor="password"
                            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </LabelItem>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all"
                            placeholder="••••••••"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmit(e)
                            }}
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                     rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     focus:ring-4 focus:ring-blue-300"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Submit...
                            </span>
                        ) : (
                            'Submit'
                        )}
                    </Button>

                </div>
            </div>
        </div>
    )
}