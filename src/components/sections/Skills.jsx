import React from 'react';
import FloatingCard from '../common/FloatingCard';
import GlassCard from '../common/GlassCard';
import SkillBar from '../ui/SkillBar';
import { SKILLS, SKILL_CATEGORIES } from '../../constants/skills';

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <FloatingCard>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto">
              Mastering cutting-edge technologies to build tomorrow's solutions
            </p>
          </div>
        </FloatingCard>

        <div className="grid lg:grid-cols-3 gap-10">
          {Object.entries(SKILLS).map(([category, skillList], categoryIndex) => {
            const { icon: Icon, title } = SKILL_CATEGORIES[category];
            
            return (
              <FloatingCard key={category} delay={categoryIndex * 200}>
                <GlassCard className="p-8 h-full">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {title}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {skillList.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 200} />
                    ))}
                  </div>
                </GlassCard>
              </FloatingCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
