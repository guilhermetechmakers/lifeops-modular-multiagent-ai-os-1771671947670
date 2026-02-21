import { useState } from 'react'
import {
  Bell,
  Bot,
  Database,
  Code,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { PageHeader } from '@/components/shared/page-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from 'sonner'

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    slack: false,
    approvalAlerts: true,
    runFailures: true,
    weeklyDigest: true,
  })

  const [automation, setAutomation] = useState({
    defaultLevel: 'approval-required',
    maxActionsPerRun: '50',
    spendLimitPerRun: '100',
    requireApprovalAbove: '10',
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Settings & Preferences" description="Configure global app settings and defaults" />

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="automation">Automation Defaults</TabsTrigger>
          <TabsTrigger value="data">Data & Retention</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Channels</h4>
                <Toggle checked={notifications.email} onChange={(v) => setNotifications({ ...notifications, email: v })} label="Email notifications" />
                <Toggle checked={notifications.inApp} onChange={(v) => setNotifications({ ...notifications, inApp: v })} label="In-app notifications" />
                <Toggle checked={notifications.slack} onChange={(v) => setNotifications({ ...notifications, slack: v })} label="Slack notifications" />
              </div>
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="text-sm font-medium text-foreground">Events</h4>
                <Toggle checked={notifications.approvalAlerts} onChange={(v) => setNotifications({ ...notifications, approvalAlerts: v })} label="Approval requests" />
                <Toggle checked={notifications.runFailures} onChange={(v) => setNotifications({ ...notifications, runFailures: v })} label="Run failures" />
                <Toggle checked={notifications.weeklyDigest} onChange={(v) => setNotifications({ ...notifications, weeklyDigest: v })} label="Weekly digest" />
              </div>
              <Button variant="gradient" onClick={() => toast.success('Preferences saved')}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Automation Defaults
              </CardTitle>
              <CardDescription>Set default constraints for new cronjobs and agent runs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Default Automation Level</label>
                <select
                  value={automation.defaultLevel}
                  onChange={(e) => setAutomation({ ...automation, defaultLevel: e.target.value })}
                  className="h-10 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground"
                >
                  <option value="suggest-only">Suggest Only</option>
                  <option value="approval-required">Approval Required</option>
                  <option value="conditional-auto">Conditional Auto</option>
                  <option value="bounded-autopilot">Bounded Autopilot</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Max Actions Per Run</label>
                  <Input type="number" value={automation.maxActionsPerRun} onChange={(e) => setAutomation({ ...automation, maxActionsPerRun: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Spend Limit Per Run ($)</label>
                  <Input type="number" value={automation.spendLimitPerRun} onChange={(e) => setAutomation({ ...automation, spendLimitPerRun: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Require Approval Above (actions)</label>
                <Input type="number" value={automation.requireApprovalAbove} onChange={(e) => setAutomation({ ...automation, requireApprovalAbove: e.target.value })} />
              </div>
              <Button variant="gradient" onClick={() => toast.success('Defaults saved')}>Save Defaults</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Retention
              </CardTitle>
              <CardDescription>Configure how long data is retained</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Run artifacts', value: '90 days', description: 'Diffs, reports, and execution logs' },
                { label: 'Audit logs', value: '365 days', description: 'Immutable action and access logs' },
                { label: 'Message traces', value: '30 days', description: 'Agent-to-agent communication logs' },
                { label: 'Analytics data', value: '180 days', description: 'Usage metrics and performance data' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <select className="h-8 rounded-lg border border-border bg-input px-2 text-xs text-foreground">
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>180 days</option>
                    <option>365 days</option>
                    <option>Forever</option>
                  </select>
                </div>
              ))}
              <Button variant="gradient" onClick={() => toast.success('Retention settings saved')}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="developer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Developer Settings
              </CardTitle>
              <CardDescription>Configure API and webhook settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Webhook URL</label>
                <Input placeholder="https://your-app.com/webhooks/lifeops" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Webhook Secret</label>
                <Input type="password" placeholder="whsec_..." />
              </div>
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm font-medium text-foreground mb-2">API Endpoint</p>
                <code className="text-xs text-primary font-mono">https://api.lifeops.ai/v1</code>
              </div>
              <Button variant="gradient" onClick={() => toast.success('Developer settings saved')}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage
