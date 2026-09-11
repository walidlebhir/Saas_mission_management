import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '../../services/auth/auth.service.js'
import { Bell, ChevronDown, LogOut, Menu, MessageSquare, Search } from 'lucide-react'
import { getPageTitle } from './sidebarLinks.jsx'

function UtilityIconButton({ label, children }) {
  return (
    <button
      aria-label={label}
      className="relative rounded-lg p-2 text-[#7F8798] transition-colors duration-150 hover:bg-[#F5F6F9] hover:text-[#3F4656]"
    >
      {children}
    </button>
  )
}

export default function Navbar({ setSidebarOpen, onLogout }) {

  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuthStore()


  return (

    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-[#EEF0F4] bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-[#7F8798] transition-colors hover:bg-[#F5F6F9] hover:text-[#3F4656] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>



        <div className="hidden h-9 w-56 items-center gap-2 rounded-[10px] bg-[#F4F5F8] px-3 sm:flex">
          <Search className="h-4 w-5 shrink-0 text-[#8F96A6]" />
          <input
            placeholder="Search"
            className="w-full bg-transparent text-[13px] text-[#202638] outline-none placeholder:text-[#9AA1B2]"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <UtilityIconButton label="Notifications">
          <Bell className="h-[17px] w-[17px]" strokeWidth={1.8} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#E86A6A]" />
        </UtilityIconButton>

        <UtilityIconButton label="Messages">
          <MessageSquare className="h-[17px] w-[17px]" strokeWidth={1.8} />
        </UtilityIconButton>

        <div className="mx-1 hidden h-6 w-px bg-[#EEF0F4] sm:block" />

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-[#F5F6F9]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5B5CE2] text-[12px] font-semibold text-white">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <ChevronDown className="hidden h-4 w-4 text-[#9AA1B0] md:block" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-[#EEF0F4] bg-white py-2 shadow-[0_16px_40px_-12px_rgba(23,32,51,0.18)]">
                <div className="border-b border-[#EEF0F4] px-4 py-2.5">
                  <p className="text-sm font-semibold text-[#202638]">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-[#747C8E]">{user?.email}</p>
                  <span className="mt-1.5 inline-block rounded-full bg-[#F0F1FC] px-2 py-0.5 text-[11px] font-medium capitalize text-[#5B5CE2]">
                    {user?.role?.replace('_', ' ')}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[#E86A6A] transition-colors hover:bg-[#FEF2F2]"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.8} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}