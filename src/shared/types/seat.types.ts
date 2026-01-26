export enum SeatType {
  NORMAL = 'NORMAL',
  VIP = 'VIP',
}

export interface Seat {
  id: number
  roomId: number
  seatNumber: string // A1, A2, B1, ...
  row: string // A, B, C, ...
  col: number // 1, 2, 3, ...
  type: SeatType
  createdAt?: string
  updatedAt?: string
}



