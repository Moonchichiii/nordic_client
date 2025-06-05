import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')

  // Theme management with Tailwind 4.0 best practices
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'dark'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement

    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
    } else {
      root.classList.toggle('dark', newTheme === 'dark')
    }

    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} />
      case 'dark':
        return <Moon size={20} />
      case 'system':
        return <Monitor size={20} />
    }
  }

  const scrollToWork = () => {
    const workSection = document.getElementById('work')
    workSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden
                 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50
                 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                 transition-all duration-700"
      aria-labelledby="hero-title"
    >
      {/* Theme Toggle - Top Right */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-2xl
                   bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg
                   border border-slate-200 dark:border-slate-700
                   text-slate-600 dark:text-slate-300
                   hover:text-blue-600 dark:hover:text-blue-400
                   hover:scale-110 hover:rotate-12
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-all duration-300 shadow-lg hover:shadow-xl
                   flex items-center justify-center"
        aria-label={`Switch to ${
          theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
        } mode`}
      >
        {getThemeIcon()}
      </button>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Light mode gradients */}
        <div
          className="absolute top-1/4 right-1/3 w-[60vmin] h-[60vmin]
                      bg-gradient-to-r from-blue-200/30 to-purple-200/20 rounded-full blur-3xl
                      dark:from-blue-600/10 dark:to-purple-600/8"
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[50vmin] h-[50vmin]
                      bg-gradient-to-r from-purple-200/20 to-blue-200/15 rounded-full blur-3xl
                      dark:from-purple-600/8 dark:to-blue-600/6"
        />

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/40 dark:bg-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400/30 dark:bg-purple-500/20 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-blue-300/50 dark:bg-blue-400/30 rounded-full animate-pulse delay-1000" />
      </div>

      {/* CENTERED RESPONSIVE LAYOUT */}
      <div className="w-full max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* MAIN TITLE - Ultra Bold */}
          <div className="space-y-4">
            <h1
              ref={titleRef}
              id="hero-title"
              className="font-black tracking-tighter text-center
                       text-slate-900 dark:text-white
                       drop-shadow-sm"
              style={{
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                lineHeight: '0.75',
                fontWeight: '900',
              }}
            >
              <span className="block text-slate-900 dark:text-slate-100">NORDIC</span>
              <span
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 
                             bg-clip-text text-transparent font-black"
              >
                CODE
              </span>
              <span className="block text-slate-800 dark:text-slate-200">WORKS</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl lg:text-3xl font-medium text-center max-w-2xl mx-auto
                       text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              Digital experiences with{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">Nordic precision</span>
            </p>
          </div>

          {/* MODERNIZED CTA BUTTONS - No Frame */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center max-w-lg mx-auto"
          >
            {/* Primary CTA - Clean & Modern */}
            <button
              onClick={scrollToWork}
              className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       text-white font-bold text-lg
                       transform hover:scale-105 hover:-translate-y-1
                       transition-all duration-300 ease-out
                       shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
                       focus:outline-none focus:ring-4 focus:ring-blue-500/50
                       min-h-[3.5rem] flex items-center justify-center gap-3"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300"></span>
              <span className="tracking-wide">See Our Work</span>
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Secondary CTA - Clean Glass Effect */}
            <button
              onClick={scrollToContact}
              className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl
                       bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm
                       border-2 border-slate-300/30 dark:border-slate-600/30
                       hover:bg-white/20 dark:hover:bg-slate-700/40
                       hover:border-slate-400/50 dark:hover:border-slate-500/50
                       text-slate-800 dark:text-white font-bold text-lg
                       transform hover:scale-105 hover:-translate-y-1
                       transition-all duration-300 ease-out
                       shadow-lg hover:shadow-xl
                       focus:outline-none focus:ring-4 focus:ring-slate-500/50
                       min-h-[3.5rem] flex items-center justify-center gap-3"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300"></span>
              <span className="tracking-wide">Start Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-600 dark:bg-slate-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
