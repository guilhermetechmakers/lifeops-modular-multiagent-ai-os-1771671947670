import { Outlet, Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7300]/20 via-[#B16FFF]/10 to-[#3FC56B]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,115,0,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(177,111,255,0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">LifeOps</h1>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            Your AI-powered<br />
            <span className="text-gradient">operating system</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Automate projects, content, finances, and health through coordinated AI agents with full explainability and control.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            {[
              { value: '50K+', label: 'Automated runs' },
              { value: '99.9%', label: 'Uptime' },
              { value: '12', label: 'Agent types' },
              { value: '4', label: 'Core modules' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl glass p-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">LifeOps</span>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { AuthLayout }
