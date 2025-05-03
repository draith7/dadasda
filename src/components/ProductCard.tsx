import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Clock } from 'lucide-react';
import { Product, LicenseType } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('monthly');

  const getPriceDisplay = () => {
    return product.pricing[selectedLicense].toFixed(2);
  };

  const getLicenseDuration = () => {
    switch (selectedLicense) {
      case 'daily':
        return '1 Day';
      case 'weekly':
        return '7 Days';
      case 'monthly':
        return '30 Days';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (product.status) {
      case 'online':
        return 'bg-success';
      case 'offline':
        return 'bg-error';
      case 'maintenance':
        return 'bg-warning';
      case 'updating':
        return 'bg-accent';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="card card-hover"
    >
      {/* Product image */}
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        )}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 ${getStatusColor()} rounded-full mr-2 animate-pulse`}></span>
            <span className="text-xs font-medium uppercase">{product.status}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
        </div>
      </div>

      {/* Product details */}
      <div className="p-6">
        <p className="text-slate-300 mb-4">{product.description}</p>
        
        <div className="space-y-2 mb-6">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span className="text-slate-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* License selection */}
        <div className="bg-slate-800/50 rounded-lg p-3 mb-6">
          <div className="flex justify-between mb-3">
            <button
              className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                selectedLicense === 'daily'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setSelectedLicense('daily')}
            >
              Daily
            </button>
            <button
              className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                selectedLicense === 'weekly'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setSelectedLicense('weekly')}
            >
              Weekly
            </button>
            <button
              className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                selectedLicense === 'monthly'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setSelectedLicense('monthly')}
            >
              Monthly
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock size={16} className="text-primary mr-2" />
              <span className="text-sm text-slate-300">{getLicenseDuration()}</span>
            </div>
            <div className="flex items-center">
              <Shield size={16} className="text-primary mr-2" />
              <span className="text-sm text-slate-300">Secure</span>
            </div>
          </div>
        </div>

        {/* Price and purchase */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-white">${getPriceDisplay()}</span>
          </div>
          <button className="btn-primary">Purchase</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;