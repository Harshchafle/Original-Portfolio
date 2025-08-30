import React, { useState, useMemo } from 'react';
import { Filter, Github, Sparkles, MessageCircle } from 'lucide-react';
import FloatingCard from '../common/FloatingCard';
import GlassCard from '../common/GlassCard';
import ProjectCard from '../ui/ProjectCard';
import { PROJECTS, PROJECT_CATEGORIES } from '../../constants/projects';
import { GITHUB_USER } from '../../constants/config';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = useMemo(() => 
    filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <FloatingCard>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Showcasing innovative solutions that blend cutting-edge technology with practical applications
            </p>
          </div>
        </FloatingCard>

        {/* Enhanced Filter */}
        <FloatingCard delay={200}>
          <div className="flex items-center justify-center mb-16">
            <GlassCard className="p-6 border-2 border-white/10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Filter className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Filter by:</span>
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-800/50 text-white font-medium px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
                >
                  {PROJECT_CATEGORIES.map(c => (
                    <option key={c} value={c} className="bg-gray-800 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </GlassCard>
          </div>
        </FloatingCard>

        {/* Projects Grid */}
        <div className="space-y-12">
          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.filter(p => p.featured).map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index}
                featured={true}
              />
            ))}
          </div>

          {/* Regular Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.filter(p => !p.featured).map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index + 3}
                featured={false}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <FloatingCard delay={800}>
          <div className="text-center mt-20">
            <GlassCard className="p-12 max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Explore My Complete Portfolio
                </h3>
                <p className="text-gray-400 text-lg">
                  Discover more projects, contributions, and open-source work on my GitHub profile
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Github className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Explore All Projects</span>
                  <Sparkles className="w-6 h-6 ml-3 relative z-10 animate-pulse" />
                </a>
                
                <a
                  href="mailto:chafleharsh@gmail.com?subject=Project Collaboration"
                  className="group relative overflow-hidden px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center text-white hover:text-blue-400"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  <span>Let's Collaborate</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
};

export default Projects;