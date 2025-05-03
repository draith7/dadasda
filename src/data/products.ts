import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'valorant-legit',
    name: 'Valorant Legit',
    description: 'Subtle assistance for competitive players. Designed to be undetectable with smooth, natural-looking gameplay enhancements.',
    features: [
      'Subtle aim assistance',
      'ESP (player outlines)',
      'Radar hack',
      'Recoil control',
      'Configurable settings'
    ],
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    pricing: {
      daily: 8.99,
      weekly: 34.99,
      monthly: 89.99
    },
    status: 'online'
  },
  {
    id: 'valorant-rage',
    name: 'Valorant Rage',
    description: 'Maximum performance enhancement for private matches. Unleash the full potential with advanced features.',
    features: [
      'Instant lock-on aim',
      'Full ESP wallhack',
      'Auto-trigger',
      'Anti-recoil system',
      'Skin changer',
      'Maximum customization'
    ],
    image: 'https://images.pexels.com/photos/2747893/pexels-photo-2747893.jpeg',
    pricing: {
      daily: 12.99,
      weekly: 49.99,
      monthly: 124.99
    },
    status: 'online'
  },
  {
    id: 'valorant-premium',
    name: 'Valorant Premium',
    description: 'The ultimate package with exclusive features. Premium support and priority updates.',
    features: [
      'All Legit & Rage features',
      'Private build with custom features',
      'Hardware ID spoofer',
      'Priority support 24/7',
      'Lifetime updates',
      'Exclusive community access'
    ],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    pricing: {
      daily: 19.99,
      weekly: 69.99,
      monthly: 159.99
    },
    status: 'online'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};