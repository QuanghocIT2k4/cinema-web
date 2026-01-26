import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { UserResponse } from '../types/auth.types'
import type { ChangePasswordRequest, UpdateProfileRequest } from '../types/profile.types'

export const profileApi = {
  getMe: async (): Promise<UserResponse> => {
    const res = await apiClient.get<UserResponse>(API_ENDPOINTS.AUTH.ME)
    return res.data
  },
  updateProfile: async (payload: UpdateProfileRequest): Promise<UserResponse> => {
    const res = await apiClient.put<UserResponse>(API_ENDPOINTS.AUTH.PROFILE, payload)
    return res.data
  },
  changePassword: async (payload: ChangePasswordRequest): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload)
  },
}





