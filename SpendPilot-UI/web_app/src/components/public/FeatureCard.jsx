export default function FeatureCard({ icon: Icon, title, description, highlighted = false }) {
  return (
    <div
      className={[
        'group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1',
        highlighted
          ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/30'
          : 'border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-200 hover:shadow-xl',
      ].join(' ')}
    >
      <span
        className={[
          'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300',
          highlighted
            ? 'bg-white/15 text-white'
            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        ].join(' ')}
      >
        <Icon className="h-6 w-6" />
      </span>
      <h3
        className={[
          'mb-2 text-base font-semibold',
          highlighted ? 'text-white' : 'text-slate-900',
        ].join(' ')}
      >
        {title}
      </h3>
      <p
        className={[
          'text-sm leading-relaxed',
          highlighted ? 'text-blue-50' : 'text-slate-600',
        ].join(' ')}
      >
        {description}
      </p>
    </div>
  )
}