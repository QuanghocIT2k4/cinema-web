import { missionData } from '../constants/aboutData'

export function MissionSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {missionData.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="bg-[#242b3d] p-8 rounded-2xl border border-white/10 text-center transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#a855f7] to-[#648ddb] rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-300">{item.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}


