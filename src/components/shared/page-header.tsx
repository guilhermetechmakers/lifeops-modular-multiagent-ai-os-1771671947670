import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  icon?: ReactNode
  className?: string
  isLoading?: boolean
}

function PageHeaderSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        'flex flex-col gap-4 rounded-xl border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-9 w-32" />
    </Card>
  )
}

function PageHeader({ title, description, actions, icon, className, isLoading }: PageHeaderProps) {
  if (isLoading) {
    return <PageHeaderSkeleton className={className} />
  }

  return (
    <Card
      className={cn(
        'flex flex-col gap-4 rounded-xl border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </Card>
  )
}

export { PageHeader, PageHeaderSkeleton }
export type { PageHeaderProps }
