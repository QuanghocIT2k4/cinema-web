import { User, Lock } from 'lucide-react'

interface ProfileSidebarProps {
  activeTab: 'profile' | 'password'
  onTabChange: (tab: 'profile' | 'password') => void
}

export default function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'password' as const, label: 'Change password', icon: Lock },
  ]

  return (
    <div className="w-full md:w-64 bg-[#111827] border border-white/10 rounded-2xl p-4 space-y-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-[#fe7e32] text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

