export interface Showtime {
  id: number
  movieId: number
  movieTitle: string
  roomId: number
  roomNumber: string
  cinemaId: number
  cinemaName: string
  startTime: string // chuỗi thời gian ISO
  endTime: string // chuỗi thời gian ISO
  price: number // backend BigDecimal → number trên FE
  createdAt?: string
  updatedAt?: string
}






