import type { InterviewSchedule } from '@/types/candidate'
import { candidates } from './candidates'

const TYPES: InterviewSchedule['type'][] = ['Phone Screen', 'Technical', 'Panel', 'Final Round']
const INTERVIEWERS = ['Rina Marlina', 'Doni Kurniawan', 'Sinta Amelia', 'Bayu Aditya']
const LOCATIONS = ['Google Meet', 'Zoom Call', 'HQ Meeting Room 2', 'HQ Meeting Room 4']

function buildInterviews(): InterviewSchedule[] {
  const shortlisted = candidates.filter(
    (c) => c.stage === 'Interview' || c.stage === 'Offer',
  )

  return shortlisted.map((candidate, index) => {
    const date = new Date('2026-08-07')
    date.setDate(date.getDate() + ((index % 10) - 3))

    return {
      id: `interview-${candidate.id}`,
      candidateId: candidate.id,
      date: date.toISOString(),
      time: `${9 + (index % 6)}:${index % 2 === 0 ? '00' : '30'}`,
      interviewer: INTERVIEWERS[index % INTERVIEWERS.length],
      type: TYPES[index % TYPES.length],
      location: LOCATIONS[index % LOCATIONS.length],
    }
  })
}

export const interviews: InterviewSchedule[] = buildInterviews()
