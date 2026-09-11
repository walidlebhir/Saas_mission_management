import {
  LayoutDashboard,
  FolderKanban,
  Receipt,
  Users,
  Settings,
  Building2,
  BarChart3,
  Wallet,
} from 'lucide-react'

export const navSections = [
  {
    label: 'Main',
    items: [{ label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Missions',
    items: [
      { label: 'Missions', path: '/admin/missions', icon: FolderKanban },
      { label: 'Expenses', path: '/admin/expenses', icon: Receipt },
      { label: 'Budget', path: '/admin/budget', icon: Wallet },
      { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
    ],
  },
  {
    label: 'Organization',
    items: [
      { label: 'Organizations', path: '/admin/organizations', icon: Building2 },
      { label: 'Members', path: '/admin/users', icon: Users },
      { label: 'Settings', path: '/admin/settings', icon: Settings },
    ],
  },
]

export function getPageTitle(pathname) {
  for (const section of navSections) {
    const match = section.items.find((item) => item.path === pathname)
    if (match) return match.label
  }
  return 'Dashboard'
}