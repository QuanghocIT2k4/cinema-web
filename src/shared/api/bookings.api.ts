import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { BookedSeat, CreateBookingRequest, Booking, BookingsParams, BookingsResponse } from '../types/booking.types'

export const bookingsApi = {
  getBookedSeatsByShowtime: async (showtimeId: number | string): Promise<BookedSeat[]> => {
    const res = await apiClient.get<BookedSeat[]>(API_ENDPOINTS.BOOKINGS.BOOKED_SEATS(showtimeId))
    return res.data
  },
  createBooking: async (payload: CreateBookingRequest): Promise<Booking> => {
    const res = await apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, payload)
    return res.data
  },
  getBookings: async (params?: BookingsParams): Promise<BookingsResponse> => {
    const res = await apiClient.get<BookingsResponse>(API_ENDPOINTS.BOOKINGS.LIST, { params })
    return res.data
  },
  getBookingById: async (id: number | string): Promise<Booking> => {
    const res = await apiClient.get<Booking>(API_ENDPOINTS.BOOKINGS.DETAIL(id))
    return res.data
  },
  confirmBooking: async (id: number | string): Promise<Booking> => {
    const res = await apiClient.put<Booking>(`${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/confirm`)
    return res.data
  },
  cancelBooking: async (id: number | string): Promise<Booking> => {
    const res = await apiClient.put<Booking>(`${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/cancel`)
    return res.data
  },
}
