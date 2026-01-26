import { Phone, Mail, Building } from 'lucide-react'

export function HeadquartersSection() {
  return (
    <section className="bg-[#242b3d] rounded-2xl border border-white/10 overflow-hidden">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-10">
          <h2 className="text-3xl font-bold">Headquarters</h2>
          <p className="text-gray-400 mt-2 mb-6">Contact our office.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-[#fe7e32]" />
              <span>1900 0085</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-[#fe7e32]" />
              <span>support@cinetech.vn</span>
            </div>
            <div className="flex items-center gap-4">
              <Building className="w-5 h-5 text-[#fe7e32]" />
              <span>135 Hai Bà Trưng, Quận 1, TP.HCM</span>
            </div>
          </div>
        </div>
        <div className="h-56 md:h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80"
            alt="Office"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}


