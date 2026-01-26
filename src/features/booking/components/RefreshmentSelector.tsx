import { useRefreshments } from '../hooks'

interface RefreshmentSelectorProps {
  selectedRefreshments: Array<{ refreshmentId: number; quantity: number }>
  onRefreshmentToggle: (refreshmentId: number, quantity: number) => void
  onSkip: () => void
  onContinue: () => void
}

export default function RefreshmentSelector({
  selectedRefreshments,
  onRefreshmentToggle,
  onSkip,
  onContinue,
}: RefreshmentSelectorProps) {
  const { data: refreshments, isLoading } = useRefreshments()

  if (isLoading) {
    return (
      <div className="bg-[#1a2232] rounded-2xl p-6 text-center">
        <div className="text-gray-400">Loading refreshments...</div>
      </div>
    )
  }

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Choose refreshment combo</h2>
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-4">
          <p className="text-yellow-200 text-sm">
            <strong>Note:</strong> This feature is under development. You can skip this step for now.
          </p>
        </div>
      </div>

      {refreshments && refreshments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {refreshments.map((refreshment) => {
            const selected = selectedRefreshments.find((r) => r.refreshmentId === refreshment.id)
            const quantity = selected?.quantity || 0

            return (
              <div
                key={refreshment.id}
                className={`border rounded-lg p-4 transition-colors ${
                  quantity > 0
                    ? 'border-[#fe7e32] bg-[#fe7e32]/10'
                    : 'border-gray-700 bg-gray-800/50'
                }`}
              >
                <img
                  src={refreshment.picture}
                  alt={refreshment.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="text-white font-semibold mb-1">{refreshment.name}</h3>
                <p className="text-[#fe7e32] font-bold mb-3">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(refreshment.price)}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRefreshmentToggle(refreshment.id, Math.max(0, quantity - 1))}
                    disabled={quantity === 0}
                    className="w-8 h-8 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => onRefreshmentToggle(refreshment.id, quantity + 1)}
                    className="w-8 h-8 rounded bg-gray-700 text-white hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center text-gray-400 mb-6">No refreshments available</div>
      )}

      <div className="flex justify-between gap-4">
        <button
          onClick={onSkip}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600"
        >
          Skip
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2 bg-[#fe7e32] text-white rounded-lg font-semibold hover:bg-[#fe7e32]/90"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

