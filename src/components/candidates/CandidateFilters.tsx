import { useCandidateStore } from '@/store/candidateStore'
import { RECRUITMENT_STAGES } from '@/types/candidate'

const DEPARTMENTS = [
  'All',
  'Engineering',
  'Design',
  'Product',
  'Data',
  'Human Resources',
  'Marketing',
  'Finance',
  'Customer Success',
]

export function CandidateFilters() {
  const {
    searchQuery,
    departmentFilter,
    stageFilter,
    sortOption,
    setSearchQuery,
    setDepartmentFilter,
    setStageFilter,
    setSortOption,
  } = useCandidateStore()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, position, or email"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:max-w-sm"
      />

      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        {DEPARTMENTS.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      <select
        value={stageFilter}
        onChange={(e) => setStageFilter(e.target.value as typeof stageFilter)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <option value="All">All Stages</option>
        {RECRUITMENT_STAGES.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <option value="newest">Sort: Newest Applied</option>
        <option value="oldest">Sort: Oldest Applied</option>
        <option value="name-asc">Sort: Name (A-Z)</option>
        <option value="score-desc">Sort: Resume Score</option>
      </select>
    </div>
  )
}
