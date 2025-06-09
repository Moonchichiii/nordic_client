import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/Layout'

// Lazy load 
const Hero = lazy(() => import('@/pages/Hero'))
const Work = lazy(() => import('@/pages/Work'))
const Process = lazy(() => import('@/pages/Process'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

// Enhanced loading component
interface SectionLoaderProps {
  className?: string
  section?: string
}

const SectionLoader = ({ className = "", section = "content" }: SectionLoaderProps) => (
  <div 
    className={`flex flex-col items-center justify-center py-20 ${className}`} 
    role="status" 
    aria-label={`Loading ${section}`}
  >
    <div className="relative">
      <div className="w-12 h-12 border-3 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <div className="absolute inset-0 w-12 h-12 border-3 border-purple-500/20 border-b-purple-500 rounded-full animate-spin animate-reverse" />
    </div>
    <span className="sr-only">Loading {section}...</span>
    <p className="mt-4 text-slate-400 text-sm animate-pulse">Loading {section}...</p>
  </div>
)

// Error fallback component
interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
    <div className="text-center max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
      <p className="text-slate-400 mb-6">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Try Again
      </button>
    </div>
  </div>
)

// Page sections 
const sections = [
  {
    id: 'hero',
    component: Hero,
    className: 'min-h-screen bg-slate-900',
    name: 'hero'
  },
  {
    id: 'work',
    component: Work,
    className: 'bg-slate-900',
    name: 'work portfolio'
  },
  {
    id: 'process',
    component: Process,
    className: 'bg-slate-800',
    name: 'process'
  },
  {
    id: 'about',
    component: About,
    className: 'bg-slate-900',
    name: 'about'
  },
  {
    id: 'contact',
    component: Contact,
    className: 'bg-slate-100 dark:bg-slate-800',
    name: 'contact'
  }
] as const

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        {sections.map(({ id, component: Component, className, name }) => (
          <ErrorBoundary 
            key={id}
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
          >
            <Suspense fallback={<SectionLoader className={className} section={name} />}>
              <Component />
            </Suspense>
          </ErrorBoundary>
        ))}
      </Layout>
    </ErrorBoundary>
  )
}