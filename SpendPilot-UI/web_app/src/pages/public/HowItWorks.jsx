import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Rocket,
  TrendingUp,
  Users,
} from 'lucide-react'

const workflow = [
  { icon: Building2, title: 'Organization', description: 'Create your organization and invite your team.' },
  { icon: ClipboardList, title: 'Mission Creation', description: 'Define mission objectives, scope and deadlines.' },
  { icon: CalendarDays, title: 'Mission Planning', description: 'Build a plan with milestones, budgets and resources.' },
  { icon: Users, title: 'Team Assignment', description: 'Assign the right people to each mission.' },
  { icon: Rocket, title: 'Mission Execution', description: 'Your team works together toward the mission goals.' },
  { icon: TrendingUp, title: 'Progress Tracking', description: 'Monitor progress and performance in real time.' },
  { icon: CheckCircle2, title: 'Mission Completion', description: 'Close the mission, review results and celebrate.' },
]

export default function HowItWorks() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-80%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            How it works
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            From First Idea to Completed Mission
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Follow the full mission lifecycle — clearly defined, well-organized and easy to track.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ol className="relative space-y-10 before:absolute before:inset-y-2 before:left-7 before:w-px before:bg-blue-100">
            {workflow.map(({ icon: Icon, title, description }, index) => (
              <li key={title} className="relative flex gap-6">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </span>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                  <p className="mt-1.5 text-slate-600">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}