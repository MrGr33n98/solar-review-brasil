'use client';

import Script from 'next/script';

interface CompanyJsonLdProps {
  company: {
    name: string;
    slug: string;
    description: string;
    logo: string;
    phone?: string;
    location: {
      city: string;
      state: string;
    };
    rating: number;
    reviewCount: number;
  };
}

export function CompanyJsonLd({ company }: CompanyJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.description,
    image: company.logo,
    url: `https://solarreviewsbrasil.com.br/empresa/${company.slug}`,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.location.city,
      addressRegion: company.location.state,
      addressCountry: 'BR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: company.rating,
      reviewCount: company.reviewCount,
    },
  };

  return (
    <Script
      id="company-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
