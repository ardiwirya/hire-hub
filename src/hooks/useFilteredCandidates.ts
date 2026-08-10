import { useMemo } from 'react'
import { useCandidateStore } from '@/store/candidateStore'
import type { Candidate } from '@/types/candidate'

export function useFilteredCandidates(): Candidate[] {
  const { candidates, searchQuery, departmentFilter, stageFilter, sortOption } = useCandidateStore()

  return useMemo(() => {
    let result = candidates

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.positionApplied.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query),
      )
    }

    if (departmentFilter !== 'All') {
      result = result.filter((candidate) => candidate.department === departmentFilter)
    }

    if (stageFilter !== 'All') {
      result = result.filter((candidate) => candidate.stage === stageFilter)
    }

    const sorted = [...result]
    switch (sortOption) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime())
        break
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'score-desc':
        sorted.sort((a, b) => b.resumeScore - a.resumeScore)
        break
    }

    return sorted
  }, [candidates, searchQuery, departmentFilter, stageFilter, sortOption])
}
