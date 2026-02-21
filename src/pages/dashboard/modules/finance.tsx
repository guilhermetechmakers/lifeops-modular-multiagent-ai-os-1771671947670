import {
  DollarSign,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Wallet,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/shared/metric-card'
import { PageHeader } from '@/components/shared/page-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const cashFlowData = [
  { month: 'Sep', income: 42000, expenses: 35000 },
  { month: 'Oct', income: 45000, expenses: 37000 },
  { month: 'Nov', income: 48000, expenses: 36000 },
  { month: 'Dec', income: 52000, expenses: 41000 },
  { month: 'Jan', income: 49000, expenses: 38000 },
  { month: 'Feb', income: 54000, expenses: 39000 },
]

const categoryData = [
  { name: 'Software', value: 12400, color: '#FF7300' },
  { name: 'Payroll', value: 24000, color: '#B16FFF' },
  { name: 'Marketing', value: 5600, color: '#3FC56B' },
  { name: 'Infrastructure', value: 8200, color: '#FF6B8A' },
  { name: 'Other', value: 3800, color: '#A1A1AA' },
]

const transactions = [
  { id: '1', description: 'AWS Infrastructure', amount: -2450.00, category: 'Infrastructure', date: 'Feb 21', agentSuggestion: 'Auto-categorized', status: 'confirmed' },
  { id: '2', description: 'Stripe Revenue', amount: 8920.00, category: 'Revenue', date: 'Feb 21', agentSuggestion: null, status: 'confirmed' },
  { id: '3', description: 'Google Workspace', amount: -342.00, category: 'Software', date: 'Feb 20', agentSuggestion: 'Auto-categorized', status: 'confirmed' },
  { id: '4', description: 'Unknown Transfer', amount: -1500.00, category: 'Uncategorized', date: 'Feb 20', agentSuggestion: 'Needs review', status: 'flagged' },
  { id: '5', description: 'Client Payment', amount: 15000.00, category: 'Revenue', date: 'Feb 19', agentSuggestion: null, status: 'confirmed' },
]

const subscriptions = [
  { name: 'AWS', amount: 2450, renewal: 'Mar 1', status: 'active' },
  { name: 'Google Workspace', amount: 342, renewal: 'Mar 15', status: 'active' },
  { name: 'Slack', amount: 180, renewal: 'Mar 1', status: 'active' },
  { name: 'Figma', amount: 75, renewal: 'Apr 1', status: 'active' },
  { name: 'Old CRM', amount: 299, renewal: 'Mar 10', status: 'cancelling' },
]

function FinanceModule() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance"
        description="Automate bookkeeping, forecasting, and anomaly detection"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Revenue (MTD)" value="$54,000" change={10.2} trend="up" icon={<DollarSign className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Expenses (MTD)" value="$39,000" change={2.6} trend="up" icon={<Wallet className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Net Profit" value="$15,000" change={28} trend="up" icon={<TrendingUp className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Anomalies" value={1} change={-2} trend="down" icon={<AlertTriangle className="h-5 w-5" />} accentColor="purple" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Cash Flow</CardTitle>
            <Badge variant="secondary">6 months</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E32" />
                <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }}
                  formatter={(value: string | number | (string | number)[]) => {
                    const num = Array.isArray(value) ? Number(value[0]) : Number(value)
                    return [`$${num.toLocaleString()}`, '']
                  }}
                />
                <Line type="monotone" dataKey="income" stroke="#3FC56B" strokeWidth={2} dot={{ fill: '#3FC56B', r: 4 }} />
                <Line type="monotone" dataKey="expenses" stroke="#FF7300" strokeWidth={2} dot={{ fill: '#FF7300', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RPieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }}
                  formatter={(value: string | number | (string | number)[]) => {
                    const num = Array.isArray(value) ? Number(value[0]) : Number(value)
                    return [`$${num.toLocaleString()}`, '']
                  }}
                />
              </RPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="font-medium text-foreground">${cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn('rounded-lg p-2', tx.amount > 0 ? 'bg-success/10' : 'bg-muted')}>
                        {tx.amount > 0 ? <ArrowUpRight className="h-4 w-4 text-success" /> : <ArrowDownRight className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{tx.description}</p>
                          {tx.agentSuggestion && (
                            <Badge variant={tx.status === 'flagged' ? 'warning' : 'secondary'} className="text-[10px]">
                              <Bot className="mr-1 h-3 w-3" />
                              {tx.agentSuggestion}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                      </div>
                    </div>
                    <span className={cn('text-sm font-semibold', tx.amount > 0 ? 'text-success' : 'text-foreground')}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {subscriptions.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{sub.name}</p>
                        <p className="text-xs text-muted-foreground">Renews {sub.renewal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={sub.status === 'cancelling' ? 'warning' : 'secondary'} className="text-[10px]">
                        {sub.status}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">${sub.amount}/mo</span>
                    </div>
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

export default FinanceModule
