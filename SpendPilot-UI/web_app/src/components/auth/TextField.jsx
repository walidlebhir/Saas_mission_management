export default function TextField({
  label,
  error,
  right,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          className={[
            'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400',
            right && 'pr-11',
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
            className,
          ].join(' ')}
          {...props}
        />
        {right && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">{right}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}