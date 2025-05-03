import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Valkyra's premium package completely transformed my gameplay. The responsiveness and smoothness are unmatched.",
    author: "Alex K.",
    rating: 5,
  },
  {
    id: 2,
    content: "I've tried many similar products, but Valkyra stands out with its reliability and customer support. Worth every penny.",
    author: "Mia J.",
    rating: 5,
  },
  {
    id: 3,
    content: "The weekly subscription is perfect for weekend warriors like me. Excellent performance and easy to use.",
    author: "Jordan T.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-panel p-6 relative"
            >
              {/* Quote mark */}
              <div className="absolute -top-5 -left-2 text-6xl text-primary opacity-30 font-serif">
                "
              </div>
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-secondary fill-secondary" : "text-slate-600"}
                  />
                ))}
              </div>
              
              <p className="mb-4 text-slate-300 italic relative z-10">
                {testimonial.content}
              </p>
              
              <p className="text-sm font-medium text-primary">
                {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;