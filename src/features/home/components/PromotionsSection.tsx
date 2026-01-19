import React from 'react'
import { Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'

type Promotion = {
  id: string
  image: string
  title?: string
  description?: string
}

type Props = {
  promotions: Promotion[]
}

const PromotionsSection: React.FC<Props> = ({ promotions }) => {
  return (
    <div className="py-12 lg:py-16 bg-[#1A2232]/50 rounded-3xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#a855f7] to-[#648DDB] rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Deals & Promotions</h2>
          </div>
          <Link
            to="#"
            className="text-sm font-semibold text-[#FE7E32] hover:text-white transition-colors flex items-center gap-1"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group relative bg-[#242b3d] rounded-2xl overflow-hidden shadow-lg border border-transparent hover:border-[#FE7E32]/50 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={promo.image}
                  alt={promo.title || 'Promotion'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <div className="absolute -top-5 right-5 w-12 h-12 bg-[#FE7E32] rounded-full flex items-center justify-center border-4 border-[#242b3d] group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 pr-8">
                  {promo.title || 'Special Promotion'}
                </h3>
                {promo.description && (
                  <p className="text-gray-400 text-sm line-clamp-2">{promo.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromotionsSection





