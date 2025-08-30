import ParticleBackground from '../components/layout/ParticleBackground';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Stats from '../components/sections/Stats';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

const Portfolio = () => {

  return (
    <div className="bg-gray-950 text-white min-h-screen p-8">
      
      <ParticleBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
