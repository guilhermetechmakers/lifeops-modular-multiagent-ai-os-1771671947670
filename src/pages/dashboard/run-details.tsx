import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  RotateCcw,
  Download,
  MessageSquare,
  Code,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { PageHeader } from '@/components/shared/page-header'
import { cn } from '@/lib/utils'

const mockRun = {
  id: 'run-042',
  cronJobName: 'Nightly PR Triage',
  agentName: 'PR Triage Agent',
  module: 'projects' as const,
  status: 'completed' as const,
  startedAt: 'Feb 21, 2026 2:00 AM',
  completedAt: 'Feb 21, 2026 2:03 AM',
  duration: '3m 12s',
  actionsCount: 5,
  rationale: 'Executed nightly PR triage workflow. Analyzed 8 open PRs, labeled 5, requested reviews for 2, and auto-merged 1 safe PR with passing checks.',
}

const messageTrace = [
  { id: '1', from: 'Scheduler', to: 'PR Triage Agent', type: 'trigger', message: 'Cronjob triggered: Nightly PR Triage', time: '2:00:00 AM' },
  { id: '2', from: 'PR Triage Agent', to: 'GitHub Connector', type: 'request', message: 'Fetch open PRs for repo lifeops/core', time: '2:00:01 AM' },
  { id: '3', from: 'GitHub Connector', to: 'PR Triage Agent', type: 'response', message: 'Returned 8 open PRs with metadata', time: '2:00:03 AM' },
  { id: '4', from: 'PR Triage Agent', to: 'GPT-5', type: 'analysis', message: 'Analyzing PR content, diffs, and review status', time: '2:00:05 AM' },
  { id: '5', from: 'PR Triage Agent', to: 'GitHub Connector', type: 'action', message: 'Applied labels to 5 PRs, requested reviews for 2', time: '2:01:30 AM' },
  { id: '6', from: 'PR Triage Agent', to: 'Approval Queue', type: 'approval', message: 'Submitted PR #234 for auto-merge approval', time: '2:02:00 AM' },
  { id: '7', from: 'PR Triage Agent', to: 'Scheduler', type: 'complete', message: 'Run completed successfully. 5 actions taken.', time: '2:03:12 AM' },
]

const artifacts = [
  { id: '1', name: 'pr-analysis-report.json', type: 'report', size: '12.4 KB', created: '2:03 AM' },
  { id: '2', name: 'label-changes.diff', type: 'diff', size: '3.2 KB', created: '2:02 AM' },
  { id: '3', name: 'review-assignments.json', type: 'schema', size: '1.8 KB', created: '2:02 AM' },
  { id: '4', name: 'execution-log.txt', type: 'log', size: '8.6 KB', created: '2:03 AM' },
]

const actionDiffs = [
  {
    file: 'PR #234 Labels',
    changes: [
      { type: 'add', content: '+ label: "feature"' },
      { type: 'add', content: '+ label: "auth"' },
      { type: 'add', content: '+ label: "ready-to-merge"' },
    ],
  },
  {
    file: 'PR #231 Review Request',
    changes: [
      { type: 'add', content: '+ reviewer: @senior-dev' },
      { type: 'add', content: '+ reviewer: @security-team' },
    ],
  },
]

const typeColors: Record<string, string> = {
  trigger: 'bg-primary/15 text-primary',
  request: 'bg-accent/15 text-accent',
  response: 'bg-success/15 text-success',
  analysis: 'bg-warning/15 text-warning',
  action: 'bg-primary/15 text-primary',
  approval: 'bg-accent/15 text-accent',
  complete: 'bg-success/15 text-success',
}

function RunDetailsPage() {
  const { runId } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title={`Run ${runId || mockRun.id}`}
          description={mockRun.cronJobName}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-1.5 h-4 w-4" />
                Export
              </Button>
              <Button variant="destructive" size="sm">
                <RotateCcw className="mr-1.5 h-4 w-4" />
                Rollback
              </Button>
            </div>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <StatusBadge status={mockRun.status} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="text-sm font-semibold text-foreground">{mockRun.duration}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Actions</p>
            <p className="text-sm font-semibold text-foreground">{mockRun.actionsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Agent</p>
            <p className="text-sm font-semibold text-foreground">{mockRun.agentName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Module</p>
            <Badge variant="secondary" className="capitalize">{mockRun.module}</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Rationale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed">{mockRun.rationale}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            Message Trace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {messageTrace.map((msg, i) => (
              <div key={msg.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn('h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold', typeColors[msg.type])}>
                    {i + 1}
                  </div>
                  {i < messageTrace.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{msg.from}</span>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-xs font-semibold text-foreground">{msg.to}</span>
                    <Badge variant="secondary" className="text-[10px]">{msg.type}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-success" />
              Action Diffs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actionDiffs.map((diff) => (
                <div key={diff.file} className="rounded-lg bg-secondary overflow-hidden">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-xs font-mono font-medium text-foreground">{diff.file}</p>
                  </div>
                  <div className="p-4 font-mono text-xs space-y-1">
                    {diff.changes.map((change, i) => (
                      <p key={i} className={cn(change.type === 'add' ? 'text-success' : 'text-destructive')}>
                        {change.content}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-warning" />
              Artifacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {artifacts.map((artifact) => (
                <div key={artifact.id} className="flex items-center justify-between rounded-lg bg-secondary p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-foreground font-mono">{artifact.name}</p>
                      <p className="text-[10px] text-muted-foreground">{artifact.size} · {artifact.created}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-sm">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RunDetailsPage
