import React, { useEffect, useState } from 'react'

const desktopImages = [
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
]

const mobileImages = [
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=750&q=80',
]

const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const slideImages = isMobile ? mobileImages : desktopImages

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slideImages.length])

  const goToSlide = (index: number) => setCurrentIndex(index)

  const bannerClass = isMobile
    ? 'relative w-full max-w-[400px] mx-auto aspect-[430/287] overflow-hidden rounded-xl shadow-2xl'
    : 'relative h-[560px] lg:h-[490px] overflow-hidden rounded-xl shadow-2xl'

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className={bannerClass}>
          {/* Carousel Images */}
          {slideImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/1600x560/1a2232/ffffff?text=Movie+Banner'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent rounded-xl" />
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
            {slideImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full border border-[#FE7E32] transition-all duration-200 focus:outline-none ${
                  index === currentIndex
                    ? 'bg-[#FE7E32] shadow-md scale-105'
                    : 'bg-white bg-opacity-60 hover:bg-[#FE7E32] hover:bg-opacity-80'
                } w-2.5 h-2.5 sm:w-3 sm:h-3`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner





