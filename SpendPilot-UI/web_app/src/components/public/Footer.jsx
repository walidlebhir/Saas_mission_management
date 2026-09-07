import { Link } from 'react-router-dom'
import { AtSign, Globe, Link2, Mail, MessageCircle, Send, Target } from 'lucide-react'

const columns = [
  {
    heading: 'Platform',
    links: [
      { to: '/', label: 'Home' },
      { to: '/features', label: 'Features' },
      { to: '/how-it-works', label: 'How It Works' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { to: '/login', label: 'Login' },
      { to: '/register', label: 'Register' },
    ],
  },
]

const socials = [
  { icon: Globe, label: 'Website' },
  { icon: MessageCircle, label: 'Community' },
  { icon: AtSign, label: 'Mentions' },
  { icon: Link2, label: 'Link' },
  { icon: Send, label: 'Send' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Target className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-white">SpendPilot</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">
              The mission management platform that helps organizations plan, execute and track
              every mission.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-blue-500 hover:text-blue-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {column.heading}
              </h3>
              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-blue-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm">© 2026 SpendPilot. All rights reserved.</p>
          <a
            href="mailto:hello@spendpilot.app"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-blue-400"
          >
            <Mail className="h-4 w-4" />
            hello@spendpilot.app
          </a>
        </div>
      </div>
    </footer>
  )
}