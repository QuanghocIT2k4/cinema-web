import { useState, useMemo } from 'react'
import { useBookings } from '../hooks/useBookings'
import { useConfirmBooking } from '../hooks/useConfirmBooking'
import { useCancelBooking } from '../hooks/useCancelBooking'
import { BookingsFilters, BookingsTable, BookingsPagination } from './index'
import ConfirmModal from '@/shared/components/ConfirmModal'
import type { Booking } from '@/shared/types/booking.types'
import { BookingStatus } from '@/shared/types/booking.types'

const PAGE_SIZE = 10

export default function BookingManagement() {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('')
  const [search, setSearch] = useState('')
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    type: 'confirm' | 'cancel'
    booking: Booking | null
  }>({
    isOpen: false,
    type: 'confirm',
    booking: null,
  })

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
    setConfirmModal({
      isOpen: true,
      type: 'confirm',
      booking,
    })
  }

  const handleCancel = (booking: Booking) => {
    setConfirmModal({
      isOpen: true,
      type: 'cancel',
      booking,
    })
  }

  const handleConfirmAction = () => {
    if (confirmModal.booking) {
      if (confirmModal.type === 'confirm') {
        confirmBooking.mutate(confirmModal.booking.id)
      } else {
        cancelBooking.mutate(confirmModal.booking.id)
      }
    }
    setConfirmModal({ isOpen: false, type: 'confirm', booking: null })
  }

  const handleCancelAction = () => {
    setConfirmModal({ isOpen: false, type: 'confirm', booking: null })
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

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={
          confirmModal.type === 'confirm'
            ? 'Confirm Payment'
            : 'Cancel Booking'
        }
        message={
          confirmModal.type === 'confirm'
            ? `Are you sure you want to confirm payment for booking ${confirmModal.booking?.bookingCode}?`
            : `Are you sure you want to cancel booking ${confirmModal.booking?.bookingCode}? This action cannot be undone.`
        }
        confirmText={confirmModal.type === 'confirm' ? 'Confirm' : 'Cancel Booking'}
        cancelText="Back"
        variant={confirmModal.type === 'confirm' ? 'info' : 'danger'}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  )
}

