import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  change: string
  changeDirection: 'up' | 'down'
}

export function StatCard({ label, value, change, changeDirection }: StatCardProps) {
  return (
    <Card className="p-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
        <span
          className={cn(
            'flex items-center text-xs font-medium',
            changeDirection === 'up'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400',
          )}
        >
          {changeDirection === 'up' ? '▲' : '▼'} {change}
        </span>
      </div>
    </Card>
  )
}
