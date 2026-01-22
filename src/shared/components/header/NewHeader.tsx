import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Info, LogOut, MapPin, Popcorn, User, Ticket } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/shared/constants/routes'
import GlobalSearch from './GlobalSearch'
import { cinemasApi } from '@/shared/api/cinemas.api'
import type { Cinema } from '@/shared/types/cinema.types'

type CinemaOption = Pick<Cinema, 'id' | 'name' | 'address'>

const NewHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCinemaMenuOpen, setIsCinemaMenuOpen] = useState(false)
  const [selectedCinema, setSelectedCinema] = useState<CinemaOption | null>(null)
  const cinemaMenuTimeoutRef = useRef<number | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const cinemasQuery = useQuery({
    queryKey: ['cinemas'],
    queryFn: cinemasApi.list,
    staleTime: 5 * 60 * 1000,
  })

  const cinemaOptions: CinemaOption[] = useMemo(() => cinemasQuery.data || [], [cinemasQuery.data])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setIsUserMenuOpen(false)
    setIsCinemaMenuOpen(false)
  }, [location.pathname])

  const handleCinemaMenuEnter = () => {
    if (cinemaMenuTimeoutRef.current) window.clearTimeout(cinemaMenuTimeoutRef.current)
    setIsCinemaMenuOpen(true)
  }

  const handleCinemaMenuLeave = () => {
    cinemaMenuTimeoutRef.current = window.setTimeout(() => setIsCinemaMenuOpen(false), 200)
  }

  const initials = (user?.fullName || user?.username || 'U').trim().charAt(0).toUpperCase()

  return (
    <header className="bg-[#1a2232] shadow-lg sticky top-0 z-50 border-b border-white/10">
      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo & CTAs */}
          <div className="flex items-center gap-6">
            <Link to={ROUTES.HOME} className="text-2xl font-bold text-white">
              Cine<span className="text-[#fe7e32]">STECH</span>
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/refreshments"
                className="flex items-center gap-2 px-4 py-2 bg-[#242b3d] border border-gray-700 rounded-full text-sm text-white hover:bg-[#fe7e32] hover:border-[#fe7e32] transition-colors"
              >
                <Popcorn className="w-4 h-4 text-[#fe7e32]" />
                <span>Order Refreshment</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Search & Auth */}
          <div className="flex items-center gap-4">
            <GlobalSearch />

            {/* Auth Section */}
            <div className="border-l border-gray-700 pl-4">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsUserMenuOpen((v) => !v)
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#648ddb] flex items-center justify-center text-white font-semibold text-sm">
                      {initials}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#242b3d] rounded-lg shadow-xl border border-white/10 py-2 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <p className="text-sm font-semibold text-white truncate">
                          {user?.fullName || user?.username}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                      </div>

                      <Link
                        to={ROUTES.PROFILE}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#1a2232] hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link
                        to={ROUTES.BOOKING_HISTORY}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#1a2232] hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Ticket className="w-4 h-4" /> Booking History
                      </Link>
                      {user?.role === 'ADMIN' && (
                        <Link
                          to={ROUTES.ADMIN.DASHBOARD}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#1a2232] hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#fe7e32] text-white text-[10px] font-bold">
                            A
                          </span>
                          Admin
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          logout()
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-[#1a2232] hover:text-red-500"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-700/50 rounded-full hover:bg-gray-600/50 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sub Header */}
      <div className="bg-[#242b3d] border-t border-b border-white/5">
        <div className="container-custom">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-8">
              <div
                onMouseEnter={handleCinemaMenuEnter}
                onMouseLeave={handleCinemaMenuLeave}
                className="relative h-full flex items-center"
              >
                <button type="button" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#648ddb]" />
                  <span>{selectedCinema ? selectedCinema.name : 'Select Cinema'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCinemaMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCinemaMenuOpen && (
                  <div className="absolute top-full mt-2 w-72 bg-[#242b3d] rounded-lg shadow-xl border border-white/10 py-2 animate-in fade-in zoom-in-95">
                    {cinemasQuery.isLoading && (
                      <div className="px-4 py-2 text-sm text-gray-400">Loading cinemas...</div>
                    )}
                    {cinemasQuery.isError && (
                      <div className="px-4 py-2 text-sm text-red-300">Failed to load cinema list.</div>
                    )}
                    {!cinemasQuery.isLoading && !cinemasQuery.isError && cinemaOptions.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-400">No cinemas available.</div>
                    )}
                    {cinemaOptions.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a2232] hover:text-white truncate"
                        onClick={() => {
                          setSelectedCinema(c)
                          setIsCinemaMenuOpen(false)
                        }}
                      >
                        {c.name} - <span className="text-xs text-gray-500">{c.address}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Link to={ROUTES.ABOUT} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Info className="w-4 h-4 text-[#648ddb]" />
                <span>About</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NewHeader




