import { useState } from 'react'
import {
  Search,
  Check,
  X,
  Edit3,
  Clock,
  Bot,
  Eye,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/shared/page-header'
import { MetricCard } from '@/components/shared/metric-card'
import { cn } from '@/lib/utils'

const approvals = [
  {
    id: 'appr-001', runId: 'run-042', agentName: 'PR Triage Agent', module: 'projects',
    action: 'Auto-merge PR #234', description: 'Merge "feat: add user authentication" after all checks pass. 2 approvals received.',
    status: 'pending' as const, slaDeadline: '4h remaining', createdAt: '30 min ago',
    rationale: 'PR has 2 approving reviews, all CI checks pass, no conflicts detected. Code changes are within the auto-merge policy scope.',
    diff: '+142 / -23 lines across 5 files',
  },
  {
    id: 'appr-002', runId: 'run-039', agentName: 'Content Strategist', module: 'content',
    action: 'Publish blog post', description: 'Publish "10 AI Automation Trends for 2026" to WordPress and schedule social shares.',
    status: 'pending' as const, slaDeadline: '2h remaining', createdAt: '1h ago',
    rationale: 'Content scored 92/100 in quality check. SEO analysis shows high potential. Scheduled for optimal engagement window.',
    diff: 'New article: 2,400 words, 3 images',
  },
  {
    id: 'appr-003', runId: 'run-035', agentName: 'Anomaly Detector', module: 'finance',
    action: 'Flag transaction', description: 'Flag unusual transfer of $1,500 to unknown account for manual review.',
    status: 'pending' as const, slaDeadline: '1h remaining', createdAt: '2h ago',
    rationale: 'Transaction amount exceeds typical range for this category. Recipient account not in known vendor list. Pattern matches potential fraud indicators.',
    diff: 'Transaction: -$1,500.00 to ACCT-****7892',
  },
  {
    id: 'appr-004', runId: 'run-030', agentName: 'Release Orchestrator', module: 'projects',
    action: 'Deploy v2.4.0', description: 'Deploy release v2.4.0 to staging environment with 12 merged PRs.',
    status: 'approved' as const, slaDeadline: 'Resolved', createdAt: '5h ago',
    rationale: 'All 12 PRs passed review. Integration tests pass. No breaking changes detected.',
    diff: '+1,247 / -389 lines, 12 PRs merged',
  },
  {
    id: 'appr-005', runId: 'run-028', agentName: 'Monthly Close Agent', module: 'finance',
    action: 'Adjust GL entries', description: 'Post 3 adjusting entries for accrued expenses totaling $4,200.',
    status: 'rejected' as const, slaDeadline: 'Resolved', createdAt: '1d ago',
    rationale: 'Accrued expenses identified from vendor invoices received after period close. Amounts verified against purchase orders.',
    diff: '3 GL entries: $1,800 + $1,400 + $1,000',
  },
]

const slaColors: Record<string, string> = {
  '1h remaining': 'text-destructive',
  '2h remaining': 'text-warning',
  '4h remaining': 'text-muted-foreground',
  'Resolved': 'text-muted-foreground',
}

function ApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = approvals.filter((a) => {
    const matchesSearch = a.action.toLowerCase().includes(searchQuery.toLowerCase()) || a.agentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const pendingCount = approvals.filter((a) => a.status === 'pending').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approvals Queue"
        description="Review and approve pending agent actions"
        actions={
          <Badge variant="warning" className="text-sm px-3 py-1">
            {pendingCount} Pending
          </Badge>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Pending" value={pendingCount} icon={<Clock className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Approved Today" value={8} change={15} trend="up" icon={<Check className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Avg Response Time" value="1.2h" change={-20} trend="down" icon={<AlertTriangle className="h-5 w-5" />} accentColor="purple" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search approvals..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((approval) => (
          <Card key={approval.id} className={cn(
            'transition-all duration-200',
            approval.status === 'pending' && 'border-l-4 border-l-warning hover:border-warning/50',
            approval.status === 'approved' && 'border-l-4 border-l-success opacity-75',
            approval.status === 'rejected' && 'border-l-4 border-l-destructive opacity-75',
          )}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{approval.action}</h3>
                    <Badge variant={approval.status === 'pending' ? 'warning' : approval.status === 'approved' ? 'success' : 'destructive'}>
                      {approval.status}
                    </Badge>
                    <span className={cn('text-xs font-medium', slaColors[approval.slaDeadline])}>
                      {approval.slaDeadline}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{approval.description}</p>

                  <div className="rounded-lg bg-secondary p-3 mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Agent Rationale:</p>
                    <p className="text-xs text-foreground leading-relaxed">{approval.rationale}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Bot className="h-3.5 w-3.5" />{approval.agentName}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{approval.diff}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{approval.createdAt}</span>
                    <Badge variant="secondary" className="text-[10px] capitalize">{approval.module}</Badge>
                  </div>
                </div>

                {approval.status === 'pending' && (
                  <div className="flex lg:flex-col gap-2 lg:justify-center">
                    <Button variant="success" size="sm" className="flex-1 lg:flex-none">
                      <Check className="mr-1.5 h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                      <Edit3 className="mr-1.5 h-4 w-4" />
                      Modify
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1 lg:flex-none">
                      <X className="mr-1.5 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ApprovalsPage
