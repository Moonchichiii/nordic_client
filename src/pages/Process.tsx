import { memo } from 'react'

interface ProcessStep {
  number: string
  title: string
  description: string
  image: string
  alt: string
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understanding your vision, goals, and audience through collaborative workshops and research.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    alt: 'Team collaboration and research workshop setting'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Mapping the user journey and technical approach to create a comprehensive roadmap for success.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    alt: 'Strategic planning with user journey maps and technical diagrams'
  },
  {
    number: '03',
    title: 'Creation',
    description: 'Building with precision and iterative feedback, focusing on clean code and exceptional design.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    alt: 'Development process with code editor and design tools'
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploying seamlessly with ongoing support, analytics, and optimization strategies.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    alt: 'Project launch with analytics dashboard and monitoring tools'
  }
]

const ProcessStep = memo(({ step, index }: { step: ProcessStep; index: number }) => (
  <article
    className="group relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-sm 
             border border-slate-700/50 transition-all duration-500 hover:-translate-y-2 
             hover:shadow-2xl hover:shadow-blue-500/10 hover:border-slate-600/70"
    style={{
      animationDelay: `${index * 150}ms`,
      animationFillMode: 'both'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 p-6 lg:p-8">
      <div className="w-full aspect-video overflow-hidden rounded-2xl mb-6 relative">
        <img
          src={step.image}
          alt={step.alt}
          className="w-full h-full object-cover filter grayscale contrast-[1.1] 
                   transition-all duration-500 group-hover:grayscale-[0.3] group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent 
                      opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
      </div>
      
      <header className="space-y-4">
        <span
          className="font-heading text-5xl lg:text-6xl text-blue-500/40 block 
                   transition-all duration-500 group-hover:text-blue-400/80 
                   group-hover:scale-110 transform-gpu"
          aria-label={`Step ${step.number}`}
        >
          {step.number}
        </span>
        
        <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-400 
                     transition-colors duration-300">
          {step.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 
                    transition-colors duration-300">
          {step.description}
        </p>
      </header>
    </div>
  </article>
))

ProcessStep.displayName = 'ProcessStep'

const Process = memo(() => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="process"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden"
      aria-labelledby="process-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 
                      rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-blue-600/10 
                      rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] 
                      bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-16 lg:mb-20">
          <h2 
            id="process-title" 
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6
                     animate-fade-in-up"
          >
            OUR PROCESS
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed
                      animate-fade-in-up"
             style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            How we turn your vision into reality
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8 lg:p-12 
                        max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Let's discuss how our proven process can bring your digital vision to life.
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                       hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg 
                       rounded-2xl transform hover:scale-105 hover:-translate-y-1
                       transition-all duration-300 shadow-lg hover:shadow-2xl 
                       hover:shadow-blue-500/25 focus:outline-none focus:ring-4 
                       focus:ring-blue-500/50"
            >
              Let's Work Together
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})

Process.displayName = 'Process'

export default Process
