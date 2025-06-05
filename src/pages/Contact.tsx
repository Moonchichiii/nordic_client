import { Mail, MapPin } from 'lucide-react'
import { useCallback, useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))

      // Clear error for this field when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!validateForm()) return

      setIsSubmitting(true)
      setSubmitStatus('idle')

      try {
        // Simulate API call - replace with actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000))

        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } catch {
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateForm]
  )

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32
                 bg-gradient-to-br from-slate-100 to-slate-200
                 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900
                 transition-all duration-700"
      aria-labelledby="contact-title"
    >
      {/* Angled separator */}
      <div
        className="absolute top-[-5rem] left-0 w-full h-20 
                   bg-white dark:bg-slate-900 transition-colors duration-700"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2
            id="contact-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6
                       text-slate-900 dark:text-white transition-colors duration-700"
          >
            GET IN TOUCH
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Let's create something amazing together
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8">
                Ready to Start Your Project?
              </h3>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4 group">
                <div
                  className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center 
                               text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300"
                >
                  <Mail size={24} aria-hidden="true" />
                </div>
                <a
                  href="mailto:hello@nordiccodeworks.com"
                  className="text-xl md:text-2xl font-semibold
                           text-slate-800 dark:text-slate-200 
                           hover:text-blue-600 dark:hover:text-blue-400 
                           transition-colors duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
                >
                  hello@nordiccodeworks.com
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 group">
                <div
                  className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center 
                               text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-all duration-300"
                >
                  <MapPin size={24} aria-hidden="true" />
                </div>
                <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  Stockholm, Sweden
                </p>
              </div>
            </div>

            {/* Extra Info */}
            <div
              className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 
                           rounded-2xl p-6 text-center lg:text-left"
            >
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Response Time</h4>
              <p className="text-slate-600 dark:text-slate-400">
                We typically respond within 24 hours during business days
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg 
                       border border-slate-200/50 dark:border-slate-700/50
                       rounded-3xl p-8 lg:p-10 shadow-xl
                       transition-all duration-700"
          >
            <div className={isSubmitting ? 'opacity-50 pointer-events-none' : ''}>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
                Send us a message
              </h3>

              {/* Name Field */}
              <div className="space-y-2 mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-700 border-2 rounded-xl px-4 py-3
                           text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400
                           transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                           ${
                             errors.name
                               ? 'border-red-500 focus:ring-red-500'
                               : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                           }`}
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-500 font-medium" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-700 border-2 rounded-xl px-4 py-3
                           text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400
                           transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                           ${
                             errors.email
                               ? 'border-red-500 focus:ring-red-500'
                               : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                           }`}
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 font-medium" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2 mb-8">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-700 border-2 rounded-xl px-4 py-3
                           text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400
                           transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-y
                           ${
                             errors.message
                               ? 'border-red-500 focus:ring-red-500'
                               : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                           }`}
                  placeholder="Tell us about your project..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-500 font-medium" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={e => {
                  e.preventDefault()
                  handleSubmit(e as any)
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700
                         text-white font-bold text-lg py-4 px-8 rounded-xl
                         transform hover:scale-105 hover:-translate-y-1
                         transition-all duration-300 ease-out
                         shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
                         focus:outline-none focus:ring-4 focus:ring-blue-500/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div
                className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl"
                role="alert"
              >
                <p className="text-green-800 dark:text-green-200 text-center font-semibold">
                  Thanks for your message! We'll get back to you soon. 🎉
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl"
                role="alert"
              >
                <p className="text-red-800 dark:text-red-200 text-center font-semibold">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
