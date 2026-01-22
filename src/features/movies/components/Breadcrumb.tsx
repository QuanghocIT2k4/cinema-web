import { ChevronRight, Home } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

interface BreadcrumbItem {
  label: string
  path?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}
    >
      <Link
        to={ROUTES.HOME}
        className="flex items-center text-gray-400 hover:text-[#fe7e32] transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={`${idx}-${item.label}`}>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          {item.path && !item.isActive ? (
            <Link
              to={item.path}
              className="text-gray-400 hover:text-[#fe7e32] transition-colors capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className={`capitalize ${item.isActive ? 'text-white font-semibold' : 'text-gray-400'}`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb


