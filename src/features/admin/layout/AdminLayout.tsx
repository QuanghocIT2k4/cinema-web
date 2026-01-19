import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="flex">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-300">Admin User</span>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('user')
                                        window.location.href = '/login'
                                    }}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
