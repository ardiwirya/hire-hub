export type RecruitmentStage =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Hired'
  | 'Rejected'

export const RECRUITMENT_STAGES: RecruitmentStage[] = [
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Hired',
  'Rejected',
]

export interface ActivityLogEntry {
  id: string
  date: string // ISO date
  type: 'stage_change' | 'note' | 'interview_scheduled' | 'resume_review'
  description: string
  author: string
}

export interface InterviewSchedule {
  id: string
  candidateId: string
  date: string // ISO date
  time: string // e.g. "10:00"
  interviewer: string
  type: 'Phone Screen' | 'Technical' | 'Panel' | 'Final Round'
  location: string
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  photoUrl: string
  positionApplied: string
  department: string
  stage: RecruitmentStage
  source: 'LinkedIn' | 'Referral' | 'Company Website' | 'Job Board' | 'Career Fair'
  appliedDate: string // ISO date
  location: string
  experienceYears: number
  expectedSalary: number
  resumeScore: number // 0-100
  tags: string[]
  activity: ActivityLogEntry[]
}
