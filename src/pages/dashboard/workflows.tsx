import { useState } from 'react'
import {
  Workflow,
  Search,
  Star,
  Download,
  Bot,
  ArrowRight,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/shared/page-header'
import { cn } from '@/lib/utils'

const templates = [
  {
    id: '1', name: 'PR Triage & Auto-Merge', description: 'Automatically triage, label, and merge safe PRs based on configurable rules.',
    module: 'projects', category: 'DevOps', agents: 2, steps: 5, rating: 4.8, uses: 1240, author: 'LifeOps Team',
    tags: ['GitHub', 'CI/CD', 'Auto-merge'],
  },
  {
    id: '2', name: 'Content Pipeline', description: 'End-to-end content creation from ideation to publishing with SEO optimization.',
    module: 'content', category: 'Marketing', agents: 3, steps: 7, rating: 4.6, uses: 890, author: 'LifeOps Team',
    tags: ['SEO', 'Publishing', 'Analytics'],
  },
  {
    id: '3', name: 'Monthly Financial Close', description: 'Automate reconciliation, report generation, and GL export for month-end.',
    module: 'finance', category: 'Accounting', agents: 2, steps: 8, rating: 4.9, uses: 567, author: 'LifeOps Team',
    tags: ['Reconciliation', 'Reports', 'Audit'],
  },
  {
    id: '4', name: 'Training Plan Generator', description: 'Generate personalized training plans based on fitness data and goals.',
    module: 'health', category: 'Fitness', agents: 1, steps: 4, rating: 4.5, uses: 432, author: 'Community',
    tags: ['Training', 'Personalization', 'Recovery'],
  },
  {
    id: '5', name: 'Release Orchestration', description: 'Coordinate changelog, version bumping, and multi-environment deploys.',
    module: 'projects', category: 'DevOps', agents: 3, steps: 6, rating: 4.7, uses: 780, author: 'LifeOps Team',
    tags: ['Release', 'Deploy', 'Changelog'],
  },
  {
    id: '6', name: 'Expense Anomaly Detection', description: 'Continuous monitoring of transactions for unusual patterns and fraud.',
    module: 'finance', category: 'Security', agents: 1, steps: 3, rating: 4.8, uses: 1100, author: 'LifeOps Team',
    tags: ['Anomaly', 'Fraud', 'Real-time'],
  },
]

const moduleColors: Record<string, string> = {
  projects: 'border-l-primary',
  content: 'border-l-accent',
  finance: 'border-l-success',
  health: 'border-l-[#FF6B8A]',
}

function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState('all')

  const filtered = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = filterModule === 'all' || t.module === filterModule
    return matchesSearch && matchesModule
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workflow Templates"
        description="Reusable multi-agent workflow templates to accelerate automation"
        actions={
          <Button variant="gradient" size="sm">
            <Workflow className="mr-1.5 h-4 w-4" />
            Create Template
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground"
        >
          <option value="all">All Modules</option>
          <option value="projects">Projects</option>
          <option value="content">Content</option>
          <option value="finance">Finance</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => (
          <Card key={template.id} className={cn('group border-l-4 hover:shadow-card-hover transition-all duration-300', moduleColors[template.module])}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-[10px]">{template.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                  <span className="text-xs font-medium text-foreground">{template.rating}</span>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-2">{template.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{template.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Bot className="h-3.5 w-3.5" />{template.agents} agents</span>
                <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" />{template.steps} steps</span>
                <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" />{template.uses.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">by {template.author}</span>
                <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Use Template <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default WorkflowsPage
