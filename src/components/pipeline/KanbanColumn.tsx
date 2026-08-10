import { KanbanCard } from './KanbanCard'
import type { Candidate, RecruitmentStage } from '@/types/candidate'

interface KanbanColumnProps {
  stage: RecruitmentStage
  candidates: Candidate[]
  onDragStart: (candidateId: string) => void
  onDrop: (stage: RecruitmentStage) => void
}

export function KanbanColumn({ stage, candidates, onDragStart, onDrop }: KanbanColumnProps) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(stage)}
      className="flex w-72 shrink-0 flex-col rounded-xl bg-slate-100 dark:bg-slate-900/50"
    >
      <div className="flex items-center justify-between px-3 py-3">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{stage}</h3>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {candidates.length}
        </span>
      </div>

      <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-3 pb-3" style={{ maxHeight: '65vh' }}>
        {candidates.map((candidate) => (
          <KanbanCard key={candidate.id} candidate={candidate} onDragStart={onDragStart} />
        ))}
        {candidates.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs text-slate-400 dark:border-slate-700">
            No candidates
          </p>
        )}
      </div>
    </div>
  )
}
