import { MapPin } from 'lucide-react'
import { branches } from '../constants/aboutData'

export function CinemaSystemSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-10">Cinema System</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="relative h-64 rounded-2xl overflow-hidden group shadow-lg border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=1200&q=80"
              alt={branch.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6">
              <h3 className="font-bold text-lg text-white">{branch.name}</h3>
              <div className="flex items-start gap-2 mt-1 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{branch.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


