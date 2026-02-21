import { useState } from 'react'
import {
  BookOpen,
  Search,
  Code,
  Zap,
  Bot,
  Clock,
  Shield,
  Plug,
  ChevronRight,
  FileText,
  HelpCircle,
  MessageSquare,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/shared/page-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const docSections = [
  { icon: <Rocket className="h-5 w-5" />, title: 'Getting Started', description: 'Quick start guide and onboarding', articles: 8 },
  { icon: <Bot className="h-5 w-5" />, title: 'Agent Configuration', description: 'Create and manage AI agents', articles: 12 },
  { icon: <Clock className="h-5 w-5" />, title: 'Cronjobs & Scheduling', description: 'Set up automated workflows', articles: 10 },
  { icon: <Shield className="h-5 w-5" />, title: 'Security & RBAC', description: 'Permissions, roles, and audit', articles: 7 },
  { icon: <Plug className="h-5 w-5" />, title: 'Integrations', description: 'Connect external services', articles: 15 },
  { icon: <Code className="h-5 w-5" />, title: 'API Reference', description: 'REST and gRPC endpoints', articles: 24 },
]

const tutorials = [
  { title: 'Build Your First Agent', duration: '15 min', difficulty: 'Beginner', module: 'General' },
  { title: 'Set Up PR Auto-Triage', duration: '20 min', difficulty: 'Intermediate', module: 'Projects' },
  { title: 'Content Pipeline Automation', duration: '25 min', difficulty: 'Intermediate', module: 'Content' },
  { title: 'Financial Anomaly Detection', duration: '30 min', difficulty: 'Advanced', module: 'Finance' },
  { title: 'Custom Connector Development', duration: '45 min', difficulty: 'Advanced', module: 'General' },
]

const changelog = [
  { version: 'v2.4.0', date: 'Feb 20, 2026', changes: ['Added bounded-autopilot automation level', 'New connector health monitoring', 'Improved approval SLA tracking'] },
  { version: 'v2.3.0', date: 'Feb 10, 2026', changes: ['Health module launch', 'Garmin and Apple Health connectors', 'Training plan generator agent'] },
  { version: 'v2.2.0', date: 'Jan 28, 2026', changes: ['Workflow template marketplace', 'Template rating and comments', 'Import/export workflows'] },
]

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-success/15 text-success',
  Intermediate: 'bg-warning/15 text-warning',
  Advanced: 'bg-destructive/15 text-destructive',
}

function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Docs & Help"
        description="Documentation, tutorials, and support resources"
      />

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="pl-9 h-12 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="docs">
        <TabsList>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="changelog">Changelog</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="docs">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docSections.map((section) => (
              <Card key={section.title} className="group hover:border-primary/30 hover:shadow-card-hover transition-all duration-200 cursor-pointer">
                <CardContent className="p-6">
                  <div className="rounded-lg bg-muted p-2.5 w-fit text-primary mb-4">{section.icon}</div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{section.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{section.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{section.articles} articles</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutorials">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {tutorials.map((tutorial) => (
                  <div key={tutorial.title} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{tutorial.title}</p>
                        <p className="text-xs text-muted-foreground">{tutorial.duration} · {tutorial.module}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyColors[tutorial.difficulty]}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changelog">
          <div className="space-y-4">
            {changelog.map((release) => (
              <Card key={release.version}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="default">{release.version}</Badge>
                    <span className="text-xs text-muted-foreground">{release.date}</span>
                  </div>
                  <ul className="space-y-2">
                    {release.changes.map((change) => (
                      <li key={change} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <MessageSquare className="h-6 w-6" />, title: 'Community Discord', description: 'Join our community for discussions and help', action: 'Join Discord' },
              { icon: <HelpCircle className="h-6 w-6" />, title: 'Support Ticket', description: 'Submit a ticket for technical issues', action: 'Open Ticket' },
              { icon: <BookOpen className="h-6 w-6" />, title: 'Knowledge Base', description: 'Browse FAQs and common solutions', action: 'Browse' },
              { icon: <Code className="h-6 w-6" />, title: 'API Status', description: 'Check current API and service status', action: 'View Status' },
            ].map((item) => (
              <Card key={item.title} className="hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 rounded-lg bg-muted p-3 w-fit text-primary">{item.icon}</div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{item.description}</p>
                  <Button variant="outline" size="sm">{item.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DocsPage
