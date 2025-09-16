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
  role: "USER" | "ADMIN"
  image?: string | null
  createdAt?: Date
  _count?: {
    reviews: number
  }
}

export interface PostResponse {
  id: string
  name: string
  content: string | null
  description: string | null
  type: "HOMESTAY" | "HOSTEL" | "HOTEL" | "APARTMENT"
  slug: string
  district: string
  priceDaily: number
  priceMonthly: number
  amenities: string[]
  images: string[]
  capacity: number
  rooms: number
  bathrooms: number
  featured: boolean
  rating: number
  reviewCount: number
  authorId: string
  author?: UserResponse
  createdAt: Date
  updatedAt: Date
}
