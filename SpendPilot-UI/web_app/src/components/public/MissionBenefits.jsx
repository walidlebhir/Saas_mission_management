import { BarChart3, FolderKanban, Radar, Users } from 'lucide-react'

const benefits = [
  {
    icon: FolderKanban,
    title: 'Centralized Mission Management',
    description:
      'Keep every mission in one organized workspace where teams and managers stay aligned from start to finish.',
  },
  {
    icon: Users,
    title: 'Better Team Collaboration',
    description:
      'Bring managers, team leads and members together around shared missions, updates and decisions.',
  },
  {
    icon: Radar,
    title: 'Real-Time Progress Tracking',
    description:
      'Monitor mission status and performance the moment things change, so nothing slips through the cracks.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description:
      'Turn mission data into clear analytics that help your organization plan better and act faster.',
  },
]

export default function MissionBenefits() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Why choose us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A single source of truth for your missions, your teams and your results.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}