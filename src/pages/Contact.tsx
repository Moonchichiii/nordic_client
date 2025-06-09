import { Mail, MapPin, Clock, CheckCircle, type LucideIcon } from 'lucide-react'
import { useCallback, useState, memo } from 'react'

// Types specific to Contact component (co-located)
interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

interface ContactInfoItem {
  icon: LucideIcon
  title: string
  content: string
  href?: string
}

interface ContactInfoItemProps extends ContactInfoItem {
  index: number
}

const ContactInfoItem = memo(({ 
  icon: Icon, 
  title, 
  content, 
  href, 
  index 
}: ContactInfoItemProps) => (
  <div 
    className="flex items-center gap-4 group animate-fade-in-up"
    style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'both' }}
  >
    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                  rounded-2xl flex items-center justify-center text-blue-400 
                  group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-purple-500/30
                  transition-all duration-300 backdrop-blur-sm border border-blue-500/20">
      <Icon size={24} aria-hidden="true" />
    </div>
    <div className="space-y-1">
      <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h4>
      {href ? (
        <a
          href={href}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 
                   text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          {content}
        </a>
      ) : (
        <p className="text-slate-600 dark:text-slate-400 text-lg">{content}</p>
      )}
    </div>
  </div>
))

ContactInfoItem.displayName = 'ContactInfoItem'

const Contact = memo(() => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))

      if (errors[name as keyof ContactFormErrors]) {
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
        await new Promise(resolve => setTimeout(resolve, 1500))

        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })

        setTimeout(() => setSubmitStatus('idle'), 5000)
      } catch {
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateForm]
  )

  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@nordiccodeworks.com',
      href: 'mailto:hello@nordiccodeworks.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Stockholm, Sweden'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 24 hours'
    }
  ]

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100 
               dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 
               transition-all duration-700 overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div
        className="absolute top-[-5rem] left-0 w-full h-20
                 bg-slate-900 dark:bg-slate-900 transition-colors duration-700"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 
                      rounded-full blur-3xl dark:from-blue-600/5 dark:to-purple-600/5" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-blue-600/10 
                      rounded-full blur-3xl dark:from-purple-600/5 dark:to-blue-600/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-16 lg:mb-20">
          <h2
            id="contact-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6
                     text-slate-900 dark:text-white transition-colors duration-700
                     animate-fade-in-up"
          >
            GET IN TOUCH
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto
                      animate-fade-in-up transition-colors duration-700"
             style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Let's create something amazing together
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8
                           animate-fade-in-up transition-colors duration-700"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                Ready to Start Your Project?
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <ContactInfoItem key={info.title} {...info} index={index} />
                ))}
              </div>
            </div>

            <div
              className="bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm 
                       border border-slate-200/50 dark:border-slate-600/50
                       rounded-3xl p-6 lg:p-8 animate-fade-in-up transition-colors duration-700"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg transition-colors duration-700">
                What to Expect
              </h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 transition-colors duration-700">
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Detailed project consultation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Custom proposal within 48 hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Transparent pricing & timeline</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg
                     border border-slate-200/50 dark:border-slate-700/50
                     rounded-3xl p-8 lg:p-10 shadow-2xl
                     transition-all duration-700 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <form onSubmit={handleSubmit} className={isSubmitting ? 'opacity-50 pointer-events-none' : ''}>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center transition-colors duration-700">
                Send us a message
              </h3>

              <div className="space-y-2 mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-700"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-700 border-2 rounded-2xl px-4 py-3
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

              <div className="space-y-2 mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-700 border-2 rounded-2xl px-4 py-3
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

              <div className="space-y-2 mb-8">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-700 border-2 rounded-2xl px-4 py-3
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

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700
                         text-white font-bold text-lg py-4 px-8 rounded-2xl
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
            </form>

            {submitStatus === 'success' && (
              <div
                className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-2xl transition-colors duration-700"
                role="alert"
              >
                <p className="text-green-800 dark:text-green-200 text-center font-semibold transition-colors duration-700">
                  Thanks for your message! We'll get back to you soon. 🎉
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-2xl transition-colors duration-700"
                role="alert"
              >
                <p className="text-red-800 dark:text-red-200 text-center font-semibold transition-colors duration-700">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'

export default Contact