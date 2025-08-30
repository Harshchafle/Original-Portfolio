import { Github, Linkedin, Mail } from 'lucide-react';
import { GITHUB_USER, PERSONAL_INFO } from '../../constants/config';

const Navbar = () => {
  const navItems = ['About', 'Skills', 'Projects', 'Stats', 'Contact'];

  return (
    <nav className="fixed top-2 right-0 w-full z-50 backdrop-blur-xl bg-gray-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Harsh Chafle
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
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
            
            <div className="flex space-x-2">
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} 
                 className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
