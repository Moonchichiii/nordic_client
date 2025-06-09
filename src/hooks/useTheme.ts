// hooks/useTheme.ts
import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  // Start with dark theme since you love your current design
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
   
    const stored = localStorage.getItem('nordic-theme') as Theme | null
    return stored || 'dark' // Default to dark mode
  })

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
   
    // Remove existing classes
    root.classList.remove('light', 'dark')
   
    // Add new theme class - this makes all dark: classes work
    root.classList.add(newTheme)
   
    // Update CSS custom properties for any CSS that uses them
    if (newTheme === 'dark') {
      root.style.setProperty('--theme-color', '#60a5fa')
      root.style.setProperty('--accent-color', '#a78bfa')
    } else {
      root.style.setProperty('--theme-color', '#3b82f6')
      root.style.setProperty('--accent-color', '#8b5cf6')
    }

    // Update meta theme-color for mobile browser chrome
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.setAttribute('name', 'theme-color')
      document.head.appendChild(themeColorMeta)
    }
    themeColorMeta.setAttribute('content', newTheme === 'dark' ? '#0f172a' : '#ffffff')
  }

  // Handle theme changes
  useEffect(() => {
    applyTheme(theme)
   
    // Save to localStorage
    try {
      localStorage.setItem('nordic-theme', theme)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
  }, [theme])

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme)
  }, []) // Only run once on mount

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return {
    theme,
    setTheme,
    toggleTheme
  }
}