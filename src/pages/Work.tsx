import { ArrowRight } from 'lucide-react'

interface WorkItem {
  title: string
  description: string
  image: string
  tag: string
  alt: string
}

const workItems: WorkItem[] = [
  {
    title: 'Brand Platform',
    description: 'Digital identity & web presence for a fintech startup',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2500&ixlib=rb-4.0.3',
    tag: 'Strategy & Design',
    alt: 'Modern fintech website design showcasing clean interface and professional branding'
  },
  {
    title: 'E-commerce Solution',
    description: 'Custom shopping experience with React and FastAPI',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2674&ixlib=rb-4.0.3',
    tag: 'Development',
    alt: 'E-commerce platform interface showing product catalog and shopping features'
  },
  {
    title: 'Interactive App',
    description: 'Engagement through animation and microinteractions',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=2674&ixlib=rb-4.0.3',
    tag: 'Animation & UX',
    alt: 'Interactive application interface with smooth animations and modern design'
  }
]

const Work = () => {
  return (
    <section id="work" className="section-container" aria-labelledby="work-title">
      <div className="container">
        <header className="mb-20">
          <h2 id="work-title" className="section-title">
            Selected Work
          </h2>
          <p className="section-subtitle">
            Crafting digital experiences with precision and purpose
          </p>
        </header>
        
        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" role="list">
          {workItems.map((item, index) => (
            <article 
              key={index} 
              className="group transition-transform duration-300 hover:-translate-y-2"
              role="listitem"
            >
              <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-all duration-700 ease-premium 
                           grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent to-70% 
                              flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-400">
                  <span className="text-sm bg-blue-600 px-3 py-1 rounded-full text-white font-semibold">
                    {item.tag}
                  </span>
                  <div className="bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center
                                transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight size={18} aria-hidden="true" />
                  </div>
                </div>
              </div>
              
              <header>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </header>
            </article>
          ))}
        </div>
        
        {/* View More Link */}
        <div className="mt-16 text-center">
          <a 
            href="#portfolio" 
            className="inline-flex items-center gap-2 text-white font-semibold text-lg py-2 px-4 
                     transition-all duration-300 hover:text-blue-500 group
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            aria-describedby="view-more-desc"
          >
            View all projects
            <ArrowRight 
              size={24} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
              aria-hidden="true"
            />
          </a>
          <span id="view-more-desc" className="visually-hidden">
            Navigate to full portfolio page
          </span>
        </div>
      </div>
    </section>
  )
}

export default Work