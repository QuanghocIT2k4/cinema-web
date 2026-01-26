import type { UserResponse } from './auth.types'

export type UserRole = UserResponse['role']
export type UserStatus = UserResponse['status']

export interface UserRequest {
  username: string
  email: string
  password?: string
  role?: UserRole
  fullName?: string
  phone?: string
  address?: string
  avatar?: string
  status?: UserStatus
}

export interface SpringPage<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}






