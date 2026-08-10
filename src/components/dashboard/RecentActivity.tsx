import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatDateTime } from '@/lib/utils'
import type { Candidate } from '@/types/candidate'

interface RecentActivityProps {
  candidates: Candidate[]
}

export function RecentActivity({ candidates }: RecentActivityProps) {
  const recentEntries = candidates
    .flatMap((candidate) =>
      candidate.activity.map((entry) => ({ ...entry, candidateId: candidate.id, candidateName: candidate.name })),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentEntries.map((entry) => (
            <li key={entry.id} className="flex gap-3 text-sm">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  <Link
                    to={`/candidates/${entry.candidateId}`}
                    className="font-medium text-slate-900 hover:underline dark:text-slate-100"
                  >
                    {entry.candidateName}
                  </Link>{' '}
                  - {entry.description}
                </p>
                <p className="text-xs text-slate-400">{formatDateTime(entry.date)}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
