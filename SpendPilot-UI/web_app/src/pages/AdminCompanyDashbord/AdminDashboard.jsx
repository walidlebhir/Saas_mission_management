import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  MoreHorizontal,
  Users,
} from 'lucide-react'

const statCards = [
  {
    label: 'Active Missions',
    value: '128',
    trend: '+12.5%',
    up: true,
    icon: Briefcase,
    iconBg: 'bg-indigo-50 text-indigo-500',
  },
  {
    label: 'Completed Missions',
    value: '342',
    trend: '+8.2%',
    up: true,
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50 text-emerald-500',
  },
  {
    label: 'Pending Missions',
    value: '27',
    trend: '-4.3%',
    up: false,
    icon: Clock,
    iconBg: 'bg-amber-50 text-amber-500',
  },
  {
    label: 'Team Members',
    value: '54',
    trend: '+6.1%',
    up: true,
    icon: Users,
    iconBg: 'bg-violet-50 text-violet-500',
  },
]

const budgetBreakdown = [
  { label: 'Active Missions', value: '68%', color: 'bg-indigo-500' },
  { label: 'Completed Missions', value: '32%', color: 'bg-sky-400' },
]

const weeklyActivity = [
  { day: 'Mon', current: 42, previous: 30 },
  { day: 'Tue', current: 64, previous: 46 },
  { day: 'Wed', current: 48, previous: 38 },
  { day: 'Thu', current: 76, previous: 52 },
  { day: 'Fri', current: 58, previous: 44 },
  { day: 'Sat', current: 34, previous: 24 },
  { day: 'Sun', current: 22, previous: 16 },
]

const missionProgress = [
  { label: 'Active', value: 72, color: 'bg-indigo-500' },
  { label: 'Completed', value: 84, color: 'bg-emerald-500' },
  { label: 'Pending', value: 28, color: 'bg-amber-500' },
]

function MetricTrend({ trend, up }) {
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        up ? 'text-emerald-500' : 'text-rose-500'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {trend}
    </span>
  )
}

function DonutChart() {
  const total = 48
  const active = Math.round((total * 68) / 100)
  const completed = total - active
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const activeLen = (active / total) * circumference
  const completedLen = (completed / total) * circumference

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-44 w-44 -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#EEF1F7"
          strokeWidth="12"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#6366F1"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${activeLen} ${circumference}`}
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${completedLen} ${circumference}`}
          strokeDashoffset={-activeLen}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-slate-900">{total}</span>
        <span className="text-[11px] font-medium text-slate-400">Missions</span>
      </div>
    </div>
  )
}

function ActivityBarChart() {
  const max = 100

  return (
    <div>
      <div className="flex items-end justify-between gap-3 h-44">
        {weeklyActivity.map((item) => (
          <div
            key={item.day}
            className="group flex w-full flex-col items-center gap-2"
          >
            <div className="flex h-36 w-full max-w-6 items-end justify-center gap-1">
              <div
                className="w-2 rounded-full bg-sky-300/70"
                style={{ height: `${(item.previous / max) * 100}%` }}
              />
              <div
                className="w-2 rounded-full bg-indigo-500 transition-colors group-hover:bg-indigo-400"
                style={{ height: `${(item.current / max) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-400">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-6 border-t border-slate-100 pt-4">
        <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          Current week
        </span>
        <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
          Previous week
        </span>
        <span className="ml-auto hidden text-xs text-slate-400 sm:block">
          Weekly starts / finishes
        </span>
      </div>
    </div>
  )
}

function SectionCard({ title, subtitle, right, children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-[#E9ECF2] bg-white p-5 shadow-[0_1px_2px_rgba(23,32,51,0.04),0_8px_24px_-12px_rgba(23,32,51,0.08)] sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#202638]">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[#8A91A3]">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-[22px] font-bold text-[#172033]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#8A91A3]">
          Overview of your missions and activity
        </p>
      </div>
      <button className="inline-flex items-center gap-2 rounded-xl border border-[#E9ECF2] bg-white px-4 py-2.5 text-sm font-medium text-[#202638] shadow-[0_1px_2px_rgba(23,32,51,0.04)] transition-colors hover:bg-slate-50">
        <CalendarDays className="h-4 w-4 text-[#8A91A3]" />
        Last 30 days
        <ChevronDown className="h-4 w-4 text-[#8A91A3]" />
      </button>
    </div>
  )
}

function PrimarySummaryCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E9ECF2] bg-white p-6 shadow-[0_1px_2px_rgba(23,32,51,0.04),0_8px_24px_-12px_rgba(23,32,51,0.08)] sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-200/70 to-violet-200/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 right-32 h-56 w-56 rounded-full bg-gradient-to-tr from-sky-200/60 to-indigo-200/40 blur-2xl" />
      <div className="pointer-events-none absolute right-8 top-8 h-20 w-20 rounded-2xl bg-indigo-100/60 rotate-12" />
      <div className="pointer-events-none absolute -top-6 right-40 h-14 w-28 rounded-full bg-sky-100/50 blur-md" />

      <div className="relative">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
            Mission Summary
          </span>
          <p className="text-sm text-[#8A91A3]">
            Key indicators across all of your missions
          </p>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-l-2 border-indigo-400 pl-4">
            <p className="text-xs font-medium text-[#8A91A3]">Total Missions</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-[#172033]">
                48
              </span>
              <MetricTrend trend="+12.4%" up />
            </div>
          </div>
          <div className="border-l-2 border-sky-400 pl-4">
            <p className="text-xs font-medium text-[#8A91A3]">Active Missions</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-[#172033]">
                12
              </span>
              <MetricTrend trend="+8.3%" up />
            </div>
          </div>
          <div className="border-l-2 border-emerald-400 pl-4">
            <p className="text-xs font-medium text-[#8A91A3]">Completed</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-[#172033]">
                29
              </span>
              <MetricTrend trend="+18.0%" up />
            </div>
          </div>
          <div className="border-l-2 border-amber-400 pl-4">
            <p className="text-xs font-medium text-[#8A91A3]">Pending</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-[#172033]">
                7
              </span>
              <MetricTrend trend="-4.2%" up={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-[#E9ECF2] bg-white p-5 shadow-[0_1px_2px_rgba(23,32,51,0.04),0_8px_24px_-12px_rgba(23,32,51,0.08)]"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-[#8A91A3]">{card.label}</span>
            <span className={`rounded-xl p-2 ${card.iconBg}`}>
              <card.icon className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[26px] font-bold leading-none text-[#172033]">
              {card.value}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <MetricTrend trend={card.trend} up={card.up} />
            <span className="text-[11px] text-[#8A91A3]">from last week</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function AnalyticsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionCard
          title="Mission Overview"
          subtitle="Distribution by current status"
          className="h-full"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <DonutChart />
            <div className="w-full space-y-3">
              {budgetBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-slate-50/80 px-4 py-3"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs font-medium text-[#202638]">
                    {item.label}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-[#202638]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="lg:col-span-7">
        <SectionCard
          title="Mission Activity"
          subtitle="Missions started and finished per day"
          right={
            <button className="rounded-lg p-1.5 text-[#8A91A3] transition-colors hover:bg-slate-100">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          }
          className="h-full"
        >
          <ActivityBarChart />
        </SectionCard>
      </div>
    </div>
  )
}

function MissionOverviewCard() {
  return (
    <SectionCard
      title="Mission Overview"
      subtitle="Progress across all mission states"
      right={
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-500">
          This quarter
        </span>
      }
    >
      <div className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
        {missionProgress.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#202638]">{item.label}</span>
              <span className="font-semibold text-[#172033]">{item.value}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-[#8A91A3]">
              {item.value >= 60 ? 'On track' : item.value >= 30 ? 'In progress' : 'Needs attention'}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-4">
      <DashboardHeader />
      <PrimarySummaryCard />
      <StatCards />
      <AnalyticsSection />
      <MissionOverviewCard />
    </div>
  )
}