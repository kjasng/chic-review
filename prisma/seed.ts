import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.post.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await hash("Admin@123", 12)

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  })

  // Create regular user
  const testUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Test User",
      password: hashedPassword,
      role: "USER",
      emailVerified: new Date(),
    },
  })

  // Create moderator user
  const moderatorUser = await prisma.user.create({
    data: {
      email: "moderator@example.com",
      name: "Moderator User",
      password: hashedPassword,
      role: "MODERATOR",
      emailVerified: new Date(),
    },
  })

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with Next.js 15",
        content:
          "Next.js 15 introduces exciting new features including improved performance, better developer experience, and enhanced React Server Components support.",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: "Understanding Prisma ORM",
        content:
          "Prisma is a next-generation ORM that makes database access easy with type-safe queries and migrations.",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: "Authentication with NextAuth.js",
        content:
          "NextAuth.js provides a complete authentication solution for Next.js applications with support for multiple providers.",
        published: true,
        authorId: testUser.id,
      },
      {
        title: "Draft Post - Work in Progress",
        content: "This is a draft post that is not yet published.",
        published: false,
        authorId: testUser.id,
      },
      {
        title: "TypeScript Best Practices",
        content:
          "Learn about TypeScript best practices for building scalable and maintainable applications.",
        published: true,
        authorId: moderatorUser.id,
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
