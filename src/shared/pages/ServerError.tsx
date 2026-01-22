import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui'

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Server error</h2>
        <p className="text-gray-600 mb-8">
          An error occurred on the server. Please try again later.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="default">Back to home</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    </div>
  )
}

