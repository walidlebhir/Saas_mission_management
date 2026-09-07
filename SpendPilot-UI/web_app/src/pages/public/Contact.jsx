import { useState } from 'react'
import { toast } from 'react-toastify'
import { Mail, MapPin, Send } from 'lucide-react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.subject.trim()) errors.subject = 'Subject is required.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

const fieldClass = (hasError) =>
  [
    'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400',
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
  ].join(' ')

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    toast.success('Thank you! Your message has been sent.')
    setForm(initialForm)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-80%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Contact
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let's Talk About Your Missions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Have a question about SpendPilot or want to see how it fits your organization?
            Send us a message — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Contact information
              </h2>
              <p className="text-slate-600">
                Reach out directly and our team will get back to you within one business day.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Email us</p>
                    <a href="mailto:hello@spendpilot.app" className="text-sm text-slate-600 hover:text-blue-600">
                      hello@spendpilot.app
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Visit us</p>
                    <p className="text-sm text-slate-600">Remote-first, working worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-3"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={fieldClass(errors.name)}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={fieldClass(errors.email)}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={fieldClass(errors.subject)}
                />
                {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your organization and missions..."
                  className={fieldClass(errors.message)}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}