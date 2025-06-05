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
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    alt: 'Team collaboration and research workshop setting'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Mapping the user journey and technical approach to create a comprehensive roadmap for success.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=2676&ixlib=rb-4.0.3',
    alt: 'Strategic planning with user journey maps and technical diagrams'
  },
  {
    number: '03',
    title: 'Creation',
    description: 'Building with precision and iterative feedback, focusing on clean code and exceptional design.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    alt: 'Development process with code editor and design tools'
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploying seamlessly with ongoing support, analytics, and optimization strategies.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    alt: 'Project launch with analytics dashboard and monitoring tools'
  }
]

const Process = () => {
  return (
    <section 
      id="process" 
      className="section-container bg-gradient-to-b from-slate-900 to-slate-800"
      aria-labelledby="process-title"
    >
      <div className="container">
        <header className="mb-20">
          <h2 id="process-title" className="section-title">
            Our Process
          </h2>
          <p className="section-subtitle">
            How we turn your vision into reality
          </p>
        </header>
        
        {/* Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {processSteps.map((step, index) => (
            <article
              key={index}
              className="card-base p-6 group hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-full aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover filter grayscale contrast-[1.2] 
                           transition-all duration-300 group-hover:grayscale-[0.3]"
                  loading="lazy"
                />
              </div>
              
              <header>
                <span 
                  className="font-heading text-4xl md:text-5xl text-blue-500/50 block mb-2 
                           transition-all duration-300 group-hover:text-blue-500/80"
                  aria-label={`Step ${step.number}`}
                >
                  {step.number}
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </header>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process