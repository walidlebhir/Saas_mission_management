import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../services/auth/auth.service.js'
import TextField from './TextField.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm = { email: '', password: '', remember: false }

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

export default function LoginForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState(null)


  const { login, isLoading } = useAuthStore();

  const navigate = useNavigate()


  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setLoginError(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password) nextErrors.password = 'Password is required.'
    else if (form.password.length < 8)
      nextErrors.password = 'Password must be at least 8 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      const user = await login(form.email, form.password)
      toast.success('Bienvenue ! Connexion réussie.')
      const path = getDashboardPath(user.role)
      navigate(path, { replace: true })
    } catch {
      setLoginError('Username or password is incorrect.')
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to your SpendPilot account</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          right={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            Remember me
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Forgot password?
          </a>
        </div>

        {loginError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {loginError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Connexion en cours...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
          Create an account
        </Link>
      </p>
    </div>
  )
}