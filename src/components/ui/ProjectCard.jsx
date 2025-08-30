import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import FloatingCard from '../common/FloatingCard';
import GlassCard from '../common/GlassCard';

const ProjectCard = React.memo(function ProjectCard({ project, index, featured = false }) {
  const [, setIsHovered] = useState(false);
  const Icon = project.icon;

  return (
    <FloatingCard delay={index * 150}>
      <div 
        className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
          featured ? 'lg:col-span-2' : 'col-span-1'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
        
        {/* Glass Card */}
        <GlassCard className={`relative p-6 h-full border-2 border-transparent group-hover:border-white/20 ${
          featured ? 'lg:p-8' : ''
        }`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-bold text-white group-hover:text-blue-300 transition-colors ${
                  featured ? 'text-2xl lg:text-3xl' : 'text-xl'
                }`}>
                  {project.title}
                </h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                  project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  project.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    project.status === 'In Progress' ? 'bg-yellow-400 animate-pulse' :
                    project.status === 'Active' ? 'bg-green-400 animate-pulse' :
                    'bg-blue-400'
                  }`}></div>
                  {project.status}
                </span>
              </div>
            </div>
            {featured && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                FEATURED
              </div>
            )}
          </div>

          {/* Description */}
          <p className={`text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors relative z-10 ${
            featured ? 'text-lg' : ''
          }`}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8 relative z-10">
            {project.tech.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-gray-800/50 text-blue-300 text-xs rounded-full border border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons - FIXED WITH PROPER Z-INDEX AND POINTER EVENTS */}
          <div className="flex gap-4 mt-auto relative z-20">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group/btn relative overflow-hidden px-4 py-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 flex items-center justify-center pointer-events-auto z-30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-500/10 to-gray-600/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              <Github className="w-4 h-4 mr-2 relative z-10" />
              <span className="font-medium text-sm relative z-10">View Code</span>
            </a>
            
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 group/btn relative overflow-hidden px-4 py-3 bg-gradient-to-r ${project.gradient} hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 pointer-events-auto z-30 ${
                project.demo === '#' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              }`}
              onClick={project.demo === '#' ? (e) => e.preventDefault() : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              <ExternalLink className="w-4 h-4 mr-2 relative z-10 text-white" />
              <span className="font-medium text-sm relative z-10 text-white">
                {project.demo === '#' ? 'Coming Soon' : 'Live Demo'}
              </span>
            </a>
          </div>
        </GlassCard>

        {/* Hover Effect Overlay - HAS pointer-events-none ✅ */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl`}></div>

        {/* Animated Border - FIXED with pointer-events-none */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-20 blur-xl pointer-events-none`}></div>
        </div>
      </div>
    </FloatingCard>
  );
});

export default ProjectCard;
