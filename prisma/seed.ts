import { prisma } from '../lib/prisma';
import { companies, reviews, sponsoredContent } from '../lib/data';

async function main() {
  for (const company of companies) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: {},
      create: {
        id: company.id,
        name: company.name,
        slug: company.slug,
        description: company.description,
        logo: company.logo,
        banner: company.banner,
        rating: company.rating,
        reviewCount: company.reviewCount,
        planType: company.planType,
        city: company.location.city,
        state: company.location.state,
        specialties: company.specialties,
        established: company.established,
        website: company.website,
        phone: company.phone,
        verificationBadges: company.verificationBadges,
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        companyId: review.companyId,
        userName: review.userName,
        rating: review.rating,
        comment: review.comment,
        verified: review.verified,
        createdAt: new Date(review.createdAt),
        location: review.location,
      },
    });
  }

  for (const content of sponsoredContent) {
    await prisma.sponsoredContent.upsert({
      where: { id: content.id },
      update: {},
      create: {
        id: content.id,
        companyId: content.companyId,
        position: content.position,
        city: content.city,
        imageUrl: content.imageUrl,
        title: content.title,
        subtitle: content.subtitle,
        ctaText: content.ctaText,
        ctaUrl: content.ctaUrl,
        startDate: new Date(content.startDate),
        endDate: new Date(content.endDate),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
