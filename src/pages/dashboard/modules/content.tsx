import {
  FileText,
  Lightbulb,
  Calendar,
  Plus,
  Bot,
  Eye,
  ThumbsUp,
  Share2,
  Edit3,
  Send,
  Clock,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/shared/metric-card'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const ideas = [
  { id: '1', title: '10 AI Automation Trends for 2026', source: 'Agent Suggestion', score: 92, tags: ['AI', 'Trends'] },
  { id: '2', title: 'How to Build a Multi-Agent System', source: 'User Idea', score: 87, tags: ['Tutorial', 'Engineering'] },
  { id: '3', title: 'The Future of Scheduled Autonomy', source: 'Agent Suggestion', score: 85, tags: ['Cronjobs', 'Thought Leadership'] },
  { id: '4', title: 'LifeOps vs Traditional RPA', source: 'Agent Suggestion', score: 78, tags: ['Comparison', 'Marketing'] },
]

const calendarItems = [
  { date: 'Feb 22', title: 'AI Trends Blog Post', status: 'scheduled', platform: 'Blog', time: '10:00 AM' },
  { date: 'Feb 24', title: 'Product Update Thread', status: 'draft', platform: 'Twitter', time: '2:00 PM' },
  { date: 'Feb 26', title: 'Multi-Agent Tutorial', status: 'in-review', platform: 'Blog', time: '9:00 AM' },
  { date: 'Mar 1', title: 'Monthly Newsletter', status: 'draft', platform: 'Email', time: '8:00 AM' },
  { date: 'Mar 3', title: 'Case Study: Finance Module', status: 'idea', platform: 'Blog', time: 'TBD' },
]

const analytics = [
  { title: 'AI Automation Guide', views: 12400, likes: 342, shares: 89, published: 'Feb 15' },
  { title: 'Getting Started with LifeOps', views: 8900, likes: 256, shares: 67, published: 'Feb 10' },
  { title: 'Cronjobs Best Practices', views: 6700, likes: 198, shares: 45, published: 'Feb 5' },
  { title: 'Agent Orchestration Deep Dive', views: 4200, likes: 134, shares: 32, published: 'Jan 28' },
]

const statusColors: Record<string, string> = {
  scheduled: 'bg-success/15 text-success',
  draft: 'bg-muted text-muted-foreground',
  'in-review': 'bg-warning/15 text-warning',
  idea: 'bg-accent/15 text-accent',
}

function ContentModule() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content"
        description="End-to-end content pipeline automation with AI agents"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-1.5 h-4 w-4" />
              Calendar View
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Content
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Published This Month" value={8} change={33} trend="up" icon={<FileText className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Total Views" value="32.2K" change={18} trend="up" icon={<Eye className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Engagement Rate" value="4.8%" change={0.5} trend="up" icon={<ThumbsUp className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Scheduled Posts" value={5} change={2} trend="up" icon={<Clock className="h-5 w-5" />} accentColor="purple" />
      </div>

      <Tabs defaultValue="ideas">
        <TabsList>
          <TabsTrigger value="ideas">Idea Inbox</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas">
          {ideas.length === 0 ? (
            <EmptyState
              icon={<Lightbulb className="h-6 w-6" />}
              title="No ideas yet"
              description="Your idea inbox is empty. AI agents will suggest content ideas based on trends, or you can add your own."
              actionLabel="Add Idea"
              onAction={() => {}}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ideas.map((idea) => (
                <Card key={idea.id} className="group hover:border-accent/30 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-warning" />
                        <Badge variant={idea.source === 'Agent Suggestion' ? 'default' : 'secondary'} className="text-[10px]">
                          {idea.source === 'Agent Suggestion' && <Bot className="mr-1 h-3 w-3" />}
                          {idea.source}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-success">Score: {idea.score}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">{idea.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit3 className="mr-1.5 h-3.5 w-3.5" />
                        Draft
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          {calendarItems.length === 0 ? (
            <EmptyState
              icon={<Calendar className="h-6 w-6" />}
              title="No scheduled content"
              description="Your content calendar is empty. Schedule posts, articles, and newsletters to keep your pipeline flowing."
              actionLabel="Schedule Content"
              onAction={() => {}}
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {calendarItems.map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-16 text-center">
                          <p className="text-xs text-muted-foreground">{item.date.split(' ')[0]}</p>
                          <p className="text-lg font-bold text-foreground">{item.date.split(' ')[1]}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.platform} · {item.time}</p>
                        </div>
                      </div>
                      <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-medium', statusColors[item.status])}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          {analytics.length === 0 ? (
            <EmptyState
              icon={<BarChart3 className="h-6 w-6" />}
              title="No analytics data"
              description="Publish your first piece of content to start tracking views, engagement, and shares across platforms."
              actionLabel="Create Content"
              onAction={() => {}}
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {analytics.map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Published {item.published}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Eye className="h-3.5 w-3.5" />
                          {item.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Share2 className="h-3.5 w-3.5" />
                          {item.shares}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ContentModule
