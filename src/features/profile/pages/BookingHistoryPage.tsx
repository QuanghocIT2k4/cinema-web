import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { bookingsApi } from '@/shared/api/bookings.api'
import { BookingStatus } from '@/shared/types/booking.types'
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react'

const PAGE_SIZE = 10

export default function BookingHistoryPage() {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', 'bookings', page, statusFilter],
    queryFn: async () => {
      try {
        const result = await bookingsApi.getBookings({
          page,
          size: PAGE_SIZE,
          ...(statusFilter ? { status: statusFilter } : {}),
        })
        return result
      } catch (err: any) {
        console.error('Error loading bookings:', err)
        throw err
      }
    },
    retry: 1,
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const getStatusBadge = (status: BookingStatus) => {
    const config = {
      [BookingStatus.PAID]: { label: 'Paid', className: 'bg-green-900 text-green-300' },
      [BookingStatus.PENDING]: { label: 'Pending', className: 'bg-yellow-900 text-yellow-300' },
      [BookingStatus.CANCELLED]: { label: 'Cancelled', className: 'bg-gray-700 text-gray-300' },
    }
    return config[status] || config[BookingStatus.PENDING]
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Booking History</h1>
        <p className="text-gray-400">View your past and upcoming bookings</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as BookingStatus | '')
            setPage(0)
          }}
          className="px-4 py-2 bg-[#242b3d] border border-gray-700 rounded-lg text-white"
        >
          <option value="">All status</option>
          <option value={BookingStatus.PAID}>Paid</option>
          <option value={BookingStatus.PENDING}>Pending</option>
          <option value={BookingStatus.CANCELLED}>Cancelled</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400">Loading bookings...</div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-400 mb-2">Failed to load bookings</div>
          <div className="text-sm text-gray-500">
            {(error as any)?.response?.data?.message || (error as any)?.message || 'Please try again later'}
          </div>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && (!data?.content || data.content.length === 0) && (
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No bookings found</p>
        </div>
      )}

      {/* Bookings List */}
      {!isLoading && !error && data?.content && data.content.length > 0 && (
        <>
          <div className="space-y-4">
            {data.content.map((booking) => {
              const statusConfig = getStatusBadge(booking.status)
              const seatCount = booking.tickets?.length || 0

              return (
                <div
                  key={booking.id}
                  className="bg-[#1a2232] rounded-xl border border-white/10 p-6 hover:border-[#fe7e32]/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {booking.showtime?.movieTitle || 'Movie'}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${statusConfig.className}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Booking Code: {booking.bookingCode}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#fe7e32]">
                        {formatPrice(booking.totalPrice)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-[#fe7e32]" />
                      <span>
                        {booking.showtime?.cinemaName || '-'} • Room {booking.showtime?.roomNumber || '-'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-[#fe7e32]" />
                      <span>
                        {formatDate(booking.showtime?.startTime)} • {formatTime(booking.showtime?.startTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Ticket className="w-4 h-4 text-[#fe7e32]" />
                      <span>{seatCount} seat{seatCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-[#fe7e32]" />
                      <span>Booked: {formatDate(booking.createdAt)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-4 py-2 bg-[#242b3d] border border-gray-700 rounded-lg text-white hover:bg-[#1a2232] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {page + 1} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                disabled={page >= data.totalPages - 1}
                className="px-4 py-2 bg-[#242b3d] border border-gray-700 rounded-lg text-white hover:bg-[#1a2232] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

