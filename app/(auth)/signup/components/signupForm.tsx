'use client'

import Button from '@/components/button'
import LabelItem from '@/components/labelForm'
import { signup } from '@/lib/actions'
import { useState } from 'react'

export default function SignupForm() { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') // Novo estado
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('The passwords do not coincide')
            return
        }

        if (password.length < 6) {
            setError('The password should have at least 6 characters.')
            return
        }

        setLoading(true)

        try {
            const result = await signup({ email, password })

            if (result?.error) {
                setError(result.error)
            }
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <LabelItem htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Email
                        </LabelItem>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="seu@email.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <LabelItem htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Password
                        </LabelItem>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <LabelItem htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </LabelItem>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                confirmPassword && password !== confirmPassword 
                                ? 'border-red-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Create account'}
                    </Button>
                </form>
            </div>
        </div>
    )
}