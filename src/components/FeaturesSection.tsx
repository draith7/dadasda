import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Zap, Clock, UserCheck } from 'lucide-react';

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Undetectable',
      description: 'Our products utilize advanced security measures to remain undetected during gameplay.',
    },
    {
      icon: <Zap className="h-10 w-10 text-secondary" />,
      title: 'Performance Boost',
      description: 'Gain a competitive edge with precise aim assistance and enhanced visual information.',
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: 'Flexible Plans',
      description: 'Choose from daily, weekly, or monthly subscriptions to fit your gaming schedule.',
    },
    {
      icon: <UserCheck className="h-10 w-10 text-secondary" />,
      title: '24/7 Support',
      description: 'Our dedicated support team is always available to assist with any issues or questions.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Valkyra</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-panel p-6 text-center hover:shadow-glow-sm transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;