import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, KeyRound, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

function ResetPasswordPage() {
  const [step, setStep] = useState<'request' | 'sent'>('request')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    toast.success('Reset link sent!')
    setStep('sent')
  }

  if (step === 'sent') {
    return (
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
          <Check className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a password reset link to <strong className="text-foreground">{email}</strong>
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          The link will expire in 1 hour. If you don&apos;t see the email, check your spam folder.
        </p>
        <Link to="/auth/login" className="block mt-8">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <KeyRound className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-foreground text-center">Reset your password</h2>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        Enter your email and we&apos;ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="gradient" className="w-full" isLoading={isLoading}>
          Send Reset Link
        </Button>
      </form>

      <Link
        to="/auth/login"
        className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>
    </div>
  )
}

export default ResetPasswordPage
