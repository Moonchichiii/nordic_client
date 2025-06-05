import { useEffect } from 'react'
import { Github, Dribbble, Linkedin, Twitter, X } from 'lucide-react'
import { menuAnimations } from '@utils/gsap'

interface MenuLink {
  title: string
  href: string
  description: string
}

interface SocialLink {
  title: string
  href: string
  icon: typeof Github
}

const menuLinks: MenuLink[] = [
  { title: 'Work', href: '#work', description: 'View our portfolio' },
  { title: 'Process', href: '#process', description: 'How we work' },
  { title: 'About', href: '#about', description: 'Our story' },
  { title: 'Contact', href: '#contact', description: 'Get in touch' },
]

const socialLinks: SocialLink[] = [
  { title: 'Github', href: '#', icon: Github },
  { title: 'Dribbble', href: '#', icon: Dribbble },
  { title: 'LinkedIn', href: '#', icon: Linkedin },
  { title: 'Twitter', href: '#', icon: Twitter },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

const MenuOverlay = ({ isOpen, onClose, onToggle }: MenuOverlayProps) => {
  // GSAP Animation setup
  useEffect(() => {
    if (isOpen) {
      menuAnimations.openMenu('.menu-link', '.menu-social', '.menu-footer')
    }
  }, [isOpen])

  const handleLinkClick = (event: React.MouseEvent, href: string) => {
    event.preventDefault()
    
    // Animate out before closing
    const closeAnimation = menuAnimations.closeMenu('.menu-link', '.menu-social', '.menu-footer')
    
    closeAnimation.call(() => {
      onClose()
      // Scroll to section after menu closes
      setTimeout(() => {
        const element = document.querySelector(href)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  }

  return (
    <div
      className={`menu-overlay ${isOpen ? 'open' : ''}`}
      id="main-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
      aria-hidden={!isOpen}
    >
      {/* Close Button - Prominent and Visible */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[1020] 
                 w-14 h-14 bg-white/20 backdrop-blur-lg border-2 border-white/30 
                 rounded-full flex items-center justify-center text-white
                 hover:bg-white/30 hover:border-white/50 hover:scale-110
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                 transition-all duration-300 shadow-lg"
        aria-label="Close menu"
      >
        <X size={28} strokeWidth={2.5} className="drop-shadow-sm" />
      </button>

      <div className="min-h-screen flex flex-col justify-between p-6 pt-24 md:p-12 md:pt-32">
        {/* Screen reader title */}
        <h2 id="menu-title" className="visually-hidden">
          Main Navigation Menu
        </h2>

        {/* Main Menu Content */}
        <div className="flex-grow flex items-center">
          <div className="w-full max-w-7xl mx-auto">
            <nav role="navigation" aria-label="Main menu">
              <ul className="space-y-6 md:space-y-8 mb-12 list-none">
                {menuLinks.map((link, index) => (
                  <li key={index} className="overflow-hidden">
                    <a
                      href={link.href}
                      className="menu-link text-white font-heading text-5xl md:text-7xl lg:text-8xl
                               block transition-all duration-400 hover:text-blue-500
                               focus-visible:outline-none focus-visible:text-blue-500
                               transform will-change-transform"
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-describedby={`menu-desc-${index}`}
                    >
                      {link.title}
                    </a>
                    <span id={`menu-desc-${index}`} className="visually-hidden">
                      {link.description}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <nav role="navigation" aria-label="Social media links">
              <ul className="flex gap-6 list-none">
                {socialLinks.map(({ icon: Icon, href, title }, index) => (
                  <li key={index}>
                    <a
                      href={href}
                      className="menu-social size-12 bg-white/10 rounded-full flex items-center justify-center
                               text-white hover:bg-blue-600 hover:-translate-y-1
                               transition-all duration-300 hover:scale-110
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${title} page (opens in new tab)`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Menu Footer */}
        <footer className="menu-footer mt-12 pt-6 border-t border-white/20">
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
            <a
              href="mailto:hello@nordiccodeworks.com"
              className="text-slate-300 hover:text-white transition-colors duration-300 text-lg
                       focus-visible:outline-none focus-visible:text-white"
            >
              hello@nordiccodeworks.com
            </a>
            
            <nav role="navigation" aria-label="Footer links">
              <ul className="flex flex-col md:flex-row gap-6 md:gap-12 list-none">
                <li>
                  <a
                    href="#privacy"
                    className="text-slate-400 hover:text-white transition-colors duration-300
                             focus-visible:outline-none focus-visible:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-slate-400 hover:text-white transition-colors duration-300
                             focus-visible:outline-none focus-visible:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <span className="text-slate-400">
                    © 2025 Nordic Code Works
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default MenuOverlay