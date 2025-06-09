import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/Layout'
import { PageErrorFallback, SectionErrorFallback } from '@/components/ErrorFallbacks'

// Lazy load all page components
const Hero = lazy(() => import('@/pages/Hero'))
const Work = lazy(() => import('@/pages/Work'))
const Process = lazy(() => import('@/pages/Process'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

// Enhanced loading component with theme support
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
    <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm animate-pulse transition-colors duration-300">
      Loading {section}...
    </p>
  </div>
)

// Error fallback component with theme support
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <PageErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
)

// Page sections configuration
const sections = [
  {
    id: 'hero',
    component: Hero,
    className: 'min-h-screen bg-slate-900 dark:bg-slate-900',
    name: 'hero'
  },
  {
    id: 'work',
    component: Work,
    className: 'bg-slate-900 dark:bg-slate-900',
    name: 'work portfolio'
  },
  {
    id: 'process',
    component: Process,
    className: 'bg-slate-800 dark:bg-slate-800',
    name: 'process'
  },
  {
    id: 'about',
    component: About,
    className: 'bg-slate-100 dark:bg-slate-900',
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
            FallbackComponent={SectionErrorFallback}
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