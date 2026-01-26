import { Card } from './ui/card'

interface AdPlaceholderProps {
  width?: number
  height?: number
  label?: string
  className?: string
}

export function AdPlaceholder({
  width = 300,
  height = 250,
  label = 'Ad',
  className,
}: AdPlaceholderProps) {
  return (
    <Card
      className={`flex items-center justify-center bg-muted/30 border-dashed ${className}`}
      style={{ width, height, minHeight: height }}
    >
      <div className="text-center text-muted-foreground text-sm">
        <div className="font-medium">{label}</div>
        <div className="text-xs mt-1">
          {width} × {height}
        </div>
      </div>
    </Card>
  )
}
