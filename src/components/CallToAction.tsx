import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="glass-panel relative overflow-hidden"
        >
          {/* Background gradient elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
          
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:mr-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Enhance Your <span className="text-gradient">Valorant</span> Experience?
              </h2>
              <p className="text-slate-300 md:text-lg max-w-2xl">
                Join thousands of players who have already taken their gameplay to the next level. 
                Get started today with our premium solutions.
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="btn-primary px-8 py-3 text-base md:text-lg flex items-center">
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;