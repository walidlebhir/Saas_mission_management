import {
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ClipboardList,
  Radar,
  TrendingUp,
  Users,
} from 'lucide-react'

import Hero from '../../components/public/Hero.jsx'
import FeatureCard from '../../components/public/FeatureCard.jsx'
import MissionBenefits from '../../components/public/MissionBenefits.jsx'
import HowItWorksSection from '../../components/public/HowItWorksSection.jsx'
import CTASection from '../../components/public/CTASection.jsx'

const quickFeatures = [
  {
    icon: Building2,
    title: 'Organization Management',
    description: 'Manage organizations, teams and permissions.',
    highlighted: true,
  },
  {
    icon: ClipboardList,
    title: 'Mission Planning',
    description: 'Plan missions with clear objectives and budgets.',
  },
  {
    icon: Radar,
    title: 'Progress Tracking',
    description: 'Track mission progress at every step.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Bring teams together around every mission.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Insights',
    description: 'Get actionable insights in real time.',
  },
]

const mainFeatures = [
  {
    icon: ClipboardList,
    title: 'Mission Planning',
    description:
      'Break missions into timelines, milestones and resources your team can follow with confidence.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Share updates, files and feedback with everyone involved in a mission, all in one place.',
  },
  {
    icon: Radar,
    title: 'Progress Monitoring',
    description:
      'Follow mission status and team workload with live views that never go stale.',
  },
  {
    icon: Building2,
    title: 'Organization Management',
    description:
      'Structure your organization, departments and access controls in just a few clicks.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description:
      'Measure performance, spot bottlenecks and continuously improve how missions run.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description:
      'Keep everyone in the loop with smart, real-time mission updates and alerts.',
  },
]

const checklist = [
  'Create missions with goals, owners and deadlines.',
  'Assign teams and resources to every mission.',
  'Follow progress from kickoff to completion.',
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative z-10 mx-auto -mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {quickFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <MissionBenefits />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Mission management
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything Your Team Needs to Manage Missions
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Organizations and teams use SpendPilot to create, organize, assign and track
                missions from a single centralized platform — no spreadsheets, no scattered tools.
              </p>
              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-200/60 to-cyan-100 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <p className="font-semibold text-slate-900">Mission dashboard</p>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    78% complete
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Active', value: '8' },
                    { label: 'Team', value: '24' },
                    { label: 'On track', value: '92%' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: 'Mission progress', width: 'w-4/5' },
                    { label: 'Budget usage', width: 'w-3/5' },
                    { label: 'Team capacity', width: 'w-2/5' },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                        <span>{row.label}</span>
                        <span>{row.width === 'w-4/5' ? '80%' : row.width === 'w-3/5' ? '60%' : '40%'}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className={`h-full rounded-full bg-blue-600 ${row.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Main features
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built for High-Performing Teams
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to run missions smoothly and deliver results.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />

      <CTASection />
    </>
  )
}