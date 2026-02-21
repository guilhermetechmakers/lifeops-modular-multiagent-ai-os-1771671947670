import { Link } from 'react-router-dom'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <span className="text-6xl font-bold text-foreground">500</span>

        <h1 className="text-2xl font-bold text-foreground mt-4 mb-3">Server Error</h1>
        <p className="text-muted-foreground mb-8">
          Something went wrong on our end. Our agents are investigating the issue.
          Please try again in a few moments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="gradient" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link to="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          If this persists, contact{' '}
          <a href="mailto:support@lifeops.ai" className="text-primary hover:underline">
            support@lifeops.ai
          </a>
        </p>
      </div>
    </div>
  )
}

export default ServerErrorPage
