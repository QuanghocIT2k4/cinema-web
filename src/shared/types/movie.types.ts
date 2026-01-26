// Kiểu Movie tương ứng với entity ở backend
// LƯU Ý: tsconfig của project bật `erasableSyntaxOnly`, nên tránh dùng TS `enum` (có sinh mã runtime).
// Thay vào đó sử dụng const object + union type.
export const MovieStatus = {
  NOW_SHOWING: 'NOW_SHOWING',
  COMING_SOON: 'COMING_SOON',
  ENDED: 'ENDED',
} as const

export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus]

export interface Movie {
  id: number
  title: string
  description: string
  genre: string
  duration: number // đơn vị: phút
  releaseDate: string // chuỗi ngày ISO
  endDate: string // chuỗi ngày ISO
  status: MovieStatus
  ageRating: string
  poster: string // đường dẫn URL poster
  trailer: string // đường dẫn URL trailer
  director?: string
  cast?: string
  createdAt?: string
  updatedAt?: string
}

export interface MovieFormData {
  title: string
  description: string
  genre: string
  duration: number
  releaseDate: string
  endDate: string
  status: MovieStatus
  ageRating: string
  poster: string
  trailer: string
  director?: string
  cast?: string
}

export interface MoviesParams {
  page?: number
  size?: number
  search?: string
  status?: MovieStatus
  genre?: string
  year?: number
  rating?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface MoviesResponse {
  content: Movie[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export interface MovieActor {
  id: number
  name: string
  avatarUrl: string | null
}

export interface Review {
  id: number
  authorName: string
  rating: number
  comment: string
  createdAt: string
}
