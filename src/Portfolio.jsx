import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Brain, Trophy, Target, Zap, ChevronRight, Star, GitBranch, Users, Calendar, Activity, Cpu, Database, Globe, Server } from 'lucide-react';

const Portfolio = () => {
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [leetcodeStats, setLeetcodeStats] = useState({
    solved: 200,
    streak: 31,
    rank: 497685,
    rating: 1250,
    loading: true
  });
  const [githubStats, setGithubStats] = useState({
    repos: 45,
    stars: 250,
    commits: 500,
    prs: 15,
    followers: 10,
    following: 20,
    loading: true
  });

  const roles = [
    "Competitive Programmer",
    "Software Developer", 
    "Data Analyst",
    "AI Enthusiast",
    "Agentic AI Learner",
    "Problem Solver"
  ];

  const skills = {
    programming: [
      { name: 'Java', level: 90, color: 'bg-orange-500' },
      { name: 'Python', level: 85, color: 'bg-blue-500' },
      { name: 'JavaScript', level: 80, color: 'bg-yellow-500' },
      { name: 'C', level: 75, color: 'bg-gray-500' }
    ],
    ai: [
      { name: 'FastAPI', level: 50, color: 'bg-green-500' },
      { name: 'TensorFlow', level: 70, color: 'bg-orange-600' },
      { name: 'Pandas', level: 85, color: 'bg-purple-500' },
      { name: 'NumPy', level: 80, color: 'bg-blue-600' }
    ],
    web: [
      { name: 'React.js', level: 85, color: 'bg-cyan-500' },
      { name: 'Node.js', level: 80, color: 'bg-green-600' },
      { name: 'MongoDB', level: 75, color: 'bg-green-500' },
      { name: 'MySQL', level: 80, color: 'bg-blue-500' }
    ]
  };

  const projects = [
    {
      title: "AI-Powered SEO Content Optimizer",
      description: "Advanced AI tool using FastAPI and Python to optimize content for search engines with real-time analysis and suggestions.",
      tech: ["Python", "FastAPI", "AI/ML", "NLP", "SEO"],
      status: "In Progress",
      category: "AI",
      icon: <Brain className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/AI-Powered-SEO-Content-Optimizer"
    },
    {
      title: "LeetCode Solutions Repository",
      description: "Comprehensive collection of 200+ optimized solutions with detailed complexity analysis and multiple approaches.",
      tech: ["Java", "Python", "DSA", "Algorithms"],
      status: "Active",
      category: "Competitive Programming",
      icon: <Code className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/LeetCode-Questions"
    },
    {
      title: "Collaborative Knowledge Base Platform",
      description: "Modern collaborative platform for knowledge sharing and learning with real-time features and user management.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      status: "In Progress",
      category: "Web Development",
      icon: <Globe className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/Collaborative-Knowledge-Base-Learning-Platform"
    },
    {
      title: "Netflix Data Analytics",
      description: "The primary goal of this project is to perform an Exploratory Data Analysis (EDA) on a dataset of Netflix movies.",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      status: "Completed",
      category: "Data Analysis",
      icon: <Database className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/NetflixDataAnalysis"
    },
    {
      title: "Google Search Trend Analyzer",
      description: "Single Keyword Analysis: Dive deep into the search interest for a single keyword.",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      status: "Completed",
      category: "Data Analysis",
      icon: <Database className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/GoogleDataAnalysis"
    }
  ];

  const basicProjects = [
    {
      title: "Todo App",
      description: "Simple and efficient todo application with task management features.",
      tech: ["React", "JavaScript", "CSS"],
      status: "Completed",
      category: "Basic Web",
      icon: <Target className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/Todo-App"
    },
    {
      title: "Image Generator",
      description: "Creative image generation tool with various artistic styles and options.",
      tech: ["JavaScript", "HTML", "CSS"],
      status: "Completed",
      category: "Basic Web",
      icon: <Brain className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/Image-Generator"
    },
    {
      title: "Calculator",
      description: "Advanced calculator with scientific functions and modern UI design.",
      tech: ["JavaScript", "HTML", "CSS"],
      status: "Completed",
      category: "Basic Web",
      icon: <Cpu className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/Calculator"
    },
    {
      title: "Password Generator",
      description: "Secure password generator with customizable strength and character options.",
      tech: ["JavaScript", "HTML", "CSS"],
      status: "Completed",
      category: "Basic Web",
      icon: <Zap className="w-6 h-6" />,
      link: "https://github.com/Harshchafle/PassWord-Generator"
    }
  ];

  const achievements = [
    { title: "LeetCode 100-Day Streak Badge", icon: "🏆", description: "Consistent problem solving" },
    { title: "500+ Problems Solved", icon: "🎯", description: "Across multiple platforms" },
    { title: "CGPA: 8.72", icon: "🎓", description: "B.Tech CSE (Data Science)" },
    { title: "AI Project Builder", icon: "🤖", description: "Building next-gen solutions" }
  ];

  // Fetch GitHub stats
  const fetchGitHubStats = async () => {
    try {
      const response = await fetch('https://api.github.com/users/Harshchafle');
      const userData = await response.json();
      
      const reposResponse = await fetch('https://api.github.com/users/Harshchafle/repos');
      const reposData = await reposResponse.json();
      
      const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      
      setGithubStats({
        repos: userData.public_repos || 45,
        stars: totalStars || 250,
        followers: userData.followers || 10,
        following: userData.following || 20,
        commits: 500, // GitHub API doesn't provide total commits easily
        prs: 15, // Keeping static for now
        loading: false
      });
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setGithubStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Fetch LeetCode stats (using a proxy or alternative approach since LeetCode API is not public)
  const fetchLeetCodeStats = async () => {
    try {
      // Since LeetCode doesn't have a public API, we'll use static data
      // In a real implementation, you might use a proxy service or scraping solution
      setLeetcodeStats({
        solved: 500,
        streak: 31,
        rank: 168078,
        rating: 1425,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching LeetCode stats:', error);
      setLeetcodeStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Typing animation effect
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
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  // Fetch stats on component mount
  useEffect(() => {
    fetchGitHubStats();
    fetchLeetCodeStats();
  }, []);

  // Auto-update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchGitHubStats();
      fetchLeetCodeStats();
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-blue-400">{project.icon}</div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
          project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {project.status}
        </span>
      </div>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-gray-700 text-blue-400 text-xs rounded-md">
            {tech}
          </span>
        ))}
      </div>
      <a 
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
      >
        <span className="mr-2">View Project</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );

  const StatCard = ({ title, value, icon, color, subtext, loading }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            {loading ? '...' : value}
          </div>
          <div className="text-sm opacity-80">{subtext}</div>
        </div>
      </div>
      <div className="text-sm opacity-90">{title}</div>
    </div>
  );

  const handleContactClick = () => {
    window.location.href = "mailto:chafleharsh@gmail.com";
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Harsh Chafle
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Basic Projects', 'Stats', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/Harshchafle" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/harsh-chafle-641809292/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
              </a>
              <a href="mailto:chafleharsh@gmail.com">
                <Mail className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Harsh</span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 h-12 flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="text-blue-400 font-mono border-r-2 border-blue-400 pr-1 animate-pulse">
                {typedText}
              </span>
            </div>
          </div>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Passionate about solving complex problems through code, building AI-powered solutions, 
            and competing in algorithmic challenges. Currently working on next-gen AI tools.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </button>
            <a href="https://github.com/Harshchafle" target="_blank" rel="noopener noreferrer" className="border border-gray-600 hover:border-blue-400 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
              <Github className="w-4 h-4 mr-2" />
              View GitHub
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <StatCard 
              title="Problems Solved" 
              value={leetcodeStats.solved + "+"} 
              icon="🎯" 
              color="from-green-600 to-green-700"
              subtext="LeetCode"
              loading={leetcodeStats.loading}
            />
            <StatCard 
              title="Current Streak" 
              value={leetcodeStats.streak} 
              icon="🔥" 
              color="from-orange-600 to-orange-700"
              subtext="Days"
              loading={leetcodeStats.loading}
            />
            <StatCard 
              title="GitHub Stars" 
              value={githubStats.stars + "+"} 
              icon="⭐" 
              color="from-yellow-600 to-yellow-700"
              subtext="Earned"
              loading={githubStats.loading}
            />
            <StatCard 
              title="Repositories" 
              value={githubStats.repos + "+"} 
              icon="🤖" 
              color="from-purple-600 to-purple-700"
              subtext="Projects"
              loading={githubStats.loading}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-lg text-gray-300 space-y-6">
                <p>
                  I'm a passionate B.Tech student in Computer Science (Data Science) with a CGPA of 8.72, 
                  specializing in competitive programming.
                </p>
                <p>
                  Born on February 21, 2004, I've been on an exciting journey of solving complex algorithmic 
                  problems and building innovative applications that leverage artificial intelligence.
                </p>
                <p>
                  Currently working on an <span className="text-blue-400 font-semibold">AI-Powered SEO Content Optimizer</span> 
                  using FastAPI, demonstrating my commitment to merging AI with practical business solutions.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className="font-semibold text-white">{achievement.title}</div>
                    <div className="text-sm text-gray-400">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-blue-500/30">
              <h3 className="text-2xl font-bold mb-6 text-center">Current Focus</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-blue-400" />
                  <span>Building AI-Powered Applications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-green-400" />
                  <span>Mastering Advanced Algorithms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span>Competitive programming Excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  <span>Full Stack Web Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Technical Skills</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold">Programming</h3>
              </div>
              {skills.programming.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center mb-6">
                <Brain className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold">AI & Data Science</h3>
              </div>
              {skills.ai.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center mb-6">
                <Globe className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold">Web Development</h3>
              </div>
              {skills.web.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          </div>

          {/* Additional Skills */}
          <div className="mt-12 bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center">Specialized Skills</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold">Data Structures</h4>
                <p className="text-gray-400 text-sm">Arrays, Trees, Graphs, DP</p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h4 className="font-semibold">Algorithms</h4>
                <p className="text-gray-400 text-sm">Sorting, Searching, Optimization</p>
              </div>
              <div className="text-center">
                <Database className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h4 className="font-semibold">Data Analysis</h4>
                <p className="text-gray-400 text-sm">Pandas, NumPy, Matplotlib</p>
              </div>
              <div className="text-center">
                <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold">Artificial Intelligence</h4>
                <p className="text-gray-400 text-sm">ML, NLP, AI Models</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://github.com/Harshchafle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-block"
            >
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Basic Projects Section */}
      <section id="basic-projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Basic Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {basicProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Live Statistics</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* LeetCode Stats */}
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-8 rounded-2xl border border-yellow-500/30">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="w-8 h-8 text-yellow-400 mr-3" />
                LeetCode Performance
                {leetcodeStats.loading && <div className="ml-3 animate-spin">⟳</div>}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    {leetcodeStats.loading ? '...' : leetcodeStats.solved}
                  </div>
                  <div className="text-gray-400">Problems Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">
                    {leetcodeStats.loading ? '...' : leetcodeStats.streak}
                  </div>
                  <div className="text-gray-400">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">
                    {leetcodeStats.loading ? '...' : leetcodeStats.rank.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Global Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {leetcodeStats.loading ? '...' : leetcodeStats.rating}
                  </div>
                  <div className="text-gray-400">Contest Rating</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a 
                  href="https://leetcode.com/u/chafleharsh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 inline-flex items-center"
                >
                  View LeetCode Profile <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* GitHub Stats */}
            <div className="bg-gradient-to-br from-gray-600/20 to-gray-800/20 p-8 rounded-2xl border border-gray-500/30">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Github className="w-8 h-8 text-gray-400 mr-3" />
                GitHub Activity
                {githubStats.loading && <div className="ml-3 animate-spin">⟳</div>}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {githubStats.loading ? '...' : githubStats.repos}
                  </div>
                  <div className="text-gray-400">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    {githubStats.loading ? '...' : githubStats.stars}
                  </div>
                  <div className="text-gray-400">Stars Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {githubStats.loading ? '...' : githubStats.followers}
                  </div>
                  <div className="text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {githubStats.loading ? '...' : githubStats.following}
                  </div>
                  <div className="text-gray-400">Following</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a 
                  href="https://github.com/Harshchafle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 inline-flex items-center"
                >
                  View GitHub Profile <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Additional GitHub Insights */}
          <div className="mt-12 bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center">GitHub Insights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {githubStats.loading ? '...' : '500+'}
                </div>
                <div className="text-gray-400">Total Commits</div>
                <Activity className="w-8 h-8 text-green-400 mx-auto mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {githubStats.loading ? '...' : '15+'}
                </div>
                <div className="text-gray-400">Pull Requests</div>
                <GitBranch className="w-8 h-8 text-blue-400 mx-auto mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {githubStats.loading ? '...' : '1 Year+'}
                </div>
                <div className="text-gray-400">Active Coding</div>
                <Calendar className="w-8 h-8 text-purple-400 mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Build Something Amazing Together</h2>
          <p className="text-xl text-gray-400 mb-12">
            I'm always excited to work on innovative projects, especially those involving AI, 
            competitive programming, or full-stack development.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <button
              onClick={handleContactClick}
              className="bg-red-600/20 border border-red-500/30 p-6 rounded-xl hover:bg-red-600/30 transition-colors cursor-pointer"
            >
              <Mail className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <div className="font-semibold">Email</div>
              <div className="text-gray-400">chafleharsh@gmail.com</div>
            </button>
            
            <a 
              href="https://www.linkedin.com/in/harsh-chafle-641809292/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600/20 border border-blue-500/30 p-6 rounded-xl hover:bg-blue-600/30 transition-colors"
            >
              <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="font-semibold">LinkedIn</div>
              <div className="text-gray-400">Connect with me</div>
            </a>
            
            <a 
              href="https://github.com/Harshchafle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600/20 border border-gray-500/30 p-6 rounded-xl hover:bg-gray-600/30 transition-colors"
            >
              <Github className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <div className="font-semibold">GitHub</div>
              <div className="text-gray-400">View my code</div>
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">📍 Based in India | 📱 +91 79722 34194</p>
            <div className="text-blue-400 italic">
              "The best way to predict the future is to create it." - Peter Drucker
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Harsh Chafle. Built with React.js and lots of ☕. 
            <span className="text-blue-400 ml-2">Always learning, always coding!</span>
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Stats update every 5 minutes | Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;