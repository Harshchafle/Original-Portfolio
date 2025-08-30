import React from 'react';
import { Mail, Linkedin, Github, Sparkles } from 'lucide-react';
import FloatingCard from '../common/FloatingCard';
import GlassCard from '../common/GlassCard';
import { GITHUB_USER, PERSONAL_INFO } from '../../constants/config';

const Contact = () => {
  const contactMethods = [
    { 
      icon: Mail, 
      title: 'Email', 
      subtitle: PERSONAL_INFO.email, 
      color: 'from-red-500 to-pink-500',
      action: () => window.location.href = `mailto:${PERSONAL_INFO.email}`
    },
    { 
      icon: Linkedin, 
      title: 'LinkedIn', 
      subtitle: 'Professional Network', 
      color: 'from-blue-500 to-blue-600',
      action: () => window.open(PERSONAL_INFO.linkedin, '_blank')
    },
    { 
      icon: Github, 
      title: 'GitHub', 
      subtitle: 'Open Source Projects', 
      color: 'from-gray-600 to-gray-800',
      action: () => window.open(`https://github.com/${GITHUB_USER}`, '_blank')
    }
  ];

  const availableServices = [
    'AI/ML Projects', 
    'Full-Stack Development', 
    'Competitive Programming', 
    'Open Source Contribution', 
    'Technical Mentoring', 
    'Freelance Work'
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FloatingCard>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto">
              Ready to collaborate on groundbreaking AI projects, competitive programming challenges, 
              or full-stack innovations? Let's turn ideas into reality.
            </p>
          </div>
        </FloatingCard>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <FloatingCard key={index} delay={index * 200}>
                <GlassCard 
                  className="p-8 text-center cursor-pointer group h-full"
                  onClick={contact.action}
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${contact.color} rounded-full mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {contact.subtitle}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-blue-400">Click to connect →</span>
                  </div>
                </GlassCard>
              </FloatingCard>
            );
          })}
        </div>

        {/* Services & Contact Info */}
        <FloatingCard delay={600}>
          <GlassCard className="p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 text-blue-400 mb-6">
                <Sparkles className="w-6 h-6" />
                <span className="text-lg font-semibold">Available for</span>
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {availableServices.map((item, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white mb-4">Get in Touch</h4>
                  <div className="space-y-2 text-gray-400">
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {PERSONAL_INFO.location}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📱</span>
                      {PERSONAL_INFO.phone}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">✉️</span>
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-blue-400 italic text-lg font-medium mb-4">
                    "The future belongs to those who believe in the beauty of their dreams."
                  </div>
                  <div className="text-gray-500 text-sm">
                    — Eleanor Roosevelt
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Project Collaboration Opportunity`}
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <Mail className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Send Email</span>
              </a>
              
              <a
                href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi Harsh, I'd like to discuss a project opportunity with you.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 border-2 border-gray-600 hover:border-green-400 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center text-white hover:text-green-400"
              >
                <span className="mr-2">💬</span>
                WhatsApp
              </a>
            </div>
          </GlassCard>
        </FloatingCard>
      </div>
    </section>
  );
};

export default Contact;
