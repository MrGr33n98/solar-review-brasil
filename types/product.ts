export interface SolarProduct {
  id: string;
  name: string;
  description: string;
  type: 'panel' | 'inverter' | 'battery' | 'other';
  manufacturer: string;
  model: string;
  power?: number; // in Watts
  efficiency?: number; // percentage
  warranty: number; // in years
  price: number;
  imageUrl?: string;
  specifications: Record<string, string | number>;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}
