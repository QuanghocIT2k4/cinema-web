import { Search } from 'lucide-react'
import { MovieStatus } from '../../../../shared/types/movie.types'

interface MoviesFiltersProps {
  search: string
  statusFilter: MovieStatus | ''
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: MovieStatus | '') => void
}

export default function MoviesFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: MoviesFiltersProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by title, genre..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as MovieStatus | '')}
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
      >
        <option value="">All statuses</option>
        <option value={MovieStatus.NOW_SHOWING}>Now showing</option>
        <option value={MovieStatus.COMING_SOON}>Coming soon</option>
        <option value={MovieStatus.ENDED}>Ended</option>
      </select>
    </div>
  )
}

