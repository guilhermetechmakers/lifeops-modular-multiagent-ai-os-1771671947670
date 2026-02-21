import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Github, Chrome, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTos, setAcceptedTos] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const passwordChecks = useMemo(() => [
    { label: 'At least 8 characters', met: form.password.length >= 8 },
    { label: 'Contains uppercase', met: /[A-Z]/.test(form.password) },
    { label: 'Contains number', met: /\d/.test(form.password) },
    { label: 'Contains special character', met: /[!@#$%^&*]/.test(form.password) },
  ], [form.password])

  const passwordStrength = passwordChecks.filter((c) => c.met).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTos) {
      toast.error('Please accept the Terms of Service')
      return
    }
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    toast.success('Account created! Check your email.')
    navigate('/auth/verify-email')
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start automating with LifeOps in minutes
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {form.password && (
            <div className="mt-3 space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors',
                      i <= passwordStrength
                        ? passwordStrength <= 2 ? 'bg-destructive' : passwordStrength === 3 ? 'bg-warning' : 'bg-success'
                        : 'bg-muted'
                    )}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-1.5">
                    {check.met ? (
                      <Check className="h-3 w-3 text-success" />
                    ) : (
                      <X className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className={cn('text-xs', check.met ? 'text-success' : 'text-muted-foreground')}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTos}
            onChange={(e) => setAcceptedTos(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border bg-input text-primary focus:ring-primary"
          />
          <span className="text-xs text-muted-foreground">
            I agree to the{' '}
            <Link to="/legal/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <Button type="submit" variant="gradient" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
