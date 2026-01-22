export const BookingStatusValues = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED',
} as const

export type BookingStatus = (typeof BookingStatusValues)[keyof typeof BookingStatusValues]

export const BookingStatus = BookingStatusValues

export interface BookedSeat {
  seatId: number
}

export interface CreateBookingRequest {
  showtimeId: string
  seatIds: number[]
}

export interface Booking {
  id: number | string
  bookingCode: string
  status: BookingStatus
  totalPrice: number
  createdAt?: string
  showtime?: {
    movieTitle?: string
    cinemaName?: string
    roomNumber?: string
    startTime?: string
  }
  tickets?: Array<{
    id?: number
    seatId?: number
    [key: string]: any
  }>
}

export interface BookingsParams {
  page?: number
  size?: number
  status?: BookingStatus
  search?: string
}

export interface BookingsResponse {
  content: Booking[]
  totalPages: number
  totalElements: number
}
