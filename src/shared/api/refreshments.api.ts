import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { Refreshment } from '../types/refreshment.types'

export const refreshmentsApi = {
  getCurrentRefreshments: async (): Promise<Refreshment[]> => {
    const res = await apiClient.get<Refreshment[]>(API_ENDPOINTS.REFRESHMENTS.LIST)
    return res.data
  },
}


