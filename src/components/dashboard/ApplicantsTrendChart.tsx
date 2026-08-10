import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { Candidate } from '@/types/candidate'

interface ApplicantsTrendChartProps {
  candidates: Candidate[]
}

function buildWeeklyTrend(candidates: Candidate[]) {
  const today = new Date('2026-08-07')
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - (7 - i) * 7)
    return {
      label: `${weekStart.getDate()}/${weekStart.getMonth() + 1}`,
      start: weekStart,
    }
  })

  return weeks.map((week, index) => {
    const nextWeekStart = weeks[index + 1]?.start ?? today
    const count = candidates.filter((candidate) => {
      const appliedAt = new Date(candidate.appliedDate)
      return appliedAt >= week.start && appliedAt < nextWeekStart
    }).length

    return { week: week.label, applicants: count }
  })
}

export function ApplicantsTrendChart({ candidates }: ApplicantsTrendChartProps) {
  const data = buildWeeklyTrend(candidates)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicants Over Time</CardTitle>
        <span className="text-xs text-slate-400">Last 8 weeks</span>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="applicants"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
