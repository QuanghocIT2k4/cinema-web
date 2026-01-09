import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import TestComponents from './pages/TestComponents'
import TestMovieTicketComponents from './pages/TestMovieTicketComponents'
import NotFound from './shared/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Cinema Booking System
              </h1>
              <p className="text-gray-600">
                React + TypeScript + Vite + Tailwind CSS
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Setup hoàn tất! Sẵn sàng bắt đầu code.
              </p>
              <div className="mt-6 space-y-3">
                <div>
                  <Link 
                    to="/test-movie-ticket" 
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🎬 Xem Movie Ticket Web Style (Dark Theme)
                  </Link>
                </div>
                <div>
                  <Link 
                    to="/test-components" 
                    className="text-blue-600 hover:text-blue-700 underline text-sm"
                  >
                    Test Components (Basic) →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/test-components" element={<TestComponents />} />
        <Route path="/test-movie-ticket" element={<TestMovieTicketComponents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
