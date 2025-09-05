import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const demoGif = new URL('../assets/Demo.gif', import.meta.url).href;
const semsGif = new URL('../assets/SEMS.gif', import.meta.url).href;
const videoGenGif = new URL('../assets/videoGen.gif', import.meta.url).href;
const infra = new URL('../assets/infra_project.png', import.meta.url).href;

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    
    <div id="projects" ref={ref} className="grid grid-cols-1 gap-8 mb-24 mt-24">
      {/* Projects Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative"
      >
        <h2 className="text-3xl font-light mb-12 tracking-wider">Projects</h2>    
        <div className="relative overflow-hidden bg-gray-100 rounded-xl transition-all duration-500 group-hover:bg-cyan-400">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
          <img 
            src={infra}
            alt="My Portfolio"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-light tracking-wider mb-4">My Portfolio</h3>
              <p className="text-gray-300 font-light max-w-xl opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              A modern single-page application that showcases my projects, professional experience, and interests with a clean, user-friendly interface. The application is fully deployed using Infrastructure as Code (IaC) best practices, featuring a complete Terraform setup for consistent, automated infrastructure management. </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Python</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">TypeScript</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">React</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Terraform</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">API Gateway</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">Framer Motion</span>
                <span className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-light text-cyan-400 border border-cyan-400/20">AWS Lambda</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="https://github.com/XayHanmonty/XayHanmontyPortfolio" className="text-cyan-400 flex items-center gap-2 group">
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
              A real-time app that monitors your environment.                   </p>
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
  );
});

export default Projects;
