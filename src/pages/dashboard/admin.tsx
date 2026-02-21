import {
  Users,
  Activity,
  Server,
  AlertTriangle,
  Database,
  Cpu,
  HardDrive,
  Download,
  Search,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/shared/metric-card'
import { PageHeader } from '@/components/shared/page-header'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const systemMetrics = [
  { time: '00:00', cpu: 32, memory: 58, requests: 120 },
  { time: '04:00', cpu: 18, memory: 55, requests: 45 },
  { time: '08:00', cpu: 45, memory: 62, requests: 280 },
  { time: '12:00', cpu: 67, memory: 71, requests: 450 },
  { time: '16:00', cpu: 52, memory: 68, requests: 380 },
  { time: '20:00', cpu: 38, memory: 60, requests: 210 },
  { time: 'Now', cpu: 41, memory: 63, requests: 190 },
]

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', lastLogin: '2m ago', status: 'active' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Member', lastLogin: '1h ago', status: 'active' },
  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Member', lastLogin: '3h ago', status: 'active' },
  { name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', lastLogin: '2d ago', status: 'inactive' },
]

const auditLog = [
  { id: '1', action: 'User login', actor: 'john@example.com', ip: '192.168.1.1', time: '2m ago', severity: 'info' },
  { id: '2', action: 'Cronjob executed', actor: 'system', ip: 'internal', time: '5m ago', severity: 'info' },
  { id: '3', action: 'Agent paused', actor: 'jane@example.com', ip: '10.0.0.5', time: '1h ago', severity: 'warning' },
  { id: '4', action: 'RBAC policy updated', actor: 'john@example.com', ip: '192.168.1.1', time: '2h ago', severity: 'warning' },
  { id: '5', action: 'Failed login attempt', actor: 'unknown@test.com', ip: '203.0.113.1', time: '4h ago', severity: 'critical' },
]

function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="System administration, monitoring, and policy management"
        actions={
          <Button variant="outline" size="sm">
            <Download className="mr-1.5 h-4 w-4" />
            Export Logs
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Users" value={24} change={4} trend="up" icon={<Users className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="System Uptime" value="99.97%" icon={<Server className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Active Sessions" value={8} icon={<Activity className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Alerts" value={2} change={-1} trend="down" icon={<AlertTriangle className="h-5 w-5" />} accentColor="orange" />
      </div>

      <Tabs defaultValue="health">
        <TabsList>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="health">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>System Performance</CardTitle>
                <Badge variant="secondary">Last 24h</Badge>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={systemMetrics}>
                    <defs>
                      <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF7300" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF7300" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B16FFF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#B16FFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2E2E32" />
                    <XAxis dataKey="time" stroke="#A1A1AA" fontSize={12} />
                    <YAxis stroke="#A1A1AA" fontSize={12} unit="%" />
                    <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} />
                    <Area type="monotone" dataKey="cpu" stroke="#FF7300" fill="url(#cpuGrad)" strokeWidth={2} name="CPU" />
                    <Area type="monotone" dataKey="memory" stroke="#B16FFF" fill="url(#memGrad)" strokeWidth={2} name="Memory" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'CPU Usage', value: 41, icon: <Cpu className="h-5 w-5" />, color: 'orange' },
                { label: 'Memory Usage', value: 63, icon: <Database className="h-5 w-5" />, color: 'purple' },
                { label: 'Disk Usage', value: 34, icon: <HardDrive className="h-5 w-5" />, color: 'green' },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-lg bg-muted p-2 text-muted-foreground">{item.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-2xl font-bold text-foreground">{item.value}%</p>
                      </div>
                    </div>
                    <Progress value={item.value} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Users</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{user.role}</Badge>
                      <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>{user.status}</Badge>
                      <span className="text-xs text-muted-foreground">{user.lastLogin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Audit Log</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-1.5 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {auditLog.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-2 w-2 rounded-full',
                        entry.severity === 'info' && 'bg-muted-foreground',
                        entry.severity === 'warning' && 'bg-warning',
                        entry.severity === 'critical' && 'bg-destructive',
                      )} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.action}</p>
                        <p className="text-xs text-muted-foreground">{entry.actor} · {entry.ip}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{entry.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <div className="space-y-4">
            {[
              { name: 'Max Automation Level', value: 'Bounded Autopilot', description: 'Maximum automation level allowed for any cronjob' },
              { name: 'Approval SLA', value: '4 hours', description: 'Maximum time before approval escalation' },
              { name: 'Session Timeout', value: '24 hours', description: 'Inactive session expiration' },
              { name: 'Password Policy', value: '8+ chars, mixed', description: 'Minimum password requirements' },
              { name: 'API Rate Limit', value: '1000 req/min', description: 'Maximum API requests per minute' },
            ].map((policy) => (
              <Card key={policy.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{policy.name}</p>
                    <p className="text-xs text-muted-foreground">{policy.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{policy.value}</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
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

export default AdminPage
