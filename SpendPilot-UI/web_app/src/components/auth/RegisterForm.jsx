import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../services/auth/auth.service.js'
import TextField from './TextField.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function getDashboardPath(role) {
  switch (role) {
    case 'super_admin':
    case 'finance':
      return '/admin/dashboard'
    case 'approver':
      return '/admin/approvals'
    case 'employee':
      return '/employee/dashboard'
    default:
      return '/'
  }
}

export default function RegisterForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = 'Enter a valid email address.'

    if (!form.password) nextErrors.password = 'Password is required.'
    else if (form.password.length < 8)
      nextErrors.password = 'Password must be at least 8 characters.'

    if (!form.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = 'Passwords do not match.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      const user = await register(form.firstName, form.lastName, form.email, form.password)
      toast.success('Compte créé ! Bienvenue sur SpendPilot.')
      const path = getDashboardPath(user.role)
      navigate(path, { replace: true })
    } catch (err) {
      toast.error(err.message || "Erreur d'inscription")
    }
  }

  const passwordToggle = (show, toggle) => (
    <button
      type="button"
      onClick={toggle}
      className="text-slate-400 transition-colors hover:text-slate-600"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  )

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600">Start managing missions in minutes</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>

        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          right={passwordToggle(showPassword, () => setShowPassword((v) => !v))}
        />

        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirm ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          right={passwordToggle(showConfirm, () => setShowConfirm((v) => !v))}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Création en cours...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </div>
  )
}