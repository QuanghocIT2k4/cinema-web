import React from 'react'
import { Target, Globe, Building, Phone, Mail, MapPin } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import { Link } from 'react-router-dom'

const missionData = [
  {
    icon: Target,
    text: 'Dedicated to the development of cinema and entertainment in Vietnam.',
  },
  {
    icon: Globe,
    text: 'Deliver quality service at affordable prices, accessible to all customers.',
  },
  {
    icon: Building,
    text: 'Connect Vietnamese cinema culture with international friends.',
  },
]

const branches = [
  { id: '1', name: 'CineTech Hà Nội', address: '235 Hoàng Quốc Việt, Cầu Giấy, Hà Nội' },
  { id: '2', name: 'CineTech Đà Nẵng', address: '470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng' },
  { id: '3', name: 'CineTech TP.HCM', address: '135 Hai Bà Trưng, Quận 1, TP.HCM' },
]

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#1a2232] text-white min-h-screen">
      {/* Hero */}
      <div className="relative h-72 bg-gradient-to-r from-[#242b3d] to-[#1a2232]">
        <div className="relative max-w-screen-xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to={ROUTES.HOME} className="hover:text-white">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-white font-semibold">About</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3">About CineTECH</h1>
          <p className="text-lg text-gray-300 mt-2 max-w-3xl">
            Our story, mission, and commitment to delivering the best cinema experience.
          </p>
        </div>
      </div>

      <div className="py-14 lg:py-18">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
          {/* Intro */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Beloved Cinema</h2>
              <p className="text-gray-300 mb-4">
                CineTECH aims to become a complete entertainment destination for every Vietnamese family, combining
                cinema, dining, and technology experiences.
              </p>
              <p className="text-gray-300">
                We accompany Vietnamese cinema while updating international blockbusters, delivering
                friendly service, great prices, and continuously improving service quality.
              </p>
            </div>
            <div className="h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80"
                alt="Cinema"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {missionData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#242b3d] p-8 rounded-2xl border border-white/10 text-center transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#a855f7] to-[#648ddb] rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Theaters */}
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

          {/* HQ */}
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
        </div>
      </div>
    </div>
  )
}

export default AboutPage

