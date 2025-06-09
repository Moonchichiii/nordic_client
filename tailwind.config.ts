import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  
  darkMode: 'class',
  
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: 'clamp(1rem, 4vw, 3rem)',
          sm: 'clamp(1.5rem, 5vw, 4rem)',
          lg: 'clamp(2rem, 6vw, 5rem)',
        },
        screens: {
          xs: '480px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      
      fontFamily: {
        'heading': ['Archivo Black', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1.25vw + 0.25rem, 1rem)',
        'fluid-base': 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 2vw + 0.5rem, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 3vw + 0.25rem, 2rem)',
        'fluid-2xl': 'clamp(1.875rem, 5vw + 0.5rem, 3.5rem)',
        'fluid-3xl': 'clamp(2.5rem, 8vw + 1rem, 6rem)',
        'hero': 'clamp(2.5rem, 8vw + 1rem, 6rem)',
        'title': 'clamp(1.875rem, 5vw + 0.5rem, 3.5rem)',
        'subtitle': 'clamp(1.25rem, 3vw + 0.25rem, 2rem)',
      },
      
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 1vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 2vw, 1rem)',
        'fluid-md': 'clamp(1rem, 3vw, 2rem)',
        'fluid-lg': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 5vw, 4rem)',
        'fluid-2xl': 'clamp(3rem, 6vw, 6rem)',
      },
      
      colors: {
        'theme': 'var(--theme-color)',
        'accent': 'var(--accent-color)',
        'primary': {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        'purple': {
          50: '#faf5ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#581c87',
        },
      },
      
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'slide-in-right': 'slideInRight 0.8s ease-out both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-gentle': 'bounce 2s infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(15px, -15px) rotate(3deg)' },
          '66%': { transform: 'translate(-10px, 10px) rotate(-2deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(2rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'premium': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'elastic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '64px',
      },
      
      aspectRatio: {
        'video': '16 / 9',
        'square': '1 / 1',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
        'ultrawide': '21 / 9',
      },
      
      borderRadius: {
        'fluid': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-lg': 'clamp(0.75rem, 1.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1rem, 2vw, 2rem)',
      },
      
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px var(--theme-color)',
        'glow-lg': '0 0 40px var(--theme-color)',
        'float': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'float-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill-sm': 'repeat(auto-fill, minmax(150px, 1fr))',
      },
    },
  },
  
  plugins: [
  ],
  
  corePlugins: {
    preflight: true,
  },
  
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config
