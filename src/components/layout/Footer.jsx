import React from 'react';
import { Github, Linkedin, Mail, Heart, Code, ArrowUp } from 'lucide-react';
import { GITHUB_USER, PERSONAL_INFO } from '../../constants/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleString();

  const socialLinks = [
    { 
      icon: Github, 
      url: `https://github.com/${GITHUB_USER}`, 
      label: 'GitHub',
      hoverColor: 'group-hover:text-gray-300'
    },
    { 
      icon: Linkedin, 
      url: PERSONAL_INFO.linkedin, 
      label: 'LinkedIn',
      hoverColor: 'group-hover:text-blue-400'
    },
    { 
      icon: Mail, 
      url: `mailto:${PERSONAL_INFO.email}`, 
      label: 'Email',
      hoverColor: 'group-hover:text-red-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Stats', href: '#stats' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 backdrop-blur-xl bg-gray-950/70">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Harsh Chafle
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Passionate developer crafting the future through code, one algorithm at a time. 
              Always learning, always building, always innovating.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`group p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className={`w-5 h-5 text-gray-400 transition-colors ${social.hoverColor}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <span className="mr-3">📍</span>
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📱</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-white transition-colors">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center">
                <span className="mr-3">✉️</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>© {currentYear} Harsh Chafle. Crafted with</span>
              <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" />
              <span>using React &</span>
              <Code className="w-4 h-4 mx-1 text-blue-400" />
              <span>Tailwind CSS.</span>
            </div>

            {/* Status & Updates */}
            <div className="text-center md:text-right">
              <div className="text-xs text-gray-500 mb-1">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Available for opportunities
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {lastUpdated}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="absolute bottom-8 right-8">
          <button
            onClick={scrollToTop}
            className="group p-3 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 hover:border-blue-400/50 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Developer Signature */}
        <div className="text-center mt-8 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500 italic">
            "Code is poetry written in logic, crafted with passion, and executed with precision."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
