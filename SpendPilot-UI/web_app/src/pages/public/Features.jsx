import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  Radar,
  TrendingUp,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Organization Management',
    description:
      'Structure your organization the way you work. Create departments, define roles and control who has access to what.',
    points: ['Teams and departments', 'Granular role-based access', 'Flexible organization hierarchy'],
  },
  {
    icon: ClipboardList,
    title: 'Mission Creation and Planning',
    description:
      'Turn ideas into structured missions. Define objectives, deadlines, budgets and the resources needed to succeed.',
    points: ['Mission templates', 'Clear objectives and milestones', 'Budget and resource planning'],
  },
  {
    icon: Radar,
    title: 'Mission Tracking',
    description:
      'Follow every mission in real time. See status, blockers and progress the moment things change.',
    points: ['Live status updates', 'Blockers and risks management', 'Activity history on every mission'],
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Give every stakeholder a shared workspace where feedback, updates and decisions flow naturally.',
    points: ['Comments and mentions', 'Shared mission workspaces', 'Role-based responsibilities'],
  },
  {
    icon: TrendingUp,
    title: 'Progress Monitoring',
    description:
      'Measure the health of every mission with progress metrics your whole organization can trust.',
    points: ['Completion percentages', 'Milestone tracking', 'Status at a glance'],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description:
      'Understand what works. Turn mission data into clear analytics that shape better planning.',
    points: ['Mission performance reports', 'Team workload insights', 'Custom dashboards'],
  },
  {
    icon: Bell,
    title: 'Notifications',
    description:
      'Stay informed without watching everything. Smart notifications surface what needs your attention.',
    points: ['Real-time alerts', 'Mission status updates', 'Mentions and assignments'],
  },
]

function FeatureVisual({ icon: Icon, title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <p className="font-semibold text-slate-900">{title}</p>
        <span className="ml-auto h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
      </div>
      <div className="mt-5 space-y-4">
        {[
          { label: 'Progress', value: 82, width: 'w-[82%]' },
          { label: 'Milestones', value: 64, width: 'w-[64%]' },
          { label: 'Team activity', value: 45, width: 'w-[45%]' },
        ].map(({ label, value, width }) => (
          <div key={label}>
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full bg-blue-600 ${width}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {['On track', '24 members', '8 missions'].map((label) => (
          <div key={label} className="rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600">
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-80%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Features
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Everything You Need to Manage Missions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            A complete toolset for organizations and teams to plan, execute and track missions —
            all in one platform.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="grid items-center gap-12 lg:grid-cols-2"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {feature.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{feature.description}</p>
                <ul className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <FeatureVisual icon={feature.icon} title={feature.title} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}