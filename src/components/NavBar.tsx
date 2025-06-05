import { useEffect, useState } from 'react'

interface NavbarProps {
  isMenuOpen: boolean
  onToggle: () => void
}

const Navbar = ({ isMenuOpen, onToggle }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`navbar ${isScrolled && !isMenuOpen ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a
        href="#"
        className="logo"
        aria-label="Nordic Code Works - Home"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-700 group-hover:[&>path]:stroke-blue-500 group-hover:[&>rect]:stroke-blue-500"
          aria-hidden="true"
        >
          <path
            d="M10 5L20 35M20 5L30 35M30 5L40 35M40 5L50 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="5"
            y="5"
            width="50"
            height="30"
            stroke="currentColor"
            strokeWidth="2"
            rx="4"
          />
        </svg>
        <span className="font-heading">NCW</span>
      </a>
      
      {/* Menu Toggle Button - Simplified */}
      <button
        className="menu-toggle"
        onClick={onToggle}
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="menu-text">
          {isMenuOpen ? 'Close' : 'Menu'}
        </span>
      </button>
    </nav>
  )
}

export default Navbar