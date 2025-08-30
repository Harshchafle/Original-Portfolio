import React from 'react';
import { Trophy, Award, Rocket, Zap, BookOpen } from 'lucide-react';
import FloatingCard from '../common/FloatingCard';
import GlassCard from '../common/GlassCard';

const About = () => {
  const achievements = [
    { icon: Trophy, title: 'LeetCode Champion', desc: '500+ problems solved with 31-day streak', color: 'text-yellow-400' },
    { icon: Award, title: 'Academic Excellence', desc: 'Maintaining 8.72 CGPA throughout', color: 'text-blue-400' },
    { icon: Rocket, title: 'AI Innovator', desc: 'Building next-gen AI applications', color: 'text-purple-400' },
    { icon: Zap, title: 'Full-Stack Expert', desc: 'Modern web technologies & frameworks', color: 'text-green-400' }
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <FloatingCard>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </FloatingCard>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FloatingCard delay={200}>
            <GlassCard className="p-10 h-full">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Education Excellence</h3>
                    <p className="text-blue-400">B.Tech Computer Science • CGPA 8.72</p>
                  </div>
                </div>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Passionate <span className="text-blue-400 font-semibold">Computer Science student</span> specializing in Data Science, 
                    with a proven track record of academic excellence and practical implementation.
                  </p>
                  <p>
                    Dedicated to <span className="text-purple-400 font-semibold">competitive programming</span> and 
                    <span className="text-pink-400 font-semibold"> AI innovation</span>, constantly pushing the boundaries 
                    of what's possible with modern technology.
                  </p>
                  <p>
                    Currently architecting an <span className="text-green-400 font-semibold">AI-powered SEO optimizer</span> 
                    that bridges the gap between artificial intelligence insights and measurable business outcomes.
                  </p>
                </div>
              </div>
            </GlassCard>
          </FloatingCard>

          <FloatingCard delay={400}>
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <GlassCard key={index} className="p-6 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gray-800/50 rounded-xl ${achievement.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default About;
