import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  useEffect(() => {
    // Update page title
    document.title = '404 - Page Not Found | Valkyra';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-md">
            <span className="text-white font-bold text-3xl">404</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-lg text-slate-300 mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/" className="btn-primary inline-flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;