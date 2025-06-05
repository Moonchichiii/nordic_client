import { useState, useCallback } from 'react'
import { Mail, MapPin, Github, Dribbble, Linkedin, Twitter } from 'lucide-react'

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

interface SocialLink {
  icon: typeof Github
  href: string
  label: string
}

const socialLinks: SocialLink[] = [
  { icon: Github, href: '#', label: 'Github' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
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

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
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
  }, [validateForm])

  return (
    <section 
      id="contact" 
      className="section-container relative bg-slate-800"
      aria-labelledby="contact-title"
    >
      {/* Angled separator */}
      <div 
        className="absolute top-[-5rem] left-0 w-full h-20 bg-slate-900" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
        aria-hidden="true"
      />
      
      <div className="container">
        <header className="mb-16">
          <h2 id="contact-title" className="section-title">
            Get In Touch
          </h2>
          <p className="section-subtitle">
            Let's create something amazing together
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-blue-500">
                <Mail size={20} aria-hidden="true" />
              </div>
              <a 
                href="mailto:hello@nordiccodeworks.com" 
                className="text-xl md:text-2xl text-white hover:text-blue-500 transition-colors duration-300
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                hello@nordiccodeworks.com
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-blue-500">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <p className="text-xl text-white">Stockholm, Sweden</p>
            </div>
            
            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <nav role="navigation" aria-label="Social media links">
                <ul className="flex gap-4 list-none">
                  {socialLinks.map(({ icon: Icon, href, label }, index) => (
                    <li key={index}>
                      <a
                        href={href}
                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center
                                 text-white hover:bg-blue-600 hover:-translate-y-1
                                 transition-all duration-300 focus-visible:outline-none 
                                 focus-visible:ring-2 focus-visible:ring-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${label} page (opens in new tab)`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="card-base p-8 space-y-6"
            noValidate
          >
            <fieldset disabled={isSubmitting}>
              <legend className="visually-hidden">Contact form</legend>
              
              {/* Name Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-slate-300"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white 
                           transition-all duration-300 focus:outline-none focus:ring-2
                           ${errors.name 
                             ? 'border-red-500 focus:ring-red-500' 
                             : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'
                           }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-slate-300"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white 
                           transition-all duration-300 focus:outline-none focus:ring-2
                           ${errors.email 
                             ? 'border-red-500 focus:ring-red-500' 
                             : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'
                           }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-slate-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white 
                           transition-all duration-300 focus:outline-none focus:ring-2 resize-y
                           ${errors.message 
                             ? 'border-red-500 focus:ring-red-500' 
                             : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'
                           }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </fieldset>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg" role="alert">
                <p className="text-green-400">
                  Thanks for your message! We'll get back to you soon.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg" role="alert">
                <p className="text-red-400">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact