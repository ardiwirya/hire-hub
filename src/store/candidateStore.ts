import { create } from 'zustand'
import { candidates as initialCandidates } from '@/data/candidates'
import type { Candidate, RecruitmentStage, ActivityLogEntry } from '@/types/candidate'

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'score-desc'

interface CandidateState {
  candidates: Candidate[]
  searchQuery: string
  departmentFilter: string
  stageFilter: RecruitmentStage | 'All'
  sortOption: SortOption
  setSearchQuery: (query: string) => void
  setDepartmentFilter: (department: string) => void
  setStageFilter: (stage: RecruitmentStage | 'All') => void
  setSortOption: (option: SortOption) => void
  moveCandidateToStage: (candidateId: string, stage: RecruitmentStage) => void
  logActivity: (candidateId: string, entry: Pick<ActivityLogEntry, 'type' | 'description' | 'author'>) => void
  getCandidateById: (candidateId: string) => Candidate | undefined
}

export const useCandidateStore = create<CandidateState>((set, get) => ({
  candidates: initialCandidates,
  searchQuery: '',
  departmentFilter: 'All',
  stageFilter: 'All',
  sortOption: 'newest',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setDepartmentFilter: (department) => set({ departmentFilter: department }),
  setStageFilter: (stage) => set({ stageFilter: stage }),
  setSortOption: (option) => set({ sortOption: option }),

  moveCandidateToStage: (candidateId, stage) => {
    set({
      candidates: get().candidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              stage,
              activity: [
                ...candidate.activity,
                {
                  id: `${candidateId}-activity-${candidate.activity.length + 1}`,
                  date: new Date().toISOString(),
                  type: 'stage_change',
                  description: `Moved to ${stage} stage.`,
                  author: 'You',
                },
              ],
            }
          : candidate,
      ),
    })
  },

  getCandidateById: (candidateId) => get().candidates.find((c) => c.id === candidateId),

  logActivity: (candidateId, entry) => {
    set({
      candidates: get().candidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              activity: [
                ...candidate.activity,
                {
                  ...entry,
                  id: `${candidateId}-activity-${candidate.activity.length + 1}`,
                  date: new Date().toISOString(),
                },
              ],
            }
          : candidate,
      ),
    })
  },
}))
