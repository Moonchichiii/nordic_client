import { useEffect, useRef } from 'react'
import { animateText, createTimeline, STAGGER } from '@utils/gsap'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return

    const tl = createTimeline({
      defaults: { ease: 'premium' }
    })

    // Animate title characters
    const titleAnimation = animateText.splitChars(titleRef.current, {
      stagger: 0.03,
      duration: 0.8,
    })

    // Animate subtitle words
    const subtitleAnimation = animateText.splitWords(subtitleRef.current, {
      stagger: STAGGER.tight,
      duration: 0.6,
    })

    // Build timeline
    tl.add(titleAnimation)
      .add(subtitleAnimation, '-=0.4')
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )

    return () => {
      tl.kill()
    }
  }, [])

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, hsl(240 100% 70% / 0.08), transparent),
          radial-gradient(ellipse 60% 40% at 50% 120%, hsl(280 100% 70% / 0.06), transparent),
          linear-gradient(135deg, hsl(220 30% 5%) 0%, hsl(220 30% 8%) 100%)
        `
      }}
      aria-labelledby="hero-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/3 w-[60vmin] h-[60vmin]
                      bg-gradient-to-r from-blue-600/10 to-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[50vmin] h-[50vmin]
                      bg-gradient-to-r from-purple-600/8 to-blue-600/6 rounded-full blur-3xl" />
      </div>

      {/* COMPLETELY NEW LAYOUT - Split Design */}
      <div className="w-full max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">
          
          {/* LEFT SIDE - Big Title */}
          <div className="order-2 lg:order-1">
            <h1
              ref={titleRef}
              id="hero-title"
              className="font-heading tracking-tight text-white text-left"
              style={{
                fontSize: 'clamp(3rem, 8vw, 9rem)',
                lineHeight: '0.8',
                fontWeight: '900'
              }}
            >
              <span className="block text-white/95 drop-shadow-lg">NORDIC</span>
              <span className="block text-blue-500 font-black drop-shadow-lg">CODE</span>
              <span className="block text-white/90 drop-shadow-lg">WORKS</span>
            </h1>
            
            {/* Small subtitle under title */}
            <div className="mt-6">
              <p
                ref={subtitleRef}
                className="font-display text-white/60 text-left max-w-md"
                style={{ fontSize: '1.1rem', lineHeight: '1.5' }}
              >
                Digital experiences with Nordic precision
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - CTA Focus Area */}
          <div className="order-1 lg:order-2">
            <div ref={ctaRef} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
              
              {/* CTA Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-3">
                  Ready to Build Something Great?
                </h2>
                <p className="text-white/70 text-lg">
                  Let's discuss your next project
                </p>
              </div>

              {/* Large CTA Buttons */}
              <div className="space-y-4">
                <button
                  onClick={scrollToWork}
                  className="btn-primary w-full text-lg px-8 py-5 min-h-[60px] text-center
                           shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02]"
                >
                  <span className="text-xl mr-3">🎯</span>
                  <span className="font-bold">See Our Work</span>
                </button>
                
                <button
                  onClick={scrollToContact}
                  className="btn-secondary w-full text-lg px-8 py-5 min-h-[60px] text-center
                           hover:bg-white/15 transform hover:scale-[1.02]"
                >
                  <span className="text-xl mr-3">💬</span>
                  <span className="font-bold">Start a Project</span>
                </button>
              </div>
              
              {/* Trust signals */}
              <div className="text-center mt-8 pt-6 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  <span className="text-white/80 font-semibold">50+ projects delivered</span> • 
                  <span className="text-white/80 font-semibold"> 5-star rating</span>
                </p>
                <div className="flex justify-center mt-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero