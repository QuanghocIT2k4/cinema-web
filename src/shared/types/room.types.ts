export interface Room {
  id: number
  cinemaId: number
  cinemaName: string
  roomNumber: string
  totalRows: number
  totalCols: number
  totalSeats: number
  createdAt?: string
  updatedAt?: string
}

export interface SpringPage<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}





