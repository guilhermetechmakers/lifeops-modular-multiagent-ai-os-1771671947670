import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Github, Chrome, Shield, ArrowRight, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { loginWithEmail, loginWithSSO, type SSOProvider } from '@/lib/auth'

function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<SSOProvider | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const rememberMe = watch('rememberMe')

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await loginWithEmail(data)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSSO = async (provider: SSOProvider) => {
    setSsoLoading(provider)
    try {
      await loginWithSSO(provider)
    } catch {
      toast.error(`Failed to connect with ${provider}`)
      setSsoLoading(null)
    }
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your LifeOps account to continue
      </p>

      <div className="mt-8 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full group"
            onClick={() => handleSSO('google')}
            disabled={!!ssoLoading}
            isLoading={ssoLoading === 'google'}
          >
            <Chrome className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full group"
            onClick={() => handleSSO('github')}
            disabled={!!ssoLoading}
            isLoading={ssoLoading === 'github'}
          >
            <Github className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            GitHub
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full group"
          onClick={() => handleSSO('microsoft')}
          disabled={!!ssoLoading}
          isLoading={ssoLoading === 'microsoft'}
        >
          <Building2 className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          Microsoft
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-1.5 block">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/reset-password"
              className="text-xs text-primary hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="pr-10"
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setValue('rememberMe', checked === true)}
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal text-muted-foreground cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" variant="gradient" className="w-full group" isLoading={isLoading}>
          Sign In
          {!isLoading && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </Button>
      </form>

      <div className="mt-6 rounded-lg border border-border/50 bg-secondary/30 p-3">
        <div className="flex items-start gap-2.5">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-medium text-foreground">Enterprise SSO available</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              SAML single sign-on is available for enterprise plans.{' '}
              <Link to="/legal/terms" className="text-primary hover:underline">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          to="/auth/signup"
          className={cn(
            'font-medium text-primary hover:underline transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded'
          )}
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
