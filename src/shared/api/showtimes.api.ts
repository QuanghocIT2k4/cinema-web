import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { Showtime } from '../types/showtime.types'

export interface ShowtimePage {
  content: Showtime[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export const showtimesApi = {
  getByDate: async (date: string): Promise<Showtime[]> => {
    const res = await apiClient.get<Showtime[]>(API_ENDPOINTS.SHOWTIMES.BY_DATE(date))
    return res.data
  },

  getByMovie: async (movieId: number | string): Promise<Showtime[]> => {
    const res = await apiClient.get<Showtime[]>(API_ENDPOINTS.SHOWTIMES.BY_MOVIE(movieId))
    return res.data
  },

  list: async (params: { page: number; size: number }): Promise<ShowtimePage> => {
    const res = await apiClient.get<ShowtimePage>(API_ENDPOINTS.SHOWTIMES.LIST, { params })
    return res.data
  },

  create: async (payload: {
    movieId: number
    roomId: number
    startTime: string
    endTime: string
    price: number
  }): Promise<Showtime> => {
    const res = await apiClient.post<Showtime>(API_ENDPOINTS.SHOWTIMES.LIST, payload)
    return res.data
  },

  update: async (
    id: number,
    payload: {
      movieId: number
      roomId: number
      startTime: string
      endTime: string
      price: number
    },
  ): Promise<Showtime> => {
    const res = await apiClient.put<Showtime>(`${API_ENDPOINTS.SHOWTIMES.LIST}/${id}`, payload)
    return res.data
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.SHOWTIMES.LIST}/${id}`)
  },
}

