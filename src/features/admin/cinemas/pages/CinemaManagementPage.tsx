import { useQuery } from '@tanstack/react-query'
import { cinemasApi } from '@/shared/api/cinemas.api'

const CinemaManagementPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cinemas', 'admin'],
    queryFn: cinemasApi.list,
    staleTime: 5 * 60 * 1000,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Cinemas</h1>
        <span className="text-sm text-gray-400">Read-only (CRUD in progress)</span>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {isLoading && (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-red-300">
                    Failed to load cinema list
                  </td>
                </tr>
              )}
              {!isLoading && !isError && (data || []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-gray-400">
                    No cinemas found.
                  </td>
                </tr>
              )}
              {(data || []).map((c) => (
                <tr key={c.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-300">{c.address}</td>
                  <td className="px-4 py-3 text-gray-300">{c.phone || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{c.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CinemaManagementPage




