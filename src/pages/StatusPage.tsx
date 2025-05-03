import { useEffect } from 'react';
import { motion } from 'framer-motion';
import StatusDisplay from '../components/StatusDisplay';
import { products } from '../data/products';
import { statusUpdates } from '../data/statusUpdates';

const StatusPage = () => {
  useEffect(() => {
    // Update page title
    document.title = 'Status | Valkyra';
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">System Status</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Get real-time updates on our products' status and services. Check if all systems are operational.
          </p>
        </motion.div>

        <div className="glass-panel p-6 md:p-8 mb-12">
          <h2 className="text-xl font-semibold mb-6 border-b border-slate-700 pb-3">Current Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <StatusDisplay key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6 border-b border-slate-700 pb-3">Recent Updates</h2>
          <div className="space-y-6">
            {statusUpdates.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((update) => {
              const product = products.find(p => p.id === update.product);
              
              if (!product) return null;
              
              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-l-4 pl-4 py-1"
                  style={{
                    borderColor: 
                      update.status === 'online' ? 'rgb(0, 230, 118)' :
                      update.status === 'offline' ? 'rgb(255, 82, 82)' :
                      update.status === 'maintenance' ? 'rgb(255, 193, 7)' :
                      'rgb(183, 61, 255)'
                  }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-slate-300 mt-1">{update.message}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-sm text-slate-400">
                      {formatDate(update.timestamp)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;