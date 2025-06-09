import { useState, useEffect } from 'react'
import { Cookie, X, Check, Info } from 'lucide-react'

interface CookieConsentProps {
    onAcceptAll?: () => void
    onRejectAll?: () => void
    onCustomize?: (preferences: CookiePreferences) => void
    companyName?: string
}

interface CookiePreferences {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    personalization: boolean
}

const CookieConsent = ({ 
    onAcceptAll, 
    onRejectAll, 
    onCustomize,
    companyName = "Nordic Code Works" 
}: CookieConsentProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true, 
        analytics: false,
        marketing: false,
        personalization: false
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasConsent = localStorage.getItem('cookie-consent')
            if (!hasConsent) {
                setIsVisible(true)
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
            personalization: true
        }
        localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
        onAcceptAll?.()
        setIsVisible(false)
    }

    const handleRejectAll = () => {
        const onlyNecessary = {
            necessary: true,
            analytics: false,
            marketing: false,
            personalization: false
        }
        localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
        onRejectAll?.()
        setIsVisible(false)
    }

    const handleCustomSave = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(preferences))
        onCustomize?.(preferences)
        setIsVisible(false)
    }

    const handleClose = () => {
        setIsVisible(false)
    }

    const togglePreference = (key: keyof CookiePreferences) => {
        if (key === 'necessary') return
        
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    if (!isVisible) return null

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] 
                                     animate-in fade-in duration-300"
                onClick={handleClose}
            />

            <div 
                className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6
                                     animate-in slide-in-from-bottom duration-500 ease-out"
            >
                <div className="max-w-4xl mx-auto">
                    <div 
                        className="glass border border-white/20 rounded-2xl p-6 md:p-8 
                                             shadow-2xl backdrop-blur-xl bg-slate-900/90
                                             transform hover:scale-[1.01] transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 
                                                             rounded-full flex items-center justify-center
                                                             animate-bounce hover:animate-pulse
                                                             transform hover:scale-110 hover:rotate-12
                                                             transition-all duration-300 ease-out
                                                             shadow-lg hover:shadow-amber-500/25
                                                             border-2 border-amber-400/30">
                                    <Cookie size={24} className="text-amber-100 drop-shadow-sm" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-xl md:text-2xl font-black text-white
                                                                hover:text-amber-200 transition-colors duration-300
                                                                transform hover:scale-105 transition-transform">
                                        Cookie Preferences
                                    </h2>
                                    <p className="text-slate-400 text-sm animate-fade-in">
                                        {companyName} uses cookies to enhance your experience
                                    </p>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg
                                                 flex items-center justify-center text-slate-400 hover:text-white
                                                 transition-all duration-200 hover:scale-110"
                                aria-label="Close cookie consent"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {!showDetails ? (
                            <>
                                <div className="mb-6">
                                    <p className="text-slate-300 leading-relaxed
                                                             hover:text-slate-200 transition-colors duration-200">
                                        We use cookies to analyze site usage, personalize content, and serve targeted advertisements. 
                                        Your privacy matters to us.{' '}
                                        <button
                                            onClick={() => setShowDetails(true)}
                                            className="text-blue-400 hover:text-blue-300 underline 
                                                             transition-colors duration-200 font-medium
                                                             hover:bg-blue-400/10 px-1 py-0.5 rounded
                                                             transform hover:scale-105"
                                        >
                                            Customize preferences
                                        </button>
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                                         hover:from-blue-700 hover:to-purple-700 text-white font-bold 
                                                         rounded-xl transform hover:scale-102
                                                         transition-all duration-200 shadow-lg hover:shadow-blue-500/25
                                                         focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                                    >
                                        Accept All Cookies
                                    </button>
                                    
                                    <button
                                        onClick={handleRejectAll}
                                        className="flex-1 px-6 py-3 glass border-2 border-slate-600/30 
                                                         hover:bg-white/10 hover:border-slate-500/50 text-white font-bold 
                                                         rounded-xl transform hover:scale-102
                                                         transition-all duration-200 backdrop-blur-lg
                                                         focus:outline-none focus:ring-4 focus:ring-slate-500/50"
                                    >
                                        Reject All
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        Choose which cookies you'd like to allow. You can change these settings at any time.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="glass border border-white/10 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
                                                        <Check size={14} className="text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-white">Necessary</h3>
                                                </div>
                                                <div className="w-10 h-6 bg-green-600 rounded-full flex items-center px-1">
                                                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm pl-9">
                                                Essential for website functionality. Cannot be disabled.
                                            </p>
                                        </div>

                                        <div className="glass border border-white/10 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                                                        <Info size={14} className="text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-white">Analytics</h3>
                                                </div>
                                                <button
                                                    onClick={() => togglePreference('analytics')}
                                                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-all duration-200 ${
                                                        preferences.analytics 
                                                            ? 'bg-blue-600' 
                                                            : 'bg-slate-600 hover:bg-slate-500'
                                                    }`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                                                        preferences.analytics ? 'ml-auto' : 'ml-0'
                                                    }`} />
                                                </button>
                                            </div>
                                            <p className="text-slate-400 text-sm pl-9">
                                                Help us understand how you use our website to improve performance.
                                            </p>
                                        </div>

                                        <div className="glass border border-white/10 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                                                        <Info size={14} className="text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-white">Marketing</h3>
                                                </div>
                                                <button
                                                    onClick={() => togglePreference('marketing')}
                                                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-all duration-200 ${
                                                        preferences.marketing 
                                                            ? 'bg-purple-600' 
                                                            : 'bg-slate-600 hover:bg-slate-500'
                                                    }`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                                                        preferences.marketing ? 'ml-auto' : 'ml-0'
                                                    }`} />
                                                </button>
                                            </div>
                                            <p className="text-slate-400 text-sm pl-9">
                                                Show you relevant advertisements and measure campaign effectiveness.
                                            </p>
                                        </div>

                                        <div className="glass border border-white/10 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center">
                                                        <Info size={14} className="text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-white">Personalization</h3>
                                                </div>
                                                <button
                                                    onClick={() => togglePreference('personalization')}
                                                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-all duration-200 ${
                                                        preferences.personalization 
                                                            ? 'bg-orange-600' 
                                                            : 'bg-slate-600 hover:bg-slate-500'
                                                    }`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                                                        preferences.personalization ? 'ml-auto' : 'ml-0'
                                                    }`} />
                                                </button>
                                            </div>
                                            <p className="text-slate-400 text-sm pl-9">
                                                Remember your preferences and customize your experience.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleCustomSave}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                                         hover:from-blue-700 hover:to-purple-700 text-white font-bold 
                                                         rounded-xl transform hover:scale-105 hover:-translate-y-0.5
                                                         transition-all duration-300 shadow-lg hover:shadow-blue-500/25
                                                         focus:outline-none focus:ring-4 focus:ring-blue-500/50
                                                         hover:rotate-1"
                                    >
                                        Save Preferences ⚙️
                                    </button>
                                    
                                    <button
                                        onClick={handleAcceptAll}
                                        className="flex-1 px-6 py-3 glass border-2 border-blue-600/50 
                                                         hover:bg-blue-600/20 hover:border-blue-500/70 text-white font-bold 
                                                         rounded-xl transform hover:scale-105 hover:-translate-y-0.5
                                                         transition-all duration-300 backdrop-blur-lg
                                                         focus:outline-none focus:ring-4 focus:ring-blue-500/50
                                                         hover:rotate-1"
                                    >
                                        Accept All
                                    </button>
                                    
                                    <button
                                        onClick={() => setShowDetails(false)}
                                        className="px-6 py-3 text-slate-400 hover:text-white font-medium
                                                         transition-colors duration-200"
                                    >
                                        Back
                                    </button>
                                </div>
                            </>
                        )}

                        <div className="mt-6 pt-4 border-t border-white/10 text-center">
                            <p className="text-slate-400 text-xs">
                                By continuing to use our website, you agree to our{' '}
                                <a href="#privacy" className="text-blue-400 hover:text-blue-300 underline">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="#terms" className="text-blue-400 hover:text-blue-300 underline">
                                    Terms of Service
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CookieConsent
