import { useNavigate } from 'react-router-dom'
import type { Candidate } from '@/types/candidate'

interface KanbanCardProps {
  candidate: Candidate
  onDragStart: (candidateId: string) => void
}

export function KanbanCard({ candidate, onDragStart }: KanbanCardProps) {
  const navigate = useNavigate()

  return (
    <div
      draggable
      onDragStart={() => onDragStart(candidate.id)}
      onClick={() => navigate(`/candidates/${candidate.id}`)}
      className="cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center gap-2">
        <img
          src={candidate.photoUrl}
          alt={candidate.name}
          className="h-7 w-7 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {candidate.name}
          </p>
          <p className="truncate text-xs text-slate-400">{candidate.positionApplied}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>{candidate.department}</span>
        <span>{candidate.resumeScore} pts</span>
      </div>
    </div>
  )
}
