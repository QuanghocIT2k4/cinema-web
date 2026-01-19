import { type ReactNode } from 'react'
import Header from './Header'
import Footer from '@/shared/components/Footer'

/**
 * LayoutProps: Props cho Layout component
 */
interface LayoutProps {
  children: ReactNode      // Nội dung chính của trang
}

/**
 * Layout Component
 * Layout chính của app với Header và Footer
 * 
 * Logic:
 * - Luôn hiển thị Header
 * - Footer ở cuối trang
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#1A1F2E] flex flex-col">
      {/* Header - Luôn hiển thị */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

