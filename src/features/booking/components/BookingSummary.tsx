import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { showtimesApi } from '@/shared/api/showtimes.api'
import { bookingsApi } from '@/shared/api/bookings.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ROUTES } from '@/shared/constants/routes'

interface BookingSummaryProps {
  showtimeId: string
  selectedSeats: number[]
  onBack: () => void
}

export default function BookingSummary({ showtimeId, selectedSeats, onBack }: BookingSummaryProps) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: showtime } = useQuery({
    queryKey: ['showtime', showtimeId],
    queryFn: () => showtimesApi.getByMovie(showtimeId),
    enabled: !!showtimeId,
  })

  const createBookingMutation = useMutation({
    mutationFn: (payload: { showtimeId: string; seatIds: number[] }) =>
      bookingsApi.createBooking(payload),
    onSuccess: () => {
      toast.success('Đặt vé thành công!')
      navigate(ROUTES.PROFILE)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đặt vé thất bại')
      setIsSubmitting(false)
    },
  })

  const handleSubmit = () => {
    if (selectedSeats.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 ghế')
      return
    }
    setIsSubmitting(true)
    createBookingMutation.mutate({
      showtimeId,
      seatIds: selectedSeats,
    })
  }

  const totalPrice = showtime?.[0]?.price
    ? showtime[0].price * selectedSeats.length
    : 0

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Xác nhận đặt vé</h2>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-400">Phim</div>
          <div className="text-white font-semibold">{showtime?.[0]?.movieTitle || '-'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Rạp / Phòng</div>
          <div className="text-white">
            {showtime?.[0]?.cinemaName || '-'} • {showtime?.[0]?.roomNumber || '-'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Thời gian</div>
          <div className="text-white">
            {showtime?.[0]?.startTime
              ? new Date(showtime[0].startTime).toLocaleString('vi-VN')
              : '-'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Số ghế đã chọn</div>
          <div className="text-white">{selectedSeats.length} ghế</div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-white">Tổng tiền</div>
            <div className="text-xl font-bold text-[#fe7e32]">
              {Math.round(totalPrice).toLocaleString('vi-VN')}đ
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Quay lại
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedSeats.length === 0}
            className="flex-1 px-4 py-2 bg-[#fe7e32] text-white rounded-lg font-semibold hover:bg-[#fe7e32]/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt vé'}
          </button>
        </div>
      </div>
    </div>
  )
}

