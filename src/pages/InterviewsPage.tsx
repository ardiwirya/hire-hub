import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { useInterviewStore } from '@/store/interviewStore'
import { useCandidateStore } from '@/store/candidateStore'
import { formatDate } from '@/lib/utils'
import type { InterviewSchedule } from '@/types/candidate'

export function InterviewsPage() {
  const interviews = useInterviewStore((state) => state.interviews)
  const deleteInterview = useInterviewStore((state) => state.deleteInterview)
  const candidates = useCandidateStore((state) => state.candidates)

  const now = new Date()
  const sorted = [...interviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const upcoming = sorted.filter((interview) => new Date(interview.date) >= startOfDay(now))
  const past = sorted.filter((interview) => new Date(interview.date) < startOfDay(now)).reverse()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Interview Schedule
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {upcoming.length} upcoming, {past.length} past
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-400">No upcoming interviews scheduled.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                candidateName={candidates.find((c) => c.id === interview.candidateId)?.name}
                candidatePosition={candidates.find((c) => c.id === interview.candidateId)?.positionApplied}
                candidatePhoto={candidates.find((c) => c.id === interview.candidateId)?.photoUrl}
                onCancel={() => deleteInterview(interview.id)}
              />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Past</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {past.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                candidateName={candidates.find((c) => c.id === interview.candidateId)?.name}
                candidatePosition={candidates.find((c) => c.id === interview.candidateId)?.positionApplied}
                candidatePhoto={candidates.find((c) => c.id === interview.candidateId)?.photoUrl}
                onCancel={() => deleteInterview(interview.id)}
                isPast
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function startOfDay(date: Date): Date {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

interface InterviewCardProps {
  interview: InterviewSchedule
  candidateName?: string
  candidatePosition?: string
  candidatePhoto?: string
  onCancel: () => void
  isPast?: boolean
}

function InterviewCard({
  interview,
  candidateName,
  candidatePosition,
  candidatePhoto,
  onCancel,
  isPast,
}: InterviewCardProps) {
  return (
    <Card className={`p-4 ${isPast ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase text-indigo-600 dark:text-indigo-400">
          {interview.type}
        </span>
        <span className="text-xs text-slate-400">
          {formatDate(interview.date)} - {interview.time}
        </span>
      </div>

      {candidateName && (
        <Link to={`/candidates/${interview.candidateId}`} className="mt-3 flex items-center gap-3 hover:underline">
          <img src={candidatePhoto} alt={candidateName} className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{candidateName}</p>
            <p className="text-xs text-slate-400">{candidatePosition}</p>
          </div>
        </Link>
      )}

      <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>Interviewer: {interview.interviewer}</p>
        <p>Location: {interview.location}</p>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="mt-3 text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
      >
        {isPast ? 'Remove from list' : 'Cancel interview'}
      </button>
    </Card>
  )
}
