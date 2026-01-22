import axios from 'axios'
import { removeToken } from '../utils/jwt'

function normalizeBaseUrl(url: string) {
  // Support common mis-configs like: http://localhost:8080/api
  // Our API endpoints already include `/api/...`, so baseURL must be host:port only.
  return url.replace(/\/+$/, '').replace(/\/api$/i, '')
}

function resolveBaseUrl() {
  // Development: use relative `/api/...` and rely on Vite proxy.
  if (import.meta.env.DEV) return ''

  // Production: use VITE_API_BASE_URL from environment variable (set on Vercel)
  const envUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) || ''
  const normalized = normalizeBaseUrl(envUrl)
  
  // Fallback: nếu không có env var, dùng localhost (chỉ để dev, production sẽ fail nếu không set)
  if (!normalized && import.meta.env.PROD) {
    console.warn('⚠️ VITE_API_BASE_URL is not set! API calls will fail in production.')
  }
  
  return normalized || (import.meta.env.PROD ? '' : 'http://localhost:8080')
}

// Tạo axios instance với cấu hình mặc định
export const apiClient = axios.create({
  // NOTE:
  // - Backend endpoints đã có prefix `/api/...` trong `API_ENDPOINTS`
  // - Vì vậy baseURL chỉ nên là host:port (KHÔNG kèm `/api`) để tránh `/api/api/...`
  baseURL: resolveBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    // Defensive: prevent accidental `/api/api/...` when baseURL or url contains `/api`
    const base = (config.baseURL || '').replace(/\/+$/, '')
    if (typeof config.url === 'string') {
      // If baseURL already ends with /api and url starts with /api → strip one /api
      if (/\/api$/i.test(base) && config.url.startsWith('/api/')) {
        config.url = config.url.replace(/^\/api/, '')
      }
      // If url already has /api/api → collapse to /api
      config.url = config.url.replace(/^\/api\/api\//, '/api/')
    }

    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Xử lý lỗi 401 (Unauthorized) - token hết hạn hoặc không hợp lệ
    if (error.response?.status === 401) {
      // Xóa token khỏi localStorage
      removeToken()
      
      // Auto logout: Redirect về login page
      // Chỉ redirect khi không đang ở trang login/register (tránh loop)
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

