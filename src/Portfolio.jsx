import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, Database, Target, Code, Brain, Trophy,Globe, Filter,
  Moon, Sun, Download, Volume2, VolumeX, ChevronDown, ArrowRight,
  Sparkles, Rocket, Zap, Award, BookOpen, MessageCircle
} from 'lucide-react';

// ---------- constants ----------
const GITHUB_USER = 'Harshchafle';
const GITHUB_API = 'https://api.github.com';

// ---------- Particle Background Component ----------
const ParticleBackground = React.memo(function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles.length = 0;
      const particleCount = Math.min(150, window.innerWidth / 10);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
        });
      }
    };
    
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 100) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at bottom, #1e3a8a 0%, #030712 70%)' }}
    />
  );
});

// ---------- helpers ----------
async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function getAllPages(url, perPage = 100, maxPages = 10) {
  let page = 1;
  const all = [];
  while (page <= maxPages) {
    const res = await fetch(`${url}?per_page=${perPage}&page=${page}`, { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const chunk = await res.json();
    all.push(...chunk);
    if (!Array.isArray(chunk) || chunk.length < perPage) break;
    page++;
  }
  return all;
}

// ----------  Components ----------
const FloatingCard = React.memo(function FloatingCard({ children, className = "", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-10 opacity-0 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  );
});

const GlassCard = React.memo(function GlassCard({ children, className = "", hover = true }) {
  return (
    <div className={`
      backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl
      ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/20 hover:-translate-y-2' : ''}
      transition-all duration-500 ease-out
      ${className}
    `}>
      {children}
    </div>
  );
});

const AnimatedSkillBar = React.memo(function AnimatedSkillBar({ skill, delay = 0 }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setProgress(skill.level);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skill.level, delay]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-semibold text-lg">{skill.name}</span>
        <span className="text-blue-300 font-mono text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
        <div
          className={`${skill.color} h-3 rounded-full transition-all duration-2000 ease-out shadow-lg relative`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
});

const ProjectCard = React.memo(function ProjectCard({ project, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = project.icon;

  return (
    <GlassCard className="p-6 h-full group cursor-pointer" hover={false}>
      <div
        className="h-full"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div className={`transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          {/* Front */}
          <div className="backface-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 animate-pulse' :
                project.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-gray-700/50 text-blue-300 text-xs rounded-full border border-blue-500/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Back */}
          <div className="backface-hidden rotate-y-180 absolute inset-0 p-6 flex flex-col justify-center items-center text-center">
            <div className="mb-4">
              <Icon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            </div>
            <div className="space-y-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600/80 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Project
              </a>
              <div className="text-sm text-gray-400">
                Click to explore on GitHub
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
});


const AnimatedCounter = React.memo(function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          let start = 0;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setCount(Math.floor(easeOut * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}{suffix}</span>;
});

// ---------- Main Portfolio Component ----------
const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Existing state and logic...
  const roles = useMemo(() => [
    'Competitive Programmer 🏆',
    'Software Developer 💻',
    'Data Analyst 📊',
    'AI Enthusiast 🤖',
    'Agentic AI Learner 🧠',
    'Problem Solver 🔍'
  ], []);

  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);

  const [leetcodeStats, setLeetcodeStats] = useState({
    solved: 500,
    streak: 31,
    rank: 157560,
    rating: 1443,
    loading: false
  });

  const [githubStats, setGithubStats] = useState({
    repos: 0,
    stars: 0,
    followers: 0,
    following: 0,
    commits: 500,
    prs: 15,
    loading: true,
    error: null
  });

  //  skills with icons
  const skills = useMemo(() => ({
    programming: [
      { name: 'Java', level: 90, color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: '☕' },
      { name: 'Python', level: 85, color: 'bg-gradient-to-r from-blue-500 to-green-500', icon: '🐍' },
      { name: 'JavaScript', level: 80, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', icon: '⚡' },
      { name: 'C', level: 75, color: 'bg-gradient-to-r from-gray-500 to-blue-500', icon: '🔧' }
    ],
    ai: [
      { name: 'FastAPI', level: 50, color: 'bg-gradient-to-r from-green-500 to-teal-500', icon: '🚀' },
      { name: 'TensorFlow', level: 70, color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: '🧠' },
      { name: 'Pandas', level: 85, color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '🐼' },
      { name: 'NumPy', level: 80, color: 'bg-gradient-to-r from-blue-500 to-purple-500', icon: '📊' }
    ],
    web: [
      { name: 'React.js', level: 85, color: 'bg-gradient-to-r from-cyan-400 to-blue-500', icon: '⚛️' },
      { name: 'Node.js', level: 80, color: 'bg-gradient-to-r from-green-500 to-green-700', icon: '🟢' },
      { name: 'MongoDB', level: 75, color: 'bg-gradient-to-r from-green-400 to-green-600', icon: '🍃' },
      { name: 'MySQL', level: 80, color: 'bg-gradient-to-r from-blue-400 to-blue-600', icon: '🐬' }
    ]
  }), []);

  //  projects
  const projects = useMemo(() => ([
  {
    title: 'AI-Powered SEO Content Optimizer',
    description: 'Revolutionary AI tool using FastAPI to optimize content for search engines with real-time NLP scoring, sentiment analysis, and actionable insights.',
    tech: ['Python', 'FastAPI', 'AI/ML', 'NLP', 'SEO', 'React'],
    status: 'In Progress',
    category: 'AI',
    icon: Brain,
    github: 'https://github.com/Harshchafle/AI-Powered-SEO-Content-Optimizer',
    demo: '#', // Add actual deployed URL when available
    featured: true,
    gradient: 'from-blue-600 via-purple-600 to-indigo-700'
  },
  {
    title: 'StatPrep.AI',
    description: 'Intelligent automated preprocessing pipeline for ML datasets with advanced schema validation, smart imputation strategies, and feature engineering.',
    tech: ['Python', 'FastAPI', 'AI/ML', 'React', 'TypeScript', 'Docker'],
    status: 'In Progress',
    category: 'AI/ML',
    icon: Sparkles,
    github: 'https://github.com/Harshchafle/StatPrep.AI',
    demo: '#', // Add actual deployed URL when available
    featured: true,
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
  },
  {
    title: 'Collaborative Knowledge Base Platform',
    description: 'Next-generation real-time knowledge sharing platform with advanced search, collaborative editing, role-based access, and AI-powered suggestions.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'WebSocket', 'Redis'],
    status: 'In Progress',
    category: 'Web Development',
    icon: Globe,
    github: 'https://github.com/Harshchafle/Collaborative-Knowledge-Base-Learning-Platform',
    demo: '#', // Add actual deployed URL when available
    featured: true,
    gradient: 'from-orange-600 via-red-600 to-pink-700'
  },
  {
    title: 'LeetCode Solutions Repository',
    description: 'Comprehensive collection of 200+ optimized DSA solutions featuring multiple approaches, detailed complexity analysis, and interview preparation guides.',
    tech: ['Java', 'Python', 'DSA', 'Algorithms', 'System Design'],
    status: 'Active',
    category: 'Competitive Programming',
    icon: Trophy,
    github: 'https://github.com/Harshchafle/LeetCode-Questions',
    demo: 'https://leetcode.com/u/chafleharsh/', // LeetCode profile
    featured: false,
    gradient: 'from-yellow-600 via-amber-600 to-orange-700'
  },
  {
    title: 'Netflix Data Analytics',
    description: 'Comprehensive EDA on Netflix titles using pandas and seaborn to derive content trends, viewing patterns, and actionable insights for content strategy.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    status: 'Completed',
    category: 'Data Analysis',
    icon: Database,
    github: 'https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/NetflixDataAnalysis',
    demo: '#', // Add actual deployed URL when available
    featured: false,
    gradient: 'from-red-600 via-rose-600 to-pink-700'
  },
  {
    title: 'Todo App with Advanced Features',
    description: 'Modern task manager with drag-and-drop functionality, priority levels, due dates, categories, and local storage persistence.',
    tech: ['React', 'JavaScript', 'CSS3', 'Local Storage'],
    status: 'Completed',
    category: 'Web Development',
    icon: Target,
    github: 'https://github.com/Harshchafle/Todo-App',
    demo: '#', // Add actual deployed URL when available
    featured: false,
    gradient: 'from-green-600 via-emerald-600 to-teal-700'
  }
]), []);

  // Enhanced Project Card Component
const EnhancedProjectCard = React.memo(function EnhancedProjectCard({ project, index, featured = false }) {
  const [isHovered, setIsHovered] = useState(false);
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
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        {/* Glass Card */}
        <GlassCard className={`relative p-6 h-full border-2 border-transparent group-hover:border-white/20 ${
          featured ? 'lg:p-8' : ''
        }`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
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
          <p className={`text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors ${
            featured ? 'text-lg' : ''
          }`}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-gray-800/50 text-blue-300 text-xs rounded-full border border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group/btn relative overflow-hidden px-4 py-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-500/10 to-gray-600/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <Github className="w-4 h-4 mr-2 relative z-10" />
              <span className="font-medium text-sm relative z-10">View Code</span>
            </a>
            
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 group/btn relative overflow-hidden px-4 py-3 bg-gradient-to-r ${project.gradient} hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 ${
                project.demo === '#' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={project.demo === '#' ? (e) => e.preventDefault() : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <ExternalLink className="w-4 h-4 mr-2 relative z-10 text-white" />
              <span className="font-medium text-sm relative z-10 text-white">
                {project.demo === '#' ? 'Coming Soon' : 'Live Demo'}
              </span>
            </a>
          </div>

          {/* Hover Effect Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl`}></div>
        </GlassCard>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-20 blur-xl`}></div>
        </div>
      </div>
    </FloatingCard>
  );
});

  // Typing animation
  useEffect(() => {
    const roleText = roles[currentRole];
    let index = 0;
    setTypedText('');
    
    const typeInterval = setInterval(() => {
      if (index < roleText.length) {
        setTypedText(roleText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        const timeout = setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, [currentRole, roles]);

  // GitHub stats loader
  const loadGithubStats = useCallback(async () => {
    try {
      setGithubStats((s) => ({ ...s, loading: true, error: null }));
      const user = await fetchJson(`${GITHUB_API}/users/${GITHUB_USER}`);
      const repos = await getAllPages(`${GITHUB_API}/users/${GITHUB_USER}/repos`, 100, 10);
      const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      
      setGithubStats((s) => ({
        ...s,
        repos: user?.public_repos ?? repos.length,
        stars,
        followers: user?.followers ?? 0,
        following: user?.following ?? 0,
        loading: false,
        error: null
      }));
    } catch (e) {
      setGithubStats((s) => ({ ...s, loading: false, error: e?.message || 'Failed to load GitHub stats' }));
    }
  }, []);

  useEffect(() => {
    loadGithubStats();
    const interval = setInterval(loadGithubStats, 5 * 60_000);
    return () => clearInterval(interval);
  }, [loadGithubStats]);

  const [filter, setFilter] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);
  const filteredProjects = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.category === filter), [projects, filter]);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className="bg-gray-950 text-white min-h-screen relative overflow-x-hidden">
        <ParticleBackground />
        
        {/*  Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-gray-950/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center py-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Harsh Chafle
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                {['About', 'Skills', 'Projects', 'Stats', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="relative group text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                
                <div className="flex space-x-2">
                  <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" 
                     className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/harsh-chafle-641809292/" target="_blank" rel="noopener noreferrer"
                     className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:chafleharsh@gmail.com" 
                     className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          {/*  Hero Section */}
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
                  
                  <button className="group px-8 py-4 border-2 border-gray-600 hover:border-green-400 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    <span className="flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Resume
                    </span>
                  </button>
                </div>
              </FloatingCard>

              {/*  Quick Stats */}
              <FloatingCard delay={400}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {[
                    { title: 'Problems Solved', value: leetcodeStats.solved, suffix: '+', icon: '🎯', color: 'from-green-500 to-emerald-600' },
                    { title: 'Day Streak', value: leetcodeStats.streak, suffix: '', icon: '🔥', color: 'from-orange-500 to-red-500' },
                    { title: 'GitHub Stars', value: githubStats.stars, suffix: '+', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
                    { title: 'Repositories', value: githubStats.repos, suffix: '+', icon: '💻', color: 'from-purple-500 to-pink-500' }
                  ].map((stat, index) => (
                    <GlassCard key={index} className="p-6 text-center group">
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className={`text-3xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-white transition-colors">{stat.title}</div>
                    </GlassCard>
                  ))}
                </div>
              </FloatingCard>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </section>

          {/*  About Section */}
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
                    {[
                      { icon: Trophy, title: 'LeetCode Champion', desc: '500+ problems solved with 31-day streak', color: 'text-yellow-400' },
                      { icon: Award, title: 'Academic Excellence', desc: 'Maintaining 8.72 CGPA throughout', color: 'text-blue-400' },
                      { icon: Rocket, title: 'AI Innovator', desc: 'Building next-gen AI applications', color: 'text-purple-400' },
                      { icon: Zap, title: 'Full-Stack Expert', desc: 'Modern web technologies & frameworks', color: 'text-green-400' }
                    ].map((achievement, index) => {
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

          {/* Skills Section */}
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
                {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                  <FloatingCard key={category} delay={categoryIndex * 200}>
                    <GlassCard className="p-8 h-full">
                      <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                          {category === 'programming' && <Code className="w-6 h-6 text-white" />}
                          {category === 'ai' && <Brain className="w-6 h-6 text-white" />}
                          {category === 'web' && <Globe className="w-6 h-6 text-white" />}
                        </div>
                        <h3 className="text-2xl font-bold text-white capitalize">
                          {category === 'ai' ? 'AI & Data Science' : category}
                        </h3>
                      </div>
                      
                      <div className="space-y-6">
                        {skillList.map((skill, index) => (
                          <AnimatedSkillBar key={skill.name} skill={skill} delay={index * 200} />
                        ))}
                      </div>
                    </GlassCard>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
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
              {categories.map(c => (
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
          <EnhancedProjectCard 
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
          <EnhancedProjectCard 
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

          {/*  Stats Section */}
          <section id="stats" className="py-32 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
            <div className="max-w-7xl mx-auto">
              <FloatingCard>
                <div className="text-center mb-20">
                  <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Live Statistics
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
                </div>
              </FloatingCard>

              <div className="grid lg:grid-cols-2 gap-12">
                <FloatingCard delay={200}>
                  <GlassCard className="p-10 h-full">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">LeetCode Performance</h3>
                      <p className="text-gray-400">Competitive Programming Excellence</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { label: 'Problems Solved', value: leetcodeStats.solved, color: 'text-green-400', icon: '🎯' },
                        { label: 'Current Streak', value: leetcodeStats.streak, color: 'text-orange-400', icon: '🔥' },
                        { label: 'Global Rank', value: leetcodeStats.rank.toLocaleString(), color: 'text-red-400', icon: '🏆' },
                        { label: 'Contest Rating', value: leetcodeStats.rating, color: 'text-blue-400', icon: '⚡' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center group">
                          <div className="text-2xl mb-2">{stat.icon}</div>
                          <div className={`text-4xl font-black mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                            <AnimatedCounter end={typeof stat.value === 'string' ? 157560 : stat.value} />
                          </div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </FloatingCard>

                <FloatingCard delay={400}>
                  <GlassCard className="p-10 h-full">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full mb-4">
                        <Github className="w-8 h-8 text-white" />
                        {githubStats.loading && <div className="ml-2 animate-spin">⟳</div>}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">GitHub Activity</h3>
                      <p className="text-gray-400">Open Source Contributions</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { label: 'Repositories', value: githubStats.repos, color: 'text-blue-400', icon: '📁' },
                        { label: 'Stars Earned', value: githubStats.stars, color: 'text-yellow-400', icon: '⭐' },
                        { label: 'Followers', value: githubStats.followers, color: 'text-green-400', icon: '👥' },
                        { label: 'Following', value: githubStats.following, color: 'text-purple-400', icon: '🤝' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center group">
                          <div className="text-2xl mb-2">{stat.icon}</div>
                          <div className={`text-4xl font-black mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                            {githubStats.loading ? '...' : <AnimatedCounter end={stat.value} />}
                          </div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </FloatingCard>
              </div>
            </div>
          </section>

          {/*  Contact Section */}
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

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  { 
                    icon: Mail, 
                    title: 'Email', 
                    subtitle: 'chafleharsh@gmail.com', 
                    color: 'from-red-500 to-pink-500',
                    action: () => window.location.href = 'mailto:chafleharsh@gmail.com'
                  },
                  { 
                    icon: Linkedin, 
                    title: 'LinkedIn', 
                    subtitle: 'Professional Network', 
                    color: 'from-blue-500 to-blue-600',
                    action: () => window.open('https://www.linkedin.com/in/harsh-chafle-641809292/', '_blank')
                  },
                  { 
                    icon: Github, 
                    title: 'GitHub', 
                    subtitle: 'Open Source Projects', 
                    color: 'from-gray-600 to-gray-800',
                    action: () => window.open(`https://github.com/${GITHUB_USER}`, '_blank')
                  }
                ].map((contact, index) => {
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
                      </GlassCard>
                    </FloatingCard>
                  );
                })}
              </div>

              <FloatingCard delay={600}>
                <GlassCard className="p-12 text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center space-x-2 text-blue-400 mb-4">
                      <Sparkles className="w-6 h-6" />
                      <span className="text-lg font-semibold">Available for</span>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      {[
                        'AI/ML Projects', 'Full-Stack Development', 'Competitive Programming', 
                        'Open Source Contribution', 'Technical Mentoring', 'Freelance Work'
                      ].map((item, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 mb-6">📍 India • 📱 +91 79722 34194</p>
                    <div className="text-blue-400 italic text-lg font-medium">
                      "The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt
                    </div>
                  </div>
                </GlassCard>
              </FloatingCard>
            </div>
          </section>
        </main>

        {/*  Footer */}
        <footer className="relative border-t border-white/10 backdrop-blur-xl bg-gray-950/70 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Harsh Chafle
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Passionate developer crafting the future through code, one algorithm at a time. 
                Always learning, always building, always innovating.
              </p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Github, url: `https://github.com/${GITHUB_USER}` },
                { icon: Linkedin, url: 'https://www.linkedin.com/in/harsh-chafle-641809292/' },
                { icon: Mail, url: 'mailto:chafleharsh@gmail.com' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer"
                     className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors group">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Harsh Chafle. Crafted with ❤️ using React & Tailwind CSS.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Last updated: {new Date().toLocaleString()} • Built for the future
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
