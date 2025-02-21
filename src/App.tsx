import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import Scene from './components/Scene';

// Import images as URLs
const demoGif = new URL('./assets/Demo.gif', import.meta.url).href;
const semsGif = new URL('./assets/SEMS.gif', import.meta.url).href;
const videoGenGif = new URL('./assets/videoGen.gif', import.meta.url).href;
const ucBerkeleyLogo = new URL('./assets/UC Berkeley Logo.png', import.meta.url).href;

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const interests = {
    technology: {
      title: 'Technology',
      items: [
        'Artificial Intelligence & Machine Learning',
        'Web3 & Blockchain Development',
        'Cloud Computing & DevOps'
      ]
    },
    creative: {
      title: 'Creative',
      items: [
        'Video Production',
        'Digital Art & Photography'
      ]
    },
    lifestyle: {
      title: 'Lifestyle',
      items: [
        'Cooking & Culinary Exploration',
        'City Exploring & Urban Adventures',
        'Hiking & Camping',
      ]
    },
    personal: {
      title: 'Personal Growth',
      items: [
        'Problem Solving',
        'Sudoku Puzzles'
      ]
    }
  };

  const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

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
            {['about', 'projects', 'experience'].map((section) => (
              <motion.button 
                key={section}
                onClick={() => setActiveSection(section)}
                className={`${
                  activeSection === section ? 'text-cyan-400' : ''
                } hover:text-cyan-400 transition-all uppercase tracking-widest text-sm font-light`}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeSection === 'about' && (
            <>
              <div className="max-w-4xl mb-24">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-7xl sm:text-8xl font-light tracking-wide leading-tight mb-8">
                      <AnimatedText text="Transforming ideas " />
                      <br />
                      <AnimatedText text="into digital realities that" />
                      <br />
                      <AnimatedText text="shape tomorrow." className="text-cyan-400" />
                    </h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-400 mb-8 text-lg font-light leading-relaxed max-w-2xl"
                    >
                    Hi, I’m Visitxay Hanmonty with experience at Amazon and startups. I have a passion for machine learning, LLMs, and building AI agents. Skilled in creating scalable backend systems, full-stack applications, and innovative AI tools, and cloud technologies like AWS. Outside of coding, I enjoy hiking, photography, and cooking.                    </motion.p>

                    {/* Education */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-12"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={ucBerkeleyLogo}
                          alt="UC Berkeley"
                          className="w-12 h-12 object-contain"
                        />
                        <div>
                          <h3 className="text-xl font-light">University of California, Berkeley</h3>
                          <p className="text-gray-400">B.S. in Computer Science • Class of 2025</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-8"
                    >
                      <a href="https://github.com/XayHanmonty" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                        <Github size={28} />
                      </a>
                      <a href="http://linkedin.com/in/visitxay-hanmonty" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                        <Linkedin size={28} />
                      </a>
                      <a href="https://x.com/Xay_Bank" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a href="mailto:visitxay_hanmonty@berkeley.edu" className="hover:text-cyan-400 transition-colors">
                        <Mail size={28} />
                      </a>
                    </motion.div>
                  </div>
                </div>

                {/* Interests Section */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-32"
                >
                  <h2 className="text-3xl font-light mb-12 tracking-wider">Interests</h2>
                  
                  {/* Interests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {Object.entries(interests).map(([key, { title, items }]) => (
                      <motion.div
                        key={key}
                        className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                      >
                        <h3 className="text-xl font-light tracking-wider mb-6">{title}</h3>
                        <ul className="space-y-3 text-gray-400 font-light">
                          {items.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {activeSection === 'projects' && (
            <div className="grid grid-cols-1 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-gray-100 rounded-xl transition-all duration-500 group-hover:bg-cyan-400">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
                  <img 
                    src={demoGif}
                    alt="DeepRoots Demo"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-light tracking-wider mb-4">DeepRoots</h3>
                      <p className="text-gray-300 font-light max-w-xl opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        A Perplexity-style search engine powered by Google's Gemini 2.0 Flash model with grounding through Google Search. Get AI-powered answers to your questions with real-time web sources and citations.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">React</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">TypeScript</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Gemini AI</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">FastAPI</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">PostgreSQL</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <a href="https://github.com/XayHanmonty/DeepRoots" className="text-cyan-400 flex items-center gap-2 group">
                          View Project
                          <span className="transform transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-gray-100 rounded-xl transition-all duration-500 group-hover:bg-cyan-400">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
                  <img 
                    src={semsGif}
                    alt="SEMS Demo"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-light tracking-wider mb-4">SEMS</h3>
                      <p className="text-gray-300 font-light max-w-xl opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      A real-time app that monitors your environment.                       </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Python</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Flask</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">SQLite</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Raspberry Pi</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">IoT</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <a href="https://github.com/matthewlimm/SEMS" className="text-cyan-400 flex items-center gap-2 group">
                          View Project
                          <span className="transform transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-gray-100 rounded-xl transition-all duration-500 group-hover:bg-cyan-400">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
                  <img  
                    src={videoGenGif}
                    alt="videoGen Demo"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-light tracking-wider mb-4">VideoSimulation</h3>
                      <p className="text-gray-300 font-light max-w-xl opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      A real-time video processing simulation with modern UI, featuring a backend server for progress tracking and a responsive frontend interface.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Next.js</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">TailwindCSS</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Node.js</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Express</span>
                        <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">WebSocket</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <a href="https://github.com/XayHanmonty/videosimulation" className="text-cyan-400 flex items-center gap-2 group">
                          View Project
                          <span className="transform transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="space-y-8 max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-white/5 transition-all duration-300 hover:bg-gray-800/30"
                onClick={() => window.open('https://www.amazon.com', '_blank')}
                role="button"
                tabIndex={0}
              >
                <h3 className="text-xl font-light tracking-wider mb-2">Software Development Engineer Intern</h3>
                <p className="text-cyan-400 mb-6 font-light">Amazon • Alexa Notifications • Bellevue, WA • June - August 2024</p>
                <ul className="space-y-3 text-gray-400 font-light">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Built RESTful APIs with AWS OpenSearch, reducing latency by 80% for 139,000+ records
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Developed LLM voice commands for Alexa, increasing user engagement by 25%
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Automated data pipeline with AWS Lambda, cutting processing time by 70%
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-white/5 transition-all duration-300 hover:bg-gray-800/30"
                onClick={() => window.open('https://www.themangojelly.com', '_blank')}
                role="button"
                tabIndex={0}
              >
                <h3 className="text-xl font-light tracking-wider mb-2">Software Development Engineer Intern</h3>
                <p className="text-cyan-400 mb-6 font-light">The Mango Jelly • Backend Development • Remote • August - December 2024</p>
                <ul className="space-y-3 text-gray-400 font-light">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Implemented scalable REST APIs with Express.js, cutting development time by 40%
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Built Redis rate limiting system supporting 200+ users across tiered plans
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Automated user onboarding system with 95% reduction in manual intervention
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-white/5 transition-all duration-300 hover:bg-gray-800/30"
                onClick={() => window.open('https://thehumind.com', '_blank')}
                role="button"
                tabIndex={0}
              >
                <h3 className="text-xl font-light tracking-wider mb-2">Software Engineer Intern</h3>
                <p className="text-cyan-400 mb-6 font-light">Humind • Backend Agent Development • Remote • September - November 2024</p>
                <ul className="space-y-3 text-gray-400 font-light">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Integrated GPT-4 and LangChain to achieve 90% classification accuracy
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Developed vector embeddings system with 85% clustering accuracy
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    Built async processing pipeline handling 20,000+ messages with 25% faster processing
                  </li>
                </ul>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;