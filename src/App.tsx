import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './App.css'

function App() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Test GSAP animation
    const tl = gsap.timeline()
    
    tl.from(titleRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "bounce.out"
    })
    .from(boxRef.current, {
      duration: 1,
      scale: 0,
      rotation: 180,
      ease: "back.out(1.7)"
    }, "-=0.5")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="text-center">
        <h1 
          ref={titleRef}
          className="text-6xl font-bold text-white mb-8 drop-shadow-lg"
        >
          Nordic Client
        </h1>
        <div 
          ref={boxRef}
          className="w-32 h-32 bg-white rounded-2xl shadow-2xl mx-auto mb-8 flex items-center justify-center"
        >
          <span className="text-2xl">🚀</span>
        </div>
        <p className="text-xl text-white/90 max-w-md">
          React + TypeScript + Vite + Tailwind + GSAP = ✨ Magic
        </p>
      </div>
    </div>
  )
}

export default App