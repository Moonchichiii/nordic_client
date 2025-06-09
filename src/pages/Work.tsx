import { ArrowRight } from 'lucide-react'
import { memo } from 'react'

// Types specific to Work component (co-located)
interface WorkItem {
  title: string
  description: string
  image: string
  tag: string
  alt: string
  loading?: 'eager' | 'lazy'
}

interface WorkItemProps {
  item: WorkItem
  index: number
}

const workItems: WorkItem[] = [
  {
    title: 'Brand Platform',
    description: 'Digital identity & web presence for a fintech startup',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    tag: 'Strategy & Design',
    alt: 'Modern fintech website design showcasing clean interface and professional branding',
    loading: 'eager'
  },
  {
    title: 'E-commerce Solution',
    description: 'Custom shopping experience with React and FastAPI',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    tag: 'Development',
    alt: 'E-commerce platform interface showing product catalog and shopping features'
  },
  {
    title: 'Interactive App',
    description: 'Engagement through animation and microinteractions',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    tag: 'Animation & UX',
    alt: 'Interactive application interface with smooth animations and modern design'
  }
]

interface WorkItemProps {
  item: WorkItem
  index: number
}

const WorkItem = memo(({ item, index }: WorkItemProps) => (
  <article
    className="group transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    style={{
      animationDelay: `${index * 150}ms`,
      animationFillMode: 'both'
    }}
  >
    <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-2xl shadow-lg 
                  hover:shadow-2xl transition-shadow duration-500">
      <img
        src={item.image}
        alt={item.alt}
        className="w-full h-full object-cover transition-all duration-700 ease-premium
                 filter grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105"
        loading={item.loading || 'lazy'}
        decoding="async"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      
      <div className="absolute inset-0 flex items-end justify-between p-6
                    opacity-0 group-hover:opacity-100 transition-all duration-400">
        <span className="text-sm bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full
                       text-white font-semibold border border-white/20">
          {item.tag}
        </span>
        <div className="bg-white/90 backdrop-blur-sm text-slate-900 w-10 h-10 rounded-full
                      flex items-center justify-center transition-transform duration-300
                      group-hover:scale-110 shadow-lg">
          <ArrowRight size={18} aria-hidden="true" />
        </div>
      </div>
    </div>
    
    <header className="space-y-3">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white 
                   group-hover:text-blue-400 transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed 
                  group-hover:text-slate-700 dark:group-hover:text-slate-300 
                  transition-colors duration-300">
        {item.description}
      </p>
    </header>
  </article>
))

WorkItem.displayName = 'WorkItem'

const Work = memo(() => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="work"
      className="relative py-20 lg:py-32 bg-slate-900 dark:bg-slate-900 overflow-hidden
               transition-colors duration-700"
      aria-labelledby="work-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl 
                      from-blue-600/10 to-transparent rounded-full blur-3xl
                      dark:from-blue-600/20 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr 
                      from-purple-600/10 to-transparent rounded-full blur-3xl
                      dark:from-purple-600/20 dark:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-16 lg:mb-20">
          <h2
            id="work-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight 
                     text-white dark:text-white mb-6 animate-fade-in-up
                     transition-colors duration-700"
          >
            SELECTED WORK
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 dark:text-slate-400 
                      max-w-3xl mx-auto leading-relaxed animate-fade-in-up
                      transition-colors duration-700"
             style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Crafting digital experiences with precision and purpose
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16" role="list">
          {workItems.map((item, index) => (
            <WorkItem key={item.title} item={item} index={index} />
          ))}
        </div>
        
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 text-white dark:text-white font-semibold text-lg
                     px-6 py-3 rounded-2xl transition-all duration-300 hover:text-blue-400
                     group focus:outline-none focus:ring-4 focus:ring-blue-500/50
                     hover:bg-slate-800/50 backdrop-blur-sm border border-transparent
                     hover:border-slate-700/50 dark:hover:bg-slate-800/70 
                     dark:hover:border-slate-600/50"
            aria-describedby="view-more-desc"
          >
            Start Your Project
            <ArrowRight
              size={24}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <span id="view-more-desc" className="sr-only">
            Navigate to contact section to discuss your project
          </span>
        </div>
      </div>
    </section>
  )
})

Work.displayName = 'Work'

export default Work