import { StatCard } from '@/components/dashboard/StatCard'
import { ApplicantsTrendChart } from '@/components/dashboard/ApplicantsTrendChart'
import { StageDistributionChart } from '@/components/dashboard/StageDistributionChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { useCandidateStore } from '@/store/candidateStore'

export function DashboardPage() {
  const candidates = useCandidateStore((state) => state.candidates)

  const totalCandidates = candidates.length
  const inInterview = candidates.filter((c) => c.stage === 'Interview').length
  const hired = candidates.filter((c) => c.stage === 'Hired').length
  const offerRate = Math.round(
    (candidates.filter((c) => c.stage === 'Offer' || c.stage === 'Hired').length / totalCandidates) * 100,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Recruitment Overview
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Summary of hiring activity across all open positions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Applicants" value={String(totalCandidates)} change="8.2%" changeDirection="up" />
        <StatCard label="In Interview" value={String(inInterview)} change="3.1%" changeDirection="up" />
        <StatCard label="Hired This Quarter" value={String(hired)} change="1.4%" changeDirection="down" />
        <StatCard label="Offer Rate" value={`${offerRate}%`} change="2.0%" changeDirection="up" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ApplicantsTrendChart candidates={candidates} />
        <StageDistributionChart candidates={candidates} />
      </div>

      <RecentActivity candidates={candidates} />
    </div>
  )
}
