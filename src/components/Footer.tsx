import { Github, Dribbble, Linkedin, Twitter } from 'lucide-react'

interface NavigationLink {
  href: string
  label: string
}

interface SocialLink {
  href: string
  label: string
  icon: typeof Github
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

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="py-20 bg-slate-800 relative overflow-hidden" role="contentinfo">
      {/* Background decoration */}
      <div 
        className="absolute top-[-30%] right-[-10%] w-[80vmin] h-[80vmin] 
                   rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] 
                   bg-[radial-gradient(circle_at_center,_var(--color-accent-purple),_transparent_70%)] 
                   opacity-10 blur-3xl"
        aria-hidden="true"
      />
      
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 relative z-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white text-2xl font-heading">
              <svg 
                width="45" 
                height="30" 
                viewBox="0 0 60 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
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
              <span>NCW</span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Creating exceptional digital experiences since 2020. Nordic precision meets creative technology.
            </p>
          </div>
          
          {/* Navigation Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Sitemap</h3>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-3 list-none">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-400 hover:text-blue-500 transition-colors duration-300
                               focus-visible:outline-none focus-visible:text-blue-500 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Connect Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Connect</h3>
            
            {/* Social Links */}
            <nav role="navigation" aria-label="Social media links">
              <ul className="flex gap-4 list-none">
                {socialLinks.map(({ href, label, icon: Icon }, index) => (
                  <li key={index}>
                    <a
                      href={href}
                      className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center 
                               text-white hover:bg-blue-600 hover:-translate-y-1 
                               transition-all duration-300 focus-visible:outline-none 
                               focus-visible:ring-2 focus-visible:ring-blue-500"
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
            
            {/* Contact Email */}
            <a
              href="mailto:contact@nordiccodeworks.com"
              className="block text-slate-400 hover:text-white transition-colors duration-300
                       focus-visible:outline-none focus-visible:text-white"
            >
              contact@nordiccodeworks.com
            </a>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 text-sm text-slate-400 
                      flex flex-col md:flex-row justify-between gap-4 relative z-10">
          <p>© 2025 Nordic Code Works. All rights reserved.</p>
          
          <nav role="navigation" aria-label="Legal links">
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 list-none">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300
                             focus-visible:outline-none focus-visible:text-white"
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

export default Footer