import { Badge } from './ui/badge'
import { cn } from '@/lib/utils/cn'

interface StatBadgeProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  danger: 'bg-red-500/20 text-red-400',
}

export function StatBadge({ label, value, icon, variant = 'default', className }: StatBadgeProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <Badge variant="outline" className={cn('w-fit', variantStyles[variant])}>
        {icon && <span className="mr-1">{icon}</span>}
        <span className="font-semibold">{value}</span>
      </Badge>
    </div>
  )
}
