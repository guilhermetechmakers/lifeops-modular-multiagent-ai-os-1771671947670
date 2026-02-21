import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  FolderKanban,
  FileText,
  DollarSign,
  Heart,
  Clock,
  Workflow,
  CheckSquare,
  Settings,
  User,
  Building2,
  Shield,
  Plug,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/dashboard' },
      { label: 'Agents', icon: <Bot className="h-5 w-5" />, href: '/dashboard/agents' },
    ],
  },
  {
    title: 'Modules',
    items: [
      { label: 'Projects', icon: <FolderKanban className="h-5 w-5" />, href: '/dashboard/projects' },
      { label: 'Content', icon: <FileText className="h-5 w-5" />, href: '/dashboard/content' },
      { label: 'Finance', icon: <DollarSign className="h-5 w-5" />, href: '/dashboard/finance' },
      { label: 'Health', icon: <Heart className="h-5 w-5" />, href: '/dashboard/health' },
    ],
  },
  {
    title: 'Automation',
    items: [
      { label: 'Cronjobs', icon: <Clock className="h-5 w-5" />, href: '/dashboard/cronjobs' },
      { label: 'Workflows', icon: <Workflow className="h-5 w-5" />, href: '/dashboard/workflows' },
      { label: 'Approvals', icon: <CheckSquare className="h-5 w-5" />, href: '/dashboard/approvals', badge: '3' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Connectors', icon: <Plug className="h-5 w-5" />, href: '/dashboard/connectors' },
      { label: 'Admin', icon: <Shield className="h-5 w-5" />, href: '/dashboard/admin' },
      { label: 'Organization', icon: <Building2 className="h-5 w-5" />, href: '/dashboard/organization' },
      { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/dashboard/profile' },
      { label: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/dashboard/settings' },
      { label: 'Docs & Help', icon: <HelpCircle className="h-5 w-5" />, href: '/dashboard/docs' },
    ],
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const isActive = (href: string) => {
    if (href === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        isCollapsed ? 'w-[68px]' : 'w-[260px]'
      )}
    >
      <div className={cn('flex h-16 items-center border-b border-sidebar-border px-4', isCollapsed ? 'justify-center' : 'gap-3')}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
          <Zap className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-foreground">LifeOps</h1>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            {!isCollapsed && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      'group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      active
                        ? 'bg-sidebar-accent text-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground',
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary" />
                    )}
                    <span className={cn(!isCollapsed && 'mr-3')}>{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && hoveredItem === item.href && (
                      <div className="absolute left-full ml-2 z-50 rounded-lg bg-popover px-3 py-2 text-sm font-medium text-popover-foreground shadow-lg border border-border animate-scale-in whitespace-nowrap">
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
    </aside>
  )
}

export { Sidebar }
