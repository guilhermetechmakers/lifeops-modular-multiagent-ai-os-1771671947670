import { useState } from 'react'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { PageHeader } from '@/components/shared/page-header'
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

function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredAgents = mockAgents.filter((agent) => {
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
        actions={
          <Button variant="gradient" size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Create Agent
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
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
            className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="group hover:shadow-card-hover hover:border-primary/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn('rounded-lg bg-muted p-2.5', moduleColors[agent.module])}>
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
                  <Brain className="h-3.5 w-3.5" />
                  <span>Memory: {agent.memoryScope}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Plug className="h-3.5 w-3.5" />
                  <span>{agent.connectors.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Cpu className="h-3.5 w-3.5" />
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
                <Progress value={agent.successRate} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last active: {agent.lastActive}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="View traces">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Clone">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Archive">
                    <Archive className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AgentsPage
