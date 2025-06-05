import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { TextPlugin } from 'gsap/TextPlugin'

// Register GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  CustomEase,
  TextPlugin
)

// Create custom easing functions
CustomEase.create('premium', '0.77, 0, 0.175, 1')
CustomEase.create('smooth', '0.4, 0, 0.2, 1')
CustomEase.create('elastic', '0.25, 0.46, 0.45, 0.94')
CustomEase.create('bounce', '0.68, -0.55, 0.265, 1.55')

// Animation duration constants
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  extra: 1.2,
} as const

// Stagger values
export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  loose: 0.15,
} as const

// Create timeline with default settings
export const createTimeline = (options?: gsap.TimelineVars): gsap.core.Timeline =>
  gsap.timeline({
    defaults: { ease: 'premium', duration: DURATION.normal },
    ...options,
  })

// Text animation utilities
export const animateText = {
  /**
   * Split text and animate characters in
   */
  splitChars: (
    element: string | Element,
    options: {
      stagger?: number
      delay?: number
      duration?: number
      ease?: string
    } = {}
  ) => {
    const { stagger = STAGGER.normal, delay = 0, duration = DURATION.normal, ease = 'premium' } = options
    
    const split = new SplitText(element, {
      type: 'chars',
      charsClass: 'char',
    })

    gsap.set('.char', { opacity: 0, y: 50 })
    
    return gsap.to('.char', {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
    })
  },

  /**
   * Split text and animate words in
   */
  splitWords: (
    element: string | Element,
    options: {
      stagger?: number
      delay?: number
      duration?: number
      ease?: string
    } = {}
  ) => {
    const { stagger = STAGGER.normal, delay = 0, duration = DURATION.normal, ease = 'premium' } = options
    
    const split = new SplitText(element, {
      type: 'words',
      wordsClass: 'word',
    })

    gsap.set('.word', { opacity: 0, y: 30 })
    
    return gsap.to('.word', {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
    })
  },
}

// Common animation presets
export const animations = {
  /**
   * Fade in from bottom with scale
   */
  fadeInUp: (
    element: string | Element,
    options: { delay?: number; duration?: number } = {}
  ) => {
    const { delay = 0, duration = DURATION.normal } = options
    
    return gsap.fromTo(
      element,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration, delay, ease: 'premium' }
    )
  },

  /**
   * Slide in from right
   */
  slideInRight: (
    element: string | Element,
    options: { delay?: number; duration?: number } = {}
  ) => {
    const { delay = 0, duration = DURATION.normal } = options
    
    return gsap.fromTo(
      element,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration, delay, ease: 'premium' }
    )
  },

  /**
   * Scale and fade in
   */
  scaleIn: (
    element: string | Element,
    options: { delay?: number; duration?: number } = {}
  ) => {
    const { delay = 0, duration = DURATION.normal } = options
    
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, delay, ease: 'bounce' }
    )
  },

  /**
   * Stagger animation for multiple elements
   */
  staggerIn: (
    elements: string | Element[],
    options: {
      stagger?: number
      delay?: number
      duration?: number
      direction?: 'up' | 'down' | 'left' | 'right'
    } = {}
  ) => {
    const { 
      stagger = STAGGER.normal, 
      delay = 0, 
      duration = DURATION.normal,
      direction = 'up'
    } = options
    
    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = { opacity: 1, duration, stagger, delay, ease: 'premium' }
    
    switch (direction) {
      case 'up':
        fromVars.y = 50
        toVars.y = 0
        break
      case 'down':
        fromVars.y = -50
        toVars.y = 0
        break
      case 'left':
        fromVars.x = 50
        toVars.x = 0
        break
      case 'right':
        fromVars.x = -50
        toVars.x = 0
        break
    }
    
    return gsap.fromTo(elements, fromVars, toVars)
  },
}

// ScrollTrigger utilities
export const scrollAnimations = {
  /**
   * Create a scroll-triggered animation
   */
  onScroll: (
    element: string | Element,
    animation: gsap.TweenVars,
    triggerOptions: ScrollTrigger.Vars = {}
  ) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...triggerOptions,
        },
      }
    )
  },

  /**
   * Parallax effect
   */
  parallax: (
    element: string | Element,
    speed: number = 0.5,
    triggerOptions: ScrollTrigger.Vars = {}
  ) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...triggerOptions,
      },
    })
  },
}

// Menu animation utilities
export const menuAnimations = {
  /**
   * Open menu with staggered links
   */
  openMenu: (
    links: string | Element[],
    social: string | Element[],
    footer: string | Element
  ) => {
    const tl = createTimeline()
    
    tl.set([links, social, footer], { opacity: 0 })
      .set(links, { y: '120%' })
      .set(social, { scale: 0 })
      .set(footer, { y: 50 })
      .to(links, {
        y: '0%',
        opacity: 1,
        duration: DURATION.slow,
        stagger: STAGGER.normal,
        ease: 'bounce',
        delay: 0.2,
      })
      .to(social, {
        scale: 1,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.tight,
        ease: 'bounce',
      }, '-=0.4')
      .to(footer, {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        ease: 'premium',
      }, '-=0.3')
    
    return tl
  },

  /**
   * Close menu animation
   */
  closeMenu: (
    links: string | Element[],
    social: string | Element[],
    footer: string | Element
  ) => {
    const tl = createTimeline()
    
    tl.to(links, {
      y: '-120%',
      opacity: 0,
      duration: DURATION.fast,
      stagger: STAGGER.tight,
      ease: 'power2.in',
    })
      .to([social, footer], {
        scale: 0.8,
        opacity: 0,
        duration: DURATION.fast,
        ease: 'power2.in',
      }, '-=0.2')
    
    return tl
  },
}

// Utility functions
export const utils = {
  /**
   * Kill all animations on an element
   */
  killAnimations: (element: string | Element) => {
    gsap.killTweensOf(element)
  },

  /**
   * Set element to initial state
   */
  reset: (element: string | Element) => {
    gsap.set(element, { clearProps: 'all' })
  },

  /**
   * Batch process elements
   */
  batch: (
    elements: string | Element[],
    animation: (element: Element, index: number) => gsap.core.Tween
  ) => {
    const targets = gsap.utils.toArray(elements) as Element[]
    return targets.map(animation)
  },
}

// Export main GSAP instance and plugins
export {
  gsap,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  CustomEase,
  TextPlugin,
}