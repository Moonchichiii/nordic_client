// src/hooks/useTheme.ts - FIXED VERSION
import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'system'

// Apply theme function (extracted so we can use it immediately)
const applyTheme = (newTheme: 'light' | 'dark') => {
  const root = document.documentElement
  
  // Remove existing classes
  root.classList.remove('light', 'dark')
  
  // Add new theme class
  root.classList.add(newTheme)
  
  // Update CSS custom properties
  if (newTheme === 'dark') {
    root.style.setProperty('--theme-color', '#60a5fa')
    root.style.setProperty('--accent-color', '#a78bfa')
  } else {
    root.style.setProperty('--theme-color', '#3b82f6')
    root.style.setProperty('--accent-color', '#8b5cf6')
  }
}

// Get system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    
    const stored = localStorage.getItem('nordic-theme') as Theme | null
    const initialTheme = stored || 'dark'
    
    // Apply theme IMMEDIATELY on initialization
    const resolvedTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme
    applyTheme(resolvedTheme)
    
    return initialTheme
  })

  // Handle theme changes
  useEffect(() => {
    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme
    applyTheme(resolvedTheme)
    
    // Save to localStorage
    localStorage.setItem('nordic-theme', theme)
  }, [theme])

  // Listen for system changes when using system theme
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyTheme(getSystemTheme())

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const nextTheme: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'

  return {
    theme,
    setTheme,
    nextTheme,
    toggleTheme: () => setTheme(nextTheme)
  }
}