import React from 'react'

type Props = {
  qrImage: string
}

const MobileAppBanner: React.FC<Props> = ({ qrImage }) => {
  const qrSrc =
    qrImage ||
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://cinestech.example.com/app'

  return (
    <div className="py-12 lg:py-16">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-r from-[#242b3d] via-[#1a2232] to-[#242b3d] rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10 shadow-2xl">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#a855f7]/20 to-[#648ddb]/20 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-[#648ddb]/20 to-[#a855f7]/20 rounded-full blur-3xl opacity-40 animate-pulse" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get The <span className="text-[#FE7E32]">CinesTECH</span> App
              </h2>
              <p className="text-gray-300 lg:text-lg max-w-md mx-auto md:mx-0">
                Scan the QR code or use the links below to download the app. Book tickets, check
                showtimes, and access exclusive deals on the go!
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6">
              <img
                src={qrSrc}
                alt="Download the CinesTECH App QR Code"
                className="w-48 h-48 rounded-2xl shadow-2xl border-2 border-white/10 object-cover transform-gpu transition-transform duration-500 hover:scale-105"
              />
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 px-5 py-3 bg-black/50 border border-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/10 transition-all shadow-lg transform hover:-translate-y-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-6"
                  />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 px-5 py-3 bg-black/50 border border-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/10 transition-all shadow-lg transform hover:-translate-y-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-6"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAppBanner





