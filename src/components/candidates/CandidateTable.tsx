import { useNavigate } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import { formatDate } from '@/lib/utils'
import type { Candidate } from '@/types/candidate'

interface CandidateTableProps {
  candidates: Candidate[]
}

export function CandidateTable({ candidates }: CandidateTableProps) {
  const navigate = useNavigate()

  if (candidates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No candidates match the current filters.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Candidate</th>
            <th className="px-4 py-3 font-medium">Position</th>
            <th className="px-4 py-3 font-medium">Stage</th>
            <th className="px-4 py-3 font-medium">Applied</th>
            <th className="px-4 py-3 font-medium">Source</th>
            <th className="px-4 py-3 font-medium">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              onClick={() => navigate(`/candidates/${candidate.id}`)}
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.photoUrl}
                    alt={candidate.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{candidate.name}</p>
                    <p className="text-xs text-slate-400">{candidate.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                <p>{candidate.positionApplied}</p>
                <p className="text-xs text-slate-400">{candidate.department}</p>
              </td>
              <td className="px-4 py-3">
                <StatusBadge stage={candidate.stage} />
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {formatDate(candidate.appliedDate)}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{candidate.source}</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{candidate.resumeScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
