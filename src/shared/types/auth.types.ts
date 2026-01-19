// Auth types

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  fullName?: string
  phone?: string
  avatar?: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    username: string
    email: string
    role: 'ADMIN' | 'CUSTOMER'
    fullName?: string
  }
}

export interface UserResponse {
  id: number
  username: string
  email: string
  role: 'ADMIN' | 'CUSTOMER'
  fullName?: string
  phone?: string
  address?: string
  avatar?: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}
