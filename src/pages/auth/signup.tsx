import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Eye,
  EyeOff,
  Github,
  Chrome,
  Building2,
  Check,
  X,
  ArrowRight,
  Shield,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { signupSchema, type SignupFormData, getPasswordChecks, getPasswordStrength } from '@/lib/validations/auth'
import { signupWithEmail, loginWithSSO, type SSOProvider } from '@/lib/auth'

function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<SSOProvider | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      acceptTos: false as unknown as true,
    },
    mode: 'onTouched',
  })

  const password = watch('password')
  const acceptTos = watch('acceptTos')

  const passwordChecks = useMemo(() => getPasswordChecks(password || ''), [password])
  const passwordStrength = useMemo(() => getPasswordStrength(password || ''), [password])

  const strengthLabel = useMemo(() => {
    if (!password) return ''
    if (passwordStrength <= 1) return 'Weak'
    if (passwordStrength === 2) return 'Fair'
    if (passwordStrength === 3) return 'Good'
    return 'Strong'
  }, [password, passwordStrength])

  const strengthColor = useMemo(() => {
    if (passwordStrength <= 1) return 'text-destructive'
    if (passwordStrength === 2) return 'text-warning'
    if (passwordStrength === 3) return 'text-primary'
    return 'text-success'
  }, [passwordStrength])

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      await signupWithEmail(data)
      toast.success('Account created! Check your email for verification.')
      navigate('/auth/verify-email')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed')
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
      <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start automating with LifeOps in minutes
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
          <Label htmlFor="name" className="mb-1.5 block">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

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
          <Label htmlFor="password" className="mb-1.5 block">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="pr-10"
              error={touchedFields.password ? errors.password?.message : undefined}
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

          {password && (
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex flex-1 gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-all duration-300',
                        i <= passwordStrength
                          ? passwordStrength <= 1
                            ? 'bg-destructive'
                            : passwordStrength === 2
                              ? 'bg-warning'
                              : passwordStrength === 3
                                ? 'bg-primary'
                                : 'bg-success'
                          : 'bg-muted'
                      )}
                    />
                  ))}
                </div>
                <span className={cn('text-xs font-medium', strengthColor)}>
                  {strengthLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-1.5">
                    {check.met ? (
                      <Check className="h-3 w-3 shrink-0 text-success" />
                    ) : (
                      <X className="h-3 w-3 shrink-0 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        'text-xs transition-colors',
                        check.met ? 'text-success' : 'text-muted-foreground'
                      )}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox
            id="acceptTos"
            checked={acceptTos as boolean}
            onCheckedChange={(checked) => setValue('acceptTos', checked === true ? true : false as unknown as true, { shouldValidate: true })}
            className="mt-0.5"
          />
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="acceptTos" className="text-xs font-normal text-muted-foreground cursor-pointer leading-relaxed">
              I agree to the{' '}
              <Link to="/legal/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/legal/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
            {errors.acceptTos && (
              <p className="text-xs text-destructive">{errors.acceptTos.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" variant="gradient" className="w-full group" isLoading={isLoading}>
          Create Account
          {!isLoading && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </Button>
      </form>

      <div className="mt-6 rounded-lg border border-border/50 bg-secondary/30 p-3">
        <div className="flex items-start gap-2.5">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <div>
            <p className="text-xs font-medium text-foreground">Your data is secure</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              All connections are encrypted. We never share your data with third parties.{' '}
              <Link to="/legal/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border/50 bg-secondary/30 p-3">
        <div className="flex items-start gap-2.5">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-medium text-foreground">Enterprise SSO</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              SAML single sign-on available for teams and organizations.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className={cn(
            'font-medium text-primary hover:underline transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded'
          )}
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
