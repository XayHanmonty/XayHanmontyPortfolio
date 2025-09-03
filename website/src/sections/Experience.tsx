import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Experience = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    
    <div id="experience" ref={ref} className="space-y-8 max-w-3xl">
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
            Implemented scalable role-based REST APIs with Express.js, cutting development time by 40%
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
            Built async processing pipeline handling 2,000+ messages with 25% faster processing
          </li>
        </ul>
      </motion.div>
    </div>
  );
});

export default Experience;
