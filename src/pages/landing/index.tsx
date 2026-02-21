import { Link } from 'react-router-dom'
import {
  Zap,
  Bot,
  FolderKanban,
  FileText,
  DollarSign,
  Heart,
  Clock,
  CheckSquare,
  Shield,
  ArrowRight,
  Play,
  Star,
  ChevronRight,
  RotateCcw,
  Eye,
  Lock,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <LandingNav />
      <HeroSection />
      <FeaturesOverview />
      <CronjobsSnapshot />
      <UseCases />
      <PricingTeaser />
      <Footer />
    </div>
  )
}

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">LifeOps</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#automation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Automation</a>
          <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Use Cases</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link to="/dashboard/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/auth/signup">
            <Button variant="gradient" size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#FF7300]/8 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#B16FFF]/8 blur-[120px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] rounded-full bg-[#3FC56B]/6 blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <Badge variant="outline" className="mb-6 animate-fade-in-up">
          <Zap className="mr-1.5 h-3 w-3 text-primary" />
          Powered by GPT-5 Multi-Agent Orchestration
        </Badge>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Your AI-Powered{' '}
          <span className="text-gradient">Operating System</span>{' '}
          for Life
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Automate projects, content, finances, and health through coordinated AI agents.
          Every action is explainable, permissioned, and reversible.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/auth/signup">
            <Button variant="gradient" size="xl" className="min-w-[200px]">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="min-w-[200px]">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card/50 p-2 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl bg-secondary/80 p-4 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <FolderKanban className="h-6 w-6" />, label: 'Projects', color: 'text-primary' },
                  { icon: <FileText className="h-6 w-6" />, label: 'Content', color: 'text-accent' },
                  { icon: <DollarSign className="h-6 w-6" />, label: 'Finance', color: 'text-success' },
                  { icon: <Heart className="h-6 w-6" />, label: 'Health', color: 'text-[#FF6B8A]' },
                ].map((mod) => (
                  <div key={mod.label} className="flex flex-col items-center gap-3 rounded-xl bg-card/60 p-6 border border-border/50 transition-all duration-200 hover:border-primary/30 hover:shadow-glow">
                    <div className={cn('rounded-lg bg-muted p-3', mod.color)}>{mod.icon}</div>
                    <span className="text-sm font-medium text-foreground">{mod.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesOverview() {
  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: 'Multi-Agent Orchestration',
      description: 'Domain-specific agents communicate through an ordered message bus, negotiating and reaching consensus with full traceability.',
      color: 'from-[#FF7300] to-[#FF9A3E]',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'First-Class Cronjobs',
      description: 'Scheduled autonomy as first-class objects with automation levels, safety rails, constraints, and full run artifacts.',
      color: 'from-[#B16FFF] to-[#D4A5FF]',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Full Explainability',
      description: 'Every action stores rationale, diffs, and schema-validated outputs. Understand exactly why each decision was made.',
      color: 'from-[#3FC56B] to-[#6FE89A]',
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: 'Reversible Actions',
      description: 'Automated reversal scripts, diff engines, and dry-run rollbacks. Undo anything with confidence.',
      color: 'from-[#FF7300] to-[#B16FFF]',
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      title: 'Human-in-the-Loop',
      description: 'Approval queues with SLA timers, diff views, threaded comments, and granular automation levels.',
      color: 'from-[#3FC56B] to-[#B16FFF]',
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'RBAC, immutable audit logs, secrets vault, encryption, and tamper-evident entries for compliance.',
      color: 'from-[#FF7300] to-[#3FC56B]',
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold sm:text-4xl text-foreground">
            Everything you need for{' '}
            <span className="text-gradient">autonomous operations</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete platform for safe, auditable, and configurable AI automation across every domain of your work and life.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={cn('mb-4 inline-flex rounded-xl bg-gradient-to-br p-3 text-white', feature.color)}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CronjobsSnapshot() {
  const automationLevels = [
    { level: 'Suggest Only', description: 'Agent proposes actions, you decide', color: 'bg-[#3FC56B]' },
    { level: 'Approval Required', description: 'Agent queues actions for your review', color: 'bg-[#B16FFF]' },
    { level: 'Conditional Auto', description: 'Auto-execute within defined constraints', color: 'bg-[#FF7300]' },
    { level: 'Bounded Autopilot', description: 'Full autonomy with safety rails', color: 'bg-primary' },
  ]

  return (
    <section id="automation" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF7300]/3 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="default" className="mb-4">Cronjobs & Approvals</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl text-foreground mb-6">
              Scheduled autonomy,{' '}
              <span className="text-gradient">your rules</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cronjobs are first-class objects with rich constraints, safety rails, and progressive automation levels. Start cautious, scale confidence.
            </p>
            <div className="space-y-4">
              {automationLevels.map((item) => (
                <div key={item.level} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30">
                  <div className={cn('h-3 w-3 rounded-full shrink-0', item.color)} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.level}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-foreground">Active Cronjobs</h3>
              <Badge variant="success">3 Running</Badge>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Nightly PR Triage', schedule: '0 2 * * *', module: 'Projects', status: 'active', next: '2h 14m' },
                { name: 'Weekly Content Digest', schedule: '0 9 * * 1', module: 'Content', status: 'active', next: '3d 6h' },
                { name: 'Monthly Close', schedule: '0 8 1 * *', module: 'Finance', status: 'paused', next: 'Paused' },
              ].map((job) => (
                <div key={job.name} className="flex items-center justify-between rounded-lg bg-secondary p-4 transition-all duration-200 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <div className={cn('h-2 w-2 rounded-full', job.status === 'active' ? 'bg-success' : 'bg-warning')} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{job.name}</p>
                      <p className="text-xs text-muted-foreground">{job.module} · {job.schedule}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{job.next}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const cases = [
    {
      icon: <FolderKanban className="h-5 w-5" />,
      title: 'Engineering Teams',
      description: 'Auto-triage PRs, orchestrate releases, and manage roadmaps with AI agents that understand your codebase.',
      tags: ['PR Triage', 'CI/CD', 'Release Notes'],
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Content Teams',
      description: 'Generate outlines, schedule publishing, and track performance with agents that learn your brand voice.',
      tags: ['Content Calendar', 'SEO', 'Analytics'],
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: 'Finance Managers',
      description: 'Automate bookkeeping, detect anomalies, and streamline month-end close with traceable financial agents.',
      tags: ['Auto-Categorize', 'Forecasting', 'Audit'],
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Health & Coaches',
      description: 'Generate training plans, track habits, and balance recovery with agents synced to your fitness data.',
      tags: ['Training Plans', 'Nutrition', 'Recovery'],
    },
  ]

  return (
    <section id="use-cases" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">Use Cases</Badge>
          <h2 className="text-3xl font-bold sm:text-4xl text-foreground">
            Built for <span className="text-gradient">every domain</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {cases.map((item) => (
            <div key={item.title} className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-muted p-2.5 text-primary">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingTeaser() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'For individuals getting started',
      features: ['1 Module', '3 Agents', '100 Runs/month', 'Suggest-only automation', 'Community support'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For power users and small teams',
      features: ['All 4 Modules', 'Unlimited Agents', '5,000 Runs/month', 'All automation levels', 'Priority support', 'Custom connectors'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations at scale',
      features: ['Everything in Pro', 'Unlimited runs', 'SAML SSO', 'On-prem runners', 'Dedicated support', 'SLA guarantees'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B16FFF]/3 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl font-bold sm:text-4xl text-foreground">
            Start free, <span className="text-gradient">scale confidently</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-2xl border p-8 transition-all duration-300',
                plan.highlighted
                  ? 'border-primary bg-card shadow-glow scale-[1.02]'
                  : 'border-border bg-card hover:border-primary/30'
              )}
            >
              {plan.highlighted && (
                <Badge variant="default" className="mb-4">Most Popular</Badge>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/auth/signup" className="block mt-8">
                <Button
                  variant={plan.highlighted ? 'gradient' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Docs', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Cookies', href: '/legal/cookies' },
    ],
    Connect: ['GitHub', 'Twitter', 'Discord', 'LinkedIn'],
  }

  return (
    <footer className="border-t border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">LifeOps</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The modular, multi-agent AI operating system for safe, auditable automation.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => {
                  const label = typeof item === 'string' ? item : item.label
                  const href = typeof item === 'string' ? '#' : item.href
                  return (
                    <li key={label}>
                      <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2026 LifeOps. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <Shield className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingPage
