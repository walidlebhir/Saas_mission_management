import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-navy-950">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div
          className="pointer-events-none absolute left-1/2 top-[-120%] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Manage Your Missions Better?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Start organizing your missions, teams and progress from one centralized platform.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-colors hover:bg-blue-500"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}