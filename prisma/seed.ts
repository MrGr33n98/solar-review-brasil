import { PrismaClient } from '@prisma/client'
import { companies, reviews } from '../lib/data'

const prisma = new PrismaClient()

async function main() {
  for (const c of companies) {
    await prisma.company.create({
      data: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        logo: c.logo,
        banner: c.banner,
        rating: c.rating,
        reviewCount: c.reviewCount,
        planType: c.planType,
        city: c.location.city,
        state: c.location.state,
        specialties: c.specialties,
        established: c.established,
        website: c.website,
        phone: c.phone,
        verificationBadges: c.verificationBadges,
      },
    })
  }

  for (const r of reviews) {
    await prisma.review.create({
      data: {
        id: r.id,
        companyId: r.companyId,
        userName: r.userName,
        rating: r.rating,
        comment: r.comment,
        verified: r.verified,
        createdAt: new Date(r.createdAt),
        location: r.location,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
