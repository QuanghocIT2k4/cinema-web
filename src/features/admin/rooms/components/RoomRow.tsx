import type { Room } from '@/shared/types/room.types'

interface RoomRowProps {
  room: Room
  onEdit: (room: Room) => void
  onDelete: (room: Room) => void
}

export default function RoomRow({ room, onEdit, onDelete }: RoomRowProps) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-white">{room.roomNumber}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{room.cinemaName}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{room.totalRows}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{room.totalCols}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{room.totalSeats || room.totalRows * room.totalCols}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(room)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(room)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

