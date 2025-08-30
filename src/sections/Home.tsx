import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import AnimatedText from '../components/AnimatedText/AnimatedText';

const ucBerkeleyLogo = new URL('../assets/UC Berkeley Logo.png', import.meta.url).href;

const Home = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div id="home" ref={ref} className="max-w-4xl mb-24 mx-auto">
      <div className="flex flex-col items-center text-center">
        <div>
          <div className="relative flex justify-center items-center py-24">
              <div className="flip-card" style={{ width: '288px', height: '384px' }}>
                  <div className="flip-card-inner">
                      <div className="flip-card-front">
                          <div className="relative w-72 h-96 bg-indigo-500 rounded-[48px] shadow-xl overflow-hidden">
                              <img
                                  src="src\assets\profile.JPG"
                                  alt="Profile Picture"
                                  className="w-full h-full object-cover object-[47.9%_24.1%]"
                              />
                          </div>
                      </div>
                      <div className="flip-card-back">
                          <div className="w-72 h-96 rounded-[35px] shadow-xl flex flex-col items-center justify-center text-white">
                              <p className="text-lg font-light">Scroll Down To Know Me Better <br/>👇</p>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 text-white mt-4">
                                  <path d="M202.83,146.83l-72,72a4,4,0,0,1-5.66,0l-72-72a4,4,0,0,1,5.66-5.66L124,206.34V40a4,4,0,0,1,8,0V206.34l65.17-65.17a4,4,0,0,1,5.66,5.66Z"/>
                              </svg>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-8 text-lg font-light leading-relaxed max-w-2xl"
          >
          </motion.p>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 flex justify-center"
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

          {/* Social Media */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-8 justify-center"
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
    </div>
  );
});

export default Home;