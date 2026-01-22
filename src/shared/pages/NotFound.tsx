import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been deleted.
        </p>
        <Link to="/">
          <Button variant="default">Back to home</Button>
        </Link>
      </div>
    </div>
  )
}

