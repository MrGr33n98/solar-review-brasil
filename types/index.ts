export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  planType: 'free' | 'premium' | 'enterprise';
  location: {
    city: string;
    state: string;
  };
  specialties: string[];
  established: number;
  website?: string;
  phone?: string;
  verificationBadges: string[];
}

export interface Review {
  id: string;
  companyId: string;
  userName: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
  location: string;
}

export interface SponsoredContent {
  id: string;
  title: string;
  description: string;
  city: string; // Added city field
  state: string;
  imageUrl: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SolarCalculation {
  monthlyConsumption: number;
  state: string;
  estimatedSystemSize: number;
  estimatedCost: number;
  estimatedSavings: number;
  paybackPeriod: number;
}
export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  companyId?: string;
  message: string;
  createdAt: Date;
}
