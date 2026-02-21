import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: ReactNode
  className?: string
  accentColor?: 'orange' | 'green' | 'purple'
}

const accentStyles = {
  orange: 'border-l-[#FF7300]',
  green: 'border-l-[#3FC56B]',
  purple: 'border-l-[#B16FFF]',
}

function MetricCard({
  label,
  value,
  change,
  changeLabel,
  trend = 'neutral',
  icon,
  className,
  accentColor = 'orange',
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:shadow-card-hover hover:brightness-105 border-l-4',
        accentStyles[accentColor],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
              {trend === 'neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
              <span
                className={cn(
                  'text-sm font-medium',
                  trend === 'up' && 'text-success',
                  trend === 'down' && 'text-destructive',
                  trend === 'neutral' && 'text-muted-foreground'
                )}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export { MetricCard }
export type { MetricCardProps }
