import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Plus, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'

interface TopNavProps {
  onMobileMenuToggle: () => void
}

function TopNav({ onMobileMenuToggle }: TopNavProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:px-6">
      <button
        onClick={onMobileMenuToggle}
        className="mr-4 rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-4">
        <div className={cn('relative transition-all duration-300', isSearchOpen ? 'w-full max-w-md' : 'w-64')}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents, runs, cronjobs..."
            className="pl-9 bg-secondary border-transparent focus-visible:border-border"
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setIsSearchOpen(false)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="gradient" size="sm" className="hidden sm:flex">
          <Plus className="mr-1.5 h-4 w-4" />
          Quick Create
        </Button>
        <Button variant="gradient" size="icon-sm" className="sm:hidden">
          <Plus className="h-4 w-4" />
        </Button>

        <button className="relative rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <Link to="/dashboard/profile" className="ml-1">
          <Avatar fallback="JD" size="sm" />
        </Link>
      </div>
    </header>
  )
}

export { TopNav }
