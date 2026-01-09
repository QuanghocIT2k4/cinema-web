// Common API response types

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginationResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  size: number
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

