import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Globe, Calendar, Award, Users, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ContactForm } from '@/components/contact-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RatingStars } from '@/components/rating-stars';
import { VerificationBadges, useCompanyBadges } from '@/components/verification-badges';
import { CompanyJsonLd } from '@/components/company-jsonld';
import { companies, reviews } from '@/lib/data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const company = companies.find(c => c.slug === params.slug);
  if (!company) return {};

  const title = `${company.name} | SolarReviews Brasil`;
  const description = company.description;
  const url = `https://solarreviewsbrasil.com.br/empresa/${company.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: company.banner }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [company.banner]
    }
  };
}

interface CompanyPageProps {
  params: {
    slug: string;
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = companies.find(c => c.slug === params.slug);
  
  if (!company) {
    notFound();
  }

  const companyReviews = reviews.filter(review => review.companyId === company.id);
  const badges = useCompanyBadges(company);

  return (
    <div className="min-h-screen">
      <CompanyJsonLd company={company} />
      {/* Company Header */}
      <div className="relative h-64 md:h-80">
        <Image
          src={company.banner}
          alt={`${company.name} banner`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Premium Badge */}
        {company.planType !== 'free' && (
          <div className="absolute top-4 right-4">
            <Badge className={`${
              company.planType === 'premium' ? 'bg-yellow-500 text-yellow-900' : 'bg-purple-500 text-white'
            }`}>
              <Award className="h-3 w-3 mr-1" />
              {company.planType === 'premium' ? 'Premium' : 'Enterprise'}
            </Badge>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Info Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  {/* Logo */}
                  <div className="w-24 h-24 bg-white rounded-lg shadow-md p-3 flex-shrink-0">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-4 mb-4">
                      <RatingStars rating={company.rating} size="lg" showNumber />
                      <span className="text-gray-500">({company.reviewCount} avaliações)</span>
                    </div>

                    {/* Verification Badges */}
                    <div className="mb-4">
                      <VerificationBadges badges={badges} size="md" maxVisible={6} />
                    </div>

                    {/* Location and info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{company.location.city}, {company.location.state}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Desde {company.established}</span>
                      </div>
                      {company.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{company.phone}</span>
                        </div>
                      )}
                      {company.website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4" />
                          <Link href={company.website} className="text-blue-600 hover:underline">
                            Website
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Specialties */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {company.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Avaliações de Clientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {companyReviews.length > 0 ? (
                    companyReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="font-medium text-gray-900">{review.userName}</h4>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <RatingStars rating={review.rating} size="sm" />
                              <span>•</span>
                              <span>{new Date(review.createdAt).toLocaleDateString('pt-BR')}</span>
                              <span>•</span>
                              <span>{review.location}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Ainda não há avaliações para esta empresa. Seja o primeiro a avaliar!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Solicitar Orçamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Solicitar Orçamento</DialogTitle>
                    </DialogHeader>
                    <ContactForm companyId={company.id} />
                  </DialogContent>
                </Dialog>
                {company.phone && (
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar Agora
                  </Button>
                )}
                {company.phone && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={`https://wa.me/55${company.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                )}
                {company.website && (
                  <Button variant="outline" className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Visitar Website
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Escrever Avaliação
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avaliações:</span>
                    <span className="font-medium">{company.reviewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nota média:</span>
                    <span className="font-medium">{company.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fundada em:</span>
                    <span className="font-medium">{company.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo de conta:</span>
                    <span className="font-medium capitalize">{company.planType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selos de verificação:</span>
                    <span className="font-medium">{badges.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}