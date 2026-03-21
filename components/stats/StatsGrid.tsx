import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <Card className={cn('border-white/10 bg-white/5 transition-colors hover:bg-white/[0.07]', className)}>
      <CardContent className="flex flex-col gap-2 p-6">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <p className="text-2xl font-bold tracking-tight md:text-3xl">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: Array<{
    value: string | number;
    label: string;
    icon?: React.ReactNode;
  }>;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
