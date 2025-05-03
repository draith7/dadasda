import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth intro animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Stars background effect */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,0,81,0.3)_0%,rgba(10,1,24,0.6)_100%)]"></div>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.max(1, Math.random() * 3)}px`,
              height: `${Math.max(1, Math.random() * 3)}px`,
              animation: `pulse ${Math.random() * 5 + 3}s infinite`
            }}
          ></div>
        ))}
      </div>

      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <motion.h1
              className="text-4xl font-bold text-gradient"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              VALKYRA
            </motion.h1>
            <motion.div
              className="mt-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex flex-col min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default Layout;