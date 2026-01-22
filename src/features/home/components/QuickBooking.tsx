import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, CheckCircle2, ChevronDown, Clock, Film, MapPin, Sparkles } from 'lucide-react'
import { cinemasApi } from '@/shared/api/cinemas.api'
import { moviesApi } from '@/shared/api/movies.api'
import { showtimesApi } from '@/shared/api/showtimes.api'
import type { Cinema } from '@/shared/types/cinema.types'
import type { Movie, MovieStatus } from '@/shared/types/movie.types'
import type { Showtime } from '@/shared/types/showtime.types'

type QuickBookingState = {
  cinema: string
  movie: string
  date: string
  showtime: string
}

const QuickBooking: React.FC = () => {
  // UI-only: giữ state local để enable/disable, highlight như movie-ticket-web
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [form, setForm] = useState<QuickBookingState>({
    cinema: '',
    movie: '',
    date: '',
    showtime: '',
  })

  const completedSteps = useMemo(() => {
    return [form.cinema, form.movie, form.date, form.showtime].filter(Boolean).length
  }, [form])

  const isFormComplete = completedSteps === 4

  const cinemasQuery = useQuery({
    queryKey: ['cinemas'],
    queryFn: cinemasApi.list,
    staleTime: 5 * 60 * 1000,
  })
  const cinemaOptions: Cinema[] = useMemo(() => cinemasQuery.data || [], [cinemasQuery.data])

  const moviesQuery = useQuery({
    queryKey: ['movies', 'now-showing', { size: 100 }],
    queryFn: () => moviesApi.getMovies({ status: 'NOW_SHOWING' as MovieStatus, size: 100 }),
    staleTime: 5 * 60 * 1000,
  })
  const movieOptions: Movie[] = useMemo(() => moviesQuery.data?.content || [], [moviesQuery.data])

  const enableShowtimes = !!form.date && !!form.cinema && !!form.movie

  const showtimesQuery = useQuery({
    queryKey: ['showtimes', 'by-date', form.date],
    queryFn: () => showtimesApi.getByDate(form.date),
    enabled: enableShowtimes,
    staleTime: 60 * 1000,
  })

  const filteredShowtimes: Showtime[] = useMemo(() => {
    if (!showtimesQuery.data) return []
    return showtimesQuery.data.filter((s) => {
      const okCinema = form.cinema ? String(s.cinemaId) === form.cinema : true
      const okMovie = form.movie ? String(s.movieId) === form.movie : true
      return okCinema && okMovie
    })
  }, [showtimesQuery.data, form.cinema, form.movie])

  return (
    <div className="relative -mt-6 z-10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Background Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-blue-600/20 to-violet-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse" />

        {/* Main Card */}
        <div className="relative bg-[#242b3d] rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-xl overflow-hidden">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a855f7] via-[#648ddb] to-[#a855f7]" />

          {/* Floating Particles Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-[#fe7e32] rounded-full animate-ping opacity-20" />
            <div
              className="absolute top-20 right-20 w-2 h-2 bg-[#648ddb] rounded-full animate-ping opacity-20"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute bottom-20 left-1/4 w-2 h-2 bg-[#fe7e32] rounded-full animate-ping opacity-20"
              style={{ animationDelay: '2s' }}
            />
          </div>

          <div className="relative p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#648ddb] rounded-lg blur-md opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-[#a855f7] to-[#648ddb] p-2.5 rounded-lg">
                    <Film className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#648ddb] bg-clip-text text-transparent">
                    Quick Booking
                  </h3>
                  <p className="text-xs text-[#cccccc] mt-0.5">Select your preferred showtime</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a855f7]/10 to-[#648ddb]/10 rounded-full border border-[#a855f7]/20">
                <Sparkles className="w-4 h-4 text-[#a855f7]" />
                <span className="text-sm font-medium text-[#a855f7]">Member Exclusive</span>
              </div>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 mb-5">
              {/* Cinema */}
              <div
                className={`group relative transition-all duration-300 ${focusedField === 'cinema' ? 'scale-[1.02]' : ''}`}
                onFocus={() => setFocusedField('cinema')}
                onBlur={() => setFocusedField(null)}
              >
                <label className="flex items-center gap-2 text-xs font-medium text-[#cccccc] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#fe7e32]" />
                  <span>Cinema</span>
                  {form.cinema && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 animate-in fade-in" />}
                </label>
                <div className="relative">
                  <select
                    value={form.cinema}
                    onChange={(e) => setForm((s) => ({ ...s, cinema: e.target.value, movie: '', date: '', showtime: '' }))}
                    className="w-full px-3 py-2.5 bg-[#1a2232] border border-gray-700 rounded-lg text-white text-sm appearance-none cursor-pointer transition-all duration-300 hover:border-[#fe7e32]/50 focus:border-[#fe7e32] focus:ring-2 focus:ring-[#fe7e32]/20 focus:outline-none"
                  >
                    <option value="" className="bg-[#1a2232]">
                      Select cinema...
                    </option>
                    {cinemasQuery.isLoading && (
                      <option value="" className="bg-[#1a2232]">
                        Loading...
                      </option>
                    )}
                    {cinemasQuery.isError && (
                      <option value="" className="bg-[#1a2232]">
                        Failed to load cinemas
                      </option>
                    )}
                    {cinemaOptions.map((c) => (
                      <option key={c.id} value={String(c.id)} className="bg-[#1a2232]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none transition-transform duration-300 group-hover:text-[#fe7e32]" />
                  {form.cinema && <div className="absolute inset-0 border-2 border-[#fe7e32]/30 rounded-lg pointer-events-none animate-in fade-in" />}
                </div>
              </div>

              {/* Movie */}
              <div
                className={`group relative transition-all duration-300 ${focusedField === 'movie' ? 'scale-[1.02]' : ''} ${!form.cinema ? 'opacity-60' : ''}`}
                onFocus={() => setFocusedField('movie')}
                onBlur={() => setFocusedField(null)}
              >
                <label className="flex items-center gap-2 text-xs font-medium text-[#cccccc] mb-1.5">
                  <Film className="w-3.5 h-3.5 text-[#648ddb]" />
                  <span>Movie</span>
                  {form.movie && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 animate-in fade-in" />}
                </label>
                <div className="relative">
                  <select
                    value={form.movie}
                    onChange={(e) => setForm((s) => ({ ...s, movie: e.target.value, date: '', showtime: '' }))}
                    disabled={!form.cinema}
                    className="w-full px-3 py-2.5 bg-[#1a2232] border border-gray-700 rounded-lg text-white text-sm appearance-none cursor-pointer transition-all duration-300 hover:border-[#648ddb]/50 focus:border-[#648ddb] focus:ring-2 focus:ring-[#648ddb]/20 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
                  >
                    <option value="" className="bg-[#1a2232]">
                      Select movie...
                    </option>
                    {moviesQuery.isLoading && (
                      <option value="" className="bg-[#1a2232]">
                        Loading...
                      </option>
                    )}
                    {moviesQuery.isError && (
                      <option value="" className="bg-[#1a2232]">
                        Failed to load movies
                      </option>
                    )}
                    {movieOptions.map((m) => (
                      <option key={m.id} value={String(m.id)} className="bg-[#1a2232]">
                        {m.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none transition-transform duration-300 group-hover:text-[#648ddb]" />
                  {form.movie && <div className="absolute inset-0 border-2 border-[#648ddb]/30 rounded-lg pointer-events-none animate-in fade-in" />}
                </div>
              </div>

              {/* Date */}
              <div
                className={`group relative transition-all duration-300 ${focusedField === 'date' ? 'scale-[1.02]' : ''} ${!form.movie ? 'opacity-60' : ''}`}
                onFocus={() => setFocusedField('date')}
                onBlur={() => setFocusedField(null)}
              >
                <label className="flex items-center gap-2 text-xs font-medium text-[#cccccc] mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#fe7e32]" />
                  <span>Date</span>
                  {form.date && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 animate-in fade-in" />}
                </label>
                <div className="relative">
                  <select
                    value={form.date}
                    onChange={(e) => setForm((s) => ({ ...s, date: e.target.value, showtime: '' }))}
                    disabled={!form.movie}
                    className="w-full px-3 py-2.5 bg-[#1a2232] border border-gray-700 rounded-lg text-white text-sm appearance-none cursor-pointer transition-all duration-300 hover:border-[#fe7e32]/50 focus:border-[#fe7e32] focus:ring-2 focus:ring-[#fe7e32]/20 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
                  >
                    <option value="" className="bg-[#1a2232]">
                      Select date...
                    </option>
                    {/* Simple: 7 ngày tiếp theo */}
                    {Array.from({ length: 7 }).map((_, idx) => {
                      const d = new Date()
                      d.setDate(d.getDate() + idx)
                      const iso = d.toISOString().slice(0, 10)
                      const label = d.toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        day: '2-digit',
                        month: '2-digit',
                      })
                      return (
                        <option key={iso} value={iso} className="bg-[#1a2232]">
                          {label}
                        </option>
                      )
                    })}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none transition-transform duration-300 group-hover:text-[#fe7e32]" />
                  {form.date && <div className="absolute inset-0 border-2 border-[#fe7e32]/30 rounded-lg pointer-events-none animate-in fade-in" />}
                </div>
              </div>

              {/* Showtime */}
              <div
                className={`group relative transition-all duration-300 ${focusedField === 'showtime' ? 'scale-[1.02]' : ''} ${!form.date ? 'opacity-60' : ''}`}
                onFocus={() => setFocusedField('showtime')}
                onBlur={() => setFocusedField(null)}
              >
                <label className="flex items-center gap-2 text-xs font-medium text-[#cccccc] mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#648ddb]" />
                  <span>Showtime</span>
                  {form.showtime && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 animate-in fade-in" />}
                </label>
                <div className="relative">
                  <select
                    value={form.showtime}
                    onChange={(e) => setForm((s) => ({ ...s, showtime: e.target.value }))}
                    disabled={!enableShowtimes}
                    className="w-full px-3 py-2.5 bg-[#1a2232] border border-gray-700 rounded-lg text-white text-sm appearance-none cursor-pointer transition-all duration-300 hover:border-[#648ddb]/50 focus:border-[#648ddb] focus:ring-2 focus:ring-[#648ddb]/20 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
                  >
                    <option value="" className="bg-[#1a2232]">
                      Select showtime...
                    </option>
                    {showtimesQuery.isLoading && (
                      <option value="" className="bg-[#1a2232]">
                        Loading...
                      </option>
                    )}
                    {showtimesQuery.isError && (
                      <option value="" className="bg-[#1a2232]">
                        Failed to load showtimes
                      </option>
                    )}
                    {!showtimesQuery.isLoading &&
                      !showtimesQuery.isError &&
                      enableShowtimes &&
                      filteredShowtimes.length === 0 && (
                        <option value="" className="bg-[#1a2232]">
                          No showtimes found
                        </option>
                      )}
                    {filteredShowtimes.map((s) => (
                      <option key={s.id} value={String(s.id)} className="bg-[#1a2232]">
                        {new Date(s.startTime).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        - {s.cinemaName} - {s.roomNumber}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none transition-transform duration-300 group-hover:text-[#648ddb]" />
                  {form.showtime && <div className="absolute inset-0 border-2 border-[#648ddb]/30 rounded-lg pointer-events-none animate-in fade-in" />}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  disabled={!isFormComplete}
                  className={`relative w-full py-2.5 px-4 rounded-lg font-bold text-sm overflow-hidden transition-all duration-300 ${
                    isFormComplete
                      ? 'bg-gradient-to-r from-[#a855f7] to-[#648ddb] text-white shadow-lg shadow-[#a855f7]/30 hover:shadow-xl hover:shadow-[#a855f7]/40 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (!form.showtime) return
                    // Điều hướng sang trang booking với showtimeId đã chọn
                    window.location.href = `/booking/${form.showtime}`
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Film className="w-4 h-4" />
                    <span>Book Now</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-4">
              <div className="h-1.5 bg-[#1a2232] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#a855f7] to-[#648ddb] transition-all duration-500 ease-out"
                  style={{ width: `${(completedSteps / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickBooking





