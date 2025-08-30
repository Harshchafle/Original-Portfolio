import { Code, Brain, Globe } from 'lucide-react';

export const SKILLS = {
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
};

export const SKILL_CATEGORIES = {
  programming: { icon: Code, title: 'Programming' },
  ai: { icon: Brain, title: 'AI & Data Science' },
  web: { icon: Globe, title: 'Web Development' }
};
