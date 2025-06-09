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
  premiumExpiresAt?: string;
  location: {
    city: string;
    state: string;
  };
  specialties: string[];
  established: number;
  website?: string;
  phone?: string;
  verificationBadges?: string[];
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
  companyId: string;
  position: 'home_top' | 'category_sidebar' | 'home_banner';
  imageUrl: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaUrl: string;
  startDate: string;
  endDate: string;
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
  companyId?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}
