import { Badge } from '@/components/ui/badge'
import type { Run, CronJob, Approval, Agent, Connector } from '@/types'

type StatusType = Run['status'] | CronJob['status'] | Approval['status'] | Agent['status'] | Connector['status']

const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'destructive' | 'warning' | 'accent' | 'secondary' }> = {
  running: { label: 'Running', variant: 'default' },
  completed: { label: 'Completed', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
  'pending-approval': { label: 'Pending Approval', variant: 'warning' },
  'rolled-back': { label: 'Rolled Back', variant: 'accent' },
  active: { label: 'Active', variant: 'success' },
  paused: { label: 'Paused', variant: 'warning' },
  disabled: { label: 'Disabled', variant: 'secondary' },
  archived: { label: 'Archived', variant: 'secondary' },
  pending: { label: 'Pending', variant: 'warning' },
  approved: { label: 'Approved', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  modified: { label: 'Modified', variant: 'accent' },
  connected: { label: 'Connected', variant: 'success' },
  disconnected: { label: 'Disconnected', variant: 'secondary' },
  error: { label: 'Error', variant: 'destructive' },
}

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'secondary' as const }
  return (
    <Badge variant={config.variant} className={className}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current inline-block" />
      {config.label}
    </Badge>
  )
}

export { StatusBadge }
