import { Link, useParams } from 'react-router-dom'
import { CandidateProfile } from '@/components/candidate-detail/CandidateProfile'
import { ActivityTimeline } from '@/components/candidate-detail/ActivityTimeline'
import { ScheduleInterviewForm } from '@/components/candidate-detail/ScheduleInterviewForm'
import { useCandidateStore } from '@/store/candidateStore'

export function CandidateDetailPage() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const candidate = useCandidateStore((state) =>
    state.candidates.find((c) => c.id === candidateId),
  )

  if (!candidate) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">Candidate not found.</p>
        <Link to="/candidates" className="text-sm font-medium text-indigo-600 hover:underline">
          Back to candidates
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/candidates"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        ← Back to candidates
      </Link>

      <CandidateProfile candidate={candidate} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityTimeline activity={candidate.activity} />
        <ScheduleInterviewForm candidateId={candidate.id} />
      </div>
    </div>
  )
}
