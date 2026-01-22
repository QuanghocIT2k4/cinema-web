import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Film,
    Building2,
    DoorOpen,
    Calendar,
    Ticket,
    Users
} from 'lucide-react'
import { ROUTES } from '../../../shared/constants/routes'

const AdminSidebar = () => {
    const menuItems = [
        {
            name: 'Dashboard',
            path: ROUTES.ADMIN.DASHBOARD,
            icon: LayoutDashboard
        },
        {
            name: 'Movies',
            path: ROUTES.ADMIN.MOVIES,
            icon: Film
        },
        {
            name: 'Cinemas',
            path: ROUTES.ADMIN.CINEMAS,
            icon: Building2
        },
        {
            name: 'Rooms',
            path: '/admin/rooms',
            icon: DoorOpen
        },
        {
            name: 'Showtimes',
            path: ROUTES.ADMIN.SHOWTIMES,
            icon: Calendar
        },
        {
            name: 'Bookings',
            path: '/admin/bookings',
            icon: Ticket
        },
        {
            name: 'Users',
            path: ROUTES.ADMIN.USERS,
            icon: Users
        }
    ]

    return (
        <aside className="w-64 bg-gray-800 min-h-screen border-r border-gray-700">
            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Cinema Admin</h2>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}

export default AdminSidebar
