import { CandidateFilters } from '@/components/candidates/CandidateFilters'
import { CandidateTable } from '@/components/candidates/CandidateTable'
import { useFilteredCandidates } from '@/hooks/useFilteredCandidates'

export function CandidatesPage() {
  const filteredCandidates = useFilteredCandidates()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Candidates</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {filteredCandidates.length} candidate{filteredCandidates.length === 1 ? '' : 's'} found
        </p>
      </div>

      <CandidateFilters />
      <CandidateTable candidates={filteredCandidates} />
    </div>
  )
}
