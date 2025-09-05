import { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Visitor = forwardRef<HTMLDivElement>((props, ref) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // Counter
  useEffect(() => {
    const incrementAndFetchVisitorCount = async () => {
      try {
        await fetch("https://xayhanmontyvisitorcounter.execute-api.us-west-2.amazonaws.com/counter", {
          method: "POST"
        });
        const res = await fetch("https://xayhanmontyvisitorcounter.execute-api.us-west-2.amazonaws.com/counter");
        const data = await res.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Error incrementing or fetching visitor count:", error);
        setVisitorCount(0);
      }
    };

    incrementAndFetchVisitorCount();
  }, []);

  const Counter = {
    Visitor: {
      title: null,
      items: visitorCount !== null ? [`Total Visitors: ${visitorCount}`] : ["Loading visitor count..."]
    }
  };

  return (
    <div id="counter" ref={ref} className="max-w-4xl mx-auto mb-24">
      {/* Visitor Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-32"
      >
        <h2 className="text-3xl font-light mb-12 tracking-wider text-center">Visitor</h2>
        
        {/* Counter */}
        <div className="flex justify-center mb-16">
          {Object.entries(Counter).map(([key, { title, items }]) => (
            <>
              <h3 className="text-xl font-light tracking-wider mb-6 text-center">{title}</h3>
              <ul className="space-y-3 text-gray-400 font-light flex flex-col items-center">
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

export default Visitor;