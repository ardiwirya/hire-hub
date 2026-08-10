import type { Candidate, RecruitmentStage, ActivityLogEntry } from '@/types/candidate'

const FIRST_NAMES = [
  'Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Fajar', 'Gita', 'Hendra',
  'Indah', 'Joko', 'Kartika', 'Lestari', 'Made', 'Nina', 'Oscar', 'Putri',
  'Rian', 'Sari', 'Taufik', 'Umar', 'Vina', 'Wawan', 'Yuni', 'Zaki',
  'Michael', 'Sarah', 'David', 'Jessica', 'Ryan', 'Emily',
]

const LAST_NAMES = [
  'Pratama', 'Wijaya', 'Santoso', 'Kusuma', 'Setiawan', 'Wardani',
  'Hidayat', 'Gunawan', 'Saputra', 'Anggraini', 'Firmansyah', 'Handayani',
  'Tanoto', 'Susanto', 'Halim', 'Chen', 'Tanaka', 'Rahman',
]

const POSITIONS = [
  { title: 'Frontend Engineer', department: 'Engineering' },
  { title: 'Backend Engineer', department: 'Engineering' },
  { title: 'Product Designer', department: 'Design' },
  { title: 'Product Manager', department: 'Product' },
  { title: 'Data Analyst', department: 'Data' },
  { title: 'QA Engineer', department: 'Engineering' },
  { title: 'Talent Acquisition Specialist', department: 'Human Resources' },
  { title: 'Marketing Executive', department: 'Marketing' },
  { title: 'Finance Analyst', department: 'Finance' },
  { title: 'Customer Success Manager', department: 'Customer Success' },
]

const SOURCES: Candidate['source'][] = [
  'LinkedIn', 'Referral', 'Company Website', 'Job Board', 'Career Fair',
]

const LOCATIONS = [
  'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bali', 'Singapore', 'Remote',
]

const STAGES: RecruitmentStage[] = [
  'Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected',
]

const INTERVIEWERS = [
  'Rina Marlina (HR Manager)',
  'Doni Kurniawan (Engineering Lead)',
  'Sinta Amelia (Design Lead)',
  'Bayu Aditya (Product Lead)',
]

// Deterministic pseudo-random helper so the dataset stays the same on every reload.
function pick<T>(list: T[], seed: number): T {
  return list[seed % list.length]
}

function buildActivity(candidateId: string, stage: RecruitmentStage, appliedDate: Date): ActivityLogEntry[] {
  const entries: ActivityLogEntry[] = [
    {
      id: `${candidateId}-activity-1`,
      date: appliedDate.toISOString(),
      type: 'resume_review',
      description: 'Resume submitted and passed initial screening criteria.',
      author: 'System',
    },
  ]

  const stageOrder: RecruitmentStage[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired']
  const currentIndex = stageOrder.indexOf(stage)

  for (let i = 1; i <= currentIndex; i++) {
    const activityDate = new Date(appliedDate)
    activityDate.setDate(activityDate.getDate() + i * 3)
    entries.push({
      id: `${candidateId}-activity-${i + 1}`,
      date: activityDate.toISOString(),
      type: 'stage_change',
      description: `Moved to ${stageOrder[i]} stage.`,
      author: pick(INTERVIEWERS, i),
    })
  }

  if (stage === 'Rejected') {
    const rejectDate = new Date(appliedDate)
    rejectDate.setDate(rejectDate.getDate() + 5)
    entries.push({
      id: `${candidateId}-activity-rejected`,
      date: rejectDate.toISOString(),
      type: 'note',
      description: 'Candidate did not meet the required experience level for this role.',
      author: 'Rina Marlina (HR Manager)',
    })
  }

  return entries
}

function generateCandidates(count: number): Candidate[] {
  const candidates: Candidate[] = []
  const today = new Date('2026-08-07')

  for (let i = 0; i < count; i++) {
    const firstName = pick(FIRST_NAMES, i)
    const lastName = pick(LAST_NAMES, i * 3 + 2)
    const name = `${firstName} ${lastName}`
    const position = pick(POSITIONS, i * 2)
    const stage = pick(STAGES, i * 5 + 1)

    const appliedDate = new Date(today)
    appliedDate.setDate(appliedDate.getDate() - ((i * 7) % 90))

    const id = `cand-${i + 1}`

    candidates.push({
      id,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+62 812-${1000 + i * 17}-${2000 + i * 31}`,
      photoUrl: `https://i.pravatar.cc/150?u=${id}`,
      positionApplied: position.title,
      department: position.department,
      stage,
      source: pick(SOURCES, i * 2 + 1),
      appliedDate: appliedDate.toISOString(),
      location: pick(LOCATIONS, i),
      experienceYears: (i % 10) + 1,
      expectedSalary: 8000000 + (i % 12) * 2500000,
      resumeScore: 55 + (i * 7) % 45,
      tags: i % 3 === 0 ? ['Strong Portfolio'] : i % 3 === 1 ? ['Referral', 'Priority'] : [],
      activity: buildActivity(id, stage, appliedDate),
    })
  }

  return candidates
}

export const candidates: Candidate[] = generateCandidates(42)
