import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { LoginRequest, RegisterRequest, AuthResponse, UserResponse } from '../types/auth.types'

/**
 * API service cho Authentication
 */
export const authApi = {
  /**
   * Đăng nhập
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data)
    return response.data
  },

  /**
   * Đăng ký
   */
  register: async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data
  },
}
