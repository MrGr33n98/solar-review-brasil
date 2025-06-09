import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Award, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VerificationBadges, useCompanyBadges } from '@/components/verification-badges';
import { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const badges = useCompanyBadges(company);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Company Header */}
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-orange-500">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        {company.planType === 'premium' && (
          <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
            <Award className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )}
        {company.planType === 'enterprise' && (
          <Badge className="absolute top-3 right-3 bg-purple-500 text-white hover:bg-purple-500">
            <Award className="h-3 w-3 mr-1" />
            Enterprise
          </Badge>
        )}
      </div>

      <div className="p-6 -mt-12 relative">
        {/* Company Logo */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-lg shadow-md p-2 relative z-10">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{company.location.city}, {company.location.state}</span>
              <span>•</span>
              <span>Desde {company.established}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(company.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">{company.rating}</span>
            <span className="text-sm text-gray-500">({company.reviewCount} avaliações)</span>
          </div>

          {/* Verification Badges */}
          <div className="py-2">
            <VerificationBadges badges={badges} size="sm" maxVisible={3} />
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {company.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">
            {company.description}
          </p>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Link href={`/empresa/${company.slug}`} className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Ver Perfil
              </Button>
            </Link>
            {company.phone && (
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}