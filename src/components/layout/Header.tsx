import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/shared/constants/routes'

/**
 * Header Component
 * Header theo design Figma với:
 * - Main Header: Logo, Order Refreshment button, Search bar, Login button
 * - Navigation Menu: Phân biệt Admin/Customer (chỉ hiển thị khi đã đăng nhập)
 *   + Admin: Dashboard, Movies, Cinemas, Showtimes
 *   + Customer: Home, Movies, Profile
 * - Sub Header: Select Cinema dropdown, About link
 */
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCinema, setSelectedCinema] = useState('')

  // Helper function để check active link
  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-[#1A1F2E] sticky top-0 z-50 shadow-lg">
      {/* Main Header */}
      <div className="border-b border-gray-700/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 gap-4">
            {/* Logo + Order Refreshment (kề sát) */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link to={ROUTES.HOME} className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
              <div className="text-2xl font-bold">
                <span className="text-white">Cines</span>
                <span className="text-[#FE7E32]">TECH</span>
              </div>
              </Link>

              <Link
                to="/refreshments"
                className="flex items-center space-x-2 px-5 py-2.5 bg-[#648DDB] text-white rounded-lg hover:bg-[#648DDB]/90 transition-colors whitespace-nowrap font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Order Refreshment</span>
              </Link>
            </div>

            {/* Search Bar giữa, co dãn */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-3xl">
                <input
                  type="text"
                  placeholder="Search for movies"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-11 pr-4 bg-[#262C3D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#648DDB] focus:border-transparent"
                />
                <svg
                  className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Login / User - kéo vào gần hơn */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#648DDB] flex items-center justify-center text-white font-semibold text-sm">
                      {user?.fullName?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-gray-300 text-sm hidden lg:block font-medium">
                      {user?.fullName || user?.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 text-sm text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  className="px-5 py-2.5 text-sm bg-[#FE7E32] text-white rounded-lg hover:bg-[#FE7E32]/90 transition-colors font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Phân biệt Admin/Customer */}
      {isAuthenticated && (
        <div className="bg-[#262C3D] border-b border-gray-700/50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 h-12">
              {user?.role === 'ADMIN' ? (
                // Admin Navigation Menu
                <>
                  <Link
                    to={ROUTES.ADMIN.DASHBOARD}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.ADMIN.DASHBOARD)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to={ROUTES.ADMIN.MOVIES}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.ADMIN.MOVIES)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <span>Movies</span>
                  </Link>
                  <Link
                    to={ROUTES.ADMIN.CINEMAS}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.ADMIN.CINEMAS)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Cinemas</span>
                  </Link>
                  <Link
                    to={ROUTES.ADMIN.SHOWTIMES}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.ADMIN.SHOWTIMES)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Showtimes</span>
                  </Link>
                </>
              ) : (
                // Customer Navigation Menu
                <>
                  <Link
                    to={ROUTES.HOME}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.HOME)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                  </Link>
                  <Link
                    to={ROUTES.MOVIES}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.MOVIES)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <span>Movies</span>
                  </Link>
                  <Link
                    to={ROUTES.PROFILE}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                      isActive(ROUTES.PROFILE)
                        ? 'text-white bg-[#648DDB]'
                        : 'text-gray-300 hover:text-white hover:bg-[#1A1F2E]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Sub Header */}
      <div className="bg-[#1A1F2E] border-b border-gray-700/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Select Cinema - Bên trái */}
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <label className="text-gray-300 text-sm font-medium">Select Cinema</label>
              <select
                value={selectedCinema}
                onChange={(e) => setSelectedCinema(e.target.value)}
                className="px-4 py-2 bg-[#262C3D] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#648DDB] focus:border-transparent cursor-pointer"
              >
                <option value="">Select cinema</option>
                <option value="cinema1">Cinema 1</option>
                <option value="cinema2">Cinema 2</option>
                <option value="cinema3">Cinema 3</option>
              </select>
            </div>

            {/* About Link - Bên phải */}
            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-300 hover:text-white text-sm transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

