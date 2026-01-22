import type { Movie } from '../../../../shared/types/movie.types'
import type { Cinema } from '../../../../shared/types/cinema.types'
import type { Room } from '../../../../shared/types/room.types'
import type { Showtime } from '../../../../shared/types/showtime.types'

interface ShowtimeFormModalProps {
  isOpen: boolean
  editing: Showtime | null
  form: {
    movieId: number | ''
    cinemaId: number | ''
    roomId: number | ''
    startTime: string
    endTime: string
    price: number
  }
  movies: Movie[]
  cinemas: Cinema[]
  rooms: Room[]
  isLoading: boolean
  onClose: () => void
  onFormChange: (field: string, value: any) => void
  onSubmit: () => void
}

export default function ShowtimeFormModal({
  isOpen,
  editing,
  form,
  movies,
  cinemas,
  rooms,
  isLoading,
  onClose,
  onFormChange,
  onSubmit,
}: ShowtimeFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-xl bg-gray-800 border border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {editing ? 'Edit showtime' : 'Create new showtime'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">Movie</label>
            <select
              value={form.movieId}
              onChange={(e) => onFormChange('movieId', e.target.value ? Number(e.target.value) : '')}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
            >
              <option value="">Select a movie</option>
              {movies.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300">Cinema</label>
              <select
                value={form.cinemaId}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : ''
                  onFormChange('cinemaId', v)
                  onFormChange('roomId', '')
                }}
                className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              >
                <option value="">Select a cinema</option>
                {cinemas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300">Room</label>
              <select
                value={form.roomId}
                onChange={(e) => onFormChange('roomId', e.target.value ? Number(e.target.value) : '')}
                className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
                disabled={!form.cinemaId}
              >
                <option value="">Select a room</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.roomNumber}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300">Start time</label>
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => onFormChange('startTime', e.target.value)}
                className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">End time</label>
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => onFormChange('endTime', e.target.value)}
                className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Ticket price</label>
            <input
              type="number"
              min={1000}
              step={1000}
              value={form.price}
              onChange={(e) => onFormChange('price', Number(e.target.value) || 0)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {editing ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
