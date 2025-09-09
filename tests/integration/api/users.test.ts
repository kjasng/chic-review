import { NextRequest } from 'next/server'

import { GET, POST } from '@/app/api/users/route'
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'

jest.mock('@/lib/auth/auth')
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

describe('/api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/users', () => {
    it('returns 401 when not authenticated', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce(null)

      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns paginated users when authenticated', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce({
        user: { id: '1', role: 'USER' },
      })

      const mockUsers = [
        {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'USER',
          createdAt: new Date(),
          _count: { posts: 0 },
        },
      ]

      ;(prisma.user.findMany as jest.Mock).mockResolvedValueOnce(mockUsers)
      ;(prisma.user.count as jest.Mock).mockResolvedValueOnce(1)

      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.users).toHaveLength(1)
      expect(data.users[0].email).toBe('test@example.com')
      expect(data.pagination).toEqual({
        total: 1,
        page: 1,
        limit: 10,
        pages: 1,
      })
    })

    it('supports pagination parameters', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce({
        user: { id: '1', role: 'USER' },
      })
      ;(prisma.user.findMany as jest.Mock).mockResolvedValueOnce([])
      ;(prisma.user.count as jest.Mock).mockResolvedValueOnce(25)

      const request = new NextRequest(
        'http://localhost:3000/api/users?page=2&limit=10',
      )
      const response = await GET(request)
      const data = await response.json()

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        }),
      )

      expect(data.pagination.page).toBe(2)
      expect(data.pagination.pages).toBe(3)
    })

    it('supports search parameter', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce({
        user: { id: '1', role: 'USER' },
      })
      ;(prisma.user.findMany as jest.Mock).mockResolvedValueOnce([])
      ;(prisma.user.count as jest.Mock).mockResolvedValueOnce(0)

      const request = new NextRequest(
        'http://localhost:3000/api/users?search=john',
      )
      await GET(request)

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { email: { contains: 'john', mode: 'insensitive' } },
              { name: { contains: 'john', mode: 'insensitive' } },
            ],
          },
        }),
      )
    })
  })

  describe('POST /api/users', () => {
    it('returns 401 when not authenticated', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce(null)

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New User',
          email: 'new@example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 401 when user is not admin', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce({
        user: { id: '1', role: 'USER' },
      })

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New User',
          email: 'new@example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('creates user when admin', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce({
        user: { id: '1', role: 'ADMIN' },
      })
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValueOnce({
        id: '2',
        email: 'new@example.com',
        name: 'New User',
        role: 'USER',
      })

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New User',
          email: 'new@example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.email).toBe('new@example.com')
      expect(prisma.user.create).toHaveBeenCalled()
    })

    it('returns 400 for invalid data', async () => {
      ;(auth as jest.Mock).mockResolvedValueOnce({
        user: { id: '1', role: 'ADMIN' },
      })

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'N', // Too short
          email: 'invalid-email',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Validation Error')
      expect(data.details).toBeDefined()
    })
  })
})
