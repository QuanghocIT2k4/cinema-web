/**
 * JWT Utilities
 * Xử lý token: lưu, lấy, xóa token từ localStorage
 */

const TOKEN_KEY = 'token'

/**
 * Lưu token vào localStorage
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Lấy token từ localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Xóa token khỏi localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Decode JWT token (không verify signature)
 * JWT có format: header.payload.signature
 * Chúng ta chỉ cần decode payload để lấy thông tin
 */
export const decodeToken = (token: string): any | null => {
  try {
    // JWT có 3 phần ngăn cách bởi dấu chấm: header.payload.signature
    const base64Url = token.split('.')[1] // Lấy phần payload (phần giữa)
    
    // Base64URL decode: thay - thành +, _ thành /
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    
    // Decode base64 thành string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    
    // Parse JSON string thành object
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Kiểm tra token có hết hạn chưa
 * JWT có field `exp` (expiration time) - Unix timestamp (giây)
 * So sánh exp với thời gian hiện tại
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token)
    
    // Nếu không decode được hoặc không có field exp → coi như hết hạn
    if (!decoded || !decoded.exp) {
      return true
    }
    
    // Lấy thời gian hiện tại (Unix timestamp - giây)
    const currentTime = Math.floor(Date.now() / 1000)
    
    // So sánh: nếu exp < currentTime → token đã hết hạn
    return decoded.exp < currentTime
  } catch {
    // Nếu có lỗi → coi như hết hạn
    return true
  }
}

/**
 * Kiểm tra token có hợp lệ không (tồn tại và chưa hết hạn)
 */
export const isValidToken = (): boolean => {
  const token = getToken()
  if (!token) return false // Không có token → không hợp lệ
  return !isTokenExpired(token) // Kiểm tra chưa hết hạn
}

