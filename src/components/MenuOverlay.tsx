import { Github, Dribbble, Linkedin, Twitter, X } from 'lucide-react'

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

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const handleLinkClick = (event: React.MouseEvent, href: string) => {
    event.preventDefault()
    
    onClose()
    
    setTimeout(() => {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-slate-900/95 backdrop-blur-lg
                 transition-all duration-300 ${
                   isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                 }`}
      id="main-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="min-h-screen flex flex-col justify-between p-6 pt-24 md:p-12 md:pt-32">
        
        <button
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-[1020] 
                   w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 
                   rounded-xl flex items-center justify-center text-white
                   hover:bg-white/20 hover:border-white/40 hover:scale-110
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                   transition-all duration-300 shadow-lg"
          aria-label="Close menu"
        >
          <X size={24} strokeWidth={2} className="drop-shadow-sm" />
        </button>

        <div className="flex-grow flex items-center">
          <div className="w-full max-w-7xl mx-auto">
            
            <ul className="space-y-6 md:space-y-8 mb-16 list-none">
              {menuLinks.map((link, index) => (
                <li 
                  key={index} 
                  className="overflow-hidden"
                  style={{
                    animationDelay: isOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <a
                    href={link.href}
                    className={`block text-white font-heading text-5xl md:text-7xl lg:text-8xl
                             font-black uppercase tracking-tighter leading-none
                             hover:text-blue-400 hover:translate-x-4
                             focus-visible:outline-none focus-visible:text-blue-400
                             transition-all duration-500 ease-out
                             ${isOpen ? 'animate-in slide-in-from-left duration-700' : 'opacity-0'}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-label={link.description}
                    style={{
                      animationDelay: isOpen ? `${index * 100 + 200}ms` : '0ms',
                      animationFillMode: 'both'
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            <ul className={`flex gap-4 list-none ${
              isOpen ? 'animate-in slide-in-from-bottom duration-700' : 'opacity-0'
            }`}
                style={{
                  animationDelay: isOpen ? '600ms' : '0ms',
                  animationFillMode: 'both'
                }}>
              {socialLinks.map(({ icon: Icon, href, title }, index) => (
                <li key={index}>
                  <a
                    href={href}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center
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
          </div>
        </div>

        <footer className={`pt-6 border-t border-white/20 ${
          isOpen ? 'animate-in slide-in-from-bottom duration-700' : 'opacity-0'
        }`}
                style={{
                  animationDelay: isOpen ? '800ms' : '0ms',
                  animationFillMode: 'both'
                }}>
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
            <a
              href="mailto:contact@nordiccodeworks.com"
              className="text-slate-300 hover:text-white transition-colors duration-300 text-lg
                       focus-visible:outline-none focus-visible:text-white"
            >
              contact@nordiccodeworks.com
            </a>
            
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
          </div>
        </footer>
      </div>
    </div>
  )
}

export default MenuOverlay
