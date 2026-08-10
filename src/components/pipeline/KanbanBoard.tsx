import { useState } from 'react'
import { KanbanColumn } from './KanbanColumn'
import { useCandidateStore } from '@/store/candidateStore'
import { RECRUITMENT_STAGES } from '@/types/candidate'
import type { Candidate, RecruitmentStage } from '@/types/candidate'

interface KanbanBoardProps {
  candidates: Candidate[]
}

export function KanbanBoard({ candidates }: KanbanBoardProps) {
  const moveCandidateToStage = useCandidateStore((state) => state.moveCandidateToStage)
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null)

  const handleDrop = (stage: RecruitmentStage) => {
    if (draggedCandidateId) {
      moveCandidateToStage(draggedCandidateId, stage)
      setDraggedCandidateId(null)
    }
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {RECRUITMENT_STAGES.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          candidates={candidates.filter((candidate) => candidate.stage === stage)}
          onDragStart={setDraggedCandidateId}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}
