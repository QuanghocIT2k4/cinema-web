import { QueryClient } from '@tanstack/react-query'

// Tạo QueryClient với cấu hình caching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút - data được coi là "fresh" trong 5 phút
      gcTime: 1000 * 60 * 10, // 10 phút - cache data trong 10 phút (trước đây là cacheTime)
      retry: 1, // Chỉ retry 1 lần khi lỗi
      refetchOnWindowFocus: false, // Không refetch khi focus window
    },
  },
})

