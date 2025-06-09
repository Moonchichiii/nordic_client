import { memo } from 'react'
import { Code, Palette, Zap, Users, Award, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Skill {
  icon: LucideIcon
  title: string
  description: string
}

interface Stat {
  number: string
  label: string
  description: string
}

const skills: Skill[] = [
  {
    icon: Code,
    title: 'Development',
    description: 'Modern web technologies with a focus on performance and scalability'
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'User-centered design that balances aesthetics with functionality'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Cutting-edge solutions that push the boundaries of digital experiences'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Close partnership with clients throughout the entire journey'
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Meticulous attention to detail and commitment to excellence'
  },
  {
    icon: Target,
    title: 'Strategy',
    description: 'Data-driven decisions that align with your business objectives'
  }
]

const stats: Stat[] = [
  {
    number: '50+',
    label: 'Projects Delivered',
    description: 'Successfully launched digital experiences'
  },
  {
    number: '5+',
    label: 'Years Experience',
    description: 'Building innovative web solutions'
  },
  {
    number: '98%',
    label: 'Client Satisfaction',
    description: 'Happy clients who return for more'
  },
  {
    number: '24h',
    label: 'Response Time',
    description: 'Average time to respond to inquiries'
  }
]

interface SkillCardProps {
  skill: Skill
  index: number
}

const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  const Icon = skill.icon
  
  return (
    <article
      className="group p-6 lg:p-8 rounded-3xl bg-white/80 dark:bg-slate-800/80 
               backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50
               hover:border-slate-300/70 dark:hover:border-slate-600/70
               transform hover:scale-105 hover:-translate-y-2
               transition-all duration-300 shadow-lg hover:shadow-2xl
               hover:shadow-blue-500/10 animate-fade-in-up"
      style={{
        animationDelay: `${0.3 + index * 0.1}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                    dark:from-blue-500/30 dark:to-purple-500/30
                    rounded-2xl flex items-center justify-center text-blue-500 
                    dark:text-blue-400 mb-6 group-hover:scale-110 
                    group-hover:from-blue-500/30 group-hover:to-purple-500/30
                    dark:group-hover:from-blue-500/40 dark:group-hover:to-purple-500/40
                    transition-all duration-300 backdrop-blur-sm 
                    border border-blue-500/20 dark:border-blue-500/30">
        <Icon size={28} aria-hidden="true" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3
                   group-hover:text-blue-600 dark:group-hover:text-blue-400
                   transition-colors duration-300">
        {skill.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed
                  group-hover:text-slate-700 dark:group-hover:text-slate-300
                  transition-colors duration-300">
        {skill.description}
      </p>
    </article>
  )
})

SkillCard.displayName = 'SkillCard'

interface StatCardProps {
  stat: Stat
  index: number
}

const StatCard = memo(({ stat, index }: StatCardProps) => (
  <div
    className="text-center p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 
             backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30
             hover:bg-white/80 dark:hover:bg-slate-800/80
             hover:border-slate-300/50 dark:hover:border-slate-600/50
             transition-all duration-300 animate-fade-in-up"
    style={{
      animationDelay: `${0.8 + index * 0.1}s`,
      animationFillMode: 'both'
    }}
  >
    <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r 
                  from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400
                  bg-clip-text text-transparent mb-2">
      {stat.number}
    </div>
    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1
                 transition-colors duration-300">
      {stat.label}
    </h4>
    <p className="text-sm text-slate-600 dark:text-slate-400
                transition-colors duration-300">
      {stat.description}
    </p>
  </div>
))

StatCard.displayName = 'StatCard'

const About = memo(() => {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 bg-gradient-to-br 
               from-slate-100 to-slate-200 
               dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800
               transition-all duration-700 overflow-hidden"
      aria-labelledby="about-title"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br 
                      from-blue-600/10 to-purple-600/10 rounded-full blur-3xl
                      dark:from-blue-600/20 dark:to-purple-600/20" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr 
                      from-purple-600/10 to-blue-600/10 rounded-full blur-3xl
                      dark:from-purple-600/20 dark:to-blue-600/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <header className="text-center mb-16 lg:mb-20">
          <h2
            id="about-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6
                     text-slate-900 dark:text-white transition-colors duration-700
                     animate-fade-in-up"
          >
            ABOUT US
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 
                      max-w-3xl mx-auto leading-relaxed animate-fade-in-up
                      transition-colors duration-700"
             style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Nordic precision meets creative innovation
          </p>
        </header>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6 animate-fade-in-up"
               style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200
                         transition-colors duration-700">
              Crafting Digital Excellence
            </h3>
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 
                          leading-relaxed transition-colors duration-700">
              <p>
                Founded in the heart of Scandinavia, Nordic Code Works embodies the region's 
                commitment to simplicity, functionality, and exceptional craftsmanship.
              </p>
              <p>
                We believe that great digital experiences are born from the perfect balance 
                of technical excellence and thoughtful design. Our approach combines Nordic 
                minimalism with cutting-edge technology to create solutions that are both 
                beautiful and powerful.
              </p>
              <p>
                Every project is an opportunity to push boundaries, solve complex challenges, 
                and create something truly remarkable that serves both users and business goals.
              </p>
            </div>
          </div>
          
          <div className="relative animate-fade-in-up"
               style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
              alt="Nordic Code Works team collaborating on digital projects"
              className="w-full aspect-video object-cover rounded-3xl shadow-2xl
                       filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent 
                          rounded-3xl opacity-60 hover:opacity-30 transition-opacity duration-500" />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 
                       mb-12 animate-fade-in-up transition-colors duration-700"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            What We Excel At
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg 
                      border border-slate-200/50 dark:border-slate-700/50
                      rounded-3xl p-8 lg:p-12 animate-fade-in-up transition-colors duration-700"
             style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <h3 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 
                       mb-12 transition-colors duration-700">
            By the Numbers
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About