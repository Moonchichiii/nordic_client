import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      // Typography
      fontFamily: {
        'heading': ['Archivo Black', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // Responsive typography scale
      fontSize: {
        'hero': ['clamp(2.5rem, 12vw, 8rem)', { lineHeight: '0.8' }],
        'subtitle': ['clamp(1.125rem, 4vw, 2rem)', { lineHeight: '1.5' }],
      },
      
      // Custom spacing system
      spacing: {
        'unit': 'clamp(1rem, 2vw, 2rem)',
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Color system with semantic names
      colors: {
        'primary-50': '#f8fafc',
        'primary-900': '#0f172a',
        'primary-950': '#020617',
        'secondary-900': '#1e293b',
        'accent-blue': '#3b82f6',
        'accent-purple': '#8b5cf6',
        'accent-green': '#10b981',
      },
      
      // Animation system
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)' 
          },
          '50%': { 
            transform: 'translate(20px, -20px) rotate(5deg)' 
          },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(2rem)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(2rem)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
      },
      
      // Advanced blur utilities
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'lg': '16px',
        'xl': '24px',
      },
      
      // Transition utilities
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      // Grid utilities
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      
      // Container utilities
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      
      // Aspect ratios
      aspectRatio: {
        'video': '16 / 9',
        'square': '1 / 1',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
      },
    },
  },
  
  plugins: [
    // Add any custom plugins here
  ],
  
  // Optimize for performance
  corePlugins: {
    // Disable unused core plugins for better performance
    preflight: true,
  },
}

export default config