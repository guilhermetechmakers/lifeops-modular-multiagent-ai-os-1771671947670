import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-card hover:brightness-110 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] disabled:opacity-50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-muted hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground disabled:opacity-50',
        ghost:
          'text-foreground hover:bg-secondary hover:text-foreground disabled:opacity-50',
        destructive:
          'bg-destructive text-destructive-foreground hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50',
        success:
          'bg-success text-success-foreground hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50',
        link:
          'text-primary underline-offset-4 hover:underline disabled:opacity-50',
        gradient:
          'bg-gradient-to-r from-primary to-primary/70 text-primary-foreground hover:brightness-110 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] disabled:opacity-60',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, 'aria-label': ariaLabel, ...props }, ref) => {
    const isDisabled = disabled || isLoading
    const isIconOnly = size === 'icon' || size === 'icon-sm'

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && 'relative cursor-wait'
        )}
        ref={ref}
        disabled={isDisabled}
        aria-label={ariaLabel || (isIconOnly && !children ? 'Button' : undefined)}
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
        )}
        <span className={cn(isLoading && 'opacity-70')}>{children}</span>
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
