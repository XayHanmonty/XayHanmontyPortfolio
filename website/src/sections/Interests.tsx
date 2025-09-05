import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const interests = {
  technology: {
    title: 'Technical Domains',
    items: [
      'Artificial Intelligence & Machine Learning',
      'Fullstack Development',
      'Backend Engineering',
      'Cloud/AI Infrastructure & DevOps System'
    ]
  },
  creative: {
    title: 'Creative',
    items: [
      'Video/Reels Production',
      'Digital Art & Film Photography'
    ]
  },
  lifestyle: {
    title: 'Lifestyle',
    items: [
      'Cooking & Culinary Exploration',
      'City Exploring & Urban Adventures',
      'Hiking & Camping',
    ]
  }
};

const Interests = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div id="interests" ref={ref} className="max-w-4xl mb-24">
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
  );
});

export default Interests;