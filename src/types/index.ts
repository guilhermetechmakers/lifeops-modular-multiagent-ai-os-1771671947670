export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'member' | 'viewer'
  orgId?: string
  createdAt: string
}

export interface Agent {
  id: string
  name: string
  type: 'system' | 'user'
  module: ModuleType
  status: 'active' | 'paused' | 'archived'
  capabilities: string[]
  memoryScope: string
  connectors: string[]
  lastActive: string
  runsTotal: number
  successRate: number
}

export type ModuleType = 'projects' | 'content' | 'finance' | 'health'

export type AutomationLevel = 'suggest-only' | 'approval-required' | 'conditional-auto' | 'bounded-autopilot'

export interface CronJob {
  id: string
  name: string
  description: string
  schedule: string
  timezone: string
  module: ModuleType
  agentId: string
  automationLevel: AutomationLevel
  status: 'active' | 'paused' | 'disabled'
  nextRun: string
  lastRun?: string
  lastOutcome?: 'success' | 'failure' | 'skipped'
  constraints: CronConstraints
  runsTotal: number
  successRate: number
}

export interface CronConstraints {
  maxActions: number
  spendLimit?: number
  allowedTools: string[]
  requireApproval: boolean
}

export interface Run {
  id: string
  cronJobId?: string
  agentId: string
  agentName: string
  module: ModuleType
  status: 'running' | 'completed' | 'failed' | 'pending-approval' | 'rolled-back'
  startedAt: string
  completedAt?: string
  duration?: number
  actionsCount: number
  artifacts: Artifact[]
  rationale?: string
}

export interface Artifact {
  id: string
  type: 'diff' | 'log' | 'report' | 'schema'
  name: string
  size: number
  createdAt: string
}

export interface Approval {
  id: string
  runId: string
  agentName: string
  module: ModuleType
  action: string
  description: string
  status: 'pending' | 'approved' | 'rejected' | 'modified'
  slaDeadline: string
  createdAt: string
  diff?: string
  rationale: string
}

export interface Connector {
  id: string
  name: string
  type: string
  category: 'vcs' | 'ci' | 'cms' | 'finance' | 'health' | 'communication' | 'storage'
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  icon: string
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  module: ModuleType
  category: string
  agents: number
  steps: number
  rating: number
  uses: number
  author: string
  tags: string[]
}

export interface AuditEntry {
  id: string
  action: string
  actor: string
  module: ModuleType
  timestamp: string
  details: string
  severity: 'info' | 'warning' | 'critical'
}

export interface MetricCard {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  actionUrl?: string
}
