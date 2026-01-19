import { Calendar, ChevronDown, ChevronUp, Filter, RotateCcw, Star } from 'lucide-react'
import React, { useState } from 'react'

export type MoviesFilterState = {
  genres: string[]
  year: string
  rating: string
  sortBy: 'releaseDate' | 'title' | 'rating'
  sortOrder: 'asc' | 'desc'
}

interface DropdownState {
  genres: boolean
  year: boolean
  rating: boolean
  sort: boolean
}

type Props = {
  filters: MoviesFilterState
  onFilterChange: (filters: MoviesFilterState) => void
}

const MoviesFilter: React.FC<Props> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<MoviesFilterState>(filters)
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    genres: false,
    year: false,
    rating: false,
    sort: false,
  })

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Animation',
    'Documentary',
  ]

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())
  const ratings = ['9+', '8+', '7+', '6+', '5+']

  const toggleDropdown = (filterType: keyof DropdownState) => {
    setDropdownState((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }))
  }

  const handleGenreToggle = (genre: string) => {
    const newGenres = localFilters.genres.includes(genre)
      ? localFilters.genres.filter((g) => g !== genre)
      : [...localFilters.genres, genre]

    const newFilters = { ...localFilters, genres: newGenres }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSelectChange = (
    field: keyof MoviesFilterState,
    value: string | MoviesFilterState['sortBy'] | MoviesFilterState['sortOrder']
  ) => {
    const newFilters = { ...localFilters, [field]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters: MoviesFilterState = {
      genres: [],
      year: '',
      rating: '',
      sortBy: 'releaseDate',
      sortOrder: 'desc',
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
    setDropdownState({
      genres: false,
      year: false,
      rating: false,
      sort: false,
    })
  }

  return (
    <div className="bg-[#242b3d] rounded-lg shadow-sm border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#fe7e32]" />
          <h3 className="font-semibold text-white">Filters</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-[#fe7e32] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => toggleDropdown('genres')}
          className="w-full flex items-center justify-between p-3 bg-[#1a2232] hover:bg-[#1a2232]/80 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#fe7e32]" />
            <span className="font-medium text-white">Genres</span>
            {localFilters.genres.length > 0 && (
              <span className="bg-[#fe7e32] text-white text-xs px-2 py-1 rounded-full">
                {localFilters.genres.length}
              </span>
            )}
          </div>
          {dropdownState.genres ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {dropdownState.genres && (
          <div className="mt-2 p-3 bg-[#1a2232] border border-white/10 rounded-lg">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {genres.map((genre) => (
                <label
                  key={genre}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-[#242b3d] p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.genres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                    className="rounded border-white/10 text-[#fe7e32] focus:ring-[#fe7e32] focus:ring-2 focus:ring-offset-2"
                  />
                  <span className="text-sm text-gray-300">{genre}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          onClick={() => toggleDropdown('year')}
          className="w-full flex items-center justify-between p-3 bg-[#1a2232] hover:bg-[#1a2232]/80 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#fe7e32]" />
            <span className="font-medium text-white">Release Year</span>
            {localFilters.year && (
              <span className="text-[#fe7e32] text-sm font-medium">{localFilters.year}</span>
            )}
          </div>
          {dropdownState.year ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {dropdownState.year && (
          <div className="mt-2 p-3 bg-[#1a2232] border border-white/10 rounded-lg">
            <select
              value={localFilters.year}
              onChange={(e) => handleSelectChange('year', e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fe7e32]"
            >
              <option value="">Any Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          onClick={() => toggleDropdown('rating')}
          className="w-full flex items-center justify-between p-3 bg-[#1a2232] hover:bg-[#1a2232]/80 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#fe7e32]" />
            <span className="font-medium text-white">Rating</span>
            {localFilters.rating && (
              <span className="text-[#fe7e32] text-sm font-medium">{localFilters.rating}+</span>
            )}
          </div>
          {dropdownState.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {dropdownState.rating && (
          <div className="mt-2 p-3 bg-[#1a2232] border border-white/10 rounded-lg">
            <select
              value={localFilters.rating}
              onChange={(e) => handleSelectChange('rating', e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fe7e32]"
            >
              <option value="">Any Rating</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating} & Above
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleDropdown('sort')}
          className="w-full flex items-center justify-between p-3 bg-[#1a2232] hover:bg-[#1a2232]/80 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#fe7e32]" />
            <span className="font-medium text-white">Sort By</span>
            <span className="text-[#fe7e32] text-sm font-medium">
              {localFilters.sortBy === 'releaseDate'
                ? 'Release Date'
                : localFilters.sortBy === 'title'
                  ? 'Movie Name'
                  : 'Rating'}
              ({localFilters.sortOrder === 'desc' ? '↓' : '↑'})
            </span>
          </div>
          {dropdownState.sort ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {dropdownState.sort && (
          <div className="mt-2 p-3 bg-[#1a2232] border border-white/10 rounded-lg">
            <div className="space-y-3">
              <select
                value={localFilters.sortBy}
                onChange={(e) =>
                  handleSelectChange('sortBy', e.target.value as MoviesFilterState['sortBy'])
                }
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fe7e32]"
              >
                <option value="releaseDate">Release Date</option>
                <option value="title">Movie Name</option>
                <option value="rating">Rating</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectChange('sortOrder', 'desc')}
                  className={`flex-1 p-2 text-sm rounded-md border transition-colors ${
                    localFilters.sortOrder === 'desc'
                      ? 'bg-[#fe7e32] text-white border-[#fe7e32]'
                      : 'bg-[#0f172a] text-gray-300 border-white/10 hover:bg-[#1a2232]'
                  }`}
                >
                  Descending
                </button>
                <button
                  onClick={() => handleSelectChange('sortOrder', 'asc')}
                  className={`flex-1 p-2 text-sm rounded-md border transition-colors ${
                    localFilters.sortOrder === 'asc'
                      ? 'bg-[#fe7e32] text-white border-[#fe7e32]'
                      : 'bg-[#0f172a] text-gray-300 border-white/10 hover:bg-[#1a2232]'
                  }`}
                >
                  Ascending
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MoviesFilter

