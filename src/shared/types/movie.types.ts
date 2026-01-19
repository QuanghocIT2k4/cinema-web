// Movie types matching backend entity
// NOTE: Project tsconfig enables `erasableSyntaxOnly`, so we avoid TS `enum` (runtime emit).
// Use const + union type instead.
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
  duration: number // in minutes
  releaseDate: string // ISO date string
  endDate: string // ISO date string
  status: MovieStatus
  ageRating: string
  poster: string // URL
  trailer: string // URL
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
}

export interface MoviesParams {
  page?: number
  size?: number
  search?: string
  status?: MovieStatus
  genre?: string
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
