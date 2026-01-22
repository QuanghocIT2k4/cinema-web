import type { Cinema } from '../../../../shared/types/cinema.types'
import type { Room } from '../../../../shared/types/room.types'

interface RoomFormModalProps {
  isOpen: boolean
  editing: Room | null
  form: {
    cinemaId: number | ''
    roomNumber: string
    totalRows: number
    totalCols: number
  }
  cinemas: Cinema[]
  isLoading: boolean
  onClose: () => void
  onFormChange: (field: string, value: any) => void
  onSubmit: () => void
}

export default function RoomFormModal({
  isOpen,
  editing,
  form,
  cinemas,
  isLoading,
  onClose,
  onFormChange,
  onSubmit,
}: RoomFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-xl bg-gray-800 border border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {editing ? `Edit room ${editing.roomNumber}` : 'Create new room'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">Cinema</label>
            <select
              value={form.cinemaId}
              onChange={(e) => onFormChange('cinemaId', e.target.value ? Number(e.target.value) : '')}
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
            <label className="text-sm text-gray-300">Room number</label>
            <input
              value={form.roomNumber}
              onChange={(e) => onFormChange('roomNumber', e.target.value)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="e.g. 1, 2, VIP1..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300">Rows</label>
              <input
                type="number"
                min={1}
                value={form.totalRows}
                onChange={(e) => onFormChange('totalRows', Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Seats per row</label>
              <input
                type="number"
                min={1}
                value={form.totalCols}
                onChange={(e) => onFormChange('totalCols', Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              />
            </div>
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
