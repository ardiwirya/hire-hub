import { create } from 'zustand'
import { interviews as initialInterviews } from '@/data/interviews'
import type { InterviewSchedule } from '@/types/candidate'

interface InterviewState {
  interviews: InterviewSchedule[]
  addInterview: (interview: Omit<InterviewSchedule, 'id'>) => void
  deleteInterview: (interviewId: string) => void
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  interviews: initialInterviews,
  addInterview: (interview) => {
    const newInterview: InterviewSchedule = {
      ...interview,
      id: `interview-manual-${get().interviews.length + 1}`,
    }
    set({ interviews: [...get().interviews, newInterview] })
  },
  deleteInterview: (interviewId) => {
    set({ interviews: get().interviews.filter((interview) => interview.id !== interviewId) })
  },
}))
