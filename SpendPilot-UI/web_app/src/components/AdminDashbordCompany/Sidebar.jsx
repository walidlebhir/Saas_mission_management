import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../services/auth/auth.service.js'
import { LogOut, Settings, X } from 'lucide-react'
import { navSections } from './sidebarLinks.jsx'

function Logo({ onClose }) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between gap-2.5 border-b border-[#EEF0F4] px-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5B5CE2] text-[13px] font-bold text-white shadow-[0_4px_10px_-2px_rgba(91,92,226,0.4)]">
          SP
        </div>
        <span className="text-[14px] font-semibold tracking-tight text-[#202638]">
          SpendPilot
        </span>
      </div>
      <button
        onClick={onClose}
        className="rounded-lg p-2 text-[#7F8798] hover:bg-[#F6F7FA] lg:hidden"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, onLogout }) {
  const location = useLocation()
  const { user } = useAuthStore()

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#172033]/30 backdrop-blur-[1px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:border-r lg:border-[#EEF0F4] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Logo onClose={() => setSidebarOpen(false)} />

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9BA1AF]">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-[#F0F1FC] text-[#5B5CE2]'
                          : 'text-[#747C8E] hover:bg-[#F6F7FA] hover:text-[#3F4656]'
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 transition-colors duration-150 ${
                          isActive
                            ? 'text-[#5B5CE2]'
                            : 'text-[#858D9D] group-hover:text-[#5B5CE2]'
                        }`}
                        strokeWidth={1.8}
                      />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#EEF0F4] p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5B5CE2] text-xs font-semibold text-white">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#303748]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-[10px] capitalize text-[#9AA1B0]">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-[#7F8798] transition-colors duration-150 hover:bg-[#F6F7FA] hover:text-[#3F4656]">
              <Settings className="h-4 w-4" strokeWidth={1.8} />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-[#7F8798] transition-colors duration-150 hover:bg-[#FEF2F2] hover:text-[#E86A6A]"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.8} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}