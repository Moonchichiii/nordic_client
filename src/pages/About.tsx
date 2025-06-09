import { Check } from 'lucide-react'
import { memo } from 'react'

interface ValueItem {
  text: string
  icon: typeof Check
}

const values: ValueItem[] = [
  { text: 'Technical Excellence', icon: Check },
  { text: 'Minimalist Design', icon: Check },
  { text: 'User-Centered Approach', icon: Check },
  { text: 'Sustainable Development', icon: Check },
]

const ValueItem = memo(({ value, index }: { value: ValueItem; index: number }) => (
  <li 
    className="flex items-center gap-3 group animate-fade-in-up"
    style={{ 
      animationDelay: `${(index + 2) * 100}ms`,
      animationFillMode: 'both'
    }}
  >
    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center 
                  group-hover:bg-green-500/30 transition-colors duration-300">
      <value.icon
        size={16}
        className="text-green-400 group-hover:text-green-300 transition-colors duration-300"
        aria-hidden="true"
      />
    </div>
    <span className="text-slate-300 group-hover:text-white transition-colors duration-300 font-medium">
      {value.text}
    </span>
  </li>
))

ValueItem.displayName = 'ValueItem'

const About = memo(() => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="about" 
      className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden" 
      aria-labelledby="about-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-600/8 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-tl from-purple-600/8 to-transparent" />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] 
                      bg-[size:20px_20px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="relative order-2 lg:order-1 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="relative w-full aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
                alt="Nordic Code Works team workspace featuring modern design and collaborative environment"
                className="w-full h-full object-cover filter grayscale-[60%] contrast-[1.1] 
                         rounded-3xl shadow-2xl transition-all duration-700 
                         group-hover:grayscale-[20%] group-hover:shadow-blue-500/20"
                loading="lazy"
                decoding="async"
              />
              
              <div
                className="absolute w-full h-full top-4 left-4 border-2 border-blue-500/50 
                         rounded-3xl -z-10 transition-all duration-500 
                         group-hover:top-6 group-hover:left-6 group-hover:border-blue-400/70"
                aria-hidden="true"
              />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-blue-600/10 
                            rounded-3xl opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>
          </div>
         
          <div className="order-1 lg:order-2 space-y-8">
            <header className="space-y-6">
              <h2 
                id="about-title" 
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white
                         animate-fade-in-up"
              >
                WHO WE ARE
              </h2>
             
              <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-300 
                            max-w-none">
                  Nordic Code Works is a digital studio specializing in creating memorable web experiences
                  through clean code and thoughtful design.
                </p>
                
                <p className="text-lg leading-relaxed text-slate-400">
                  We blend technical expertise with Scandinavian design principles to create digital 
                  solutions that are both beautiful and functional. Our approach emphasizes simplicity, 
                  sustainability, and user-centered design.
                </p>
              </div>
            </header>
           
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white animate-fade-in-up" 
                  style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                Our Values
              </h3>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                {values.map((value, index) => (
                  <ValueItem key={value.text} value={value} index={index} />
                ))}
              </ul>
            </div>
           
            <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg 
                         rounded-2xl transform hover:scale-105 hover:-translate-y-1
                         transition-all duration-300 shadow-lg hover:shadow-2xl 
                         hover:shadow-blue-500/25 focus:outline-none focus:ring-4 
                         focus:ring-blue-500/50"
                aria-describedby="about-cta-desc"
              >
                Work With Us
              </button>
              <span id="about-cta-desc" className="sr-only">
                Navigate to contact section to start a project with our team
              </span>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '50+', label: 'Projects Delivered', description: 'Successful digital experiences launched' },
            { number: '5+', label: 'Years Experience', description: 'Crafting digital solutions since 2020' },
            { number: '100%', label: 'Client Satisfaction', description: 'Committed to exceeding expectations' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center space-y-3 p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm 
                       border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300
                       animate-fade-in-up"
              style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="text-3xl lg:text-4xl font-black text-blue-400">
                {stat.number}
              </div>
              <h4 className="text-lg font-bold text-white">
                {stat.label}
              </h4>
              <p className="text-sm text-slate-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About
