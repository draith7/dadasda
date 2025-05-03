import { motion } from 'framer-motion';
import { Shield, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { Product } from '../types';

interface StatusDisplayProps {
  product: Product;
}

const StatusDisplay = ({ product }: StatusDisplayProps) => {
  const getStatusIcon = () => {
    switch (product.status) {
      case 'online':
        return <CheckCircle size={20} className="text-success" />;
      case 'offline':
        return <AlertCircle size={20} className="text-error" />;
      case 'maintenance':
        return <Shield size={20} className="text-warning" />;
      case 'updating':
        return <RefreshCw size={20} className="text-accent animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (product.status) {
      case 'online':
        return 'All systems operational';
      case 'offline':
        return 'Service is currently down';
      case 'maintenance':
        return 'Scheduled maintenance';
      case 'updating':
        return 'Updating with new features';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (product.status) {
      case 'online':
        return 'border-success/30 bg-success/10';
      case 'offline':
        return 'border-error/30 bg-error/10';
      case 'maintenance':
        return 'border-warning/30 bg-warning/10';
      case 'updating':
        return 'border-accent/30 bg-accent/10';
      default:
        return 'border-slate-700 bg-slate-800/50';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-lg p-4 ${getStatusColor()}`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase flex items-center ${
          product.status === 'online' ? 'bg-success/20 text-success' :
          product.status === 'offline' ? 'bg-error/20 text-error' :
          product.status === 'maintenance' ? 'bg-warning/20 text-warning' :
          'bg-accent/20 text-accent'
        }`}>
          <span className={`inline-block w-2 h-2 ${
            product.status === 'online' ? 'bg-success' :
            product.status === 'offline' ? 'bg-error' :
            product.status === 'maintenance' ? 'bg-warning' :
            'bg-accent'
          } rounded-full mr-1.5 animate-pulse`}></span>
          {product.status}
        </div>
      </div>
      
      <div className="mt-3 flex items-center">
        {getStatusIcon()}
        <span className="ml-2 text-slate-300">{getStatusText()}</span>
      </div>
    </motion.div>
  );
};

export default StatusDisplay;