import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Scene from '@/components/Scene';
import Home from '@/sections/Home';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Interests from '@/sections/Interests';
import Visitor from '@/sections/Visitor';
import ScrollTriggered from '@/components/ScrollTriggered/ScrollTriggered';

function App() {
  const sections = {
    home: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    interests: useRef<HTMLDivElement>(null),
    visitor: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: string) => {
    const sectionRef = sections[section as keyof typeof sections];
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Increment visitor count
  useEffect(() => {
    if (sessionStorage.getItem('hasVisited')) {
      return;
    }
    fetch('https://gm2nkn3li9.execute-api.us-west-2.amazonaws.com/counter', {
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Visitor count incremented:', data);
      sessionStorage.setItem('hasVisited', 'true');
    })
    .catch(error => {
      console.error('Error incrementing visitor count:', error);
    });
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-black to-[#0a192f] text-white overflow-y-scroll">
      {/* 3D Background */}
      <div className="fixed inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Scene />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-8 py-6 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-light tracking-wider"
          >
            VISITXAY HANMONTY
          </motion.h1>
          <div className="flex gap-12">
            {['home', 'experience', 'projects', 'interests', 'visitor'].map((section) => (
              <motion.button 
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-cyan-400 transition-all uppercase tracking-widest text-sm font-light"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 pt-32 pb-20">
        <Home ref={sections.home} />
        <h2 className="text-3xl font-light mb-12 tracking-wider">Experiences</h2>
        <div className="flex gap-8 items-start">
          <Experience ref={sections.experience} />
          <ScrollTriggered />
        </div>
        <Projects ref={sections.projects} />
        <Interests ref={sections.interests} />
        <Visitor ref={sections.visitor} />
      </div>
    </div>
  );
}

export default App;