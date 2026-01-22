import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { Cinema } from '../types/cinema.types'

export const cinemasApi = {
  list: async (): Promise<Cinema[]> => {
    // Backend đang trả Spring Page<CinemaResponse> (shape: { content: [...], totalElements, ... })
    // Nên ở đây normalize để UI luôn nhận mảng.
    const res = await apiClient.get<any>(API_ENDPOINTS.CINEMAS.LIST, {
      params: { page: 0, size: 200 },
    })
    const data = res.data
    if (Array.isArray(data)) return data as Cinema[]
    if (data && Array.isArray(data.content)) return data.content as Cinema[]
    return []
  },
}


