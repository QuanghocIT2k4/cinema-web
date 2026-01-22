import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { Room, SpringPage } from '../types/room.types'
import type { Seat } from '../types/seat.types'

export const roomsApi = {
  list: async (params: { page: number; size: number }): Promise<SpringPage<Room>> => {
    const res = await apiClient.get<SpringPage<Room>>(API_ENDPOINTS.ROOMS.LIST, { params })
    return res.data
  },

  byCinema: async (cinemaId: number | string): Promise<Room[]> => {
    const res = await apiClient.get<Room[]>(API_ENDPOINTS.ROOMS.BY_CINEMA(cinemaId))
    return res.data
  },

  getSeatsByRoom: async (roomId: number | string): Promise<Seat[]> => {
    const res = await apiClient.get<Seat[]>(API_ENDPOINTS.ROOMS.SEATS(roomId))
    return res.data
  },

  create: async (payload: {
    cinemaId: number
    roomNumber: string
    totalRows: number
    totalCols: number
  }): Promise<Room> => {
    const res = await apiClient.post<Room>(API_ENDPOINTS.ROOMS.CREATE, payload)
    return res.data
  },

  update: async (
    id: number,
    payload: {
      cinemaId: number
      roomNumber: string
      totalRows: number
      totalCols: number
    },
  ): Promise<Room> => {
    const res = await apiClient.put<Room>(API_ENDPOINTS.ROOMS.UPDATE(id), payload)
    return res.data
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.ROOMS.DELETE(id))
  },
}




