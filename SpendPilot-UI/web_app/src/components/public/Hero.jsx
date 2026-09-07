import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Sparkles, Users } from 'lucide-react'

const activities = [
  { label: 'Research phase', value: 'Completed', bar: 'w-4/5 bg-blue-500' },
  { label: 'Field deployment', value: 'On track', bar: 'w-3/5 bg-cyan-400' },
  { label: 'Data collection', value: 'Pending', bar: 'w-1/5 bg-slate-500' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-40 pt-28 text-white sm:pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[-25%] h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Sparkles className="h-4 w-4" />
              Mission Management Platform
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Plan. Execute.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Track Every Mission.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-300">
              Manage your organization's missions from planning to completion in one powerful
              collaborative platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-colors hover:bg-blue-500"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Explore Features
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-600/40 to-cyan-500/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm font-semibold text-white">Mission overview</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.label}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-slate-300">{activity.label}</span>
                        <span
                          className={
                            activity.value === 'Pending'
                              ? 'text-slate-400'
                              : 'text-blue-400'
                          }
                        >
                          {activity.value}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full rounded-full ${activity.bar}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                    <Users className="h-5 w-5" />
                  </span>
                  <p className="text-2xl font-bold text-white">128</p>
                  <p className="text-xs text-slate-400">Team members</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="text-2xl font-bold text-white">36</p>
                  <p className="text-xs text-slate-400">Missions completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}