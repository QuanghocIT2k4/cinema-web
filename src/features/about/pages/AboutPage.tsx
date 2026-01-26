import { AboutHero, AboutIntro, MissionSection, CinemaSystemSection, HeadquartersSection } from '../components'

export default function AboutPage() {
  return (
    <div className="bg-[#1a2232] text-white min-h-screen">
      <AboutHero />

      <div className="py-14 lg:py-18">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
          <AboutIntro />
          <MissionSection />
          <CinemaSystemSection />
          <HeadquartersSection />
        </div>
      </div>
    </div>
  )
}
