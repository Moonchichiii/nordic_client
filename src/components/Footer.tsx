import { Github, Dribbble, Linkedin, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavigationLink {
  href: string
  label: string
}

interface SocialLink {
  href: string
  label: string
  icon: LucideIcon
}

const navigationLinks: NavigationLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks: SocialLink[] = [
  { href: '#', label: 'Github', icon: Github },
  { href: '#', label: 'Dribbble', icon: Dribbble },
  { href: '#', label: 'LinkedIn', icon: Linkedin },
  { href: '#', label: 'Twitter', icon: Twitter },
]

const legalLinks: NavigationLink[] = [
  { href: '#privacy', label: 'Privacy Policy' },
  { href: '#terms', label: 'Terms of Service' },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="py-20 bg-slate-200 dark:bg-slate-800 relative overflow-hidden
                     transition-colors duration-700" 
            role="contentinfo">
      <div
        className="absolute top-[-30%] right-[-10%] w-[80vmin] h-[80vmin] rounded-full 
                 bg-gradient-radial from-purple-600/10 to-transparent blur-3xl
                 dark:from-purple-600/20 dark:to-transparent"
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white 
                          text-2xl font-black transition-colors duration-700">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
              <span>NCW</span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed
                        transition-colors duration-700">
              Creating exceptional digital experiences since 2020. Nordic precision meets creative technology.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white
                         transition-colors duration-700">Sitemap</h3>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-600 dark:text-slate-400 
                               hover:text-blue-600 dark:hover:text-blue-400 
                               transition-colors duration-300 
                               focus-visible:outline-none focus-visible:text-blue-600 
                               dark:focus-visible:text-blue-400 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white
                         transition-colors duration-700">Connect</h3>
            
            <nav role="navigation" aria-label="Social media links">
              <ul className="flex gap-4">
                {socialLinks.map(({ href, label, icon: Icon }, index) => (
                  <li key={index}>
                    <a
                      href={href}
                      className="w-10 h-10 bg-slate-300/50 dark:bg-white/5 rounded-full 
                               flex items-center justify-center 
                               text-slate-700 dark:text-white 
                               hover:bg-blue-600 hover:text-white
                               hover:-translate-y-1 transition-all duration-300 
                               focus-visible:outline-none focus-visible:ring-2 
                               focus-visible:ring-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${label} page (opens in new tab)`}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <a
              href="mailto:contact@nordiccodeworks.com"
              className="block text-slate-600 dark:text-slate-400 
                       hover:text-slate-900 dark:hover:text-white 
                       transition-colors duration-300 
                       focus-visible:outline-none focus-visible:text-slate-900 
                       dark:focus-visible:text-white"
            >
              contact@nordiccodeworks.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-300/50 dark:border-white/10 pt-6 
                      text-sm text-slate-600 dark:text-slate-400 
                      flex flex-col md:flex-row justify-between gap-4 relative z-10
                      transition-colors duration-700">
          <p>© 2025 Nordic Code Works. All rights reserved.</p>
          
          <nav role="navigation" aria-label="Legal links">
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-slate-900 dark:hover:text-white 
                             transition-colors duration-300 
                             focus-visible:outline-none focus-visible:text-slate-900 
                             dark:focus-visible:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}