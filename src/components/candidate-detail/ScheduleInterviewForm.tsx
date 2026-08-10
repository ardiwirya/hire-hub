import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useInterviewStore } from '@/store/interviewStore'
import { useCandidateStore } from '@/store/candidateStore'
import { formatDate } from '@/lib/utils'
import type { InterviewSchedule } from '@/types/candidate'

interface ScheduleFormValues {
  date: string
  time: string
  interviewer: string
  type: InterviewSchedule['type']
  location: string
}

interface ScheduleInterviewFormProps {
  candidateId: string
}

const INTERVIEW_TYPES: InterviewSchedule['type'][] = [
  'Phone Screen',
  'Technical',
  'Panel',
  'Final Round',
]

export function ScheduleInterviewForm({ candidateId }: ScheduleInterviewFormProps) {
  const addInterview = useInterviewStore((state) => state.addInterview)
  const moveCandidateToStage = useCandidateStore((state) => state.moveCandidateToStage)
  const logActivity = useCandidateStore((state) => state.logActivity)
  const getCandidateById = useCandidateStore((state) => state.getCandidateById)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ScheduleFormValues>({
    defaultValues: {
      date: '',
      time: '10:00',
      interviewer: '',
      type: 'Phone Screen',
      location: 'Google Meet',
    },
  })

  const onSubmit = (values: ScheduleFormValues) => {
    const isoDate = new Date(values.date).toISOString()

    addInterview({
      candidateId,
      ...values,
      date: isoDate,
    })

    const candidate = getCandidateById(candidateId)
    const isNotYetInterviewing = candidate?.stage === 'Applied' || candidate?.stage === 'Screening'

    if (isNotYetInterviewing) {
      moveCandidateToStage(candidateId, 'Interview')
    }

    logActivity(candidateId, {
      type: 'interview_scheduled',
      description: `${values.type} scheduled for ${formatDate(isoDate)}, ${values.time} with ${values.interviewer}.`,
      author: 'You',
    })

    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Interview</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Date</label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Time</label>
              <input
                type="time"
                {...register('time', { required: 'Time is required' })}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Interviewer</label>
            <input
              type="text"
              placeholder="e.g. Doni Kurniawan"
              {...register('interviewer', { required: 'Interviewer is required' })}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.interviewer && (
              <p className="mt-1 text-xs text-red-500">{errors.interviewer.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Interview Type</label>
              <select
                {...register('type')}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {INTERVIEW_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</label>
              <input
                type="text"
                placeholder="Google Meet / HQ Room 2"
                {...register('location', { required: 'Location is required' })}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit">Schedule Interview</Button>
            {isSubmitSuccessful && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                Interview scheduled successfully.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
