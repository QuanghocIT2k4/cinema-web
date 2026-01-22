export interface Showtime {
  id: number
  movieId: number
  movieTitle: string
  roomId: number
  roomNumber: string
  cinemaId: number
  cinemaName: string
  startTime: string // ISO
  endTime: string // ISO
  price: number // backend BigDecimal -> number
  createdAt?: string
  updatedAt?: string
}






