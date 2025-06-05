import { useEffect, useState, useCallback } from 'react'
import Layout from '@components/Layout'
import Navbar from '@components/Navbar'
import MenuOverlay from '@components/MenuOverlay'
import Hero from '@pages/Hero'
import Work from '@pages/Work'
import Process from '@pages/Process'
import About from '@pages/About'
import Contact from '@pages/Contact'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Handle body scroll lock and app transformation
  useEffect(() => {
    const body = document.body
    const appContainer = document.querySelector('.app-container')
    
    if (isMenuOpen) {
      // Lock body scroll and transform app
      body.classList.add('menu-open')
      appContainer?.classList.add('menu-open')
    } else {
      // Restore body scroll and app
      body.classList.remove('menu-open')
      appContainer?.classList.remove('menu-open')
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('menu-open')
      appContainer?.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && target.closest('.menu-overlay-content')) {
        return
      }
      if (isMenuOpen && !target.closest('.menu-toggle')) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen, closeMenu])

  return (
    <>
      {/* Menu Overlay */}
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={closeMenu}
        onToggle={toggleMenu}
      />
      
      {/* Main App Container */}
      <div className="app-container">
        <Navbar 
          isMenuOpen={isMenuOpen} 
          onToggle={toggleMenu} 
        />
        
        <Layout>
          <main id="main-content" role="main">
            <Hero />
            <Work />
            <Process />
            <About />
            <Contact />
          </main>
        </Layout>
      </div>
    </>
  )
}

export default App