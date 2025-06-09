import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ScrollIndicator = lazy(() => Promise.resolve({
  default: () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
      <div className="w-6 h-10 border-2 border-slate-400/60 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-slate-400/80 rounded-full mt-2 animate-pulse" />
      </div>
    </div>
  )
}))

const easings = {
  bounce: 'back.out(1.7)',
  smooth: 'power2.out',
  premium: 'power3.out',
}

const animateLogoText = (element: string, delay: number = 0) => {
  gsap.fromTo(element, 
    { 
      opacity: 0, 
      y: 80, 
      scale: 0.8,
      rotationX: -90
    },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      delay,
      ease: easings.bounce
    }
  )
}

const animateSubtitle = (element: string, delay: number = 0) => {
  gsap.fromTo(element,
    {
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay,
      ease: easings.smooth
    }
  )
}

const animateButtons = (elements: string, delay: number = 0) => {
  gsap.fromTo(elements,
    {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay,
      stagger: 0.15,
      ease: easings.bounce
    }
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const nordicRef = useRef<HTMLSpanElement>(null)
  const codeRef = useRef<HTMLSpanElement>(null)
  const worksRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    if (nordicRef.current) animateLogoText(nordicRef.current, 0.1)
    if (codeRef.current) animateLogoText(codeRef.current, 0.3)
    if (worksRef.current) animateLogoText(worksRef.current, 0.5)
    
    if (subtitleRef.current) animateSubtitle(subtitleRef.current, 0.8)
    
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('button')
      animateButtons(buttons, 1.1)
    }
  }, [])

  const scrollToWork = () => {
    const element = document.getElementById('work')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-1/4 right-1/3 w-[clamp(20rem,40vw,50rem)] h-[clamp(20rem,40vw,50rem)] 
                     bg-gradient-to-r from-blue-600/20 to-purple-600/15 rounded-full blur-3xl"
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-[clamp(16rem,30vw,40rem)] h-[clamp(16rem,30vw,40rem)] 
                     bg-gradient-to-r from-purple-600/15 to-blue-600/10 rounded-full blur-3xl"
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-[clamp(30rem,60vw,80rem)] h-[clamp(30rem,60vw,80rem)]
                     bg-gradient-radial from-blue-500/8 via-purple-500/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          
          <div className="lg:col-span-8 text-center lg:text-left">
            <h1 className="font-heading tracking-tighter mb-6 lg:mb-8">
              <span 
                ref={nordicRef}
                className="block text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white opacity-0"
                style={{ 
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                  letterSpacing: '-0.03em'
                }}
              >
                NORDIC
              </span>
              
              <span 
                ref={codeRef}
                className="block text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black
                         bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 
                         bg-clip-text text-transparent opacity-0"
                style={{ 
                  filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.4))',
                  letterSpacing: '-0.02em'
                }}
              >
                CODE
              </span>
              
              <span 
                ref={worksRef}
                className="block text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white opacity-0"
                style={{ 
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                  letterSpacing: '-0.03em'
                }}
              >
                WORKS
              </span>
            </h1>

            <div 
              ref={subtitleRef}
              className="mb-8 lg:mb-12 opacity-0"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Digital experiences with{' '}
                <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Nordic precision
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
            <div 
              ref={buttonsRef}
              className="flex flex-col gap-4 w-full max-w-xs"
            >
              <button
                onClick={scrollToWork}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg 
                         rounded-2xl transform hover:scale-105 hover:-translate-y-1
                         transition-all duration-300 shadow-lg hover:shadow-2xl 
                         hover:shadow-blue-500/25 focus:outline-none focus:ring-4 
                         focus:ring-blue-500/50 opacity-0"
                aria-describedby="cta-work-desc"
              >
                See Our Work
              </button>

              <button
                onClick={scrollToContact}
                className="w-full px-8 py-4 glass border-2 border-slate-600/30 
                         hover:bg-white/10 hover:border-slate-500/50 text-white font-bold 
                         text-lg rounded-2xl transform hover:scale-105 hover:-translate-y-1
                         transition-all duration-300 backdrop-blur-lg
                         focus:outline-none focus:ring-4 focus:ring-slate-500/50 opacity-0"
                aria-describedby="cta-contact-desc"
              >
                Start Project
              </button>
            </div>

            <span id="cta-work-desc" className="sr-only">
              Navigate to our work portfolio section
            </span>
            <span id="cta-contact-desc" className="sr-only">
              Navigate to contact section to start a new project
            </span>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <ScrollIndicator />
      </Suspense>
    </section>
  )
}
