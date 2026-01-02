'use client'

import { useTheme } from 'next-themes'
import Button from './button'

export function ThemeToggle() {

  const { setTheme, resolvedTheme } = useTheme()

  return (

    <Button
      variant="ghost" 
      onClick={() =>  setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg transition-colors"
      aria-label="Alternar tema"
      suppressHydrationWarning
    >
      
      <span suppressHydrationWarning>
        {resolvedTheme === 'dark' ? '🌞' : '🌙'}
      </span>
    </Button>
  )
}