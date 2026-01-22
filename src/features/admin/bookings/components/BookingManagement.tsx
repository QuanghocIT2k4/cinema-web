import { useState, useMemo } from 'react'
import { useBookings } from '../hooks/useBookings'
import { useConfirmBooking } from '../hooks/useConfirmBooking'
import { useCancelBooking } from '../hooks/useCancelBooking'
import { BookingsFilters, BookingsTable, BookingsPagination } from './index'
import type { Booking } from '@/shared/types/booking.types'
import { BookingStatus } from '@/shared/types/booking.types'

const PAGE_SIZE = 10

export default function BookingManagement() {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('')
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useBookings({
    page,
    size: PAGE_SIZE,
    status: statusFilter || undefined,
    search,
  })

  const confirmBooking = useConfirmBooking()
  const cancelBooking = useCancelBooking()

  const filteredBookings = useMemo(() => {
    if (!data?.content) return []
    if (!search.trim()) return data.content

    const searchLower = search.toLowerCase()
    return data.content.filter((booking: Booking) => {
      return (
        booking.bookingCode.toLowerCase().includes(searchLower) ||
        booking.showtime?.movieTitle?.toLowerCase().includes(searchLower) ||
        booking.showtime?.cinemaName?.toLowerCase().includes(searchLower) ||
        booking.showtime?.roomNumber?.toLowerCase().includes(searchLower)
      )
    })
  }, [data?.content, search])

  const handleConfirm = (booking: Booking) => {
    if (confirm(`Confirm payment for booking ${booking.bookingCode}?`)) {
      confirmBooking.mutate(booking.id)
    }
  }

  const handleCancel = (booking: Booking) => {
    if (confirm(`Cancel booking ${booking.bookingCode}?`)) {
      cancelBooking.mutate(booking.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Booking Management</h1>
      </div>

      <BookingsFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        search={search}
        onSearchChange={setSearch}
      />

      <BookingsTable
        bookings={filteredBookings}
        isLoading={isLoading}
        error={error as Error | null}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isConfirming={confirmBooking.isPending}
        isCancelling={cancelBooking.isPending}
      />

      {data && (
        <BookingsPagination
          currentPage={page}
          totalPages={data.totalPages}
          totalElements={data.totalElements}
          pageSize={PAGE_SIZE}
          isFetching={isLoading}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

