import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/candidates/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Candidate } from '@/types/candidate'

interface CandidateProfileProps {
  candidate: Candidate
}

export function CandidateProfile({ candidate }: CandidateProfileProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {candidate.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {candidate.positionApplied} - {candidate.department}
            </p>
          </div>
        </div>
        <StatusBadge stage={candidate.stage} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 dark:border-slate-800 sm:grid-cols-3 lg:grid-cols-4">
        <ProfileField label="Email" value={candidate.email} />
        <ProfileField label="Phone" value={candidate.phone} />
        <ProfileField label="Location" value={candidate.location} />
        <ProfileField label="Applied On" value={formatDate(candidate.appliedDate)} />
        <ProfileField label="Source" value={candidate.source} />
        <ProfileField label="Experience" value={`${candidate.experienceYears} years`} />
        <ProfileField label="Expected Salary" value={formatCurrency(candidate.expectedSalary)} />
        <ProfileField label="Resume Score" value={`${candidate.resumeScore}/100`} />
      </dl>

      {candidate.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{value}</dd>
    </div>
  )
}
