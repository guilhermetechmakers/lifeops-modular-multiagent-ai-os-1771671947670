import { useState } from 'react'
import {
  Clock,
  Plus,
  Search,
  Play,
  Pause,
  MoreVertical,
  Shield,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer,
  Bot,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { PageHeader } from '@/components/shared/page-header'
import { MetricCard } from '@/components/shared/metric-card'
import { cn } from '@/lib/utils'
import type { AutomationLevel } from '@/types'

interface CronJobItem {
  id: string
  name: string
  description: string
  schedule: string
  scheduleHuman: string
  module: string
  agent: string
  automationLevel: AutomationLevel
  status: 'active' | 'paused' | 'disabled'
  nextRun: string
  lastRun: string
  lastOutcome: 'success' | 'failure' | 'skipped'
  runsTotal: number
  successRate: number
  constraints: { maxActions: number; spendLimit?: number }
}

const mockCronjobs: CronJobItem[] = [
  {
    id: 'cron-001', name: 'Nightly PR Triage', description: 'Auto-triage and label open PRs based on content analysis',
    schedule: '0 2 * * *', scheduleHuman: 'Every day at 2:00 AM', module: 'Projects', agent: 'PR Triage Agent',
    automationLevel: 'approval-required', status: 'active', nextRun: 'Today, 2:00 AM', lastRun: '22h ago',
    lastOutcome: 'success', runsTotal: 342, successRate: 98.5, constraints: { maxActions: 20 },
  },
  {
    id: 'cron-002', name: 'Weekly Content Digest', description: 'Generate and schedule weekly content roundup',
    schedule: '0 9 * * 1', scheduleHuman: 'Every Monday at 9:00 AM', module: 'Content', agent: 'Content Strategist',
    automationLevel: 'suggest-only', status: 'active', nextRun: 'Mon, 9:00 AM', lastRun: '5d ago',
    lastOutcome: 'success', runsTotal: 48, successRate: 100, constraints: { maxActions: 5 },
  },
  {
    id: 'cron-003', name: 'Monthly Close', description: 'Reconcile accounts and generate month-end reports',
    schedule: '0 8 1 * *', scheduleHuman: 'First of month at 8:00 AM', module: 'Finance', agent: 'Monthly Close Agent',
    automationLevel: 'approval-required', status: 'paused', nextRun: 'Paused', lastRun: '28d ago',
    lastOutcome: 'success', runsTotal: 12, successRate: 100, constraints: { maxActions: 50, spendLimit: 0 },
  },
  {
    id: 'cron-004', name: 'Daily Training Sync', description: 'Sync training data and adjust weekly plan',
    schedule: '0 6 * * *', scheduleHuman: 'Every day at 6:00 AM', module: 'Health', agent: 'Training Planner',
    automationLevel: 'conditional-auto', status: 'active', nextRun: 'Tomorrow, 6:00 AM', lastRun: '18h ago',
    lastOutcome: 'success', runsTotal: 189, successRate: 96.8, constraints: { maxActions: 10 },
  },
  {
    id: 'cron-005', name: 'Anomaly Scan', description: 'Scan transactions for anomalies and flag suspicious activity',
    schedule: '*/30 * * * *', scheduleHuman: 'Every 30 minutes', module: 'Finance', agent: 'Anomaly Detector',
    automationLevel: 'bounded-autopilot', status: 'active', nextRun: 'In 14 min', lastRun: '16 min ago',
    lastOutcome: 'success', runsTotal: 8640, successRate: 99.9, constraints: { maxActions: 3 },
  },
  {
    id: 'cron-006', name: 'Release Notes Generator', description: 'Generate release notes from merged PRs',
    schedule: '0 10 * * 5', scheduleHuman: 'Every Friday at 10:00 AM', module: 'Projects', agent: 'Release Orchestrator',
    automationLevel: 'approval-required', status: 'active', nextRun: 'Fri, 10:00 AM', lastRun: '5d ago',
    lastOutcome: 'failure', runsTotal: 45, successRate: 93.3, constraints: { maxActions: 15 },
  },
]

const automationLevelConfig: Record<AutomationLevel, { label: string; color: string }> = {
  'suggest-only': { label: 'Suggest Only', color: 'bg-success/15 text-success' },
  'approval-required': { label: 'Approval Required', color: 'bg-accent/15 text-accent' },
  'conditional-auto': { label: 'Conditional Auto', color: 'bg-warning/15 text-warning' },
  'bounded-autopilot': { label: 'Bounded Autopilot', color: 'bg-primary/15 text-primary' },
}

const outcomeIcons: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-success" />,
  failure: <XCircle className="h-4 w-4 text-destructive" />,
  skipped: <AlertCircle className="h-4 w-4 text-warning" />,
}

function CronjobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = mockCronjobs.filter((job) => {
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cronjobs Manager"
        description="Schedule, monitor, and govern automated workflows"
        actions={
          <Button variant="gradient" size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Create Cronjob
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Active Cronjobs" value={5} icon={<Clock className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Runs Today" value={48} change={12} trend="up" icon={<Zap className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Success Rate" value="98.7%" change={0.3} trend="up" icon={<CheckCircle2 className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Pending Approvals" value={2} icon={<Shield className="h-5 w-5" />} accentColor="purple" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search cronjobs..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((job) => (
          <Card key={job.id} className="hover:border-primary/20 transition-all duration-200">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-foreground truncate">{job.name}</h3>
                    <StatusBadge status={job.status} />
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', automationLevelConfig[job.automationLevel].color)}>
                      {automationLevelConfig[job.automationLevel].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{job.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5" />
                      {job.scheduleHuman}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bot className="h-3.5 w-3.5" />
                      {job.agent}
                    </span>
                    <span className="flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      Max {job.constraints.maxActions} actions
                    </span>
                    <Badge variant="secondary" className="text-[10px]">{job.module}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:gap-8">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Next Run</p>
                    <p className="text-sm font-medium text-foreground">{job.nextRun}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Last Run</p>
                    <div className="flex items-center gap-1.5">
                      {outcomeIcons[job.lastOutcome]}
                      <span className="text-sm text-foreground">{job.lastRun}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Total Runs</p>
                    <p className="text-sm font-medium text-foreground">{job.runsTotal.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title={job.status === 'active' ? 'Pause' : 'Resume'}>
                      {job.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Settings">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CronjobsPage
