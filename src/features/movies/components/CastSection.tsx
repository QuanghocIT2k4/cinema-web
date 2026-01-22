import { Users } from 'lucide-react'

export default function CastSection() {
  return (
    <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[#fe7e32] rounded-lg flex items-center justify-center shadow-lg shadow-[#fe7e32]/20">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Cast &amp; Crew</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-2">
              <span className="text-gray-400 text-xs">Updating...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

