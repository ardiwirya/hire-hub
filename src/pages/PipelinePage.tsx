import { KanbanBoard } from '@/components/pipeline/KanbanBoard'
import { useCandidateStore } from '@/store/candidateStore'

export function PipelinePage() {
  const candidates = useCandidateStore((state) => state.candidates)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Recruitment Pipeline
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Drag a candidate card into another column to update their stage.
        </p>
      </div>

      <KanbanBoard candidates={candidates} />
    </div>
  )
}
