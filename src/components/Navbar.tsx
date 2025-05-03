import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Status', path: '/status' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-md bg-slate-900/80 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <img src="https://i.ibb.co/VxKN3Rj/valkyra-logo.png" alt="Valkyra" className="h-10 w-10 mr-2" />
              <span className="text-white font-bold text-xl tracking-tight">VALKYRA</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-slate-200'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="h-0.5 bg-primary mt-1"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <button className="btn-primary text-sm">Get Started</button>
          </nav>

          <div className="md:hidden">
            <button
              className="text-slate-200 hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-primary" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && (
          <div className="py-2 px-4 glass-panel mx-2 mb-2">
            <div className="flex flex-col space-y-3 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-slate-800/50'
                      : 'text-slate-200 hover:bg-slate-800/30 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button className="btn-primary w-full mt-2">Get Started</button>
            </div>
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;