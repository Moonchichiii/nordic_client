import type { ReactNode } from 'react'
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import Navbar from '@/components/NavBar'
import MenuOverlay from '@/components/MenuOverlay'

// Lazy-load non-critical components
const CookieConsent = lazy(() => import('@/components/CookieConsent'))
const Footer = lazy(() => import('@/components/Footer'))

interface LayoutProps {
  children: ReactNode
}

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

const SectionLoader = ({ className = "" }: { className?: string }) => (
  <div 
    className={`flex items-center justify-center py-20 ${className}`} 
    role="status" 
    aria-label="Loading content"
  >
    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
)

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Memoize event handlers for performance
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  // Manages Escape key press and body scroll locking when menu is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }

    const handleBodyScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = 'var(--scrollbar-width, 2px)'
      } else {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)

    handleBodyScroll()
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isMenuOpen, closeMenu])

  // Close menu on hash change
  useEffect(() => {
    const handleHashChange = () => closeMenu()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [closeMenu])

  // Define handlers for cookie consent actions
  const handleAcceptAllCookies = useCallback(() => {
    console.log('All cookies accepted')
    // Implement analytics initialization here
  }, [])

  const handleRejectAllCookies = useCallback(() => {
    console.log('All cookies rejected')
    // Implement analytics cleanup here
  }, [])

  const handleCustomizeCookies = useCallback((preferences: CookiePreferences) => {
    console.log('Custom cookie preferences:', preferences)
    // Implement selective analytics initialization here
  }, [])

  return (
    <div className="site-container bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar isMenuOpen={isMenuOpen} onToggle={toggleMenu} />

      {/* Main Content Area (affected by menu state) */}
      <div
        className={`min-h-screen transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'transform scale-95 blur-sm pointer-events-none'
            : 'transform scale-100 blur-0'
        }`}
      >
        <main>
          {children}
        </main>

        {/* Application Footer */}
        <Suspense fallback={<SectionLoader className="bg-slate-100 dark:bg-slate-800" />}>
          <Footer />
        </Suspense>
      </div>

      {/* Fullscreen Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onToggle={toggleMenu}
      />

      {/* Cookie Consent Banner */}
      <Suspense fallback={null}>
        <CookieConsent
          companyName="Nordic Code Works"
          onAcceptAll={handleAcceptAllCookies}
          onRejectAll={handleRejectAllCookies}
          onCustomize={handleCustomizeCookies}
        />
      </Suspense>
    </div>
  )
}