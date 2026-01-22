import { Search } from 'lucide-react'
import { BookingStatus } from '../../../../shared/types/booking.types'

interface BookingsFiltersProps {
  search: string
  statusFilter: BookingStatus | ''
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: BookingStatus | '') => void
}

export default function BookingsFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: BookingsFiltersProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by booking code, movie title, cinema..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as BookingStatus | '')}
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
      >
        <option value="">All statuses</option>
        <option value={BookingStatus.PENDING}>Pending</option>
        <option value={BookingStatus.PAID}>Paid</option>
        <option value={BookingStatus.CANCELLED}>Cancelled</option>
      </select>
    </div>
  )
}

