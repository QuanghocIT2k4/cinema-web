import type { Booking } from '../../../../shared/types/booking.types'
import { BookingStatus } from '../../../../shared/types/booking.types'

interface BookingRowProps {
  booking: Booking
  onConfirm: (booking: Booking) => void
  onCancel: (booking: Booking) => void
  isConfirming: boolean
  isCancelling: boolean
}

export default function BookingRow({
  booking,
  onConfirm,
  onCancel,
  isConfirming,
  isCancelling,
}: BookingRowProps) {
  const getStatusBadge = (status: BookingStatus) => {
    const statusConfig = {
      [BookingStatus.PAID]: { label: 'Paid', className: 'bg-green-900 text-green-300' },
      [BookingStatus.PENDING]: { label: 'Pending', className: 'bg-yellow-900 text-yellow-300' },
      [BookingStatus.CANCELLED]: { label: 'Cancelled', className: 'bg-red-900 text-red-300' },
    }
    const config = statusConfig[status] || statusConfig[BookingStatus.PENDING]
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('vi-VN')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price) + '₫'
  }

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-300">{booking.bookingCode}</td>
      <td className="px-4 py-3 text-sm text-gray-300">
        <div className="flex flex-col">
          <span className="font-medium text-white">{booking.user?.fullName || '-'}</span>
          <span className="text-xs text-gray-400">{booking.user?.email || '-'}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {booking.showtime?.movieTitle || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {booking.showtime?.cinemaName || '-'} • {booking.showtime?.roomNumber || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {booking.showtime?.startTime
          ? new Date(booking.showtime.startTime).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {booking.tickets?.length || 0} seats
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-white">
        {formatPrice(booking.totalPrice)}
      </td>
      <td className="px-4 py-3">{getStatusBadge(booking.status)}</td>
      <td className="px-4 py-3 text-sm text-gray-400">{formatDate(booking.createdAt)}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          {booking.status === BookingStatus.PENDING && (
            <button
              onClick={() => onConfirm(booking)}
              disabled={isConfirming}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-xs"
            >
              Confirm
            </button>
          )}
          {booking.status !== BookingStatus.CANCELLED && booking.status !== BookingStatus.PAID && (
            <button
              onClick={() => onCancel(booking)}
              disabled={isCancelling}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 text-xs"
            >
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

