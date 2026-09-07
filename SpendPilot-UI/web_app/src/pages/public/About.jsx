import { Compass, Eye, Flag, Target, Users } from 'lucide-react'

const values = [
  {
    icon: Flag,
    title: 'Our Mission',
    description:
      'Give every organization a clear, collaborative and reliable way to plan, run and close its missions — no matter the team size or complexity.',
  },
  {
    icon: Compass,
    title: 'Why We Built It',
    description:
      'Missions were scattered across spreadsheets, chats and emails. Managers lost visibility, teams lost focus and results were hard to measure. SpendPilot was built to fix that.',
  },
  {
    icon: Target,
    title: 'The Problem We Solve',
    description:
      'Organizations struggle to keep track of their missions: unclear ownership, scattered information and no single source of truth. We centralize everything in one place.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'A world where every mission — large or small — is planned clearly, executed collaboratively and completed with confidence. Empowering teams to achieve every mission.',
  },
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-80%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            About us
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Empowering Teams to Achieve Every Mission
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            SpendPilot is a mission management platform that gives organizations clarity, control
            and collaboration from planning to completion.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Users className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built for Teams, Designed for Results
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We believe great missions start with great organization. Our platform brings
              structure to the chaos of mission management, so teams can focus on what matters —
              getting the job done.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}