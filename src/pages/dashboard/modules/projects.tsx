import {
  FolderKanban,
  GitPullRequest,
  GitBranch,
  Rocket,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Bot,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/shared/metric-card'
import { PageHeader } from '@/components/shared/page-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const tickets = [
  { id: 'PROJ-142', title: 'Implement user auth flow', status: 'in-progress', priority: 'high', assignee: 'PR Triage Agent', labels: ['feature', 'auth'] },
  { id: 'PROJ-141', title: 'Fix dashboard layout on mobile', status: 'in-progress', priority: 'medium', assignee: 'John D.', labels: ['bug', 'ui'] },
  { id: 'PROJ-140', title: 'Add API rate limiting', status: 'todo', priority: 'high', assignee: 'Unassigned', labels: ['feature', 'api'] },
  { id: 'PROJ-139', title: 'Update dependencies', status: 'todo', priority: 'low', assignee: 'Bot', labels: ['chore'] },
  { id: 'PROJ-138', title: 'Write integration tests', status: 'done', priority: 'medium', assignee: 'Jane S.', labels: ['test'] },
  { id: 'PROJ-137', title: 'Optimize database queries', status: 'done', priority: 'high', assignee: 'Anomaly Agent', labels: ['performance'] },
]

const pullRequests = [
  { id: '#234', title: 'feat: add user authentication', author: 'PR Triage Agent', status: 'open', reviews: 2, checks: 'passing', created: '2h ago' },
  { id: '#233', title: 'fix: mobile layout issues', author: 'john-doe', status: 'open', reviews: 1, checks: 'passing', created: '5h ago' },
  { id: '#232', title: 'chore: update deps', author: 'dependabot', status: 'merged', reviews: 1, checks: 'passing', created: '1d ago' },
]

const roadmapItems = [
  { quarter: 'Q1 2026', items: ['User Auth', 'API v2', 'Mobile App'], progress: 75 },
  { quarter: 'Q2 2026', items: ['Marketplace', 'SDK v2', 'Analytics'], progress: 20 },
  { quarter: 'Q3 2026', items: ['Enterprise SSO', 'On-prem', 'AI v3'], progress: 0 },
]

const statusColumns = ['todo', 'in-progress', 'done'] as const
const statusLabels: Record<string, string> = { 'todo': 'To Do', 'in-progress': 'In Progress', 'done': 'Done' }
const statusIcons: Record<string, React.ReactNode> = {
  'todo': <Circle className="h-4 w-4 text-muted-foreground" />,
  'in-progress': <Clock className="h-4 w-4 text-primary" />,
  'done': <CheckCircle2 className="h-4 w-4 text-success" />,
}

const priorityColors: Record<string, string> = {
  high: 'bg-destructive/15 text-destructive',
  medium: 'bg-warning/15 text-warning',
  low: 'bg-muted text-muted-foreground',
}

function ProjectsModule() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Developer-centric automation for roadmaps, tickets, and CI/CD"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <GitBranch className="mr-1.5 h-4 w-4" />
              Integrations
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Open Tickets" value={24} change={-3} trend="down" icon={<FolderKanban className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Open PRs" value={8} change={2} trend="up" icon={<GitPullRequest className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Deploys This Week" value={12} change={25} trend="up" icon={<Rocket className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Agent Actions" value={156} change={18} trend="up" icon={<Bot className="h-5 w-5" />} accentColor="orange" />
      </div>

      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Kanban Board</TabsTrigger>
          <TabsTrigger value="prs">Pull Requests</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          <div className="grid gap-4 lg:grid-cols-3">
            {statusColumns.map((status) => {
              const columnTickets = tickets.filter((t) => t.status === status)
              return (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      {statusIcons[status]}
                      <h3 className="text-sm font-semibold text-foreground">{statusLabels[status]}</h3>
                      <span className="text-xs text-muted-foreground">{columnTickets.length}</span>
                    </div>
                    <button className="rounded p-1 text-muted-foreground hover:bg-muted">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {columnTickets.map((ticket) => (
                      <Card key={ticket.id} className="group hover:border-primary/20 transition-all duration-200 cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                            <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-medium', priorityColors[ticket.priority])}>
                              {ticket.priority}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-3">{ticket.title}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {ticket.labels.map((label) => (
                              <Badge key={label} variant="secondary" className="text-[10px]">{label}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{ticket.assignee}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="prs">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {pullRequests.map((pr) => (
                  <div key={pr.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <GitPullRequest className={cn('h-5 w-5', pr.status === 'merged' ? 'text-accent' : 'text-success')} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{pr.title}</span>
                          <span className="text-xs text-muted-foreground">{pr.id}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">by {pr.author} · {pr.created}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={pr.status === 'merged' ? 'accent' : 'success'}>{pr.status}</Badge>
                      <span className="text-xs text-muted-foreground">{pr.reviews} reviews</span>
                      <Badge variant="success" className="text-[10px]">{pr.checks}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <div className="space-y-4">
            {roadmapItems.map((item) => (
              <Card key={item.quarter}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{item.quarter}</h3>
                    <span className="text-sm font-medium text-primary">{item.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted mb-4">
                    <div className="h-full rounded-full bg-gradient-primary transition-all duration-500" style={{ width: `${item.progress}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.items.map((name) => (
                      <Badge key={name} variant="secondary">{name}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectsModule
