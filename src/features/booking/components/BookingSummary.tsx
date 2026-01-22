import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { showtimesApi } from '@/shared/api/showtimes.api'
import { bookingsApi } from '@/shared/api/bookings.api'
import { refreshmentsApi } from '@/shared/api/refreshments.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ROUTES } from '@/shared/constants/routes'

interface BookingSummaryProps {
  showtimeId: string
  selectedSeats: number[]
  selectedRefreshments?: Array<{ refreshmentId: number; quantity: number }>
  onBack: () => void
}

export default function BookingSummary({ showtimeId, selectedSeats, selectedRefreshments = [], onBack }: BookingSummaryProps) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: showtime } = useQuery({
    queryKey: ['showtime', showtimeId],
    queryFn: () => showtimesApi.getById(showtimeId),
    enabled: !!showtimeId,
  })

  const { data: refreshments } = useQuery({
    queryKey: ['refreshments', 'current'],
    queryFn: () => refreshmentsApi.getCurrentRefreshments(),
  })

  const createBookingMutation = useMutation({
    mutationFn: (payload: { showtimeId: string; seatIds: number[] }) =>
      bookingsApi.createBooking(payload),
    onSuccess: () => {
      toast.success('Booking successful!')
      navigate(ROUTES.PROFILE)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Booking failed')
      setIsSubmitting(false)
    },
  })

  const handleSubmit = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least 1 seat')
      return
    }
    setIsSubmitting(true)
    createBookingMutation.mutate({
      showtimeId,
      seatIds: selectedSeats,
      refreshments: selectedRefreshments.length > 0 ? selectedRefreshments : undefined,
    })
  }

  // Tính tổng tiền vé
  const ticketTotal = showtime?.price
    ? showtime.price * selectedSeats.length
    : 0

  // Tính tổng tiền refreshments
  const refreshmentTotal = selectedRefreshments.reduce((sum, order) => {
    const refreshment = refreshments?.find((r) => r.id === order.refreshmentId)
    return sum + (refreshment ? refreshment.price * order.quantity : 0)
  }, 0)

  const totalPrice = ticketTotal + refreshmentTotal

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Confirm booking</h2>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-400">Movie</div>
          <div className="text-white font-semibold">{showtime?.movieTitle || '-'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Cinema / Room</div>
          <div className="text-white">
            {showtime?.cinemaName || '-'} • {showtime?.roomNumber || '-'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Time</div>
          <div className="text-white">
            {showtime?.startTime
              ? new Date(showtime.startTime).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : '-'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Selected seats</div>
          <div className="text-white">{selectedSeats.length} seat(s)</div>
        </div>
        {selectedRefreshments.length > 0 && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Refreshments</div>
            <div className="space-y-1">
              {selectedRefreshments.map((order) => {
                const refreshment = refreshments?.find((r) => r.id === order.refreshmentId)
                if (!refreshment) return null
                return (
                  <div key={order.refreshmentId} className="flex justify-between text-white text-sm">
                    <span>
                      {refreshment.name} x{order.quantity}
                    </span>
                    <span className="text-[#fe7e32]">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(refreshment.price * order.quantity)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div className="border-t border-gray-700 pt-4 space-y-2">
          {ticketTotal > 0 && (
            <div className="flex justify-between text-white">
              <span>Tickets</span>
              <span>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'VND',
                }).format(ticketTotal)}
              </span>
            </div>
          )}
          {refreshmentTotal > 0 && (
            <div className="flex justify-between text-white">
              <span>Refreshments</span>
              <span>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'VND',
                }).format(refreshmentTotal)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-gray-700">
            <div className="text-lg font-semibold text-white">Total</div>
            <div className="text-xl font-bold text-[#fe7e32]">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND',
              }).format(totalPrice)}
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedSeats.length === 0}
            className="flex-1 px-4 py-2 bg-[#fe7e32] text-white rounded-lg font-semibold hover:bg-[#fe7e32]/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

