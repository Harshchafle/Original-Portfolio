import { Brain, Sparkles, Globe, Trophy, Database, Target } from 'lucide-react';

export const PROJECTS = [
  {
    title: 'AI-Powered SEO Content Optimizer',
    description: 'Revolutionary AI tool using FastAPI to optimize content for search engines with real-time NLP scoring, sentiment analysis, and actionable insights.',
    tech: ['Python', 'FastAPI', 'AI/ML', 'NLP', 'SEO', 'React'],
    status: 'In Progress',
    category: 'AI',
    icon: Brain,
    github: 'https://github.com/Harshchafle/AI-Powered-SEO-Content-Optimizer',
    demo: '#',
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
    demo: 'https://stat-prep-ai.vercel.app/',
    featured: true,
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
  },
  {
    title: 'LeetCode Repository',
    description: 'Comprehensive collection of 500+ optimized DSA solutions featuring multiple approaches, detailed complexity analysis, and ',
    tech: ['Java', 'Python', 'DSA', 'Algorithms', 'DataBases'],
    status: 'Active',
    category: 'Competitive Programming',
    icon: Trophy,
    github: 'https://github.com/Harshchafle/LeetCode-Questions',
    demo: 'https://leetcode.com/u/chafleharsh/',
    featured: true,
    gradient: 'from-yellow-600 via-amber-600 to-orange-700'
  },
  {
    title: 'Collaborative Knowledge Base Platform',
    description: 'Next-generation real-time knowledge sharing platform with advanced search, collaborative editing, role-based access, and AI-powered suggestions.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'WebSocket', 'Redis'],
    status: 'In Progress',
    category: 'Web Development',
    icon: Globe,
    github: 'https://github.com/Harshchafle/Collaborative-Knowledge-Base-Learning-Platform',
    demo: 'https://collaborative-knowledge-base-learni.vercel.app/',
    featured: true,
    gradient: 'from-orange-600 via-red-600 to-pink-700'
  },
  {
    title: 'Netflix Data Analytics',
    description: 'Comprehensive EDA on Netflix titles using pandas and seaborn to derive content trends, viewing patterns, and actionable insights for content strategy.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    status: 'Completed',
    category: 'Data Analysis',
    icon: Database,
    github: 'https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/NetflixDataAnalysis',
    demo: 'https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/NetflixDataAnalysis',
    featured: false,
    gradient: 'from-red-600 via-rose-600 to-pink-700'
  },
  {
    title: 'Google Data Analytics',
    description: 'This project provides a powerful and interactive way to analyze Google Search trends using the unofficial Python library pytrends.',
    tech: ['Python', 'Pytrends', 'Jupyter', 'Seaborn', 'Plotly'],
    status: 'Completed',
    category: 'Data Analysis',
    icon: Database,
    github: 'https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/GoogleDataAnalysis',
    demo: 'https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/GoogleDataAnalysis',
    featured: false,
    gradient: 'from-red-600 via-rose-600 to-pink-700'
  },
  {
    title: 'Upcoming',
    description: '-',
    tech: [],
    status: 'Coming Soon',
    category: 'Data Analysis',
    icon: Database,
    github: 'https://github.com/Harshchafle/Machine-Learning-and-Data-Analytics-with-python/tree/main/Analytics/',
    demo: '#',
    featured: false,
    gradient: 'from-red-600 via-rose-600 to-pink-700'
  },
  {
    title: 'Todo App',
    description: 'Modern task manager with drag-and-drop functionality, priority levels, due dates, categories, and local storage persistence.',
    tech: ['React', 'JavaScript', 'CSS3', 'Local Storage'],
    status: 'Completed',
    category: 'Web Development',
    icon: Target,
    github: 'https://github.com/Harshchafle/Todo-App',
    demo: '#',
    featured: false,
    gradient: 'from-green-600 via-emerald-600 to-teal-700'
  },
  {
    title: 'Password Generator',
    description: 'This is the Pasword Generator using Basic hooks like useState() useEffect() useCallBack()',
    tech: ['React', 'JavaScript', 'CSS3'],
    status: 'Completed',
    category: 'Web Development',
    icon: Target,
    github: 'https://github.com/Harshchafle/PassWord-Generator/tree/main/PasswordGenerator',
    demo: '#',
    featured: false,
    gradient: 'from-green-600 via-emerald-600 to-teal-700'
  },
  {
    title: 'Image Generator',
    description: 'This is my first API call project, using the fetch, async, await methods, Basic but working',
    tech: ['Html', 'JavaScript', 'CSS3'],
    status: 'Completed',
    category: 'Web Development',
    icon: Target,
    github: 'https://github.com/Harshchafle/Image-Generator/',
    demo: 'https://harshchafle.github.io/Image-Generator/',
    featured: false,
    gradient: 'from-green-600 via-emerald-600 to-teal-700'
  }
];

export const PROJECT_CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];