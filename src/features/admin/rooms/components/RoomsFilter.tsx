import type { Cinema } from '../../../../shared/types/cinema.types'

interface RoomsFilterProps {
  selectedCinemaId: number | 'all'
  cinemas: Cinema[]
  onCinemaChange: (cinemaId: number | 'all') => void
}

export default function RoomsFilter({ selectedCinemaId, cinemas, onCinemaChange }: RoomsFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <span className="text-sm text-gray-300">Filter by cinema:</span>
        <select
          value={selectedCinemaId}
          onChange={(e) => {
            const v = e.target.value
            onCinemaChange(v === 'all' ? 'all' : Number(v))
          }}
          className="ml-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
        >
          <option value="all">All cinemas</option>
          {cinemas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
