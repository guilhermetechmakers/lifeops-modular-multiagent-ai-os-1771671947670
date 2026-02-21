import { useState } from 'react'
import {
  Key,
  Plug,
  Copy,
  Plus,
  Trash2,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Toggle } from '@/components/ui/toggle'
import { PageHeader } from '@/components/shared/page-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from 'sonner'

const apiKeys = [
  { id: '1', name: 'Production Key', prefix: 'lo_prod_****a3f2', created: 'Jan 15, 2026', lastUsed: '2h ago' },
  { id: '2', name: 'Development Key', prefix: 'lo_dev_****b7e1', created: 'Feb 1, 2026', lastUsed: '1d ago' },
]

const connections = [
  { name: 'GitHub', connected: true, email: 'john@github.com' },
  { name: 'Google', connected: true, email: 'john@gmail.com' },
  { name: 'Microsoft', connected: false, email: '' },
]

function ProfilePage() {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <PageHeader title="User Profile" description="Manage your account settings and security" />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar fallback="JD" size="lg" />
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <Input defaultValue="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <Input defaultValue="john@example.com" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Role</label>
                  <Input defaultValue="Admin" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Organization</label>
                  <Input defaultValue="LifeOps Inc." disabled />
                </div>
              </div>
              <Button variant="gradient">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="gradient">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      {twoFaEnabled ? '2FA is enabled' : '2FA is disabled'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {twoFaEnabled ? 'Your account is protected with TOTP' : 'Enable TOTP-based two-factor authentication'}
                    </p>
                  </div>
                  <Toggle checked={twoFaEnabled} onChange={setTwoFaEnabled} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for programmatic access</CardDescription>
              </div>
              <Button variant="gradient" size="sm">
                <Plus className="mr-1.5 h-4 w-4" />
                New Key
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{key.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{key.prefix}</p>
                      <p className="text-xs text-muted-foreground">Created {key.created} · Last used {key.lastUsed}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={() => toast.success('Copied!')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your SSO and social connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {connections.map((conn) => (
                  <div key={conn.name} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Plug className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{conn.name}</p>
                        {conn.connected && <p className="text-xs text-muted-foreground">{conn.email}</p>}
                      </div>
                    </div>
                    <Button variant={conn.connected ? 'outline' : 'gradient'} size="sm">
                      {conn.connected ? 'Disconnect' : 'Connect'}
                    </Button>
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

export default ProfilePage
