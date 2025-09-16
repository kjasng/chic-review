import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await hash("Admin@123", 12)

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  })

  // Create regular user
  await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Test User",
      password: hashedPassword,
      role: "USER",
      emailVerified: new Date(),
    },
  })

  // Create sample posts
  await prisma.review.createMany({
    data: [
      {
        title: "Getting Started with Next.js 15",
        content:
          "Next.js 15 introduces exciting new features including improved performance, better developer experience, and enhanced React Server Components support.",
        status: "ACTIVE",
        accommodationId: "1",
        source: "PLATFORM",
        reviewerName: "Test User",
        overallRating: 5,
        reviewDate: new Date(),
      },
      {
        title: "Understanding Prisma ORM",
        content:
          "Prisma is a next-generation ORM that makes database access easy with type-safe queries and migrations.",
        status: "ACTIVE",
        accommodationId: "1",
        source: "PLATFORM",
        reviewerName: "Test User",
        overallRating: 5,
        reviewDate: new Date(),
      },
      {
        title: "Authentication with NextAuth.js",
        content:
          "NextAuth.js provides a complete authentication solution for Next.js applications with support for multiple providers.",
        status: "ACTIVE",
        accommodationId: "1",
        source: "PLATFORM",
        reviewerName: "Test User",
        overallRating: 5,
        reviewDate: new Date(),
      },
      {
        title: "Draft Post - Work in Progress",
        content: "This is a draft post that is not yet published.",
        status: "ACTIVE",
        accommodationId: "1",
        source: "PLATFORM",
        reviewerName: "Test User",
        overallRating: 5,
        reviewDate: new Date(),
      },
      {
        title: "TypeScript Best Practices",
        content:
          "Learn about TypeScript best practices for building scalable and maintainable applications.",
        status: "ACTIVE",
        accommodationId: "1",
        source: "PLATFORM",
        reviewerName: "Test User",
        overallRating: 5,
        reviewDate: new Date(),
      },
    ],
  })

  console.log("Database seeded successfully!")
  console.log("Created users:")
  console.log("  - admin@example.com (password: Admin@123)")
  console.log("  - user@example.com (password: Admin@123)")
  console.log("  - moderator@example.com (password: Admin@123)")
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
