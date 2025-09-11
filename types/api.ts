export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export interface UserResponse {
  id: string
  email: string
  name: string | null
  role: string
  image?: string | null
  createdAt?: Date
  _count?: {
    posts: number
  }
}

export interface PostResponse {
  id: string
  title: string
  content: string | null
  published: boolean
  authorId: string
  author?: UserResponse
  createdAt: Date
  updatedAt: Date
}
