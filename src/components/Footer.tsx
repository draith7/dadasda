import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Disc as Discord } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/30 backdrop-blur-sm border-t border-slate-800/50 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <div className="h-8 w-8 mr-2 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">VALKYRA</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Premium gaming solutions for competitive players. Enhance your gameplay experience with our cutting-edge tools.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <Discord size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Products</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Valorant Legit
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Valorant Rage
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Valorant Premium
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/status" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-800/50">
          <p className="text-sm text-center text-slate-400">
            &copy; {new Date().getFullYear()} Valkyra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;