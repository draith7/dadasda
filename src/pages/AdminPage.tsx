import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, X, Save, Image, Check } from 'lucide-react';
import { Product, LicenseType } from '../types';
import { products as initialProducts } from '../data/products';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    id: '',
    name: '',
    description: '',
    features: [''],
    pricing: {
      daily: 0,
      weekly: 0,
      monthly: 0
    },
    status: 'online'
  });

  useEffect(() => {
    // Update page title
    document.title = 'Admin | Valkyra';
  }, []);

  // Edit a product
  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setEditedProduct({...product});
  };

  // Update edited product
  const handleEditChange = (field: string, value: string | number | string[]) => {
    if (!editedProduct) return;
    
    if (field.startsWith('pricing.')) {
      const pricingField = field.split('.')[1] as LicenseType;
      setEditedProduct({
        ...editedProduct,
        pricing: {
          ...editedProduct.pricing,
          [pricingField]: typeof value === 'string' ? parseFloat(value) : value
        }
      });
    } else if (field === 'features') {
      setEditedProduct({
        ...editedProduct,
        features: value as string[]
      });
    } else {
      setEditedProduct({
        ...editedProduct,
        [field]: value
      });
    }
  };

  // Save edit
  const saveEdit = () => {
    if (!editedProduct) return;
    
    setProducts(products.map(product => 
      product.id === editedProduct.id ? editedProduct : product
    ));
    setIsEditing(null);
    setEditedProduct(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setIsEditing(null);
    setEditedProduct(null);
  };

  // Delete a product
  const handleDelete = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Add a feature to product being edited
  const addFeatureToEdited = () => {
    if (!editedProduct) return;
    setEditedProduct({
      ...editedProduct,
      features: [...editedProduct.features, '']
    });
  };

  // Remove a feature from product being edited
  const removeFeatureFromEdited = (index: number) => {
    if (!editedProduct) return;
    const newFeatures = [...editedProduct.features];
    newFeatures.splice(index, 1);
    setEditedProduct({
      ...editedProduct,
      features: newFeatures
    });
  };

  // Update a feature in edited product
  const updateEditedFeature = (index: number, value: string) => {
    if (!editedProduct) return;
    const newFeatures = [...editedProduct.features];
    newFeatures[index] = value;
    setEditedProduct({
      ...editedProduct,
      features: newFeatures
    });
  };

  // Handle new product change
  const handleNewProductChange = (field: string, value: string | number | string[]) => {
    if (field.startsWith('pricing.')) {
      const pricingField = field.split('.')[1] as LicenseType;
      setNewProduct({
        ...newProduct,
        pricing: {
          ...newProduct.pricing,
          [pricingField]: typeof value === 'string' ? parseFloat(value) : value
        }
      });
    } else if (field === 'features') {
      setNewProduct({
        ...newProduct,
        features: value as string[]
      });
    } else {
      setNewProduct({
        ...newProduct,
        [field]: value
      });
    }
  };

  // Add a feature to new product
  const addFeatureToNew = () => {
    if (!newProduct.features) return;
    setNewProduct({
      ...newProduct,
      features: [...newProduct.features, '']
    });
  };

  // Remove a feature from new product
  const removeFeatureFromNew = (index: number) => {
    if (!newProduct.features) return;
    const newFeatures = [...newProduct.features];
    newFeatures.splice(index, 1);
    setNewProduct({
      ...newProduct,
      features: newFeatures
    });
  };

  // Update a feature in new product
  const updateNewFeature = (index: number, value: string) => {
    if (!newProduct.features) return;
    const newFeatures = [...newProduct.features];
    newFeatures[index] = value;
    setNewProduct({
      ...newProduct,
      features: newFeatures
    });
  };

  // Create new product
  const createProduct = () => {
    if (!newProduct.id || !newProduct.name) {
      alert('ID and Name are required fields.');
      return;
    }
    
    setProducts([...products, newProduct as Product]);
    setIsCreating(false);
    setNewProduct({
      id: '',
      name: '',
      description: '',
      features: [''],
      pricing: {
        daily: 0,
        weekly: 0,
        monthly: 0
      },
      status: 'online'
    });
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Manage your products, update inventory, and customize designs.
          </p>
        </motion.div>

        <div className="glass-panel p-6 md:p-8 mb-12">
          <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
            <h2 className="text-xl font-semibold">Products</h2>
            <button 
              onClick={() => setIsCreating(true)}
              className="btn-primary text-sm flex items-center" 
              disabled={isCreating}
            >
              <Plus size={16} className="mr-1" />
              Add Product
            </button>
          </div>

          {/* New product form */}
          {isCreating && (
            <div className="mb-8 border border-primary/30 rounded-lg p-4 bg-slate-900/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">New Product</h3>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ID</label>
                  <input
                    type="text"
                    value={newProduct.id}
                    onChange={(e) => handleNewProductChange('id', e.target.value)}
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="valorant-product"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => handleNewProductChange('name', e.target.value)}
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Product Name"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => handleNewProductChange('description', e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image || ''}
                  onChange={(e) => handleNewProductChange('image', e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-300">Features</label>
                  <button 
                    onClick={addFeatureToNew}
                    className="text-primary hover:text-white text-sm"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {newProduct.features?.map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateNewFeature(index, e.target.value)}
                      className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Feature description"
                    />
                    <button 
                      onClick={() => removeFeatureFromNew(index)}
                      className="ml-2 text-slate-400 hover:text-error"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Daily Price</label>
                  <input
                    type="number"
                    value={newProduct.pricing?.daily || 0}
                    onChange={(e) => handleNewProductChange('pricing.daily', e.target.value)}
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Weekly Price</label>
                  <input
                    type="number"
                    value={newProduct.pricing?.weekly || 0}
                    onChange={(e) => handleNewProductChange('pricing.weekly', e.target.value)}
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Monthly Price</label>
                  <input
                    type="number"
                    value={newProduct.pricing?.monthly || 0}
                    onChange={(e) => handleNewProductChange('pricing.monthly', e.target.value)}
                    className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                <select
                  value={newProduct.status || 'online'}
                  onChange={(e) => handleNewProductChange('status', e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="updating">Updating</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsCreating(false)}
                  className="btn-outline text-sm mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={createProduct}
                  className="btn-primary text-sm flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  Create
                </button>
              </div>
            </div>
          )}

          {/* Products list */}
          <div className="space-y-4">
            {products.map((product) => (
              <div 
                key={product.id}
                className="border border-slate-700 rounded-lg overflow-hidden"
              >
                {isEditing === product.id && editedProduct ? (
                  // Edit mode
                  <div className="p-4 border-l-4 border-primary">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                        <input
                          type="text"
                          value={editedProduct.name}
                          onChange={(e) => handleEditChange('name', e.target.value)}
                          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={editedProduct.image || ''}
                          onChange={(e) => handleEditChange('image', e.target.value)}
                          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                      <textarea
                        value={editedProduct.description}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        rows={3}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-slate-300">Features</label>
                        <button 
                          onClick={addFeatureToEdited}
                          className="text-primary hover:text-white text-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      {editedProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateEditedFeature(index, e.target.value)}
                            className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <button 
                            onClick={() => removeFeatureFromEdited(index)}
                            className="ml-2 text-slate-400 hover:text-error"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Daily Price</label>
                        <input
                          type="number"
                          value={editedProduct.pricing.daily}
                          onChange={(e) => handleEditChange('pricing.daily', e.target.value)}
                          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Weekly Price</label>
                        <input
                          type="number"
                          value={editedProduct.pricing.weekly}
                          onChange={(e) => handleEditChange('pricing.weekly', e.target.value)}
                          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Monthly Price</label>
                        <input
                          type="number"
                          value={editedProduct.pricing.monthly}
                          onChange={(e) => handleEditChange('pricing.monthly', e.target.value)}
                          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                      <select
                        value={editedProduct.status}
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="updating">Updating</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={cancelEdit}
                        className="btn-outline text-sm mr-2"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveEdit}
                        className="btn-primary text-sm flex items-center"
                      >
                        <Save size={16} className="mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex flex-col md:flex-row">
                    {product.image ? (
                      <div className="md:w-1/4 h-32 md:h-auto">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="md:w-1/4 h-32 md:h-auto bg-slate-800 flex items-center justify-center">
                        <Image size={32} className="text-slate-600" />
                      </div>
                    )}
                    
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{product.name}</h3>
                          <div className="mt-1 flex items-center">
                            <span className={`inline-block w-2 h-2 ${
                              product.status === 'online' ? 'bg-success' :
                              product.status === 'offline' ? 'bg-error' :
                              product.status === 'maintenance' ? 'bg-warning' :
                              'bg-accent'
                            } rounded-full mr-1.5 animate-pulse`}></span>
                            <span className="text-xs uppercase text-slate-400">{product.status}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-1.5 text-slate-400 hover:text-primary rounded-full hover:bg-slate-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 text-slate-400 hover:text-error rounded-full hover:bg-slate-800"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-300 mt-2 mb-3">{product.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm border-t border-slate-700 pt-3">
                        <div>
                          <span className="text-slate-400">Daily:</span> <span className="font-medium">${product.pricing.daily.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Weekly:</span> <span className="font-medium">${product.pricing.weekly.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Monthly:</span> <span className="font-medium">${product.pricing.monthly.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;