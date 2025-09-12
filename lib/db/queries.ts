import { prisma } from "./prisma"

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        emailVerified: true,
      },
    })
    return user
  } catch {
    return null
  }
}

export async function createUser(data: {
  email: string
  name: string
  password: string
}) {
  try {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    })
    return user
  } catch {
    return null
  }
}

export async function updateUser(
  id: string,
  data: {
    name?: string
    email?: string
    image?: string
  },
) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
      },
    })
    return user
  } catch {
    return null
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    })
    return true
  } catch {
    return false
  }
}

export async function getUsers(
  page: number = 1,
  limit: number = 10,
  search?: string,
) {
  try {
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [{ email: { contains: search } }, { name: { contains: search } }],
        }
      : {}

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          _count: {
            select: { posts: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ])

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    }
  } catch {
    return {
      users: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0,
      },
    }
  }
}
