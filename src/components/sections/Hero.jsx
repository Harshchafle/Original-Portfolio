import React from 'react';
import { Rocket, Github, ArrowRight, Download, MessageCircle, ChevronDown } from 'lucide-react';
import FloatingCard from '../common/FloatingCard';
import StatCard from '../ui/StatCard';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { useGithubStats } from '../../hooks/useGithubStats';
import { GITHUB_USER } from '../../constants/config';

const Hero = () => {
  const roles = [
    'Competitive Programmer 🏆',
    'Software Developer 💻',
    'Data Analyst 📊',
    'AI Enthusiast 🤖',
    'Agentic AI Learner 🧠',
    'Problem Solver 🔍'
  ];

  const typedText = useTypingEffect(roles);
  const githubStats = useGithubStats();

  const leetcodeStats = {
    solved: 500,
    streak: 31,
    rank: 157560,
    rating: 1443,
    loading: false
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <FloatingCard>
          <div className="mb-12">
            <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-8">
              <Rocket className="w-12 h-12 text-blue-400 animate-bounce" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="block text-gray-300">Hello, I'm</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Harsh Chafle
              </span>
            </h1>
            
            <div className="text-3xl md:text-4xl text-gray-300 h-20 flex items-center justify-center mb-8">
              <span className="mr-3">I'm a</span>
              <span className="text-blue-400 font-mono border-r-2 border-blue-400 pr-2 min-w-[400px] text-left">
                {typedText}
              </span>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-400/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transforming complex problems into elegant solutions through 
              <span className="text-blue-400 font-semibold"> AI innovation</span>, 
              <span className="text-purple-400 font-semibold"> competitive programming</span>, and 
              <span className="text-pink-400 font-semibold"> cutting-edge development</span>.
            </p>
          </div>
        </FloatingCard>

        <FloatingCard delay={200}>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Let's Connect
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
               className="group px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              <span className="flex items-center">
                <Github className="w-5 h-5 mr-2" />
                View Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a className="group px-8 py-4 border-2 border-gray-600 hover:border-green-400 rounded-xl font-semibold transition-all duration-300 hover:scale-105" href="/Harsh_Chafle_Resume.pdf" download>
              <span className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Resume
              </span>
            </a>
          </div>
        </FloatingCard>

        {/* Quick Stats */}
        <FloatingCard delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatCard
              title="Problems Solved"
              value={leetcodeStats.solved}
              suffix="+"
              icon="🎯"
              color="from-green-500 to-emerald-600"
            />
            <StatCard
              title="Day Streak"
              value={leetcodeStats.streak}
              icon="🔥"
              color="from-orange-500 to-red-500"
            />
            <StatCard
              title="GitHub Stars"
              value={githubStats.stars}
              suffix="+"
              icon="⭐"
              color="from-yellow-500 to-orange-500"
              loading={githubStats.loading}
            />
            <StatCard
              title="Repositories"
              value={githubStats.repos}
              suffix="+"
              icon="💻"
              color="from-purple-500 to-pink-500"
              loading={githubStats.loading}
            />
          </div>
        </FloatingCard>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
