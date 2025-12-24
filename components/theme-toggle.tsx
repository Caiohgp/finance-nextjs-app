'use client'

import { useTheme } from 'next-themes'

export function ThemeToggle() {

  const { setTheme, resolvedTheme } = useTheme()

  console.log('Resolved Theme:', resolvedTheme);

  return (

    <button

      onClick={() =>  setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Alternar tema"
      suppressHydrationWarning
    >
      
      <span suppressHydrationWarning>
        {resolvedTheme === 'dark' ? '🌞' : '🌙'}
      </span>
    </button>
  )
}