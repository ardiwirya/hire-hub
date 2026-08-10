import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatDateTime } from '@/lib/utils'
import type { ActivityLogEntry } from '@/types/candidate'

interface ActivityTimelineProps {
  activity: ActivityLogEntry[]
}

const TYPE_LABELS: Record<ActivityLogEntry['type'], string> = {
  stage_change: 'Stage Update',
  note: 'Note',
  interview_scheduled: 'Interview',
  resume_review: 'Resume Review',
}

export function ActivityTimeline({ activity }: ActivityTimelineProps) {
  const sorted = [...activity].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-6 border-l border-slate-200 pl-5 dark:border-slate-800">
          {sorted.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900" />
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                {TYPE_LABELS[entry.type]}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{entry.description}</p>
              <p className="mt-1 text-xs text-slate-400">
                {formatDateTime(entry.date)} - {entry.author}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
