import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook để scroll lên đầu trang khi route thay đổi
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

