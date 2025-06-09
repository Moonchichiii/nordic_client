import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

interface ErrorFallbackProps extends FallbackProps {
  level?: 'page' | 'section' | 'component'
}

export const ComponentErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 
                rounded-xl p-6 m-4 transition-colors duration-300">
    <div className="flex items-start gap-3">
      <AlertTriangle 
        className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" 
        size={20}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Component Error
        </h3>
        <p className="text-red-700 dark:text-red-300 mb-4">
          This component failed to render properly.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700
                   text-white text-sm font-medium rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Try Again
        </button>
      </div>
    </div>
  </div>
)

export const SectionErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300"
           role="alert"
           aria-labelledby="section-error-title">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle 
          className="text-red-500 dark:text-red-400" 
          size={32}
          aria-hidden="true"
        />
      </div>
      
      <h2 id="section-error-title" 
          className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
        Section Unavailable
      </h2>
      
      <p className="text-red-700 dark:text-red-300 mb-6 leading-relaxed">
        This section encountered an error and couldn't be displayed. 
        You can try refreshing or continue browsing other sections.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700
                   text-white font-medium rounded-xl transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <RefreshCw size={18} aria-hidden="true" />
          Try Again
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 
                   bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
                   text-slate-700 dark:text-slate-300 font-medium rounded-xl 
                   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
        >
          <Home size={18} aria-hidden="true" />
          Go Home
        </button>
      </div>
    </div>
  </section>
)

export const PageErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-6 
                transition-colors duration-300"
       role="alert"
       aria-labelledby="page-error-title">
    <div className="max-w-lg mx-auto text-center">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
        <AlertTriangle 
          className="text-red-500 dark:text-red-400" 
          size={48}
          aria-hidden="true"
        />
      </div>
      
      <h1 id="page-error-title" 
          className="text-4xl font-bold text-red-800 dark:text-red-200 mb-4">
        Something Went Wrong
      </h1>
      
      <p className="text-xl text-red-700 dark:text-red-300 mb-8 leading-relaxed">
        We apologize for the inconvenience. The page encountered an unexpected error.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700
                   text-white font-semibold rounded-xl transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <RefreshCw size={20} aria-hidden="true" />
          Try Again
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 
                   bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
                   text-slate-700 dark:text-slate-300 font-semibold rounded-xl 
                   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
        >
          <Home size={20} aria-hidden="true" />
          Go Home
        </button>
      </div>
    </div>
  </div>
)