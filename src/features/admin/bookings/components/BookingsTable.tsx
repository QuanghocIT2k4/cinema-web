import type { Booking } from '../../../../shared/types/booking.types'
import BookingRow from './BookingRow'

interface BookingsTableProps {
  bookings: Booking[]
  isLoading: boolean
  error: Error | null
  onConfirm: (booking: Booking) => void
  onCancel: (booking: Booking) => void
  isConfirming: boolean
  isCancelling: boolean
}

export default function BookingsTable({
  bookings,
  isLoading,
  error,
  onConfirm,
  onCancel,
  isConfirming,
  isCancelling,
}: BookingsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <div className="text-red-400">Error: {error.message}</div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <div className="text-gray-400">No bookings found</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Booking Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Movie
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Cinema / Room
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Seats
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onConfirm={onConfirm}
                onCancel={onCancel}
                isConfirming={isConfirming}
                isCancelling={isCancelling}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

