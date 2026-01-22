import type { Showtime } from '../../../../shared/types/showtime.types'

interface ShowtimeRowProps {
  showtime: Showtime
  onEdit: (showtime: Showtime) => void
  onDelete: (showtime: Showtime) => void
}

export default function ShowtimeRow({ showtime, onEdit, onDelete }: ShowtimeRowProps) {
  return (
    <tr className="hover:bg-gray-700 transition-colors">
      <td className="px-4 py-3 text-white font-medium">{showtime.movieTitle}</td>
      <td className="px-4 py-3 text-gray-300">
        {showtime.cinemaName} - Room {showtime.roomNumber}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {new Date(showtime.startTime).toLocaleString('en-US')}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {new Date(showtime.endTime).toLocaleString('en-US')}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {showtime.price.toLocaleString('en-US')} ₫
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(showtime)}
            className="px-3 py-1.5 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(showtime)}
            className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}