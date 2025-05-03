export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  image?: string;
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  status: 'online' | 'offline' | 'maintenance' | 'updating';
}

export type LicenseType = 'daily' | 'weekly' | 'monthly';

export interface StatusUpdate {
  id: string;
  product: string;
  status: 'online' | 'offline' | 'maintenance' | 'updating';
  message: string;
  timestamp: string;
}