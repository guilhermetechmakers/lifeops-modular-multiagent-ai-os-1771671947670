import {
  Heart,
  Flame,
  Moon,
  Dumbbell,
  Target,
  Calendar,
  Plus,
  Droplets,
  CheckCircle2,
  Circle,
  Apple,
} from 'lucide-react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/shared/metric-card'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const weeklyActivity = [
  { day: 'Mon', calories: 2400, steps: 8500, sleep: 7.2 },
  { day: 'Tue', calories: 2200, steps: 10200, sleep: 7.8 },
  { day: 'Wed', calories: 2600, steps: 6800, sleep: 6.5 },
  { day: 'Thu', calories: 2350, steps: 9100, sleep: 7.5 },
  { day: 'Fri', calories: 2100, steps: 11000, sleep: 8.0 },
  { day: 'Sat', calories: 2800, steps: 5200, sleep: 8.5 },
  { day: 'Sun', calories: 2500, steps: 7400, sleep: 7.0 },
]

const recoveryData = [
  { metric: 'HRV', value: 82 },
  { metric: 'Sleep', value: 75 },
  { metric: 'Strain', value: 65 },
  { metric: 'Nutrition', value: 88 },
  { metric: 'Hydration', value: 70 },
  { metric: 'Stress', value: 60 },
]

const habits = [
  { name: 'Morning Meditation', streak: 14, completed: true, target: '10 min' },
  { name: 'Drink 3L Water', streak: 7, completed: false, target: '3L', progress: 65 },
  { name: 'Sleep by 11 PM', streak: 5, completed: true, target: '11:00 PM' },
  { name: 'Workout', streak: 3, completed: false, target: '45 min', progress: 0 },
  { name: 'Read 30 Pages', streak: 21, completed: true, target: '30 pages' },
]

const trainingPlan = [
  { day: 'Monday', workout: 'Upper Body Strength', duration: '60 min', intensity: 'high', completed: true },
  { day: 'Tuesday', workout: 'Zone 2 Cardio', duration: '45 min', intensity: 'low', completed: true },
  { day: 'Wednesday', workout: 'Rest / Mobility', duration: '20 min', intensity: 'low', completed: true },
  { day: 'Thursday', workout: 'Lower Body Strength', duration: '60 min', intensity: 'high', completed: false },
  { day: 'Friday', workout: 'HIIT Circuit', duration: '30 min', intensity: 'high', completed: false },
  { day: 'Saturday', workout: 'Long Run', duration: '75 min', intensity: 'medium', completed: false },
  { day: 'Sunday', workout: 'Active Recovery', duration: '30 min', intensity: 'low', completed: false },
]

const nutritionItems = [
  { label: 'Calories', value: '2,350', target: '2,400', icon: <Flame className="h-5 w-5" />, progress: 98 },
  { label: 'Protein', value: '145g', target: '160g', icon: <Dumbbell className="h-5 w-5" />, progress: 91 },
  { label: 'Water', value: '2.1L', target: '3.0L', icon: <Droplets className="h-5 w-5" />, progress: 70 },
]

const intensityColors: Record<string, string> = {
  high: 'text-destructive',
  medium: 'text-warning',
  low: 'text-success',
}

function HealthModule() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Health"
        description="Automate habits, training plans, and recovery balancing"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-1.5 h-4 w-4" />
              Sync Calendar
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Goal
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Recovery Score" value="82%" change={5} trend="up" icon={<Heart className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Active Calories" value="2,350" change={-3} trend="down" icon={<Flame className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Sleep Score" value="7.5h" change={8} trend="up" icon={<Moon className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Habit Streak" value="21 days" change={0} trend="neutral" icon={<Target className="h-5 w-5" />} accentColor="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Weekly Activity</CardTitle>
            <Badge variant="secondary">This Week</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E32" />
                <XAxis dataKey="day" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} />
                <Bar dataKey="steps" fill="#FF7300" radius={[4, 4, 0, 0]} name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recovery Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={recoveryData}>
                <PolarGrid stroke="#2E2E32" />
                <PolarAngleAxis dataKey="metric" stroke="#A1A1AA" fontSize={11} />
                <Radar name="Score" dataKey="value" stroke="#3FC56B" fill="#3FC56B" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="habits">
        <TabsList>
          <TabsTrigger value="habits">Habits & Goals</TabsTrigger>
          <TabsTrigger value="training">Training Plan</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>

        <TabsContent value="habits">
          {habits.length === 0 ? (
            <EmptyState
              icon={<Target className="h-6 w-6" />}
              title="No habits tracked yet"
              description="Start building consistency by adding your first habit. AI agents can suggest habits based on your health goals and patterns."
              actionLabel="Add Habit"
              onAction={() => {}}
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <Card key={habit.name} className={cn('transition-all duration-200', habit.completed && 'border-success/30')}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {habit.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <h3 className="text-sm font-semibold text-foreground">{habit.name}</h3>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        <Flame className="mr-1 h-3 w-3 text-primary" />
                        {habit.streak}d
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Target: {habit.target}</p>
                    {habit.progress !== undefined && !habit.completed && (
                      <Progress value={habit.progress} className="mt-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="training">
          {trainingPlan.length === 0 ? (
            <EmptyState
              icon={<Dumbbell className="h-6 w-6" />}
              title="No training plan created"
              description="Generate a personalized training plan with AI agents based on your fitness goals, schedule, and recovery data."
              actionLabel="Create Training Plan"
              onAction={() => {}}
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {trainingPlan.map((day) => (
                    <div key={day.day} className={cn('flex items-center justify-between p-4 transition-colors', day.completed ? 'bg-success/5' : 'hover:bg-secondary/50')}>
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <p className="text-sm font-medium text-foreground">{day.day}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {day.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <Dumbbell className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <p className="text-sm text-foreground">{day.workout}</p>
                            <p className="text-xs text-muted-foreground">{day.duration}</p>
                          </div>
                        </div>
                      </div>
                      <span className={cn('text-xs font-medium capitalize', intensityColors[day.intensity])}>
                        {day.intensity}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="nutrition">
          {nutritionItems.length === 0 ? (
            <EmptyState
              icon={<Apple className="h-6 w-6" />}
              title="No nutrition data available"
              description="Connect a nutrition tracker or manually log your meals to get AI-powered insights on your diet and hydration."
              actionLabel="Log Nutrition"
              onAction={() => {}}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {nutritionItems.map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-3 rounded-lg bg-muted p-3 w-fit text-muted-foreground">{item.icon}</div>
                    <p className="text-2xl font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground mb-3">of {item.target} target</p>
                    <Progress value={item.progress} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HealthModule
