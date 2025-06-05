import { Check } from 'lucide-react'

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

const About = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="section-container" aria-labelledby="about-title">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Container */}
          <div className="relative w-full aspect-video md:aspect-4/3 order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3"
              alt="Nordic Code Works team workspace featuring modern design and collaborative environment"
              className="w-full h-full object-cover filter grayscale-[60%] contrast-[1.1] rounded-xl shadow-xl
                        transition-all duration-500 hover:grayscale-0"
              loading="lazy"
            />
            
            {/* Decorative accent */}
            <div 
              className="absolute w-full h-full top-8 left-8 border-2 border-blue-500 rounded-xl -z-10"
              aria-hidden="true"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 order-1 md:order-2">
            <header className="mb-8">
              <h2 id="about-title" className="section-title">
                Who We Are
              </h2>
              
              <div className="text-body">
                <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-6">
                  Nordic Code Works is a digital studio specializing in creating memorable web experiences 
                  through clean code and thoughtful design. We blend technical expertise with Scandinavian 
                  design principles to create digital solutions that are both beautiful and functional.
                </p>
              </div>
            </header>
            
            {/* Values Grid */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Values</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                {values.map((value, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <value.icon 
                      size={20} 
                      className="text-green-500 flex-shrink-0" 
                      aria-hidden="true"
                    />
                    <span className="text-white/90">{value.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Call to Action */}
            <button 
              onClick={scrollToContact}
              className="btn-primary"
              aria-describedby="about-cta-desc"
            >
              Work With Us
            </button>
            <span id="about-cta-desc" className="visually-hidden">
              Navigate to contact section to start a project
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About