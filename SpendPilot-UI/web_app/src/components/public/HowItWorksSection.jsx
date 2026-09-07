import { Building2, ClipboardList, Share2, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Building2,
    step: '01',
    title: 'Create Your Organization',
    description:
      'Set up your organization, invite your team and define roles and permissions in minutes.',
  },
  {
    icon: ClipboardList,
    step: '02',
    title: 'Create and Plan Missions',
    description:
      'Define mission objectives, timelines, resources and budgets with full clarity.',
  },
  {
    icon: Share2,
    step: '03',
    title: 'Assign Missions to Your Team',
    description:
      'Assign the right people to each mission and keep responsibilities transparent.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Track Progress and Results',
    description:
      'Follow progress live, gather insights and deliver measurable results for your organization.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Simple workflow
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Four steps between a blank slate and a completed mission.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-7 hidden lg:block" aria-hidden="true">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </div>
          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="relative text-center lg:px-2">
                <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-4 mb-1 block text-sm font-bold text-blue-600">{step}</span>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}