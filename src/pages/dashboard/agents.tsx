import { useState, useEffect } from 'react'
import {
  Bot,
  Search,
  Plus,
  Copy,
  Archive,
  MessageSquare,
  Cpu,
  Plug,
  Brain,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/shared/status-badge'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { Agent, ModuleType } from '@/types'

const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'PR Triage Agent',
    type: 'system',
    module: 'projects',
    status: 'active',
    capabilities: ['Code Review', 'PR Labeling', 'Auto-merge'],
    memoryScope: 'project-level',
    connectors: ['GitHub', 'Slack'],
    lastActive: '2 min ago',
    runsTotal: 1247,
    successRate: 98.2,
  },
  {
    id: 'agent-002',
    name: 'Content Strategist',
    type: 'system',
    module: 'content',
    status: 'active',
    capabilities: ['Outline Generation', 'SEO Analysis', 'Publishing'],
    memoryScope: 'org-level',
    connectors: ['WordPress', 'Twitter'],
    lastActive: '15 min ago',
    runsTotal: 856,
    successRate: 96.7,
  },
  {
    id: 'agent-003',
    name: 'Anomaly Detector',
    type: 'system',
    module: 'finance',
    status: 'active',
    capabilities: ['Transaction Categorization', 'Anomaly Detection', 'Forecasting'],
    memoryScope: 'org-level',
    connectors: ['Plaid', 'QuickBooks'],
    lastActive: '1h ago',
    runsTotal: 432,
    successRate: 99.1,
  },
  {
    id: 'agent-004',
    name: 'Training Planner',
    type: 'user',
    module: 'health',
    status: 'paused',
    capabilities: ['Plan Generation', 'Recovery Analysis', 'Nutrition'],
    memoryScope: 'user-level',
    connectors: ['Garmin', 'Google Calendar'],
    lastActive: '3h ago',
    runsTotal: 189,
    successRate: 94.5,
  },
  {
    id: 'agent-005',
    name: 'Release Orchestrator',
    type: 'system',
    module: 'projects',
    status: 'active',
    capabilities: ['Changelog Generation', 'Version Bumping', 'Deploy Triggers'],
    memoryScope: 'project-level',
    connectors: ['GitHub', 'CircleCI', 'Slack'],
    lastActive: '30 min ago',
    runsTotal: 567,
    successRate: 97.8,
  },
  {
    id: 'agent-006',
    name: 'Monthly Close Agent',
    type: 'system',
    module: 'finance',
    status: 'archived',
    capabilities: ['Reconciliation', 'Report Generation', 'GL Export'],
    memoryScope: 'org-level',
    connectors: ['QuickBooks', 'Stripe'],
    lastActive: '2d ago',
    runsTotal: 24,
    successRate: 100,
  },
]

const moduleColors: Record<ModuleType, string> = {
  projects: 'text-primary',
  content: 'text-accent',
  finance: 'text-success',
  health: 'text-[#FF6B8A]',
}

function AgentCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="space-y-3 mb-4">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const loadAgents = () => {
    setIsLoading(true)
    setHasError(false)
    const timer = setTimeout(() => {
      setAgents(mockAgents)
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    const cleanup = loadAgents()
    return cleanup
  }, [])

  const hasActiveFilters = searchQuery !== '' || filterModule !== 'all' || filterStatus !== 'all'

  const clearFilters = () => {
    setSearchQuery('')
    setFilterModule('all')
    setFilterStatus('all')
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = filterModule === 'all' || agent.module === filterModule
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus
    return matchesSearch && matchesModule && matchesStatus
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Directory"
        description="Manage your AI agents across all modules"
        isLoading={isLoading}
        actions={
          <Button variant="gradient" size="sm" aria-label="Create a new agent">
            <Plus className="mr-1.5 h-4 w-4" />
            Create Agent
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3" role="search" aria-label="Filter agents">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search agents..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search agents by name"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            aria-label="Filter agents by module"
            className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
          >
            <option value="all">All Modules</option>
            <option value="projects">Projects</option>
            <option value="content">Content</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter agents by status"
            className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading agents" role="status">
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <span className="sr-only">Loading agent directory...</span>
        </div>
      ) : hasError ? (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-2xl bg-destructive/10 p-4 text-destructive mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load agents</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Something went wrong while fetching your agents. Please check your connection and try again.
            </p>
            <Button
              variant="gradient"
              onClick={loadAgents}
              aria-label="Retry loading agents"
            >
              <RefreshCw className="mr-1.5 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : agents.length === 0 ? (
        <EmptyState
          icon={<Bot className="h-6 w-6" />}
          title="No agents configured yet"
          description="Create your first AI agent to automate tasks across projects, content, finance, and health modules. Agents can triage PRs, generate content, detect anomalies, and more."
          actionLabel="Create Your First Agent"
          onAction={() => {}}
        />
      ) : filteredAgents.length === 0 ? (
        <EmptyState
          icon={<Search className="h-6 w-6" />}
          title="No agents match your filters"
          description="Try adjusting your search query or filters to find the agent you're looking for."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredAgents.length}</span>{' '}
              of <span className="font-medium text-foreground">{agents.length}</span> agents
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                aria-label="Clear all active filters"
              >
                Clear filters
              </Button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Agent cards">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="group hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
                role="listitem"
                aria-label={`${agent.name} — ${agent.status}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn('rounded-lg bg-muted p-2.5', moduleColors[agent.module])} aria-hidden="true">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{agent.module} · {agent.type}</p>
                      </div>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Memory: {agent.memoryScope}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Plug className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{agent.connectors.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{agent.runsTotal.toLocaleString()} total runs</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.capabilities.map((cap) => (
                      <Badge key={cap} variant="secondary" className="text-[10px]">{cap}</Badge>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-medium text-foreground">{agent.successRate}%</span>
                    </div>
                    <Progress value={agent.successRate} aria-label={`Success rate: ${agent.successRate}%`} />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last active: {agent.lastActive}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" role="toolbar" aria-label={`Actions for ${agent.name}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        aria-label={`View message traces for ${agent.name}`}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        aria-label={`Clone ${agent.name}`}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        aria-label={`Archive ${agent.name}`}
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AgentsPage
