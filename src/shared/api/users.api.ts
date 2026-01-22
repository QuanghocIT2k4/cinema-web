import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { UserResponse } from '../types/auth.types'
import type { SpringPage, UserRequest } from '../types/user.types'

export const usersApi = {
  list: async (params: { page: number; size: number }): Promise<SpringPage<UserResponse>> => {
    const res = await apiClient.get<SpringPage<UserResponse>>(API_ENDPOINTS.USERS.LIST, { params })
    return res.data
  },

  create: async (payload: UserRequest): Promise<UserResponse> => {
    const res = await apiClient.post<UserResponse>(API_ENDPOINTS.USERS.CREATE, payload)
    return res.data
  },

  update: async (id: number, payload: UserRequest): Promise<UserResponse> => {
    const res = await apiClient.put<UserResponse>(API_ENDPOINTS.USERS.UPDATE(id), payload)
    return res.data
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id))
  },
}




