import { PrismaClient } from '@prisma/client'
import { companies } from '../lib/data'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.review.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.company.deleteMany()

  // Seed companies
  for (const company of companies) {
    await prisma.company.create({
      data: {
        name: company.name,
        description: company.description,
        imageUrl: company.imageUrl,
        website: company.website,
        phone: company.phone,
        email: company.email,
        address: company.address,
        city: company.location.city,
        state: company.location.state,
        rating: company.rating,
        reviewCount: company.reviewCount
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
