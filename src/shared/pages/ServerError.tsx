import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lỗi máy chủ</h2>
        <p className="text-gray-600 mb-8">
          Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="primary">Về trang chủ</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Tải lại trang
          </Button>
        </div>
      </div>
    </div>
  )
}

