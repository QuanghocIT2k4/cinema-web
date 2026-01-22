import type { Showtime } from '../../../../shared/types/showtime.types'
import ShowtimeRow from './ShowtimeRow'

interface ShowtimesTableProps {
  showtimes: Showtime[]
  isLoading: boolean
  error: Error | null
  onEdit: (showtime: Showtime) => void
  onDelete: (showtime: Showtime) => void
}

export default function ShowtimesTable({
  showtimes,
  isLoading,
  error,
  onEdit,
  onDelete,
}: ShowtimesTableProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Movie
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Cinema / Room
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Start
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                End
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Ticket price
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-red-300">
                  Failed to load showtimes
                </td>
              </tr>
            ) : showtimes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-400">
                  No showtimes found.
                </td>
              </tr>
            ) : (
              showtimes.map((showtime) => (
                <ShowtimeRow
                  key={showtime.id}
                  showtime={showtime}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}