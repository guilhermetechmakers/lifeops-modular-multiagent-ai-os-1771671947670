import { useState } from 'react'
import {
  Search,
  Plus,
  RefreshCw,
  Settings,
  Github,
  Cloud,
  CreditCard,
  Heart,
  MessageSquare,
  Database,
  AlertTriangle,
  Unplug,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'

const connectors = [
  { id: '1', name: 'GitHub', category: 'vcs', status: 'connected' as const, lastSync: '2m ago', icon: <Github className="h-5 w-5" />, description: 'Repository management, PRs, and CI/CD' },
  { id: '2', name: 'Google Workspace', category: 'communication', status: 'connected' as const, lastSync: '5m ago', icon: <Cloud className="h-5 w-5" />, description: 'Calendar, Docs, and Gmail integration' },
  { id: '3', name: 'Slack', category: 'communication', status: 'connected' as const, lastSync: '1m ago', icon: <MessageSquare className="h-5 w-5" />, description: 'Team notifications and alerts' },
  { id: '4', name: 'Stripe', category: 'finance', status: 'connected' as const, lastSync: '10m ago', icon: <CreditCard className="h-5 w-5" />, description: 'Payment processing and billing' },
  { id: '5', name: 'Plaid', category: 'finance', status: 'error' as const, lastSync: '1h ago', icon: <Database className="h-5 w-5" />, description: 'Bank account aggregation' },
  { id: '6', name: 'WordPress', category: 'cms', status: 'connected' as const, lastSync: '30m ago', icon: <Cloud className="h-5 w-5" />, description: 'Content publishing and management' },
  { id: '7', name: 'Garmin', category: 'health', status: 'connected' as const, lastSync: '15m ago', icon: <Heart className="h-5 w-5" />, description: 'Fitness data and activity tracking' },
  { id: '8', name: 'CircleCI', category: 'ci', status: 'disconnected' as const, lastSync: 'Never', icon: <RefreshCw className="h-5 w-5" />, description: 'Continuous integration and deployment' },
  { id: '9', name: 'AWS S3', category: 'storage', status: 'connected' as const, lastSync: '5m ago', icon: <Cloud className="h-5 w-5" />, description: 'Artifact and file storage' },
]

const categoryLabels: Record<string, string> = {
  vcs: 'Version Control',
  ci: 'CI/CD',
  cms: 'CMS',
  finance: 'Finance',
  health: 'Health',
  communication: 'Communication',
  storage: 'Storage',
}

function ConnectorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const filtered = connectors.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || c.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integration Connectors"
        description="Connect external services and manage integrations"
        actions={
          <Button variant="gradient" size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Connector
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search connectors..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
        >
          <option value="all">All Categories</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Unplug className="h-6 w-6" />}
          title={searchQuery || filterCategory !== 'all' ? 'No connectors match your filters' : 'No connectors configured'}
          description={
            searchQuery || filterCategory !== 'all'
              ? 'Try adjusting your search query or category filter to find the connector you\'re looking for.'
              : 'Connect external services like GitHub, Slack, Stripe, and more to power your automated workflows and agent integrations.'
          }
          actionLabel={searchQuery || filterCategory !== 'all' ? 'Clear Filters' : 'Add Connector'}
          onAction={() => {
            if (searchQuery || filterCategory !== 'all') {
              setSearchQuery('')
              setFilterCategory('all')
            }
          }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((connector) => (
            <Card key={connector.id} className={cn(
              'group hover:shadow-card-hover transition-all duration-200',
              connector.status === 'error' && 'border-destructive/30',
            )}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'rounded-lg p-2.5',
                      connector.status === 'connected' ? 'bg-success/10 text-success' : connector.status === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
                    )}>
                      {connector.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{connector.name}</h3>
                      <Badge variant="secondary" className="text-[10px] mt-1">{categoryLabels[connector.category]}</Badge>
                    </div>
                  </div>
                  <StatusBadge status={connector.status} />
                </div>

                <p className="text-xs text-muted-foreground mb-4">{connector.description}</p>

                {connector.status === 'error' && (
                  <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-destructive">Connection failed</p>
                      <p className="text-[11px] text-destructive/70 mt-0.5">
                        Unable to reach {connector.name}. Check credentials or try reconnecting.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Retry
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Last sync: {connector.lastSync}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {connector.status === 'connected' && (
                      <button className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Refresh">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Settings">
                      <Settings className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConnectorsPage
