import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type Theme } from '@/hooks/useTheme'

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      const maxScroll = documentHeight - windowHeight
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0
      
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    calculateScrollProgress()
    window.addEventListener('scroll', calculateScrollProgress, { passive: true })
    window.addEventListener('resize', calculateScrollProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress)
      window.removeEventListener('resize', calculateScrollProgress)
    }
  }, [])

  return scrollProgress
}

const themeIcons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor
}

const themeLabels: Record<Theme, string> = {
  light: 'Light mode',
  dark: 'Dark mode', 
  system: 'System mode'
}

interface NavbarProps {
  isMenuOpen: boolean
  onToggle: () => void
}

export default function Navbar({ isMenuOpen, onToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme, nextTheme } = useTheme()
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ThemeIcon = themeIcons[theme]

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-glass' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white hover:text-blue-400 
                     transition-colors duration-300 focus:outline-none"
            aria-label="Nordic Code Works - Return to top"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <path
                d="M6 4L10 28M10 4L16 28M16 4L22 28M22 4L26 28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="4"
                y="4"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                rx="3"
              />
            </svg>
            <span className="font-black text-lg tracking-tight">NCW</span>
          </button>

          <div className="flex items-center gap-8">
            
            <button
              onClick={toggleTheme}
              className="text-slate-300 hover:text-white transition-colors duration-300
                       focus:outline-none group"
              aria-label={`${themeLabels[theme]}. Click to switch to ${themeLabels[nextTheme]}`}
              title={`Switch to ${themeLabels[nextTheme]}`}
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <ThemeIcon size={18} aria-hidden="true" />
              </div>
            </button>

            <button
              onClick={onToggle}
              className="text-white hover:text-blue-400 transition-colors duration-300 
                       focus:outline-none group relative"
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
              aria-label="Open main menu"
            >
              <span className="text-sm font-bold uppercase tracking-wider">
                MENU
              </span>
              
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 
                            group-hover:w-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  )
}
