import { Link } from 'react-router-dom'
import {
  Bot,
  Clock,
  CheckSquare,
  Activity,
  AlertTriangle,
  ArrowRight,
  Play,
  Pause,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/shared/metric-card'
import { StatusBadge } from '@/components/shared/status-badge'
import { PageHeader } from '@/components/shared/page-header'
import { cn } from '@/lib/utils'

const runsData = [
  { date: 'Mon', runs: 42, success: 40 },
  { date: 'Tue', runs: 58, success: 55 },
  { date: 'Wed', runs: 35, success: 33 },
  { date: 'Thu', runs: 67, success: 64 },
  { date: 'Fri', runs: 52, success: 50 },
  { date: 'Sat', runs: 28, success: 27 },
  { date: 'Sun', runs: 31, success: 30 },
]

const moduleActivity = [
  { module: 'Projects', runs: 145 },
  { module: 'Content', runs: 89 },
  { module: 'Finance', runs: 67 },
  { module: 'Health', runs: 42 },
]

const activeRuns = [
  { id: 'run-001', agent: 'PR Triage Agent', module: 'projects' as const, status: 'running' as const, started: '2 min ago', actions: 3 },
  { id: 'run-002', agent: 'Content Scheduler', module: 'content' as const, status: 'pending-approval' as const, started: '15 min ago', actions: 1 },
  { id: 'run-003', agent: 'Anomaly Detector', module: 'finance' as const, status: 'completed' as const, started: '1h ago', actions: 5 },
  { id: 'run-004', agent: 'Training Planner', module: 'health' as const, status: 'running' as const, started: '5 min ago', actions: 2 },
]

const alerts = [
  { id: '1', message: 'Connector "GitHub" health degraded', severity: 'warning' as const, time: '10m ago' },
  { id: '2', message: 'Cronjob "Monthly Close" missed schedule', severity: 'critical' as const, time: '1h ago' },
  { id: '3', message: 'Agent "PR Triage" exceeded action limit', severity: 'warning' as const, time: '2h ago' },
]

const auditEntries: Array<{ id: string; action: string; actor: string; module: string; time: string; severity: 'info' | 'warning' | 'critical' }> = [
  { id: '1', action: 'Cronjob executed', actor: 'PR Triage Agent', module: 'projects', time: '2m ago', severity: 'info' },
  { id: '2', action: 'Approval granted', actor: 'John Doe', module: 'finance', time: '15m ago', severity: 'info' },
  { id: '3', action: 'Rollback triggered', actor: 'Content Agent', module: 'content', time: '1h ago', severity: 'warning' },
  { id: '4', action: 'Agent paused', actor: 'Admin', module: 'health', time: '2h ago', severity: 'info' },
]

const cronjobs = [
  { name: 'Nightly PR Triage', next: 'Today, 2:00 AM', status: 'active', module: 'Projects' },
  { name: 'Weekly Content Digest', next: 'Mon, 9:00 AM', status: 'active', module: 'Content' },
  { name: 'Monthly Close', next: 'Mar 1, 8:00 AM', status: 'paused', module: 'Finance' },
  { name: 'Daily Training Sync', next: 'Tomorrow, 6:00 AM', status: 'active', module: 'Health' },
]

function DashboardOverview() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Command Center"
        description="Monitor your AI agents, runs, and automation health"
        actions={
          <Button variant="gradient" size="sm">
            <Zap className="mr-1.5 h-4 w-4" />
            Quick Create
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Active Agents"
          value={12}
          change={8}
          changeLabel="vs last week"
          trend="up"
          icon={<Bot className="h-5 w-5" />}
          accentColor="orange"
        />
        <MetricCard
          label="Runs Today"
          value={67}
          change={12}
          changeLabel="vs yesterday"
          trend="up"
          icon={<Activity className="h-5 w-5" />}
          accentColor="green"
        />
        <MetricCard
          label="Pending Approvals"
          value={3}
          change={-2}
          changeLabel="vs yesterday"
          trend="down"
          icon={<CheckSquare className="h-5 w-5" />}
          accentColor="purple"
        />
        <MetricCard
          label="Success Rate"
          value="97.2%"
          change={1.5}
          changeLabel="vs last week"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          accentColor="green"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Runs Overview</CardTitle>
            <Badge variant="secondary">Last 7 days</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={runsData}>
                <defs>
                  <linearGradient id="runsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7300" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF7300" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3FC56B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3FC56B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E32" />
                <XAxis dataKey="date" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#232326',
                    border: '1px solid #37373C',
                    borderRadius: '8px',
                    color: '#E5E7EB',
                  }}
                />
                <Area type="monotone" dataKey="runs" stroke="#FF7300" fill="url(#runsGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="success" stroke="#3FC56B" fill="url(#successGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Module Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={moduleActivity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E32" horizontal={false} />
                <XAxis type="number" stroke="#A1A1AA" fontSize={12} />
                <YAxis dataKey="module" type="category" stroke="#A1A1AA" fontSize={12} width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#232326',
                    border: '1px solid #37373C',
                    borderRadius: '8px',
                    color: '#E5E7EB',
                  }}
                />
                <Bar dataKey="runs" fill="#FF7300" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Active Runs
            </CardTitle>
            <Link to="/dashboard/cronjobs">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeRuns.map((run) => (
                <Link
                  key={run.id}
                  to={`/dashboard/runs/${run.id}`}
                  className="flex items-center justify-between rounded-lg bg-secondary p-4 transition-all duration-200 hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-2 w-2 rounded-full',
                      run.status === 'running' && 'bg-primary animate-pulse',
                      run.status === 'completed' && 'bg-success',
                      run.status === 'pending-approval' && 'bg-warning',
                    )} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{run.agent}</p>
                      <p className="text-xs text-muted-foreground">{run.started} · {run.actions} actions</p>
                    </div>
                  </div>
                  <StatusBadge status={run.status} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Upcoming Cronjobs
            </CardTitle>
            <Link to="/dashboard/cronjobs">
              <Button variant="ghost" size="sm">
                Manage <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cronjobs.map((job) => (
                <div
                  key={job.name}
                  className="flex items-center justify-between rounded-lg bg-secondary p-4 transition-all duration-200 hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    {job.status === 'active' ? (
                      <Play className="h-4 w-4 text-success" />
                    ) : (
                      <Pause className="h-4 w-4 text-warning" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{job.name}</p>
                      <p className="text-xs text-muted-foreground">{job.module}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{job.next}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Alerts
            </CardTitle>
            <Badge variant="warning">{alerts.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg p-4 border-l-4',
                    alert.severity === 'critical' ? 'bg-destructive/5 border-l-destructive' : 'bg-warning/5 border-l-warning'
                  )}
                >
                  <AlertTriangle className={cn(
                    'h-4 w-4 mt-0.5 shrink-0',
                    alert.severity === 'critical' ? 'text-destructive' : 'text-warning'
                  )} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              Audit Log
            </CardTitle>
            <Link to="/dashboard/admin">
              <Button variant="ghost" size="sm">
                Full Log <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditEntries.map((entry) => (
                <div key={entry.id} className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                  <div className={cn(
                    'h-2 w-2 rounded-full shrink-0',
                    entry.severity === 'info' && 'bg-muted-foreground',
                    entry.severity === 'warning' && 'bg-warning',
                    entry.severity === 'critical' && 'bg-destructive',
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">{entry.actor} · {entry.module}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{entry.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardOverview
