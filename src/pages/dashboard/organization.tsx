import {
  CreditCard,
  Plus,
  MoreVertical,
  Crown,
  UserCheck,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { PageHeader } from '@/components/shared/page-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

const teamMembers = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: '2m ago' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Member', status: 'active', lastActive: '1h ago' },
  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Member', status: 'active', lastActive: '3h ago' },
  { name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', status: 'invited', lastActive: 'Pending' },
]

const rbacPolicies = [
  { name: 'Admin', description: 'Full access to all features and settings', members: 1, permissions: ['All'] },
  { name: 'Member', description: 'Can create and manage agents, runs, and cronjobs', members: 2, permissions: ['Agents', 'Runs', 'Cronjobs', 'Approvals'] },
  { name: 'Viewer', description: 'Read-only access to dashboards and reports', members: 1, permissions: ['View Dashboards', 'View Reports'] },
]

const roleIcons: Record<string, React.ReactNode> = {
  Admin: <Crown className="h-3.5 w-3.5 text-warning" />,
  Member: <UserCheck className="h-3.5 w-3.5 text-success" />,
  Viewer: <Eye className="h-3.5 w-3.5 text-muted-foreground" />,
}

function OrganizationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Manage your team, roles, and billing"
        actions={
          <Button variant="gradient" size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Invite Member
          </Button>
        }
      />

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {teamMembers.map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar fallback={member.name.split(' ').map(n => n[0]).join('')} size="sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          {roleIcons[member.role]}
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={member.status === 'active' ? 'success' : 'warning'}>{member.status}</Badge>
                      <span className="text-xs text-muted-foreground">{member.lastActive}</span>
                      <Badge variant="secondary">{member.role}</Badge>
                      <button className="rounded p-1.5 text-muted-foreground hover:bg-muted">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="space-y-4">
            {rbacPolicies.map((policy) => (
              <Card key={policy.name}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{policy.name}</h3>
                        <Badge variant="secondary">{policy.members} members</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{policy.description}</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {policy.permissions.map((perm) => (
                      <Badge key={perm} variant="outline" className="text-[10px]">{perm}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">$29/month · Billed monthly</p>
                  </div>
                  <Button variant="outline" size="sm">Upgrade</Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Runs used</span>
                      <span className="text-foreground">3,247 / 5,000</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Agents</span>
                      <span className="text-foreground">12 / Unlimited</span>
                    </div>
                    <Progress value={12} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Team seats</span>
                      <span className="text-foreground">4 / 10</span>
                    </div>
                    <Progress value={40} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="enterprise">
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Features</CardTitle>
              <CardDescription>Advanced features for organizations at scale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'SAML SSO', description: 'Single sign-on with your identity provider', enabled: false },
                  { name: 'On-Premise Runners', description: 'Run agents on your own infrastructure', enabled: false },
                  { name: 'Custom SLA', description: 'Guaranteed uptime and response times', enabled: false },
                  { name: 'Audit Log Export', description: 'Export audit logs to your SIEM', enabled: true },
                ].map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{feature.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                    <Badge variant={feature.enabled ? 'success' : 'secondary'}>
                      {feature.enabled ? 'Enabled' : 'Contact Sales'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OrganizationPage
